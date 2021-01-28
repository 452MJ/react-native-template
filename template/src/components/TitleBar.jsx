import React, {memo} from 'react'

import {Text, TouchableOpacity, View} from 'react-native';
import {Flex} from '@ant-design/react-native';
import {apx, statusBarHeight} from '../utils/device';

interface IProps {
  title: string;
  renderLeft?: React.ReactNode;
  renderRight?: React.ReactNode;
}

const TitleBar = ({
                    title,
                    renderLeft = (
                        <TouchableOpacity
                            style={{
                              width: apx(89),
                              height: apx(94),
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            onPress={() => {
                              $navigation.goBack()
                            }}
                        >
                          <SvgIcon
                              icon="icon_back"
                              // source={require('../assets/images/common/back.png')}
                              style={{width: apx(28), height: apx(27)}}
                          />
                        </TouchableOpacity>
                    ),
                    renderRight = null,
                  }: IProps) => (
    <View
        style={{
          width: apx(750),
          backgroundColor: 'rgba(0,0,0,0.78)',
          paddingTop: statusBarHeight,
          position: 'absolute',
          top: 0,
          zIndex: 999,
        }}
    >
      <Flex style={{height: apx(88)}} justify="center">
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
              fontSize: apx(40),
              fontWeight: 'bold',
              color: '#FEFEFE',
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
      </Flex>
    </View>
)

export default memo(TitleBar)




