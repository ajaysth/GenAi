import { useState } from 'react';
import InterviewContext, { type InterviewReport } from './interviewContext';

const InterviewContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [loading, setLoading] = useState(false)
    const [report, setReport] = useState<InterviewReport | null>(null)
    const [reports, setReports] = useState<InterviewReport[]>([])

    return (
        <InterviewContext.Provider value={{loading, setLoading, report, setReport, reports, setReports}}>
            {children}
        </InterviewContext.Provider>
    )
}

export default InterviewContextProvider
