import React, { memo } from 'react'
import { Text, TouchableOpacity, ViewPropTypes } from 'react-native'
import { apx } from '../utils/device'

interface IProps {
  theme?: 'light' | 'dark' | 'white';
  style?: ViewPropTypes.style;
  textStyle?: ViewPropTypes.style;
  text?: string;
  onPress?: void;
}

const Button = ({
                  theme = 'light',
                  style = {},
                  textStyle = {},
                  text = '',
                  onPress = () => {},
                }: IProps) => (
    <TouchableOpacity
        style={{
          width: apx(543),
          height: apx(72),
          borderRadius: apx(9),
          backgroundColor: {
            light: '#FF0062',
            dark: 'rgba(23,1,54,0.99)',
            white: '#fff',
          }[theme || 'light'],
          ...style,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={onPress}
    >
      <Text
          style={{
            color: {
              light: '#fff',
              dark: '#fff',
              white: '#E40051',
            }[theme || 'light'],
            fontSize: apx(33),
            fontWeight: 'bold',
            ...textStyle,
          }}
      >
        {text}
      </Text>
    </TouchableOpacity>
)

export default memo(Button)
