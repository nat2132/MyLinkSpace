/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#060709',
          900: '#0A0C10',
          850: '#0F1217',
          800: '#14181E',
          700: '#1A1F26',
          600: '#222831',
        },
        line: {
          DEFAULT: '#21262E',
          strong: '#2E3540',
        },
        mist: {
          50: '#F3F5F8',
          100: '#D9DEE6',
          300: '#9BA5B2',
          500: '#66707F',
          700: '#414957',
        },
        ion: {
          DEFAULT: '#B6F24C',
          deep: '#9CD93A',
          dim: 'rgba(182, 242, 76, 0.12)',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          '"Cascadia Mono"',
          '"Segoe UI Mono"',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
      maxWidth: {
        shell: '72rem',
      },
      boxShadow: {
        card: '0 1px 0 0 rgba(255,255,255,0.03) inset, 0 8px 24px -12px rgba(0,0,0,0.6)',
        pop: '0 12px 40px -12px rgba(0,0,0,0.75)',
        glare: '0 0 0 1px rgba(182,242,76,0.35)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.45s cubic-bezier(0.22, 0.61, 0.36, 1) both',
        shimmer: 'shimmer 1.4s linear infinite',
      },
    },
  },
  plugins: [],
}
