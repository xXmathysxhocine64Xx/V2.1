import "./globals.css";
import Navigation from "../components/Navigation";
import BottomNavigation from "../components/BottomNavigation";
import { ThemeProvider } from "../contexts/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";

export const metadata = {
  title: "WebCraft - Site Web Moderne",
  description: "Création de sites web modernes et performants avec WebCraft",
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
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
          <main className="pt-0 md:pt-16 pb-20 md:pb-0 bg-theme min-h-screen relative overflow-x-hidden">
            {children}
          </main>
          <BottomNavigation />
        </ThemeProvider>
      </body>
    </html>
  );
}