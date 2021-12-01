import axios from 'axios';

const host = 'https://spkf-api.herokuapp.com/post';

export const createPostApi = (authorId, title, content) => {
    return axios
        .post(`${host}`, {
            authorId,
            title,
            content,
            headers: { Authorization: `${localStorage.getItem('token')}` },
        })
        .then((res) => {
            return res;
        });
};

export const getListPostApi = async (token, offset = 0, limit = 20) => {
    try {
        let apiRes = await axios
            .get(`${host}/list`, {
                params: { offset, limit },
                headers: { Authorization: `${token}` },
            })
            .then((res) => {
                return res;
            });
        return apiRes;
    } catch (err) {
        return err.response;
    }
};

export const getPostByIDApi = (postId) => {
    return axios
        .get(`${host}`, {
            headers: { Authorization: `${localStorage.getItem('token')}` },
            params: {
                postId: postId.toString(),
            },
        })
        .then((res) => {
            return res;
        });
};
