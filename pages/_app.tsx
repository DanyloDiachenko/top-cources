import { AppProps } from "next/dist/shared/lib/router/router";
import Head from "next/head";
import "../styles/globals.css";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({
    subsets: ["cyrillic", "latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
});

const MyApp = ({ Component, pageProps, router }: AppProps): JSX.Element => {
    return (
        <>
            <Head>
                <title>OwlTop - лучший агрегатор курсов</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://mc.yandex.ru" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <link
                    rel="icon"
                    type="image/x-icon"
                    href="https://img.icons8.com/cotton/512/owl.png"
                />
                <meta
                    property="og:url"
                    content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}
                />
                <meta property="og:locale" content="ru_RU" />
                <meta
                    name="description"
                    content="OwlTop / My Top - лучший агрегатор курсов, найдите нужные курсы и интересующую вас информацию о них за считанные минуты"
                />
                <meta name="robots" content="all" />
            </Head>
            <>
                <style jsx global>{`
                    html {
                        font-family: ${notoSans.style.fontFamily};
                    }
                `}</style>
                <Component {...pageProps} />
            </>
        </>
    );
};

export default MyApp;
