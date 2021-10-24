import { PostDetailDesktop } from '../../containers/desktop/post/detail';
import { post, comments, user } from '../../utils/constant';

export const loadingHome = async (ctx) => {
    const props = {
        postInfo: {},
    };

    const resulstComment = comments.map((item)=>{
        const user_ = user.find((i)=>i.userId === item.authorId)
        return {
            ...item,
            userInfo: user_,
        }
    })
    const userOfPost = user.find((i)=>i.userId === post.authorId)
    const resultsPost = {...post, userInfo: userOfPost}

    props.postInfo= {...resultsPost, comments: resulstComment}
    return props;
};

export async function getServerSideProps(ctx) {
    const props = await loadingHome(ctx)
    return { props };
}

const renderPostDetail = (props) => {
    return <PostDetailDesktop {...props} />;
};

export default function Post(props) {
    return renderPostDetail(props);
}
