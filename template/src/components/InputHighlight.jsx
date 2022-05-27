import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { connect } from 'react-redux'

import { TextInput, TextInputProps, ViewStyle } from 'react-native'
import { apx } from '../utils/device'
import Row from './Row'

interface IProps extends TextInputProps {
  contentContainerStyle?: ViewStyle;
  style?: ViewStyle;
  renderLeft?: React.ReactNode;
  renderRight?: React.ReactNode;
}

const InputHighlight = forwardRef((props: IProps, ref) => {
  const {
    contentContainerStyle,
    renderLeft,
    renderRight,
    style,
    secureTextEntry,
    ...inputStyle
  } = props

  const inputRef = useRef()

  const [isFocused, setIsFocused] = useState(false)

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef?.current.focus()
    },
  }))

  return (
    <Row
      style={{
        borderBottomWidth: apx(2),
        borderColor: isFocused ? '#E9EDEF' : '#4E5459',
        ...contentContainerStyle,
      }}
      justify="center"
      align="center"
    >
      {renderLeft}
      <TextInput
        ref={inputRef}
        style={{
          flex: 1,
          margin: 0,
          padding: 0,
          paddingVertical: apx(40),
          color: '#E9EDEF',
          fontSize: apx(30),
          fontWeight: '600',
          ...style,
        }}
        secureTextEntry={secureTextEntry}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor="#4E5459"
        placeholder="请输入"
        {...inputStyle}
      />

      {renderRight || null}
    </Row>
  )
})

export default connect(state => state, null, null, { forwardRef: true })(
  InputHighlight
)
