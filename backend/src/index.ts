import "dotenv/config"; 
import express from "express";
import cors from "cors";
import storesRouter from "./routes/stores";
import voiceRouter from "./routes/voice";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/stores", storesRouter);
app.use("/voice", voiceRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});