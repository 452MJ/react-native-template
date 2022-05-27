import React, { memo } from 'react'

import { ViewStyle } from 'react-native'
import { apx } from '../utils/device'
import Row from './Row'

interface IProps {
  style?: ViewStyle;
  lineStyle?: ViewStyle;
}

function Divider({ style = {} }: IProps) {
  return (
    <Row
      style={{
        alignSelf: 'stretch',
        borderColor: '#545B61',
        borderTopWidth: apx(1),
        overflow: 'hidden',

        ...style,
      }}
    />
  )
}

export default memo(Divider)
