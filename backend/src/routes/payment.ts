import { Router } from "express";
import { mockStores } from "../data/mockStores";

const router = Router();

router.post("/", (req, res) => {
  const { storeId, amount } = req.body;

  if (!storeId || !amount) {
    return res.status(400).json({ error: "storeId와 amount가 필요합니다." });
  }

  const store = mockStores.find((s) => s.id === storeId);
  if (!store) {
    return res.status(404).json({ error: "해당 가맹점을 찾을 수 없습니다." });
  }

  if (typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ error: "결제 금액이 올바르지 않습니다." });
  }

  // 실제 결제 API 연동 전 단계라, 결제 성공을 흉내내는 목업 응답
  const transactionId = `MOCK-${Date.now()}`;

  res.json({
    success: true,
    transactionId,
    storeName: store.name,
    amount,
    message: `${store.name}에 ${amount.toLocaleString()}원 결제가 완료되었습니다. (목업)`,
    timestamp: new Date().toISOString(),
  });
});

export default router;