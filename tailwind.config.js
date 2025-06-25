/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#1E3A8A', // Deep institutional blue - blue-800
        'secondary': '#64748B', // Professional slate gray - slate-500
        'accent': '#059669', // Success green - emerald-600
        
        // Background Colors
        'background': '#FAFAFA', // Warm off-white - gray-50
        'surface': '#FFFFFF', // Pure white - white
        
        // Text Colors
        'text-primary': '#1F2937', // Near-black - gray-800
        'text-secondary': '#6B7280', // Medium gray - gray-500
        
        // Status Colors
        'success': '#10B981', // Vibrant green - emerald-500
        'warning': '#F59E0B', // Amber - amber-500
        'error': '#DC2626', // Clear red - red-600
        
        // Border Colors
        'border': '#E5E7EB', // Light gray border - gray-200
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'caption': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      boxShadow: {
        'light': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        'DEFAULT': '6px',
      },
      transitionDuration: {
        '150': '150ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'auth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'slide-in': 'slideIn 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in': 'fadeIn 150ms ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}