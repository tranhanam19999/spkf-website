import moment from 'moment';
import { convertISOToDate } from '../../utils';
import styles from './post.module.css';

export const TrendingCard = ({ post }) => {
    return (
        <>
            {post ? (
                <div className={styles.wapper}>
                    <div className={styles.categoryNameWapper}>
                        <span className={`${styles.textName}`}>{post.author}</span>
                        <span className={`${styles.textNormal}`}> đã đăng trong </span>
                        <span className={`${styles.textName}`}>{post.category}</span>
                    </div>
                    <span className={`${styles.textTitle}`}>{post.title}</span>
                    <span className={`${styles.textTimeView}`}>
                        {post.createTime
                            ? convertISOToDate(
                                  moment(post.createTime).utcOffset('+0700')
                              , true)
                            : ''}
                        {` - ${ post.totalViews } Views`}
                    </span>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};
