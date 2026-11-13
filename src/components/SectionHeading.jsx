export function SectionHeading({ eyebrow, title, accent }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p><h2>{title}{accent && <> <em>{accent}</em></>}</h2>
    </div>
  )
}

