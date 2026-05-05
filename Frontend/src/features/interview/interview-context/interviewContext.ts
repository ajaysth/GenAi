import { createContext } from 'react';

// Question (shared by technical + behavioral)
export type Question = {
  question: string
  intention: string
  answer: string
}

// Skill Gap
export type SkillGap = {
  skill: string
  severity: 'low' | 'medium' | 'high'
}

// Roadmap Day
export type PreparationDay = {
  day: number
  focus: string
  tasks: string[]
}

// Main Report Type
export type InterviewReport = {
  title: string
  matchScore: number // 0–100
  technicalQuestions: Question[]
  behavioralQuestions: Question[]
  skillGaps: SkillGap[]
  preparationPlan?: PreparationDay[]
}

interface InterviewContextType {
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    report: InterviewReport | null
    setReport: React.Dispatch<React.SetStateAction<InterviewReport | null>>
    reports: InterviewReport[],
    setReports: React.Dispatch<React.SetStateAction<InterviewReport[]>>
}

const InterviewContext = createContext<InterviewContextType | null>(null)
export default InterviewContext