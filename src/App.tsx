import Layout from './components/Layout'
import Home from './pages/Home'
import { LanguageProvider } from './lib/i18n'
import { KonamiTerminal } from './components/KonamiTerminal'
import { CommandPalette } from './components/CommandPalette'
import { SpotlightTracker } from './components/SpotlightTracker'
import { TabTitleEgg } from './components/TabTitleEgg'

export default function App() {
  return (
    <LanguageProvider>
      <Layout>
        <Home />
      </Layout>
      <CommandPalette />
      <KonamiTerminal />
      <SpotlightTracker />
      <TabTitleEgg />
    </LanguageProvider>
  )
}
