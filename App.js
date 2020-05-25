import React from "react"
import { StyleSheet, View } from "react-native"
import myStore from "./SRC/REDUX/Store"
import { Provider, connect } from "react-redux"
import MainScreen from "./SRC/Screens/MainScreen"

class App extends React.Component {
  render() {
    return (
      <Provider store={myStore}>
        <MainScreen />
      </Provider>
    )
  }
}

export default App
