import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {apx, isIPhoneX} from '../utils/device'

function Container(props) {
  return (
      <LinearGradient
          colors={
            props.style && props.style.backgroundColor
                ? [props.style.backgroundColor, props.style.backgroundColor]
                : ['#020202', '#020202']
          }
          useAngle
          angle={36}
          angleCenter={{x: 0.5, y: 0.5}}
          style={{
            width: apx(750),
            flex: 1,
            paddingBottom: isIPhoneX() ? apx(60) : 0,
            backgroundColor: '#000',
            alignItems: 'center',
            ...props.style,
          }}
      >
        {props.children}
      </LinearGradient>
  )
}

export default Container
