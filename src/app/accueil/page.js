'use client'

import { useState, useEffect, memo } from 'react'
import { ArrowRight, Code, Palette, Zap, Mail, MapPin, Server, Globe, Shield, Phone, Clock, Users, Network, Monitor, Database, Terminal } from 'lucide-react'
import { Button } from '../../components/ui/button'

const WebCraftHomePage = memo(() => {
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

  // Infrastructure status data
  const infrastructureServices = [
    { name: 'Next.js Server', status: 'active', type: 'frontend' },
    { name: 'API Services', status: 'active', type: 'backend' },
    { name: 'MongoDB Atlas', status: 'active', type: 'database' },
    { name: 'CDN Global', status: 'active', type: 'network' }
  ]

  const techStack = [
    { 
      icon: Code, 
      name: 'Next.js 15', 
      category: 'Frontend',
      description: 'Framework React moderne',
      status: 'expert',
      color: 'from-blue-400 to-cyan-400'
    },
    { 
      icon: Server, 
      name: 'FastAPI', 
      category: 'Backend',
      description: 'API REST haute performance',
      status: 'expert',
      color: 'from-green-400 to-emerald-400'
    },
    { 
      icon: Database, 
      name: 'MongoDB', 
      category: 'Database',
      description: 'Base NoSQL moderne',
      status: 'avancé',
      color: 'from-purple-400 to-violet-400'
    },
    { 
      icon: Globe, 
      name: 'Cloud Deploy', 
      category: 'DevOps',
      description: 'Déploiement automatisé',
      status: 'avancé',
      color: 'from-orange-400 to-red-400'
    },
    { 
      icon: Shield, 
      name: 'SSL/Security', 
      category: 'Sécurité',
      description: 'Certificats et protection',
      status: 'expert',
      color: 'from-pink-400 to-rose-400'
    },
    { 
      icon: Monitor, 
      name: 'Responsive', 
      category: 'UI/UX',
      description: 'Design adaptatif',
      status: 'expert',
      color: 'from-indigo-400 to-blue-400'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section - Style Technologique Professionnel */}
      <section id="accueil" className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Background technique subtil */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgb(59 130 246 / 0.15) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Éléments décoratifs bleu/violet */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-10rem)]">
            {/* Contenu principal */}
            <div className="space-y-8">
              {/* Badge status WebCraft */}
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-800/60 backdrop-blur-sm border border-blue-400/40 rounded-full shadow-lg shadow-blue-500/20">
                <div className="relative flex items-center justify-center w-2 h-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
                  <div className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="text-sm text-blue-300 font-medium">Services WebCraft Actifs</span>
              </div>

              {/* Titre principal WebCraft */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                    WebCraft
                  </span>
                  <span className="text-white"> Studio</span>
                </h1>
                <h2 className="text-2xl lg:text-3xl font-semibold text-transparent bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text">
                  Créateur d'expériences digitales
                </h2>
                <p className="text-xl text-blue-200 font-light">
                  Solutions web modernes et performantes
                </p>
              </div>

              {/* Description professionnelle */}
              <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
                Spécialisé dans le développement d'applications web haute performance avec Next.js, FastAPI et MongoDB. 
                Architecture moderne, sécurité renforcée et optimisation pour une expérience utilisateur exceptionnelle.
              </p>

              {/* Boutons d'action professionnels */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 hover:from-blue-700 hover:via-purple-700 hover:to-violet-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 border border-blue-400/20"
                  onClick={() => scrollToSection('services')}
                >
                  <Server className="mr-2 w-5 h-5" />
                  <span>Explorer nos services</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-purple-400/60 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-200 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
                  onClick={() => scrollToSection('contact')}
                >
                  <Mail className="mr-2 w-5 h-5" />
                  <span>Demander un devis</span>
                </Button>
              </div>

              {/* Infos contact professionnelles */}
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <div className="flex items-center gap-3 text-slate-300 hover:text-blue-300 transition-colors cursor-pointer group" onClick={() => scrollToSection('contact')}>
                  <Mail className="w-5 h-5 group-hover:text-blue-400" />
                  <span>contact@webcraft.fr</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 hover:text-purple-300 transition-colors group">
                  <MapPin className="w-5 h-5 group-hover:text-purple-400" />
                  <span>France, Europe</span>
                </div>
              </div>

              {/* Métriques de performance */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                {[
                  { value: '500+', label: 'Sites créés', color: 'text-blue-400' },
                  { value: '98%', label: 'Satisfaction', color: 'text-purple-400' },
                  { value: '5J', label: 'Livraison', color: 'text-green-400' },
                  { value: '24/7', label: 'Support', color: 'text-orange-400' }
                ].map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
                    <div className="text-sm text-slate-400">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section Infrastructure moderne */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700">
                <div className="aspect-[4/3] relative p-8">
                  <div className="h-full flex flex-col justify-center space-y-6">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                        <Network className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">Infrastructure WebCraft</h3>
                      <p className="text-slate-400">Stack technologique moderne et sécurisée</p>
                    </div>
                    
                    {/* Status des services */}
                    <div className="space-y-3">
                      {infrastructureServices.map((service, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                          <span className="text-slate-300">{service.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-xs text-green-300">Active</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Overlay technique */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-4 border border-cyan-400/30">
                    <div className="flex items-center gap-2 text-cyan-300 mb-3">
                      <Terminal className="w-4 h-4" />
                      <span className="text-sm font-medium">System Status</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">Uptime: 99.98%</span>
                      <span className="text-green-300">All Systems Operational</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Stack Technologique */}
      <section className="py-20 bg-gradient-to-br from-slate-800/50 to-slate-900/80 relative">
        {/* Fond technique subtil */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgb(6 182 212 / 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-cyan-400/30 rounded-full mb-6">
              <Code className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300 font-medium">Stack Technologique</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Technologies
              </span>
              <span className="text-cyan-300"> Modernes</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Outils et frameworks de pointe pour des solutions web performantes et évolutives
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <div key={index} className="group">
                <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 hover:border-cyan-400/50 rounded-2xl p-6 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-400/10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${tech.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <tech.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        {tech.name}
                      </h3>
                      <span className="text-sm text-slate-400">{tech.category}</span>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm mb-3">{tech.description}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-700 rounded-full h-2">
                      <div className={`bg-gradient-to-r ${tech.color} h-2 rounded-full transition-all duration-500 ${
                        tech.status === 'expert' ? 'w-full' : 'w-3/4'
                      }`}></div>
                    </div>
                    <span className="text-xs text-slate-400 capitalize">{tech.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Services WebCraft */}
      <section id="services" className="py-20 bg-gradient-to-br from-slate-900/80 to-slate-800/50 relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-cyan-400/30 rounded-full mb-6">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300 font-medium">Services</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Solutions
              </span>
              <span className="text-cyan-300"> WebCraft</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto rounded-full mb-8"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: "Développement Frontend",
                description: "Applications React/Next.js modernes avec design responsive et performance optimisée",
                features: ["React/Next.js 15", "TypeScript", "Tailwind CSS", "PWA Ready"],
                gradient: "from-blue-500 to-cyan-500",
                delay: "0s"
              },
              {
                icon: Server,
                title: "Backend & API",
                description: "Services backend robustes avec FastAPI et architecture microservices",
                features: ["FastAPI", "MongoDB", "Authentication", "Rate Limiting"],
                gradient: "from-purple-500 to-violet-500",
                delay: "0.2s"
              },
              {
                icon: Shield,
                title: "Sécurité & DevOps",
                description: "Déploiement sécurisé avec SSL, monitoring et sauvegardes automatiques",
                features: ["SSL/HTTPS", "CI/CD", "Monitoring", "Auto-scaling"],
                gradient: "from-green-500 to-emerald-500",
                delay: "0.4s"
              }
            ].map((service, index) => (
              <div key={index} className="group" style={{animationDelay: service.delay}}>
                <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 hover:border-cyan-400/50 rounded-2xl p-8 h-full transition-all duration-500 hover:transform hover:-translate-y-4 hover:shadow-2xl hover:shadow-cyan-400/20">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Contact WebCraft */}
      <section id="contact" className="py-20 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(180deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-cyan-400/30 rounded-full mb-6">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300 font-medium">Contact</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Lancez votre
              </span>
              <br />
              <span className="text-cyan-300">projet web</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Discutons de votre vision et créons ensemble une solution web sur mesure
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Formulaire */}
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Demander un devis</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Nom complet</label>
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
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
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
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Type de projet</label>
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
                  >
                    <option value="">Sélectionnez un type</option>
                    <option value="site-vitrine">Site vitrine</option>
                    <option value="e-commerce">E-commerce</option>
                    <option value="application-web">Application web</option>
                    <option value="api-backend">API Backend</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Description du projet</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all resize-none"
                    placeholder="Décrivez votre projet en détail..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
                  {!isSubmitting && <ArrowRight className="ml-2 w-5 h-5" />}
                </Button>

                {submitStatus === 'success' && (
                  <div className="text-green-400 text-center font-medium">
                    ✅ Demande envoyée ! Nous vous recontactons sous 24h.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="text-red-400 text-center font-medium">
                    ❌ Erreur d'envoi. Veuillez réessayer.
                  </div>
                )}
              </form>
            </div>

            {/* Informations de contact */}
            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  value: "contact@webcraft.fr",
                  description: "Réponse sous 2h",
                  color: "text-blue-400"
                },
                {
                  icon: Phone,
                  title: "Téléphone",
                  value: "+33 1 23 45 67 89",
                  description: "Lun-Ven 9h-19h",
                  color: "text-green-400"
                },
                {
                  icon: MapPin,
                  title: "Localisation",
                  value: "France, Europe",
                  description: "Remote & sur site",
                  color: "text-purple-400"
                },
                {
                  icon: Clock,
                  title: "Délais",
                  value: "5-15 jours",
                  description: "Selon complexité",
                  color: "text-orange-400"
                }
              ].map((contact, index) => (
                <div key={index} className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-4">
                    <contact.icon className={`w-6 h-6 ${contact.color}`} />
                    <div>
                      <h4 className="text-lg font-semibold text-white">{contact.title}</h4>
                      <p className="text-slate-300">{contact.value}</p>
                      <p className="text-sm text-slate-400">{contact.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
})

WebCraftHomePage.displayName = 'WebCraftHomePage'

export default WebCraftHomePage