import PropTypes from 'prop-types';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Flex} from '@ant-design/react-native';
import {apx, statusBarHeight} from '../utils/device';

export default class TitleBar extends React.PureComponent {
  static propTypes = {
    renderLeft: PropTypes.func,
    renderRight: PropTypes.func,
    title: PropTypes.string,
  }

  static defaultProps = {
    title: '',
    renderLeft: () => (
      <TouchableOpacity
        style={{
          height: apx(88),
          paddingHorizontal: apx(30),
          ...$styles.center,
        }}
        onPress={() => {
          $navigation.goBack()
        }}
      >
        {/* <SvgIcon */}
        {/*  icon="icon_back" */}
        {/*  // source={require('../assets/images/common/back.png')} */}
        {/*  style={{ width: apx(28), height: apx(27) }} */}
        {/* /> */}
      </TouchableOpacity>
    ),
    renderRight: () => null,
  }

  render() {
    return (
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
        <Flex style={{ height: apx(88) }} justify="center">
          <View
            style={{
              position: 'absolute',
              left: 0,
            }}
          >
            {this.props.renderLeft()}
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
            {this.props.title}
          </Text>
          <View
            style={{
              position: 'absolute',
              right: 0,
            }}
          >
            {this.props.renderRight()}
          </View>
        </Flex>
      </View>
    )
  }
}
