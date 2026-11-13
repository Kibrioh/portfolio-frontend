import { useEffect, useState } from 'react'

export function useProjectCategoryHighlight(projects) {
  const [activeCategory, setActiveCategory] = useState('')

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const nav = document.querySelector('.project-category-nav')
        const container = document.querySelector('.project-categories')
        if (!nav || !container) return setActiveCategory('')
        const navBounds = nav.getBoundingClientRect()
        const headerBottom = document.querySelector('.site-header')?.getBoundingClientRect().bottom || 0
        const markerY = (navBounds.height ? navBounds.bottom : headerBottom) + 8
        const containerBounds = container.getBoundingClientRect()
        if (markerY < containerBounds.top || markerY > containerBounds.bottom) return setActiveCategory('')

        const sections = [...container.querySelectorAll('.project-category')]
        const current = sections.find((section) => {
          const bounds = section.getBoundingClientRect()
          return bounds.top <= markerY && bounds.bottom > markerY
        }) || [...sections].reverse().find((section) => section.getBoundingClientRect().top <= markerY)
        setActiveCategory(current?.id.replace('projects-', '') || '')
      })
    }

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [projects])

  return [activeCategory, setActiveCategory]
}

