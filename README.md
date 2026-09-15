# Seongnam-KAIST-AI-Contest-2026
2026년 제2회 성남×KAIST AI 경진대회 출품작
성남사랑상품권 결제를 편리하게 해주는 AI 보조 앱, 착새

## 폴더 구조 
```
seongnam-pay-assistant/
├── android-app/                          # 네이티브 안드로이드 앱 (Kotlin)
│   └── app/src/main/java/com/seongnam/payassistant/
│       ├── assistant/                    # ROLE_ASSISTANT 관련
│       │   ├── PayVoiceInteractionService.kt
│       │   ├── PayVoiceInteractionSessionService.kt
│       │   └── PayVoiceInteractionSession.kt
│       ├── stt/
│       │   └── SpeechToTextManager.kt    # 안드로이드 내장 SpeechRecognizer 래퍼
│       ├── tts/
│       │   └── TextToSpeechManager.kt    # 안드로이드 내장 TextToSpeech 래퍼
│       ├── location/
│       │   └── LocationHelper.kt         # GPS 위치 가져오기
│       ├── network/
│       │   ├── ApiService.kt             # 백엔드 API 호출 인터페이스 (Retrofit)
│       │   └── RetrofitClient.kt
│       ├── ui/                           # 온보딩, 권한 요청, 설정 화면
│       └── MainActivity.kt
│
├── backend/                              # 서버 (Node.js + TypeScript)
│   └── src/
│       ├── routes/
│       │   ├── voice.ts                  # 음성 인식 텍스트 받아서 LLM에 넘기는 엔드포인트
│       │   ├── stores.ts                 # 가맹점 후보 엔드포인트
│       │   └── payment.ts                # 결제 요청 처리 (지금은 목업)
│       ├── services/
│       │   ├── llmService.ts             # LLM function calling 로직
│       │   ├── storeRanking.ts           # 방문이력 기반 가게 우선순위 로직
│       │   └── geocoding.ts              # 주소 → 좌표 변환
│       ├── jobs/
│       │   └── syncMerchants.ts          # data.go.kr에서 가맹점 데이터 주기적으로 긁어와 DB에 저장
│       ├── db/
│       │   └── firestore.ts              # DB 연결 설정
│       └── index.ts                      # 서버 시작점
│
│
└── README.md
```
