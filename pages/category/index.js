import { RenderCategoryDesktop } from '../../containers/desktop/category';

export const loadingCategory = async (ctx) => {
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

export const Category = (props) => {
    const { isMobile } = props;
    if (isMobile) {
        return  <a>Category</a>;
    }
    return (
        <RenderCategoryDesktop isMobile={isMobile} />
    )
};

export default Category
