import './App.css'
import AdminApp from './admin/AdminApp.jsx'
import ProjectArchivePage from './pages/ProjectArchivePage.jsx'
import ProjectWalkthroughPage from './pages/ProjectWalkthroughPage.jsx'
import Portfolio from './pages/PortfolioPage.jsx'

export default function App() {
  if (window.location.pathname.startsWith('/admin')) return <AdminApp />
  if (window.location.pathname.startsWith('/demo/')) return <ProjectWalkthroughPage />
  if (window.location.pathname.startsWith('/projects')) return <ProjectArchivePage />
  return <Portfolio />
}
