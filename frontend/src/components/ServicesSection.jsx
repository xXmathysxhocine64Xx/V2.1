import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Globe, RefreshCw, Smartphone, Search, ShoppingCart, Headphones } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: <Globe className="h-12 w-12 text-blue-600" />,
      title: "Création de sites web",
      description: "Conception et développement de sites web professionnels sur mesure, adaptés à votre secteur d'activité.",
      features: ["Design responsive", "CMS intégré", "Optimisation SEO", "Hébergement inclus"]
    },
    {
      icon: <RefreshCw className="h-12 w-12 text-green-600" />,
      title: "Refonte de sites existants",
      description: "Modernisation complète de votre site web avec les dernières technologies et tendances du design.",
      features: ["Audit complet", "Nouvelle identité visuelle", "Migration sécurisée", "Formation incluse"]
    },
    {
      icon: <Smartphone className="h-12 w-12 text-purple-600" />,
      title: "Sites mobiles",
      description: "Développement d'applications web progressives (PWA) pour une expérience mobile optimale.",
      features: ["Interface tactile", "Mode hors ligne", "Notifications push", "App store ready"]
    },
    {
      icon: <Search className="h-12 w-12 text-orange-600" />,
      title: "Optimisation SEO",
      description: "Amélioration du référencement naturel pour augmenter votre visibilité sur les moteurs de recherche.",
      features: ["Audit SEO", "Mots-clés ciblés", "Contenu optimisé", "Suivi des performances"]
    },
    {
      icon: <ShoppingCart className="h-12 w-12 text-red-600" />,
      title: "E-commerce",
      description: "Création de boutiques en ligne performantes avec système de paiement sécurisé intégré.",
      features: ["Catalogue produits", "Paiement sécurisé", "Gestion commandes", "Analytics avancés"]
    },
    {
      icon: <Headphones className="h-12 w-12 text-indigo-600" />,
      title: "Maintenance & Support",
      description: "Service de maintenance continue et support technique pour garantir le bon fonctionnement de votre site.",
      features: ["Mises à jour régulières", "Sauvegardes automatiques", "Support 24/7", "Monitoring continu"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Nos Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des solutions complètes pour tous vos besoins digitaux, de la création à la maintenance de votre présence en ligne.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;