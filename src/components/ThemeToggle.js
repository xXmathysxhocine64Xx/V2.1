'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

export default function ThemeToggle() {
  const { isDark, toggleTheme, mounted, isDarkModeEnabled } = useTheme()

  // Ne pas afficher si le mode sombre est désactivé ou si pas encore monté
  if (!mounted || !isDarkModeEnabled) {
    return null
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 md:top-6 md:right-6 p-3 glass-effect-strong rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
    >
      <div className="relative w-6 h-6">
        <Sun className={`absolute inset-0 w-6 h-6 text-yellow-500 transition-all duration-300 ${
          isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`} />
        <Moon className={`absolute inset-0 w-6 h-6 text-blue-400 transition-all duration-300 ${
          isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
        }`} />
      </div>
      
      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
    </button>
  )
}