import React, { useEffect, useState } from 'react'

import { fakeFetchCrypto, fetchAssets } from '@/api'
import { CryptoAssets, CryptoDataResult } from '@/data'
import { capitalize, percentDifference } from '@/utils'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Card, Layout, List, Spin, Statistic, Tag, Typography } from 'antd'

const siderStyle: React.CSSProperties = {
  padding: '1rem',
}

export const AppSider = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [crypto, setCrypto] = useState<[] | CryptoDataResult>([])
  const [assets, setAssets] = useState<[] | CryptoAssets>([])

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

  useEffect(() => {
    const preload = async () => {
      setLoading(true)
      const { result } = await fakeFetchCrypto()
      const assets = await fetchAssets()

      setAssets(
        assets.map(asset => {
          const coin = result.find(c => c.id === asset.id)

          if (coin) {
            return {
              ...asset,
              grow: asset.price < coin.price,
              growPercent: percentDifference(asset.price, coin.price),
              totalAmount: asset.amount * coin.price,
              totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            }
          } else {
            return asset
          }
        })
      )
      setCrypto(result)
      setLoading(false)
    }

    preload()
  }, [])

  if (loading) {
    return <Spin fullscreen />
  }

  return (
    <Layout.Sider style={siderStyle} width={'25%'}>
      {assetsCards}
    </Layout.Sider>
  )
}
