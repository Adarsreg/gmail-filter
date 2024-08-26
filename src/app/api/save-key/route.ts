import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";

interface SaveKeyRequest {
  apiKey: string;
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: SaveKeyRequest = await request.json();
    const { apiKey } = body;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is required" },
        { status: 400 }
      );
    }

    // Trim the API key before saving
    const trimmedKey = apiKey.trim();

    // Store the API key in Upstash Redis with user ID
    await db.set(`user:${session.user.id}:apiKey`, trimmedKey);

    return NextResponse.json(
      { message: "API key saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving API key:", error);
    return NextResponse.json(
      { error: "An error occurred while saving the API key" },
      { status: 500 }
    );
  }
}
