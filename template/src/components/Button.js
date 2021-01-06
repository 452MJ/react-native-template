import React from 'react'
import { Text, TouchableOpacity, ViewPropTypes } from 'react-native'
import { apx } from '../utils/device'

export default
class Button extends React.Component<{
  theme?: 'light' | 'dark' | 'white',
  style?: ViewPropTypes.style,
  textStyle?: ViewPropTypes.style,
  text?: string,
  onPress?: Function,
}> {
  static defaultProps = {
    theme: 'light',
    style: {},
    textStyle: ViewPropTypes.style,
    text: 'text',
    onPress: () => {},
  }

  render() {
    return (
      <TouchableOpacity
        style={{
          width: apx(543),
          height: apx(72),
          borderRadius: apx(9),
          backgroundColor: {
            light: '#FF0062',
            dark: 'rgba(23,1,54,0.99)',
            white: '#fff',
          }[this.props.theme || 'light'],
          ...this.props.style,
          ...$styles.center,
        }}
        onPress={this.props.onPress}
      >
        <Text
          style={{
            color: {
              light: '#fff',
              dark: '#fff',
              white: '#E40051',
            }[this.props.theme || 'light'],
            fontSize: apx(33),
            fontWeight: 'bold',
            ...this.props.textStyle,
          }}
        >
          {this.props.text}
        </Text>
      </TouchableOpacity>
    )
  }
}
