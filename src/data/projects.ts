import type { Project, ProjectCategory } from '../types'

export const PROJECTS_KEY = 'admin_projects'

export const projectFilters: { label: string; value: ProjectCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Web', value: 'web' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'Design', value: 'design' },
]

export const projects: Project[] = [
  {
    id: '1',
    title: 'Aurora Dashboard',
    description:
      'Developed an interactive web platform to help students report, search, and recover lost items on campus.',
    category: 'web',
    image: 'linear-gradient(135deg, #1a0000 0%, #E10600 40%, #0a0a0a 100%)',
    tech: ['React', 'TypeScript', 'Tailwind',],
    liveUrl: '#',
    githubUrl: 'https://github.com/Nigel777123/Campus_Reconnect',
    performance: 80,
  },
  {
    id: '2',
    title: 'Crowd Sense',
    description:
      'A crowd density monitoring app for large events, providing real-time updates and safe navigation',
    category: 'mobile',
    image: 'linear-gradient(135deg, #0a0a0a 0%, #d4ff00 35%, #1a1a1a 100%)',
    tech: ['React Native', 'Expo', 'SQLite'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Nigel777123/Crowd_Sense',
    performance: 91,
  },
  {
    id: '3',
    title: 'American Sign Language (ASL) Detector',
    description:
      '',
    category: 'design',
    image: 'linear-gradient(135deg, #0a0a0a 0%, #333 50%, #E10600 100%)',
    tech: ['Figma', 'Storybook', 'CSS Variables'],
    liveUrl: '#',
    githubUrl: '#',
    performance: 94,
  },
  {
    id: '4',
    title: 'Orbit Commerce',
    description:
      'Headless storefront with edge caching, animated product galleries, and Stripe checkout.',
    category: 'web',
    image: 'linear-gradient(135deg, #0f0f0f 0%, #E10600 50%, #d4ff00 100%)',
    tech: ['Next.js', 'Vercel', 'Stripe', 'Sanity'],
    liveUrl: '#',
    githubUrl: '#',
    performance: 98,
  },
]

export function getProjects(): Project[] {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY)
    if (raw) return JSON.parse(raw) as Project[]
  } catch {
    // ignore
  }
  return projects
}
