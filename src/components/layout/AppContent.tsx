import React from 'react'

import { Layout } from 'antd'

const contentStyle: React.CSSProperties = {
  backgroundColor: '#001529',
  color: '#fff',
  minHeight: 'calc(100vh - 60px)',
  padding: '1rem',
  textAlign: 'center',
}

export const AppContent = () => {
  return <Layout.Content style={contentStyle}>Content</Layout.Content>
}
