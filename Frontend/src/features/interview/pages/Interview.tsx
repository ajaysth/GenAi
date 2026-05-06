import React, {  useState } from 'react'
import '../style/interview.scss'
import { useInterview } from '../hooks/useInterface';


// ── Icons ───────────────────────────────────────────────────────────────────
const TechnicalIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
)

const BehavioralIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
)

const RoadmapIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
    </svg>
)

const ChevronIcon = ({ open }: { open: boolean }) => (
    <svg 
        width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
    >
        <path d="m6 9 6 6 6-6"></path>
    </svg>
)

// ── Types ────────────────────────────────────────────────────────────────────
type Question = {
    question: string
    intention: string
    answer: string
}

type RoadMapDayType = {
    day: number
    focus: string
    tasks: string[]
}

type SkillGap = {
    skill: string
    severity: 'low' | 'medium' | 'high'
}

type Report = {
    title: string
    matchScore: number
    technicalQuestions: Question[]
    behavioralQuestions: Question[]
    preparationPlans?: RoadMapDayType[]
    skillGaps: SkillGap[]
}


// ── Nav Items ───────────────────────────────────────────────────────────────
const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: <TechnicalIcon /> },
    { id: 'behavioral', label: 'Behavioral Questions', icon: <BehavioralIcon /> },
    { id: 'roadmap', label: 'Road Map', icon: <RoadmapIcon /> },
] as const

type NavType = typeof NAV_ITEMS[number]['id']

// ── Sub-components ────────────────────────────────────────────────────────────
const CircularProgress: React.FC<{ score: number }> = ({ score }) => {
    const radius = 50
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (score / 100) * circumference

    return (
        <div className="match-score__circle-container">
            <svg className="match-score__svg" width="120" height="120">
                <circle className="match-score__bg" cx="60" cy="60" r={radius} />
                <circle 
                    className="match-score__progress" 
                    cx="60" cy="60" r={radius} 
                    style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
                />
            </svg>
            <div className="match-score__text-container">
                <span className="match-score__value">{score}</span>
                <span className="match-score__pct">%</span>
            </div>
        </div>
    )
}

const QuestionCard: React.FC<{ item: Question; index: number }> = ({ item, index }) => {
    const [open, setOpen] = useState<boolean>(index === 0)

    return (
        <div className={`q-card ${open ? 'q-card--open' : ''}`}>
            <div className='q-card__header' onClick={() => setOpen(o => !o)}>
                <span className='q-card__index'>Q{index + 1}</span>
                <p className='q-card__question'>{item.question}</p>
                <div className="q-card__chevron">
                    <ChevronIcon open={open} />
                </div>
            </div>

            {open && (
                <div className='q-card__body'>
                    <div className="q-card__section">
                        <span className="q-card__tag q-card__tag--intention">Intention</span>
                        <p>{item.intention}</p>
                    </div>
                    <div className="q-card__section">
                        <span className="q-card__tag q-card__tag--answer">Model Answer</span>
                        <p>{item.answer}</p>
                    </div>
                    <button className="q-card__close-btn" onClick={() => setOpen(false)}>
                        Close Answer
                    </button>
                </div>
            )}
        </div>
    )
}



// ── Main Component ────────────────────────────────────────────────────────────
const Interview: React.FC = () => {
    const [activeNav, setActiveNav] = useState<NavType>('technical')


    const {report,loading}: {report: Report | null, loading: boolean} = useInterview()

    

        if(loading) return <p>Loading...</p>
        
        if(!report) return null


        const RoadMapItem: React.FC<{ day: RoadMapDayType }> = ({ day }) => (
    <div className="roadmap-item">
        <div className="roadmap-item__dot" />
        <div className="roadmap-item__content">
            <div className="roadmap-item__header">
                <span className="roadmap-item__day">Day {day.day}</span>
                <h3 className="roadmap-item__focus">{day.focus}</h3>
            </div>
            <ul className="roadmap-item__tasks">
                {day.tasks.map((task, i) => (
                    <li key={i}>{task}</li>
                ))}
            </ul>
        </div>
    </div>
)

console.log(report )


    

    

    return (
        <div className='interview-page'>
            <div className="interview-layout">
                {/* Left Sidebar */}
                <nav className="interview-nav">
                    <div>
                        <p className="interview-nav__label">Sections</p>
                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                className={`interview-nav__item ${activeNav === item.id ? 'interview-nav__item--active' : ''}`}
                                onClick={() => setActiveNav(item.id)}
                            >
                                <span className="interview-nav__icon">{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>
                </nav>

                {/* Main Content */}
                <main className="interview-content">
                    {activeNav === 'technical' && (
                        <section>
                            <div className="content-header">
                                <h2>Technical Questions</h2>
                                <span className="content-header__count">{report.technicalQuestions.length} questions</span>
                            </div>
                            <div className="interview-scroll-area">
                                <div className="q-list">
                                    {report.technicalQuestions.map((q, i) => (
                                        <QuestionCard key={i} item={q} index={i} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section>
                            <div className="content-header">
                                <h2>Behavioral Questions</h2>
                                <span className="content-header__count">{report.behavioralQuestions.length} questions</span>
                            </div>
                            <div className="interview-scroll-area">
                                <div className="q-list">
                                    {report.behavioralQuestions.map((q, i) => (
                                        <QuestionCard key={i} item={q} index={i} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section>
                            <div className="content-header">
                                <h2>Preparation Road Map</h2>
                                <span className="content-header__count">7-day plan</span>
                            </div>
                            <div className="interview-scroll-area">
                                <div className="roadmap-container">
                                    <div className="roadmap-line" />
                                    {report.preparationPlans?.map((day, i) => (
                                        <RoadMapItem key={i} day={day} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                </main>

                {/* Right Sidebar */}
                <aside className="interview-sidebar">
                    <div className="match-score">
                        <p className="match-score__label">Match Score</p>
                        <CircularProgress score={report.matchScore} />
                        <p className="match-score__desc">Strong match for this role</p>
                    </div>

                    <div className="skill-gaps">
                        <p className="skill-gaps__label">Skill Gaps</p>
                        <div className="skill-gaps__list">
                            {report.skillGaps.map((gap, i) => (
                                <div key={i} className={`skill-tag skill-tag--${gap.severity}`}>
                                    {gap.skill}
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Interview