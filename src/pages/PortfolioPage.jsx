import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { RESUME_URL } from '../api/client.js'
import { Header, ProjectCategoryNav } from '../components/SiteNavigation.jsx'
import { ProfileRail } from '../components/ProfileRail.jsx'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { Skills } from '../components/Skills.jsx'
import { Projects } from '../components/Projects.jsx'
import { Experience, Education, Certifications, Contact } from '../components/PortfolioSections.jsx'
import { useProjectCategoryHighlight } from '../hooks/useProjectCategoryHighlight.js'
import { usePortfolioContent } from '../hooks/usePortfolioContent.js'

export default function Portfolio() {
  const { content, apiOnline } = usePortfolioContent()
  const [activeCategory, setActiveCategory] = useProjectCategoryHighlight(content.projects)

  const { profile, skills, projects, experience, education, certifications, resumeAvailable } = content
  return <div className="portfolio-shell">
    <Header profile={profile} />
    <div className="portfolio-columns"><ProfileRail profile={profile} skills={skills} resumeAvailable={resumeAvailable} />
      <ProjectCategoryNav activeCategory={activeCategory} onSelect={setActiveCategory} />
      <main>
      <section className="content-section projects-section" id="projects">
        <div className="heading-row"><SectionHeading eyebrow="SELECTED WORK" title="Projects" /><span className="work-count">{String(projects.length).padStart(2, '0')} / PROJECTS</span></div>
        <Projects projects={projects} githubFallback={profile.github} />
      </section>

      <section className="content-section skills-section" id="skills">
        <SectionHeading eyebrow="TECHNICAL PROFICIENCIES" title="Technical" accent="expertise." />
        <p className="section-deck">Application development, backend systems, geospatial engineering and spatial analytics.</p>
        <Skills skills={skills} />
      </section>

      <section className="content-section experience-section" id="experience">
        <SectionHeading eyebrow="THE PATH SO FAR" title="Experience &" accent="learning." />
        <div className="experience-layout"><Experience entries={experience} /><div className="learning-column"><Education entries={education} /><Certifications entries={certifications} /></div></div>
      </section>

      <section className="contact-section" id="contact">
        <SectionHeading eyebrow="START A CONVERSATION" title="Let’s make" accent="a mark." />
        <Contact profile={profile} />
      </section>
    </main></div>
    <footer className="site-footer"><a className="wordmark footer-wordmark" href="#home"><span className="wordmark-mark">{profile.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span><span className="wordmark-name">{profile.name}<small>MADE WITH INTENTION</small></span></a><p>Designed for ideas with a little more depth.</p><div><a href="#home">BACK TO TOP <ArrowUpRight size={13} /></a>{resumeAvailable && <a href={RESUME_URL}>RÉSUMÉ <ArrowDownRight size={13} /></a>}<a href="/admin" className="admin-link">ADMIN</a></div><span className="footer-year">© {new Date().getFullYear()}</span></footer>
    {!apiOnline && <div className="api-indicator" title="The portfolio API is unavailable. Start the Flask server to edit content and receive messages."><span /> API offline</div>}
  </div>
}

