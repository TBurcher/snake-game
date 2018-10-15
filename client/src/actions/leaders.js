import * as request from 'superagent'
import { baseUrl } from '../constants'
import { logout } from './users'
import { isExpired } from '../jwt'

export const UPDATE_LEADERS = 'UPDATE_LEADERS'

const updateLeaders = leaders => ({
  type: UPDATE_LEADERS,
  payload: leaders
})

export const getLeaders = () => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/highscores`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => dispatch(updateLeaders(result.body)))
    .catch(err => console.error(err))
}
