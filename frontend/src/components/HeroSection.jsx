import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Code, Palette, Zap } from 'lucide-react';

const HeroSection = () => {
  const [typedTexts, setTypedTexts] = useState({});
  const [currentLines, setCurrentLines] = useState({});

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const codeSnippets = [
    {
      id: 'html',
      language: 'HTML',
      code: `<div class="hero-section">
  <h1>Site Web Moderne</h1>
  <p>Interface responsive</p>
</div>`,
      position: 'left-top',
      delay: 0
    },
    {
      id: 'css',
      language: 'CSS',
      code: `.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 60px 0;
  text-align: center;
}`,
      position: 'right-top',
      delay: 1000
    },
    {
      id: 'javascript',
      language: 'JavaScript',
      code: `const createWebsite = () => {
  const site = new ModernWebsite();
  site.addResponsiveDesign();
  site.optimizePerformance();
  return site;
};`,
      position: 'left-middle',
      delay: 2000
    },
    {
      id: 'react',
      language: 'React',
      code: `const WebsiteComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <div className="website-container">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};`,
      position: 'right-middle',
      delay: 3000
    }
  ];

  const backgroundCodeLines = [
    "import React from 'react';",
    "const WebDev = () => {",
    "  return (",
    "    <div className='container'>",
    "      <h1>Professional Website</h1>",
    "    </div>",
    "  );",
    "};",
    "export default WebDev;",
    "",
    "/* CSS Styles */",
    ".container {",
    "  max-width: 1200px;",
    "  margin: 0 auto;",
    "  padding: 2rem;",
    "}",
    "",
    "function initializeWebsite() {",
    "  const config = {",
    "    responsive: true,",
    "    modern: true,",
    "    optimized: true",
    "  };",
    "  return new Website(config);",
    "}",
    "",
    "<div className='hero-banner'>",
    "  <h1>Innovative Design</h1>",
    "  <p>Next-gen solutions</p>",
    "</div>",
    "",
    ".hero-banner {",
    "  background: linear-gradient(45deg, #3b82f6, #1e40af);",
    "  color: white;",
    "  text-align: center;",
    "}"
  ];

  const typeWriter = (text, snippetId, delay = 0) => {
    setTimeout(() => {
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          setTypedTexts(prev => ({
            ...prev,
            [snippetId]: text.substring(0, i + 1)
          }));
          i++;
        } else {
          clearInterval(timer);
          setTimeout(() => {
            setCurrentLines(prev => ({
              ...prev,
              [snippetId]: false
            }));
          }, 1000);
        }
      }, 30);
    }, delay);
  };

  useEffect(() => {
    codeSnippets.forEach(snippet => {
      setCurrentLines(prev => ({
        ...prev,
        [snippet.id]: true
      }));
      typeWriter(snippet.code, snippet.id, snippet.delay);
    });
  }, []);

  return (
    <section id="accueil" className="min-h-screen relative overflow-hidden">
      {/* Nouveau Background moderne avec effet de verre */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        {/* Formes géométriques animées */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute -bottom-8 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
        
        {/* Grille discrète */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-grid-pattern"></div>
        </div>
        
        {/* Points flottants simplifiés */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full animate-pulse opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${3 + Math.random() * 4}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Éléments décoratifs modernes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Icônes technologiques flottantes */}
        <div className="absolute top-32 left-8 bg-white/10 backdrop-blur-sm rounded-lg p-4 animate-float opacity-80">
          <Code className="h-8 w-8 text-blue-400" />
        </div>
        <div className="absolute top-48 right-12 bg-white/10 backdrop-blur-sm rounded-lg p-4 animate-float opacity-80" style={{animationDelay: '1s'}}>
          <Palette className="h-8 w-8 text-purple-400" />
        </div>
        <div className="absolute top-80 left-16 bg-white/10 backdrop-blur-sm rounded-lg p-4 animate-float opacity-80" style={{animationDelay: '2s'}}>
          <Zap className="h-8 w-8 text-pink-400" />
        </div>
        
        {/* Badge technologique */}
        <div className="absolute top-24 right-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full px-6 py-2 border border-white/20 animate-pulse">
          <span className="text-white text-sm font-semibold">Next.js • React • TailwindCSS</span>
        </div>
      </div>

      {/* Contenu principal moderne */}
      <div className="relative z-10 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge d'introduction */}
            <div className="animate-fade-in-up mb-8">
              <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 text-sm text-white/90 font-medium">
                ✨ Votre partenaire digital de confiance
              </span>
            </div>

            {/* Titre principal redessiné */}
            <div className="animate-fade-in-up animation-delay-200">
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                <span className="block text-white mb-2">Créons</span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  l'excellence
                </span>
                <span className="block text-white">ensemble</span>
              </h1>
            </div>

            {/* Sous-titre simplifié */}
            <div className="animate-fade-in-up animation-delay-400">
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
                Développement de sites web modernes, performants et sur mesure pour <br />
                <span className="text-blue-400 font-medium">propulser votre entreprise vers le succès digital</span>
              </p>
            </div>

            {/* Boutons d'action redessinés */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 animate-fade-in-up animation-delay-400">
              <Button 
                onClick={scrollToContact}
                size="lg"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-0 rounded-2xl font-semibold"
              >
                Démarrer mon projet
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                onClick={scrollToPortfolio}
                variant="outline"
                size="lg"
                className="group border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50 px-10 py-5 text-lg transition-all duration-300 transform hover:scale-105 rounded-2xl font-semibold"
              >
                Voir nos créations
                <Code className="ml-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
              </Button>
            </div>

            {/* Services grid modernisé */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto animate-fade-in-up animation-delay-400">
              {/* Service 1 - Développement */}
              <div className="group bg-white/5 backdrop-blur-md p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 border border-white/10 hover:border-white/20 hover:bg-white/10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Code className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">Développement Premium</h3>
                <p className="text-gray-300 group-hover:text-gray-200 leading-relaxed text-lg">
                  Création de sites web uniques et performants, adaptés à vos besoins spécifiques avec les dernières technologies.
                </p>
                <div className="mt-6 flex items-center text-blue-400 font-medium">
                  <span>En savoir plus</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>

              {/* Service 2 - Design */}
              <div className="group bg-white/5 backdrop-blur-md p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 border border-white/10 hover:border-white/20 hover:bg-white/10">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Palette className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">Design Moderne</h3>
                <p className="text-gray-300 group-hover:text-gray-200 leading-relaxed text-lg">
                  Interface utilisateur élégante et intuitive, optimisée pour l'expérience utilisateur et la conversion.
                </p>
                <div className="mt-6 flex items-center text-purple-400 font-medium">
                  <span>En savoir plus</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>

              {/* Service 3 - Performance */}
              <div className="group bg-white/5 backdrop-blur-md p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 border border-white/10 hover:border-white/20 hover:bg-white/10">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-300 transition-colors">Performance Optimale</h3>
                <p className="text-gray-300 group-hover:text-gray-200 leading-relaxed text-lg">
                  Sites ultra-rapides, sécurisés et optimisés SEO pour un référencement exceptionnel sur Google.
                </p>
                <div className="mt-6 flex items-center text-green-400 font-medium">
                  <span>En savoir plus</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;