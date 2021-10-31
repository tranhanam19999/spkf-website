import axios from 'axios';

const host = 'https://spkf-api.herokuapp.com/comment'

export const createCommentApi = (content,postId,authorId,parentId) => {
    const createModletResponse = {content,postId,authorId}
    if(parentId) {
        createModletResponse.parentId = parentId;
    }
    return axios.post(`${host}`, {
       ...createModletResponse,
       headers: {"Authorization" : `${localStorage.getItem('token')}`},
    })
    .then(res => {
        return res
    })
}

export const getCommentInPostApi = (postId) => {
    return axios.get(`${host}/by-post`, {
        headers: {"Authorization" : `${localStorage.getItem('token')}`},
        params: {
            postId: postId.toString(),
        }
    })
    .then(res => {
        return res
    })
}

export const getCommentByCommentIdApi = (commentId) => {
    return axios.get(`${host}/children`, {
        headers: {"Authorization" : `${localStorage.getItem('token')}`},
        params: {
            commentId: commentId.toString(),
        }
    })
    .then(res => {
        return res
    })
}