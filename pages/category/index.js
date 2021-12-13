import { RenderCategoryDesktop } from '../../containers/desktop/category';
import { getListPostByCategory, getListPostApi } from '../../api/post';
import { getCookie } from '../../utils';
import { getUserInfoApi } from '../../api/user';
import { getCategoryInfoApi, getCategoryListApi } from '../../api/category';

export const loadingCategory = async (ctx) => {
    const props = {
        trendingPost: [],
        listPost: [],
        token: '',
        invalidToken: false,
        infoUser: {},
        categorys: [],
        totalPost: 0,
    };
    const cookie = ctx.req.headers.cookie;
    const token = getCookie(cookie);
    props.token = token;

    const { categoryId } = ctx.query;

    if (token) {
        const resListPost = await getListPostByCategory(categoryId, token, 0, 500);
        if (resListPost.status === 200) {
            if (resListPost.data.data?.length > 0) {
                props.totalPost = resListPost.data.total;
                const data = JSON.parse(JSON.stringify(resListPost.data.data));
                const tempListPost = data.map(async (item) => {
                    let cateInfo = {};
                    let userInfo = {};
                    if (item.authorId) {
                        const resUser = await getUserInfoApi(item.authorId, token);
                        if (resUser.status === 200) {
                            userInfo = resUser.data.data[0];
                        }
                    }
                    if (item.categoryId) {
                        const resCate = await getCategoryInfoApi(item.categoryId, token);
                        if (resCate.status === 200) {
                            cateInfo = resCate.data.data[0];
                        }
                    }
                    return {
                        ...item,
                        cateInfo: cateInfo,
                        userInfo: userInfo,
                    };
                });
                const result = await Promise.all(tempListPost);
                props.trendingPost = result;
                props.listPost = result;
            }
        } else {
            console.log("resListPost", resListPost)
        }

        const resCates = await getCategoryListApi(0, 500, token);
        if (resCates.status === 200) {
            props.categorys = resCates.data.data;
        }
    } else {
        props.invalidToken = true;
    }

    return props;
};

export async function getServerSideProps(ctx) {
    const value = await loadingCategory(ctx);
    const props = {
        ...value,
    };

    if (props.invalidToken) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return { props };
}

export const Category = (props) => {
    const { isMobile } = props;
    if (isMobile) {
        return <a>Category</a>;
    }
    return <RenderCategoryDesktop {...props} />;
};

export default Category;
