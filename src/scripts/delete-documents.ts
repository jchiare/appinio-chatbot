import { qdrantClient, COLLECTION_NAME } from "../clients/qdrant";

if (require.main === module) {
  (async () => {
    await qdrantClient.client.deleteCollection(COLLECTION_NAME);
  })().catch((err) => {
    console.error("An error occurred:", err);
  });
}
