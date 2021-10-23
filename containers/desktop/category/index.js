import { MyCardHeader } from '../../../components/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { Grid, Typography, TextField, makeStyles, Box } from '@material-ui/core';
import Image from 'next/image';
import styles from './category.module.css';
import { CardPost } from '../../../components/post';
import { Category } from '../../../components/category';
import { TitleCard } from '../../../components/post/titleCard';

export const RenderCategoryDesktop = (props) => {
    const items = [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14];
    const category = [items, items, items, items];
    const post = {
        author: 'Nam Trần',
        createTime: 1519129853500,
        title: ' Sinh viên ute Trần Hà Nam tham gia clc be dancer',
    };

    return (
        <Grid container className={styles.wapper}>
            <Grid item container md={8} xs={12} className={styles.cardWapper}>
                {/* {category.map((cate, index) => {
                    return ( */}
                        <Grid item container xs={12} className={styles.cardContainer}>
                            <MyCardHeader title="Đại sảnh"/>
                            <Grid item container xs={12} className={styles.listCateWapper}>
                                {items.map((item, index) => {
                                    return (
                                        <Grid
                                            item
                                            xs={12}
                                            key={index}
                                            className={styles.cardNewsWapper}
                                            >
                                            <TitleCard
                                                post={post}
                                                isCate={true}
                                            />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Grid>
                    {/* );
                })} */}
            </Grid>
            <Grid item md={4} container className={styles.rightBox}>
                <Grid item xs={12} className={styles.categoryWapper}>
                    <Category isCate={true}/>
                </Grid>
            </Grid>
        </Grid>
    );
};
