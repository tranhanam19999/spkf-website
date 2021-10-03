
export const loadingHome = async(ctx) => {
    props = {
        home: [],
    }
    return props
}

export async function getServerSideProps(ctx) {
    const res = loadingHome(ctx);
    return res
}

const renderHome = (props) => {
    console.log("props", props);
    return (
        <a>Home</a>
    )
}

export default function Home(props) {
    return renderHome(props)
};