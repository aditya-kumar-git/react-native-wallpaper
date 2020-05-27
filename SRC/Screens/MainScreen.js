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
  Easing,
  PanResponder,
  TextInput,
  Keyboard,
} from "react-native"
import { connect } from "react-redux"
import { getDefaultImages, getEditText, getSearchImages } from "../REDUX/Action"
import ImageBlock from "../Components/ImageBlock"
import { AntDesign, FontAwesome } from "@expo/vector-icons"

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
    moveTheFullScreenImage: new Animated.ValueXY(0),
  }

  componentDidMount() {
    if (this.props.storeDefaultImages[0]) {
      console.log("Sup")
    } else {
      this.props.getDefaultImages()
    }
  }
  // ! GO TO FULLSCREEN ANIMATION
  AnimatingToFullScreen = (x, y, width, height, fx, fy, urlSmall, urlBig) => {
    this.setState({
      fullURL: urlSmall,
      hideStatusBar: true,
    })
    this.state.summonWidth.setValue(width)
    this.state.summonHeight.setValue(height)
    this.state.summonCoordinates.x.setValue(fx)
    this.state.summonCoordinates.y.setValue(fy)
    Animated.parallel([
      Animated.timing(this.state.summonHeight, {
        toValue: this.state.actualHeight,
        duration: 300,
        easing: Easing.elastic(0.8),
      }),
      Animated.timing(this.state.summonWidth, {
        toValue: this.state.actualWidth,
        duration: 300,
        easing: Easing.elastic(0.8),
      }),
      Animated.timing(this.state.summonCoordinates.x, {
        toValue: 0,
        duration: 300,
        easing: Easing.elastic(0.8),
      }),
      Animated.timing(this.state.summonCoordinates.y, {
        toValue: 0,
        duration: 300,
        easing: Easing.elastic(0.8),
      }),
    ]).start(() => {
      this.setState({
        fullURL: urlBig,
        touchTheFullImage: true,
      })
      Animated.timing(this.state.fullScreenComponentsOpacity, {
        toValue: 1,
        duration: 100,
      }).start()
    })
  }

  //!COME BACK FROM FULLSCREEN

  comeBack = () => {
    this.setState({
      hideStatusBar: false,
    })
    this.state.fullScreenComponentsOpacity.setValue(0)
    Animated.parallel([
      Animated.timing(this.state.summonHeight, {
        toValue: this.props.storeImageInfo.height,
        duration: 200,
        easing: Easing.elastic(0.8),
      }),
      Animated.timing(this.state.summonWidth, {
        toValue: this.props.storeImageInfo.width,
        duration: 200,
        easing: Easing.elastic(0.8),
      }),
      Animated.timing(this.state.summonCoordinates.x, {
        toValue: this.props.storeImageInfo.fx,
        duration: 200,
        easing: Easing.elastic(0.8),
      }),
      Animated.timing(this.state.summonCoordinates.y, {
        toValue: this.props.storeImageInfo.fy,
        duration: 200,
        easing: Easing.elastic(0.8),
      }),
      Animated.timing(this.state.moveTheFullScreenImage.x, {
        toValue: 0,
        duration: 200,
        easing: Easing.elastic(0.8),
      }),
      Animated.timing(this.state.moveTheFullScreenImage.y, {
        toValue: 0,
        duration: 200,
        easing: Easing.elastic(0.8),
      }),
    ]).start(() => {
      this.state.summonHeight.setValue(0)
      this.state.summonWidth.setValue(0)

      this.setState({
        touchTheFullImage: false,
        fullURL:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhIVFRUVFRUXFxUVFRUVFRUVFRUWFxUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDw0NDisZFRkrKystLTctLS0tLS0rLSstNystNzcrKy0rLTctLS0tNy0tLSsrLS0rLTctLS03Ky0rK//AABEIAOEA4QMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAQIDB//EAB0QAQEBAAICAwAAAAAAAAAAAAABERKRQYECIWH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APH9TU0AKgC6WgBoaAaaixQNNQF1UgCiQoKalNBpEiyAsIRaByLUi0F5DKwFlXUNBdGMUGBF1ATTQFEgARUAVFUQoALAABQGYqaCqALIQAUqALCCQFVIUAQBlCiCLhAAWoC6gAGmgAi6oKACoAUhABYQAxSFAqooAagLFxmKBgAOYEQRcKoCAABgBQANCqKUAUgQEABYGICrGcWAqs61ASKmAKrMUBTiA54iiCAACoBCKkAAwBagooiwAEgKCghVSgspAgKuJhoNIrINCSiDWjOqDnUgUCrKyQFIIC0KQALABUwBQFCioCKYAIoAoAsEi2gqasSgKiwGuhkBjUoIBQ0DEXQEioQCVYiwC1UMUU0IgUIVRKACriLQRYEgLiCgFNAI1GZGqACg4lKiABABUAAAAAiwFF1ABSgAgUCLEaA1Yw1KCrqQ0AIoItolBelTiIOS0KAilAQMBUAACUCrqEUWFE0GiIAqEKCiLAFokBqVNRZQWKkAKUkIBoaA5mlMQAhgAAAJAWIChFgYChqAoAKhQBcTVBFABWVBopAAiRoEDBBzoqAioUBQBBaQECkUUNANVFARYgLBIqAqVVA1AFCkAq0AIqQtBrf0TAGEBBKLUAAAWRCAWkKmKNCFBYABQQBqMrKCrKzVoBAAqxJFAUKAGgLoaA5FBBRIUAAAKKJGmVBbEVICgAWmhgGGJFoKJAFgAKCAsLAgKqANehPsByMDUClADRFBAVRFTSgsEIDQIAomAoigYolAWJKSgoigosAFhADAUHFIoBEUQKeFAZICgUAVFAFoAJABasQAWADNPiANNQEFiTyCjTQAAA//2Q==",
      })
    })
  }

  // !GET IMAGES FROM API
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
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 40 }}>
            Loading...
          </Text>
        </View>
      )
    }
  }
  //!RENDER
  render() {
    //!PANRESPONDER
    var _panRES = PanResponder.create({
      onStartShouldSetPanResponder: () => {
        return true
      },
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.moveTheFullScreenImage.x,
          dy: this.state.moveTheFullScreenImage.y,
        },
      ]),
      onPanResponderRelease: (x, y) => {
        if (y.dy > 100 || y.dy < -100) {
          this.comeBack()
        } else {
          Animated.parallel([
            Animated.spring(this.state.moveTheFullScreenImage.x, {
              toValue: 0,
            }),
            Animated.spring(this.state.moveTheFullScreenImage.y, {
              toValue: 0,
            }),
          ]).start()
        }
      },
    })
    //! INTERPOLATE MOVEMENT
    var moveThisMuch = this.state.moveTheFullScreenImage.y.interpolate({
      inputRange: [-100, 100],
      outputRange: [-20, 20],
    })

    //!RETURN
    return (
      <View style={mainStyle.container}>
        <StatusBar hidden={this.state.hideStatusBar} />
        {/* FULL SCREEN IMAGE */}
        <Animated.View
          style={{
            position: "absolute",
            zIndex: 1,
            height: this.state.summonHeight,
            width: this.state.summonWidth,
            top: this.state.summonCoordinates.y,
            left: this.state.summonCoordinates.x,
            transform: [{ translateY: moveThisMuch }],
          }}
          {..._panRES.panHandlers}
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
              style={{
                opacity: this.state.fullScreenComponentsOpacity,
                position: "relative",
                flex: 1,
              }}
            >
              <TouchableOpacity onPress={this.comeBack}>
                <AntDesign
                  name="closecircle"
                  style={{
                    fontSize: 30,
                    color: "white",
                    margin: 10,
                    shadowColor: "black",
                    shadowOpacity: 0.5,
                    shadowOffset: { height: 1 },
                  }}
                />
              </TouchableOpacity>
            </Animated.View>
          </ImageBackground>
        </Animated.View>
        <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 40,
              textTransform: "uppercase",
              marginVertical: 10,
            }}
          >
            wallpapers
          </Text>
          {/* SEARCHBAR */}
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <TextInput
              style={{
                height: 30,
                width: 250,
                backgroundColor: "white",
                borderRadius: 20,
                textAlign: "center",
                marginBottom: 10,
                transform: [{ translateX: 15 }],
              }}
              placeholder="SEARCH"
              onChangeText={(x) => {
                this.props.getEditText(x)
              }}
              value={this.props.textEdit}
              onSubmitEditing={(x) => {
                if (x.nativeEvent.text !== "") {
                  this.props.getSearchImages(x.nativeEvent.text)
                  this.props.getEditText("")
                }
              }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                height: 30,
                width: 30,
                transform: [{ translateX: 30 }],
                borderRadius: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                if (this.props.textEdit !== "") {
                  this.props.getSearchImages(this.props.textEdit)
                  this.props.getEditText("")
                  Keyboard.dismiss()
                }
              }}
            >
              <FontAwesome name="search" size={18} color="rgb(17,20,42)" />
            </TouchableOpacity>
          </View>

          {/* IMAGES  */}
          <View style={{ flex: 1 }}>{this.rendeerTHIS()}</View>
        </SafeAreaView>
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
const mapDispatchToProps = {
  getDefaultImages: getDefaultImages,
  getEditText: getEditText,
  getSearchImages: getSearchImages,
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
