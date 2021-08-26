import React, { memo } from 'react'

import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet'
import { apx } from '../utils/device'
import Col from './Col'
import Row from './Row'

interface IProps {
  style?: ViewStyleProp;
  lineStyle?: ViewStyleProp;
}

function Divider({ style = {} }: IProps) {
  return (
    <Row
      style={{
        alignSelf: 'stretch',
        borderColor: '#EEF3F6',
        borderTopWidth: apx(2),
        overflow: 'hidden',

        ...style,
      }}
    />
  )
}

export default memo(Divider)
