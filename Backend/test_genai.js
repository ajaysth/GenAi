import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });
const schema = z.object({
    name: z.string()
});

const jsonSchema = zodToJsonSchema(schema, "mySchema").definitions.mySchema;

async function run() {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "say hi and tell me your name",
            config: {
                responseMimeType: "application/json",
                responseSchema: jsonSchema
            }
        });
        console.log("Success:", response.text);
    } catch(e) {
        console.error("Error:", e);
    }
}
run();
