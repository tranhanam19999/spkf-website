import { MyCardHeader } from '../../../components/card';
import { Grid } from '@material-ui/core';
import styles from './post.module.css';
import { Category } from '../../../components/category';
import { TitleCard } from '../../../components/post/titleCard';
import { Breadcrumb } from '../../../components/breadcrumb';
import { useRouter } from 'next/router';
import { CustomButton } from '../../../components/button';
import { PostDetail } from './paging';

export const PostDetailDesktop = (props) => {
    const router = useRouter();

    const handleCreatePost = () => {
        router.push({
            pathname:'/post/create',
        })
    };

    return (
        <div className={styles.wapper}>
            <Breadcrumb route={router.asPath} detailEndpoint="Học tập" />
            <div className={styles.btnCreate}>
                <CustomButton
                    text="Tạo bài viết &#43;"
                    styleNomal={true}
                    onClick={handleCreatePost}
                />
            </div>
            <Grid container>
                <Grid item container md={8} xs={12} className={styles.cardWapper}>
                    <PostDetail {...props}/>
                </Grid>
                <Grid item md={4} container className={styles.rightBox}>
                    <Grid item xs={12} className={styles.categoryWapper}>
                        <Category isCate={true} />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};
