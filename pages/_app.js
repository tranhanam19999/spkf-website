import React from 'react';
import NextApp from 'next/app';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { Layout } from '../components/layout';
import withReduxStore from '../lib/with-redux-store';
import '../styles/globals.css';
import { MOBILE } from 'utils';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist'

export const theme = createTheme({
    palette: {
        primary: {
            main: '#1D6692',
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
    const persistor = persistStore(reduxStore)
    return (
        <Provider store={reduxStore}>
            <PersistGate loading={null} persistor={persistor}>
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
            </PersistGate>
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
