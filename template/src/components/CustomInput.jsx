import React, { forwardRef, useRef } from 'react'
import { connect } from 'react-redux'

import { Text, TextInput, TextInputProps, ViewStyle } from 'react-native'
import { apx } from '../utils/device'
import Row from './Row'

interface IProps extends TextInputProps {
  contentContainerStyle?: ViewStyle;
  style?: ViewStyle;
  label?: React.ReactNode;
}

const CustomInput = forwardRef((props: IProps) => {
  const { contentContainerStyle, style, secureTextEntry, ...inputStyle } = props

  const inputRef = useRef()

  return (
    <Row
      style={{
        width: apx(750),
        height: apx(100),
        paddingRight: apx(40),
        backgroundColor: '#3A3E40',
        ...contentContainerStyle,
      }}
      justify="center"
      align="center"
    >
      <Text
        style={{
          width: apx(182),
          textAlign: 'left',
          color: '#E9EDEF',
          paddingLeft: apx(40),
          fontSize: apx(28),
        }}
      >
        {props.label}
      </Text>
      <TextInput
        ref={inputRef}
        style={{
          flex: 1,
          margin: 0,
          padding: 0,
          color: '#E9EDEF',
          fontSize: apx(28),
          fontWeight: '600',
          ...style,
        }}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#86919A"
        {...inputStyle}
      />
    </Row>
  )
})

export default connect(state => state, null, null, { forwardRef: true })(
  CustomInput
)
