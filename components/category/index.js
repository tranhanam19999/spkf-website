import { MyCardHeader } from '../card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { Grid, Typography, TextField, makeStyles, Box } from '@material-ui/core';
import Image from 'next/image';
import styles from './category.module.css';
import { useRouter } from 'next/router';
import { CategoryCard } from './card';

export const RightBox = () => {
    const router = useRouter();

    const redirectCategory = () => {
        // router.push({
        //     pathname: '/category',
        // });
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

export const Category = ({isCate, listCategory}) => {

    const router = useRouter();

    const handleRedirectCategory = (categoryId) => {
        router.push({
            pathname: '/category',
            query: { categoryId },
        });
    };

    const category = listCategory || [
        { name: 'Nội quy diễn đàn' },
        { name: 'Thông tin hot' },
        { name: 'Học tập' },
        { name: 'Việc làm & nhà trọ' },
        { name: 'Trao đổi & mua bán' },
        { name: 'Công nghệ & kĩ thuật' },
        { name: 'Kết bạn bốn phương' },
        { name: 'Tư vấn sinh viên' },
        { name: 'Cuộc thi' },
        { name: 'Review Môn học' },
        { name: 'Thể thao' },
        { name: 'Chia sẻ' },
    ];

    return (
        <>
            <Grid item xs={12}>
                <MyCardHeader title="Chủ đề" />
            </Grid>
            <Grid item container xs={12} className={isCate ? styles.listCateWapper : styles.listCart}>
                {category.map((item, index) => {
                    return (
                        <Grid
                            item
                            key={index}
                            xs={12}
                            className={styles.cardNewsWapper}
                            onClick={() => handleRedirectCategory(item.categoryId)}
                        >
                            <CategoryCard cate={item} />
                        </Grid>
                    );
                })}
            </Grid>
        </>
    )
}