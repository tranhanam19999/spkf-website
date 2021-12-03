import { PostCreateDesktop } from '../../containers/desktop/post/create';
import { post, comments, user } from '../../utils/constant';
import { getCookie } from '../../utils';
import { getCategoryListApi } from '../../api/category';

export const loadingCreatePost = async (ctx) => {
    const props = {
        categorys: [],
    };

    const cookie = ctx.req.headers.cookie;
    const token = getCookie(cookie);
    props.token = token;

    const resCates = await getCategoryListApi(0, 500, token);
    if (resCates.status === 200) {
        props.categorys = resCates.data.data;
    } else {
        props.invalidToken = true;
    }

    props.cate = 'Học tập';
    return props;
};

export async function getServerSideProps(ctx) {
    const props = await loadingCreatePost(ctx);

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

const renderPostCreate = (props) => {
    return <PostCreateDesktop {...props} />;
};

export default function Post(props) {
    return renderPostCreate(props);
}
