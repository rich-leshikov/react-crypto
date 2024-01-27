import { CryptoAssets, CryptoData, cryptoAssets, cryptoData } from '@/data'

export const fakeFetchCrypto = (): Promise<CryptoData> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cryptoData)
    }, 2000)
  })
}

export const fetchAssets = (): Promise<CryptoAssets> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cryptoAssets)
    }, 2000)
  })
}
