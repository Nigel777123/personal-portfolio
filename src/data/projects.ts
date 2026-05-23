import type { Project, ProjectCategory } from '../types'

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
      'Real-time analytics dashboard with customizable widgets, dark mode, and role-based access for product teams.',
    category: 'web',
    image: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #0e7490 100%)',
    tech: ['React', 'TypeScript', 'Tailwind', 'Recharts'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: '2',
    title: 'Pulse Mobile',
    description:
      'Cross-platform fitness companion with workout tracking, streaks, and offline-first sync.',
    category: 'mobile',
    image: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 40%, #059669 100%)',
    tech: ['React Native', 'Expo', 'SQLite'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: '3',
    title: 'Nebula Design System',
    description:
      'Accessible component library and Figma kit used across marketing and product surfaces.',
    category: 'design',
    image: 'linear-gradient(135deg, #18181b 0%, #6366f1 50%, #22d3ee 100%)',
    tech: ['Figma', 'Storybook', 'CSS Variables'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: '4',
    title: 'Orbit Commerce',
    description:
      'Headless storefront with edge caching, animated product galleries, and Stripe checkout.',
    category: 'web',
    image: 'linear-gradient(135deg, #0f172a 0%, #334155 50%, #8b5cf6 100%)',
    tech: ['Next.js', 'Vercel', 'Stripe', 'Sanity'],
    liveUrl: '#',
    githubUrl: '#',
  },
]
