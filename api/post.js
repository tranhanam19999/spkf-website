import axios from 'axios';

const host = 'https://spkf-api.herokuapp.com/post';

export const createPostApi = (authorId, title, categoryId, content, token) => {
    try {
        return axios
            .post(
                `${host}`,
                {
                    authorId,
                    title,
                    content,
                    categoryId,
                },
                { headers: { Authorization: `${token}` } }
            )
            .then((res) => {
                return res;
            });
    } catch (e) {
        return e.response;
    }
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

export const getListPostByCategory = (categoryId, token, offset, limit) => {
    try {
        return axios
            .get(`${host}/list`, {
                params: { categoryId, offset, limit },
                headers: { Authorization: `${token}` },
            })
            .then((res) => {
                return res;
            });
    } catch (err) {
        return err.response;
    }
};

export const getPostByIDApi = (postId, token) => {
    try {
        return axios
            .get(`${host}`, {
                headers: { Authorization: `${token}` },
                params: { postId },
            })
            .then((res) => {
                return res;
            });
    } catch (err) {
        return err.response;
    }
};
