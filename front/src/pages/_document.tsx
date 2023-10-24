import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="pt-br">
            <Head>
                <link rel="icon" type="image/x-icon" href="images/logoRJ.png" />
                <meta charSet='UTF-8'/>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
