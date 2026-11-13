import { ArrowUpRight } from 'lucide-react'
import techPointMark from '../assets/techpoint-mark.svg'
import { PROJECT_CATEGORIES } from '../config/projectCategories.js'

export function Header({ profile, homeHref = '#about', contactHref = '#contact' }) {
  return <header className="site-header"><details className="mobile-project-menu"><summary className="mobile-project-menu-trigger" aria-label="Open navigation menu"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg></summary><nav className="mobile-project-menu-panel" aria-label="Main navigation"><a href="/">Home<ArrowUpRight size={14} /></a>{PROJECT_CATEGORIES.map(({ id, label }) => <a key={id} href={`/projects?category=${id}#projects-${id}`}>{label}<ArrowUpRight size={14} /></a>)}</nav></details><a className="header-brand" href={homeHref}><img className="header-brand-logo" src={techPointMark} alt="" /><span className="header-brand-copy"><span className="header-brand-name">TechPoint Solutions</span><span className="header-brand-services">Geographic Information Systems. Software Development. Advanced Data Analytics.</span></span></a><div className="header-actions"><a className="contact-nav" href={contactHref}>Contact me <ArrowUpRight size={15} /></a><a className="contact-nav-email" href={`mailto:${profile.email}`}>{profile.email}</a></div></header>
}

export function ProjectCategoryNav({ activeCategory, onSelect, hideActiveCategory = false }) {
  const categories = hideActiveCategory && activeCategory
    ? PROJECT_CATEGORIES.filter(({ id }) => id !== activeCategory)
    : PROJECT_CATEGORIES
  return <nav className="project-category-nav" aria-label={hideActiveCategory && activeCategory ? 'Other project categories' : 'Project categories'}>
    {categories.map(({ label, id }) => <a className={activeCategory === id ? 'is-active' : ''} aria-current={activeCategory === id ? 'location' : undefined} key={id} href={`#projects-${id}`} onClick={() => onSelect(id)}>{label}</a>)}
  </nav>
}

