import React from 'react';
import NextApp from 'next/app';
import withReduxStore from '../lib/with-redux-store';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { Layout } from '../components/layout';
import '../styles/globals.css';

const MOBILE = /Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i;
function MyApp({ Component, pageProps, reduxStore }) {
    const { isMobile } = pageProps;

    return (
        <Provider store={reduxStore}>
            <Layout isMobile={isMobile}>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}

MyApp.getInitialProps = async (appContext) => {
    const appProps = await NextApp.getInitialProps(appContext);

    let isMobile = '';
    try {
        const UA = appContext.ctx.req.headers['user-agent'];
        isMobile = Boolean(UA.match(MOBILE));
    } catch (error) {
        isMobile = `can not detect device - ${error}`;
    }

    return {
        ...appProps,
        pageProps: {
            isMobile: !!isMobile
        }
    };
};

export default withReduxStore(MyApp);
