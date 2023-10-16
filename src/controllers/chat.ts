import type { Request, Response } from "express";
import { qdrantClient } from "../clients/qdrant";
import { generateSystemPrompt } from "../utils/prompts";
import { Chat } from "../services/chat";

type RequestBody = {
  messages: string[];
};

export async function chat(
  req: Request<any, any, RequestBody>,
  res: Response
): Promise<Response<any, Record<string, any>>> {
  if (!req.body.messages) {
    return res.status(400).send("Messages key missing");
  }
  const userMessage = req.body.messages[req.body.messages.length - 1]; // assume last message is from user
  const messages = req.body.messages;

  const relatedContent =
    await qdrantClient.similaritySearchWithScore(userMessage);

  const systemPrompt = generateSystemPrompt(
    relatedContent.map((doc) => doc[0].pageContent)
  );

  const chat = new Chat(systemPrompt, messages);
  const aiResponse = await chat.getAiResponse();
  const allMessagesExceptSystem = chat.getAllMessagesExceptSystem();

  return res.json({ aiResponse, messages: allMessagesExceptSystem });
}
