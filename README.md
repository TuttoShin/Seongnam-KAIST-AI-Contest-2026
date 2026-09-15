# Seongnam-KAIST-AI-Contest-2026
2026년 제2회 성남×KAIST AI 경진대회 출품작
성남사랑상품권 결제를 편리하게 해주는 AI 보조 앱, 착새

## 📁 폴더 구조 
```
📂 Seongnam-KAIST-AI-Contest-2026/
├── android-app/ # 안드로이드 앱 (Kotlin + Jetpack Compose)
│ └── app/src/main/java/com/seongnam/chackbird/
│ ├── assistant/ # ROLE_ASSISTANT / VoiceInteractionService (예정)
│ │ ├── ChackVoiceInteractionService.kt
│ │ ├── ChackVoiceInteractionSessionService.kt
│ │ └── ChackVoiceInteractionSession.kt
│ ├── stt/
│ │ └── SpeechToTextManager.kt # 안드로이드 내장 SpeechRecognizer 래퍼 (예정)
│ ├── tts/
│ │ └── TextToSpeechManager.kt # 안드로이드 내장 TextToSpeech 래퍼 (예정)
│ ├── location/
│ │ └── LocationHelper.kt # GPS 위치 가져오기 (예정)
│ ├── network/
│ │ ├── ApiService.kt # 백엔드 API 호출 인터페이스 (Retrofit)
│ │ └── RetrofitClient.kt # (예정)
│ ├── ui/ # 온보딩, 권한 요청, 설정 화면
│ ├── ui.theme/ 
│ └── MainActivity.kt
│
├── backend/ # 서버 (Node.js + Express + TypeScript)
│ └── src/
│ ├── routes/
│ │ ├── stores.ts # 위치 기반 가맹점 조회 엔드포인트
│ │ ├── voice.ts # 발화 → 가게/금액 추출 엔드포인트 (Gemini API)
│ │ └── payment.ts # 결제 처리 엔드포인트 (현재 목업)
│ ├── services/
│ │ ├── llmService.ts # Gemini API 구조화 출력(JSON Schema) 로직
│ │ ├── storeRanking.ts # 방문이력 기반 가게 우선순위 로직 (예정) 
│ │ └── geocoding.ts # 주소 → 좌표 변환 (카카오 로컬 API) (예정) 
│ ├── data/
│ │ └── mockStores.ts # 가맹점 목업 데이터
│ ├── jobs/
│ │ └── syncMerchants.ts # 공공데이터포털 API로 가맹점 데이터 동기화 (예정) 
│ ├── index.ts # 서버 시작점
│
└── README.md
```
