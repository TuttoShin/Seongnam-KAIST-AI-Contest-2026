import express from "express";
import cors from "cors";
import storesRouter from "./routes/stores";
const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/stores", storesRouter);

// 나중에 여기에 stores.ts, voice.ts 라우터를 연결!!
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});