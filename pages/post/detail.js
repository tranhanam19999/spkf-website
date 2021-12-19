import { PostDetailDesktop } from '../../containers/desktop/post/detail';
import { post, comments, user } from '../../utils/constant';
import { getPostByIDApi } from '../../api/post';
import { getUserInfoApi } from '../../api/user';
import { getCategoryListApi } from '../../api/category';
import { getCookie } from '../../utils';
import { getCommentInPostApi } from '../../api/comment';

export const loadingHome = async (ctx) => {
    const props = {
        postInfo: null,
        comments: [],
        isInvalid: false,
        listAuthor: [],
        categorys: [],
    };

    const { postId } = ctx.query;
    const cookie = ctx.req.headers.cookie;
    const token = getCookie(cookie);
    props.token = token;

    if (postId && token) {
        //get post
        const resPost = await getPostByIDApi(postId, token);
        if (resPost.status === 200) {
            props.postInfo = resPost.data.data;
            // get list comments
            const resCom = await getCommentInPostApi(postId, token);
            if (resCom.status === 200) {
                const comments = resCom.data.data.map(comment => { return {...comment, indexSize: 1}})
                props.comments = comments;
            }

            const listAuthorId = [resPost.data.data.authorId];
            resCom.data.data.map((item) => {
                if (!listAuthorId.find((i) => i === item.authorId)) {
                    listAuthorId.push(item.authorId);
                }
            });
            // get list user
            const listAu = await Promise.all(
                listAuthorId.map(async (item) => {
                    const resAuInfo = await getUserInfoApi(item, token);
                    if (resAuInfo.status === 200) {
                        return resAuInfo.data.data[0];
                    } else {
                        return {};
                    }
                })
            );
            props.listAuthor = listAu;

            //getListCate
            const resCates = await getCategoryListApi(0, 500, token);
            if (resCates.status === 200) {
                props.categorys = resCates.data.data;
            }
        }
        if (
            resPost.status === 400 ||
            resPost.status === 404 ||
            resPost.status === 403 ||
            resPost.status === 401 ||
            resPost.status === 500
        ) {
            props.isInvalid = true;
        }
    } else {
        props.isInvalid = true;
    }

    return props;
};

export async function getServerSideProps(ctx) {
    const props = await loadingHome(ctx);

    if (props.isInvalid) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return { props };
}

const renderPostDetail = (props) => {
    return <PostDetailDesktop {...props} />;
};

export default function Post(props) {
    return renderPostDetail(props);
}
