import { useRef, useState } from 'react'

import { CoinInfo } from '@/components'
import { useCrypto } from '@/context'
import { CryptoAsset, CryptoCoinData } from '@/data'
import { Button, DatePicker, Divider, Form, InputNumber, Result, Select, Space } from 'antd'

type FieldType = {
  amount?: number
  date?: string
  price?: number
  total?: number
}

const validateMessages = {
  number: {
    range: '"${label}" must be between ${min} and ${max}!',
  },
  required: '"${label}" is required!',
  types: {
    number: '"${label}" is not valid number!',
  },
}

export const AddAssetForm = () => {
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [coin, setCoin] = useState<CryptoCoinData | null>(null)
  const [form] = Form.useForm()
  const { addAsset, crypto } = useCrypto()
  const assetRef = useRef<CryptoAsset>()

  const onFinish = (values: { amount: number; date: Date; price: number }) => {
    if (coin) {
      const newAsset: CryptoAsset = {
        /* eslint-disable */
        id: coin.id,
        amount: values.amount,
        price: values.price,
        date: values.date ?? new Date(),
        grow: false,
        growPercent: 0,
        totalAmount: 0,
        totalProfit: 0,
        /* eslint-enable */
      }

      assetRef.current = newAsset
      addAsset(newAsset)
    }

    setSubmitted(true)
  }

  const onAmountChange = (value: null | number) => {
    const price = form.getFieldValue('price')

    if (value) {
      form.setFieldsValue({ total: +(value * price).toFixed(2) })
    } else {
      form.setFieldsValue({ total: 0 })
    }
  }

  const onPriceChange = (value: null | number) => {
    const amount = form.getFieldValue('amount')

    if (value) {
      form.setFieldsValue({ total: +(value * amount).toFixed(2) })
    } else {
      form.setFieldsValue({ total: 0 })
    }
  }

  if (submitted) {
    return (
      <Result
        extra={[
          <Button key={'console'} onClick={() => setSubmitted(false)} type={'primary'}>
            Close
          </Button>,
        ]}
        status={'success'}
        subTitle={`Added ${assetRef.current?.amount} of ${coin?.name} by price ${assetRef.current?.price}`}
        title={'Your asset has been added successfully!'}
      />
    )
  }

  if (!coin) {
    return (
      <Select
        onSelect={v => setCoin(crypto.find(c => c.id === v) || null)}
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
        placeholder={'Select coin'}
        style={{ width: '100%' }}
      />
    )
  }

  return (
    <Form
      form={form}
      initialValues={{ price: +coin.price.toFixed(2) }}
      labelCol={{ span: 4 }}
      name={'basic'}
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      validateMessages={validateMessages}
      wrapperCol={{ span: 10 }}
    >
      <CoinInfo coin={coin} />
      <Divider />

      <Form.Item<FieldType>
        label={'Amount'}
        name={'amount'}
        rules={[{ min: 0, required: true, type: 'number' }]}
      >
        <InputNumber
          onChange={onAmountChange}
          placeholder={'Enter coin amount'}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item<FieldType> label={'Price'} name={'price'}>
        <InputNumber onChange={onPriceChange} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item<FieldType> label={'Date & time'} name={'date'}>
        <DatePicker showTime style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item<FieldType> label={'Total'} name={'total'}>
        <InputNumber disabled style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <Button htmlType={'submit'} type={'primary'}>
          Add asset
        </Button>
      </Form.Item>
    </Form>
  )
}
