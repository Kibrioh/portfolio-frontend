import { useEffect } from 'react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { PROJECT_CATEGORIES } from '../config/projectCategories.js'
import { Header, ProjectCategoryNav } from '../components/SiteNavigation.jsx'
import { Projects } from '../components/Projects.jsx'
import { useProjectCategoryHighlight } from '../hooks/useProjectCategoryHighlight.js'
import { usePortfolioContent } from '../hooks/usePortfolioContent.js'

export default function ProjectArchivePage() {
  const { content, apiOnline, loading } = usePortfolioContent()
  const requestedCategory = new URLSearchParams(window.location.search).get('category') || ''
  const focusedCategory = PROJECT_CATEGORIES.some(({ id }) => id === requestedCategory) ? requestedCategory : ''
  const [activeCategory, setActiveCategory] = useProjectCategoryHighlight(content.projects)

  useEffect(() => {
    if (!focusedCategory || loading) return
    document.getElementById(`projects-${focusedCategory}`)?.scrollIntoView({ block: 'start' })
  }, [focusedCategory, loading])

  return <div className="project-directory-page">
    <Header profile={content.profile} homeHref="/" contactHref="/#contact" />
    <ProjectCategoryNav activeCategory={activeCategory || focusedCategory} onSelect={setActiveCategory} hideActiveCategory />
    <main className="project-directory-main">
      <a className="project-directory-back" href="/"><ArrowLeft size={14} /> Back to portfolio</a>
      <div className="project-directory-heading"><p className="eyebrow">FIELDNOTE / PROJECT ARCHIVE</p><h1>Explore all projects</h1><p>Browse the full collection by discipline. Select a category to jump to its projects.</p></div>
      <Projects projects={content.projects} githubFallback={content.profile.github} showAll focusedCategory={focusedCategory} />
    </main>
    <footer className="project-directory-footer"><a href="/">Back to portfolio <ArrowLeft size={14} /></a><span>© {new Date().getFullYear()} {content.profile.name}</span></footer>
    {!apiOnline && <div className="api-indicator" title="The project archive is showing available local content because the portfolio API is offline."><span /> API offline</div>}
  </div>
}

