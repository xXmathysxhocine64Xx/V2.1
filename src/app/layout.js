import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'WebCraft - Créateur d\'expériences digitales',
  description: 'WebCraft - Nous concevons des univers web qui transforment votre vision en réalité numérique époustouflante. Création de sites web modernes et performants.',
  keywords: 'WebCraft, création site web, développement web, design UI/UX, Next.js, React',
  authors: [{ name: 'WebCraft Studio' }],
  openGraph: {
    title: 'WebCraft - Créateur d\'expériences digitales',
    description: 'Nous concevons des univers web qui transforment votre vision en réalité numérique époustouflante.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebCraft - Créateur d\'expériences digitales',
    description: 'Nous concevons des univers web qui transforment votre vision en réalité numérique époustouflante.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}