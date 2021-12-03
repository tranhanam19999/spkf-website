import axios from 'axios';

const host = 'https://spkf-api.herokuapp.com/comment';

export const getCommentInPostApi = (postId, token) => {
    try {
        return axios
            .get(`${host}/by-post`, {
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
        });
};

export const createCommentPostApi = (content, postId, authorId, token) => {
    try {
        return axios.post(`${host}`, {
            data: {
                content,
                postId,
                authorId,
            },

            headers: { Authorization: `${token}` },
        });
    } catch (err) {
        return err.response;
    }
};

export const createCommentChildApi = (content, postId, authorId, parentId, token) => {
    try {
        return axios.post(`${host}`, {
            data: {
                content,
                postId,
                authorId,
                parentId,
            },
            headers: { Authorization: `${token}` },
        });
    } catch (err) {
        return err.response;
    }
};
