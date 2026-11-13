import { ArrowDownRight, ArrowUpRight, Mail } from 'lucide-react'
import { RESUME_URL } from '../api/client.js'
import { IconLink, GithubMark, LinkedinMark } from './BrandMarks.jsx'

export function ProfileRail({ profile, skills, resumeAvailable }) {
  return <aside className="profile-rail" id="about">
    <section className="rail-card"><h1>{profile.name}</h1><h2>{profile.role}</h2><p className="rail-location">Based in {profile.location}</p>
      <div className="rail-socials"><IconLink href={profile.linkedin} label="LinkedIn"><LinkedinMark size={16} /></IconLink><IconLink href={profile.github} label="GitHub"><GithubMark size={16} /></IconLink><a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={16} /></a></div>
      <div className="rail-about"><p className="eyebrow">ABOUT</p><p>{profile.about}</p></div>
      <div className="rail-skills"><p className="eyebrow">SKILLS</p><div>{skills.map((skill) => <span key={skill.id || skill.name}>{skill.name}</span>)}</div></div>
      {resumeAvailable && <a className="button-primary rail-resume" href={RESUME_URL}>Download résumé <ArrowDownRight size={15} /></a>}
      <a className="rail-contact" href={`mailto:${profile.email}`}>Available for opportunities <ArrowUpRight size={14} /></a>
    </section>
  </aside>
}

