export type Question = {
  question: string
  intention: string
  answer: string
}
export type SkillGap = {
  skill: string
  severity: 'low' | 'medium' | 'high'
}

export type PreparationDay = {
  day: number
  focus: string
  tasks: string[]
}

export type InterviewReport = {
  title: string
  matchScore: number // 0–100
  technicalQuestions: Question[]
  behavioralQuestions: Question[]
  skillGaps: SkillGap[]
  preparationPlan: PreparationDay[]
}