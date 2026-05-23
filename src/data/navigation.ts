import type { NavLink } from '../types'

export const sectionGearMap: Record<string, number> = {
  home: 1,
  about: 3,
  projects: 5,
  experience: 6,
  contact: 8,
}

export const navLinks: (NavLink & { gear: number })[] = [
  { id: 'home', label: 'Home', href: '#home', gear: 1 },
  { id: 'about', label: 'About', href: '#about', gear: 3 },
  { id: 'projects', label: 'Projects', href: '#projects', gear: 5 },
  { id: 'experience', label: 'Experience', href: '#experience', gear: 6 },
  { id: 'contact', label: 'Contact', href: '#contact', gear: 8 },
]

export const sectionIds = navLinks.map((link) => link.id)
