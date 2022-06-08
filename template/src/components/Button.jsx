import React, { memo } from 'react'
import { StyleSheet, Text, TextStyle, ViewStyle } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { apx } from '../utils/device'
import Col from './Col'
import Touchable from './Touchable'

interface IProps {
  theme?: 'gold' | 'gold-border';
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  textStyle?: TextStyle;
  text?: string;
  onPress?: () => any;
  clickable?: boolean;
  renderLeft?: React.ReactNode;
  renderRight?: React.ReactNode;
}

const Button = (props: IProps) => {
  const {
    theme = 'gold',
    style = {},
    contentContainerStyle = {},
    textStyle = {},
    text = '',
    onPress = () => {},
    clickable = true,
    renderLeft,
    renderRight,
  } = props

  const Touch = clickable ? Touchable : Col

  const clickableTheme = clickable ? theme : 'grey'

  return (
    <Touch
      style={{ ...style }}
      onPress={() => {
        if (!clickable) {
          return
        }
        onPress()
      }}
    >
      <LinearGradient
        colors={
          {
            gold: ['#F3E0BC', '#F3E0BC'],
            grey: ['#4E5459', '#4E5459'],
            'gold-border': ['#0D0D0D', '#0D0D0D'],
          }[clickableTheme] || ['#F3E0BC', '#F3E0BC']
        }
        useAngle
        angle={61}
        angleCenter={{ x: 0.5, y: 0.5 }}
        style={{
          borderRadius: apx(6),
          borderColor: '#EEF3F6',
          borderWidth: {
            gold: 0,
            grey: 0,
            'gold-border': StyleSheet.hairlineWidth,
          }[clickableTheme],
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          width: apx(650),
          height: apx(87),
          ...contentContainerStyle,
        }}
      >
        {renderLeft}
        <Text
          style={{
            color: {
              gold: '#26292A',
              grey: '#E9EDEF',
              'gold-border': '#F3E0BC',
            }[clickableTheme],
            fontSize: apx(32),
            fontWeight: '400',
            ...textStyle,
          }}
        >
          {text}
        </Text>

        {renderRight}
      </LinearGradient>
    </Touch>
  )
}

export default memo(Button)
