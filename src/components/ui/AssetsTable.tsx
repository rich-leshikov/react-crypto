import React from 'react'

import { useCrypto } from '@/context'
import { Table, TableColumnsType } from 'antd'

type DataType = {
  amount: number
  key: React.Key
  name: string
  price: number
}

const columns: TableColumnsType<DataType> = [
  {
    dataIndex: 'name',
    sortDirections: ['descend'],
    sorter: (a, b) => a.name.length - b.name.length,
    title: 'Name',
  },
  {
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
    title: 'Price, $',
  },
  {
    dataIndex: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
    title: 'Amount',
  },
]

export const AssetsTable = () => {
  const { assets } = useCrypto()

  const data = assets.map(a => ({
    amount: a.amount,
    key: a.id,
    name: a.name,
    price: a.price,
  }))

  return <Table columns={columns} dataSource={data} pagination={false} />
}
