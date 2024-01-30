import { AppLayout } from '@/components/layout/AppLayout'
import { CryptoContextProvider } from '@/context/crypto-context'

export const App = () => {
  return (
    <CryptoContextProvider>
      <AppLayout />
    </CryptoContextProvider>
  )
}
