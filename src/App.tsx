import { AppContent, AppHeader, AppSider } from '@/components'
import { CryptoContextProvider } from '@/context/crypto-context'
import { Layout } from 'antd'

export const App = () => {
  return (
    <CryptoContextProvider>
      <Layout>
        <AppHeader />
        <Layout>
          <AppSider />
          <AppContent />
        </Layout>
      </Layout>
    </CryptoContextProvider>
  )
}
