import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const PortfolioSection = () => {
  const projects = [
    {
      title: "E-commerce Modern",
      category: "E-commerce",
      description: "Boutique en ligne avec interface moderne et système de paiement intégré",
      image: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHx3ZWJzaXRlJTIwbW9ja3VwfGVufDB8fHx8MTc1MzczNzY5Nnww&ixlib=rb-4.1.0&q=85",
      technologies: ["React", "Node.js", "Stripe", "MongoDB"]
    },
    {
      title: "Site Corporate",
      category: "Vitrine",
      description: "Site web professionnel pour une entreprise de conseil avec design épuré",
      image: "https://images.unsplash.com/photo-1519222970733-f546218fa6d7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHx3ZWJzaXRlJTIwbW9ja3VwfGVufDB8fHx8MTc1MzczNzY5Nnww&ixlib=rb-4.1.0&q=85",
      technologies: ["Vue.js", "Tailwind", "CMS", "SEO"]
    },
    {
      title: "Portfolio Créatif",
      category: "Portfolio",
      description: "Portfolio interactif pour un studio de design avec animations fluides",
      image: "https://images.unsplash.com/photo-1527443195645-1133f7f28990?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHw0fHx3ZWJzaXRlJTIwbW9ja3VwfGVufDB8fHx8MTc1MzczNzY5Nnww&ixlib=rb-4.1.0&q=85",
      technologies: ["React", "Framer Motion", "GraphQL", "Gatsby"]
    },
    {
      title: "Application Web",
      category: "SaaS",
      description: "Interface d'administration avec tableau de bord et analytics avancés",
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHx3ZWIlMjBkZXNpZ258ZW58MHx8fHwxNzUzNjc5MjQ4fDA&ixlib=rb-4.1.0&q=85",
      technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"]
    },
    {
      title: "Plateforme Mobile",
      category: "PWA",
      description: "Application web progressive avec fonctionnalités mobiles avancées",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHw0fHx3ZWIlMjBkZXNpZ258ZW58MHx8fHwxNzUzNjc5MjQ4fDA&ixlib=rb-4.1.0&q=85",
      technologies: ["React Native", "Firebase", "Push", "Offline"]
    },
    {
      title: "Site Responsive",
      category: "Refonte",
      description: "Refonte complète d'un site existant avec optimisation mobile",
      image: "https://images.pexels.com/photos/6373045/pexels-photo-6373045.jpeg",
      technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"]
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Nos Réalisations</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez quelques exemples de nos créations et refontes de sites web pour différents secteurs d'activité.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg overflow-hidden">
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-900">
                    {project.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg">
            Vous avez un projet en tête ? 
            <button 
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="text-blue-600 hover:text-blue-700 font-semibold ml-2 transition-colors duration-200"
            >
              Contactez-nous pour en discuter
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;