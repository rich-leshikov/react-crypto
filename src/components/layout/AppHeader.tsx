import React from 'react'

import { Layout } from 'antd'

const headerStyle: React.CSSProperties = {
  backgroundColor: '#4096ff',
  color: '#fff',
  height: 60,
  lineHeight: '64px',
  paddingInline: 48,
  textAlign: 'center',
}

export const AppHeader = () => {
  return <Layout.Header style={headerStyle}>Header</Layout.Header>
}
