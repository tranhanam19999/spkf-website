import { MyCardHeader } from '../../../components/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { TrendingCard } from '../../../components/post/trendingCard';
import { Grid, Typography, TextField, makeStyles, Box } from '@material-ui/core';
import { CardPost } from '../../../components/post';
import Image from 'next/image';
import styles from './home.module.css';
import { RightBox } from '../../../components/category'

export const RenderHomeDesktop = () => {
    const trendings = [1, 2, 3, 4, 5, 6];
    const news = [1,2,3,4,5,6,7,8];
    const post = {
        author: 'Hà Nam',
        title: 'Chi sẻ mẹo để có thể trở thàng full sờ tắc Developer',
        category: 'Học tập',
        createTime: 1519129853500,
        totalViews: 100,
    };

    return (
        <>
            <div className={styles.headerWapper}>
                <Image
                    src="/no-image.jpg"
                    className={styles.headerImage}
                    layout="fill"
                    objectFit="fill"
                />
                <div className={styles.headerTitleWapper}>
                    <span className={styles.welcomeText}>Chào mừng bạn đến với</span>
                    <span className={styles.headerTitle}>Diễn đàn sinh viên</span>
                    <span className={styles.headerTitle}>Đại học Sư phạm kĩ thuật</span>
                    <span className={styles.headerTitle}>TP.HCM</span>
                </div>
            </div>
            <div className={styles.bodyWapper}>
                <div className={styles.trendingWapper}>
                    <div className={styles.trendingTitleWapper}>
                        <span>TRENDING tại diễn đàn</span>
                    </div>
                    <Grid container spacing={2}>
                        {trendings.map((item, index) => {
                            return (
                                <Grid item xs={4} key={index}>
                                    <TrendingCard post={post} />
                                </Grid>
                            );
                        })}
                    </Grid>
                </div>
                <Grid container className={styles.cardWapper} spacing={2}>
                    <Grid item xs={8} container>
                        <Grid item container xs={12} className={styles.newsWapper}>
                            <Grid item xs={12}>
                                <MyCardHeader title="Bản tin" />
                            </Grid>
                            <Grid
                                item
                                container
                                xs={12}
                                className={styles.listCart}
                            >
                                {news.map((item, index) => {
                                    return (
                                        <Grid item xs={6} key={index} className={styles.cardNewsWapper}>
                                            <TrendingCard post={post} />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} className={styles.matingWapper}>
                            <Grid item xs={12}>
                                <MyCardHeader title="Góc Mating" />
                            </Grid>
                            <Grid item container spacing={0} xs={12} className={styles.listCart}>
                                {news.map((item, index) => {
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
                        </Grid>
                    </Grid>
                    <Grid item xs={4} className={styles.rightBoxWapper}>
                        <Grid item xs={12} className={styles.categoryWapper}>
                            <RightBox/>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};
