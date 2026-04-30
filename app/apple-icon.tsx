import { ImageResponse } from 'next/og'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

export const runtime = 'edge'

export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default async function Icon() {
  const pageInfo = await client.fetch(`*[_type == "pageInfo"][0]`, {}, {
    next: { revalidate: 3600 }
  })
  const baseImage = pageInfo?.profilePic || pageInfo?.heroImage

  if (!baseImage) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 80,
            background: '#0f172a',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            borderRadius: '50%',
          }}
        >
          {pageInfo?.name?.charAt(0) || 'U'}
        </div>
      ),
      { ...size }
    )
  }

  const imageUrl = urlFor(baseImage).width(360).height(360).fit('crop').url()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            borderRadius: '50%',
            overflow: 'hidden',
          }}
        >
          <img
            src={imageUrl}
            width="180"
            height="180"
            style={{
              objectFit: 'cover',
              borderRadius: '50%',
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  )
}

