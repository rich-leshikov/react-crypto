import { AppLayout } from '@/components'
import { CryptoContextProvider } from '@/context'

export const App = () => {
  return (
    <CryptoContextProvider>
      <AppLayout />
    </CryptoContextProvider>
  )
}
