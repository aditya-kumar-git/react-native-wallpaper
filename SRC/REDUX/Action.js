import Axios from "axios"

export var getDefaultImages = () => {
  return async (dispatch) => {
    var output = await Axios({
      url: "https://api.unsplash.com/photos/random",
      params: {
        client_id: "B-8bCs5hXK3e3nTBkQ-IYMh21m8yOvUj76V54ZeoTUU",
        count: 30,
      },
    })
    try {
      dispatch({
        type: "DEFAULT",
        payload: output.data,
      })
    } catch (er) {
      console.log(er)
    }
  }
}

export var getImageInfo = (x, y, width, height, fx, fy, urlSmall, urlFull) => {
  return {
    type: "INFO",
    payload: { x, y, width, height, fx, fy, urlSmall, urlFull },
  }
}
