import React, { memo } from 'react'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import { apx, statusBarHeight } from '../utils/device'
import SvgIcon from './SvgIcon'
import { FontFamily } from '../styles'
import Row from './Row'
import Touchable from './Touchable'

interface IProps {
  title: string;
  renderLeft?: React.ReactNode;
  renderRight?: React.ReactNode;
}

function TitleBar({
  title,
  renderLeft = (
    <Touchable
      contentContainerStyle={{
        width: apx(88),
        height: apx(92),
        paddingLeft: apx(40),
      }}
      align="start"
      onPress={() => {
        $navigation.goBack()
      }}
    >
      <SvgIcon icon="icon_back" style={{ width: apx(15), height: apx(24) }} />
    </Touchable>
  ),
  renderRight = null,
}: IProps) {
  return (
    <Row
      style={{
        width: apx(750),
        backgroundColor: '#fff',
        paddingTop: statusBarHeight,
      }}
    >
      <Row
        style={{
          width: apx(750),
          height: apx(92),
          paddingLeft: renderLeft ? apx(0) : apx(32),
          paddingRight: renderRight ? apx(0) : apx(32),
        }}
      >
        {renderLeft}
        <Text
          style={{
            flex: 1,
            fontSize: apx(34),
            fontWeight: '600',
            fontFamily: FontFamily.Bold,
            color: '#323F4B',
            textAlign: 'left',
          }}
          numberOfLines={1}
        >
          {title}
        </Text>
        {renderRight}
      </Row>
    </Row>
  )
}

export default memo(TitleBar)
