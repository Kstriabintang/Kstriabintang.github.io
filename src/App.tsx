import { Suspense, lazy } from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import { LanguageProvider } from './lib/i18n'
import { SpotlightTracker } from './components/SpotlightTracker'
import { TabTitleEgg } from './components/TabTitleEgg'

const KonamiTerminal = lazy(() =>
  import('./components/KonamiTerminal').then((m) => ({ default: m.KonamiTerminal }))
)
const CommandPalette = lazy(() =>
  import('./components/CommandPalette').then((m) => ({ default: m.CommandPalette }))
)

export default function App() {
  return (
    <LanguageProvider>
      <Layout>
        <Home />
      </Layout>
      <Suspense fallback={null}>
        <CommandPalette />
        <KonamiTerminal />
      </Suspense>
      <SpotlightTracker />
      <TabTitleEgg />
    </LanguageProvider>
  )
}
