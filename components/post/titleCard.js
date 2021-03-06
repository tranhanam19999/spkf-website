import moment from 'moment';
import { convertISOToDate } from '../../utils';
import styles from './post.module.css';

export const TitleCard = ({ post, isCate }) => {
    return (
        <>
            {post ? (
                <div className={styles.wapperTitleCard}>
                    {isCate && 
                        <div className={styles.imgWapper}>
                            <img src="/avata.png" className={styles.imageCircle} />
                        </div>
                    }
                    <div className={styles.containerTitleCard} style={{ minHeight: '37px' }}>
                        {/* <div className={styles.categoryNameWapper}>
                            <span className={`${styles.textName}`}>{post.author}</span>
                            <span className={`${styles.textNormal}`}> đã đăng trong </span>
                            <span className={`${styles.textName}`}>{post.category}</span>
                        </div> */}
                        <span className={`${styles.textTitle}`}>{post.title}</span>
                        <span className={`${styles.textTimeView}`}>
                            {post.createdTime
                                ? convertISOToDate(
                                    moment(post.createdTime).utcOffset('+0700')
                                , true)
                                : '  '}
                            {` -  Đăng bởi ${ post.userInfo?.fullName }`}
                        </span>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};
