document.addEventListener('DOMContentLoaded', () => {
  fetchCertificates();
});

let allCertificates = [];
let currentFilter = 'all';

async function fetchCertificates() {
  try {
    const response = await fetch('certificates.json');
    if (!response.ok) throw new Error('Failed to load certificates');
    allCertificates = await response.json();
    
    // Extract unique categories and skills
    const categories = new Set();
    const skills = new Set();
    
    allCertificates.forEach(cert => {
      categories.add(cert.category);
      if(cert.skills) {
        cert.skills.forEach(skill => skills.add(skill));
      }
    });

    // Populate Stats
    const countEl = document.getElementById('stat-cert-count');
    if (countEl) countEl.setAttribute('data-target', allCertificates.length);
    const domainEl = document.getElementById('stat-domain-count');
    if (domainEl) domainEl.setAttribute('data-target', categories.size);

    generateFilters(categories);
    renderSkills(skills);
    renderCertificates();
    
  } catch (error) {
    console.error(error);
    const grid = document.getElementById('all-certs-grid');
    if(grid) {
      grid.innerHTML = `<div class="glass-card" style="grid-column: 1 / -1; text-align: center;">
        <p>Could not load certificates. Please ensure certificates.json is present.</p>
      </div>`;
    }
  }
}

function generateFilters(categories) {
  const container = document.getElementById('cert-filter-buttons');
  if (!container) return;
  
  Array.from(categories).sort().forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.dataset.filter = cat;
    btn.textContent = cat;
    btn.addEventListener('click', (e) => {
      currentFilter = cat;
      document.querySelectorAll('#cert-filter-buttons .filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderCertificates();
    });
    container.appendChild(btn);
  });
  
  // Attach event listener to "All" button
  const allBtn = container.querySelector('[data-filter="all"]');
  if(allBtn) {
    allBtn.addEventListener('click', (e) => {
      currentFilter = 'all';
      document.querySelectorAll('#cert-filter-buttons .filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderCertificates();
    });
  }
}

function renderSkills(skills) {
  const container = document.getElementById('certified-skills-grid');
  if (!container) return;
  
  container.innerHTML = '';
  Array.from(skills).sort().forEach(skill => {
    const badge = document.createElement('span');
    badge.className = 'interest-pill glass-card hover-lift';
    badge.textContent = skill;
    container.appendChild(badge);
  });
}

function renderCertificates() {
  const featuredGrid = document.getElementById('featured-certs-grid');
  const allGrid = document.getElementById('all-certs-grid');
  const noResults = document.getElementById('no-certs-results');
  
  if (!featuredGrid || !allGrid) return;
  
  featuredGrid.innerHTML = '';
  allGrid.innerHTML = '';
  
  let featuredCount = 0;
  let allCount = 0;

  allCertificates.forEach((cert, index) => {
    // Determine if it matches filter (Featured ignores filters by default to always show best, but let's filter all)
    const matchesFilter = currentFilter === 'all' || cert.category === currentFilter;
    
    if (!matchesFilter) return;

    const card = createCertCard(cert);
    
    // For demo purposes, we make the first 2 certificates "Featured"
    if (index < 2 && currentFilter === 'all') {
      featuredGrid.appendChild(card.cloneNode(true));
      featuredCount++;
      // Re-attach event listener to clone
      featuredGrid.lastChild.querySelector('.btn-primary').addEventListener('click', () => openModal(cert));
    }
    
    allGrid.appendChild(card);
    allCount++;
  });
  
  document.getElementById('featured-certs-section').style.display = (featuredCount > 0 && currentFilter === 'all') ? 'block' : 'none';
  if(noResults) noResults.style.display = (allCount === 0) ? 'block' : 'none';
  
  lucide.createIcons();
}

function createCertCard(cert) {
  const card = document.createElement('div');
  card.className = 'project-card glass-card hover-lift';
  
  const dateStr = new Date(cert.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
  
  card.innerHTML = `
    <div class="card-banner" style="background: linear-gradient(135deg, #f3f4f6, #ffffff); height: 120px; border-radius: 0.5rem; margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: center; overflow: hidden; opacity: 0.5; color: var(--text-color);">
       <i data-lucide="award" style="width: 48px; height: 48px;"></i>
    </div>
    <h3 style="margin-bottom: 0.25rem;">${cert.title}</h3>
    <p style="color: var(--nav-link-color); font-size: 0.875rem; margin-bottom: 1rem;">Issued by: <strong>${cert.issuer}</strong></p>
    
    <div class="tech-stack" style="margin-bottom: 1rem;">
      ${(cert.skills || []).slice(0, 3).map(skill => `<span>${skill}</span>`).join('')}
    </div>
    
    <p style="font-size: 0.75rem; color: var(--nav-link-color); margin-bottom: 1.5rem;">Earned: ${dateStr}</p>
    
    <div style="display: flex; gap: 0.5rem;">
       <button class="btn-primary" style="flex:1; justify-content:center; padding: 0.5rem;">View Details</button>
    </div>
  `;
  
  const detailsBtn = card.querySelector('.btn-primary');
  detailsBtn.addEventListener('click', () => openModal(cert));
  
  return card;
}

// Modal Logic
const modal = document.getElementById('cert-modal');
const modalClose = document.getElementById('cert-modal-close');

function openModal(cert) {
  if(!modal) return;
  
  document.getElementById('modal-cert-title').textContent = cert.title;
  document.getElementById('modal-cert-issuer').textContent = cert.issuer;
  document.getElementById('modal-cert-date').textContent = new Date(cert.date).toLocaleDateString();
  document.getElementById('modal-cert-id').textContent = cert.credentialId || 'N/A';
  document.getElementById('modal-cert-category').textContent = cert.category || 'N/A';
  
  const skillsContainer = document.getElementById('modal-cert-skills');
  if(skillsContainer) {
    skillsContainer.innerHTML = (cert.skills || []).map(s => `<span>${s}</span>`).join('');
  }
  
  const verifyBtn = document.getElementById('modal-cert-verify');
  if(verifyBtn) {
    if(cert.verify && cert.verify !== '#') {
      verifyBtn.href = cert.verify;
      verifyBtn.style.display = 'inline-flex';
    } else {
      verifyBtn.style.display = 'none';
    }
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

if(modalClose) {
  modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  });
}
if(modal) {
  modal.addEventListener('click', (e) => {
    if(e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}
