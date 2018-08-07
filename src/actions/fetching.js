import * as types from '../constants/ActionTypes'

export const startFetching = () => ({
  type: types.FETCH_START
})

export const stopFetching = () => ({
  type: types.FETCH_STOP
})