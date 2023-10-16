import { qdrantClient, COLLECTION_NAME } from "../clients/qdrant";

if (require.main === module) {
  (async () => {
    const response = await qdrantClient.client.scroll(COLLECTION_NAME, {
      limit: 1000
    }); // Get 1000 documents - should refactor once we have many docs

    console.log(response.points);
  })().catch((err) => {
    console.error("An error occurred:", err);
  });
}
