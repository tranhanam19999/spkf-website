import React from 'react';
import withReduxStore from '../lib/with-redux-store';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { Layout } from '../components/layout';
import '../styles/globals.css';
import { MOBILE } from 'utils';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#00b46e',
            dark: '#00a45e',
            contrastText: '#fff',
        },
    },
    typography: {
        button: {
            textTransform: 'none',
        },
    },
});

function MyApp({ Component, pageProps, reduxStore }) {
    return (
        <Provider store={reduxStore}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Layout isMobile={pageProps.isMobile}>
                    <Component {...pageProps} />
                    <ToastContainer
                        limit={2}
                        pauseOnHover={false}
                        hideProgressBar
                        autoClose={2000}
                        closeOnClick
                    />
                </Layout>
            </ThemeProvider>
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
