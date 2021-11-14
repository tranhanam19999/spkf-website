import { PostCreateDesktop } from '../../containers/desktop/post/create';
import { post, comments, user } from '../../utils/constant';

export const loadingCreatePost = async (ctx) => {
    const props = {
        cate: {},
    };

    props.cate= 'Học tập'
    return props;
};

export async function getServerSideProps(ctx) {
    const props = await loadingCreatePost(ctx)
    return { props };
}

const renderPostCreate = (props) => {
    return <PostCreateDesktop {...props} />;
};

export default function Post(props) {
    return renderPostCreate(props);
}
