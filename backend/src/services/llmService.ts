import { GoogleGenAI, Type } from "@google/genai";
import { Store } from "../data/mockStores";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY가 .env에 설정되어 있지 않습니다.");
}

const ai = new GoogleGenAI({ apiKey });

export interface VoiceExtractionResult {
  matchedStoreId: string | null;
  amount: number | null;
  needsConfirmation: boolean;
  replyMessage: string;
}

export async function extractPaymentIntent(
  userText: string,
  candidates: (Store & { distanceKm?: number })[]
): Promise<VoiceExtractionResult> {
  const candidateList = candidates
    .map((c) => `- id: ${c.id}, 이름: ${c.name}, 거리: ${c.distanceKm?.toFixed(2)}km`)
    .join("\n");

  const systemInstruction = `당신은 성남사랑상품권 결제를 돕는 음성 비서입니다.
사용자의 발화에서 (1) 결제하려는 가게, (2) 결제 금액을 추출하세요.

근처 가맹점 후보 목록(거리가 가까운 순):
${candidateList}

규칙:
- 사용자가 가게 이름을 명확히 언급하지 않았다면, 후보 중 가장 가까운(거리가 짧은) 가게를 우선으로 추정하세요.
- 금액이 없으면 amount는 null로 두세요.
- 사용자에게 다시 확인받아야 할 내용(가게, 금액)이 있다면 needsConfirmation을 true로 하고, replyMessage에 "OO에 OO원 보내드릴까요?" 형태의 자연스러운 확인 문장을 담으세요.
- 가게를 후보 중에서 전혀 특정할 수 없다면 matchedStoreId는 null로 두고, replyMessage에 어느 가게인지 되묻는 문장을 담으세요.
- 반드시 지정된 JSON 형식으로만 응답하세요.`;

  const response = await ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents: userText,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          matchedStoreId: {
            type: Type.STRING,
            nullable: true,
            description: "후보 목록 중 매칭된 가게의 id. 특정할 수 없으면 null.",
          },
          amount: {
            type: Type.NUMBER,
            nullable: true,
            description: "인식된 결제 금액(원). 언급 없으면 null.",
          },
          needsConfirmation: {
            type: Type.BOOLEAN,
            description: "사용자에게 재확인이 필요한지 여부.",
          },
          replyMessage: {
            type: Type.STRING,
            description: "TTS로 사용자에게 들려줄 확인/재질문 문장.",
          },
        },
        required: ["matchedStoreId", "amount", "needsConfirmation", "replyMessage"],
      },
    },
  });

  if (!response.text) {
    throw new Error("LLM이 응답을 반환하지 않았습니다.");
  }

  return JSON.parse(response.text) as VoiceExtractionResult;
}