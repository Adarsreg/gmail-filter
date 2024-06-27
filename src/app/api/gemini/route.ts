//endpoint that would receive the email and send it to gemini api for classification
//this endpoint to be called by the button in the layout component
// classifyEmail.ts

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const generationconfig = {};
