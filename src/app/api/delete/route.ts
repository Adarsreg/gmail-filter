import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) notFound();
    const access_token = session.user.sessToken;
    const body = await request.json();
    const { ids } = body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "No message IDs provided" },
        { status: 400 }
      );
    }

    // Make a request to the Gmail API to batch delete messages
    const gmailResponse = await fetch(
      "https://gmail.googleapis.com/gmail/v1/users/me/messages/batchDelete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({ ids }),
      }
    );

    if (gmailResponse.ok) {
      console.log("Emails deleted successfully....");
      return NextResponse.json(
        { message: "Emails deleted successfully" },
        { status: 200 }
      );
    } else {
      const errorData = await gmailResponse.json();
      return NextResponse.json(
        { error: errorData.error },
        { status: gmailResponse.status }
      );
    }
  } catch (error) {
    console.error("Error processing delete request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
