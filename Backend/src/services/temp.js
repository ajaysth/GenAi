// Mock data for testing the AI interview-report generation pipeline.
// Scenario: Mid-level MERN Stack Developer applying to "TechNova Solutions".
// The candidate is intentionally missing a few required skills (TypeScript, AWS,
// Docker, automated testing) so the AI can produce meaningful skill gaps and a
// preparation plan when this data is fed into the model.

const resume = `
AJAY SHARMA
Frontend / MERN Stack Developer
Email: ajay.sharma.dev@example.com  |  Phone: +977-98XXXXXXXX
Location: Kathmandu, Nepal
GitHub: github.com/ajaysharma-dev   |   LinkedIn: linkedin.com/in/ajaysharma-dev
Portfolio: ajaysharma.dev

----------------------------------------------------------------------
PROFESSIONAL SUMMARY
----------------------------------------------------------------------
Frontend-leaning MERN stack developer with around 3 years of professional
experience building responsive, user-facing web applications using React and
Node.js. Comfortable owning features end-to-end: from designing REST APIs and
MongoDB schemas to implementing pixel-perfect UI in React. Passionate about
clean code, component reusability, and shipping small iterative improvements.
Currently looking for a mid-level role where I can grow into TypeScript,
cloud deployments, and large-scale system design.

----------------------------------------------------------------------
TECHNICAL SKILLS
----------------------------------------------------------------------
Languages         : JavaScript (ES6+), HTML5, CSS3, SCSS, basic Python
Frontend          : React.js, Redux Toolkit, React Router, Vite,
                    Tailwind CSS, Bootstrap, Material UI, Axios
Backend           : Node.js, Express.js, REST APIs, JWT Auth, Bcrypt,
                    Multer (file uploads), Nodemailer
Database          : MongoDB, Mongoose, basic MySQL
Tools / Workflow  : Git, GitHub, VS Code, Postman, npm, pnpm, Figma
Other             : Responsive design, basic SEO, agile/scrum,
                    code reviews, REST API design

----------------------------------------------------------------------
PROFESSIONAL EXPERIENCE
----------------------------------------------------------------------
Software Engineer  |  Brightline Web Studio, Kathmandu
Aug 2023 – Present (≈ 1.8 years)
- Built and maintained 4+ client web applications using React, Redux Toolkit,
  Node.js, Express, and MongoDB.
- Designed and implemented role-based authentication (JWT + refresh tokens)
  used across the company's project template.
- Migrated a legacy jQuery dashboard to a modular React + Vite SPA, reducing
  initial bundle size by ~38% and time-to-interactive by ~1.2s.
- Collaborated daily with designers (Figma) and 2 backend engineers in a
  scrum team; participated in sprint planning, demos, and retros.
- Mentored 2 junior interns on Git workflow, React hooks, and REST basics.

Junior Web Developer  |  PixelForge IT Solutions, Lalitpur
Jun 2022 – Jul 2023 (≈ 1.1 years)
- Developed responsive marketing websites and small dashboards using
  React, plain JavaScript, and SCSS.
- Implemented ~20 REST endpoints in Node.js + Express for an internal CRM,
  including pagination, search, and CSV export.
- Wrote MongoDB aggregation pipelines for monthly sales reports.
- Fixed a recurring CORS / cookie issue that was blocking auth on Safari,
  improving login success rate from ~82% to ~99%.

----------------------------------------------------------------------
SELECTED PROJECTS
----------------------------------------------------------------------
GenAi Interview Coach (personal, in progress)
- Full-stack MERN app that takes a resume + job description and uses the
  Gemini API to generate tailored interview questions and a prep plan.
- Stack: React + Vite + TypeScript (learning), Node.js, Express, MongoDB,
  Google GenAI SDK, JWT auth.

ShopLite – E-commerce SPA (client project)
- React + Redux Toolkit storefront with Node/Express backend and Stripe
  test-mode checkout. Implemented cart, wishlist, order history, and
  admin product management.

DevBlog – Markdown Blogging Platform (personal)
- Markdown-based blog with React, Express, MongoDB, and image uploads
  via Multer. ~120 posts and ~3k monthly readers.

----------------------------------------------------------------------
EDUCATION
----------------------------------------------------------------------
Bachelor of Computer Application (BCA)
Tribhuvan University, Nepal — 2018 – 2022
CGPA: 3.6 / 4.0

----------------------------------------------------------------------
CERTIFICATIONS & LEARNING
----------------------------------------------------------------------
- Meta Front-End Developer Professional Certificate (Coursera, 2023)
- The Complete Node.js Developer Course (Udemy, 2022)
- Currently learning: TypeScript, Next.js App Router, basic AWS (EC2/S3)

----------------------------------------------------------------------
LANGUAGES
----------------------------------------------------------------------
English (Professional), Nepali (Native), Hindi (Conversational)
`;

const selfDescription = `
Hi, I'm Ajay — a frontend-leaning MERN developer with about 3 years of
hands-on experience building real products for clients and small teams.
I genuinely enjoy the "full loop" of web development: talking to a designer
in the morning, shaping a Mongo schema in the afternoon, and shipping a
React feature behind a feature flag the same evening.

My strengths are React, component architecture, and turning messy
requirements into clean, reusable UI. I care a lot about code readability
and small, reviewable pull requests. I'm comfortable in Node/Express and
MongoDB, and I've owned several REST APIs end-to-end, including auth,
file uploads, and reporting endpoints.

I'm honest about what I'm still growing into: I'm actively learning
TypeScript (using it in my current side project), and I haven't yet
deployed production workloads on AWS or set up CI/CD pipelines myself —
those are exactly the areas I want to level up in over the next 6–12
months. I learn fastest by pairing with senior engineers and by reading
real production code, so a team that does code reviews and writes tests
seriously is a big plus for me.

Outside work I write small technical posts on my blog, mentor a couple
of juniors on Discord, and I'm slowly working through "Designing Data-
Intensive Applications" to get more comfortable with system design.
`;

const jobDescription = `
TechNova Solutions — Mid-Level MERN Stack Developer (Frontend-leaning)
Location: Hybrid – Kathmandu, Nepal (3 days in-office)
Type: Full-time  |  Experience: 3–5 years  |  Team: Product Engineering

About TechNova
--------------
TechNova Solutions is a product-focused software company building B2B SaaS
tools for logistics and supply-chain teams across South Asia and the Middle
East. Our flagship platform is used by 200+ companies and processes more
than 1 million shipment events every month. We're a small, senior-heavy
engineering team (12 engineers) and we ship to production multiple times
a day.

The Role
--------
We're hiring a Mid-Level MERN Stack Developer to join our Product
Engineering team. You'll work primarily on our customer-facing dashboard
(React + TypeScript) but will also own backend features in Node.js and
MongoDB. You'll work closely with our Product Manager, Designer, and 2
senior engineers, and you'll be expected to take features from "Figma +
ticket" to "deployed and monitored in production".

Key Responsibilities
--------------------
- Design, build, and maintain features in our React + TypeScript SPA,
  with a strong focus on accessibility, performance, and reusable
  component design.
- Implement and maintain REST and GraphQL endpoints in Node.js / Express,
  backed by MongoDB (Mongoose) and Redis.
- Write clean, well-tested code: unit tests with Jest / Vitest and
  integration tests with React Testing Library and Supertest.
- Participate in code reviews, RFC discussions, and on-call rotations
  (weekday business hours, lightweight).
- Help improve our CI/CD pipelines (GitHub Actions) and our AWS-based
  deployment setup (ECS, S3, CloudFront).
- Mentor junior developers and contribute to our internal component
  library and engineering handbook.

Required Skills & Experience
----------------------------
- 3+ years of professional experience with React.js in production.
- Strong JavaScript fundamentals (ES6+, async/await, modules, closures).
- Solid working knowledge of TypeScript in a real codebase (not just
  tutorials).
- 2+ years of Node.js + Express experience building REST APIs.
- Hands-on experience with MongoDB and Mongoose, including schema design
  and aggregation pipelines.
- Comfortable with Git, GitHub pull-request workflow, and code reviews.
- Experience writing automated tests (unit and integration) and treating
  them as a normal part of "done".
- Good written English; able to communicate clearly in async tools
  (Slack, Linear, GitHub).

Nice-to-Have
------------
- Experience with Next.js (App Router) or another SSR framework.
- Practical experience deploying to AWS (EC2, ECS, Lambda, S3, CloudFront).
- Docker and basic Kubernetes familiarity.
- Experience setting up or maintaining CI/CD pipelines (GitHub Actions,
  GitLab CI, or similar).
- Exposure to GraphQL (Apollo or urql) on either client or server.
- Experience with observability tools (Sentry, Datadog, Grafana).
- Open-source contributions or a personal blog / portfolio.

What We Offer
-------------
- Competitive salary based on experience (mid-level band).
- Hybrid work setup (3 days in-office, 2 days remote).
- Annual learning budget (books, courses, conferences).
- Health insurance for you and one dependent.
- Quarterly team off-sites and a strong code-review culture.

How We Hire
-----------
1. 30-min intro call with the hiring manager.
2. Take-home coding exercise (≈ 4 hours, paid).
3. Technical interview (system design + code walkthrough, 90 min).
4. Behavioural / culture-fit interview (45 min).
5. Offer.
`;

export { resume, selfDescription, jobDescription };
