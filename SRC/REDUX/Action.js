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
      console.log(output.data)
      dispatch({
        type: "DEFAULT",
        payload: output.data,
      })
    } catch (er) {
      console.log(er)
    }
  }
}
