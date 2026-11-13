import { useEffect, useState } from 'react'
import { ArrowUpRight, LoaderCircle, X } from 'lucide-react'
import { projectImageSource } from '../api/client.js'
import { projectCategoryLabel } from '../components/Projects.jsx'
import { resourceConfig } from './resourceConfig.js'

export default function AdminModal({ resource, initial, onClose, onSave }) {
  const config = resourceConfig[resource]
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [removeImage, setRemoveImage] = useState(false)
  const [imagePreview, setImagePreview] = useState(() => initial?.image ? projectImageSource(initial.image) : '')

  useEffect(() => {
    if (!imageFile) return
    const previewUrl = URL.createObjectURL(imageFile)
    setImagePreview(previewUrl)
    return () => URL.revokeObjectURL(previewUrl)
  }, [imageFile])

  async function submit(event) {
    event.preventDefault(); setSaving(true); setError('')
    const values = Object.fromEntries(new FormData(event.currentTarget).entries())
    delete values.image
    values.featured = Boolean(values.featured)
    try { await onSave(values, imageFile, removeImage); onClose() } catch (err) {
      const staleEducationError = resource === 'education' && err.message === 'A title, role or name is required.'
      setError(staleEducationError ? 'The connected backend is out of date. Restart or redeploy Flask, then save this education entry again.' : err.message)
    } finally { setSaving(false) }
  }
  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <div className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="modal-header"><div><p className="eyebrow">CONTENT EDITOR / {resource}</p><h2 id="modal-title">{initial?.id ? 'Edit' : 'Add'} {config.singular}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close"><X size={18} /></button></div>
      <form onSubmit={submit}><div className="modal-fields">{config.fields.map(([name, label, type, required, options]) => <label className={type === 'textarea' || type === 'image' ? 'field-wide' : ''} key={name}>{label}{type === 'textarea' ? <textarea name={name} defaultValue={initial?.[name] || ''} rows="4" /> : type === 'checkbox' ? <span className="checkbox-wrap"><input name={name} type="checkbox" defaultChecked={Boolean(initial?.[name])} /> Show this project in featured work</span> : type === 'image' ? <><input name={name} type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => { setImageFile(event.target.files?.[0] || null); setRemoveImage(false) }} />{imagePreview && <div className="screenshot-preview"><img src={imagePreview} alt="Selected project screenshot preview" /><button type="button" className="button-quiet" onClick={() => { setImageFile(null); setImagePreview(''); setRemoveImage(true) }}>Remove screenshot</button></div>}<small className="field-hint">Choose a PNG, JPG, or WebP screenshot (up to 8 MB).</small></> : type === 'select' ? <select name={name} required={required} defaultValue={initial?.[name] ? projectCategoryLabel(initial[name]) : (options?.[0]?.label || '')}>{options?.map((option) => <option key={option.id} value={option.label}>{option.label}</option>)}</select> : <input name={name} type={type} required={required} defaultValue={name === 'stack' ? (initial?.[name] || []).join(', ') : initial?.[name] || ''} />}</label>)}</div>{error && <div className="admin-error">{error}</div>}<div className="modal-actions"><button type="button" className="button-quiet" onClick={onClose}>Cancel</button><button className="button-primary" disabled={saving}>{saving ? <LoaderCircle className="spin" size={16} /> : <>{initial?.id ? 'Save changes' : `Add ${config.singular}`} <ArrowUpRight size={15} /></>}</button></div></form>
    </div>
  </div>
}

