import * as request from 'superagent'
import { baseUrl } from '../constants'
import { isExpired } from '../jwt'

export const ADD_USER = 'ADD_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_USERS = 'UPDATE_USERS'

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED'

export const USER_LOGOUT = 'USER_LOGOUT'

export const USERNAME_TAKEN = 'USERNAME_TAKEN'
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS'
export const USER_SIGNUP_FAILED = 'USER_SIGNUP_FAILED'

export const logout = () => ({
  type: USER_LOGOUT
})

const userLoginSuccess = (login) => ({
  type: USER_LOGIN_SUCCESS,
  payload: login
})

const userLoginFailed = (error) => ({
  type: USER_LOGIN_FAILED,
  payload: error || 'Unknown error'
})

const userSignupFailed = (error) => ({
  type: USER_SIGNUP_FAILED,
  payload: error || 'Unknown error'
})

const userSignupSuccess = () => ({
  type: USER_SIGNUP_SUCCESS
})

const updateUsers = (users) => ({
  type: UPDATE_USERS,
  payload: users
})

export const login = (username, password) => (dispatch) =>
  request
    .post(`${baseUrl}/logins`)
    .send({ username, password })
    .then(result => dispatch(userLoginSuccess(result.body)))
    .catch(err => {
      if (err.status === 400) {
        dispatch(userLoginFailed(err.response.body.message))
      }
      else {
        console.error(err)
      }
    })

export const checkUsername = (username) => (dispatch) => {
  request
    .post(`${baseUrl}/checkusername`)
    .send({ username })
    .then(result => {
      return result.body
      // if (!result.body) {
      //   dispatch(newUserEmail({ username }))
      // }
    })
}

export const usernameTaken = () => ({
  type: USERNAME_TAKEN,
  payload: 'Apologies! That username is already taken'
})

export const signup = (username, password) => (dispatch) =>
  request
    .post(`${baseUrl}/users`)
    .send({ username, password })
    .then(_ => {
      dispatch(userSignupSuccess())
    })
    .catch(err => {
      if (err.status === 400) {
        dispatch(userSignupFailed(err.response.body.message))
      }
      else {
        console.error(err)
      }
    })

export const getUsers = () => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/users`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => dispatch(updateUsers(result.body)))
    .catch(err => console.error(err))
}
