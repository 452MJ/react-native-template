import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Provider } from '@ant-design/react-native'
import { StatusBar } from 'react-native'
import { inject, observer } from 'mobx-react'
import { setColor } from 'react-native-navbar-color'
import { DURATION, POSITION, show, TYPE } from '@react-native-hero/toast'
import GlobalNavigation from './utils/GlobalNavigation'
import LoadingIndicator from './components/LoadingIndicator'
import styles from './styles'
import colors from './styles/colors'
import apis from './apis'
import ModalIAP from './components/ModalIAP'
import storages from './utils/storages'
import Router from './router'
import ModalCodePush from './components/ModalCodePush'
import http from './utils/httpUtil'
import i18nUtil from './translations/i18n'

global.$toast = {
  show: msg => {
    show({
      text: msg,
      // optional
      // as shown below, these are the default values
      type: TYPE.TEXT,
      duration: DURATION.SHORT,
      position: POSITION.CENTER,
    })
  },
}
global.$styles = styles
global.$colors = colors
global.$apis = apis
global.$navigation = GlobalNavigation
global.$storage = storages
global.$http = http
global.$i18n = i18nUtil

export default
@inject('store')
@observer
class Entry extends Component {
  async componentWillMount() {
    if (Platform.OS === 'android') {
      setColor('#000000')
    }

    const userInfo = (await $storage.getData($storage.KEYS.userInfo)) || {}
    if (userInfo) {
      // await $store.user.updateUserInfo()
      // $store.user.setLogin(true)
    }

    await this.initLocale()
  }

  initLocale = async () => {
    const defaultLocale = {
      isRTL: false,
      languageTag: 'zh-TW',
      countryCode: 'TW',
      languageCode: 'zh',
    }
    // 语言
    const locale =
      (await $storage.getData($storage.KEYS.locale)) || defaultLocale

    $i18n.setI18nConfig(locale)
    await this.props.store.settings.setLocale(locale)
  }

  render() {
    return (
      <Provider>
        <StatusBar
          animated
          translucent
          barStyle="light-content"
          backgroundColor="rgba(0,0,0,0)"
        />
        <Router />

        <LoadingIndicator
          ref={ref => {
            global.$loading = ref
          }}
        />
        <ModalCodePush
          ref={ref => {
            global.$codepush = ref
          }}
        />

        <ModalIAP
          ref={ref => {
            global.$iap = ref
          }}
        />
      </Provider>
    )
  }
}
