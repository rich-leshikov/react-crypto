import { useState } from 'react'

import { CoinInfo } from '@/components/ui/AddAssetForm/CoinInfo'
import { useCrypto } from '@/context'
import { CryptoCoinData } from '@/data'
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
  const [coin, setCoin] = useState<CryptoCoinData | null>(null)
  const [form] = Form.useForm()
  const { crypto } = useCrypto()

  const onFinish = (values: any) => {
    console.log('Success:', values)
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
