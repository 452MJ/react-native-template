import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Provider } from '@ant-design/react-native'
import { StatusBar } from 'react-native'
import { setColor } from 'react-native-navbar-color'
import GlobalNavigation from './utils/GlobalNavigation'
import LoadingIndicator from './components/LoadingIndicator'
import styles from './styles'
import colors from './styles/colors'
import services from './services'
import storages from './utils/storages'
import Router from './router'
import ModalCodePush from './components/ModalCodePush'
import http from './utils/httpUtil'
import i18nUtil from './translations/i18n'
import CustomToast from './components/CustomToast'

global.$styles = styles
global.$colors = colors
global.$services = services
global.$navigation = GlobalNavigation
global.$storage = storages
global.$http = http
global.$i18n = i18nUtil

class Entry extends Component {
  async componentWillMount() {
    if (Platform.OS === 'android') {
      setColor('#000000')
    }

    const userInfo = (await $storage.getData($storage.KEYS.userInfo)) || {}
    if (userInfo) {
      $store.dispatch({ type: 'user/updateUserInfo', payload: userInfo })
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
    $store.dispatch({ type: 'settings/setLocale', payload: locale })
  }

  render() {
    return (
      <Provider>
        <StatusBar
          animated
          translucent
          // barStyle="light-content"
          // backgroundColor="rgba(0,0,0,0)"
        />
        <Router />

        <LoadingIndicator
          ref={ref => {
            global.$loading = ref
          }}
        />
        <CustomToast
          ref={ref => {
            global.$toast = {
              info: msg => {
                ref.info(msg)
              },
              success: msg => {
                ref.success(msg)
              },
              error: msg => {
                ref.error(msg)
              },
            }
          }}
        />
        <ModalCodePush
          ref={ref => {
            global.$codepush = ref
          }}
        />
      </Provider>
    )
  }
}

export default Entry
