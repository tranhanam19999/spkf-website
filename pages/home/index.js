import { RenderHomeDesktop } from '../../containers/desktop/home';
import { getCookie } from '../../utils';
import { getListPostApi } from '../../api/post';
import { getUserInfoApi, getUserBytokenApi } from '../../api/user';
import { getCategoryInfoApi, getCategoryListApi } from '../../api/category';

const LIMIT = 50;

export const loadingHome = async (ctx) => {
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
    if (token) {
        const resListPost = await getListPostApi(token, 0, LIMIT);
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
            const resCates = await getCategoryListApi(0, 500, token);
            if (resCates.status === 200) {
                props.categorys = resCates.data.data;
            }
            const resUserInfo = await getUserBytokenApi(token);
            if (resUserInfo.status === 200) {
                props.infoUser = resUserInfo.data.data[0];
            }
        } else {
            props.invalidToken = true;
        }
    } else {
        props.invalidToken = true;
    }
    return props;
};

export async function getServerSideProps(ctx) {
    const value = await loadingHome(ctx);
    // console.log('BBBBBBB', value);
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

export const Home = (props) => {
    const { isMobile } = props;
    return <RenderHomeDesktop {...props} />;
};

export default Home;
