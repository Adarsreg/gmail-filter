//endpoint that would receive the email and send it to openai api for classification
//this endpoint to be called by the button in the layout component
// classifyEmail.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log("Received messages:", messages);

    const classifications = [];

    for (const message of messages) {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are an email classifier. Classify the following email into categories such as 'Spam', 'Promotion', 'Social', 'Primary'.",
          },
          { role: "user", content: message.content },
        ],
        temperature: 0,
      });

      const classification =
        response.choices[0]?.message?.content?.trim() || "";
      classifications.push({ ...message, classification });
    }

    return NextResponse.json({ classifications });
  } catch (error) {
    console.error("Error classifying emails:", error);
    return NextResponse.json(
      { error: "Failed to classify emails." },
      { status: 500 }
    );
  }
}
