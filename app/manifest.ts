import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const pageInfo = await client.fetch(`*[_type == "pageInfo"][0]`, {}, {
    next: { revalidate: 3600 }
  })
  const baseImage = pageInfo?.profilePic || pageInfo?.heroImage

  return {
    name: pageInfo?.name || 'Usama Portfolio',
    short_name: 'Portfolio',
    description: pageInfo?.backgroundInformation?.slice(0, 160) || 'Full Stack Developer Portfolio',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#0f172a',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
      // Using Sanity URLs directly for PWA icons to ensure they always exist and are sharp
      {
        src: baseImage ? urlFor(baseImage).width(192).height(192).url() : '/profile-img.jpeg',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: baseImage ? urlFor(baseImage).width(512).height(512).url() : '/profile-img.jpeg',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
