import { Dimensions, Keyboard, Platform, StatusBar } from 'react-native'

// iPhoneX
const X_WIDTH = 375
const X_HEIGHT = 812

const { width, height } = Dimensions.get('window')

export function isIPhoneX() {
  return (
    Platform.OS === 'ios' &&
    ((height >= X_HEIGHT && width >= X_WIDTH) ||
      (height >= X_WIDTH && width >= X_HEIGHT))
  )
}

const deviceWidth = width

const deviceHeight = height

const getStatusBarHeight = () => {
  if (Platform.OS === 'ios') {
    return isIPhoneX() ? 40 : 20
  }
  return Platform.Version >= 21 ? StatusBar.currentHeight : 0
}

const statusBarHeight = getStatusBarHeight()

export const apx = (size = 0) => (deviceWidth / 750) * size
export const apxInt = (size = 0) => parseInt((deviceWidth / 750) * size)

export const dismissKeyboard = Keyboard.dismiss

const titleBarHeight = statusBarHeight + apx(88)
const tabBarHeight = (isIPhoneX() ? 40 : 0) + apx(86)

export {
  deviceWidth,
  deviceHeight,
  statusBarHeight,
  titleBarHeight,
  tabBarHeight,
}
