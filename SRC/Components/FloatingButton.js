import React, { Component } from "react"
import {
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native"
import { Ionicons, Entypo } from "@expo/vector-icons"
import AboveScreen from "./AboveScreen"

export class FloatingButton extends Component {
  state = {
    shrinkTheOverLay: new Animated.Value(0),
    slideLeft: new Animated.Value(0),
  }
  render() {
    var closeIT = () => {
      Animated.timing(this.state.slideLeft, {
        toValue: 0,
        duration: 200,
      }).start(() => {
        Animated.spring(this.state.shrinkTheOverLay, {
          toValue: 0,
          /// duration: 200,
        }).start()
      })
    }

    //! INTERPOLATES
    var aniScale = this.state.shrinkTheOverLay.interpolate({
      inputRange: [0, 1],
      outputRange: [1, Dimensions.get("screen").height / 40],
    })

    var slideUP1 = this.state.shrinkTheOverLay.interpolate({
      inputRange: [0, 1],
      outputRange: [5, 125],
    })
    var rotROTATE = this.state.shrinkTheOverLay.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "90deg"],
    })
    var slideUP2 = this.state.shrinkTheOverLay.interpolate({
      inputRange: [0, 1],
      outputRange: [5, 210],
    })

    var slideSlide = this.state.slideLeft.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -70],
    })
    var slideOpacity = this.state.slideLeft.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    })
    // !RETURN
    return (
      <View>
        <View
          style={{
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              height: 100,
              width: 100,
              borderRadius: 100,
              backgroundColor: "rgb(17,20,42)",
              bottom: 5,
              right: 5,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 2,
            }}
            activeOpacity={1}
            ref={this._ballPOS}
            onPress={() => {
              Animated.spring(this.state.shrinkTheOverLay, {
                toValue: 1,
                /// duration: 200,
              }).start(() => {
                Animated.timing(this.state.slideLeft, {
                  toValue: 1,
                  duration: 200,
                }).start()
              })
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
              }}
            >
              Click
            </Text>
          </TouchableOpacity>

          {/* //!SMALL BUTTON ONE */}

          <Animated.View
            style={{
              height: 70,
              width: 70,
              borderRadius: 70,
              backgroundColor: "white",
              position: "absolute",
              bottom: slideUP1,
              right: 20,
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                borderRadius: 70,
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="md-refresh"
                size={24}
                color="rgb(17,20,42)"
                style={{ fontWeight: "bold" }}
              />
              <Animated.Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  transform: [{ translateX: slideSlide }],
                  opacity: slideOpacity,
                  position: "absolute",
                }}
              >
                Refresh
              </Animated.Text>
            </TouchableOpacity>
          </Animated.View>

          {/* //!SMALL BUTTON TWO */}

          <Animated.View
            style={{
              height: 70,
              width: 70,
              borderRadius: 70,
              backgroundColor: "white",
              position: "absolute",
              bottom: slideUP2,
              right: 20,
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                borderRadius: 70,
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="ios-information-circle-outline"
                size={24}
                color="rgb(17,20,42)"
                style={{ fontWeight: "bold" }}
              />
              <Animated.Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  transform: [{ translateX: slideSlide }],
                  opacity: slideOpacity,
                  position: "absolute",
                  zIndex: -10,
                }}
              >
                Get Info
              </Animated.Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        {/* //!OVERLAY */}
        <AboveScreen aniScale={aniScale} closeIT={closeIT} />
      </View>
    )
  }
}

export default FloatingButton
