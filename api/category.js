import axios from 'axios';

const host = 'https://spkf-api.herokuapp.com/category';

export const creteCategory = (name, token) => {
    return axios
        .post(`${host}`, {
            name,
            headers: { Authorization: `${token}` },
        })
        .catch((err) => err.response);
};

export const getCategoryInfoApi = (categoryId, token) => {
    return axios
        .get(`${host}`, {
            params: { categoryId },
            headers: { Authorization: `${token}` },
        })
        .catch((err) => err.response);
};

export const getCategoryListApi = (offset, limit, token) => {
    return axios
        .get(`${host}/list`, {
            params: { offset, limit },
            headers: { Authorization: `${token}` },
        })
        .catch((err) => err.response);
};
