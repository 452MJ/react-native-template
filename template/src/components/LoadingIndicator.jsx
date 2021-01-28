import React, { PureComponent } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { apx, deviceHeight } from '../utils/device'

export default class LoadingIndicator extends PureComponent {
  static propTypes = {}

  static defaultProps = {}

  state = {
    isShowLoading: false,
    mask: true,
  }

  show = async (mask = false) => {
    // 默认显示遮罩层mask

    if (this.state.isShowLoading === false) {
      return this.setState(
        {
          mask,
          isShowLoading: true,
        },
        () => null
      )
    }
    return null
  }

  hide = async () => {
    if (this.state.isShowLoading === true) {
      return this.setState(
        {
          isShowLoading: false,
        },
        () => null
      )
    }
    return null
  }

  render() {
    if (this.state.isShowLoading === false) {
      return null
    }

    return (
      <View
        style={
          this.state.mask
            ? [
                StyleSheet.absoluteFill,
                $styles.center,
                { backgroundColor: 'rgba(0,0,0,0.5)' },
              ]
            : [
                {
                  position: 'absolute',
                  left: apx((750 - 170) / 2),
                  top: apx(deviceHeight - 85),
                },
              ]
        }
      >
        <View
          style={{
            ...$styles.center,
            borderRadius: apx(10),
            width: apx(170),
            height: apx(170),
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}
        >
          <ActivityIndicator size="large" color="white" />
          <Text
            style={{
              fontSize: apx(26),
              marginTop: apx(10),
              color: 'white',
            }}
          >
            Loading...
          </Text>
        </View>
      </View>
    )
  }
}
