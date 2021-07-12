import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {increValue, decreValue} from '../store/count/countSlice'

const IndexPage = () => {
  const dispatch = useDispatch()
  const state = useSelector(state => state.count)
  useEffect(() => {
  }, [state])
  return(
    <div>
      <div>Testing</div>
      <h1>Simple implement Next.js With Redux Toolkit</h1>
      <h2>Counted: {state}</h2>
      <hr/>
      <button onClick={() => dispatch(increValue())}>Increment</button>
      &nbsp;
      <button onClick={() => dispatch(decreValue())}>decrement</button>
    </div>
  )
}
export default IndexPage
