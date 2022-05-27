import React from 'react'
import { ViewStyle } from 'react-native'
import { apx, isIPhoneX } from '../utils/device'
import Col from './Col'

interface IProps {
  style?: ViewStyle;
}

const Container: React.FC<IProps> = ({ children, style }) => (
  <Col
    style={{
      width: apx(750),
      flex: 1,
      paddingBottom: isIPhoneX() ? apx(60) : 0,
      backgroundColor: '#0D0D0D',
      ...style,
    }}
    justify="start"
  >
    {children}
  </Col>
)

export default Container
