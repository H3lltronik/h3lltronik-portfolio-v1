module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        'primary': "#161515",
        'secondary': "#FFFFFF",
        'light': "#9E9E9E",
        'console-highlight': "#FFFF00",
        'placeholder': "rgba(255, 255, 255, 0.5)",
      },
      fontFamily: {
        'primary': "Decker, sans-serif",
        'secondary': "Inter, sans-serif",
        'console': "Inconsolata, sans-serif",
      },
      height: {
      },
      width: {
      },
      lineHeight: {
      },
      zIndex: {
        behind: '-10'
      },
      container: {
      },
      screens: {
        xxl: '1921px'
      },
      letterSpacing: {
        'wide': '0.13em',
        'wider': '0.17em',
        'widest': '0.32em',
      },
      fontSize: {
        'title-1': '119px',
        'title-2': '74px',
        'title-3': '36px',
        'headline-1': '48px',
        'headline-2': '22px',
        'headline-3': '18px',
        'body-1': '18px',
        'body-2': '16px',
        'body-3': '14px',
      },
      keyframes: {
        'hard-pulse': {
          '50%': { opacity: 1 },
          '50.1%': { opacity: 0 },
          '99%': { opacity: 0 },
          '99.1%': { opacity: 1 },
        }
      },
      animation: {
        'spin-slow': 'spin 100s linear infinite',
        'hard-pulse': 'hard-pulse 1s ease-in-out infinite',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'font-family': theme('fontFamily.secondary'),
            color: theme('colors.secondary'),
            h1: {
              color: theme('colors.secondary'),
            },
            h2: {
              color: theme('colors.secondary'),
            },
            h3: {
              color: theme('colors.secondary'),
            },
            h4: {
              color: theme('colors.secondary'),
            },
            strong: {
              color: theme('colors.secondary'),
            },
            blockquote: {
              color: theme('colors.secondary'),
            },
            th: {
              color: theme('colors.light'),
            },
            code: {
              color: theme('colors.secondary'),
              background: '#1f2937',
              'border-radius': '5px',
            },
            a: {
              color: theme('colors.purple.500'),
              '&:hover': {
                color: theme('colors.red.500'),
              },
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
