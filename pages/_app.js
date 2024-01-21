import '@/styles/globals.scss'
import {SessionProvider} from "next-auth/react";
import NextNProgress from 'nextjs-progressbar';
import {Toaster} from "react-hot-toast";

export default function App({ Component, pageProps: {session, ...pageProps} }) {
    const getLayout = Component.getLayout || ((page) => page)

    return (
    <>
        <NextNProgress color="#9DCA39" startPosition={0.3} stopDelayMs={500} height={6} showOnShallow={true} />
        <Toaster
            position="top-center"
            reverseOrder={false}
        />
        <SessionProvider session={session}>
            {getLayout(<Component {...pageProps} />)}
        </SessionProvider>
    </>
    )
}
