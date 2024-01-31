import React, { useEffect, useState } from 'react'

import { AddAssetForm, CoinInfoModal } from '@/components'
import { useCrypto } from '@/context'
import { CryptoCoinData } from '@/data'
import { Button, Drawer, Layout, Modal, Select, Space } from 'antd'

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
  const [modal, setModal] = useState<boolean>(false)
  const [drawer, setDrawer] = useState<boolean>(false)
  const [coin, setCoin] = useState<CryptoCoinData | null>(null)
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
    const searchedCoin = crypto.find(c => c.id === value)

    if (searchedCoin) {
      setCoin(searchedCoin)
    }
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
      <Button onClick={() => setDrawer(true)} type={'primary'}>
        Add Asset
      </Button>

      <Modal footer={null} onCancel={() => setModal(false)} open={modal}>
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer
        destroyOnClose
        onClose={() => setDrawer(false)}
        open={drawer}
        title={'Basic Drawer'}
        width={600}
      >
        <AddAssetForm />
      </Drawer>
    </Layout.Header>
  )
}
