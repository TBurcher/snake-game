import { USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILED, EMAIL_TAKEN } from '../actions/users'

export default function (state = {}, { type, payload }) {
  switch (type) {
    case USER_SIGNUP_SUCCESS:
      return {
        success: true
      }

    case USER_SIGNUP_FAILED:
      return {
        error: payload
      }

    case EMAIL_TAKEN:
      return {
        emailTaken: payload
      }

    default:
      return state
  }
}
