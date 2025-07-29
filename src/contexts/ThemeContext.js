'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Flag pour activer/désactiver le mode sombre WebCraft
  const isDarkModeEnabled = process.env.NEXT_PUBLIC_ENABLE_DARK_MODE === 'true'

  // Initialiser le thème au montage
  useEffect(() => {
    // Mode sombre désactivé par défaut pour WebCraft
    if (!isDarkModeEnabled) {
      setIsDark(false)
      document.documentElement.classList.remove('dark')
      setMounted(true)
      return
    }

    // Récupérer la préférence sauvegardée - MODE CLAIR PAR DÉFAUT
    const savedTheme = localStorage.getItem('webcraft-theme')

    if (savedTheme === 'dark') {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    } else {
      // Mode clair par défaut WebCraft
      setIsDark(false)
      document.documentElement.classList.remove('dark')
    }
    
    setMounted(true)
  }, [isDarkModeEnabled])

  // Écouter les changements de préférence système
  useEffect(() => {
    if (!mounted || !isDarkModeEnabled) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      const savedTheme = localStorage.getItem('webcraft-theme')
      // Seulement changer si aucune préférence n'est sauvegardée
      if (!savedTheme) {
        setIsDark(e.matches)
        if (e.matches) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
    }

    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [mounted, isDarkModeEnabled])

  const toggleTheme = () => {
    // Ne pas permettre le basculement si le mode sombre est désactivé
    if (!isDarkModeEnabled) return
    
    const newTheme = !isDark
    setIsDark(newTheme)
    
    if (newTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('webcraft-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('webcraft-theme', 'light')
    }
  }

  const value = {
    isDark: isDarkModeEnabled ? isDark : false, // Force false si désactivé
    toggleTheme,
    mounted,
    isDarkModeEnabled // Exposer le flag pour les composants
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}