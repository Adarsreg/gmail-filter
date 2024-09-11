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
  const emailsnippets = emails.map((email: { id: any; snippet: any }) => {
    return {
      id: email.id,
      snippet: email.snippet,
    };
  });
  console.log("EmailSnippets", emailsnippets);
  try {
    const prompt = `I want you to classify my emails precisely Important(emails related to account security or shipping related or more) or Promotions(Mainly promotional emails) or Social(common mails from social media sites like Quora or Facebook or any social media) or Marketing(Emails related to marketing, newsletters, and notifications) or
     Spam(Unwanted or unsolicited emails) or General(Emails that do not fit into any of the above categories) based on their snippet property and return an array of jsons with 
     its respective "id" as a key and "classification" as another key whilst behaving like an api,do not reply in english
    : ${JSON.stringify(emailsnippets)} `;
    console.log("Prompt", prompt);

    const result = await model.generateContent(prompt);
    const resp = await result.response.text();

    const jsonResponse = JSON.parse(resp);

    console.log("Response from gemini api", jsonResponse);
    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message });
  }
}
