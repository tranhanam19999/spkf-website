import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {increValue, decreValue} from '../store/count/countSlice'
import Home, {loadingHome} from './home';
 
const IndexPage = (props) => Home(props)
  // const dispatch = useDispatch()
  // const state = useSelector(state => state.count)
  // useEffect(() => {
  // }, [state])
  // return(
  //   <Home/>
  // )
export default IndexPage
