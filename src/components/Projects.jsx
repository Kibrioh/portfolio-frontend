import { ArrowRight, ArrowUpRight, Code2, Sparkles } from 'lucide-react'
import { projectImageSource } from '../api/client.js'
import { PROJECT_CATEGORIES } from '../config/projectCategories.js'
import { GithubMark } from './BrandMarks.jsx'

function ProjectVisual({ project, index }) {
  if (project.image) return <img className="project-cover-image" src={projectImageSource(project.image)} alt={`${project.title} project screenshot`} />
  return <ProjectScreenshot project={project} step={{ screenTitle: 'Project overview' }} stepIndex={index} variant={projectScreenshotVariant(project, index)} className={`project-visual project-visual-${index % 3}`} />
}

export function projectCategoryId(category) {
  const value = (category || '').toLowerCase()
  if (value.includes('spatial') || value.includes('data science')) return 'spatial-data-science'
  if (value.includes('gis')) return 'gis-software-development'
  return 'web-application-development'
}

export function projectCategoryLabel(category) {
  return PROJECT_CATEGORIES.find(({ id }) => id === projectCategoryId(category))?.label || PROJECT_CATEGORIES[0].label
}

export function projectScreenshotVariant(project, index = 0) {
  const seed = [...`${project.id || project.title}-${index}`].reduce((value, char) => (value * 31 + char.charCodeAt(0)) >>> 0, 7)
  return ['dashboard', 'table', 'map', 'chart'][seed % 4]
}

export function ProjectScreenshot({ project, step, stepIndex = 0, variant = 'dashboard', className = 'walkthrough-screenshot' }) {
  const seed = [...`${project.id || project.title}-${stepIndex}`].reduce((value, char) => (value * 33 + char.charCodeAt(0)) >>> 0, 11)
  const metrics = [
    `${(seed % 80) + 20}%`,
    `${(seed % 7) + 2},${(seed % 8) + 1}`,
    `${(seed % 4) + 1}.${(seed % 9) + 1}k`,
  ]
  const bars = Array.from({ length: 8 }, (_, index) => 18 + ((seed >>> (index % 16)) + index * 13) % 65)
  return <div className={`mock-screenshot ${className}`} role="img" aria-label={`Generated placeholder screenshot for ${project.title}: ${step.screenTitle}`}>
    <div className="mock-browser-bar"><i /><i /><i /><span>workspace.techpoint.local</span><b>•••</b></div>
    <div className="mock-product-app">
      <aside className="mock-product-sidebar"><b>TP</b><span className="selected">Overview</span><span>Workspace</span><span>Analysis</span><span>Reports</span><small>TECHPOINT</small></aside>
      <div className="mock-product-workspace">
        <div className="mock-product-heading"><div><small>{projectCategoryLabel(project.category).toUpperCase()}</small><strong>{step.screenTitle}</strong></div><span>PREVIEW</span></div>
        <div className="mock-metric-row">{metrics.map((metric, index) => <div key={index}><small>{['Coverage', 'Records', 'Status'][index]}</small><b>{metric}</b></div>)}</div>
        <div className={`mock-screen-canvas mock-screen-${variant}`}>
          {variant === 'map' && <svg viewBox="0 0 640 190" preserveAspectRatio="none" aria-hidden="true"><rect width="640" height="190" fill="#e8f0ed"/><path d="M0 36 99 25l42 38 90-17 66 34 75-27 83 30 72-38 113 24v121H0Z" fill="#d5e6d7"/><path d="M35 156c52-56 69-35 118-77s82 4 129-22 84 22 134-2 76 34 114 6 68-9 99-22M-4 112c62-29 78 28 144-5s73-9 113 17 63-25 113-5 92 18 138-14 72-6 143 14" fill="none" stroke="#a1b9ac" strokeWidth="2"/><path d="M55 190 166 84l80 39 92-67 92 55 113-73" fill="none" stroke="#72a5bd" strokeWidth="4"/><g fill="#087c8b" stroke="white" strokeWidth="3"><circle cx="166" cy="84" r="7"/><circle cx="338" cy="56" r="7"/><circle cx="430" cy="111" r="7"/><circle cx="543" cy="38" r="7"/></g><path d="M583 20v27m-9-9h18" stroke="#344c53" strokeWidth="2"/></svg>}
          {variant === 'chart' && <svg viewBox="0 0 640 190" preserveAspectRatio="none" aria-hidden="true"><rect width="640" height="190" fill="#f5f7f5"/><path d="M46 18v142h564M46 125h564M46 87h564M46 49h564" stroke="#d8dfda" strokeWidth="1"/><g fill="#4d91bd">{bars.map((height, index) => <rect key={index} x={83 + index * 62} y={158 - height * 1.65} width="28" height={height * 1.65} rx="3" opacity={index === 5 ? 1 : .72}/>)}</g><path d="M80 119c36-8 47-35 78-28s39 31 69 8 47-20 75-9 42-15 72-11 44 15 71-3 43-13 68-29" fill="none" stroke="#19a77b" strokeWidth="4" strokeLinecap="round"/><g fill="#19a77b">{[80,158,227,302,374,445,518,590].map((x, index) => <circle key={x} cx={x} cy={[119,91,99,90,78,93,68,47][index]} r="4"/>)}</g></svg>}
          {variant === 'table' && <div className="mock-data-table"><div className="mock-table-head"><span>NAME</span><span>LOCATION</span><span>STATUS</span><span>UPDATED</span></div>{Array.from({ length: 5 }, (_, index) => <div className="mock-table-row" key={index}><span><i />{['North Sector', 'Central Zone', 'Riverside', 'East District', 'West Point'][(index + stepIndex) % 5]}</span><span>{['Nairobi', 'Kiambu', 'Machakos', 'Kisumu', 'Nakuru'][(index + seed % 5) % 5]}</span><span><b>{index % 3 === 0 ? 'Active' : 'Reviewed'}</b></span><span>{`${(index + 2).toString().padStart(2, '0')} min ago`}</span></div>)}</div>}
          {variant === 'dashboard' && <div className="mock-dashboard-layout"><div className="mock-mini-map"><svg viewBox="0 0 400 170" preserveAspectRatio="none" aria-hidden="true"><rect width="400" height="170" fill="#e7efeb"/><path d="m0 120 50-40 47 20 54-57 43 25 51-35 57 37 44-20 54 26v94H0Z" fill="#cbded0"/><path d="M24 153 83 86l63 26 73-55 53 34 87-59" fill="none" stroke="#669eae" strokeWidth="4"/><g fill="#12847c" stroke="white" strokeWidth="3"><circle cx="83" cy="86" r="7"/><circle cx="219" cy="57" r="7"/><circle cx="272" cy="91" r="7"/><circle cx="359" cy="32" r="7"/></g></svg></div><div className="mock-dashboard-side"><small>ACTIVITY TREND</small><svg viewBox="0 0 180 90" preserveAspectRatio="none" aria-hidden="true"><path d="M5 74 32 58 54 64 78 36 102 47 128 24 151 30 176 9" fill="none" stroke="#168e79" strokeWidth="4"/><path d="M5 74 32 58 54 64 78 36 102 47 128 24 151 30 176 9v80H5Z" fill="#d9ece5"/></svg></div></div>}
          <span className="mock-preview-stamp"></span>
        </div>
      </div>
    </div>
  </div>
}

function FullProjectCard({ project, index, githubFallback }) {
  const githubHref = project.github || githubFallback
  return <article className="project-card">
    <ProjectVisual project={project} index={index} />
    <div className="project-content">
      <div className="project-meta"><span>{projectCategoryLabel(project.category)}</span>{project.featured && <span className="featured-tag"><Sparkles size={11} /> FEATURED</span>}</div>
      <h3>{project.title}</h3>
      <div className="project-detail-group"><p className="eyebrow">PROJECT LINKS</p><div className="project-links project-detail-links">
        {githubHref ? <a href={githubHref} target="_blank" rel="noreferrer"><GithubMark size={16} /> {project.github ? 'GitHub' : 'GitHub profile'} <ArrowRight size={14} /></a> : <span className="project-link-placeholder"><GithubMark size={16} /> GitHub link coming soon</span>}
        <a href={`/demo/${encodeURIComponent(project.id)}`}>Live demo <ArrowUpRight size={14} /></a>
      </div></div>
      <div className="project-detail-group"><p className="eyebrow">SKILLS</p><div className="project-stack">{(project.stack || []).map((tag) => <span key={tag}>{tag}</span>)}</div></div>
      {project.description && <div className="project-detail-group"><p className="eyebrow">ABOUT THIS PROJECT</p><p className="project-description">{project.description}</p></div>}
    </div>
  </article>
}

export function Projects({ projects, githubFallback = '', showAll = false, focusedCategory = '' }) {
  if (!projects.length && !showAll) return (
    <div className="empty-showcase">
      <div className="empty-orbit"><span /><span /><span /><Code2 size={24} /></div>
      <div><p className="eyebrow">CASE STUDY</p><h3>Good work deserves<br />a place on the map.</h3><p>Project highlights not available yet but coming soon.</p></div>
      <a href="/admin" className="text-link">Add a project <ArrowUpRight size={15} /></a>
    </div>
  )
  const categories = focusedCategory
    ? [...PROJECT_CATEGORIES].sort((a, b) => Number(b.id === focusedCategory) - Number(a.id === focusedCategory))
    : PROJECT_CATEGORIES
  return <div className={`project-categories${showAll ? ' is-project-archive' : ''}`}>
    {categories.map(({ id, label }) => {
      const items = projects.map((project, index) => ({ project, index })).filter(({ project }) => projectCategoryId(project.category) === id)
      const visibleItems = showAll ? items : items.slice(0, 3)
      return <section className="project-category" id={`projects-${id}`} key={id}>
        <h3>{label}</h3>
        {visibleItems.length ? <div className={showAll ? 'project-grid project-full-grid' : 'project-grid project-home-grid'}>
          {visibleItems.map(({ project, index }) => <FullProjectCard key={project.id} project={project} index={index} githubFallback={githubFallback} />)}
        </div> : <p className="category-empty">Projects in this category are coming soon.</p>}
        {!showAll && items.length > 3 && <a className="project-view-all" href={`/projects?category=${id}#projects-${id}`} target="_blank" rel="noreferrer">View all {items.length} projects in {label} <ArrowUpRight size={15} /></a>}
      </section>
    })}
  </div>
}

