import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Video } from '../types';

if (!process.env.API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this project, we assume it's set in the execution environment.
  console.warn("API_KEY environment variable not set. Using a placeholder.");
  // A mock key to prevent app from crashing immediately, though API calls will fail.
  process.env.API_KEY = "mock_api_key_for_testing";
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const parseJsonFromText = <T,>(text: string): T => {
  let jsonStr = text.trim();
  const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
  const match = jsonStr.match(fenceRegex);
  if (match && match[2]) {
    jsonStr = match[2].trim();
  }
  try {
    return JSON.parse(jsonStr) as T;
  } catch (e) {
    console.error("Failed to parse JSON response:", e, "Raw text:", text);
    throw new Error("The AI returned a response in an unexpected format.");
  }
};


export const generateVideoContent = async (topic: string): Promise<Video> => {
    // We will generate title, script, and thumbnail prompt in one call for efficiency
    const contentGenerationPrompt = `
      You are an AI assistant for a YouTube content creator. Your task is to generate content for a short video based on the topic: "${topic}".

      Please generate the following three items and return them in a single JSON object with the keys "videoTitle", "videoScript", and "thumbnailPrompt":

      1.  "videoTitle": A catchy, SEO-friendly YouTube title for this story. Keep it under 70 characters.
      2.  "videoScript": A 150-200 word script for the video. It should have a clear introduction, body, and conclusion. Start the script with a hook to grab the viewer's attention. Write in a conversational, engaging tone suitable for a YouTube audience. Use paragraph breaks (\\n) for readability.
      3.  "thumbnailPrompt": A descriptive, dynamic, and visually interesting prompt for an AI image generator to create a thumbnail for this video. Focus on strong imagery, vibrant colors, and clear subjects. Do not include any text in the prompt. For example: "Dramatic shot of a futuristic robot assembly line, sparks flying, with a glowing blue CPU at the center, cinematic lighting, hyper-realistic."

      Return ONLY the JSON object.
    `;

    try {
        const contentResponse: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-preview-04-17',
            contents: contentGenerationPrompt,
            config: {
                responseMimeType: 'application/json',
                temperature: 0.8,
            },
        });

        const { videoTitle, videoScript, thumbnailPrompt } = parseJsonFromText<{ videoTitle: string; videoScript: string; thumbnailPrompt: string; }>(contentResponse.text);

        const imageResponse = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: thumbnailPrompt,
            config: { numberOfImages: 1, outputMimeType: 'image/jpeg' },
        });

        const base64ImageBytes: string = imageResponse.generatedImages[0].image.imageBytes;
        const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;

        return {
            id: Date.now().toString(),
            title: videoTitle,
            script: videoScript,
            thumbnailUrl: imageUrl,
            createdAt: new Date().toISOString(),
        };

    } catch (error) {
        console.error("Error generating video content:", error);
        throw new Error("Failed to generate video content. The API might be down or the request was invalid.");
    }
};
