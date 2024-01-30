import React, { useContext } from 'react'

import { CryptoContext } from '@/context/crypto-context'
import { capitalize } from '@/utils'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Card, Layout, List, Spin, Statistic, Tag, Typography } from 'antd'

const siderStyle: React.CSSProperties = {
  padding: '1rem',
}

export const AppSider = () => {
  const { assets, loading } = useContext(CryptoContext)

  const assetsCards = assets.map(asset => (
    <Card key={asset.id} style={{ marginBottom: '1rem' }}>
      <Statistic
        precision={2}
        prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        suffix={'$'}
        title={capitalize(asset.id)}
        value={asset.totalAmount}
        valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
      />
      <List
        dataSource={[
          { title: 'Total profit', value: asset.totalProfit, withTag: true },
          { isPlain: true, title: 'Asset amount', value: asset.amount },
        ]}
        renderItem={item => (
          <List.Item>
            <span>{item.title}</span>
            <span>
              {item.withTag && <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>}
              {item.isPlain && item.value}
              {!item.isPlain && (
                <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                  {item.value.toFixed(2)}$
                </Typography.Text>
              )}
            </span>
          </List.Item>
        )}
        size={'small'}
      />
    </Card>
  ))

  if (loading) {
    return <Spin fullscreen />
  }

  return (
    <Layout.Sider style={siderStyle} width={'25%'}>
      {assetsCards}
    </Layout.Sider>
  )
}
