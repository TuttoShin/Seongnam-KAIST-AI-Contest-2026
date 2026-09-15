import { Router } from "express";
import { mockStores } from "../data/mockStores";

const router = Router();

// 두 좌표 사이의 거리를 계산하는 함수 
function getDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // 지구 반지름(km)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

router.get("/", (req, res) => {
  const { lat, lng } = req.query;

  // lat, lng 없이 요청하면 그냥 전체 목록을 반환
  if (!lat || !lng) {
    return res.json(mockStores);
  }

  const userLat = parseFloat(lat as string);
  const userLng = parseFloat(lng as string);

  const storesWithDistance = mockStores
    .map((store) => ({
      ...store,
      distanceKm: getDistanceKm(userLat, userLng, store.lat, store.lng),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm); // 가까운 순 정렬

  res.json(storesWithDistance);
});

export default router;