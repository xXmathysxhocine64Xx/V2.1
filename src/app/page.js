'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { ArrowRight, Code, Palette, Zap, Mail, MapPin, Server, Globe, Shield, Phone, Clock, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Métadonnées SEO optimisées pour la page d'accueil
export const metadata = {
  title: "WebCraft - Création de Sites Web Modernes | Développement Web Professionnel",
  description: "WebCraft crée des sites web modernes, performants et sur mesure. Développement web professionnel, design responsive, optimisation SEO. Devis gratuit.",
  keywords: "création site web, développement web, design moderne, site responsive, SEO, Next.js, React",
  openGraph: {
    title: "WebCraft - Création de Sites Web Modernes",
    description: "Sites web professionnels sur mesure avec WebCraft. Design moderne, performance optimisée.",
    type: "website",
    locale: "fr_FR"
  }
};

const HomePage = () => {
  const [typedTexts, setTypedTexts] = useState({});
  const [currentLines, setCurrentLines] = useState({});
  const [isVisible, setIsVisible] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const router = useRouter();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Formulaire de contact amélioré
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi (vous pouvez connecter à votre API)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', project: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(''), 3000);
    }
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const codeSnippets = [
    {
      id: 'html',
      language: 'HTML',
      code: `<div class="webcraft-hero">
  <h1>Site Web Moderne</h1>
  <p>Interface responsive</p>
</div>`,
      position: 'left-top',
      delay: 0
    },
    {
      id: 'css',
      language: 'CSS',
      code: `.webcraft-hero {
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
  const site = new WebCraft();
  site.addResponsiveDesign();
  site.optimizePerformance();
  return site;
};`,
      position: 'left-middle',
      delay: 2000
    },
    {
      id: 'nextjs',
      language: 'Next.js',
      code: `const WebCraftApp = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <div className="webcraft-container">
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
    "import { NextJS } from 'next';",
    "const WebCraft = () => {",
    "  return (",
    "    <div className='modern-website'>",
    "      <h1>WebCraft Professional</h1>",
    "    </div>",
    "  );",
    "};",
    "export default WebCraft;",
    "",
    "/* WebCraft Styles */",
    ".modern-website {",
    "  max-width: 1200px;",
    "  margin: 0 auto;",
    "  padding: 2rem;",
    "}",
    "",
    "function initializeWebCraft() {",
    "  const config = {",
    "    responsive: true,",
    "    modern: true,",
    "    optimized: true",
    "  };",
    "  return new WebCraft(config);",
    "}",
    "",
    "<div className='hero-banner'>",
    "  <h1>WebCraft Innovation</h1>",
    "  <p>Next-gen web solutions</p>",
    "</div>",
    "",
    ".hero-banner {",
    "  background: linear-gradient(45deg, #3b82f6, #1e40af);",
    "  color: white;",
    "  text-align: center;",
    "}"
  ];

  // Animation d'écriture améliorée
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

  // Intersection Observer pour les animations au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

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
    <div className="min-h-screen">
      {/* Hero Section WebCraft avec animations améliorées */}
      <section id="accueil" className="min-h-screen relative overflow-hidden">
        {/* Background animé avec lignes de code */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
          {/* Lignes de code en arrière-plan */}
          <div className="absolute inset-0 opacity-20">
            {backgroundCodeLines.map((line, index) => (
              <div
                key={index}
                className={`absolute text-xs text-green-400 font-mono whitespace-nowrap animate-slide-right`}
                style={{
                  top: `${(index * 30) % 100}%`,
                  left: '-100%',
                  animationDelay: `${index * 0.3}s`,
                  animationDuration: '15s'
                }}
              >
                {line}
              </div>
            ))}
          </div>
          
          {/* Particules flottantes améliorées */}
          <div className="absolute inset-0">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full animate-float-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>

          {/* Grille technologique */}
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full" style={{
              backgroundImage: `
                linear-gradient(90deg, rgb(59 130 246 / 0.3) 1px, transparent 1px),
                linear-gradient(180deg, rgb(59 130 246 / 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
        </div>

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
              <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 shadow-2xl max-w-xs animate-float opacity-90 hover:opacity-100 transition-opacity duration-300 border border-blue-500/20">
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
                    {currentLines[snippet.id] && <span className="text-green-400 animate-pulse">|</span>}
                  </code>
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* Contenu principal WebCraft */}
        <div className="relative z-10 pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  <span className="text-white">Créons ensemble votre</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                    site web parfait
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                  Nous concevons et développons des sites web modernes, performants et sur mesure pour propulser votre entreprise vers le succès digital.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <Button 
                  onClick={() => scrollToSection('contact')}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-0 rounded-full"
                >
                  Demander un devis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  onClick={() => scrollToSection('services')}
                  variant="outline"
                  size="lg"
                  className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm rounded-full"
                >
                  Voir nos services
                </Button>
              </div>

              {/* Statistiques améliorées */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-16 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                  <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
                  <div className="text-gray-300 text-sm">Sites créés</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                  <div className="text-3xl font-bold text-purple-400 mb-2">98%</div>
                  <div className="text-gray-300 text-sm">Clients satisfaits</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">5J</div>
                  <div className="text-gray-300 text-sm">Livraison moyenne</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                  <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
                  <div className="text-gray-300 text-sm">Support technique</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Code className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">Développement sur mesure</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Création de sites web uniques adaptés à vos besoins spécifiques et à votre identité de marque.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Palette className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">Design moderne</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Interfaces utilisateur élégantes et responsive avec les dernières tendances du design web.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">Performance optimisée</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Sites rapides, sécurisés et optimisés pour les moteurs de recherche et l'expérience utilisateur.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>