import OpenAI from "openai";

type ChatCompletionParams =
  OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming;

type RoleType = OpenAI.Chat.Completions.ChatCompletionRole;

export class ChatMessage {
  content: string;
  role: RoleType;

  constructor(content: string, role: RoleType) {
    this.content = content;
    this.role = role;
  }
}

export class Chat {
  messages: ChatMessage[];
  #llm: OpenAI;
  #model: string;

  constructor(systemPrompt: string, messages: string[], model = "gpt-4") {
    this.#llm = new OpenAI();
    this.#model = model;
    this.messages = this.initializeMessages(systemPrompt, messages);
  }

  getAllMessagesExceptSystem() {
    return this.messages.slice(1);
  }

  addMessage(message: string, role: RoleType) {
    this.messages.push(new ChatMessage(message, role));
  }

  async getAiResponse(): Promise<string | null> {
    const body: ChatCompletionParams = {
      messages: this.messages,
      model: this.#model,
      temperature: 0
    };
    const response = await this.#llm.chat.completions.create(body);
    const aiMessage = response.choices[0].message.content;
    if (!aiMessage) {
      // not sure why this would happen, but to make typescript happy ..
      throw new Error("No message returned from AI");
    }
    this.addMessage(aiMessage, "assistant");
    return response.choices[0].message.content;
  }

  private initializeMessages(systemPrompt: string, messages: string[]) {
    let newMessages = [];
    // assume first message is from user
    for (let i = 0; i < messages.length; i++) {
      if (i % 2 === 0) {
        newMessages.push(new ChatMessage(messages[i], "assistant"));
      } else {
        newMessages.push(new ChatMessage(messages[i], "user"));
      }
    }
    return [new ChatMessage(systemPrompt, "system"), ...newMessages];
  }
}
