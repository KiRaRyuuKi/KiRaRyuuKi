import * as profile from './profile'
import * as about from './about'
import * as projects from './projects'
import * as skill from './skills'
import * as stats from './stats'
import * as experience from './experience'

export const sections = [profile, about, projects, skill, stats, experience] as const
export const sectionIds = sections.map((section) => section.id)

export function sectionAt(index: number): Section {
  return sections[index] ?? sections[0]
}

export type Section = (typeof sections)[number]
export type SectionId = Section['id']
