import React, { useEffect, useState } from 'react'

import { fakeFetchCrypto, fetchAssets } from '@/api'
import { CryptoAssets, CryptoDataResult } from '@/data'
import { percentDifference } from '@/utils'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Card, Layout, List, Spin, Statistic, Typography } from 'antd'

const siderStyle: React.CSSProperties = {
  padding: '1rem',
}

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
]

export const AppSider = () => {
  return (
    <Layout.Sider style={siderStyle} width={'25%'}>
      <Card style={{ marginBottom: '1rem' }}>
        <Statistic
          precision={2}
          prefix={<ArrowUpOutlined />}
          suffix={'%'}
          title={'Active'}
          value={11.28}
          valueStyle={{ color: '#3f8600' }}
        />
        <List
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <Typography.Text mark>[ITEM]</Typography.Text> {item}
            </List.Item>
          )}
          size={'small'}
        />
      </Card>
      <Card>
        <Statistic
          precision={2}
          prefix={<ArrowDownOutlined />}
          suffix={'%'}
          title={'Idle'}
          value={9.3}
          valueStyle={{ color: '#cf1322' }}
        />
      </Card>
    </Layout.Sider>
  )
}
