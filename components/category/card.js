import { MyCardHeader } from '../card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { Grid, Typography, TextField, makeStyles, Box } from '@material-ui/core';
import Image from 'next/image';
import styles from './category.module.css';
import { useRouter } from 'next/router';

export const CategoryCard = ({cate}) => {
    return (
        <div className={styles.cardWapper}>
            <div className={styles.titleWapper}>
                <span className={styles.categoryCardTitle}>{cate.title}</span>
                <span className={styles.textTimeView}>{`Threads: ${cate.count ? cate.count : 0}`}</span>
            </div>
            <div className={styles.imgWapper}>
                <img src="/no-image.jpg" className={styles.imageCircle} />
            </div>
        </div>
    )
}