import axios from 'axios';

const host = 'https://spkf-api.herokuapp.com/post'

export const createPostApi = (authorId,title,content) => {
    axios.post(`${host}`, {
        authorId,
        title,
        content,
        headers: {"Authorization" : `${localStorage.getItem('token')}`},
    })
    .then(res => {
        return res
    })
}

export const getListPostApi = (title, content) => {
    return axios.get(`${host}/list`, {
        title,
        content,
        headers: {"Authorization" : `${localStorage.getItem('token')}`},
    })
    .then(res => {
        return res
    })
}

export const getPostByIDApi = (postId) => {
    return axios.get(`${host}`, {
        headers: {"Authorization" : `${localStorage.getItem('token')}`},
        params: {
            postId: postId.toString(),
        }
    })
    .then(res => {
        return res
    })
}

