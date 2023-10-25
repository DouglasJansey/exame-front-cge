import Head from 'next/head';
import Producs from '@/components/products/listproducts'

export default function Home() {
    return (
        <div>
            <Head>
                <title>Exame Prático CGE-RJ</title>
            </Head>
            <Producs />
        </div>
    );
}
