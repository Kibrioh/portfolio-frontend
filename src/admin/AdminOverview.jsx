import { ArrowUpRight, Mail, MapPin, Plus, Sparkles } from 'lucide-react'
import { resourceConfig } from './resourceConfig.js'

export default function AdminOverview({ content, messages, onOpenSection, onAddResource }) {
  return <>
    <div className="admin-page-heading">
      <div>
        <p className="eyebrow">MONDAY, YOUR PORTFOLIO</p>
        <h1>Good to see you, {content.profile.name.split(' ')[0]}.</h1>
        <p>Here’s how your portfolio is looking today.</p>
      </div>
      <a className="button-primary" href="/" target="_blank" rel="noreferrer">Preview site <ArrowUpRight size={15} /></a>
    </div>

    <div className="overview-stats">
      {Object.entries(resourceConfig).map(([key, config]) => <button className="overview-stat" key={key} onClick={() => onOpenSection(key)}>
        <span className="stat-icon"><config.icon size={18} /></span>
        <span className="stat-number">{content[key].length.toString().padStart(2, '0')}</span>
        <span className="stat-label">{config.label}</span>
        <ArrowUpRight size={14} />
      </button>)}
      <button className="overview-stat" onClick={() => onOpenSection('messages')}>
        <span className="stat-icon"><Mail size={18} /></span>
        <span className="stat-number">{messages.length.toString().padStart(2, '0')}</span>
        <span className="stat-label">Messages</span>
        <ArrowUpRight size={14} />
      </button>
    </div>

    <section className="admin-panel overview-panel">
      <div className="panel-heading"><div><p className="eyebrow">QUICK ACTIONS</p><h2>Manage your content</h2></div></div>
      <div className="quick-actions">
        {Object.entries(resourceConfig).map(([key, config]) => <button key={key} onClick={() => onAddResource(key)}>
          <span><config.icon size={17} /></span><b>Add {config.singular}</b><Plus size={15} />
        </button>)}
      </div>
    </section>

    <section className="admin-panel">
      <div className="panel-heading">
        <div><p className="eyebrow">PROFILE SNAPSHOT</p><h2>{content.profile.headline}</h2></div>
        <button className="button-quiet" onClick={() => onOpenSection('profile')}>Edit profile <ArrowUpRight size={14} /></button>
      </div>
      <p className="overview-about">{content.profile.about}</p>
      <div className="overview-profile-facts">
        <span><MapPin size={14} />{content.profile.location}</span>
        <span><Mail size={14} />{content.profile.email}</span>
        <span><Sparkles size={14} />{content.profile.availability}</span>
      </div>
    </section>
  </>
}
