import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://usamanadeem.vercel.app'

  // Fetch all project slugs
  const projects = await client.fetch<Array<{ slug: { current: string }, _updatedAt: string }>>(
    `*[_type == "projects" && defined(slug.current)]{
      slug,
      _updatedAt
    }`
  )

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug.current}`,
    lastModified: project._updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projectUrls,
  ]
}
