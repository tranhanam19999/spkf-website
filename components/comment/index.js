import styles from './comment.module.css';
import { convertISOToDate } from '../../utils';
import moment from 'moment';

export const Comment = ({ user, comment, commentRep, getMore }) => {
    const handleGetMore = () => {
        getMore(comment);
    };

    return (
        <div className={styles.commentContainer}>
            <div className={styles.imgWapper}>
                <img src="/no-image.jpg" className={styles.imageCircle} />
                <div className={styles.userNameIdWapper}>
                    <span>{user.fullName}</span>
                    <span>{`ID: ${user.userId}`}</span>
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
                        <span className={`${styles.comment} ${styles.repName}`}>{commentRep.userInfo.fullName}</span>
                        <span> </span>
                        <span className={styles.comment}>{commentRep.content}</span>
                    </div>
                ) : (
                    <></>
                )}

                <span className={`${styles.commentTextWapper} ${styles.comment}`}>
                    {comment.content}
                </span>
                <div>
                    <span className={`${styles.reportText}`}>Report</span>
                    {comment?.totalChildren != 0 && (
                        <span
                            className={styles.seeMoreComment}
                            onClick={() => handleGetMore()}
                        >{`See more ${comment.totalChildren} comment`}</span>
                    )}
                    <span className={`${styles.replyText}`}>Reply</span>
                </div>
            </div>
        </div>
    );
};
