import React from 'react'

import { Layout } from 'antd'

export const App = () => {
  const headerStyle: React.CSSProperties = {
    backgroundColor: '#4096ff',
    color: '#fff',
    height: 60,
    lineHeight: '64px',
    paddingInline: 48,
    textAlign: 'center',
  }
  const siderStyle: React.CSSProperties = {
    backgroundColor: '#1677ff',
    color: '#fff',
    lineHeight: '120px',
    textAlign: 'center',
  }
  const contentStyle: React.CSSProperties = {
    backgroundColor: '#001529',
    color: '#fff',
    minHeight: 'calc(100vh - 60px)',
    textAlign: 'center',
  }

  return (
    <Layout>
      <Layout.Header style={headerStyle}>Header</Layout.Header>
      <Layout>
        <Layout.Sider style={siderStyle} width={'25%'}>
          Sider
        </Layout.Sider>
        <Layout.Content style={contentStyle}>Content</Layout.Content>
      </Layout>
    </Layout>
  )
}
