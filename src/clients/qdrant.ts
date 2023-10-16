import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { QdrantVectorStore } from "langchain/vectorstores/qdrant";

export const COLLECTION_NAME = "hi";
export const qdrantClient = new QdrantVectorStore(new OpenAIEmbeddings(), {
  url: "http://localhost:6333",
  collectionName: COLLECTION_NAME
});
