import dynamic from 'next/dynamic';

// Import dynamique du composant client pour éviter les erreurs SSR
const HomePageClient = dynamic(() => import('../components/HomePageClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-lg">Chargement de WebCraft...</p>
      </div>
    </div>
  )
});

export default function HomePage() {
  return <HomePageClient />;
}