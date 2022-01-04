import { MyCardHeader } from '../../../components/card';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { TrendingCard } from '../../../components/post/trendingCard';
import { TitleCard } from '../../../components/post/titleCard';
import { Grid, Typography, TextField, makeStyles, Box } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { CardPost } from '../../../components/post';
import Image from 'next/image';
import styles from './home.module.css';
import { Category } from '../../../components/category';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getListPost } from '../../../store/post/postSlice';
import { setInfoUser, logoutUser } from '../../../store/user/userSlice';
import { LoadingScreen } from '../../../components/loading';
import { limitGetPost } from '../../../utils/constant';

export const RenderHomeDesktop = (props) => {
    const { trendingPost, listPost, infoUser, categorys, totalPost } = props;
    const router = useRouter();
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.user);
    const [isLoading, setIsloading] = useState(true);
    const total = Math.floor(totalPost / limitGetPost);
    const page = router.query.page ? parseInt(router.query.page, 10) : 1;
    const [pageCurrent, setPage] = useState(isNaN(page) ? 0 : page);

    const handleRedirectPost = (postId) => {
        router.push({
            pathname: '/post/detail',
            query: { postId },
        });
    };

    const handleRedirect = (path) => {
        router.push(path);
    };

    const handleChangePage = (event, value) => {
        setIsloading(true);
        router.push({
            pathname: '/home',
            query: {
                page: value,
            },
        });
        setPage(value);
    };

    useEffect(() => {
        if (listPost && trendingPost) {
            setIsloading(false);
        }
        if (infoUser) {
            dispatch(setInfoUser(infoUser));
        }
        if (!infoUser && !trendingPost && !listPost) {
            dispatch(logoutUser());
            handleRedirect('/login');
        }
    }, [listPost, trendingPost, infoUser]);

    return (
        <>
            {isLoading && <LoadingScreen position={'fixed'}/>}
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
                                            <TrendingCard
                                                post={item}
                                                handleRedirectPost={handleRedirectPost}
                                            />
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
                                    {listPost.reverse().map((item, index) => {
                                        return (
                                            <Grid
                                                key={`post-${index}`}
                                                item
                                                xs={12}
                                                key={index}
                                                className={styles.cardNewsWapper}
                                                onClick={() => handleRedirectPost(item.postId)}
                                            >
                                                <TitleCard post={item} />
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </Grid>
                        )}
                        <Grid
                            item
                            xs={12}
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="flex-start"
                            className={styles.paginationWrapper}
                        >
                            <Pagination
                                count={total}
                                page={pageCurrent}
                                onChange={(e, page) => handleChangePage(e, page)}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={4} className={`${styles.rightBoxWapper}`}>
                        <Category listCategory={categorys} />
                    </Grid>
                </Grid>
            </div>
        </>
    );
};
