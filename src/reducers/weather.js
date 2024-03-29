import { RECEIVE_WEATHER, FAIL_WEATHER } from '../actions/weather.js'

const weather = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_WEATHER:
    case FAIL_WEATHER:
      return {
        ...state,
        city: action.city,
        condition: action.condition,
        fahr: action.fahr,
        icon: action.icon
      }
    default:
      return state
  }
}

export default weather
