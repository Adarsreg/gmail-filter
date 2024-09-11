import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Retrieve the API key from Upstash Redis
    const apiKey = await db.get(`user:${session.user.id}:apiKey`);

    if (!apiKey) {
      return NextResponse.json({ error: "API key not found" }, { status: 404 });
    }

    // Initialize Google Generative AI client with the retrieved API key
    const genAI = new GoogleGenerativeAI(apiKey as string);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.0-pro",
    });

    const emails = await request.json();
    const emailsnippets = emails.map((email: { id: any; snippet: any }) => {
      return {
        id: email.id,
        snippet: email.snippet,
      };
    });
    console.log("EmailSnippets", emailsnippets);

    const prompt = `I want you to classify my emails precisely Important(emails related to account security or shipping related or more) or Promotions(Mainly promotional emails) or Social(common mails from social media sites like Quora or Facebook or any social media) or Marketing(Emails related to marketing, newsletters, and notifications) or Spam(Unwanted or unsolicited emails) or General(Emails that do not fit into any of the above categories) based on their snippet property and return an array of jsons with its respective "id" as a key and "classification" as another key whilst behaving like an api,do not reply in english : ${JSON.stringify(
      emailsnippets
    )} `;
    console.log("Prompt", prompt);

    const result = await model.generateContent(prompt);
    const resp = await result.response.text();

    const jsonResponse = JSON.parse(resp);

    console.log("Response from gemini api", jsonResponse);
    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: (error as Error).message });
  }
}
