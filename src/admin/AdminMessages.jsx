import { ArrowLeft, ArrowUpRight, Mail } from 'lucide-react'

export default function AdminMessages({ messages }) {
  return <>
    <div className="admin-page-heading">
      <div><p className="eyebrow">INBOX / CONTACT FORM</p><h1>Messages</h1><p>Messages submitted through your public portfolio.</p></div>
      <span className="message-total">{messages.length} total</span>
    </div>
    <section className="admin-panel messages-panel">
      {messages.length ? messages.map((message) => <article className="message-card" key={message.id}>
        <div className="message-avatar">{message.name.slice(0, 1).toUpperCase()}</div>
        <div className="message-body">
          <div className="message-heading">
            <h3>{message.name}</h3>
            <a href={`mailto:${message.email}`}>{message.email} <ArrowUpRight size={12} /></a>
            <time>{message.createdAt ? new Date(message.createdAt).toLocaleDateString() : 'Recently'}</time>
          </div>
          {message.subject && <h4>{message.subject}</h4>}
          <p>{message.message}</p>
          <a className="reply-link" href={`mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.subject || 'Your message'}`)}`}><ArrowLeft size={13} /> Reply by email</a>
        </div>
      </article>) : <div className="admin-empty">
        <div className="empty-orbit"><Mail size={21} /></div>
        <h3>Your inbox is clear</h3>
        <p>When someone uses your contact form, their message will show up here.</p>
      </div>}
    </section>
  </>
}
