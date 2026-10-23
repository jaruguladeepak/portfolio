"use client";

import { BrainCircuit, Layout, Zap, Puzzle } from "lucide-react";
import { FadeUp, FadeIn } from "@/components/animations/FadeUp";
import { useEffect, useState } from "react";
import Image from "next/image";

function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(current));
      }
    }, 40);

    return () => clearInterval(timer);
  }, [target]);

  return <>{count}{target > 100 && "+"}</>;
}

export default function About() {
  return (
    <>
      <section className="section about-hero text-center">
        <FadeUp>
          <div className="portrait-container floating" style={{ margin: "0 auto 2rem auto", width: "15rem", height: "15rem", borderRadius: "50%", overflow: "hidden", padding: 0 }}>
            <Image 
              src="/icon.jpeg" 
              alt="Deepak Jarugula - Portrait of AI and Full Stack Developer" 
              width={240} 
              height={240} 
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              priority
            />
          </div>
          <h1 className="hero-title">About Me</h1>
          <p className="hero-desc" style={{ maxWidth: "800px", margin: "0 auto" }}>
            Passionate about building intelligent software that solves real-world problems through Artificial Intelligence, Automation, and Full Stack Development.
          </p>
        </FadeUp>
      </section>

      <section className="section">
        <FadeUp>
          <div className="text-card glass-card">
            <h2 className="section-title">Hello!</h2>
            <p>I&apos;m Deepak Jarugula, a Computer Science Engineering student with a strong passion for Artificial Intelligence, Machine Learning, Computer Vision, and Full Stack Development.</p>
            <p>I enjoy transforming innovative ideas into practical software solutions that address real-world challenges. Whether it&apos;s developing AI-powered surveillance systems, intelligent traffic management solutions, CRM automation platforms, or modern web applications, I enjoy every step of the development process.</p>
            <p>I believe technology should not only be innovative but also meaningful, scalable, and capable of creating a positive impact on society.</p>
          </div>
        </FadeUp>
      </section>

      <section className="section">
        <FadeUp delay={0.1}>
          <h2 className="section-title">Who I Am</h2>
          <div className="text-card glass-card">
            <p>I am a curious learner who enjoys exploring emerging technologies and continuously improving my technical skills.</p>
            <p>My interests extend across AI, automation, cloud technologies, computer vision, software engineering, and modern web development.</p>
            <p>I enjoy solving challenging problems by combining creativity with logical thinking and building applications that improve efficiency, safety, and user experience.</p>
          </div>
        </FadeUp>
      </section>

      <section className="section">
        <h2 className="section-title">What I Do</h2>
        <div className="what-i-do-grid">
          <FadeUp delay={0}>
            <div className="glass-card">
              <h3><BrainCircuit className="inline-block w-6 h-6 mr-2 mb-1" /> Artificial Intelligence</h3>
              <p>Develop intelligent systems using Machine Learning and Computer Vision.</p>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="glass-card">
              <h3><Layout className="inline-block w-6 h-6 mr-2 mb-1" /> Full Stack Development</h3>
              <p>Build responsive and scalable web applications.</p>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="glass-card">
              <h3><Zap className="inline-block w-6 h-6 mr-2 mb-1" /> Automation</h3>
              <p>Design workflow automation and smart notification systems.</p>
            </div>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="glass-card">
              <h3><Puzzle className="inline-block w-6 h-6 mr-2 mb-1" /> Problem Solving</h3>
              <p>Develop software solutions that address practical challenges in healthcare, transportation, and business.</p>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="section">
        <FadeUp>
          <h2 className="section-title">Technologies I Work With</h2>
          <div className="skills-grid">
            <div className="skill-category glass-card flex flex-col h-full">
              <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden border border-[var(--border-color)]">
                <Image 
                  src="/images/programming.jpg" 
                  alt="Programming" 
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-bold mb-2">Programming</h3>
              <div className="skill-items tech-stack">
                <span>Python</span><span>Java</span><span>JavaScript</span><span>C</span>
              </div>
            </div>
            <div className="skill-category glass-card flex flex-col h-full">
              <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden border border-[var(--border-color)]">
                <Image 
                  src="/images/webdev.jpg" 
                  alt="Frontend" 
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-bold mb-2">Frontend</h3>
              <div className="skill-items tech-stack">
                <span>HTML5</span><span>CSS3</span><span>JavaScript</span><span>Tailwind CSS</span>
              </div>
            </div>
            <div className="skill-category glass-card flex flex-col h-full">
              <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden border border-[var(--border-color)]">
                <Image 
                  src="/images/webdev.jpg" 
                  alt="Backend" 
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-bold mb-2">Backend</h3>
              <div className="skill-items tech-stack">
                <span>Node.js</span><span>Express.js</span>
              </div>
            </div>
            <div className="skill-category glass-card flex flex-col h-full">
              <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden border border-[var(--border-color)]">
                <Image 
                  src="/images/aiml.jpg" 
                  alt="Database" 
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-bold mb-2">Database</h3>
              <div className="skill-items tech-stack">
                <span>MySQL</span><span>MongoDB</span>
              </div>
            </div>
            <div className="skill-category glass-card flex flex-col h-full">
              <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden border border-[var(--border-color)]">
                <Image 
                  src="/images/aiml.jpg" 
                  alt="Artificial Intelligence" 
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-bold mb-2">Artificial Intelligence</h3>
              <div className="skill-items tech-stack">
                <span>OpenCV</span><span>Scikit-Learn</span><span>TensorFlow</span><span>NumPy</span><span>Pandas</span>
              </div>
            </div>
            <div className="skill-category glass-card flex flex-col h-full">
              <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden border border-[var(--border-color)]">
                <Image 
                  src="/images/programming.jpg" 
                  alt="Tools" 
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-bold mb-2">Tools</h3>
              <div className="skill-items tech-stack">
                <span>Git</span><span>GitHub</span><span>VS Code</span><span>Postman</span>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      <section className="section stats-section">
        <div className="stats-grid">
          <FadeUp delay={0}>
            <div className="stat-card glass-card">
              <h3 className="stat-number"><Counter target={10} /></h3>
              <p className="stat-label">Projects</p>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="stat-card glass-card">
              <h3 className="stat-number"><Counter target={15} /></h3>
              <p className="stat-label">Technologies</p>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="stat-card glass-card">
              <h3 className="stat-number"><Counter target={1000} /></h3>
              <p className="stat-label">Hours of Learning</p>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
