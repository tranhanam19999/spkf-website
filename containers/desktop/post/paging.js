import { convertISOToDate } from '../../../utils';
import styles from './post.module.css';
import moment from 'moment';
import { Comment } from '../../../components/comment';
import { commentChilds, user } from '../../../utils/constant';
import React, { useEffect, useState } from 'react';
 
export const PostDetail = (props) => {

    const { postInfo } = props

    const [postDetail, setPostDetail] = useState(postInfo)

    const [postComment, setPostComment] = useState({
        createdTime: postDetail.createdTime,
        content: postDetail.content,
        userInfo: postDetail.userInfo,
        totalChildren: 0,
        postId: postDetail.postId,
    })

    const getComment = () =>{
        const result = commentChilds.map((i)=>{
            return {...i, userInfo: user[0]}
        })

        return result
    } 

    const handleGetMore = (comment) => {
        console.log(comment)

        const commentResult = getComment()

        let postDetailSlice = JSON.parse(JSON.stringify(postDetail))

        postDetailSlice.comments.map((i, index) => {
            if (i.commentId === comment.commentId) {
                postDetailSlice.comments[index].totalChildren = 0;
            }
        })

        postDetailSlice.comments.push(...commentResult)
        setPostDetail(postDetailSlice)
    }

    return (
        <div className={styles.postDetailContainer}>
            <div className={styles.headerCardWapper}>
                <span className={styles.titleCard}>{postInfo.title}</span>
                <span className={`${styles.textTimeView}`}>
                    {postInfo.createdTime
                        ? convertISOToDate(
                            moment(postInfo.createdTime).utcOffset('+0700')
                        , true)
                        : '  '}
                    {` -  Đăng bởi ${ postInfo.userInfo.fullName }`}
                </span>
            </div>
            <Comment user={postDetail.userInfo} comment={postComment} getMore={handleGetMore}/>
            {
                postDetail.comments.map((item, index) => {
                    let repComment = undefined
                    if (item.parentId) {
                        repComment = postDetail.comments.find((i)=>i.commentId === item.parentId)
                    }
                    return (
                        <Comment user={item.userInfo} comment={item} getMore={handleGetMore} key={index} commentRep={repComment}/>
                    )
                })
            }
        </div>
    )
}