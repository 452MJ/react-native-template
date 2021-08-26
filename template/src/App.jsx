import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { lockToPortrait } from 'react-native-orientation'
import { create } from 'dva-core'
import { Dimensions, Platform, UIManager, View } from 'react-native'
import Entry from './entry'
// eslint-disable-next-line import/named
import { createApp } from './models/dva'
import models from './models/index'

console.disableYellowBox = true

if (!__DEV__) {
  global.console.log = () => {}
}

lockToPortrait()

const app = create()
models.forEach((model: any) => app.model(model))
app.start()

const store = app._store
global.$store = app._store

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

const App = () => {
  const onChange = ({ window, screen }) => {}

  useEffect(() => {
    Dimensions.addEventListener('change', onChange)
    return () => {
      Dimensions.removeEventListener('change', onChange)
    }
  })

  let width = Dimensions.get('window').width
  if (width > 600) {
    width = 600
  }

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <View style={{ flex: 1, width }}>
        <Provider store={store}>
          <Entry />
        </Provider>
      </View>
    </View>
  )
}

export default App
