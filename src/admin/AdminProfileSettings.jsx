import { ArrowDownRight, ArrowUpRight, Check, LoaderCircle } from 'lucide-react'
import { RESUME_URL } from '../api/client.js'
import { profileFields } from './resourceConfig.js'

export default function AdminProfileSettings({ content, resumeAvailable, uploadingResume, onSaveProfile, onUploadResume }) {
  return <>
    <div className="admin-page-heading">
      <div><p className="eyebrow">YOUR INTRODUCTION</p><h1>Profile settings</h1><p>Keep your professional introduction current.</p></div>
    </div>

    <form className="admin-panel profile-editor" onSubmit={onSaveProfile}>
      <div className="panel-heading"><div><p className="eyebrow">PUBLIC PROFILE</p><h2>Personal details</h2></div></div>
      <div className="profile-fields">
        {profileFields.map(([name, label, type]) => <label className={type === 'textarea' ? 'field-wide' : ''} key={name}>
          {label}{type === 'textarea'
            ? <textarea rows="5" name={name} defaultValue={content.profile[name] || ''} />
            : <input name={name} type={type} defaultValue={content.profile[name] || ''} />}
        </label>)}
      </div>
      <button className="button-primary">Save profile <Check size={15} /></button>
    </form>

    <form className="admin-panel resume-editor" onSubmit={onUploadResume}>
      <div className="panel-heading">
        <div><p className="eyebrow">RÉSUMÉ / PDF</p><h2>Manage your résumé</h2></div>
        {resumeAvailable && <a className="button-quiet" href={RESUME_URL}>Download current résumé <ArrowDownRight size={14} /></a>}
      </div>
      <p className="resume-help">{resumeAvailable ? 'A résumé is currently available on your portfolio.' : 'No résumé has been uploaded yet.'} Upload a PDF file up to 8 MB to add or replace it.</p>
      <label>Résumé file<input type="file" name="resume" accept="application/pdf,.pdf" required /></label>
      <button className="button-primary" disabled={uploadingResume}>
        {uploadingResume ? <LoaderCircle className="spin" size={16} /> : <>Upload résumé <ArrowUpRight size={15} /></>}
      </button>
    </form>
  </>
}
