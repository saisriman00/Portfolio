import React, { useState, useCallback } from "react";
import "./App.css";
import Hero from "./components/Hero.jsx";
import Contact from "./components/Contact.jsx";

export default function App() {
  const [loaded, setLoaded] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  const handleDone = useCallback(() => setLoaded(true), []);

  return (
    <>
      {/* ── MAIN PORTFOLIO ── */}
      <div className={`app${loaded ? " visible" : ""}`}>

        {/* NAV */}
        <nav className="nav">
          <a className="nav-logo" href="/">sai.dev</a>
          <ul className={`nav-links${menuOpen ? " open" : ""}`}>
            <li><a href="#about" onClick={close}>About</a></li>
            <li><a href="#skills" onClick={close}>Skills</a></li>
            <li><a href="#projects" onClick={close}>Projects</a></li>
            <li><a href="#experience" onClick={close}>Experience</a></li>
            <li><a href="#contact" onClick={close}>Contact</a></li>
          </ul>
          <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="menu">
            <span /><span /><span />
          </button>
        </nav>

        {/* HERO — avatar is the background */}
        <Hero />

        {/* ABOUT */}
        <section className="section" id="about">
          <p className="sec-tag">// 01 — about me</p>
          <h2 className="sec-title">My <span>Story</span></h2>
          <div className="about-grid">
            <div className="about-text">
              <p>I didn't fall in love with data because of the numbers — I fell in love with
                what <strong>hides inside them</strong>. Growing up in Kanigiri, Andhra Pradesh,
                I was the kind of kid who needed to understand <strong>why</strong> things worked,
                not just that they did.</p>
              <p>When I started my B.Tech in Computer Science with AI &amp; ML at SITAMS,
                something clicked. Data is essentially a language the world speaks — and most
                people can't hear it yet. My first breakthrough came when I built a
                <strong> Banking Customer Churn Analysis</strong> system and watched Power BI
                dashboards reveal patterns that took weeks to find manually.</p>
              <p>At <strong>Acenaar Technologies</strong>, I leveled up fast — designing an
                intelligent PDF Chatbot using RAG frameworks and vector databases.</p>
              <p>I'm a fresher — but I've shipped real systems, earned an ML certification
                from BHU via SWAYAM, and I'm committed to one thing:
                <strong> making data speak clearly to the people who need it most</strong>.</p>
            </div>
            <div className="about-cards">
              {[
                ["Location", "Kanigiri, Andhra Pradesh 🇮🇳"],
                ["Degree", "B.Tech CSE — AI & ML · SITAMS 2022–2026"],
                ["CGPA", "7.46 / 10"],
                ["Email", "namasriman5@gmail.com"],
                ["Languages", "English · Telugu · Hindi"],
                ["Status", "🟢 Open to DA / BA / SQL roles"],
              ].map(([label, val]) => (
                <div className="info-card" key={label}>
                  <span className="ic-label">{label}</span>
                  <span className="ic-val">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="section" id="skills">
          <p className="sec-tag">// 02 — skills</p>
          <h2 className="sec-title">Technical <span>Arsenal</span></h2>
          <div className="skills-grid">
            {[
              { title: "Languages", pills: ["Python", "SQL / MySQL"] },
              { title: "Data & Analytics", pills: ["Pandas", "NumPy", "EDA", "Matplotlib", "Seaborn", "Excel"] },
              { title: "Machine Learning", pills: ["Scikit-learn", "XGBoost", "Random Forest", "KMeans", "PCA", "RFM Analysis"] },
              { title: "AI & NLP", pills: ["RAG Frameworks", "Vector Databases", "LLM Integration", "Text Embeddings"] },
              { title: "Visualization", pills: ["Power BI", "Dashboard Design", "Data Storytelling"] },
              { title: "Frameworks", pills: ["FastAPI", "Streamlit", "Flask", "Git / GitHub"] },
            ].map(g => (
              <div className="skill-group" key={g.title}>
                <p className="sg-title">{g.title}</p>
                <div className="pill-wrap">
                  {g.pills.map(p => <span className="pill" key={p}>{p}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section className="section" id="projects">
          <p className="sec-tag">// 03 — projects</p>
          <h2 className="sec-title">What I've <span>Built</span></h2>
          <div className="projects-grid">
            {[
              {
                num: "01", title: "Customer Purchase Prediction",
                desc: "End-to-end ML system predicting repurchase within 30 days using RFM engineering, PCA, KMeans, XGBoost & Random Forest — deployed via FastAPI.",
                tags: ["Python", "XGBoost", "FastAPI", "PCA", "KMeans", "Scikit-learn"],
                link: "https://github.com/saisriman00/Customer-Purchase-Prediction-using-Machine-Learning"
              },
              {
                num: "02", title: "Banking Customer Churn Analysis",
                desc: "Full analytics pipeline using Python, MySQL & Power BI. EDA with Pandas/Seaborn, SQL KPI analysis, and interactive dashboard revealing churn drivers.",
                tags: ["Python", "MySQL", "Power BI", "Pandas", "EDA", "Seaborn"],
                link: "https://github.com/saisriman00/Bank-Customer-Churn-Analysis"
              },
              {
                num: "03", title: "AI-Powered PDF Chatbot",
                desc: "Intelligent document Q&A system at Acenaar Technologies. RAG pipelines, vector DB semantic search, Streamlit/Flask UI with conversational memory.",
                tags: ["RAG", "Vector DB", "Streamlit", "Flask", "NLP", "Python"],
                link: "https://github.com/saisriman00"
              },
            ].map(p => (
              <div className="project-card" key={p.num}>
                <p className="p-num">{p.num}</p>
                <h3 className="p-title">{p.title}</h3>
                <p className="p-desc">{p.desc}</p>
                <div className="p-tags">{p.tags.map(t => <span className="p-tag" key={t}>{t}</span>)}</div>
                <a href={p.link} target="_blank" rel="noreferrer" className="p-link">View on GitHub →</a>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="section" id="experience">
          <p className="sec-tag">// 04 — experience & education</p>
          <h2 className="sec-title">The <span>Journey</span></h2>
          <div className="timeline">
            <div className="tl-item">
              <div className="tl-dot" />
              <p className="tl-date">JAN 2026 – MAR 2026</p>
              <h3 className="tl-title">AI Intern — Acenaar Technologies</h3>
              <p className="tl-sub">Kurnool, Andhra Pradesh</p>
              <ul className="tl-list">
                <li>Designed and deployed an AI-powered PDF Chatbot Reader parsing structured text from complex documents</li>
                <li>Implemented RAG frameworks enabling real-time contextual insight extraction from uploaded files</li>
                <li>Built text embedding pipelines using vector databases for accurate semantic search</li>
                <li>Created multi-file Streamlit/Flask UI supporting full conversational memory</li>
              </ul>
            </div>
            <div className="tl-item">
              <div className="tl-dot" />
              <p className="tl-date">2022 – 2026</p>
              <h3 className="tl-title">B.Tech Computer Science — AI &amp; ML</h3>
              <p className="tl-sub">Sreenivasa Institute of Technology and Management Studies · CGPA 7.46</p>
              <ul className="tl-list">
                <li>Specialized in AI and Machine Learning at SITAMS, Chittoor, Andhra Pradesh</li>
                <li>Built expertise in Python, data analytics, and ML model development</li>
                <li>Coursework bridging statistics, algorithms, and real-world business applications</li>
              </ul>
            </div>
          </div>
          <div className="cert-card">
            <div className="cert-icon">🎓</div>
            <div className="cert-body">
              <p className="cert-title">Machine Learning Using Python Programming</p>
              <p className="cert-sub">SWAYAM / BHU · April 2025 · 8-week intensive with proctored exam</p>
            </div>
            <a href="https://drive.google.com/file/d/19JQnegCbj-zEPDwHp0bYT_mRCblMRlau/view?usp=sharing"
              target="_blank" rel="noreferrer" className="cert-link">View Certificate →</a>
          </div>
        </section>

        {/* CONTACT */}
        <Contact />

        {/* FOOTER */}
        <footer className="footer">
          <p>Designed &amp; Built by Nama Sai Srimannarayana · 2026</p>
        </footer>
      </div>
    </>
  );
}
