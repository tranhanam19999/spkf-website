import axios from 'axios';

const host = 'https://spkf-api.herokuapp.com/comment';

export const getCommentInPostApi = (postId, token) => {
    return axios
        .get(`${host}/by-post`, {
            headers: { Authorization: `${token}` },
            params: { postId },
        })
        .then((res) => {
            return res;
        })
        .catch((err) => err.response);
};

export const getCommentByCommentIdApi = (commentId, token) => {
    return axios
        .get(`${host}/children`, {
            headers: { Authorization: `${token}` },
            params: {
                commentId: commentId.toString(),
            },
        })
        .then((res) => {
            return res;
        })
        .catch((err) => err.response);
};

export const createCommentPostApi = (content, postId, authorId, token) => {
    return axios
        .post(
            `${host}`,
            {
                content,
                postId,
                authorId,
            },
            { headers: { Authorization: `${token}` } }
        )
        .catch((err) => err.response);
};

export const createCommentChildApi = (content, postId, authorId, parentId, token) => {
    return axios
        .post(
            `${host}`,
            {
                content,
                postId,
                authorId,
                parentId,
            },
            { headers: { Authorization: `${token}` } }
        )
        .catch((err) => err.response);
};

export const deleteCommentApi = (commentId, postId, authorId, token) => {
    const data = { commentId, postId, authorId };
    return axios({
        method: 'PUT',
        url: `${host}/remove-self`,
        headers: { Authorization: `${token}` },
        data,
    })
        .then((res) => {
            return res;
        })
        .catch((err) => err.response);
};

export const editCommentApi = (commentId, postId, authorId, content, token) => {
    const data = { commentId, postId, authorId, content };
    return axios({
        method: 'PUT',
        url: `${host}`,
        headers: { Authorization: `${token}` },
        data,
    })
        .then((res) => {
            return res;
        })
        .catch((err) => err.response);
};
