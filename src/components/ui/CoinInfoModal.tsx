import { FC } from 'react'

import { CryptoCoinData } from '@/data'

type CoinInfoModalProps = { coin: CryptoCoinData | null }

export const CoinInfoModal: FC<CoinInfoModalProps> = ({ coin }) => {
  if (coin === null) {
    return <h2>No data</h2>
  }

  return <h2>{coin.name}</h2>
}
