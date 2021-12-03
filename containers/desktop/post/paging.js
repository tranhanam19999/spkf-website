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
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

export const PostDetail = (props) => {
    const { postInfo, listAuthor, comments, token } = props;
    const { user } = useSelector((state) => state.user);
    const [postDetail, setPostDetail] = useState(postInfo);
    const [commentList, setCommentList] = useState([]);
    const userInfo = listAuthor.find((user) => user.userId === postInfo.authorId);
    const [reply, setReply] = useState(null);
    const router = useRouter();

    const [postComment, setPostComment] = useState({
        createdTime: postDetail.createdTime,
        content: postDetail.content,
        userInfo: postDetail.userInfo,
        totalChildren: 0,
        postId: postDetail.postId,
    });

    const handleGetMore = async (comment) => {
        console.log(comment);
        try {
            const commentResult = await getCommentByCommentIdApi(comment.commentId, token);
            console.log('Comment', commentResult);
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
                        };
                    } else {
                        return { ...com, userInfo: {} };
                    }
                });

                let comList = commentList.slice();
                comList[commentList.indexOf(comment)].totalChildren = 0;
                comList.splice(commentList.indexOf(comment) + 1, 0, ...conmentTemp);
                setCommentList(comList);
            }
        } catch (e) {
            console.log('error', e.response);
        }
    };

    const addComment = async (com, commentId, postId) => {
        try {
            if (commentId) {
                const resCom = await createCommentChildApi(
                    com,
                    postInfo.postId,
                    user.userId,
                    commentId,
                    token
                );
                console.log(resCom);
                if (resCom.status === 200) {
                    let data = resCom.data.data;
                    data.userInfo = user;
                    let comList = commentList.slice();
                    const commentItem = commentList.find((com) => com.commentId === commentId);
                    comList.splice(commentList.indexOf(commentItem) + 1, 0, data);
                    console.log('comList', comList);
                    setCommentList(comList);
                }
            }
        } catch (e) {
            console.log(e.response);
            // if (e.response.status === 403) {
            //     router.push('/login');
            // }
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

    return commentList.length > 0 ? (
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
            />
            <div style={{ marginLeft: 15 }}>
                {commentList.map((item, index) => {
                    let repComment = undefined;
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
                        />
                    );
                })}
            </div>
        </div>
    ) : (
        <></>
    );
};
