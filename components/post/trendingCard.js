import moment from 'moment';
import { convertISOToDate } from '../../utils';
import styles from './post.module.css';

export const TrendingCard = ({ post }) => {

    console.log("post",post)

    return (
        <>
            {post ? (
                <div className={styles.wapper}>
                    <div className={styles.categoryNameWapper}>
                        <span className={`${styles.textName}`}>{post.userInfo.fullName}</span>
                        <span className={`${styles.textNormal}`}> đã đăng trong </span>
                        <span className={`${styles.textName}`}>{post.cateInfo.name ? post.cateInfo.name : 'Chung' }</span>
                    </div>
                    <span className={`${styles.textTitle}`}>{post.title}</span>
                    <span className={`${styles.textTimeView}`}>
                        {post.createdTime
                            ? convertISOToDate(
                                  moment(post.createdTime).utcOffset('+0700')
                              , true)
                            : ''}
                        { post.totalViews && ` - ${ post.totalViews } Views`}
                    </span>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};
