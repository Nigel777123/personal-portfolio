export type ProjectCategory = 'all' | 'web' | 'mobile' | 'design'

export interface Project {
  id: string
  title: string
  description: string
  category: Exclude<ProjectCategory, 'all'>
  image: string
  tech: string[]
  liveUrl: string
  githubUrl: string
}

export interface Skill {
  name: string
  level: number
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  period: string
  summary: string
  details: string[]
}

export interface NavLink {
  id: string
  label: string
  href: string
}

export interface SocialLink {
  name: string
  href: string
  icon: 'code' | 'network' | 'bird' | 'mail'
}
