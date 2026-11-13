const API_BASE = import.meta.env.VITE_API_URL || ''
export const RESUME_URL = `${API_BASE.replace(/\/$/, '')}/api/resume`

export async function request(path, options = {}, token) {
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData
  const headers = { ...(options.body && !isFormData ? { 'Content-Type': 'application/json' } : {}), ...options.headers }
  if (token) headers.Authorization = `Bearer ${token}`
  const response = await fetch(`${API_BASE}/api${path}`, { ...options, headers })
  const body = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(body.error || `Request failed (${response.status})`)
  return body
}

export function projectImageSource(image) {
  if (!image || /^(https?:|data:|blob:)/i.test(image)) return image
  return `${API_BASE.replace(/\/$/, '')}${image.startsWith('/') ? image : `/${image}`}`
}

