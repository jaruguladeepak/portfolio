// -----------------------------------------------------------------------------
// CONFIGURATION
// -----------------------------------------------------------------------------
// IMPORTANT: Please update this username to your actual GitHub username!
const GITHUB_USERNAME = 'jaruguladeepak';
// -----------------------------------------------------------------------------

// DOM Elements
const featuredGrid = document.getElementById('featured-projects-grid');
const allGrid = document.getElementById('all-projects-grid');
const filterContainer = document.getElementById('filter-buttons');
const searchInput = document.getElementById('project-search');
const sortSelect = document.getElementById('project-sort');
const noResults = document.getElementById('no-results');

// Modal Elements
const modal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalStars = document.getElementById('modal-stars');
const modalForks = document.getElementById('modal-forks');
const modalTopics = document.getElementById('modal-topics');
const modalLang = document.getElementById('modal-lang');
const modalUpdated = document.getElementById('modal-updated');
const modalSize = document.getElementById('modal-size');
const modalLicense = document.getElementById('modal-license');
const modalGithub = document.getElementById('modal-github');
const modalDemo = document.getElementById('modal-demo');

// State
let repositories = [];
let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  if (GITHUB_USERNAME === 'YOUR_GITHUB_USERNAME') {
    allGrid.innerHTML = `<div class="glass-card" style="grid-column: 1 / -1; text-align: center; color: red;">
      <h3>GitHub Username Required</h3>
      <p>Please open <code>github.js</code> and update <code>GITHUB_USERNAME</code> to your actual GitHub handle.</p>
    </div>`;
    return;
  }
  
  fetchProfileStats();
  fetchRepositories();
  
  // Event Listeners
  searchInput.addEventListener('input', renderProjects);
  sortSelect.addEventListener('change', () => {
    sortRepositories();
    renderProjects();
  });
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
});

async function fetchProfileStats() {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    
    const statRepos = document.getElementById('stat-repos');
    if(statRepos) statRepos.setAttribute('data-target', data.public_repos);
    
    const activityRepos = document.getElementById('activity-repos');
    if(activityRepos) activityRepos.textContent = data.public_repos;
    
    const activityFollowers = document.getElementById('activity-followers');
    if(activityFollowers) activityFollowers.textContent = data.followers;
    
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
}

async function fetchRepositories() {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    
    // Filter out forks if you only want original projects
    repositories = data.filter(repo => !repo.fork);
    
    // Calculate total stars, languages, and language frequency
    let totalStars = 0;
    const languages = new Set();
    const languageCounts = {};
    let totalReposWithLang = 0;
    
    repositories.forEach(repo => {
      totalStars += repo.stargazers_count;
      if (repo.language) {
        languages.add(repo.language);
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
        totalReposWithLang++;
      }
    });
    
    const statStars = document.getElementById('stat-stars');
    if(statStars) statStars.setAttribute('data-target', totalStars);
    
    const statLangs = document.getElementById('stat-langs');
    if(statLangs) statLangs.setAttribute('data-target', languages.size);

    const activityStars = document.getElementById('activity-stars');
    if(activityStars) activityStars.textContent = totalStars;

    generateTechDistribution(languageCounts, totalReposWithLang);
    generateFilters(languages);
    sortRepositories();
    renderProjects();
    
  } catch (error) {
    console.error('Error fetching repositories:', error);
    allGrid.innerHTML = `<div class="glass-card" style="grid-column: 1 / -1; text-align: center;">
      <p>Failed to load projects from GitHub. Please check the username or API limits.</p>
    </div>`;
  }
}

function generateTechDistribution(counts, total) {
  const container = document.getElementById('tech-distribution-container');
  if (!container) return;
  
  if (total === 0) {
    container.innerHTML = '<p style="text-align:center; color: var(--nav-link-color);">No language data available.</p>';
    return;
  }
  
  container.innerHTML = '';
  
  // Sort languages by count descending
  const sortedLangs = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  
  sortedLangs.forEach(([lang, count]) => {
    const percentage = Math.round((count / total) * 100);
    
    const barHtml = `
      <div class="tech-bar-container">
        <div class="tech-bar-label">
          <span>${lang}</span>
          <span>${percentage}%</span>
        </div>
        <div class="tech-bar-bg">
          <div class="tech-bar-fill" style="width: 0%" data-width="${percentage}%"></div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', barHtml);
  });
  
  // Animate bars slightly after render
  setTimeout(() => {
    document.querySelectorAll('.tech-bar-fill').forEach(fill => {
      fill.style.width = fill.getAttribute('data-width');
    });
  }, 100);
}

function generateFilters(languages) {
  // Clear existing (except All)
  const allBtn = document.createElement('button');
  allBtn.className = 'filter-btn active';
  allBtn.dataset.filter = 'all';
  allBtn.textContent = 'All';
  allBtn.addEventListener('click', (e) => setFilter('all', e.target));
  
  filterContainer.innerHTML = '';
  filterContainer.appendChild(allBtn);
  
  // Add Language Filters
  Array.from(languages).sort().forEach(lang => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.dataset.filter = lang;
    btn.textContent = lang;
    btn.addEventListener('click', (e) => setFilter(lang, e.target));
    filterContainer.appendChild(btn);
  });
}

function setFilter(filter, buttonEl) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  buttonEl.classList.add('active');
  renderProjects();
}

function sortRepositories() {
  const sortBy = sortSelect.value;
  
  repositories.sort((a, b) => {
    if (sortBy === 'updated') {
      return new Date(b.updated_at) - new Date(a.updated_at);
    } else if (sortBy === 'stars') {
      return b.stargazers_count - a.stargazers_count;
    } else if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'size') {
      return b.size - a.size;
    }
  });
}

function renderProjects() {
  allGrid.innerHTML = '';
  featuredGrid.innerHTML = '';
  
  const searchTerm = searchInput.value.toLowerCase();
  
  let featuredCount = 0;
  let allCount = 0;

  repositories.forEach(repo => {
    // Search filtering
    const matchesSearch = repo.name.toLowerCase().includes(searchTerm) || 
                          (repo.description && repo.description.toLowerCase().includes(searchTerm)) ||
                          (repo.language && repo.language.toLowerCase().includes(searchTerm));
                          
    // Tag filtering
    const matchesFilter = currentFilter === 'all' || repo.language === currentFilter;
    
    if (!matchesSearch || !matchesFilter) return;

    const card = createCard(repo);
    
    // Ensure we don't duplicate manual featured cards
    // Only append to 'allGrid' because we have manual featured cards now
    allGrid.appendChild(card);
    allCount++;
  });
  
  // Hide no results if we have matches
  if(noResults) noResults.style.display = (allCount === 0) ? 'block' : 'none';
  
  // Re-init lucide icons for new cards
  lucide.createIcons();
}

function createCard(repo) {
  const card = document.createElement('div');
  card.className = 'project-card glass-card hover-lift';
  
  // Try to determine an image based on language or topics
  let bgGradient = 'linear-gradient(135deg, #f3f4f6, #ffffff)';
  if (repo.language === 'Python') bgGradient = 'linear-gradient(135deg, #3776ab, #ffffff)';
  if (repo.language === 'JavaScript') bgGradient = 'linear-gradient(135deg, #f7df1e, #ffffff)';
  
  const updatedDate = new Date(repo.updated_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  
  card.innerHTML = `
    <div class="card-banner" style="background: ${bgGradient}; height: 120px; border-radius: 0.5rem; margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: center; overflow: hidden; opacity: 0.5;">
       <i data-lucide="code" style="width: 48px; height: 48px; color: var(--text-color);"></i>
    </div>
    <h3>${repo.name}</h3>
    <p class="repo-desc">${repo.description || 'No description provided.'}</p>
    
    <div class="tech-stack" style="margin-bottom: 1rem;">
      ${repo.language ? `<span>${repo.language}</span>` : ''}
      ${(repo.topics || []).slice(0, 3).map(topic => `<span>${topic}</span>`).join('')}
    </div>
    
    <div class="repo-stats" style="display: flex; gap: 1rem; color: var(--nav-link-color); font-size: 0.875rem; margin-bottom: 1rem; font-weight: 600;">
      <span><i data-lucide="star" style="width:16px;height:16px;vertical-align:middle;"></i> ${repo.stargazers_count}</span>
      <span><i data-lucide="git-fork" style="width:16px;height:16px;vertical-align:middle;"></i> ${repo.forks_count}</span>
    </div>
    
    <p style="font-size: 0.75rem; color: var(--nav-link-color); margin-bottom: 1.5rem;">Updated ${updatedDate}</p>
    
    <div style="display: flex; gap: 0.5rem;">
       <button class="btn-primary view-details-btn" style="flex:1; justify-content:center; padding: 0.5rem;">Details</button>
       <a href="${repo.html_url}" target="_blank" class="btn-secondary" style="padding: 0.5rem;" title="View on GitHub"><i data-lucide="github"></i></a>
    </div>
  `;
  
  const detailsBtn = card.querySelector('.view-details-btn');
  detailsBtn.addEventListener('click', () => openModal(repo));
  
  return card;
}

function openModal(repo) {
  modalTitle.textContent = repo.name;
  modalDesc.textContent = repo.description || 'No description provided.';
  modalStars.textContent = repo.stargazers_count;
  modalForks.textContent = repo.forks_count;
  
  modalTopics.innerHTML = (repo.topics || []).map(t => `<span>${t}</span>`).join('');
  
  modalLang.textContent = repo.language || 'N/A';
  modalUpdated.textContent = new Date(repo.updated_at).toLocaleString();
  modalSize.textContent = (repo.size / 1024).toFixed(2) + ' MB';
  modalLicense.textContent = repo.license ? repo.license.name : 'No License';
  
  modalGithub.href = repo.html_url;
  
  if (repo.homepage) {
    modalDemo.href = repo.homepage;
    modalDemo.style.display = 'inline-flex';
  } else {
    modalDemo.style.display = 'none';
  }
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // prevent background scrolling
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}
