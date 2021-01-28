import React, { memo } from 'react'
import Flex from '@ant-design/react-native/lib/flex'
import { FlexPropsType } from '@ant-design/react-native/lib/flex/PropsType'

function Col(props: FlexPropsType) {
  const { children, ...other } = props
  return (
    <Flex direction="column" {...other}>
      {children}
    </Flex>
  )
}
export default memo(Col)
