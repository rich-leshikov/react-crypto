import { FC } from 'react'

import { CoinInfo } from '@/components'
import { CryptoCoinData } from '@/data'
import { Divider, Tag, Typography } from 'antd'

type CoinInfoModalProps = { coin: CryptoCoinData | null }

export const CoinInfoModal: FC<CoinInfoModalProps> = ({ coin }) => {
  if (coin === null) {
    return <h2>No data</h2>
  }

  return (
    <>
      <CoinInfo coin={coin} isWithSymbol />
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
