import React from 'react'
import Flex from '@ant-design/react-native/lib/flex'
import { FlexPropsType } from '@ant-design/react-native/lib/flex/PropsType'

export default class Row extends React.Component<FlexPropsType> {
  state = {}

  render() {
    const { children, ...other } = this.props
    return <Flex {...other}>{children}</Flex>
  }
}
