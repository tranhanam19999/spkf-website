export const loadingHome = async (ctx) => {
    const props = {
        home: { a: 3 },
    };
    return props;
};

export async function getServerSideProps(ctx) {
    const props = {
        home: {
            a: 3,
        },
    };

    return { props };
}

export const Home = (props) => {
    console.log('propsfromclient ', props);
    return <a>Home</a>;
};

export default Home
