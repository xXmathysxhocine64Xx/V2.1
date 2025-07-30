'use client'

import { useState, useEffect, memo } from 'react'
import { ArrowRight, Code, Palette, Zap, Mail, MapPin, Server, Globe, Shield, Phone, Clock, Users, Network, Monitor, Database, Terminal, Rocket, Heart, Star, CheckCircle, TrendingUp, Award, Target, Briefcase, Smartphone, Search, Settings, HeadphonesIcon } from 'lucide-react'
import { Button } from '../../components/ui/button'

const WebCraftBusinessPage = memo(() => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
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
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', company: '', projectType: '', budget: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(''), 4000)
    }
  }

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section Business */}
      <section id="accueil" className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
        {/* Background technique subtil */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgb(59 130 246 / 0.15) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Éléments décoratifs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-6xl mx-auto">
            {/* Badge principal */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-800/60 backdrop-blur-sm border border-blue-400/40 rounded-full shadow-lg shadow-blue-500/20 mb-8">
              <div className="relative flex items-center justify-center w-3 h-3">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
                <div className="absolute w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="text-sm text-blue-300 font-medium">🚀 Agence Web Française • +500 Sites Créés</span>
            </div>

            {/* Titre principal business */}
            <div className="space-y-6 mb-12">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-white">Votre</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                  Site Web Professionnel
                </span>
                <br />
                <span className="text-white">Clé en Main</span>
              </h1>
              <p className="text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                Création • Amélioration • Déploiement • Support
                <br />
                <span className="text-blue-300 font-semibold">Pour Entreprises, Startups & Particuliers</span>
              </p>
            </div>

            {/* Propositions de valeur principales */}
            <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
              {[
                {
                  icon: Rocket,
                  title: "Livraison Rapide",
                  description: "Site en ligne en 5-10 jours maximum",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  icon: Shield,
                  title: "100% Sécurisé",
                  description: "SSL, sauvegardes et protection incluses",
                  color: "from-green-500 to-emerald-500"
                },
                {
                  icon: HeadphonesIcon,
                  title: "Support 24/7",
                  description: "Assistance technique et maintenance continue",
                  color: "from-purple-500 to-violet-500"
                }
              ].map((value, index) => (
                <div key={index} className="bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-blue-400/50 transition-all duration-300">
                  <div className={`w-12 h-12 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-slate-400 text-sm">{value.description}</p>
                </div>
              ))}
            </div>

            {/* CTA Principal */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 hover:from-blue-700 hover:via-purple-700 hover:to-violet-700 text-white px-10 py-6 text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40 border border-blue-400/20"
                onClick={() => scrollToSection('contact')}
              >
                <Rocket className="mr-3 w-6 h-6" />
                <span>Lancer Mon Projet Web</span>
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-slate-600 text-slate-300 hover:bg-blue-500/20 hover:border-blue-400 hover:text-blue-300 px-10 py-6 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105"
                onClick={() => scrollToSection('portfolio')}
              >
                <Award className="mr-3 w-6 h-6" />
                <span>Voir Nos Réalisations</span>
              </Button>
            </div>

            {/* Statistiques impressionnantes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { value: '500+', label: 'Sites Créés', icon: '🌐' },
                { value: '98%', label: 'Clients Satisfaits', icon: '⭐' },
                { value: '5J', label: 'Délai Moyen', icon: '⚡' },
                { value: '24/7', label: 'Support Pro', icon: '🛠️' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Nos Services Complets */}
      <section id="services" className="py-20 bg-gradient-to-br from-slate-800/50 to-slate-900/80 relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgb(6 182 212 / 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-cyan-400/30 rounded-full mb-6">
              <Briefcase className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300 font-medium">Services Professionnels</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Solutions Web
              </span>
              <span className="text-cyan-300"> Complètes</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              De la création à la maintenance, nous accompagnons votre projet web de A à Z
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Code,
                title: "Création de Sites",
                description: "Sites vitrine, e-commerce, applications web sur mesure avec design moderne et responsive",
                features: ["Design sur mesure", "Responsive mobile", "CMS intégré", "SEO optimisé"],
                color: "from-blue-500 to-cyan-500",
                price: "À partir de 1,200€"
              },
              {
                icon: TrendingUp,
                title: "Amélioration & Refonte",
                description: "Modernisation de sites existants, optimisation performance et expérience utilisateur",
                features: ["Audit complet", "Optimisation vitesse", "Design moderne", "Migration sécurisée"],
                color: "from-green-500 to-emerald-500",
                price: "À partir de 800€"
              },
              {
                icon: Server,
                title: "Déploiement & Hébergement",
                description: "Mise en ligne professionnelle avec hébergement haute performance et nom de domaine",
                features: ["Hébergement premium", "Certificat SSL", "CDN global", "Monitoring 24/7"],
                color: "from-purple-500 to-violet-500",
                price: "À partir de 200€/an"
              },
              {
                icon: HeadphonesIcon,
                title: "Support & Maintenance",
                description: "Assistance technique continue, mises à jour sécurité et évolutions fonctionnelles",
                features: ["Support 24/7", "Mises à jour", "Sauvegardes auto", "Évolutions"],
                color: "from-orange-500 to-red-500",
                price: "À partir de 100€/mois"
              }
            ].map((service, index) => (
              <div key={index} className="group">
                <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 hover:border-cyan-400/50 rounded-2xl p-8 h-full transition-all duration-500 hover:transform hover:-translate-y-4 hover:shadow-2xl hover:shadow-cyan-400/20">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <service.icon className="w-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 mb-6 leading-relaxed text-sm">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-slate-700 pt-4 mt-auto">
                    <div className="text-lg font-bold text-cyan-300 mb-3">{service.price}</div>
                    <Button
                      size="sm"
                      className="w-full bg-slate-700 hover:bg-slate-600 text-white border-slate-600 hover:border-slate-500"
                      onClick={() => scrollToSection('contact')}
                    >
                      Demander un devis
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Nos Clients */}
      <section className="py-20 bg-gradient-to-br from-slate-900/80 to-slate-800/50 relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-cyan-400/30 rounded-full mb-6">
              <Users className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300 font-medium">Nos Clients</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Ils Nous Font
              </span>
              <span className="text-cyan-300"> Confiance</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                type: "🏢 Entreprises",
                description: "PME, grands comptes et entreprises locales nous confient leur présence web",
                examples: ["Sites vitrine corporate", "Plateformes e-commerce", "Applications métier", "Portails clients"],
                clients: "200+ entreprises"
              },
              {
                type: "🚀 Startups",
                description: "Accompagnement des jeunes pousses dans leur lancement digital",
                examples: ["MVP web", "Landing pages", "Plateformes SaaS", "Sites événementiels"],
                clients: "150+ startups"
              },
              {
                type: "👤 Particuliers",
                description: "Professionnels indépendants et particuliers pour leurs projets personnels",
                examples: ["Portfolios", "Sites personnels", "Boutiques en ligne", "Blogs professionnels"],
                clients: "300+ particuliers"
              }
            ].map((client, index) => (
              <div key={index} className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 hover:border-cyan-400/50 rounded-2xl p-8 transition-all duration-300">
                <div className="text-4xl mb-4">{client.type.split(' ')[0]}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{client.type.split(' ').slice(1).join(' ')}</h3>
                <p className="text-slate-400 mb-6">{client.description}</p>
                <ul className="space-y-2 mb-6">
                  {client.examples.map((example, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                      {example}
                    </li>
                  ))}
                </ul>
                <div className="text-cyan-300 font-semibold">{client.clients}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Portfolio/Témoignages */}
      <section id="portfolio" className="py-20 bg-gradient-to-br from-slate-800/50 to-slate-900/80 relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(180deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-cyan-400/30 rounded-full mb-6">
              <Star className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300 font-medium">Témoignages</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Retours
              </span>
              <span className="text-cyan-300"> Clients</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                name: "Sophie Martin",
                company: "Directrice, TechCorp",
                text: "WebCraft a transformé notre présence en ligne. Site moderne, rapide et un support exceptionnel. Je recommande vivement !",
                rating: 5,
                project: "Site vitrine + E-commerce"
              },
              {
                name: "David Chen",
                company: "Fondateur, StartupLab",
                text: "Délai respecté, budget maîtrisé et résultat au-delà de nos attentes. L'équipe WebCraft est vraiment professionnelle.",
                rating: 5,
                project: "Application web SaaS"
              },
              {
                name: "Marie Dubois",
                company: "Artiste indépendante",
                text: "Mon portfolio en ligne a boosté ma visibilité. Design magnifique et facile à utiliser. Merci WebCraft !",
                rating: 5,
                project: "Portfolio artistique"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 italic">"{testimonial.text}"</p>
                <div className="border-t border-slate-700 pt-4">
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-slate-400 mb-2">{testimonial.company}</div>
                  <div className="text-xs text-cyan-300">{testimonial.project}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Métriques de satisfaction */}
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { value: "4.9/5", label: "Note moyenne", icon: Star },
                { value: "98%", label: "Clients satisfaits", icon: Heart },
                { value: "100%", label: "Projets livrés", icon: CheckCircle },
                { value: "24h", label: "Temps de réponse", icon: Clock }
              ].map((metric, index) => (
                <div key={index}>
                  <metric.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                  <div className="text-slate-400 text-sm">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Contact Business */}
      <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgb(59 130 246 / 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-cyan-400/30 rounded-full mb-6">
              <Rocket className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300 font-medium">Contact</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Démarrons Votre
              </span>
              <br />
              <span className="text-cyan-300">Projet Web</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Obtenez un devis gratuit et personnalisé en moins de 24h
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Formulaire de contact business */}
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Demande de Devis Gratuit</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Nom *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Entreprise</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
                      placeholder="Nom de l'entreprise"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Type de projet *</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
                    >
                      <option value="">Sélectionnez un type</option>
                      <option value="creation">Création de site</option>
                      <option value="refonte">Refonte/Amélioration</option>
                      <option value="ecommerce">Site e-commerce</option>
                      <option value="application">Application web</option>
                      <option value="maintenance">Support/Maintenance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Budget estimé</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
                    >
                      <option value="">Budget approximatif</option>
                      <option value="500-1500">500€ - 1,500€</option>
                      <option value="1500-3000">1,500€ - 3,000€</option>
                      <option value="3000-5000">3,000€ - 5,000€</option>
                      <option value="5000+">5,000€ et plus</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Description du projet *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all resize-none"
                    placeholder="Décrivez votre projet, vos objectifs, votre cible, fonctionnalités souhaitées..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Envoi en cours...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <Rocket className="w-5 h-5" />
                      Obtenir Mon Devis Gratuit
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </Button>

                {submitStatus === 'success' && (
                  <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-green-300 text-center font-medium">
                    ✅ Demande envoyée avec succès ! Nous vous recontactons dans les 24h avec votre devis personnalisé.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-300 text-center font-medium">
                    ❌ Erreur lors de l'envoi. Veuillez réessayer ou nous contacter directement.
                  </div>
                )}
              </form>
            </div>

            {/* Informations de contact et garanties */}
            <div className="space-y-6">
              {/* Contact direct */}
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                <h4 className="text-xl font-bold text-white mb-6">Contact Direct</h4>
                <div className="space-y-4">
                  {[
                    {
                      icon: Mail,
                      title: "Email Pro",
                      value: "contact@webcraft.fr",
                      description: "Réponse sous 2h en semaine",
                      color: "text-blue-400"
                    },
                    {
                      icon: Phone,
                      title: "Téléphone",
                      value: "+33 1 80 96 84 82",
                      description: "Lun-Ven 9h-19h",
                      color: "text-green-400"
                    },
                    {
                      icon: MapPin,
                      title: "Localisation",
                      value: "Paris, France",
                      description: "Service national & international",
                      color: "text-purple-400"
                    }
                  ].map((contact, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-lg">
                      <contact.icon className={`w-5 h-5 ${contact.color} mt-1`} />
                      <div>
                        <div className="font-semibold text-white">{contact.title}</div>
                        <div className="text-slate-300">{contact.value}</div>
                        <div className="text-sm text-slate-400">{contact.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Garanties */}
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                <h4 className="text-xl font-bold text-white mb-6">Nos Garanties</h4>
                <div className="space-y-4">
                  {[
                    { icon: CheckCircle, text: "Devis gratuit et sans engagement", color: "text-green-400" },
                    { icon: Clock, text: "Réponse sous 24h maximum", color: "text-blue-400" },
                    { icon: Shield, text: "Satisfaction garantie à 100%", color: "text-purple-400" },
                    { icon: HeadphonesIcon, text: "Support technique inclus", color: "text-orange-400" }
                  ].map((guarantee, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <guarantee.icon className={`w-5 h-5 ${guarantee.color}`} />
                      <span className="text-slate-300">{guarantee.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process de travail */}
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                <h4 className="text-xl font-bold text-white mb-6">Notre Process</h4>
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Analyse", desc: "Étude de vos besoins" },
                    { step: "2", title: "Devis", desc: "Proposition détaillée" },
                    { step: "3", title: "Création", desc: "Développement du site" },
                    { step: "4", title: "Livraison", desc: "Mise en ligne & formation" }
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {step.step}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{step.title}</div>
                        <div className="text-sm text-slate-400">{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
})

WebCraftBusinessPage.displayName = 'WebCraftBusinessPage'

export default WebCraftBusinessPage