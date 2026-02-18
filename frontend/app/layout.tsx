import "./globals.css";
import { HeadMeta } from './components/HeadMeta'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="overflow-x-hidden">
      <HeadMeta
        title="Futebol ao Vivo - Assista sem travar"
        description="Assista futebol ao vivo online com qualidade HD e acesso imediato."
        imageUrl="https://www.futebollaovivo.online/og-image.jpg"
        url="https://www.futebollaovivo.online/"
      />
      <body className="overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}

