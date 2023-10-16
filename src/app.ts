import express from "express";
import { router } from "./routes";

const app: express.Application = express();

app.use(express.json());
app.use(router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
