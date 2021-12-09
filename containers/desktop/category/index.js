import { MyCardHeader } from '../../../components/card';
import { Grid } from '@material-ui/core';
import styles from './category.module.css';
import { Category } from '../../../components/category';
import { TitleCard } from '../../../components/post/titleCard';
import { Breadcrumb } from '../../../components/breadcrumb';
import { CustomButton } from '../../../components/button';
import { useRouter } from 'next/router';
import { LoadingScreen } from '../../../components/loading';
import { useState, useEffect } from 'react';

export const RenderCategoryDesktop = (props) => {
    const { listPost, categorys, token, totalPost } = props;
    const router = useRouter();
    const { categoryId } = router.query;
    const [isLoading, setIsloading] = useState(true);
    console.log('props', props);

    const cateChoice = categorys.find((i) => i.categoryId === categoryId);
    console.log("cateChoice", cateChoice)

    const handleCreatePost = () => {
        router.push({
            pathname: '/post/create',
        });
    };

    const handleRedirectPost = (postId) => {
        router.push({
            pathname: '/post/detail',
            query: {
                postId: postId,
            },
        });
    };

    useEffect(() => {
        setIsloading(false);
    }, [categorys, listPost]);

    return !isLoading ? (
        <div className={styles.wapper} style={{ minHeight: 'calc(100vh - 64px - 60px)' }}>
            <Breadcrumb route={router.asPath} detailEndpoint={cateChoice.name} />
            <div className={styles.btnCreate}>
                <CustomButton
                    text="Tạo bài viết &#43;"
                    styleNomal={true}
                    onClick={handleCreatePost}
                />
            </div>
            <Grid container>
                <Grid item container md={8} xs={12} className={styles.cardWapper}>
                    <Grid item container xs={12} className={styles.cardContainer}>
                        <MyCardHeader title="Danh sách bài viết" />
                        {listPost.length == 0 ? (
                            <div className={styles.emptyText}>Chưa có dữ liệu</div>
                        ) : (
                            <Grid item container xs={12} className={styles.listCateWapper}>
                                {listPost.map((post, index) => {
                                    return (
                                        <Grid
                                            item
                                            xs={12}
                                            key={index}
                                            className={styles.cardNewsWapper}
                                            onClick={() => handleRedirectPost(post.postId)}
                                        >
                                            <TitleCard post={post} isCate={true} />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        )}
                    </Grid>
                    {/* );
                })} */}
                </Grid>
                <Grid item md={4} container className={styles.rightBox}>
                    <Grid item xs={12} className={styles.categoryWapper}>
                        <Category isCate={true} listCategory={categorys} />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    ) : (
        <>
        <div style={{height: 'calc(100vh - 64px - 60px)'}}></div>
         <LoadingScreen />
        </>
       
    );
};
