export interface Store {
  id: string;
  name: string;
  category: string;
  address: string;
  lat: number;
  lng: number;
  paymentMethod: "모바일" | "지류&모바일";
}

export const mockStores: Store[] = [
  {
    id: "1",
    name: "OO커피 판교점",
    category: "카페",
    address: "성남시 분당구 판교역로 100",
    lat: 37.3947,
    lng: 127.1112,
    paymentMethod: "모바일",
  },
  {
    id: "2",
    name: "판교분식",
    category: "음식점",
    address: "성남시 분당구 판교역로 105",
    lat: 37.3951,
    lng: 127.1120,
    paymentMethod: "모바일",
  },
  {
    id: "3",
    name: "행복마트",
    category: "편의점",
    address: "성남시 분당구 판교역로 88",
    lat: 37.3940,
    lng: 127.1098,
    paymentMethod: "지류&모바일",
  },
];