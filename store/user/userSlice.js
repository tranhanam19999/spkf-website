import { createSlice } from '@reduxjs/toolkit';

import { registerApi, loginApi } from '../../api/user';

const slice = createSlice({
    name: 'user',
    initialState: {
        // user: localStorage.getItem('user') || null,
        // isLogin: localStorage.getItem('isLogin') || false,
        user: null,
    },
    reducers: {
        registerAction:(state,action) =>{
            alert("Tạo tài khoản thành công")
        },
        loginAction:(state,action) =>{
            console.log("action",action)
            localStorage.setItem("token",action.payload.data.token);
            state.user=action.payload.data.fullName;
            localStorage.setItem('user',action.payload.fullName)
        },
        logoutAction:(state,action)=>{
            localStorage.removeItem("token")
            state.user=null
            localStorage.setItem('user',null)
        }
    }
});

export default slice.reducer
const { 
    registerAction,
    loginAction,
    logoutAction
  } = slice.actions

export const registerUser = ( fullName, username, password) => async dispatch =>{
    if ( username==='' || password==='' || fullName === '' )
        return alert("username, password or name none")
    try{
        const res = await registerApi(fullName, username, password)
        console.log(res)
        if(res.code === 200)
            dispatch(registerAction(res.data))
        else
        return alert("username was exist")
    }

    catch (e) {
        return alert("fail")
    }
}

export const loginUser =  (username, password) => async dispatch =>{
    if ( username==='' || password==='' )
    return alert("username or password none")
    // try{
        const res = await loginApi(username, password)
        console.log("res",res)
        if (res.data) {
            if(res.data.code === 200)
                dispatch(loginAction(res.data))
            else
                return alert(res.message)
        } else return alert("username was exist")
    // }

    // catch (e) {
    //     return alert("fail")
    // }
}

export const logoutUser = () => async dispatch =>{
    try{
        dispatch(logoutAction())
      }
      catch(e) {
        return alert("fail")
      }
}