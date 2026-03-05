import createMDX from '@next/mdx'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

const withMDX = createMDX({
  // Append the default MDX options
  options: {
    rehypePlugins: [rehypeHighlight],
    remarkPlugins: [remarkGfm],
  },
  // Extend the Webpack config to support MDX
  extension: /\.mdx?$/,
})

// Merge the MDX config with the Next.js config
export default withMDX(nextConfig)
