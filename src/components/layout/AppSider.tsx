import React from 'react'

import { Layout } from 'antd'

const siderStyle: React.CSSProperties = {
  backgroundColor: '#1677ff',
  color: '#fff',
  lineHeight: '120px',
  textAlign: 'center',
}

export const AppSider = () => {
  return (
    <Layout.Sider style={siderStyle} width={'25%'}>
      Sider
    </Layout.Sider>
  )
}
