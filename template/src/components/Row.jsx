import React, { memo } from 'react'
import Flex from '@ant-design/react-native/lib/flex'
import { FlexPropsType } from '@ant-design/react-native/lib/flex/PropsType'

const Row = (props: FlexPropsType) => {
  const { children, ...other } = props
  return <Flex {...other}>{children}</Flex>
}

export default memo(Row)
