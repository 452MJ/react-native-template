import React from "react"
import {connect} from "react-redux"

function Counter() {
  return (<>
    <StatusBar barStyle="dark-content"/>
    <SafeAreaView>
      <TouchableOpacity onPress={() => $store.dispatch({type: "counter/addCounter", payload: {}})}>
        <Text style={{color: "#fff"}}>{this.props.counter} 1111</Text>
      </TouchableOpacity>
    </SafeAreaView>
  </>)
}

export default connect(({counter}) => ({counter}))(Counter)
