import React from 'react';
import NextApp from 'next/app';
import withReduxStore from '../lib/with-redux-store';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Layout } from '../components/layout'
import '../styles/globals.css';

const MOBILE = /Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i;
function MyApp({ Component, pageProps, reduxStore }) {
  console.log("appjs",pageProps)
      return (
      <Provider store={reduxStore}>
          <Layout isMobile={pageProps.isMobile} >
            <Component {...pageProps} />
            <ToastContainer limit={2} pauseOnHover={false} hideProgressBar autoClose={2000} closeOnClick />
          </Layout>
      </Provider>
    );
}

MyApp.getInitialProps = async (appContext) => {
    let isMobile = '';
    try {
        const UA = appContext.ctx.req.headers['user-agent'];
        isMobile = Boolean(UA.match(MOBILE));
    } catch (error) {
        isMobile = `can not detect device - ${error}`;
    }

    return {
        pageProps: {
            isMobile: !!isMobile,
        },
    };
};

export default withReduxStore(MyApp);
