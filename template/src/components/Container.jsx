import React from 'react'
import { apx, isIPhoneX } from '../utils/device'
import Col from './Col'

function Container(props) {
  return (
    <Col
      style={{
        width: apx(750),
        flex: 1,
        paddingBottom: isIPhoneX() ? apx(60) : 0,
        backgroundColor: '#F7F9FB',
        ...props.style,
      }}
      justify="start"
    >
      {props.children}
    </Col>
  )
}

export default Container
