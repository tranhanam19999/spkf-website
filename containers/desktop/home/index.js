import { MyCardHeader } from '../../../components/card';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { TrendingCard } from '../../../components/post/trendingCard';
import { TitleCard } from '../../../components/post/titleCard';
import { Grid, Typography, TextField, makeStyles, Box } from '@material-ui/core';
import { CardPost } from '../../../components/post';
import Image from 'next/image';
import styles from './home.module.css';
import { Category } from '../../../components/category';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getListPost } from '../../../store/post/postSlice';
import { setInfoUser } from '../../../store/user/userSlice';
import { LoadingScreen } from '../../../components/loading';

export const RenderHomeDesktop = (props) => {
    console.log("props", props);
    const {trendingPost,  listPost, infoUser, categorys, totalPost } = props;
    const router = useRouter();
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.user);
    const [isLoading, setIsloading] = useState(true);
    const [total, setTotal] = useState(totalPost);

    const handleRedirectPost = () => {
        router.push({
            pathname: '/post/detail',
        });
    };

    useEffect(() => {
        if (listPost && trendingPost) {
            setIsloading(false);
        }
        if (infoUser) {
            dispatch(setInfoUser(infoUser))
        }
    }, [listPost, trendingPost, infoUser]);

    return isLoading ? (
        <LoadingScreen />
    ) : (
        <>
            <div className={styles.headerWapper}>
                <Image
                    src="/spkf.png"
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
                {trendingPost && (
                    <div className={styles.trendingWapper}>
                        <div className={styles.trendingTitleWapper}>
                            <span className={styles.title}>TRENDING tại diễn đàn</span>
                        </div>
                        <Grid container spacing={2}>
                            {trendingPost.map((item, index) => {
                                if (index > 5) {
                                    return <></>;
                                } else {
                                    return (
                                        <Grid item xs={4} key={index}>
                                            <TrendingCard post={item} />
                                        </Grid>
                                    );
                                }
                            })}
                        </Grid>
                    </div>
                )}

                <Grid container className={styles.cardWapper} spacing={2}>
                    <Grid item xs={8} container>
                        {listPost && (
                            <Grid item container xs={12}>
                                <Grid item xs={12}>
                                    <MyCardHeader title="Bản tin" />
                                </Grid>
                                <Grid item container xs={12} className={styles.listCart}>
                                    {listPost.map((item, index) => {
                                        return (
                                            <Grid
                                                key={`post-${index}`}
                                                item
                                                xs={12}
                                                key={index}
                                                className={styles.cardNewsWapper}
                                                onClick={() => handleRedirectPost()}
                                            >
                                                <TitleCard post={item} />
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                    <Grid item xs={4} className={`${styles.rightBoxWapper}`}>
                        <Category listCategory={categorys}/>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};
