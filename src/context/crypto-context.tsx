import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import { fakeFetchCrypto, fetchAssets } from '@/api'
import { CryptoAsset, CryptoAssets, CryptoDataResult } from '@/data'
import { percentDifference } from '@/utils'

type Context = {
  addAsset: (newAsset: CryptoAsset) => void
  assets: [] | CryptoAssets
  crypto: [] | CryptoDataResult
  loading: boolean
}

export const CryptoContext = createContext<Context>({
  addAsset: () => {},
  assets: [],
  crypto: [],
  loading: false,
})

export const CryptoContextProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [crypto, setCrypto] = useState<[] | CryptoDataResult>([])
  const [assets, setAssets] = useState<[] | CryptoAssets>([])

  const mapAssets = (assets: CryptoAssets, result: CryptoDataResult): CryptoAssets => {
    return assets.map(asset => {
      const coin = result.find(c => c.id === asset.id)

      if (coin) {
        return {
          ...asset,
          grow: asset.price < coin.price,
          growPercent: percentDifference(asset.price, coin.price),
          name: coin.name,
          totalAmount: asset.amount * coin.price,
          totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        }
      } else {
        return asset
      }
    })
  }

  const addAsset = (newAsset: CryptoAsset) => {
    setAssets(prev => mapAssets([...prev, newAsset], crypto))
  }

  useEffect(() => {
    const preload = async () => {
      setLoading(true)
      const { result } = await fakeFetchCrypto()
      const assets = await fetchAssets()

      setAssets(mapAssets(assets, result))
      setCrypto(result)
      setLoading(false)
    }

    preload()
  }, [])

  return (
    <CryptoContext.Provider value={{ addAsset, assets, crypto, loading }}>
      {children}
    </CryptoContext.Provider>
  )
}

export const useCrypto = () => {
  return useContext(CryptoContext)
}
