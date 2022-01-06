import { convertISOToDate } from '../../../utils';
import styles from './post.module.css';
import moment from 'moment';
import { Comment } from '../../../components/comment';
import { commentChilds, user } from '../../../utils/constant';
import React, { useEffect, useState } from 'react';
import {
    createCommentChildApi,
    createCommentPostApi,
    getCommentByCommentIdApi,
} from '../../../api/comment';
import { getUserInfoApi } from '../../../api/user';
import { reportApi } from '../../../api/report';
import { deleteCommentApi, editCommentApi } from '../../../api/comment';
import { useDispatch, useSelector } from 'react-redux';
import { setInfoUser, logoutUser } from '../../../store/user/userSlice';
import { useRouter } from 'next/router';
import { notify } from '../../../utils/notify';

export const PostDetail = (props) => {
    const { postInfo, listAuthor, comments, token } = props;
    const { user } = useSelector((state) => state.user);
    const [postDetail, setPostDetail] = useState(postInfo);
    const [commentList, setCommentList] = useState([]);
    const userInfo = listAuthor.find((user) => user.userId === postInfo.authorId);
    const [reply, setReply] = useState(null);
    const [openReport, setOpenReport] = useState(null);
    const [edit, setEdit] = useState(null);
    const dispatch = useDispatch();
    const router = useRouter();

    const [postComment, setPostComment] = useState({
        createdTime: postDetail.createdTime,
        content: postDetail.content,
        userInfo: postDetail.userInfo,
        totalChildren: 0,
        postId: postDetail.postId,
        indexSize: 0,
    });

    const handleRedirect = (path) => {
        router.push(path);
    };

    const handleGetMore = async (comment) => {
        try {
            const commentResult = await getCommentByCommentIdApi(comment.commentId, token);
            if (commentResult.status === 200) {
                let listAuthorId = [];
                commentResult.data.data.map((item) => {
                    if (!listAuthorId.find((i) => i === item.authorId)) {
                        listAuthorId.push(item.authorId);
                    }
                });
                // get list user
                const listAu = await Promise.all(
                    listAuthorId.map(async (item) => {
                        const resAuInfo = await getUserInfoApi(item, token);
                        if (resAuInfo.status === 200) {
                            return resAuInfo.data.data[0];
                        } else {
                            return {};
                        }
                    })
                );

                const conmentTemp = commentResult.data.data.map((com) => {
                    const au = listAu.find((a) => a.userId === com.authorId);
                    if (au) {
                        return {
                            ...com,
                            userInfo: au,
                            indexSize: comment.indexSize + 1,
                        };
                    } else {
                        return { ...com, userInfo: {}, indexSize: comment.indexSize + 1 };
                    }
                });

                let comList = commentList.slice();
                comList[commentList.indexOf(comment)].totalChildren = 0;
                comList.splice(commentList.indexOf(comment) + 1, 0, ...conmentTemp);
                setCommentList(comList);
            } else if (
                commentResult.status === 403 &&
                commentResult.data.error_code === 'UNAUTHORIZED'
            ) {
                notify.warn('Hết hạn đăng nhập');
                dispatch(logoutUser());
                handleRedirect('/login');
                return false;
            } else {
                notify.warn('Có lỗi xảy ra');
                return false;
            }
        } catch (e) {
            console.log('error', e.response);
        }
    };

    const addComment = async (com, commentId, postId, comment) => {
        try {
            let resCom;
            if (commentId) {
                resCom = await createCommentChildApi(
                    com,
                    postInfo.postId,
                    user.userId,
                    commentId,
                    token
                );
                if (resCom.status === 200) {
                    let data = resCom.data.data;
                    data.userInfo = user;
                    data.indexSize = comment.indexSize + 1;
                    let comList = commentList.slice();
                    const commentItem = commentList.find((com) => com.commentId === commentId);
                    comList.splice(commentList.indexOf(commentItem) + 1, 0, data);
                    setCommentList(comList);
                    setReply(null);
                    notify.success('Thành công');
                    return true;
                }
            } else {
                resCom = await createCommentPostApi(com, postInfo.postId, user.userId, token);
                if (resCom.status === 200) {
                    let data = resCom.data.data;
                    data.userInfo = user;
                    data.indexSize = comment.indexSize + 1;
                    let comList = commentList.slice();
                    comList.splice(0, 0, data);
                    setCommentList(comList);
                    setReply(null);
                    notify.success('Thành công');
                    return true;
                }
            }
            if (resCom.status === 403 && resCom.data.error_code === 'UNAUTHORIZED') {
                notify.warn('Hết hạn đăng nhập');
                dispatch(logoutUser());
                handleRedirect('/login');
                return false;
            } else {
                notify.warn('Có lỗi xảy ra');
                return false;
            }
        } catch (e) {
            notify.error('Có lỗi xảy ra');
            return false;
        }
    };

    const addReport = async (report, reportType, commentId, postId) => {
        if (report === '') {
            notify.warn('Phải nhập nội dung report');
            return false;
        }
        try {
            let response;
            if (commentId) {
                response = await reportApi(null, commentId, user.userId, reportType, report, token);
            } else {
                response = await reportApi(
                    postInfo.postId,
                    null,
                    user.userId,
                    reportType,
                    report,
                    token
                );
            }
            if (response.status === 200) {
                notify.success('Thành công');
                return true;
            } else if (response.status === 403 && response.data.error_code === 'UNAUTHORIZED') {
                notify.warn('Hết hạn đăng nhập');
                dispatch(logoutUser());
                handleRedirect('/login');
                return false;
            } else {
                notify.error('Có lỗi xảy ra');
                return false;
            }
        } catch (e) {}
    };

    const deleteComment = async (commentId) => {
        try {
            const resDelete = await deleteCommentApi(
                commentId,
                postInfo.postId,
                user.userId,
                token
            );
            if (resDelete.status === 200) {
                let comList = commentList.slice();
                const commentItem = commentList.find((com) => com.commentId === commentId);
                comList.splice(commentList.indexOf(commentItem), 1);
                setCommentList(comList);
                notify.success('Thành công');
                return true;
            } else if (resDelete.status === 403 && resDelete.data.error_code === 'UNAUTHORIZED') {
                notify.warn('Hết hạn đăng nhập');
                dispatch(logoutUser());
                handleRedirect('/login');
                return false;
            } else {
                notify.warn('Có lỗi xảy ra');
                return false;
            }
        } catch (e) {
            notify.warn('Có lỗi xảy ra');
            return false;
        }
    };

    const editComment = async (commentId, content) => {
        try {
            const resEdit = await editCommentApi(
                commentId,
                postInfo.postId,
                user.userId,
                content,
                token
            );
            if (resEdit.status === 200) {
                let comList = commentList.slice();
                const commentItem = commentList.find((com) => com.commentId === commentId);
                comList[commentList.indexOf(commentItem)].content = content
                setCommentList(comList);
                notify.success('Thành công');
                return true;
            } else if (resEdit.status === 403 && resEdit.data.error_code === 'UNAUTHORIZED') {
                notify.warn('Hết hạn đăng nhập');
                dispatch(logoutUser());
                handleRedirect('/login');
                return false;
            } else {
                notify.warn('Có lỗi xảy ra');
                return false;
            }
        } catch (e) {
            notify.warn('Có lỗi xảy ra');
            return false;
        }
    };

    useEffect(() => {
        if (comments.length > 0 && listAuthor) {
            const conmentTemp = comments.map((com) => {
                const au = listAuthor.find((a) => a.userId === com.authorId);
                if (au) {
                    return {
                        ...com,
                        userInfo: au,
                    };
                } else {
                    return { ...com, userInfo: {} };
                }
            });
            setCommentList(conmentTemp);
        }
    }, [comments, listAuthor]);

    return postInfo ? (
        <div className={styles.postDetailContainer}>
            <div className={styles.headerCardWapper}>
                <span className={styles.titleCard}>{postInfo.title}</span>
                <span className={`${styles.textTimeView}`}>
                    {postInfo.createdTime
                        ? convertISOToDate(moment(postInfo.createdTime).utcOffset('+0700'), true)
                        : '  '}
                    {` -  Đăng bởi ${userInfo.fullName}`}
                </span>
            </div>
            <Comment
                user={userInfo}
                comment={postComment}
                getMore={handleGetMore}
                reply={reply}
                setReply={setReply}
                addComment={addComment}
                isPost={true}
                openReport={openReport}
                setOpenReport={setOpenReport}
                addReport={addReport}
            />
            {commentList.length > 0 &&
                commentList.map((item, index) => {
                    let repComment = undefined;
                    let isAuthor = Boolean(user.userId === item.userInfo.userId);
                    if (item.parentId) {
                        repComment = commentList.find((i) => i.commentId === item.parentId);
                    }
                    return (
                        <Comment
                            user={item.userInfo}
                            comment={item}
                            getMore={handleGetMore}
                            key={index}
                            commentRep={repComment}
                            reply={reply}
                            setReply={setReply}
                            addComment={addComment}
                            openReport={openReport}
                            setOpenReport={setOpenReport}
                            addReport={addReport}
                            isAuthor={isAuthor}
                            deleteComment={deleteComment}
                            edit={edit}
                            setEdit={setEdit}
                            editComment={editComment}
                        />
                    );
                })}
        </div>
    ) : (
        <></>
    );
};
