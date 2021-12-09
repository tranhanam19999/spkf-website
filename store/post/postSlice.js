import { createSlice, isFulfilled } from '@reduxjs/toolkit';

import { getListPostApi } from '../../api/post';
import { getUserInfoApi } from '../../api/user';
import { getCategoryInfoApi } from '../../api/category';

const slice = createSlice({
    name: 'post',
    initialState: {
        // user: localStorage.getItem('user') || null,
        // isLogin: localStorage.getItem('isLogin') || false,
        trendingPost: null,
        listCategory: null,
        listPost: null,
        post: null,
        listcomments: null,
    },
    reducers: {
        getListPostAction: (state, action) => {
            state.listPost = action.payload;
            state.trendingPost = action.payload;
        },
    },
});

export default slice.reducer;
const { getListPostAction } = slice.actions;

export const getListPost = (token, callback) => async (dispatch) => {
    const response = await getListPostApi(token);
    if (response) {
        if (response.status === 200) {
            if (response.data.data?.length > 0) {
                let data = response.data.data;
                const tempListPost = data.map(async (item) => {
                    let cateInfo = {};
                    let userInfo = {};
                    if (item.authorId) {
                        const resUser = await getUserInfoApi(item.authorId, token);
                        if (resUser.status === 200) {
                            userInfo = resUser.data.data[0];
                        }
                    }
                    if (item.categoryId) {
                        const resCate = await getCategoryInfoApi(item.categoryId, token);
                        if (resCate.status === 200) {
                            cateInfo = resCate.data.data[0];
                        }
                    }
                    return {
                        ...item,
                        cateInfo: cateInfo,
                        userInfo: userInfo,
                    };
                });
                const result = await Promise.all(tempListPost);
                dispatch(getListPostAction(result));
            }
        }
        callback('OK');
    }
    if (response.data.code === 404) {
        callback('INVALID');
    }
};
