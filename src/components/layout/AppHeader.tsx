import { useEffect, useState } from 'react'

import { useCrypto } from '@/context/crypto-context'
import { Button, Layout, Modal, Select, Space } from 'antd'

/* eslint-disable */
const headerStyle: React.CSSProperties = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}
/* eslint-enable */

export const AppHeader = () => {
  const [select, setSelect] = useState<boolean>(false)
  const [modal, setModal] = useState<boolean>(true)
  const { crypto } = useCrypto()

  useEffect(() => {
    const keypress = (event: KeyboardEvent) => {
      if (event.key === '/') {
        setSelect(prev => !prev)
      }
    }

    document.addEventListener('keypress', keypress)

    return () => document.removeEventListener('keypress', keypress)
  }, [])

  const onSelect = (value: string) => {
    setModal(true)
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        onClick={() => setSelect(prev => !prev)}
        onSelect={onSelect}
        open={select}
        optionRender={options => (
          <Space>
            <img alt={options.data.label} src={options.data.icon} style={{ width: '20px' }} />
            {options.data.label}
          </Space>
        )}
        options={crypto.map(coin => ({
          icon: coin.icon,
          label: coin.name,
          value: coin.id,
        }))}
        style={{ width: '250px' }}
        value={['press / to open']}
      />
      <Button type={'primary'}>Add Asset</Button>
      <Modal footer={null} onCancel={() => setModal(false)} open={modal}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </Layout.Header>
  )
}
