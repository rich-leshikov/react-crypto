import React from 'react'

import { AssetsTable, PortfolioChart } from '@/components'
import { useCrypto } from '@/context'
import { Layout, Typography } from 'antd'

const contentStyle: React.CSSProperties = {
  backgroundColor: '#001529',
  color: '#fff',
  minHeight: 'calc(100vh - 60px)',
  padding: '1rem',
  textAlign: 'center',
}

export const AppContent = () => {
  const { assets, crypto } = useCrypto()

  const total = assets
    .map(asset => {
      const coin = crypto.find(c => c.id === asset.id)

      if (coin) {
        return asset.amount * coin.price
      } else {
        return 0
      }
    })
    .reduce((acc, v) => (acc += v), 0)
    .toFixed(2)

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ color: '#fff', textAlign: 'left' }}>
        Portfolio: {total}$
      </Typography.Title>
      <PortfolioChart />
    </Layout.Content>
  )
}
