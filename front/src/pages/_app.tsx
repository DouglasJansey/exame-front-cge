import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import "../../styles/globals.sass";
import "react-toastify/ReactToastify.css";
import Layout from '../components/layout';
import { AuthProvider } from '../../context/authContext';
import { CrudProvider } from '../../context/crudContext';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>CGE-RJ</title>
            </Head>
            <AuthProvider>
                <CrudProvider>
                    <Layout>
                        <Component {...pageProps} />
                        <ToastContainer />
                    </Layout>
                </CrudProvider>
            </AuthProvider>
        </>
    );
}
