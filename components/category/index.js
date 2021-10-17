import { MyCardHeader } from '../card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { Grid, Typography, TextField, makeStyles, Box } from '@material-ui/core';
import Image from 'next/image';
import styles from './category.module.css';
import { useRouter } from 'next/router';

export const RightBox = () => {
    const router = useRouter();

    const redirectCategory = () => {
        router.push({
            pathname: '/category',
        });
    };

    const category = [
        'Học tập',
        'Cuộc thi',
        'Review Môn học',
        'Thể thao',
        'Chia sẻ',
        'Thông tin hot',
    ];

    return (
        <>
            <Grid item xs={12} className={styles.categoryWapper}>
                <Grid item xs={12}>
                    <MyCardHeader title="Danh mục bài viết" />
                </Grid>
                {category.map((item, index) => {
                    return (
                        <Grid item xs={12} key={index} className={styles.categoryItem}>
                            <span
                                className={styles.categoryText}
                                onClick={() => redirectCategory()}
                            >
                                {item}
                            </span>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};
