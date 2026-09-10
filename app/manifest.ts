import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'STOMRIM Invoice App',
    short_name: 'STOMRIM',
    description: 'Generate clean, tax-compliant invoices instantly',
    start_url: '/',
    display: 'standalone', // This is the crucial setting that makes it "downloadable"
    orientation: 'portrait',
    background_color: '#f7f6f2',
    theme_color: '#535759',
    icons: [
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
    ],
  }
}