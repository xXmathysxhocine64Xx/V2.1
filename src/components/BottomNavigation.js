'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Globe, FolderOpen, Server, Mail } from 'lucide-react'

export default function BottomNavigation() {
  const pathname = usePathname()

  const navigation = [
    {
      name: 'Accueil',
      href: '/',
      icon: Home
    },
    {
      name: 'Services',
      href: '/#services',
      icon: Globe
    },
    {
      name: 'Portfolio',
      href: '/portfolio',
      icon: FolderOpen
    },
    {
      name: 'À propos',
      href: '/apropos',
      icon: Server
    },
    {
      name: 'Contact',
      href: '/#contact',
      icon: Mail
    }
  ]

  const isActive = (href) => {
    if (href === '/') {
      return pathname === '/'
    }
    if (href.startsWith('/#')) {
      return pathname === '/' && window?.location?.hash === href.slice(1)
    }
    return pathname === href
  }

  const handleNavClick = (href) => {
    if (href.startsWith('/#')) {
      // Scroll vers la section si nous sommes déjà sur la page d'accueil
      if (pathname === '/') {
        const element = document.getElementById(href.slice(2))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        // Sinon naviguer vers la page d'accueil avec l'ancre
        if (typeof window !== 'undefined') {
          window.location.href = href
        }
      }
    }
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 safe-area-bottom">
      <div className="glass-effect-strong border-t border-white/20 dark:border-gray-700/20">
        <div className="grid grid-cols-5 py-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center py-2 px-1 transition-all duration-200 active:scale-95 ${
                  isActive(item.href)
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
                onClick={(e) => {
                  if (item.href.startsWith('/#')) {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }
                }}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1 transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium">{item.name}</span>
                {isActive(item.href) && (
                  <div className="w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full mt-1 animate-pulse" />
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}