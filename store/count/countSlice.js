import {createSlice} from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment(state, action) {
      state += 1
      return state
    },
    decrement(state, action) {
      state -= 1
      return state
    },
  }
})
export const { increment, decrement } = counterSlice.actions
export const increValue = () => async dispatch => {
  dispatch(increment())
}
export const decreValue = () => async dispatch => {
  dispatch(decrement())
}
export default counterSlice.reducer
