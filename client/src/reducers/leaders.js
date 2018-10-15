import { UPDATE_LEADERS } from '../actions/leaders'

export default (state = null, { type, payload }) => {
  switch (type) {
    case UPDATE_LEADERS:
      return payload

    default:
      return state
  }
}