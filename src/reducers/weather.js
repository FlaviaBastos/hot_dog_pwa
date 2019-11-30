import { RECEIVE_WEATHER, FAIL_WEATHER } from '../actions/app.js'

const weather = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_WEATHER:
    case FAIL_WEATHER:
      return {
        ...state,
        city: action.city,
        condition: action.condition,
        fahr: action.fahr
      }
    default:
      return state
  }
}

export default weather
