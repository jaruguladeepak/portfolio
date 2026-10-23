"use client";

import { useEffect, useState } from "react";
import { Award, Trophy, Medal, FileBadge, ExternalLink, Download } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import certificatesData from "@/data/certificates.json";

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  category: string;
  skills: string[];
  credentialId: string;
  verify: string;
  download: string;
}

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

  return <>{count}{target >= 100 ? "+" : ""}</>;
}

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>(certificatesData);
  const [categories, setCategories] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  useEffect(() => {
    const cats = new Set<string>();
    const sks = new Set<string>();

    certificatesData.forEach(cert => {
      cats.add(cert.category);
      if (cert.skills) {
        cert.skills.forEach(skill => sks.add(skill));
      }
    });

    setCategories(Array.from(cats).sort());
    setSkills(Array.from(sks).sort());
  }, []);

  const filteredCerts = currentFilter === "all" 
    ? certificates 
    : certificates.filter(c => c.category === currentFilter);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
  };

  const CertCard = ({ cert, featured = false }: { cert: Certificate, featured?: boolean }) => (
    <div className="project-card glass-card h-full flex flex-col">
      <div className="card-banner bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 h-32 rounded-lg mb-6 flex items-center justify-center text-[var(--glow-start)]">
        <Award className="w-12 h-12" />
      </div>
      <h3 className="mb-1 font-bold text-lg">{cert.title}</h3>
      <p className="text-[var(--nav-link-color)] text-sm mb-4">Issued by: <strong className="text-[var(--text-color)]">{cert.issuer}</strong></p>
      
      <div className="tech-stack mb-4 flex-wrap">
        {cert.skills?.slice(0, 3).map(skill => (
          <span key={skill} className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[var(--placeholder-bg)] border border-[var(--border-color)]">{skill}</span>
        ))}
      </div>
      
      <p className="text-xs text-[var(--nav-link-color)] mb-6 mt-auto">Earned: {formatDate(cert.date)}</p>
      
      <div className="flex gap-2">
        <button className="btn-primary flex-1 justify-center py-2" onClick={() => setSelectedCert(cert)}>
          View Details
        </button>
      </div>
    </div>
  );

  return (
    <>
      <section className="section text-center" style={{ paddingTop: "6rem", paddingBottom: "4rem" }}>
        <FadeUp>
          <div className="floating mb-8 text-[var(--glow-start)] flex justify-center">
            <Award style={{ width: "80px", height: "80px" }} />
          </div>
          <h1 className="hero-title mb-6">Certificates & Awards</h1>
          <p className="hero-desc max-w-4xl mx-auto mb-12">
            Every certification reflects my commitment to continuous learning and staying current with modern software development, Artificial Intelligence, automation, and emerging technologies.
          </p>
          <div className="hero-actions justify-center">
            <a href="#" className="btn-primary">View Resume</a>
          </div>
        </FadeUp>
      </section>

      <section className="section stats-section pt-0 pb-16">
        <div className="stats-grid">
          <FadeUp delay={0}>
            <div className="stat-card glass-card">
              <h3 className="stat-number"><Counter target={certificates.length} /></h3>
              <p className="stat-label">Certificates</p>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="stat-card glass-card">
              <h3 className="stat-number"><Counter target={categories.length} /></h3>
              <p className="stat-label">Technology Domains</p>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="stat-card glass-card">
              <h3 className="stat-number"><Counter target={100} /></h3>
              <p className="stat-label">Hours of Learning</p>
            </div>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="stat-card glass-card">
              <h3 className="stat-text">Always</h3>
              <p className="stat-label">Learning</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {currentFilter === "all" && certificates.length > 0 && (
        <section className="section pt-0 pb-16">
          <FadeUp>
            <h2 className="section-title">Featured Certifications</h2>
            <div className="featured-projects-grid">
              {certificates.slice(0, 2).map((cert, i) => (
                <CertCard key={i} cert={cert} featured />
              ))}
            </div>
          </FadeUp>
        </section>
      )}

      <section className="section pt-0">
        <FadeUp>
          <h2 className="section-title">All Certifications</h2>
          <div className="filters-container justify-center mb-8">
            <div className="filter-buttons flex flex-wrap gap-2 justify-center">
              <button className={`filter-btn ${currentFilter === "all" ? "active" : ""}`} onClick={() => setCurrentFilter("all")}>All</button>
              {categories.map(cat => (
                <button key={cat} className={`filter-btn ${currentFilter === cat ? "active" : ""}`} onClick={() => setCurrentFilter(cat)}>{cat}</button>
              ))}
            </div>
          </div>
          
          <div className="projects-grid">
            {filteredCerts.length > 0 ? filteredCerts.map((cert, i) => (
              <FadeUp key={i} delay={(i % 3) * 0.1}>
                <CertCard cert={cert} />
              </FadeUp>
            )) : (
              <div className="col-span-full text-center py-8 text-[var(--nav-link-color)]">
                <p>No certificates found in this category.</p>
              </div>
            )}
          </div>
        </FadeUp>
      </section>

      <section className="section">
        <FadeUp>
          <h2 className="section-title">Awards & Achievements</h2>
          <div className="projects-grid">
            <div className="project-card glass-card">
              <h3 className="flex items-center gap-2 mb-2"><Trophy className="text-yellow-500 w-6 h-6" /> Academic Excellence</h3>
              <p className="text-[var(--nav-link-color)] text-sm mb-4">2025 | University Name</p>
              <p>Awarded for securing top tier grades across all core computer science and AI subjects during the academic year.</p>
            </div>
            <div className="project-card glass-card">
              <h3 className="flex items-center gap-2 mb-2"><Medal className="text-gray-400 w-6 h-6" /> Hackathon Runner-up</h3>
              <p className="text-[var(--nav-link-color)] text-sm mb-4">2024 | TechFest</p>
              <p>Developed an AI-powered smart surveillance prototype within 48 hours, earning second place overall.</p>
            </div>
          </div>
        </FadeUp>
      </section>

      <section className="section">
        <FadeUp>
          <h2 className="section-title">Learning Journey</h2>
          <div className="journey-timeline">
            <div className="journey-step relative pl-4">
              <div className="timeline-dot absolute left-[-2.375rem] top-8 w-4 h-4 bg-[var(--glow-start)] rounded-full border-4 border-[var(--bg-color)] z-10 shadow-md shadow-[var(--glow-start)]/50 animate-pulse"></div>
              <div className="glass-card">
                <h4>2024</h4>
                <p>Started Programming & Web Development</p>
              </div>
            </div>
            <div className="journey-step relative pl-4">
              <div className="timeline-dot absolute left-[-2.375rem] top-8 w-4 h-4 bg-[var(--glow-start)] rounded-full border-4 border-[var(--bg-color)] z-10 shadow-md shadow-[var(--glow-start)]/50 animate-pulse"></div>
              <div className="glass-card">
                <h4>2025</h4>
                <p>Python Certification & Machine Learning Basics</p>
              </div>
            </div>
            <div className="journey-step relative pl-4">
              <div className="timeline-dot absolute left-[-2.375rem] top-8 w-4 h-4 bg-[var(--glow-start)] rounded-full border-4 border-[var(--bg-color)] z-10 shadow-md shadow-[var(--glow-start)]/50 animate-pulse"></div>
              <div className="glass-card">
                <h4>2025</h4>
                <p>Advanced AI Projects & Computer Vision</p>
              </div>
            </div>
            <div className="journey-step relative pl-4">
              <div className="timeline-dot absolute left-[-2.375rem] top-8 w-4 h-4 bg-[var(--glow-start)] rounded-full border-4 border-[var(--bg-color)] z-10 shadow-md shadow-[var(--glow-start)]/50 animate-pulse"></div>
              <div className="glass-card">
                <h4>2026</h4>
                <p>Automation Systems & IoT Integration</p>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      <section className="section">
        <FadeUp>
          <h2 className="section-title">Certified Skills</h2>
          <div className="interests-grid">
            {skills.map(skill => (
              <span key={skill} className="interest-pill glass-card hover-lift">{skill}</span>
            ))}
          </div>
        </FadeUp>
      </section>

      <section className="section">
        <FadeUp>
          <h2 className="section-title">Currently Learning</h2>
          <div className="interests-grid">
            <span className="interest-pill glass-card border border-[var(--text-color)]">Advanced Machine Learning <span className="text-xs text-[var(--nav-link-color)] ml-1">(In Progress)</span></span>
            <span className="interest-pill glass-card">Cloud Computing <span className="text-xs text-[var(--nav-link-color)] ml-1">(Coming Soon)</span></span>
            <span className="interest-pill glass-card border border-[var(--text-color)]">System Design <span className="text-xs text-[var(--nav-link-color)] ml-1">(In Progress)</span></span>
            <span className="interest-pill glass-card">Docker & Kubernetes <span className="text-xs text-[var(--nav-link-color)] ml-1">(Coming Soon)</span></span>
          </div>
        </FadeUp>
      </section>

      <section className="section cta-section text-center">
        <FadeUp>
          <h2 className="section-title">Learning Never Stops</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            Every certification represents another step toward becoming a better engineer and building solutions that create real-world impact.
          </p>
          <div className="hero-actions justify-center">
            <a href="/#contact" className="btn-primary">Contact Me</a>
            <a href="/projects" className="btn-secondary">View Projects</a>
          </div>
        </FadeUp>
      </section>

      {/* Modal */}
      {selectedCert && (
        <div className="modal flex items-center justify-center fixed inset-0 z-50 bg-black/50 backdrop-blur-sm p-4" onClick={() => setSelectedCert(null)}>
          <div className="modal-content glass-card max-w-2xl w-full p-8 relative bg-[var(--bg-color)] rounded-xl" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-2xl" onClick={() => setSelectedCert(null)}>&times;</button>
            <div className="mb-6">
              <h2 className="text-2xl font-bold">{selectedCert.title}</h2>
              <p className="text-[var(--nav-link-color)] text-lg">{selectedCert.issuer}</p>
            </div>
            
            <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center mb-8 text-gray-400">
              <FileBadge className="w-16 h-16" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <p><strong>Issue Date:</strong> {new Date(selectedCert.date).toLocaleDateString()}</p>
              <p><strong>Credential ID:</strong> {selectedCert.credentialId || 'N/A'}</p>
              <p><strong>Category:</strong> {selectedCert.category || 'N/A'}</p>
            </div>

            <div className="tech-stack mb-8 flex-wrap">
              {selectedCert.skills?.map(s => <span key={s}>{s}</span>)}
            </div>

            <div className="flex gap-4">
              {selectedCert.verify && selectedCert.verify !== '#' && (
                <a href={selectedCert.verify} target="_blank" rel="noreferrer" className="btn-primary text-center">Verify <ExternalLink className="w-4 h-4 ml-2 inline" /></a>
              )}
              {selectedCert.download && selectedCert.download !== '#' && (
                <a href={selectedCert.download} target="_blank" rel="noreferrer" className="btn-secondary text-center">Download PDF <Download className="w-4 h-4 ml-2 inline" /></a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
