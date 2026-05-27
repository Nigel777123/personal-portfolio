import type { ExperienceItem } from '../types'

export const experience: ExperienceItem[] = [
  {
    id: '1',
    role: 'Technical Representative',
    company: 'Fr.Crce STUCO',
    period: '2026 — Present',
    lap: 'Lap 42',
    summary: 'High performance web applications and digital infrastructure to scale campus event ecosystems.',
    details: [
      'Engineered responsive, component-driven web interfaces using React.js and TypeScript, achieving 30% faster load times',
      'Utilized modern CSS-in-JS / Tailwind frameworks to ensure fluid, cross-browser responsiveness and accessibility standards across mobile and desktop viewports.',
      'Utilized LLMs and advanced prompt engineering to rapidly generate clean boilerplate, complex logic blocks, and UI components.',
    ],
  },
  {
    id: '3',
    role: 'AV Tech',
    company: 'Pixel & Co.',
    period: '2024 — Present',
    lap: 'Lap 28',
    summary: 'Managed audio-visual technical setup for various events',
    details: [
      'Managed live audio-visual routing, stage setups, and power distribution systems for high pressure events',
      'Coordinated on-ground crowd management protocols ensuring seamless, zero-delay.',
      'Optimized video streaming performance across multiple platforms.'
    ],
  },
  {
    id: '2',
    role: 'Cross-Functional',
    company: 'IEEE CRCE',
    period: '2025-2026',
    lap: 'Lap 12',
    summary: 'Synergized operations,logistics, and public relations strategies to scale engagement and execute the national-level project Competition, Prakalp.',
    details: [
      'Managed end-to-end on-ground operations for Prakalp, coordinating the physical layout, project booth allocations, and staging schedules for multiple competing teams simultaneously.',
      'Coordinated on-ground crowd management protocols ensuring seamless, zero-delay.',
      'Managed public relations and outreach campaigns to increase visibility and engagement.',
    ],
  },
]
