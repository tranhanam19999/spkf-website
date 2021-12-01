export const loadingHome = async (ctx) => {
    const props = {
        home: { a: 3 },
    };
    return props;
};

export async function getServerSideProps(ctx) {
    const props = {
        home: {
            ab: 3,
        },
    };

    return { props };
}

const renderPost = (props) => {
    return <a>Post</a>;
};

export default function Post(props) {
    return renderPost(props);
}
