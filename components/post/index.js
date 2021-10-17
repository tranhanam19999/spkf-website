import styles from './post.module.css';
import moment from 'moment';
import { convertISOToDate } from '../../utils';

export const CardPost = ({ icon, titleCard, post, index }) => {
    return (
        <div className={styles.cardItem} key={index}>
            <div className={styles.cardIcon}>{icon}</div>
            <span className={styles.cardTitle}>{titleCard}</span>
            <div className={styles.imgWapper}>
                <img src="/no-image.jpg" className={styles.imageCircle} />
            </div>
            <div className={styles.postInfo}>
                <span className={styles.postTitle}>{post.title}</span>
                <span>{`${convertISOToDate(
                    moment(post.createTime).utcOffset('+0700'),
                    true
                )} - ${post.author}`}</span>
            </div>
        </div>
    );
};
