import React, { Component } from "react"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Animated,
  Dimensions,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from "react-native"
import { connect } from "react-redux"
import { getDefaultImages } from "../REDUX/Action"
import ImageBlock from "../Components/ImageBlock"
import { AntDesign } from "@expo/vector-icons"

export class MainScreen extends Component {
  state = {
    summonHeight: new Animated.Value(0),
    summonWidth: new Animated.Value(0),
    summonCoordinates: new Animated.ValueXY(0),
    actualHeight: Dimensions.get("screen").height,
    actualWidth: Dimensions.get("screen").width,
    hideStatusBar: false,
    fullURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhIVFRUVFRUXFxUVFRUVFRUVFRUWFxUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDw0NDisZFRkrKystLTctLS0tLS0rLSstNystNzcrKy0rLTctLS0tNy0tLSsrLS0rLTctLS03Ky0rK//AABEIAOEA4QMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAQIDB//EAB0QAQEBAAICAwAAAAAAAAAAAAABERKRQYECIWH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APH9TU0AKgC6WgBoaAaaixQNNQF1UgCiQoKalNBpEiyAsIRaByLUi0F5DKwFlXUNBdGMUGBF1ATTQFEgARUAVFUQoALAABQGYqaCqALIQAUqALCCQFVIUAQBlCiCLhAAWoC6gAGmgAi6oKACoAUhABYQAxSFAqooAagLFxmKBgAOYEQRcKoCAABgBQANCqKUAUgQEABYGICrGcWAqs61ASKmAKrMUBTiA54iiCAACoBCKkAAwBagooiwAEgKCghVSgspAgKuJhoNIrINCSiDWjOqDnUgUCrKyQFIIC0KQALABUwBQFCioCKYAIoAoAsEi2gqasSgKiwGuhkBjUoIBQ0DEXQEioQCVYiwC1UMUU0IgUIVRKACriLQRYEgLiCgFNAI1GZGqACg4lKiABABUAAAAAiwFF1ABSgAgUCLEaA1Yw1KCrqQ0AIoItolBelTiIOS0KAilAQMBUAACUCrqEUWFE0GiIAqEKCiLAFokBqVNRZQWKkAKUkIBoaA5mlMQAhgAAAJAWIChFgYChqAoAKhQBcTVBFABWVBopAAiRoEDBBzoqAioUBQBBaQECkUUNANVFARYgLBIqAqVVA1AFCkAq0AIqQtBrf0TAGEBBKLUAAAWRCAWkKmKNCFBYABQQBqMrKCrKzVoBAAqxJFAUKAGgLoaA5FBBRIUAAAKKJGmVBbEVICgAWmhgGGJFoKJAFgAKCAsLAgKqANehPsByMDUClADRFBAVRFTSgsEIDQIAomAoigYolAWJKSgoigosAFhADAUHFIoBEUQKeFAZICgUAVFAFoAJABasQAWADNPiANNQEFiTyCjTQAAA//2Q==",
    touchTheFullImage: false,
    fullScreenComponentsOpacity: new Animated.Value(0),
  }

  componentDidMount() {
    if (this.props.storeDefaultImages[0]) {
      console.log("Sup")
    } else {
      this.props.getDefaultImages()
    }
  }
  AnimatingToFullScreen = (x, y, width, height, fx, fy, urlSmall, urlBig) => {
    // console.log(`X is ${fx} Y is ${width}`)
    this.setState({
      fullURL: urlSmall,
      hideStatusBar: true,
    })
    this.state.summonWidth.setValue(width)
    this.state.summonHeight.setValue(height)
    this.state.summonCoordinates.x.setValue(fx)
    this.state.summonCoordinates.y.setValue(fy)
    Animated.parallel([
      Animated.spring(this.state.summonHeight, {
        toValue: this.state.actualHeight,
      }),
      Animated.spring(this.state.summonWidth, {
        toValue: this.state.actualWidth,
      }),
      Animated.spring(this.state.summonCoordinates.x, { toValue: 0 }),
      Animated.spring(this.state.summonCoordinates.y, { toValue: 0 }),
    ]).start(() => {
      this.setState({
        fullURL: urlBig,
        touchTheFullImage: true,
      })
      Animated.timing(this.state.fullScreenComponentsOpacity, {
        toValue: 1,
        duration: 1000,
      }).start()
    })
  }

  rendeerTHIS = () => {
    if (this.props.storeDefaultImages[0]) {
      return (
        <View style={{ flex: 1, backgroundColor: "rgb(17,20,42)" }}>
          <FlatList
            data={this.props.storeDefaultImages}
            keyExtractor={(x, y) => {
              return "KEY-" + y
            }}
            renderItem={({ index, item }) => {
              return (
                <ImageBlock
                  renderHere={this.AnimatingToFullScreen}
                  urls={item.urls}
                />
              )
            }}
            numColumns={3}
          />
        </View>
      )
    } else {
      return (
        <View>
          <Text style={{ color: "white" }}>NOOOOOOO</Text>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={mainStyle.container}>
        <StatusBar hidden={this.state.hideStatusBar} />
        <Animated.View
          style={{
            // backgroundColor: "rgba(140,24,239,0.5)",
            position: "absolute",
            zIndex: 1,
            height: this.state.summonHeight,
            width: this.state.summonWidth,
            top: this.state.summonCoordinates.y,
            left: this.state.summonCoordinates.x,
          }}
          pointerEvents={
            this.state.touchTheFullImage === false ? "none" : "auto"
          }
        >
          <ImageBackground
            source={{ uri: this.state.fullURL }}
            style={{
              flex: 1,
            }}
          >
            <Animated.View
              style={{ opacity: this.state.fullScreenComponentsOpacity }}
            >
              <TouchableOpacity>
                <AntDesign
                  name="closecircle"
                  style={{ fontSize: 30, color: "white", margin: 10 }}
                />
              </TouchableOpacity>
            </Animated.View>
          </ImageBackground>
        </Animated.View>
        <SafeAreaView style={{ flex: 1 }}>{this.rendeerTHIS()}</SafeAreaView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}
const mainStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(17,20,42)",
  },
})
const mapDispatchToProps = { getDefaultImages: getDefaultImages }

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
