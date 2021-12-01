import axios from 'axios';

const host = 'https://spkf-api.herokuapp.com/category';

export const creteCategory = (name, token) => {
    try {
        return axios.post(`${host}`, {
            name,
            headers: { Authorization: `${token}` },
        });
    } catch(err) {
        return err.response
    }
};

export const getCategoryInfoApi = (categoryId, token) => {
    try {
        return axios.get(`${host}`,{
            params: {categoryId},
            headers: { Authorization: `${token}` },
        })
    } catch(err) {
        return err.response
    }
}

export const getCategoryListApi = (offset, limit, token) => {
    try {
        return axios.get(`${host}/list`, {
            params: {offset,limit},
            headers: { Authorization: `${token}` },
        })
    } catch(err) {
        return err.response
    }
}