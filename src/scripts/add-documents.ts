import { JSONLoader } from "langchain/document_loaders/fs/json";
import { resolve } from "path";
import { qdrantClient } from "../clients/qdrant";

async function storeJsonDocument(jsonDocument: string): Promise<void> {
  const jsonPath = resolve(process.cwd(), `src/scripts/data/${jsonDocument}`);
  const loader = new JSONLoader(jsonPath);
  const docs = await loader.load();

  console.log(`adding upto ${docs.length} documents`);
  await qdrantClient.addDocuments(docs);
}

if (require.main === module) {
  (async () => {
    await storeJsonDocument(process.argv[2]);
  })().catch((err) => {
    console.error("An error occurred:", err);
  });
}
