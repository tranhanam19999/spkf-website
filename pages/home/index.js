import { RenderHomeDesktop } from '../../containers/desktop/home';

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
    const { isMobile } = props;
    console.log("props", isMobile)
    // if (isMobile) {
    //     return  <a>Home</a>;
    // }
    return (
        <RenderHomeDesktop isMobile={isMobile} />
    )
};

export default Home
