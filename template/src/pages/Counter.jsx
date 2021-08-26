import React from 'react'
import { connect } from 'react-redux'
import { SafeAreaView, Text } from 'react-native'
import Touchable from '../components/Touchable'

function Counter() {
  return (
      <>
        <SafeAreaView>
          <Touchable onPress={() => $navigation.navigate('Counter')}>
            <Text style={{}}>1111</Text>
          </Touchable>
        </SafeAreaView>
      </>
  )
}

export default connect(state => state)(Counter)
