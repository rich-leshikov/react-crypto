import { FC } from 'react'

import { CryptoCoinData } from '@/data'
import { Flex, Typography } from 'antd'

type CoinInfoProps = {
  coin: CryptoCoinData
  isWithSymbol?: boolean
}

export const CoinInfo: FC<CoinInfoProps> = ({ coin }) => {
  return (
    <Flex align={'center'}>
      <img alt={coin.name} src={coin.icon} style={{ marginRight: '10px', width: '40px' }} />
      <Typography.Title level={2} style={{ margin: '0' }}>
        {coin.name}
      </Typography.Title>
    </Flex>
  )
}
