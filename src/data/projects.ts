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
    image: 'linear-gradient(135deg, #1a0000 0%, #E10600 40%, #0a0a0a 100%)',
    tech: ['React', 'TypeScript', 'Tailwind', 'Recharts'],
    liveUrl: '#',
    githubUrl: '#',
    performance: 96,
  },
  {
    id: '2',
    title: 'Pulse Mobile',
    description:
      'Cross-platform fitness companion with workout tracking, streaks, and offline-first sync.',
    category: 'mobile',
    image: 'linear-gradient(135deg, #0a0a0a 0%, #d4ff00 35%, #1a1a1a 100%)',
    tech: ['React Native', 'Expo', 'SQLite'],
    liveUrl: '#',
    githubUrl: '#',
    performance: 91,
  },
  {
    id: '3',
    title: 'Nebula Design System',
    description:
      'Accessible component library and Figma kit used across marketing and product surfaces.',
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
