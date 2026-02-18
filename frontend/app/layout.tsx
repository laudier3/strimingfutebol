import './globals.css'
import { Analytics } from "@vercel/analytics/next"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  <Analytics/>
  return (
    <html lang="pt-BR">
      <head>
        <title>Futebol ao Vivo - Assista sem travar</title>
        <meta name="description" content="Assista futebol ao vivo online com qualidade HD e acesso imediato." />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Futebol ao Vivo - Assista sem travar" />
        <meta property="og:description" content="Transmissão rápida, segura e em Full HD. Acesse agora." />
        <meta property="og:url" content="https://www.futebollaovivo.online/" />
        <meta property="og:site_name" content="Futebol ao Vivo" />
        <meta property="og:image" content="https://www.futebollaovivo.online/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Futebol ao Vivo - Assista sem travar" />
        <meta name="twitter:description" content="Transmissão esportiva oficial em Full HD." />
        <meta name="twitter:image" content="https://www.futebollaovivo.online/og-image.jpg" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
