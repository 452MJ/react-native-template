import React from 'react'
import { Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { apx, statusBarHeight } from '../utils/device'
import Row from './Row'
import Touchable from './Touchable'

interface IProps {
  title: string;
  renderLeft?: React.ReactNode;
  renderRight?: React.ReactNode;
}

const TitleBar: React.FC<IProps> = ({
  title,
  renderLeft = (
    <Touchable
      onPress={() => {
        $navigation.goBack()
      }}
    >
      <FastImage
        source={require('../assets/images/arrow_left.png')}
        style={{
          width: apx(50),
          height: apx(50),
          marginHorizontal: apx(40),
          marginVertical: apx(25),
        }}
      />
    </Touchable>
  ),
  renderRight = null,
}) => (
  <Row
    style={{
      width: apx(750),
      backgroundColor: '#0D0D0D',
      paddingTop: statusBarHeight,
    }}
  >
    <Row
      style={{
        width: apx(750),
        height: apx(100),
      }}
    >
      <View
        style={{
          position: 'absolute',
          left: 0,
        }}
      >
        {renderLeft}
      </View>
      <Text
        style={{
          width: apx(450),
          fontSize: apx(32),
          fontWeight: '600',
          color: '#A6B4BF',
          textAlign: 'center',
        }}
        numberOfLines={1}
      >
        {title}
      </Text>
      <View
        style={{
          position: 'absolute',
          right: 0,
        }}
      >
        {renderRight}
      </View>
    </Row>
  </Row>
)

export default TitleBar
