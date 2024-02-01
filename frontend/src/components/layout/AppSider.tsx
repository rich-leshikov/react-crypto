import React from 'react'

import { useCrypto } from '@/context'
import { capitalize } from '@/utils'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Card, Layout, List, Statistic, Tag, Typography } from 'antd'

const siderStyle: React.CSSProperties = {
  backgroundColor: '#323646',
  padding: '1rem',
}

export const AppSider = () => {
  const { assets } = useCrypto()

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

  return (
    <Layout.Sider style={siderStyle} width={'25%'}>
      {assetsCards}
    </Layout.Sider>
  )
}
