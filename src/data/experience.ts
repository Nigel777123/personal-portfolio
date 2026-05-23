import type { ExperienceItem } from '../types'

export const experience: ExperienceItem[] = [
  {
    id: '1',
    role: 'Senior Frontend Engineer',
    company: 'Lumina Labs',
    period: '2023 — Present',
    summary: 'Lead UI architecture for a B2B SaaS platform serving 50k+ users.',
    details: [
      'Shipped a design-system migration that cut UI debt by 40% and improved Lighthouse scores.',
      'Mentored a team of four engineers on accessibility, performance budgets, and animation patterns.',
      'Introduced feature flags and incremental rollout for high-risk customer-facing releases.',
    ],
  },
  {
    id: '2',
    role: 'Frontend Developer',
    company: 'Pixel & Co.',
    period: '2021 — 2023',
    summary: 'Built marketing sites and product dashboards for agency clients.',
    details: [
      'Delivered 12+ responsive launches with Framer Motion micro-interactions and CMS integrations.',
      'Established component libraries in React and Vue to speed up repeat engagements.',
      'Collaborated with designers on motion specs and interactive prototypes in Figma.',
    ],
  },
  {
    id: '3',
    role: 'Junior Web Developer',
    company: 'Startline Studio',
    period: '2019 — 2021',
    summary: 'First role shipping production React apps and learning modern CSS.',
    details: [
      'Converted legacy jQuery pages to React SPAs with improved Core Web Vitals.',
      'Implemented form flows, API integrations, and unit tests with Jest and Testing Library.',
      'Contributed to internal documentation and onboarding workshops for new hires.',
    ],
  },
]
