import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">WebCraft</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Votre partenaire digital pour la création et la refonte de sites web professionnels. 
              Nous transformons vos idées en expériences numériques exceptionnelles.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Création de sites</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Refonte de sites</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">E-commerce</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Maintenance</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Optimisation SEO</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">contact@webcraft.fr</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">123 Rue de la Tech<br />75001 Paris, France</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} WebCraft. Tous droits réservés. | 
            <a href="#" className="hover:text-white transition-colors duration-200 ml-2">Mentions légales</a> | 
            <a href="#" className="hover:text-white transition-colors duration-200 ml-2">Confidentialité</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;