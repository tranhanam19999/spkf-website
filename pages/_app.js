import React from 'react';
import NextApp from 'next/app';
import withReduxStore from '../lib/with-redux-store';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { Layout } from '../components/layout';
import '../styles/globals.css';

const MOBILE = /Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i;

// import React from "react";
// import NextApp from "next/app";
// import withReduxStore from '../lib/with-redux-store'
// import { Provider } from 'react-redux'

// class App extends NextApp {
//   static async getInitialProps({ Component, ctx }) {
//     let pageProps = {};

//     if (Component.getInitialProps) {
//       pageProps = await Component.getInitialProps(ctx);
//     }

//     return {
//       pageProps
//     };
//   }

//   render() {
//     const { Component, pageProps, reduxStore } = this.props;
//     console.log("appjs",this.props)
//     return (
//       <Provider store={reduxStore}>
//         <Component {...pageProps} />
//       </Provider>
//     );
//   }
// }

// export default withReduxStore(App)

function MyApp({ Component, pageProps, reduxStore }) {
    const { isMobile } = pageProps;
    console.log('ismObile ', isMobile)
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
            isMobile: !!isMobile,
        },
    };
};

export default withReduxStore(MyApp);
