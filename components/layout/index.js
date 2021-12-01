import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { NavBar } from '../header/navbar';

export const Layout = (props) => {
    const router = useRouter();
    const { children, isMobile } = props;

    useEffect(() => {}, []);

    const onSelectedSideBar = (selectedOption) => {
        router.push(selectedOption.to);
    };

    // if (isMobile) {
    //     return (
    //         <>
    //             <Head>
    //                 <meta charSet="utf-8" />
    //                 <meta
    //                     name="viewport"
    //                     content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
    //                 />
    //                 <meta httpEquiv="Cache-Control" content="no-cache" />
    //                 <meta httpEquiv="Expires" content="-1" />
    //                 <meta name="keywords" content="POS Thuốc Sỉ" />
    //                 <meta name="description" content="Hệ thống điểm bán lẻ" />
    //                 <link rel="shortcut icon" href="/images/favicon-16x16.png" size="16x16" />
    //                 <link rel="shortcut icon" href="/images/favicon-32x32.png" size="32x32" />
    //                 <link rel="shortcut icon" href="/images/favicon-96x96.png" size="96x96" />
    //             </Head>
    //             <div>{children}</div>
    //         </>
    //     );
    // }

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
                />
                <meta httpEquiv="Cache-Control" content="no-cache" />
                <meta httpEquiv="Expires" content="-1" />
                <meta name="keywords" content="POS Thuốc Sỉ" />
                <meta name="description" content="Hệ thống điểm bán lẻ" />
                <link rel="shortcut icon" href="/images/favicon-16x16.png" size="16x16" />
                <link rel="shortcut icon" href="/images/favicon-32x32.png" size="32x32" />
                <link rel="shortcut icon" href="/images/favicon-96x96.png" size="96x96" />
            </Head>
            <div>
                {router.pathname.includes('/login') ? <></> : <NavBar />}
                <div>{children}</div>
            </div>
        </>
    );
};

export default Layout;
