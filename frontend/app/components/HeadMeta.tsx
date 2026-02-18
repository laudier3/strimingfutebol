'use client'

import Head from 'next/head'

interface HeadMetaProps {
  title: string
  description: string
  imageUrl: string
  url: string
}

export const HeadMeta = ({ title, description, imageUrl, url }: HeadMetaProps) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    <meta property="og:site_name" content="Futebol ao Vivo" />
    <meta property="og:image" content={imageUrl} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={imageUrl} />

    {/* Favicon */}
    <link rel="icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/apple-icon.png" />
  </Head>
)
