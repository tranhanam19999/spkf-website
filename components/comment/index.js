import styles from './comment.module.css';
import { convertISOToDate } from '../../utils';
import moment from 'moment';
import { useRef, useState } from 'react';
import { TextField } from '@material-ui/core';
import { CustomButton } from '../button';

export const Comment = ({
    user,
    comment,
    commentRep,
    getMore,
    reply,
    setReply,
    addComment,
    isPost,
}) => {
    const [com, setCom] = useState('');
    const handleGetMore = () => {
        getMore(comment);
    };

    const handleSetReply = () => {
        setReply(comment.commentId || comment.createdTime);
    };

    const handleCreateComment = async () => {
        const result = addComment(com, comment.commentId, comment.postId);
        if (result) {
            setCom('');
        }
    };

    const inputEl = useRef(null);

    return (
        <>
            <div className={styles.commentContainer}>
                <div className={styles.imgWapper}>
                    <img src="/avata.png" className={styles.imageCircle} />
                    <div className={styles.userNameIdWapper}>
                        <span>{user?.fullName}</span>
                        <span>{`ID: ${user?.userId}`}</span>
                    </div>
                </div>
                <div className={styles.commentWapper}>
                    <span className={`${styles.textTime}`}>
                        {comment.createdTime
                            ? convertISOToDate(moment(comment.createdTime).utcOffset('+0700'))
                            : '  '}
                    </span>
                    {commentRep ? (
                        <div className={styles.repComment}>
                            <span className={`${styles.comment} ${styles.repName}`}>
                                {commentRep.userInfo?.fullName}
                            </span>
                            <span> </span>
                            <span className={styles.comment}>{commentRep.content}</span>
                        </div>
                    ) : (
                        <></>
                    )}

                    <span className={`${styles.commentTextWapper} ${styles.comment}`}>
                        {isPost ? (
                            <div dangerouslySetInnerHTML={{ __html: comment.content }} />
                        ) :
                            comment.content
                        }
                    </span>
                    <div>
                        <span className={`${styles.reportText}`}>{''}</span>
                        {comment?.totalChildren != 0 && (
                            <span
                                className={styles.seeMoreComment}
                                onClick={() => handleGetMore()}
                            >{`See more ${comment.totalChildren} comment`}</span>
                        )}
                        <span className={`${styles.replyText}`} onClick={() => handleSetReply()}>
                            Reply
                        </span>
                    </div>
                </div>
            </div>
            {(reply === comment.commentId || reply === comment.createdTime) && (
                <div className={styles.commentReplyWapper}>
                    {/* <input  placeholder="Nhập nội dung bình luận" /> */}
                    <TextField
                        className={styles.backgroundWhite}
                        id="outlined-multiline-flexible"
                        label="Nhập nội dung bình luận"
                        multiline
                        maxRows={4}
                        variant="outlined"
                        value={com}
                        onChange={(e) => setCom(e.target.value)}
                        ref={inputEl}
                        fullWidth
                    />
                    <div className={styles.btnCreateCommentWapper}>
                        <CustomButton
                            text="Bình luận"
                            styleNomal={true}
                            onClick={handleCreateComment}
                        />
                    </div>
                </div>
            )}
        </>
    );
};
