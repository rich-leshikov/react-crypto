import { AppContent, AppHeader, AppSider } from '@/components'
import { useCrypto } from '@/context'
import { Layout, Spin } from 'antd'

export const AppLayout = () => {
  const { loading } = useCrypto()

  if (loading) {
    return <Spin fullscreen />
  }

  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  )
}
