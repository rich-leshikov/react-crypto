import { useContext } from 'react'

import { AppContent, AppHeader, AppSider } from '@/components'
import { CryptoContext } from '@/context/crypto-context'
import { Layout, Spin } from 'antd'

export const AppLayout = () => {
  const { loading } = useContext(CryptoContext)

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
