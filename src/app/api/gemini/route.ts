//endpoint that would receive the email and send it to gemini api for classification
//this endpoint to be called by the button in the layout component

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
  model: "gemini-1.0-pro",
});

export async function POST(request: Request) {
  const emails = await request.json();
  const emailsText = JSON.stringify(emails);

  try {
    const prompt = `# Classify the following emails\n\n${emailsText}\n into Spam or Important or Promotions or Social or Marketing, Return a json with id and label for each email in an array`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawresponse = response.text();
    console.log("Raw Response", rawresponse);
    //const cleanresponse = rawresponse.replace(/```json\n|\n```/g, "").trim();
    // const parsedResponse = JSON.parse(cleanresponse);
    // console.log("Parsed Response", parsedResponse);
    return NextResponse.json(response.text());
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message });
  }
}
