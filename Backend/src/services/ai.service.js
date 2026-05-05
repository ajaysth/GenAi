import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
// import puppeteer from "puppeteer";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

//  async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
//     const prompt = `
// You are a STRICT JSON generator. Output ONLY valid JSON that exactly matches the schema. 
// No explanations, no markdown, no extra text, no additional fields.

// INPUT:
// Resume: ${resume}
// Self Description: ${selfDescription}
// Job Description: ${jobDescription}
// Here is an example of correct output:
// Here is an example of the EXACT output format I want:

// {
//   "title": "Mid-Level MERN Stack Developer (Frontend-leaning)",
//   "matchScore": 78,
//   "technicalQuestions": [
//     {
//       "question": "Can you walk us through how you would design a reusable data table component in React that supports sorting, filtering, and pagination?",
//       "intention": "To evaluate the candidate's component architecture skills, performance considerations, and understanding of React best practices.",
//       "answer": "Start by breaking the component into smaller pieces using composition. Use React.memo for rows, useMemo for filtered/sorted data, and useCallback for event handlers. Explain state management choices (local vs Redux), accessibility implementation with ARIA, and how you handled similar requirements in past projects."
//     },
//     {
//       "question": "How do you implement secure authentication in a Node.js + Express application?",
//       "intention": "To assess knowledge of JWT, security best practices, and backend security.",
//       "answer": "Use JWT for access tokens stored in httpOnly cookies, refresh tokens with rotation, bcrypt for password hashing, and implement proper middleware for authorization. Mention protection against common attacks like XSS and CSRF."
//     }
//   ],
//   "behavioralQuestions": [
//     {
//       "question": "Tell me about a time when you had to learn a new technology quickly to complete a project.",
//       "intention": "To evaluate learning agility and adaptability.",
//       "answer": "Use STAR method: Situation, Task, Action, Result. Highlight how you learned TypeScript for the current side project and the improvements seen in code quality."
//     }
//   ],
//   "skillGaps": [
//     {
//       "skill": "Production TypeScript experience",
//       "severity": "high"
//     },
//     {
//       "skill": "AWS & CI/CD pipelines",
//       "severity": "medium"
//     },
//     {
//       "skill": "Automated testing (Jest, React Testing Library)",
//       "severity": "medium"
//     }
//   ],
//   "preparationPlan": [
//     {
//       "day": 1,
//       "focus": "TypeScript Fundamentals",
//       "tasks": [
//         "Complete TypeScript official handbook (basics + advanced types)",
//         "Convert 3 components from current project to TypeScript",
//         "Watch 'TypeScript Course for Beginners' by Traversy Media"
//       ]
//     },
//     {
//       "day": 2,
//       "focus": "Testing",
//       "tasks": [
//         "Learn Jest + React Testing Library",
//         "Write tests for at least 5 components",
//         "Practice testing API endpoints with Supertest"
//       ]
//     }
//   ]
// }

// Now generate the real report using the exact same structure for the given candidate.Now generate for the actual candidate.
// `;

//     try {
//         const response = await ai.models.generateContent({
//             model: "gemini-2.5-flash",   // ← Change this
//             contents: prompt,
//             config: {
//                 responseMimeType: "application/json",
//                 responseSchema: zodToJsonSchema(interviewReportSchema, { target: "jsonSchema7" }),
//             }
//         });

//         console.log(response.text)

//     } catch (err) {
//         console.error("Error:", err);
//         throw err;
//     }
// }

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const shortResume = resume.length > 7500 ? resume.slice(0, 7500) + "\n...[truncated]" : resume;
    const shortJD = jobDescription.length > 5500 ? jobDescription.slice(0, 5500) + "\n...[truncated]" : jobDescription;

    const prompt = `
You are a strict JSON generator. Output **ONLY** valid JSON. Nothing else. No explanations, no markdown.

Here is the exact schema you must follow:

{
  "title": string,
  "matchScore": number (0-100),
  "technicalQuestions": array of objects with { "question": string, "intention": string, "answer": string },
  "behavioralQuestions": array of objects with { "question": string, "intention": string, "answer": string },
  "skillGaps": array of objects with { "skill": string, "severity": "low" | "medium" | "high" },
  "preparationPlan": array of objects with { "day": number, "focus": string, "tasks": array of strings }
}

Example of correct output:
{
  "title": "Mid-Level MERN Stack Developer (Frontend-leaning)",
  "matchScore": 78,
  "technicalQuestions": [
    {
      "question": "Can you walk me through designing a complex reusable React data table with filtering and pagination?",
      "intention": "To evaluate component architecture, performance, and accessibility knowledge.",
      "answer": "Break it down using composition, use memoization techniques (useMemo, useCallback, React.memo), implement ARIA attributes for accessibility..."
    }
  ],
  "behavioralQuestions": [
    {
      "question": "Tell me about a challenging project where you had to learn new technologies quickly.",
      "intention": "To assess learning agility and problem-solving approach.",
      "answer": "Use STAR method. Describe how you learned TypeScript while building the GenAI Interview Coach project..."
    }
  ],
  "skillGaps": [
    { "skill": "Production TypeScript", "severity": "high" },
    { "skill": "AWS and CI/CD", "severity": "medium" },
    { "skill": "Automated Testing (Jest + RTL)", "severity": "medium" }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "Strengthen TypeScript",
      "tasks": ["Complete official TypeScript handbook", "Convert existing components to TypeScript", "Practice with advanced types"]
    },
    {
      "day": 2,
      "focus": "Testing Skills",
      "tasks": ["Learn Jest and React Testing Library", "Write tests for 4-5 components", "Study Supertest for backend testing"]
    }
  ]
}

Now generate the real report for this candidate using the exact same structure:

Resume: ${shortResume}

Self Description: ${selfDescription}

Job Description: ${shortJD}
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json"
                // ← No responseSchema here
            }
        });

        const raw = response.text.trim();
        console.log("=== RAW OUTPUT ===\n", raw);

        const parsed = JSON.parse(raw);
        
        // Optional: Validate with Zod anyway
        const validated = interviewReportSchema.parse(parsed);
        
        console.log("✅ Success!");
        return validated;

    } catch (err) {
        console.error("Failed. Raw output was:", response?.text?.substring(0, 800));
        throw err;
    }
}

export default generateInterviewReport
