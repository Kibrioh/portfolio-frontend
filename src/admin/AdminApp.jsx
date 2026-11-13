import { useEffect, useState } from 'react'
import {
  ArrowLeft, Check, ChevronDown, ExternalLink, Globe2,
  LoaderCircle, Mail, ShieldCheck, Sparkles, X,
} from 'lucide-react'
import { request } from '../api/client.js'
import AdminLogin from './AdminLogin.jsx'
import AdminMessages from './AdminMessages.jsx'
import AdminModal from './AdminModal.jsx'
import AdminOverview from './AdminOverview.jsx'
import AdminProfileSettings from './AdminProfileSettings.jsx'
import AdminResourceList from './AdminResourceList.jsx'
import { resourceConfig } from './resourceConfig.js'

export default function AdminApp() {
  const [token, setToken] = useState(() => sessionStorage.getItem('portfolioAdminToken') || '')
  const [content, setContent] = useState(null)
  const [messages, setMessages] = useState([])
  const [resumeAvailable, setResumeAvailable] = useState(false)
  const [uploadingResume, setUploadingResume] = useState(false)
  const [section, setSection] = useState('overview')
  const [modal, setModal] = useState(null)
  const [notice, setNotice] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token) return
    sessionStorage.setItem('portfolioAdminToken', token)
    setLoading(true)
    Promise.all([request('/admin/content', {}, token), request('/admin/messages', {}, token)])
      .then(([data, inbox]) => { setContent(data); setMessages(inbox); setResumeAvailable(Boolean(data.resumeAvailable)); setError('') })
      .catch((err) => { sessionStorage.removeItem('portfolioAdminToken'); setToken(''); setError(err.message) })
      .finally(() => setLoading(false))
  }, [token])

  function logout() { sessionStorage.removeItem('portfolioAdminToken'); setToken(''); setContent(null); window.location.href = '/' }
  async function uploadResume(event) {
    event.preventDefault(); setUploadingResume(true); setError('')
    const form = event.currentTarget
    try {
      const formData = new FormData(form)
      await request('/admin/resume', { method: 'POST', body: formData }, token)
      setResumeAvailable(true)
      setNotice('Résumé uploaded.')
      form.reset()
    } catch (err) { setError(err.message) } finally { setUploadingResume(false) }
  }
  async function saveItem(resource, values, id, imageFile, removeImage) {
    if (resource === 'projects') {
      if (imageFile) {
        const formData = new FormData()
        formData.append('image', imageFile)
        const upload = await request('/admin/uploads', { method: 'POST', body: formData }, token)
        values.image = upload.image
      } else if (removeImage) values.image = ''
      else if (id) values.image = content.projects.find((project) => project.id === id)?.image || ''
    }
    const path = `/admin/${resource}${id ? `/${encodeURIComponent(id)}` : ''}`
    const item = await request(path, { method: id ? 'PUT' : 'POST', body: JSON.stringify(values) }, token)
    setContent((current) => ({ ...current, [resource]: id ? current[resource].map((entry) => entry.id === id ? item : entry) : [item, ...current[resource]] }))
    setNotice(`${resourceConfig[resource].singular} ${id ? 'updated' : 'added'}.`)
    return item
  }
  async function deleteItem(resource, item) {
    if (!window.confirm(`Delete “${item.title || item.role || item.name}”? This cannot be undone.`)) return
    await request(`/admin/${resource}/${encodeURIComponent(item.id)}`, { method: 'DELETE' }, token)
    setContent((current) => ({ ...current, [resource]: current[resource].filter((entry) => entry.id !== item.id) }))
    setNotice(`${resourceConfig[resource].singular} deleted.`)
  }
  async function saveProfile(event) {
    event.preventDefault(); setError('')
    const fields = Object.fromEntries(new FormData(event.currentTarget).entries())
    try { const result = await request('/admin/profile', { method: 'PUT', body: JSON.stringify(fields) }, token); setContent((current) => ({ ...current, profile: result.profile })); setNotice('Profile updated.') }
    catch (err) { setError(err.message) }
  }
  if (!token) return <AdminLogin onLogin={setToken} />
  if (loading || !content) return <div className="admin-loading"><LoaderCircle className="spin" size={20} /> Loading your workspace…</div>
  const nav = [['overview', 'Overview', Sparkles], ['profile', 'Profile', Globe2], ...Object.entries(resourceConfig).map(([key, value]) => [key, value.label, value.icon]), ['messages', 'Messages', Mail]]
  const openSection = (nextSection) => {
    setSection(nextSection)
    setNotice('')
    setError('')
  }
  const addResource = (resource) => {
    setSection(resource)
    setModal({ resource, initial: null })
  }

  return <div className="admin-shell">
    <aside className="admin-sidebar">
      <a className="admin-brand" href="/"><span className="wordmark-mark">BK</span><span>FIELDNOTE<small>PORTFOLIO CMS</small></span></a>
      <div className="sidebar-label">WORKSPACE</div>
      <nav>{nav.map(([key, label, Icon]) => <button key={key} className={section === key ? 'selected' : ''} onClick={() => openSection(key)}>
        <Icon size={16} />{label}{key === 'messages' && messages.length > 0 && <span className="nav-count">{messages.length}</span>}
      </button>)}</nav>
      <div className="sidebar-bottom">
        <a href="/" target="_blank" rel="noreferrer"><ExternalLink size={14} /> View portfolio</a>
        <button onClick={logout}><ArrowLeft size={14} /> Sign out</button>
        <div className="admin-user"><span className="admin-avatar">{content.profile.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span><span>{content.profile.name}<small>Administrator</small></span></div>
      </div>
    </aside>
    <div className="admin-main">
      <header className="admin-topbar">
        <div><span>WORKSPACE</span><ChevronDown size={13} /><b>{section === 'overview' ? 'Overview' : section === 'profile' ? 'Profile' : section === 'messages' ? 'Messages' : resourceConfig[section]?.label}</b></div>
        <span className="admin-secure"><ShieldCheck size={14} /> Secure session</span>
      </header>
      <main className="admin-content">
        {notice && <div className="admin-notice"><Check size={15} />{notice}<button onClick={() => setNotice('')}><X size={14} /></button></div>}
        {error && <div className="admin-error">{error}</div>}
        {section === 'overview' && <AdminOverview content={content} messages={messages} onOpenSection={openSection} onAddResource={addResource} />}
        {section === 'profile' && <AdminProfileSettings content={content} resumeAvailable={resumeAvailable} uploadingResume={uploadingResume} onSaveProfile={saveProfile} onUploadResume={uploadResume} />}
        {resourceConfig[section] && <AdminResourceList resource={section} config={resourceConfig[section]} items={content[section]} onAdd={() => setModal({ resource: section, initial: null })} onEdit={(item) => setModal({ resource: section, initial: item })} onDelete={(item) => deleteItem(section, item)} />}
        {section === 'messages' && <AdminMessages messages={messages} />}
      </main>
    </div>
    {modal && <AdminModal resource={modal.resource} initial={modal.initial} onClose={() => setModal(null)} onSave={(values, imageFile, removeImage) => saveItem(modal.resource, values, modal.initial?.id, imageFile, removeImage)} />}
  </div>
}

