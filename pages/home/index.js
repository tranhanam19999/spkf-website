export const loadingHome = async (ctx) => {
    const props = {
        home: { a: 3 },
    };
    return props;
};

export async function getServerSideProps(ctx) {
    // const res = {
    //     props: {
    //         ...loadingHome(ctx)
    //     }
    // }
    // return res
    const props = {
        home: {
            a: 3,
        },
    };

    return { props };
}

const renderHome = (props) => {
    console.log('propsfromclient ', props);
    return <a>Home</a>;
};

export default function Home(props) {
    console.log('propshome', props);
    return renderHome(props);
}
