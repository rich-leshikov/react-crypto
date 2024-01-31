import { FC } from 'react'

import { CryptoCoinData } from '@/data'
import { Divider, Flex, Tag, Typography } from 'antd'

type CoinInfoModalProps = { coin: CryptoCoinData | null }

export const CoinInfoModal: FC<CoinInfoModalProps> = ({ coin }) => {
  if (coin === null) {
    return <h2>No data</h2>
  }

  return (
    <>
      <Flex align={'center'}>
        <img alt={coin.name} src={coin.icon} style={{ marginRight: '10px', width: '40px' }} />
        <Typography.Title level={2} style={{ margin: '0' }}>
          ({coin.symbol}) {coin.name}
        </Typography.Title>
      </Flex>
      <Divider />
      <Typography.Paragraph>
        <Typography.Text strong>1 hour: </Typography.Text>
        <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>{coin.priceChange1h}%</Tag>
        <Typography.Text strong>1 day: </Typography.Text>
        <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>{coin.priceChange1d}%</Tag>
        <Typography.Text strong>1 week: </Typography.Text>
        <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>{coin.priceChange1w}%</Tag>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Price: </Typography.Text>
        {coin.price.toFixed(2)}$
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Price BTC: </Typography.Text>
        {coin.priceBtc.toFixed(10)}₿
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Market Capitalization: </Typography.Text>
        {coin.marketCap.toFixed(2)}$
      </Typography.Paragraph>
      {coin.contractAddress && (
        <Typography.Paragraph>
          <Typography.Text strong>Contract Address: </Typography.Text>
          {coin.contractAddress}
        </Typography.Paragraph>
      )}
    </>
  )
}
