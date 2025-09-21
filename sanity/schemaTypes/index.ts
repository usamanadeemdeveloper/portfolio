import { type SchemaTypeDefinition } from 'sanity'
import { pageInfo } from './pageInfo'
import { skills } from './skills'
import { experience } from './experience'
import { socials } from './socials'
import { projects } from './projects'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pageInfo, skills, experience, socials, projects],
}
