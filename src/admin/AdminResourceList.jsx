import { ArrowUpRight, Code2, Plus, Sparkles, X } from 'lucide-react'
import { projectImageSource } from '../api/client.js'

export default function AdminResourceList({ resource, config, items, onAdd, onEdit, onDelete }) {
  return <>
    <div className="admin-page-heading">
      <div>
        <p className="eyebrow">CONTENT LIBRARY / {resource.toUpperCase()}</p>
        <h1>{config.label}</h1>
        <p>Manage the {config.label.toLowerCase()} displayed on your portfolio.</p>
      </div>
      <button className="button-primary" onClick={onAdd}><Plus size={16} /> Add {config.singular}</button>
    </div>

    <section className="admin-panel content-list-panel">
      {items.length ? <div className="content-list">
        {items.map((item) => {
          const title = item.title || item.role || item.degree || item.name || 'Untitled entry'
          const meta = [item.institution || item.company || item.issuer || item.category || item.date, item.period].filter(Boolean).join(' · ')
          return <article className="content-row" key={item.id}>
            {resource === 'projects' && <div className="content-row-thumb">{item.image ? <img src={projectImageSource(item.image)} alt="" /> : <Code2 size={16} />}</div>}
            <div className="content-row-main"><h3>{title}</h3><p>{meta}</p></div>
            {resource === 'projects' && item.featured && <span className="row-status"><Sparkles size={12} /> Featured</span>}
            <button className="button-quiet" onClick={() => onEdit(item)}>Edit</button>
            <button className="delete-button" onClick={() => onDelete(item)} aria-label={`Delete ${title}`}><X size={16} /></button>
          </article>
        })}
      </div> : <div className="admin-empty">
        <div className="empty-orbit"><Plus size={22} /></div>
        <h3>No {config.label.toLowerCase()} yet</h3>
        <p>Add your first {config.singular} and it will appear on your portfolio.</p>
        <button className="button-primary" onClick={onAdd}><Plus size={15} /> Add {config.singular}</button>
      </div>}
    </section>
  </>
}
