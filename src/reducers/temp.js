import { CHANGETEMP } from '../actions/temp.js'

const displayTemp = (state = {}, action) => {
    switch (action.type) {
    case CHANGETEMP:
      return {
        ...state,
        checked: action.checked,
      }
    default:
      return state
  }
}

export default displayTemp;
