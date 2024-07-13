import { NextResponse } from "next/server";
///import bcrpyt from "bcryptjs";
import { db } from "@/lib/db";

interface SaveKeyRequest {
  apiKey: string;
}

export async function POST(request: Request) {
  try {
    const body: SaveKeyRequest = await request.json();
    const { apiKey } = body;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is required" },
        { status: 400 }
      );
    }

    // Trim and hash the API key before saving
    const trimmedKey = apiKey.trim();
    ///const hashedKey = await bcrypt.hash(trimmedKey, 10);

    // Save the hashed API key in Upstash Redis

    return NextResponse.json(
      { message: "API key saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while saving the API key" },
      { status: 500 }
    );
  }
}
