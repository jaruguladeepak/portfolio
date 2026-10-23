"use client";

import { useEffect, useState, useMemo } from "react";
import { Search, Star, GitFork, ExternalLink, Activity, Code } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FadeUp } from "@/components/animations/FadeUp";

const GITHUB_USERNAME = "jaruguladeepak";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
  size: number;
  fork?: boolean;
  license?: { name: string };
}

export default function Projects() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [profileStats, setProfileStats] = useState({ repos: 0, stars: 0, langs: 0, followers: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortMethod, setSortMethod] = useState("updated");
  const [currentFilter, setCurrentFilter] = useState("all");
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);

  useEffect(() => {
    const fetchProfileStats = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        const data = await res.json();
        setProfileStats(prev => ({ ...prev, repos: data.public_repos, followers: data.followers }));
      } catch (error) {
        console.error(error);
      }
    };

    const fetchRepositories = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
        const data = await res.json();
        const nonForks: Repository[] = data.filter((repo: Repository) => !repo.fork);
        setRepositories(nonForks);

        let stars = 0;
        const langs = new Set<string>();
        const allTopics = new Set<string>();

        nonForks.forEach((repo: Repository) => {
          stars += repo.stargazers_count;
          if (repo.language) {
            langs.add(repo.language);
          }
          if (repo.topics) repo.topics.forEach(t => allTopics.add(t));
        });

        setProfileStats(prev => ({ ...prev, stars, langs: langs.size }));
        setTopics(Array.from(allTopics).sort());
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfileStats();
    fetchRepositories();
  }, []);

  const filteredRepos = useMemo(() => {
    let result = [...repositories];

    if (currentFilter !== "all") {
      result = result.filter(repo => {
        const t = repo.topics || [];
        return t.includes(currentFilter) || (repo.language && repo.language.toLowerCase() === currentFilter.toLowerCase());
      });
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(repo => 
        repo.name.toLowerCase().includes(term) ||
        (repo.description && repo.description.toLowerCase().includes(term)) ||
        (repo.topics && repo.topics.some(t => t.toLowerCase().includes(term)))
      );
    }

    if (sortMethod === "stars") result.sort((a, b) => b.stargazers_count - a.stargazers_count);
    else if (sortMethod === "name") result.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortMethod === "size") result.sort((a, b) => b.size - a.size);
    else result.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

    return result;
  }, [repositories, currentFilter, searchTerm, sortMethod]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  const getLanguageColor = (lang: string) => {
    const colors: Record<string, string> = {
      'JavaScript': '#f1e05a', 'Python': '#3572A5', 'Java': '#b07219',
      'HTML': '#e34c26', 'CSS': '#563d7c', 'TypeScript': '#3178c6',
      'C++': '#f34b7d', 'C#': '#178600', 'Ruby': '#701516', 'Go': '#00ADD8'
    };
    return colors[lang] || '#8b949e';
  };

  return (
    <>
      <section className="section text-center" style={{ paddingTop: "6rem", paddingBottom: "4rem" }}>
        <FadeUp>
          <h1 className="hero-title" style={{ marginBottom: "1.5rem" }}>My Projects</h1>
          <p className="hero-desc" style={{ maxWidth: "900px", margin: "0 auto 3rem auto" }}>
            Every project represents an opportunity to solve a real-world problem. From AI-powered systems and automation to full-stack web applications, I focus on building practical, scalable, and impactful solutions.
          </p>
          <div className="hero-actions" style={{ justifyContent: "center" }}>
            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center">
              View GitHub <FaGithub className="w-4 h-4 ml-2" />
            </a>
          </div>
        </FadeUp>
      </section>

      <section className="section stats-section" style={{ paddingTop: 0, paddingBottom: "4rem" }}>
        <FadeUp delay={0.1}>
          <div className="stats-grid">
            <div className="stat-card glass-card">
              <h3 className="stat-number">{profileStats.repos}</h3>
              <p className="stat-label">Repositories</p>
            </div>
            <div className="stat-card glass-card">
              <h3 className="stat-number">{profileStats.stars}</h3>
              <p className="stat-label">Total Stars</p>
            </div>
            <div className="stat-card glass-card">
              <h3 className="stat-number">{profileStats.langs}</h3>
              <p className="stat-label">Technologies</p>
            </div>
            <div className="stat-card glass-card">
              <h3 className="stat-number">100%</h3>
              <p className="stat-label">Open Source</p>
            </div>
          </div>
        </FadeUp>
      </section>

      <section className="section" style={{ paddingTop: 0, paddingBottom: "2rem" }}>
        <FadeUp>
          <div className="filters-container">
            <div className="search-bar glass-card flex items-center p-2 rounded-lg" style={{ padding: "0.5rem 1.25rem" }}>
              <Search className="w-5 h-5 text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="bg-transparent border-none outline-none flex-1"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="sort-dropdown glass-card p-2 rounded-lg" style={{ padding: "0.5rem 1.25rem" }}>
              <select className="bg-transparent border-none outline-none w-full cursor-pointer" value={sortMethod} onChange={e => setSortMethod(e.target.value)}>
                <option value="updated">Recently Updated</option>
                <option value="stars">Most Stars</option>
                <option value="name">Repository Name</option>
                <option value="size">Largest Size</option>
              </select>
            </div>
          </div>
          <div className="filter-buttons flex flex-wrap gap-2 mt-4 justify-center">
            <button className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`} onClick={() => setCurrentFilter('all')}>All</button>
            {topics.slice(0, 10).map(topic => (
              <button key={topic} className={`filter-btn ${currentFilter === topic ? 'active' : ''}`} onClick={() => setCurrentFilter(topic)}>
                {topic}
              </button>
            ))}
          </div>
        </FadeUp>
      </section>

      <section className="section" style={{ paddingTop: 0, paddingBottom: "4rem" }}>
        <h2 className="section-title">All Projects</h2>
        <div className="projects-grid">
          {filteredRepos.length > 0 ? filteredRepos.map((repo, i) => (
            <FadeUp key={repo.id} delay={(i % 3) * 0.1}>
              <div className="project-card glass-card hover-lift cursor-pointer h-full flex flex-col" onClick={() => setSelectedRepo(repo)}>
                <div className="project-header flex justify-between items-start mb-4">
                  <h3 className="project-title font-bold text-lg text-[var(--nav-link-hover)]">{repo.name}</h3>
                  <div className="project-links flex gap-2">
                    <a href={repo.html_url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}><FaGithub className="w-5 h-5" /></a>
                    {repo.homepage && <a href={repo.homepage} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}><ExternalLink className="w-5 h-5" /></a>}
                  </div>
                </div>
                <p className="project-desc flex-1 text-sm text-gray-600 mb-4 line-clamp-3">
                  {repo.description || "No description provided."}
                </p>
                <div className="project-footer mt-auto pt-4 border-t border-[var(--glass-border)]">
                  {repo.language && (
                    <span className="project-lang text-sm flex items-center">
                      <span className="lang-color w-3 h-3 rounded-full mr-2 inline-block" style={{ backgroundColor: getLanguageColor(repo.language) }}></span>
                      {repo.language}
                    </span>
                  )}
                  <div className="project-stats flex gap-4 text-sm mt-2">
                    <span className="flex items-center"><Star className="w-4 h-4 mr-1" /> {repo.stargazers_count}</span>
                    <span className="flex items-center"><GitFork className="w-4 h-4 mr-1" /> {repo.forks_count}</span>
                  </div>
                </div>
              </div>
            </FadeUp>
          )) : (
            <div className="col-span-full text-center py-12 glass-card">
              <p>No repositories found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedRepo && (
        <div className="modal flex items-center justify-center fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedRepo(null)}>
          <div className="modal-content glass-card max-w-2xl w-full mx-4 p-6 relative bg-[var(--bg-color)] rounded-xl" onClick={e => e.stopPropagation()}>
            <button className="modal-close absolute top-4 right-4 text-2xl" onClick={() => setSelectedRepo(null)}>&times;</button>
            <h2 className="text-2xl font-bold mb-4">{selectedRepo.name}</h2>
            <p className="mb-6">{selectedRepo.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="stat text-center p-3 glass-card"><Star className="mx-auto mb-2" />{selectedRepo.stargazers_count}</div>
              <div className="stat text-center p-3 glass-card"><GitFork className="mx-auto mb-2" />{selectedRepo.forks_count}</div>
              <div className="stat text-center p-3 glass-card"><Activity className="mx-auto mb-2" />{formatDate(selectedRepo.updated_at)}</div>
              <div className="stat text-center p-3 glass-card"><Code className="mx-auto mb-2" />{selectedRepo.language || 'N/A'}</div>
            </div>
            <div className="flex gap-4">
              <a href={selectedRepo.html_url} target="_blank" rel="noreferrer" className="btn-primary w-full text-center">View Code</a>
              {selectedRepo.homepage && <a href={selectedRepo.homepage} target="_blank" rel="noreferrer" className="btn-secondary w-full text-center">Live Demo</a>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
