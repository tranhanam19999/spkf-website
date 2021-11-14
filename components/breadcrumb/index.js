import { useRouter } from 'next/router';

export const Breadcrumb = ({ route, detailEndpoint }) => {
    const router = useRouter();
    const mappingRoute = (route) => {
        switch (route) {
            case '/category':
                return (
                    <>
                        <span onClick={() => router.push('/')}> Diễn đàn </span>
                    </>
                );
            case '/post/detail':
            case '/post/create':
                return (
                    <>
                        <span onClick={() => router.push('/')}> Diễn đàn </span>
                    </>
                )
        }
    };

    return (
        <div className={`breadCrumb`}>
            <div >
                <span>{mappingRoute(route)}</span>
                <span className={'activatedBreadcrumb'}>
                    {' > '}
                    {detailEndpoint}
                </span>
            </div>
            {/* <div className={subBreadCrumbItemsWrapperClassName}>{subBreadCrumbItems}</div> */}
        </div>
    );
};
