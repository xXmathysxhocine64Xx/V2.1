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
          // Supprimer le curseur après l'animation
          setTimeout(() => {
            setCurrentLines(prev => ({
              ...prev,
              [snippetId]: false
            }));
          }, 1000);
        }
      }, 30); // Vitesse de frappe (30ms par caractère)
    }, delay);
  };

  useEffect(() => {
    // Démarrer les animations de typewriter pour chaque snippet
    codeSnippets.forEach(snippet => {
      setCurrentLines(prev => ({
        ...prev,
        [snippet.id]: true
      }));
      typeWriter(snippet.code, snippet.id, snippet.delay);
    });
  }, []);

  return (
    <section id="accueil" className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-16 relative overflow-hidden">
      {/* Code snippets flottants avec animation typewriter */}
      <div className="absolute inset-0 pointer-events-none">
        {codeSnippets.map((snippet, index) => (
          <div
            key={index}
            className={`absolute ${
              snippet.position === 'left-top' ? 'left-8 top-32' :
              snippet.position === 'right-top' ? 'right-8 top-48' :
              snippet.position === 'left-middle' ? 'left-12 top-96' :
              'right-12 top-80'
            } hidden xl:block`}
          >
            <div className="bg-gray-900 rounded-lg p-4 shadow-2xl max-w-xs animate-float opacity-90 hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-blue-400 font-semibold">{snippet.language}</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <pre className="text-xs text-gray-300 overflow-hidden whitespace-pre-wrap">
                <code className="font-mono">
                  {typedTexts[snippet.id] || ''}
                  {currentLines[snippet.id] && <span className="typing-cursor">|</span>}
                </code>
              </pre>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Créons ensemble votre
              <span className="text-blue-600 block mt-2">site web parfait</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Nous concevons et développons des sites web modernes, performants et sur mesure pour propulser votre entreprise vers le succès digital.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up animation-delay-200">
            <Button 
              onClick={scrollToContact}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
            >
              Demander un devis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              onClick={scrollToPortfolio}
              variant="outline"
              size="lg"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg transition-all duration-200 transform hover:scale-105"
            >
              Voir nos réalisations
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up animation-delay-400">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Code className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Développement sur mesure</h3>
              <p className="text-gray-600 leading-relaxed">
                Création de sites web uniques adaptés à vos besoins spécifiques et à votre identité de marque.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Palette className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Refonte moderne</h3>
              <p className="text-gray-600 leading-relaxed">
                Modernisation de votre site existant avec les dernières technologies et tendances du web.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Performance optimisée</h3>
              <p className="text-gray-600 leading-relaxed">
                Sites rapides, sécurisés et optimisés pour les moteurs de recherche et l'expérience utilisateur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;