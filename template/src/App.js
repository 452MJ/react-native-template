import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'mobx-react'
import { lockToPortrait } from 'react-native-orientation'
import { rootStore } from './mobx'
import Entry from './entry'

console.disableYellowBox = true

global.$store = rootStore

if (!__DEV__) {
  global.console.log = () => {}
}

lockToPortrait()
const App = () => (
  <Provider store={rootStore}>
    <Entry />
  </Provider>
)

export default App
