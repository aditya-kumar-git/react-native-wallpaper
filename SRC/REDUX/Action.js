import Axios from "axios"

export var getDefaultImages = () => {
  return async (dispatch) => {
    var output = await Axios({
      url: "https://api.unsplash.com/photos/random",
      params: {
        client_id: "",
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
export var getSearchImages = (searchThis) => {
  return async (dispatch) => {
    var output = await Axios({
      url: "https://api.unsplash.com/search/photos",
      params: {
        client_id: "",
        query: searchThis,
        per_page: 30,
      },
    })
    try {
      dispatch({
        type: "SEARCHRESULT",
        payload: output.data.results,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export var getImageInfo = (x, y, width, height, fx, fy, urlSmall, urlFull) => {
  return {
    type: "INFO",
    payload: { x, y, width, height, fx, fy, urlSmall, urlFull },
  }
}

export var getEditText = (text) => {
  return {
    type: "EDIT",
    payload: text,
  }
}
