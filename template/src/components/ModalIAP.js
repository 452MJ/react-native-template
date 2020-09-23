import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import { Flex } from '@ant-design/react-native'
import FastImage from 'react-native-fast-image'
import * as RNIap from 'react-native-iap'
import { apx } from '../utils/device'
import Button from './Button'

export default class ModalIAP extends React.PureComponent {
  state = {
    visible: false,
  }

  async componentDidMount() {
    const list = await $apis.user.getIap()
    await $store.user.setIap(list)
    const products = await RNIap.getProducts(list.map(({ id }) => id))
  }

  show = async () => {
    // 默认显示遮罩层mask
    this.setState({
      visible: true,
    })
  }

  hide = async () => {
    this.setState({
      visible: false,
    })
  }

  requestPurchase = async (sku: string) => {
    try {
      await RNIap.requestPurchase(sku, false)
    } catch (err) {
      console.warn(err.code, err.message)
    }
  }

  static skus = ['xcoin30', 'xcoin68', 'xcoin128', 'xcoin288', 'xcoin648']

  static subs = ['xcoin30', 'xcoin68', 'xcoin128', 'xcoin288', 'xcoin648']

  render = () => (
    <Modal
      useNativeDriver
      isVisible={this.state.visible}
      onBackdropPress={() => this.setState({ visible: false })}
      onBackButtonPress={() => this.setState({ visible: false })}
      style={{
        margin: 0,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: apx(600),
          backgroundColor: '#141316',

          alignItems: 'center',
          borderRadius: apx(5),
          overflow: 'hidden',
        }}
      >
        <Text
          style={{
            color: $colors.fff85,
            fontSize: apx(28),
            marginTop: apx(42),
            marginBottom: apx(22),
          }}
        >
          View this expert pick with
        </Text>

        <Flex style={{}} justify="center" align="center">
          <FastImage
            //source={require('../assets/images/me/diamond.png')}
            style={{
              width: apx(32),
              height: apx(29),
              marginLeft: apx(42),
              marginRight: apx(10),
            }}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: apx(28),
            }}
          >
            58M
          </Text>
        </Flex>

        <Text
          style={{
            width: apx(524),
            color: '#C51F1F',
            fontSize: apx(28),
            marginTop: apx(27),
            marginBottom: apx(56),
            textAlign: 'center',
          }}
        >
          Your diamonds are insufficient. Please top up first
        </Text>

        <Flex
          style={{ width: apx(600), height: apx(84), backgroundColor: '#000' }}
          justify="between"
          align="end"
        >
          <TouchableOpacity
            onPress={() => this.setState({ visible: false })}
            style={{
              width: apx(298),
              height: apx(80),
              ...$styles.center,
              backgroundColor: '#141316',
            }}
          >
            <Text
              style={{
                color: $colors.fff25,
                fontSize: apx(28),
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <Button
            text="Go Now"
            style={{ width: apx(298), height: apx(80), borderRadius: apx(0) }}
            textStyle={{
              color: '#fff',
              fontSize: apx(28),
            }}
            onPress={() =>
              this.setState({ visible: false }, () => this.requestPurchase())
            }
          />
        </Flex>
      </View>
    </Modal>
  )
}
