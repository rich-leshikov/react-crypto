import { AppContent, AppHeader, AppSider } from '@/components'
import { Layout } from 'antd'

export const App = () => {
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
