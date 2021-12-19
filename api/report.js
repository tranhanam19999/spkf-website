import axios from 'axios';

const host = 'https://spkf-api.herokuapp.com/report';

export const reportApi = (postId, commentId, authorId, reportedType, reportedReason, token) => {
    const data =  {reportedType, reportedReason, authorId}
    if(commentId) {
        data.commentId = commentId
    } else {
        data.postId = postId
    }
    return axios({
        method: 'PUT',
        headers: { Authorization: `${token}` },
        data,
        url: `${host}/report`,
        })
        .then((res) => {
            return res;
        })
        .catch((err) => err.response);
};