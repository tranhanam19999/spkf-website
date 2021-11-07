import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'post',
    initialState: {
        // user: localStorage.getItem('user') || null,
        // isLogin: localStorage.getItem('isLogin') || false,
        trendingPost: null,
        listCategory: null,
        post: null,
        listcomments: null,
    },
    reducers: {
        getCommentAction: (state, action) => {
            state.post = action.payload.data.fullName;
        },
        getCommentByCommentIDAction:  (state, action) => {
            localStorage.setItem('token', action.payload.data.token);
            state.user = action.payload.data.fullName;
            localStorage.setItem('user', action.payload.fullName);
        },
    },
});