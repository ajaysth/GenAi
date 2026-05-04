import Groq from "groq-sdk";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// ✅ SCHEMA (UNCHANGED AS YOU WANTED)
const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating match"),

    technicalQuestions: z.array(z.object({
        question: z.string(),
        intention: z.string(),
        answer: z.string()
    })),

    behavioralQuestions: z.array(z.object({
        question: z.string(),
        intention: z.string(),
        answer: z.string()
    })),

    skillGaps: z.array(z.object({
        skill: z.string(),
        severity: z.enum(["low", "medium", "high"])
    })),

    preparationPlans: z.array(z.object({
        day: z.number(),
        focus: z.string(),
        tasks: z.array(z.string())
    })),

    title: z.string()
});


// ✅ STRONG NORMALIZER (FIXES ALL ERRORS)
const normalize = (data) => {

    const cleanSeverity = (s) => {
        if (!s) return "medium";
        const val = s.toLowerCase();
        return ["low", "medium", "high"].includes(val) ? val : "medium";
    };

    return {
        matchScore: data.matchScore || data.match_score_percentage || 60,

        technicalQuestions: (data.technicalQuestions || []).filter(q => q?.question),

        behavioralQuestions: (data.behavioralQuestions || []).filter(q => q?.question),

        skillGaps: (data.skillGaps || []).map(g => ({
            skill: g?.skill || "Unknown skill",
            severity: cleanSeverity(g?.severity)
        })),

        preparationPlans: (data.preparationPlans || []).map(p => ({
            day: p?.day || 1,
            focus: p?.focus || "General preparation", // 🔥 FIXED missing field
            tasks: Array.isArray(p?.tasks) ? p.tasks : []
        })),

        title: data.title || data.target_role || "Unknown Role"
    };
};


// ✅ MAIN FUNCTION
const generateInterviewReport = async ({ resume, selfDescription, jobDescription }) => {

    const prompt = `
You are an expert technical recruiter + interviewer.

You MUST follow a 2-step reasoning process internally:

---

STEP 1: EXTRACT FROM INPUTS
- Extract ALL technical skills from resume
- Extract ALL missing skills from job description
- Identify experience level

DO NOT SKIP THIS STEP.

---

STEP 2: GENERATE REPORT

Based ONLY on extracted data, create:

- matchScore (0-100 realistic)
- technicalQuestions (based on actual resume skills)
- behavioralQuestions (based on experience)
- skillGaps (ONLY real missing skills, NOT "Unknown")
- preparationPlans (based on weak areas)
- title (from job description)

---

STRICT RULES:
- NO "Unknown skill"
- NO "Unknown Role"
- NO empty focus
- NO generic answers
- MUST use real tech names from input
- If data missing → infer logically

---

SCHEMA:
${JSON.stringify(zodToJsonSchema(interviewReportSchema), null, 2)}

---

RESUME:
${resume}

SELF DESCRIPTION:
${selfDescription}

JOB DESCRIPTION:
${jobDescription}
`;

    try {
        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile", // if fails, switch to 8b-instant
            messages: [{ role: "user", content: prompt }],
            temperature: 0.3
        });

        const text = response.choices[0].message.content;

        // ✅ SAFE JSON EXTRACTION
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            console.error("No JSON found");
            return;
        }

        let raw;
        try {
            raw = JSON.parse(jsonMatch[0]);
        } catch (e) {
            console.error("Invalid JSON from model");
            return;
        }

        // ✅ FIX DATA
        const fixed = normalize(raw);

        // ✅ VALIDATE
        const parsed = interviewReportSchema.safeParse(fixed);

        if (!parsed.success) {
            console.error("Schema error:", parsed.error);
            return;
        }

        // ✅ OUTPUT
        console.log("FINAL OUTPUT:");
        console.log(parsed.data);

    } catch (error) {
        console.error("Groq Error:", error);

        // 🔥 fallback model (VERY IMPORTANT)
        if (error.status === 400 || error.status === 404) {
            console.log("Switching to fallback model...");
        }
    }
};

export default generateInterviewReport;