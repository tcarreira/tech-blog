import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'

import { Layout } from 'components/Layout'

import 'tailwindcss/tailwind.css'
import 'styles/main.scss'
import 'styles/fonts.css'
import 'styles/prism-theme.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default appWithTranslation(MyApp)
