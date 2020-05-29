import React, { Component } from "react"
import { Text, View, Animated, TouchableOpacity } from "react-native"

export class AboveScreen extends Component {
  render() {
    return (
      <Animated.View
        style={{
          position: "absolute",
          height: 100,
          width: 100,
          borderRadius: 100,
          backgroundColor: "rgba(0,0,0,0.5)",
          bottom: 5,
          right: 5,
          transform: [{ scale: this.props.aniScale }],
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
          }}
          onPress={() => {
            this.props.closeIT()
          }}
        ></TouchableOpacity>
      </Animated.View>
    )
  }
}

export default AboveScreen
