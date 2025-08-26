import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    const emails = await request.json();
    const emailSnippets = emails.map((e: any) => ({
      id: e.id,
      snippet: e.snippet,
    }));

    console.log("Email Snippets:", emailSnippets);

    const promptText = `Classify each email snippet into one of the categories: Important (e.g., related to account security or shipping), Promotions (e.g., promotional offers), Social (e.g., social media updates), Marketing (e.g., newsletters, notifications), Spam (e.g., unsolicited messages), or General (everything else). Respond with a JSON array of objects, each with "id" and "classification" fields only—no explanation, just the raw JSON:\n${JSON.stringify(emailSnippets)}\n`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: promptText,
      config: {
        responseMimeType: "application/json",
      },
    });

    const respText = response.text;
    console.log("Gemini response:", respText);

    let json;
    try {
      json = JSON.parse(respText);
    } catch (parseErr) {
      console.error("Failed to parse JSON:", parseErr, respText);
      return NextResponse.json({ error: "Failed to parse Gemini API response as JSON." }, { status: 500 });
    }

    console.log("Classification result:", json);
    return NextResponse.json(json);
  } catch (err) {
    console.error("Error in /classify route:", err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
