import React, { Component } from "react"
import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native"

export class ImageBlock extends Component {
  constructor(props) {
    super(props)
    this._blockREF = React.createRef()
  }

  state = {
    actualHeight: Dimensions.get("screen").height,
    actualWidth: Dimensions.get("screen").width,
  }

  render() {
    var { urls, renderHere } = this.props
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        ref={this._blockREF}
        onPress={() => {
          this._blockREF.current.measure((x, y, width, height, fx, fy) => {
            renderHere(x, y, width, height, fx, fy, urls.small, urls.full)
          })
        }}
      >
        <ImageBackground
          source={{ uri: urls.small }}
          style={{
            flex: 1,
            height: this.state.actualWidth / 3,
            width: this.state.actualWidth / 3,
          }}
        />
      </TouchableOpacity>
    )
  }
}

export default ImageBlock
