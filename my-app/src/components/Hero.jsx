import React, { useEffect, useRef, useState } from "react";
import "./Hero.css";

const ROLES = [
  "Building ML models that ship.",
  "Turning ideas into data insights.",
  "SQL queries that find the story.",
  "Power BI dashboards that talk.",
  "Transforming raw data into decisions.",
  "From EDA to production pipelines.",
];

export default function Hero() {
  const canvasRef = useRef(null);
  const [text, setText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  /* Typewriter */
  useEffect(() => {
    const current = ROLES[roleIdx];
    let timeout;
    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && text === "") {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    } else {
      timeout = setTimeout(() => {
        setText(deleting
          ? current.slice(0, text.length - 1)
          : current.slice(0, text.length + 1)
        );
      }, deleting ? 35 : 65);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIdx]);

  /* Particles */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w, h, animation;
    const particles = [];
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(99,102,241,.5)";
        ctx.fill();
      });
      animation = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="hero">

      {/* BG image — behind everything */}
      <div className="hero-bg">
        <img src="/avatar.png" alt="" className="hero-bg-img" />
        <div className="hero-overlay" />
      </div>

      {/* Particles — pointer-events none so buttons work */}
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* Content */}
      <div className="hero-content">
        <h4>DATA ANALYST &amp; AI ENGINEER</h4>

        <h1>
          Nama Sai <br />
          <span>Srimannarayana</span>
        </h1>

        {/* Typewriter line */}
        <div className="typewriter-wrap">
          <span className="typewriter-text">{text}</span>
          <span className="typewriter-cursor">|</span>
        </div>

        <p className="hero-sub">
          Turning raw data into insights using SQL, Python,
          Machine Learning and Business Intelligence.
        </p>

        {/* 3 buttons */}
        <div className="hero-buttons">
          <a href="#projects" className="btn btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn btn-outline">
            Get In Touch
          </a>
          <a
            href="/resume.pdf"
            download="Nama_Sai_Srimannarayana_Resume.pdf"
            className="btn btn-resume"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Resume
          </a>
        </div>
      </div>
    </section>
  );
}
