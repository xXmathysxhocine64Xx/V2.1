import "./globals.css";
import Navigation from "../components/Navigation";
import BottomNavigation from "../components/BottomNavigation";
import { ThemeProvider } from "../contexts/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";

export const metadata = {
  title: "WebCraft - Création de Sites Web Modernes | Développement Web Professionnel",
  description: "WebCraft crée des sites web modernes, performants et sur mesure. Développement web professionnel, design responsive, optimisation SEO. Devis gratuit en 24h.",
  keywords: "création site web, développement web, site responsive, design moderne, SEO, Next.js, React, webcraft, agence web",
  authors: [{ name: "WebCraft" }],
  creator: "WebCraft",
  publisher: "WebCraft",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "WebCraft - Création de Sites Web Modernes",
    description: "Sites web professionnels sur mesure avec WebCraft. Design moderne, performance optimisée, devis gratuit.",
    url: 'https://webcraft.fr',
    siteName: 'WebCraft',
    type: 'website',
    locale: 'fr_FR',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WebCraft - Création de Sites Web Modernes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebCraft - Sites Web Modernes',
    description: 'Création de sites web professionnels et performants',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    // Préchargement des ressources critiques
    'dns-prefetch': 'https://fonts.googleapis.com',
    'preconnect': 'https://fonts.gstatic.com',
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="antialiased bg-theme text-theme">
        <ThemeProvider>
          <Navigation />
          <ThemeToggle />
          <main className="pt-16 pb-20 md:pb-0 bg-theme min-h-screen relative overflow-x-hidden">
            {children}
          </main>
          <BottomNavigation />
        </ThemeProvider>
      </body>
    </html>
  );
}