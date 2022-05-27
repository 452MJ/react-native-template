import React, { forwardRef, useImperativeHandle, useState } from 'react'
import {
  ActivityIndicator,
  LayoutAnimation,
  StyleSheet,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import { apx } from '../utils/device'

export interface ILoadingIndicator {
  show: (enableMask?: boolean) => void;
  hide: () => void;
}
const LoadingIndicator = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const [mask, setMask] = useState(true)

  useImperativeHandle(ref, (): ILoadingIndicator => ({
    show: (enableMask?: boolean): void => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      setVisible(true)
      setMask(enableMask || false)
    },
    hide: (): void => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      setVisible(false)
    },
  }))

  if (!visible) {
    return null
  }

  return (
    <View
      style={
        mask
          ? [
              StyleSheet.absoluteFill,
              {
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]
          : {
              position: 'absolute',
              left: 0,
              right: 0,
              top: '50%',
              justifyContent: 'center',
              alignItems: 'center',
            }
      }
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: apx(8),
          width: apx(80),
          height: apx(80),
          backgroundColor: '#4E5459',
        }}
      >
        <ActivityIndicator size="small" color="white" />
      </View>
    </View>
  )
})

export default connect(state => state, null, null, { forwardRef: true })(
  LoadingIndicator
)
