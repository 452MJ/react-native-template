import React from "react"
import { SafeAreaView, StatusBar, Text, TouchableOpacity } from "react-native"
import { connect } from "react-redux"

class Counter extends React.Component {


  render = () => (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <TouchableOpacity onPress={() => $store.dispatch({ type: "counter/addCounter", payload: {} })}>
          <Text style={{ color: "#fff" }}>{this.props.counter} 1111</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  )
}

export default connect(({ counter }) => ({ counter }))(Counter)
