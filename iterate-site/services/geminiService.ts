
import { GoogleGenAI, Type } from "@google/genai";
import { IterationResult } from "../types";

export const iterateIdea = async (idea: string): Promise<IterationResult[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `你现在是 Iterate (寸止) 软件的演示引擎。
    用户输入了一个对话片段或任务构想。
    请模拟“派 (Pai)”模块的工作流程，将这个输入迭代为 3 个不同深度的协作指令包（v1.1, v2.0, v3.0）。
    v1.1 侧重于快速拦截与确认；
    v2.0 侧重于结合“记 (Ji)”模块的背景优化；
    v3.0 侧重于生成完整的子代理派发任务。
    必须使用中文。
    
    用户输入: "${idea}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            version: { type: Type.STRING, description: "版本号" },
            content: { type: Type.STRING, description: "生成的指令包内容" },
            focus: { type: Type.STRING, description: "模块关联点（如：拦截、记忆注入、代理派发）" }
          },
          required: ["version", "content", "focus"]
        }
      }
    }
  });

  try {
    const jsonStr = response.text?.trim() || "[]";
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("演示引擎响应异常", e);
    return [];
  }
};
