import presetIcons from '@unocss/preset-icons'
import presetWind from '@unocss/preset-wind'

export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page' },
    layoutTransition: { name: 'layout' },
  },
  $production: {
    runtimeConfig: {
      public: {
        // apiBase: 'http://127.0.0.1:8001/app',
        apiBase: 'https://admin.bondingtechs.com/api/app',
        apiUpload: 'https://admin.bondingtechs.com/api',
      }
    }
  },
  $development: {
    runtimeConfig: {
      public: {
        apiBase: 'http://127.0.0.1:8001/app',
        // apiBase: 'https://admin.bondingtechs.com/api/app',
        apiUpload: 'http://127.0.0.1:8001/',
      },
    }
  },
  srcDir: 'src',
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@unocss/nuxt',
    // '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@huntersofbook/naive-ui-nuxt',
  ],
  build: {
    transpile: [
      '@headlessui/vue',
      'swiper',
    ],
  },
  css: ['@/assets/sass/app.scss'],
  unocss: {
    uno: false,
    preflight: false,
    icons: true,
    presets: [
      presetIcons({
        scale: 1.2,
        extraProperties: {
          display: 'inline-block',
        },
      }),
      presetWind(),
    ],
    safelist: ['i-twemoji-flag-us-outlying-islands', 'i-twemoji-flag-turkey'],
    shortcuts: {
      'light-img': 'block dark:hidden',
      'dark-img': 'hidden dark:block',
      'cma': 'mx-auto w-full max-w-90em lt-sm:px-4',
      'fic': 'flex items-center',

      'p-c':
        'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',

      'pr': 'relative',
      'pa': 'absolute',
      'pf': 'fixed',
      'f-c': 'flex justify-center items-center',
      'f-c-c': 'f-c flex-col',

      'fc': 'flex justify-center',
      'fcc': 'flex justify-center items-center',
      'fs': 'flex justify-start',
      'fsc': 'flex justify-start items-center',
      'fe': 'flex justify-end',
      'fec': 'flex justify-end items-center',
      'fb': 'flex justify-between',
      'fbc': 'flex justify-between items-center',
      'fwr': 'flex flex-wrap justify-reverse',
      'fa': 'flex justify-around',
      'fac': 'flex justify-around items-center',

      'fccc': 'flex justify-center items-center flex-col',
    },
  },

  // localization - i18n config
  // i18n: {
  //   locales: [
  //     {
  //       code: 'en',
  //       file: 'en-US.json',
  //     },
  //     { code: 'tr', file: 'tr-TR.json' },
  //   ],
  //   defaultLocale: 'tr',
  //   lazy: true,
  //   langDir: 'locales/',
  //   strategy: 'prefix_except_default',
  //   detectBrowserLanguage: {
  //     useCookie: true,
  //     cookieKey: 'i18n_redirected',
  //     redirectOn: 'root', // recommended
  //   },
  //   vueI18n: {
  //     legacy: false,
  //     locale: 'tr',
  //     fallbackLocale: 'tr',
  //     availableLocales: ['en', 'tr'],
  //   },
  // },

  typescript: {
    tsConfig: {
      compilerOptions: {
        strict: true,
        types: ['@pinia/nuxt', './type.d.ts'],
      },
    },
  },
  colorMode: {
    classSuffix: '',
    fallback: 'light',
    storageKey: 'color-mode',
  },
  vite: {
    logLevel: 'info',
  },
  nitro: {
    hooks: {
      'dev:reload': () => require('sharp')
    }
  }
})
