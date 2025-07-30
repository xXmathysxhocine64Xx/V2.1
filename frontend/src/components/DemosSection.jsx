import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Globe, Monitor, Code, Zap, Users, Clock, CheckCircle, TrendingUp } from 'lucide-react';

const DemosSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const demos = [
    {
      title: "TechStore Pro",
      category: "E-commerce",
      description: "Plateforme e-commerce moderne avec paiement sécurisé et gestion avancée des stocks",
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHx3ZWIlMjBkZXNpZ258ZW58MHx8fHwxNzUzODk0NzMwfDA&ixlib=rb-4.1.0&q=85",
      technologies: ["Next.js", "Stripe", "MongoDB"],
      color: "from-green-500 to-emerald-500",
      demoUrl: "#",
      metrics: { visits: "15K/mois", conversion: "4.2%" }
    },
    {
      title: "Conseil & Stratégie",
      category: "Corporate",
      description: "Site vitrine professionnel pour cabinet de conseil avec espace client privé",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ258ZW58MHx8fHwxNzUzODk0NzMwfDA&ixlib=rb-4.1.0&q=85",
      technologies: ["React", "Node.js", "PostgreSQL"],
      color: "from-blue-500 to-cyan-500",
      demoUrl: "#",
      metrics: { leads: "+180%", seo: "Top 3 Google" }
    },
    {
      title: "Portfolio Créatif",
      category: "Artistique",
      description: "Portfolio interactif pour artiste avec galerie photo et système de commandes",
      image: "https://images.pexels.com/photos/8938676/pexels-photo-8938676.jpeg",
      technologies: ["Vue.js", "Firebase", "Cloudinary"],
      color: "from-purple-500 to-pink-500",
      demoUrl: "#",
      metrics: { engagement: "+250%", commandes: "x3" }
    },
    {
      title: "FintechStartup",
      category: "SaaS",
      description: "Application web de gestion financière avec tableau de bord analytique",
      image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg",
      technologies: ["Next.js", "D3.js", "API REST"],
      color: "from-orange-500 to-red-500",
      demoUrl: "#",
      metrics: { users: "5K actifs", retention: "85%" }
    },
    {
      title: "Formation en Ligne",
      category: "Éducation",
      description: "Plateforme LMS complète avec vidéos, quiz et suivi de progression",
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHw0fHx3ZWIlMjBkZXNpZ258ZW58MHx8fHwxNzUzODk0NzMwfDA&ixlib=rb-4.1.0&q=85",
      technologies: ["React", "Video.js", "Stripe"],
      color: "from-indigo-500 to-purple-500",
      demoUrl: "#",
      metrics: { cours: "200+", satisfaction: "4.8/5" }
    },
    {
      title: "Restaurant Moderne",
      category: "Local Business",
      description: "Site vitrine avec réservation en ligne et menu interactif QR code",
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHx3ZWIlMjBkZXNpZ258ZW58MHx8fHwxNzUzODk0NzMwfDA&ixlib=rb-4.1.0&q=85",
      technologies: ["WordPress", "OpenTable", "PWA"],
      color: "from-yellow-500 to-orange-500",
      demoUrl: "#",
      metrics: { réservations: "+120%", mobile: "90%" }
    }
  ];

  return (
    <section id="demos" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(180deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="relative container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-cyan-400/30 rounded-full mb-6">
            <Monitor className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300 font-medium">Portfolio</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Nos
            </span>
            <span className="text-cyan-300"> Réalisations</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Découvrez quelques-unes de nos créations récentes et explorez nos démos interactives
          </p>
        </div>

        {/* Demos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {demos.map((demo, index) => (
            <div key={index} className="group bg-slate-800/60 backdrop-blur-sm border border-slate-700 hover:border-cyan-400/50 rounded-2xl overflow-hidden transition-all duration-500 hover:transform hover:-translate-y-4 hover:shadow-2xl hover:shadow-cyan-400/20">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={demo.image} 
                  alt={demo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 bg-gradient-to-r ${demo.color} text-white text-xs font-semibold rounded-full`}>
                    {demo.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <Button
                    size="sm"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 h-8 w-8 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => window.open(demo.demoUrl, '_blank')}
                  >
                    <Globe className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {demo.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {demo.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {demo.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="px-2 py-1 bg-slate-700/60 text-cyan-300 text-xs rounded-md border border-slate-600">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {Object.entries(demo.metrics).map(([key, value], metricIndex) => (
                    <div key={metricIndex} className="text-center">
                      <div className="text-sm font-bold text-white">{value}</div>
                      <div className="text-xs text-slate-400 capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                {/* Demo Button */}
                <Button
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white border-slate-600 hover:border-slate-500 group-hover:bg-cyan-600 group-hover:border-cyan-500 transition-all duration-300"
                  onClick={scrollToContact}
                >
                  <Monitor className="mr-2 w-4 h-4" />
                  Voir la démo
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: "50+", label: "Projets réalisés", icon: Globe },
              { value: "15+", label: "Secteurs d'activité", icon: Users },
              { value: "98%", label: "Projets réussis", icon: CheckCircle },
              { value: "24h", label: "Démo disponible", icon: Clock }
            ].map((stat, index) => (
              <div key={index} className="group">
                <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/40"
            onClick={scrollToContact}
          >
            <Globe className="mr-3 w-6 h-6" />
            <span>Demander une Démo Personnalisée</span>
            <ArrowRight className="ml-3 w-6 h-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DemosSection;