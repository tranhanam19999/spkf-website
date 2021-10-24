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
        registerAction: (state, action) => {
            alert('Tạo tài khoản thành công');
        },
        loginAction: (state, action) => {
            localStorage.setItem('token', action.payload.data.token);

            state.user = {
                fullName: action.payload.data.fullName,
                email: action.payload.data.email,
                username: action.payload.data.username,
                userId: action.payload.data.userId,
            };

            localStorage.setItem('user', action.payload.fullName);
        },
        logoutAction: (state, action) => {
            localStorage.removeItem('token');
            state.user = null;
            localStorage.setItem('user', null);
        },
    },
});

export default slice.reducer;
const { registerAction, loginAction, logoutAction } = slice.actions;

export const registerUser = (fullName, username, password) => async (dispatch) => {
    if (username === '' || password === '' || fullName === '')
        return alert('username, password or name none');
    try {
        const res = await registerApi(fullName, username, password);
        if (res.code === 200) dispatch(registerAction(res.data));
        else {
            return alert('username was exist');
        }
    } catch (e) {
        return alert('fail');
    }
};

export const loginUser = (username, password) => async (dispatch) => {
    if (username === '' || password === '') return alert('username or password none');
    const res = await loginApi(username, password);

    if (res.data) {
        if (res.data.code === 200) dispatch(loginAction(res.data));
        else {
            return alert(res.message);
        }
    }
    else {
        return alert('username was exist');
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        dispatch(logoutAction());
    } catch (e) {
        return alert('fail');
    }
};
