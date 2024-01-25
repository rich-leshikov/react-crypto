import { AppContent } from '@/components/layout/AppContent'
import { AppHeader } from '@/components/layout/AppHeader'
import { AppSider } from '@/components/layout/AppSider'
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
