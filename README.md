## Customer Service Chatbot

API for Customer service AI chat

### Running instructions

Tested with node 20

1. npm install
2. npm run dev

### Populate Qdrant (Vector Store)

1. Add JSON data in `src/scripts/data`
2. Set collection name and Qdrant location in `src/clients/qdrant.ts`
3. Run `npm run docs:add -- $jsonDataLocation`
