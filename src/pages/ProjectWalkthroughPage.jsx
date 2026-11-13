import { ArrowLeft, ArrowUpRight, ExternalLink } from 'lucide-react'
import { PROJECT_CATEGORIES } from '../config/projectCategories.js'
import { Header } from '../components/SiteNavigation.jsx'
import { GithubMark } from '../components/BrandMarks.jsx'
import { ProjectScreenshot, projectCategoryId, projectCategoryLabel } from '../components/Projects.jsx'
import { projectWalkthroughSteps } from '../utils/projectWalkthrough.js'
import { usePortfolioContent } from '../hooks/usePortfolioContent.js'

export default function ProjectWalkthroughPage() {
  const projectId = decodeURIComponent(window.location.pathname.split('/').filter(Boolean).pop() || '')
  const { content, apiOnline, loading } = usePortfolioContent()

  const project = content.projects.find((item) => String(item.id) === projectId)
  const categoryId = project ? projectCategoryId(project.category) : PROJECT_CATEGORIES[0].id
  const categoryHref = `/projects?category=${categoryId}#projects-${categoryId}`
  const steps = project ? projectWalkthroughSteps(project) : []
  return <div className="project-walkthrough-page">
    <Header profile={content.profile} homeHref="/" contactHref="/#contact" />
    {project ? <main className="project-walkthrough-main">
      <a className="walkthrough-back-link" href={categoryHref}><ArrowLeft size={15} /> Back to {projectCategoryLabel(project.category)}</a>
      <section className="walkthrough-intro"><p className="eyebrow">STEP-BY-STEP WALKTHROUGH / {projectCategoryLabel(project.category).toUpperCase()}</p><h1>{project.title}</h1><p>{project.description || 'A guided look at the project workflow and example outputs.'}</p><div className="walkthrough-intro-meta"><span>ILLUSTRATIVE WALKTHROUGH</span><span>{String(steps.length).padStart(2, '0')} STEPS</span></div>
        <p className="walkthrough-placeholder-note">The screens below are generated placeholders using sample interface data. Replace them with real screenshots as the project develops.</p>
        <div className="walkthrough-links">{(project.github || content.profile.github) && <a href={project.github || content.profile.github} target="_blank" rel="noreferrer"><GithubMark size={16} /> {project.github ? 'GitHub repository' : 'GitHub profile'} <ArrowUpRight size={14} /></a>}{project.demo && <a href={project.demo} target="_blank" rel="noreferrer"><ExternalLink size={15} /> Open live application <ArrowUpRight size={14} /></a>}</div>
      </section>
      <div className="walkthrough-steps">{steps.map((step, index) => <section className="walkthrough-step" key={`${step.title}-${index}`}><div className="walkthrough-step-copy"><p className="eyebrow">STEP {String(index + 1).padStart(2, '0')}</p><h2>{step.title}</h2><p>{step.description}</p></div><ProjectScreenshot project={project} step={step} stepIndex={index} variant={step.variant} className="walkthrough-screenshot" /></section>)}</div>
      <a className="walkthrough-back-link walkthrough-bottom-link" href={categoryHref}><ArrowLeft size={15} /> Back to {projectCategoryLabel(project.category)}</a>
    </main> : <main className="project-walkthrough-main walkthrough-empty"><p className="eyebrow">PROJECT WALKTHROUGH</p><h1>{loading ? 'Loading project…' : 'Project not found'}</h1><p>{loading ? 'Getting the project details ready.' : 'This project may have been removed or the link may be out of date.'}</p><a className="walkthrough-back-link" href="/projects"><ArrowLeft size={15} /> Browse all projects</a></main>}
    <footer className="project-directory-footer"><a href="/">Home <ArrowLeft size={14} /></a><span>© {new Date().getFullYear()} {content.profile.name}</span></footer>
    {!apiOnline && <div className="api-indicator" title="Showing available local project content because the portfolio API is offline."><span /> API offline</div>}
  </div>
}

