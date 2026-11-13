import { useMemo } from 'react'
import { ArrowUpRight, Code2, Database, Globe2, Layers3, Sparkles } from 'lucide-react'

const skillIcons = { Frontend: Code2, 'Backend & data': Database, Geospatial: Globe2, Data: Layers3 }
export function Skills({ skills }) {
  const groups = useMemo(() => skills.reduce((all, skill) => {
    const group = skill.category || 'Other'
    all[group] = [...(all[group] || []), skill]
    return all
  }, {}), [skills])
  return (
    <div className="skill-groups">
      {Object.entries(groups).map(([group, entries], i) => {
        const Icon = skillIcons[group] || Sparkles
        return <article className="skill-group" key={group}>
          <div className="skill-group-head"><span className="skill-icon"><Icon size={18} /></span><span>0{i + 1}</span></div>
          <h3>{group}</h3>
          <div className="skill-list">{entries.map((item) => <span key={item.id || item.name}>{item.name}<ArrowUpRight size={12} /></span>)}</div>
        </article>
      })}
    </div>
  )
}

