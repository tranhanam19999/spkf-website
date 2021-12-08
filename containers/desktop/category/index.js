import { MyCardHeader } from '../../../components/card';
import { Grid} from '@material-ui/core';
import styles from './category.module.css';
import { Category } from '../../../components/category';
import { TitleCard } from '../../../components/post/titleCard';
import { Breadcrumb } from '../../../components/breadcrumb';
import { useRouter } from 'next/router';
import { CustomButton } from '../../../components/button';

export const RenderCategoryDesktop = (props) => {
    const { listPost, categorys, token, totalPost } = props
    console.log("props", props)
    const router = useRouter();

    const handleCreatePost = () => {
        router.push({
            pathname: '/post/create',
        });
    }

    const handleRedirectPost = () => {
        router.push({
            pathname: '/post/detail',
        });
    }

    return (
        <div className={styles.wapper} style={{minHeight: 'calc(100vh - 64px - 60px)'}}>
            <Breadcrumb route={router.asPath} detailEndpoint="Học tập"/>
            <div className={styles.btnCreate}>
                <CustomButton text="Tạo bài viết &#43;" styleNomal={true} onClick={handleCreatePost}/>
            </div>
            <Grid container>
                <Grid item container md={8} xs={12} className={styles.cardWapper}>
                    <Grid item container xs={12} className={styles.cardContainer}>
                        <MyCardHeader title="Học tập" />
                        <Grid item container xs={12} className={styles.listCateWapper}>
                            {listPost.map((post, index) => {
                                return (
                                    <Grid
                                        item
                                        xs={12}
                                        key={index}
                                        className={styles.cardNewsWapper}
                                        onClick={() => handleRedirectPost()}
                                    >
                                        <TitleCard post={post} isCate={true} />
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
                        <Category isCate={true} listCategory={categorys}/>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};
