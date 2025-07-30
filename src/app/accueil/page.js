'use client'

import { useState, useEffect, memo } from 'react'
import { ArrowRight, Code, Palette, Zap, Mail, MapPin, Server, Globe, Shield, Phone, Clock, Users } from 'lucide-react'
import { Button } from '../../components/ui/button'

const WebCraftHomePage = memo(() => {
  const [particlesData, setParticlesData] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')
  const [mounted, setMounted] = useState(false)

  // Générer les données des particules côté client uniquement
  useEffect(() => {
    setMounted(true)
    const particles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 7 + Math.random() * 8
    }))
    setParticlesData(particles)
  }, [])

  const scrollToSection = (sectionId) => {
    if (typeof window !== 'undefined') {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', project: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(''), 3000)
    }
  }

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section WebCraft Ultra-Moderne */}
      <section id="accueil" className="min-h-screen relative overflow-hidden">
        {/* Background Ultra-Moderne */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black"></div>
          
          {/* Mesh Gradient Overlay */}
          <div className="absolute inset-0 opacity-60" style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)
            `
          }}></div>

          {/* Particules subtiles */}
          <div className="absolute inset-0">
            {mounted && particlesData.slice(0, 20).map((particle) => (
              <div
                key={particle.id}
                className="absolute opacity-40"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${particle.duration}s`
                }}
              >
                <div className="w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-float-particle"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Contenu principal */}
        <div className="relative z-10 pt-32 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Titre principal WebCraft */}
              <div className="animate-fade-in-up mb-16">
                <div className="mb-6">
                  <span className="text-lg text-cyan-400 font-mono tracking-widest uppercase opacity-80">// WebCraft Studio</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none">
                  <div className="relative inline-block">
                    <span className="text-white drop-shadow-2xl">WEB</span>
                    <div className="absolute inset-0 text-white opacity-20 blur-sm scale-110">WEB</div>
                  </div>
                  <br />
                  <div className="relative inline-block mt-4">
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                      CRAFT
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent opacity-30 blur-sm scale-110 animate-gradient-x">
                      CRAFT
                    </div>
                  </div>
                </h1>
                <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto mb-8 rounded-full animate-pulse"></div>
                <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
                  <span className="text-cyan-400 font-semibold">Créateur d'expériences digitales</span> — Nous concevons des univers web 
                  qui transforment votre vision en réalité numérique époustouflante.
                </p>
              </div>

              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <Button 
                  onClick={() => scrollToSection('contact')}
                  size="lg"
                  className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-10 py-5 text-lg font-semibold rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/30 border-0 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="relative z-10">Lancer votre projet</span>
                  <ArrowRight className="ml-3 h-6 w-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button 
                  onClick={() => scrollToSection('services')}
                  variant="outline"
                  size="lg"
                  className="group border-2 border-cyan-400/60 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-300 hover:text-cyan-300 px-10 py-5 text-lg font-semibold rounded-full transition-all duration-500 transform hover:scale-105 backdrop-blur-sm hover:shadow-lg hover:shadow-cyan-400/20"
                >
                  <span className="group-hover:text-cyan-200 transition-colors duration-300">Explorer nos créations</span>
                </Button>
              </div>

              {/* Métriques WebCraft */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto mb-20 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                {[
                  { value: '500+', label: 'Projets réalisés', color: 'from-cyan-400 to-blue-500', icon: '🚀' },
                  { value: '98%', label: 'Satisfaction client', color: 'from-purple-400 to-pink-500', icon: '⭐' },
                  { value: '5J', label: 'Délai moyen', color: 'from-green-400 to-teal-500', icon: '⚡' },
                  { value: '24/7', label: 'Support expert', color: 'from-orange-400 to-red-500', icon: '🛡️' }
                ].map((metric, index) => (
                  <div key={index} className={`group bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-cyan-400/40 transition-all duration-500 hover:bg-black/60 hover:shadow-xl hover:shadow-cyan-400/10 animate-scale-in ${
                    index === 0 ? 'animation-delay-100' :
                    index === 1 ? 'animation-delay-200' :
                    index === 2 ? 'animation-delay-300' :
                    'animation-delay-400'
                  }`}>
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{metric.icon}</div>
                    <div className={`text-4xl font-black mb-3 bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>{metric.value}</div>
                    <div className="text-gray-400 text-sm font-medium group-hover:text-gray-300 transition-colors duration-300">{metric.label}</div>
                  </div>
                ))}
              </div>

              {/* Services Cards WebCraft */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                {[
                  { 
                    icon: Code, 
                    title: 'Développement\nAvant-garde',
                    description: 'Architecture technique moderne avec les dernières innovations du web',
                    gradient: 'from-cyan-500 to-blue-600',
                    hoverGlow: 'hover:shadow-cyan-400/30'
                  },
                  { 
                    icon: Palette, 
                    title: 'Design\nExpérientiel', 
                    description: 'Interfaces utilisateur immersives qui marquent les esprits',
                    gradient: 'from-purple-500 to-pink-600',
                    hoverGlow: 'hover:shadow-purple-400/30'
                  },
                  { 
                    icon: Zap, 
                    title: 'Performance\nExtrême', 
                    description: 'Optimisation maximale pour une expérience utilisateur fulgurante',
                    gradient: 'from-green-500 to-teal-600',
                    hoverGlow: 'hover:shadow-green-400/30'
                  }
                ].map((service, index) => (
                  <div key={index} className={`group bg-black/30 backdrop-blur-lg p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-4 border border-white/10 hover:border-white/20 hover:bg-black/40 animate-scale-in ${service.hoverGlow} ${
                    index === 0 ? 'animation-delay-100' :
                    index === 1 ? 'animation-delay-300' :
                    'animation-delay-500'
                  }`}>
                    <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                      <service.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-6 text-center group-hover:text-cyan-100 transition-colors duration-300 leading-tight whitespace-pre-line">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-center group-hover:text-gray-300 transition-colors duration-300 text-lg">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Services WebCraft */}
      <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Nos Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions complètes pour tous vos besoins digitaux, de la création à la maintenance de votre présence en ligne.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Création de sites web",
                description: "Conception et développement de sites web professionnels sur mesure, adaptés à votre secteur d'activité.",
                features: ["Design responsive", "CMS intégré", "Optimisation SEO", "Hébergement inclus"],
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: Palette,
                title: "Refonte de sites existants",
                description: "Modernisation complète de votre site web avec les dernières technologies et tendances du design.",
                features: ["Audit complet", "Nouvelle identité visuelle", "Migration sécurisée", "Formation incluse"],
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: Server,
                title: "Applications web",
                description: "Développement d'applications web sur mesure avec Next.js pour une performance optimale.",
                features: ["Architecture moderne", "Base de données", "API intégrées", "Évolutivité"],
                color: "from-green-500 to-green-600"
              },
              {
                icon: Shield,
                title: "Sécurité & Maintenance",
                description: "Protection et maintenance continue pour garantir la sécurité et les performances de votre site.",
                features: ["Sauvegardes automatiques", "Mises à jour sécurité", "Monitoring 24/7", "Support technique"],
                color: "from-red-500 to-red-600"
              },
              {
                icon: Zap,
                title: "Optimisation Performance",
                description: "Amélioration des performances et de la vitesse de chargement pour une meilleure expérience utilisateur.",
                features: ["Optimisation images", "Cache intelligent", "CDN global", "Audit performance"],
                color: "from-yellow-500 to-yellow-600"
              },
              {
                icon: Code,
                title: "Développement API",
                description: "Création d'APIs robustes et sécurisées pour connecter vos services et applications.",
                features: ["REST & GraphQL", "Authentification", "Documentation", "Tests automatisés"],
                color: "from-indigo-500 to-indigo-600"
              }
            ].map((service, index) => (
              <div key={index} className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 group animate-scale-in ${
                index === 0 ? 'animation-delay-100' :
                index === 1 ? 'animation-delay-200' :
                index === 2 ? 'animation-delay-300' :
                index === 3 ? 'animation-delay-400' :
                index === 4 ? 'animation-delay-500' :
                'animation-delay-600'
              }`}>
                <div className="flex justify-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-pulse-glow ${
                    index % 2 === 0 ? 'animation-delay-100' : 'animation-delay-300'
                  }`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 text-center">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={`flex items-center text-sm text-gray-700 animate-fade-in-up ${
                      featureIndex === 0 ? 'animation-delay-100' :
                      featureIndex === 1 ? 'animation-delay-200' :
                      featureIndex === 2 ? 'animation-delay-300' :
                      'animation-delay-400'
                    }`}>
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3 animate-bounce-subtle animation-delay-100"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Contact WebCraft */}
      <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Prêt à créer votre
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> site web ?</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Contactez-nous dès aujourd'hui pour discuter de votre projet et obtenir un devis personnalisé.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulaire de contact */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Demander un devis</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Nom complet</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">Téléphone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="01 23 45 67 89"
                    />
                  </div>
                  <div>
                    <label htmlFor="project" className="block text-sm font-medium mb-2">Type de projet</label>
                    <select
                      id="project"
                      name="project"
                      value={formData.project}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="" className="text-gray-900">Sélectionnez</option>
                      <option value="site-vitrine" className="text-gray-900">Site vitrine</option>
                      <option value="e-commerce" className="text-gray-900">E-commerce</option>
                      <option value="application-web" className="text-gray-900">Application web</option>
                      <option value="refonte" className="text-gray-900">Refonte</option>
                      <option value="autre" className="text-gray-900">Autre</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Décrivez votre projet..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                  {!isSubmitting && <ArrowRight className="ml-2 w-5 h-5" />}
                </Button>

                {submitStatus === 'success' && (
                  <div className="text-green-400 text-center font-medium">
                    ✅ Message envoyé avec succès ! Nous vous recontactons rapidement.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="text-red-400 text-center font-medium">
                    ❌ Erreur lors de l'envoi. Veuillez réessayer.
                  </div>
                )}
              </form>
            </div>

            {/* Informations de contact */}
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                <div className="flex items-center mb-4">
                  <Mail className="w-6 h-6 text-blue-400 mr-3" />
                  <h4 className="text-xl font-semibold">Email</h4>
                </div>
                <p className="text-gray-300 mb-2">contact@webcraft.fr</p>
                <p className="text-sm text-gray-400">Réponse sous 2h en moyenne</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                <div className="flex items-center mb-4">
                  <Phone className="w-6 h-6 text-green-400 mr-3" />
                  <h4 className="text-xl font-semibold">Téléphone</h4>
                </div>
                <p className="text-gray-300 mb-2">+33 1 23 45 67 89</p>
                <p className="text-sm text-gray-400">Lun-Ven 9h-18h</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                <div className="flex items-center mb-4">
                  <MapPin className="w-6 h-6 text-purple-400 mr-3" />
                  <h4 className="text-xl font-semibold">Localisation</h4>
                </div>
                <p className="text-gray-300 mb-2">France, Europe</p>
                <p className="text-sm text-gray-400">Intervention nationale et internationale</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-yellow-400 mr-3" />
                  <h4 className="text-xl font-semibold">Délais</h4>
                </div>
                <p className="text-gray-300 mb-2">5-10 jours ouvrés</p>
                <p className="text-sm text-gray-400">Selon la complexité du projet</p>
              </div>
            </div>
          </div>

          {/* Boutons d'appel à l'action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.href = 'mailto:contact@webcraft.fr'
                }
              }}
            >
              <Mail className="mr-2 w-5 h-5" />
              <span>Envoyer un email</span>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-blue-400/50 text-blue-300 hover:bg-blue-400/10 hover:border-blue-400 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.open('tel:+33123456789', '_self')
                }
              }}
            >
              <Phone className="mr-2 w-5 h-5" />
              <span>Appeler maintenant</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
})

WebCraftHomePage.displayName = 'WebCraftHomePage'

export default WebCraftHomePage