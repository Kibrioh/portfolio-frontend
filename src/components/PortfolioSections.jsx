import { useState } from 'react'
import { BriefcaseBusiness, Check, Compass, ExternalLink, LoaderCircle, LockKeyhole, Mail, MapPin, Send, ShieldCheck, ArrowUpRight } from 'lucide-react'
import { request } from '../api/client.js'

export function Experience({ entries }) {
  return <div className="timeline-column">
    <div className="subsection-heading"><BriefcaseBusiness size={17} /><h3>Experience</h3><span>{String(entries.length).padStart(2, '0')}</span></div>
    {!entries.length ? <div className="timeline-empty"><span className="timeline-empty-dot" /><p>Professional experience will appear here.</p></div> : <div className="timeline">
      {entries.map((item, index) => <article className="timeline-item" key={item.id}><span className="timeline-marker">0{index + 1}</span><div className="timeline-main"><div className="timeline-top"><span>{item.period}</span></div><h4>{item.role}</h4>{item.company && <div className="timeline-company">{item.company}</div>}<p className="timeline-description">{item.description}</p>{item.skills?.length > 0 && <div className="project-stack">{item.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>}</div></article>)}
    </div>}
  </div>
}

export function Education({ entries }) {
  return <section className="learning-subsection">
    <div className="subsection-heading"><Compass size={17} /><h3>Education</h3><span>{String(entries.length).padStart(2, '0')}</span></div>
    <div className="education-list">{entries.length ? entries.map((item, index) => <article className="education-card" key={item.id}><span>{item.period}</span><div><h4>{item.degree}</h4>{item.institution && <p className="education-institution">{item.institution}</p>}{item.description && <p>{item.description}</p>}</div><span className="timeline-marker">{String(index + 1).padStart(2, '0')}</span></article>) : <div className="timeline-empty"><span className="timeline-empty-dot" /><p>Education and qualifications will appear here.</p></div>}</div>
  </section>
}

export function Certifications({ entries }) {
  return <section className="learning-subsection">
    <div className="subsection-heading"><ShieldCheck size={17} /><h3>Certifications</h3><span>{String(entries.length).padStart(2, '0')}</span></div>
    {entries.length ? <div className="cert-list">{entries.map((item) => <article className="cert-card" key={item.id}>
      <div className="cert-seal"><ShieldCheck size={16} /></div>
      <div><h4>{item.title}</h4>{item.issuer && <p className="cert-issuer">{item.issuer}</p>}{item.description && <p>{item.description}</p>}{item.date && <span>{item.date}</span>}</div>
      {item.credentialUrl ? <a href={item.credentialUrl} target="_blank" rel="noreferrer" aria-label={`View credential for ${item.title}`}><ExternalLink size={15} /></a> : <span aria-hidden="true" />}
    </article>)}</div> : <div className="cert-empty"><span className="timeline-empty-dot" /><p>Professional certifications will appear here.</p></div>}
  </section>
}

export function Contact({ profile }) {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  async function submit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form).entries())
    setStatus('sending'); setError('')
    try {
      await request('/contact', { method: 'POST', body: JSON.stringify({ ...values, createdAt: new Date().toISOString() }) })
      setStatus('sent'); form.reset()
    } catch (err) { setError(err.message); setStatus('error') }
  }
  return <div className="contact-layout">
    <div className="contact-intro"><p className="eyebrow">LET’S BUILD SOMETHING MEANINGFUL</p><h3>Have a project<br />on the <em>horizon?</em></h3><p className="contact-copy">Have an idea, a tricky dataset or an opportunity to share? Send a note. I’d love to hear what you’re working on.</p>
      <a className="contact-email" href={`mailto:${profile.email}`}><span><Mail size={16} /></span>{profile.email}<ArrowUpRight size={15} /></a>
      {profile.location && <div className="contact-location"><MapPin size={14} />{profile.location}</div>}
    </div>
    <form className="contact-form" onSubmit={submit}>
      <div className="form-topline"><span>MESSAGE / 01</span><span>ALL FIELDS REQUIRED</span></div>
      <label>Your name<input name="name" autoComplete="name" placeholder="Jane Smith" required maxLength="120" /></label>
      <label>Email address<input name="email" type="email" autoComplete="email" placeholder="jane@example.com" required maxLength="254" /></label>
      <label>What’s on your mind?<textarea name="message" placeholder="Tell me a little about your idea…" rows="4" required maxLength="5000" /></label>
      <label className="contact-trap" aria-hidden="true">Leave this field empty<input name="website" tabIndex="-1" autoComplete="off" /></label>
      {status === 'sent' ? <div className="form-feedback success"><Check size={16} />Message received. Thanks for reaching out.</div> : status === 'error' ? <div className="form-feedback error">{error}</div> : null}
      <button className="submit-button" type="submit" disabled={status === 'sending'}>{status === 'sending' ? <>Sending <LoaderCircle className="spin" size={16} /></> : <>Send message <Send size={15} /></>}</button>
      <p className="form-note"><LockKeyhole size={12} />Your details stay private.</p>
    </form>
  </div>
}

