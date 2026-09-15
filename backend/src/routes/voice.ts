import { Router } from "express";
import { extractPaymentIntent } from "../services/llmService";
import { mockStores } from "../data/mockStores";

const router = Router();

router.post("/", async (req, res) => {
  const { text, candidates } = req.body;

  if (!text) {
    return res.status(400).json({ error: "text 필드가 필요합니다." });
  }

  // candidates를 안 보내면 목업 전체를 후보로 사용 (테스트 편의용, 배포 전 삭제 예정~)
  const storeCandidates = candidates && candidates.length > 0 ? candidates : mockStores;

  try {
    const result = await extractPaymentIntent(text, storeCandidates);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "LLM 처리 중 오류가 발생했습니다." });
  }
});

export default router;