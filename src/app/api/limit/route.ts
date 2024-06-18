import { NextResponse } from "next/server";

let emailLimit = 5;

export async function POST(request: Request) {
  const { limit } = await request.json();
  emailLimit = parseInt(limit, 10);
  console.log("Email limit set to:", emailLimit);
  return NextResponse.json({ limit: emailLimit });
}

export async function GET() {
  return NextResponse.json({ limit: emailLimit });
}
