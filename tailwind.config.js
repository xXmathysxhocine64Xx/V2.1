/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Mode sombre WebCraft
  theme: {
    extend: {
      screens: {
        'xs': '475px',  // Breakpoint mobile WebCraft
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        // Animations WebCraft conservées
        'float': 'float 3s ease-in-out infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-right': 'slideRight 15s linear infinite',
        'float-particle': 'floatParticle 5s ease-in-out infinite',
        'gradient-x': 'gradientX 3s ease infinite',
      },
      keyframes: {
        // Keyframes WebCraft
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100vw)' },
        },
        floatParticle: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      colors: {
        // Couleurs WebCraft
        theme: {
          bg: 'rgb(var(--background))',
          'bg-secondary': 'rgb(var(--background-secondary))',
          'bg-tertiary': 'rgb(var(--background-tertiary))',
          text: 'rgb(var(--foreground))',
          'text-secondary': 'rgb(var(--foreground-secondary))',
          'text-muted': 'rgb(var(--foreground-muted))',
          border: 'rgb(var(--border))',
          'border-secondary': 'rgb(var(--border-secondary))',
          card: 'rgb(var(--card-background))',
          'card-border': 'rgb(var(--card-border))',
        }
      }
    },
  },
  plugins: [],
}