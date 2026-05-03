import { GoogleGenAI } from "@google/genai";
import { z } from "zod"
import { zodToJsonSchema } from "zod-to-json-schema";


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
        severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlans: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

const generateInterviewReport = async ({ resume, selfDescription, jobDescription }) => {

    const prompt = `Generate an interview report for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}
`

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseJsonSchema: zodToJsonSchema(interviewReportSchema),
            }
        })

        const result = JSON.parse(response.text)
        console.log(result)
        return result
    } catch (error) {
        if (error.status === 429) {
            console.error("Google GenAI API quota exceeded. Using mock data for development.")
            // Return mock data for development when quota is exceeded
            return {
                matchScore: 68,
                technicalQuestions: [
                    {
                        question: "TechNova uses React with TypeScript. How would you approach typing a complex React component?",
                        intention: "Assess practical TypeScript proficiency in React applications.",
                        answer: "I would define clear interfaces for props, use React.PropsWithChildren for children, and leverage generics for reusable patterns."
                    }
                ],
                behavioralQuestions: [
                    {
                        question: "Tell me about a technical challenge you faced while learning a new technology.",
                        intention: "Assess learning agility and problem-solving approach.",
                        answer: "During my GenAi project, transitioning to TypeScript was challenging. I overcame it by deep-diving into documentation and using VS Code's TypeScript server for real-time feedback."
                    }
                ],
                skillGaps: [
                    {
                        skill: "TypeScript Proficiency",
                        severity: "medium"
                    },
                    {
                        skill: "Automated Testing",
                        severity: "high"
                    }
                ],
                preparationPlans: [
                    {
                        day: 1,
                        focus: "Solidify TypeScript proficiency in React applications.",
                        tasks: [
                            "Review React + TypeScript documentation",
                            "Practice typing complex components",
                            "Convert a small project to TypeScript"
                        ]
                    }
                ],
                title: "Full Stack Developer"
            }
        }
        console.error("Error generating interview report:", error)
        return null
    }

}

export default generateInterviewReport