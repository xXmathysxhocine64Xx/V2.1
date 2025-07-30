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

  const scrollToDemos = () => {
    const element = document.getElementById('demos');
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
      {/* Background moderne avec mesh gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Mesh gradient moderne */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-cyan-500/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-500/30 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        {/* Lignes décoratives statiques */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-px bg-gradient-to-r from-blue-500/50 to-transparent"></div>
          <div className="absolute top-40 right-20 w-48 h-px bg-gradient-to-l from-purple-500/50 to-transparent"></div>
          <div className="absolute bottom-32 left-20 w-56 h-px bg-gradient-to-r from-pink-500/50 to-transparent"></div>
        </div>
      </div>

      {/* Navigation flottante moderne */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <nav className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-8 py-4">
          <div className="flex items-center space-x-8">
            <div className="text-white font-bold text-xl">WebCraft</div>
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <a href="#services" className="text-white/80 hover:text-white transition-colors">Services</a>
              <a href="#portfolio" className="text-white/80 hover:text-white transition-colors">Portfolio</a>
              <a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </nav>
      </div>

      {/* Éléments décoratifs statiques */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Cards flottantes statiques */}
        <div className="absolute top-32 left-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-xs">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Code className="h-4 w-4 text-white" />
            </div>
            <span className="text-white font-semibold">React & Next.js</span>
          </div>
          <p className="text-gray-300 text-sm">Développement moderne avec les meilleures technologies</p>
        </div>
        
        <div className="absolute top-48 right-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-xs">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <Palette className="h-4 w-4 text-white" />
            </div>
            <span className="text-white font-semibold">Design UI/UX</span>
          </div>
          <p className="text-gray-300 text-sm">Interface élégante et expérience utilisateur optimale</p>
        </div>

        <div className="absolute bottom-32 left-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-xs">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-white font-semibold">Performance</span>
          </div>
          <p className="text-gray-300 text-sm">Sites ultra-rapides et optimisés SEO</p>
        </div>
      </div>

      {/* Contenu principal totalement repensé */}
      <div className="relative z-10 pt-40 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Hero Title */}
            <div className="mb-12">
              <h1 className="text-7xl md:text-9xl font-black mb-6 leading-none">
                <span className="block text-white mb-4">WEB</span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  CRAFT
                </span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>

            {/* Slogan */}
            <div className="mb-16">
              <p className="text-2xl md:text-3xl text-white font-light mb-4 leading-relaxed">
                Créateur d'expériences digitales
              </p>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Nous concevons et développons des sites web exceptionnels qui transforment vos idées en succès digital mesurable
              </p>
            </div>

            {/* CTA Section */}
            <div className="mb-20">
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                <Button 
                  onClick={scrollToContact}
                  size="lg"
                  className="group bg-white text-gray-900 hover:bg-gray-100 px-12 py-6 text-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl rounded-2xl"
                >
                  Commencer maintenant
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </Button>
                <Button 
                  onClick={scrollToPortfolio}
                  variant="outline"
                  size="lg"
                  className="group border-2 border-white text-white hover:bg-white hover:text-gray-900 px-12 py-6 text-xl font-bold transition-all duration-300 transform hover:scale-105 rounded-2xl"
                >
                  Nos réalisations
                </Button>
              </div>
              
              {/* Stats */}
              <div className="flex justify-center items-center space-x-12 text-center">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">500+</div>
                  <div className="text-gray-400 text-sm">Projets réalisés</div>
                </div>
                <div className="w-px h-12 bg-gray-600"></div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">98%</div>
                  <div className="text-gray-400 text-sm">Clients satisfaits</div>
                </div>
                <div className="w-px h-12 bg-gray-600"></div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">5j</div>
                  <div className="text-gray-400 text-sm">Délai moyen</div>
                </div>
              </div>
            </div>

            {/* Services en format horizontal */}
            <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-sm hover:bg-white/10 transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Code className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Développement</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Sites web sur mesure avec React, Next.js et les dernières technologies
                  </p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-sm hover:bg-white/10 transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Palette className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Design UX/UI</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Interface moderne et intuitive optimisée pour la conversion
                  </p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-sm hover:bg-white/10 transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Performance</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Optimisation SEO et vitesse pour un référencement excellent
                  </p>
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