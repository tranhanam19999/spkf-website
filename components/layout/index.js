import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { NavBar } from '../header/navbar';
import { Footer } from '../footer';
import styles from './layout.module.css';

export const Layout = (props) => {
    const router = useRouter();
    const { children, isMobile } = props;

    useEffect(() => {}, []);

    const onSelectedSideBar = (selectedOption) => {
        router.push(selectedOption.to);
    };

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
            </Head>
            <div>
                {router.pathname.includes('/login') ? <NavBar login={true}/> : <NavBar />}
                <div>{children}</div>
                {router.pathname.includes('/login') ? <Footer footerWapperStyle={styles.footer}/> : <Footer />}
            </div>
        </>
    );
};

export default Layout;
