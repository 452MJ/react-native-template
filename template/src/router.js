// In App.js in a new project

import 'react-native-gesture-handler'
import * as React from 'react'
import { Dimensions, Text, TouchableWithoutFeedback } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import GlobalNavigation, { navigationRef } from './utils/GlobalNavigation'
import Welcome from './pages/Auth/Welcome'
import { apx, isIPhoneX } from './utils/device'
import Col from './components/Col'
import Row from './components/Row'

global.$navigation = GlobalNavigation

const Tab = createMaterialTopTabNavigator()

const renderTabBar = ({ state, descriptors, navigation }) => (
  <Row
    style={{
      backgroundColor: '#040308',
      paddingBottom: isIPhoneX() ? apx(60) : 0,
    }}
  >
    {state.routes.map((route, index) => {
      const { options } = descriptors[route.key]
      const routeName = route.name

      const isFocused = state.index === index

      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        })

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name)
        }
      }

      const tabLabels = {
        Welcome: '欢迎',
        Settings: '设置',
      }

      return (
        <TouchableWithoutFeedback
          key={index.toString()}
          accessibilityRole="button"
          accessibilityStates={isFocused ? ['selected'] : []}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
        >
          <Col
            style={{
              width: apx(750 / Object.keys(tabLabels).length),
              height: apx(90),
              ...$styles.center,
            }}
          >
            {/* <SvgIcon */}
            {/*  icon={icons[routeName][isFocused ? 'selected' : 'normal']} */}
            {/*  size={apx(54)} */}
            {/* /> */}
            <Text
              style={{
                fontSize: apx(14),
                marginTop: apx(9),
                color: isFocused ? '#FF0062' : '#fff',
              }}
            >
              {tabLabels[routeName]}
            </Text>
          </Col>
        </TouchableWithoutFeedback>
      )
    })}
  </Row>
)

function TabScreen() {
  return (
    <Tab.Navigator
      // initialRouteName="Diamond"
      headerMode="none"
      tabBarPosition="bottom"
      tabBar={renderTabBar}
      keyboardDismissMode="on-drag"
      initialLayout={{ width: Dimensions.get('window').width }}
      sceneContainerStyle={{
        backgroundColor: '#000',
        // paddingBottom: isIPhoneX() ? apx(60) : 0,
      }}
    >
      <Tab.Screen name="Welcome" component={Welcome} />
      <Tab.Screen name="Settings" component={Welcome} />
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator()
const Root = createStackNavigator()

function StackScreen() {
  return (
    <Stack.Navigator
      // initialRouteName={__DEV__ ? 'Tab' : 'Welcome'}
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      })}
      mode="card"
    >
      <Stack.Screen name="Tab" component={TabScreen} initialParams={{}} />
    </Stack.Navigator>
  )
}

function Router() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Root.Navigator
        mode="modal"
        screenOptions={({ route, navigation }) => ({
          headerShown: false,
          gestureEnabled: false,
        })}
      >
        <Root.Screen name="Main" component={StackScreen} />
        <Root.Screen name="ModalScreen" component={Welcome} />
      </Root.Navigator>
    </NavigationContainer>
  )
}

export default Router
