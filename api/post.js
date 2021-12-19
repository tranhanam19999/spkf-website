import axios from 'axios';

const host = 'https://spkf-api.herokuapp.com/post';

export const createPostApi = (authorId, title, categoryId, content, token) => {
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
        })
        .catch((err) => err.response);
};

export const getListPostApi = (token, offset = 0, limit = 20) => {
    return axios
        .get(`${host}/list`, {
            params: { offset, limit },
            headers: { Authorization: `${token}` },
        })
        .then((res) => {
            return res;
        })
        .catch((err) => err.response);
};

export const getListPostByCategory = async (categoryId, token, offset, limit) => {
    return await axios
        .get(`${host}/list`, {
            params: { categoryId, offset, limit },
            headers: { Authorization: `${token}` },
        })
        .then((res) => {
            return res;
        })
        .catch((err) => err.response);
};

export const getPostByIDApi = (postId, token) => {
    return axios
        .get(`${host}`, {
            headers: { Authorization: `${token}` },
            params: { postId },
        })
        .then((res) => {
            return res;
        })
        .catch((err) => err.response);
};

export const reportPostApi = (postId, reportedType, reportedReason, token) => {
    return axios({
        method: 'PUT',
        headers: { Authorization: `${token}` },
        data: { postId, reportedType, reportedReason },
        url: `${host}/report`,
        })
        .then((res) => {
            return res;
        })
        .catch((err) => err.response);
};
