import { useState } from 'react'
import { ArrowLeft, ArrowRight, LoaderCircle, LockKeyhole } from 'lucide-react'
import { request } from '../api/client.js'

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  async function submit(event) {
    event.preventDefault(); setLoading(true); setError('')
    try { const result = await request('/admin/login', { method: 'POST', body: JSON.stringify({ password }) }); onLogin(result.token) }
    catch (err) { setError(err.message) } finally { setLoading(false) }
  }
  return <div className="admin-login-page"><a href="/" className="login-back"><ArrowLeft size={15} /> Back to portfolio</a><div className="login-card"><span className="login-lock"><LockKeyhole size={21} /></span><p className="eyebrow">PRIVATE WORKSPACE / 01</p><h1>Welcome back.</h1><p>Sign in to manage your portfolio.</p><form onSubmit={submit}><label>Admin password<input autoFocus type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" required /></label>{error && <div className="admin-error">{error}</div>}<button className="button-primary" disabled={loading}>{loading ? <LoaderCircle className="spin" size={16} /> : <>Open dashboard <ArrowRight size={15} /></>}</button></form><small>Set ADMIN_PASSWORD in your backend environment.</small></div><div className="login-grid" /></div>
}

