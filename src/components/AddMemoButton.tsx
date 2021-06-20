import React from 'react'

import { FormOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import Link from 'next/link'

function AddMemoButton() {
  return (
    <>
      <Card
        key={`AddCardButton_Card`}
        style={{
          width: 300,
          textAlign: 'center',
          verticalAlign: 'middle',
          opacity: 0.5,
        }}
        size={'default'}>
        <Link href={`/editor?`}>
          <FormOutlined style={{ fontSize: '50px' }} />
        </Link>
      </Card>
    </>
  )
}

export default AddMemoButton
