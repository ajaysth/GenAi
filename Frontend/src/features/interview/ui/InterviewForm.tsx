import "../style/home.scss"

import { useInterview } from '../hooks/useInterface';
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";


const InterviewForm = () => {

  const navigate = useNavigate()

  const { loading, generateReport, reports } = useInterview()
  const { handleLogout, user } = useAuth()

  const [jobDescription, setJobDescription] = useState('');
  const [selfDescription, setSelfDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const resumeInputRef = useRef<HTMLInputElement | null>(null)


  const handleGeneratereport = async () => {
    const resumeFile = selectedFile || (resumeInputRef.current?.files ? resumeInputRef.current.files[0] : null);

    if (!resumeFile) {
      // Handle the case when resumeFile is null
      console.error("No file selected");
      return;
    }
    const data = await generateReport({
      jobDescription,
      resumeFile,
      selfDescription
    })
    if (data?._id) {
      navigate(`/interview/${data._id}`)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  }

  const handleViewReport = (id: string) => {
    navigate(`/interview/${id}`)
  }

  const handleLogoutButton = async () => {
    await handleLogout()
    navigate('/auth')
  }

  return (
    <main className="home">
      <section className="page-header">
        <div className="header-top">
          <span className="eyebrow">Create Your Custom</span>
          {user && (
            <div className="user-nav">
              <span className="user-welcome">Hi, {user.username}</span>
              <button onClick={handleLogoutButton} className="logout-button">Logout</button>
            </div>
          )}
        </div>
        <h1>Interview Plan</h1>
        <p className="subtitle">
          Let our AI analyze the job requirements and your unique profile to build a winning strategy.
        </p>
      </section>

      <section className="setup-layout">
        <div className="panel job-panel">
          <div className="panel-title">
            <div>
              <p className="panel-label">Target Job Description</p>
              <span className="status-pill">Required</span>
            </div>
          </div>

          <div className="field-group">
            <textarea
              onChange={(e) => { setJobDescription(e.target.value) }}
              value={jobDescription}
              id="jobDescription"
              name="jobDescription"
              maxLength={5000}
              placeholder="Paste the full job description here... e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'
              "
            />
          </div>

          <div className="field-footer">
            <span>{jobDescription.length} / 5000 chars</span>
          </div>
        </div>

        <div className="panel profile-panel">
          <div className="profile-header">
            <p className="panel-label">Your Profile</p>
          </div>

          <div className="upload-card">
            <div className="upload-icon">{selectedFile ? "📄" : "⬆"}</div>
            <p className="upload-title">
              {selectedFile ? selectedFile.name : "Upload Resume"}
            </p>
            <p className="upload-subtitle">
              {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : "PDF (Max 5MB)"}
            </p>
            <label className="fileLabel" htmlFor="resume">
              {selectedFile ? "Change File" : "Click to upload or drag & drop"}
            </label>
            <input
              ref={resumeInputRef}
              hidden
              type="file"
              accept=".pdf,.docx"
              id="resume"
              name="resume"
              onChange={handleFileChange}
            />
          </div>

          <div className="or-divider">
            <span>OR</span>
          </div>

          <div className="field-group">
            <label htmlFor="selfDescription">Quick Self-Description</label>
            <textarea
              onChange={(e) => { setSelfDescription(e.target.value) }}
              value={selfDescription}
              id="selfDescription"
              name="selfDescription"
              placeholder="Briefly describe your experience, key skills, and years of experience if you don’t have a resume handy..."
            />
          </div>

          <div className="hint-box">
            Either a Resume or a Self Description is required to generate a personalized plan.
          </div>

          <button
            onClick={handleGeneratereport}
            type="button"
            className="button primary-button"
            disabled={loading}
          >
            {loading ? "Generating Your Strategy..." : "Generate My Interview Strategy"}
          </button>
        </div>
      </section>

      {/* Recent Reports Dashboard */}
      {reports.length > 0 && (
        <section className="dashboard-section">
          <h2>Recent Strategies</h2>
          <div className="dashboard-grid">
            {reports.map((report) => {
              const scoreClass = report.matchScore > 70 ? 'high' : report.matchScore > 40 ? 'medium' : 'low';

              return (
                <button
                  key={report._id}
                  className="dashboard-item"
                  onClick={() => handleViewReport(report._id)}
                >
                  <div className="item-content">
                    <div className="item-header">
                      <p className="item-title">{report.title || 'Untitled Strategy'}</p>
                      <span className="item-arrow">→</span>
                    </div>

                    <div className="item-meta">
                      <div className={`score-badge score-badge--${scoreClass}`}>
                        <span className="score-val">{report.matchScore}</span>
                        <span className="score-label">Score</span>
                      </div>

                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}
    </main>
  )
}

export default InterviewForm;
