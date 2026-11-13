import { BriefcaseBusiness, Code2, Layers3, ShieldCheck } from 'lucide-react'
import { PROJECT_CATEGORIES } from '../config/projectCategories.js'

export const resourceConfig = {
  projects: { label: 'Projects', singular: 'project', icon: Code2, fields: [['title', 'Project title', 'text', true], ['category', 'Category', 'select', true, PROJECT_CATEGORIES], ['description', 'Description', 'textarea'], ['stack', 'Tech stack (comma separated)', 'text'], ['image', 'Project screenshot', 'image'], ['github', 'GitHub URL', 'url'], ['demo', 'Live demo URL', 'url'], ['featured', 'Featured project', 'checkbox']] },
  experience: { label: 'Experience', singular: 'role', icon: BriefcaseBusiness, fields: [['period', 'Dates', 'text'], ['role', 'Role', 'text'], ['description', 'Description', 'textarea'], ['skills', 'Skills (comma separated)', 'text']] },
  education: { label: 'Education', singular: 'education entry', icon: ShieldCheck, fields: [['degree', 'Degree or certificate', 'text', true], ['institution', 'Institution name', 'text', true], ['period', 'Dates', 'text'], ['description', 'Description', 'textarea']] },
  certifications: { label: 'Certifications', singular: 'certification', icon: ShieldCheck, fields: [['title', 'Certification title', 'text'], ['issuer', 'Issuing organization', 'text'], ['date', 'Date earned', 'text'], ['credentialUrl', 'Credential URL', 'url'], ['description', 'Description', 'textarea']] },
  skills: { label: 'Skills', singular: 'skill', icon: Layers3, fields: [['name', 'Skill name', 'text'], ['category', 'Group / category', 'text']] },
}
export const profileFields = [
  ['name', 'Display name', 'text'], ['role', 'Professional title', 'text'], ['headline', 'Hero headline', 'text'], ['lead', 'Sidebar intro line', 'text'], ['about', 'About / sidebar biography', 'textarea'], ['location', 'Location', 'text'], ['availability', 'Availability', 'text'], ['email', 'Contact email', 'email'], ['github', 'GitHub URL', 'url'], ['linkedin', 'LinkedIn URL', 'url'],
]

