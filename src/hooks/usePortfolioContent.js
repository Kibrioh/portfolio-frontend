import { useEffect, useState } from 'react'
import { request } from '../api/client.js'
import { initialContent } from '../data/initialContent.js'

export function usePortfolioContent() {
  const [content, setContent] = useState(initialContent)
  const [apiOnline, setApiOnline] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    request('/content')
      .then((data) => {
        setContent((current) => ({
          ...current,
          ...data,
          profile: { ...current.profile, ...data.profile },
        }))
        setApiOnline(true)
      })
      .catch(() => setApiOnline(false))
      .finally(() => setLoading(false))
  }, [])

  return { content, apiOnline, loading }
}
