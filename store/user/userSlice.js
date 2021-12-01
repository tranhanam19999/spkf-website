import { createSlice } from '@reduxjs/toolkit';

import { registerApi, loginApi } from '../../api/user';

const slice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        token: null,
    },
    reducers: {
        registerAction: (state, action) => {
            alert('Tạo tài khoản thành công');
        },
        loginAction: (state, action) => {
            state.user = {
                fullName: action.payload.data.fullName,
                email: action.payload.data.email,
                username: action.payload.data.username,
                userId: action.payload.data.userId,
            };
            state.token = action.payload.data.token;
        },
        logoutAction: (state, action) => {
            state.user = null;
            state.token = null;
        },
        setInfoAction: (state, action) => {
            console.log("action", action.payload)
            state.user = {
                fullName: action.payload.fullName,
                email: action.payload.email,
                username: action.payload.username,
                userId: action.payload.userId,
            };
        }
    },
});

export default slice.reducer;
const { registerAction, loginAction, logoutAction, setInfoAction } = slice.actions;

export const setInfoUser = (userInfo) => async (dispatch) => {
    const { email, fullName, userId, username } = userInfo;
    if (email && fullName && userId && username) {
        dispatch(setInfoAction(userInfo))
    }
}

export const registerUser = (fullName, email, username, password) => async (dispatch) => {
    if (username === '' || password === '' || fullName === '' || email ==='')
        return alert('username, password, email or name none');
    try {
        const res = await registerApi(fullName, email, username, password);
        if (res.data) {
            if (res.data.code === 200) dispatch(registerAction(res.data));
            else return alert('username or email was exist');
        } 
    } catch (e) {
        return alert('fail');
    }
};

export const loginUser = (username, password) => async (dispatch) => {
    if (username === '' || password === '') return alert('username or password none');
    try{
        const res = await loginApi(username, password);
        if (res.data) {
            if (res.data?.code === 200) dispatch(loginAction(res.data));
            else return alert(res.message);
        } else return alert('username was exist');
    } catch (e) {
        return alert("fail")
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        dispatch(logoutAction());
    } catch (e) {
        return alert('fail');
    }
};
