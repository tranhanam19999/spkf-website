import axios from 'axios';

const host = 'https://spkf-api.herokuapp.com/report';

export const reportApi = (postId, commentId, authorId, reportType, content, token) => {
    const data =  {reportType , content, authorId}
    if(commentId) {
        data.commentId = commentId
    } else {
        data.postId = postId
    }
    return axios({
        method: 'POST',
        headers: { Authorization: `${token}` },
        data,
        url: `${host}`,
        })
        .then((res) => {
            return res;
        })
        .catch((err) => err.response);
};