import { MyCardHeader } from '../../../components/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { Grid, Typography, TextField, makeStyles, Box } from '@material-ui/core';
import Image from 'next/image';
import styles from './category.module.css';
import { CardPost } from '../../../components/post';
import { RightBox } from '../../../components/category';

export const RenderCategoryDesktop = (props) => {
    const items = [1, 2, 3, 4, 5];
    const category = [items, items, items, items];
    const post = {
        author: 'Nam Trần',
        createTime: 1519129853500,
        title: ' Sinh viên ute Trần Hà Nam tham gia clc be dancer',
    };

    return (
        <Grid container className={styles.wapper}>
            <Grid item container md={8} xs={12} className={styles.cardWapper}>
                {category.map((cate, index) => {
                    return (
                        <Grid item xs={12} key={index} className={styles.cardContainer}>
                            <MyCardHeader title="Đại sảnh" />
                            {cate.map((item, index) => {
                                return (
                                    <CardPost
                                        icon={
                                            <FontAwesomeIcon
                                                icon={faComment}
                                                color="#86adc1"
                                                size="sm"
                                            />
                                        }
                                        titleCard="Thông báo"
                                        post={post}
                                        index={index}
                                    />
                                );
                            })}
                        </Grid>
                    );
                })}
            </Grid>
            <Grid item md={4} container className={styles.rightBox}>
                <Grid item xs={12} className={styles.categoryWapper}>
                    <RightBox />
                </Grid>
            </Grid>
        </Grid>
    );
};
