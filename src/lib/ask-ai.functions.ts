import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({ brand: z.string().trim().min(1).max(60) });

export type AskAiResult = {
  answer: string;
  lowVisibility: boolean;
};

const LOW_SIGNALS = [
  "don't have specific information",
  "do not have specific information",
  "don't have enough information",
  "do not have enough information",
  "not familiar with",
  "no specific information",
  "don't have details",
  "do not have details",
  "couldn't find specific",
  "not aware of a",
  "no reliable information",
  "don't have reliable information",
  "i don't have information",
  "unable to find specific",
];

export const askAi = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }): Promise<AskAiResult> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI is not configured right now.");

    const prompt = `Someone just asked an AI assistant: "What is ${data.brand} and what do they offer?"

Respond exactly as a helpful AI assistant would answer that question — in 2 to 4 natural sentences, conversational, with no markdown formatting and no headers or bullet points.

If you have reliable knowledge of this specific brand or company, describe what they do accurately and neutrally.

If you do NOT have specific, reliable information about this exact brand, start by honestly saying you don't have specific information about it, then add one brief, clearly-speculative sentence about what the name might suggest. Do not invent specific facts, founders, locations, or claims as if they were true.`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (res.status === 429) throw new Error("Too many requests right now — try again in a moment.");
    if (res.status === 402) throw new Error("AI credits are exhausted for this workspace.");
    if (!res.ok) throw new Error("Couldn't reach the model just now. Try again.");

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const answer = json.choices?.[0]?.message?.content?.trim() ?? "";
    if (!answer) throw new Error("The model didn't return a response. Try again.");

    const lower = answer.toLowerCase();
    return { answer, lowVisibility: LOW_SIGNALS.some((s) => lower.includes(s)) };
  });
