"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Server, FileText } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { FadeUp, FadeIn } from "@/components/animations/FadeUp";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section id="home" className="hero section relative overflow-hidden">
        {/* Background Dot Grid */}
        <div className="hero-dot-grid"></div>

        {/* Hero Left: Text Content */}
        <FadeIn delay={0.2} className="hero-left">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            <span className="hero-badge-text">Available for Opportunities</span>
          </div>
          
          <h1 className="hero-title">
            Deepak Jarugula
          </h1>
          
          <h2 className="hero-subtitle">
            I am a{" "}
            <TypeAnimation
              sequence={[
                "Computer Science Student",
                2000,
                "Full Stack Developer",
                2000,
                "Machine Learning Enthusiast",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h2>
          
          <p className="hero-desc">
            Building practical, scalable, and impactful AI & software solutions to solve real-world challenges. Specialized in Machine Learning, Computer Vision, and Modern Web Architectures.
          </p>
          
          <div className="hero-actions">
            <Link href="/projects" className="btn-primary">
              View Projects <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#" className="btn-secondary">
              View Resume <FileText className="w-4 h-4" />
            </a>
          </div>

          {/* Stats Row */}
          <div className="hero-stats">
            <div className="stat-card">
              <span className="stat-number">10+</span>
              <span className="stat-label">AI & ML Projects</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-card">
              <span className="stat-number">15+</span>
              <span className="stat-label">Web Apps Built</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-card">
              <span className="stat-number">99%</span>
              <span className="stat-label">Code Quality</span>
            </div>
          </div>
        </FadeIn>

        {/* Hero Right: Portrait & Interactive Elements */}
        <FadeIn delay={0.4} className="hero-right">
          <div className="portrait-visual-wrapper">
            {/* Glowing background blob */}
            <div className="hero-glow-blob"></div>

            {/* Squircle image container */}
            <div className="portrait-frame">
              <div className="portrait-container">
                <Image 
                  src="/icon.jpeg" 
                  alt="Deepak Jarugula - Portrait" 
                  width={400} 
                  height={400} 
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  priority
                />
              </div>

              {/* Orbiting Floating Badge 1: AI Specialist */}
              <motion.div 
                className="floating-widget widget-ai glass-card"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="widget-icon-box">🧠</div>
                <div className="widget-info">
                  <h4>AI / ML Systems</h4>
                  <p>Computer Vision & NLP</p>
                </div>
              </motion.div>

              {/* Orbiting Floating Badge 2: Full Stack Developer */}
              <motion.div 
                className="floating-widget widget-dev glass-card"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="widget-icon-box">⚡</div>
                <div className="widget-info">
                  <h4>Full Stack</h4>
                  <p>Next.js, Python, Node</p>
                </div>
              </motion.div>

              {/* Rotating Circular Hire Me Button */}
              <div className="hire-me-container">
                <div className="hire-me-inner">Hire Me</div>
                <svg className="circular-text" viewBox="0 0 100 100">
                  <path id="curve" fill="transparent" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                  <text>
                    <textPath href="#curve" startOffset="0">WEB DEVELOPER • AI DEVELOPER • </textPath>
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section">
        <FadeUp>
          <h2 className="section-title">Skills</h2>
          <div className="skills-grid">
            <div className="skill-category glass-card flex flex-col h-full">
              <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden border border-[var(--border-color)]">
                <Image 
                  src="/images/programming.jpg" 
                  alt="Programming Skills" 
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold mb-4">Programming</h3>
              <div className="skill-items">
                <span>Python</span>
                <span>Java</span>
                <span>JavaScript</span>
                <span>C</span>
              </div>
            </div>
            <div className="skill-category glass-card flex flex-col h-full">
              <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden border border-[var(--border-color)]">
                <Image 
                  src="/images/webdev.jpg" 
                  alt="Web Development Skills" 
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold mb-4">Web</h3>
              <div className="skill-items">
                <span>HTML/CSS</span>
                <span>React</span>
                <span>Next.js</span>
                <span>Node.js</span>
              </div>
            </div>
            <div className="skill-category glass-card flex flex-col h-full">
              <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden border border-[var(--border-color)]">
                <Image 
                  src="/images/aiml.jpg" 
                  alt="AI & Machine Learning Skills" 
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold mb-4">AI & Data</h3>
              <div className="skill-items">
                <span>Machine Learning</span>
                <span>TensorFlow</span>
                <span>OpenCV</span>
                <span>SQL</span>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Experience Summary */}
      <section id="experience" className="section">
        <FadeUp>
          <h2 className="section-title">Experience</h2>
          <div className="experience-timeline">
            <div className="timeline-item glass-card hover-lift">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-date">2026 - Present</span>
                <h3>AI Software Engineer</h3>
                <h4 className="timeline-company">Tech Solutions Inc.</h4>
                <p>Developing scalable machine learning pipelines and integrating AI capabilities into core web products.</p>
              </div>
            </div>

            <div className="timeline-item glass-card hover-lift">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-date">2024 - 2026</span>
                <h3>Full Stack Developer</h3>
                <h4 className="timeline-company">StartUp Hub</h4>
                <p>Led frontend architecture using React. Built REST APIs using Node.js and MongoDB. Improved performance by 40%.</p>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section cta-section text-center">
        <FadeUp>
          <h2 className="section-title" style={{ marginBottom: "1rem" }}>Let&apos;s Work Together</h2>
          <p style={{ marginBottom: "2rem", color: "var(--nav-link-color)" }}>
            I am currently open to new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </p>
          <a href="mailto:contact@example.com" className="btn-primary" style={{ display: "inline-flex", margin: "0 auto" }}>
            Say Hello <Server className="w-4 h-4 ml-2" />
          </a>
        </FadeUp>
      </section>
    </>
  );
}
