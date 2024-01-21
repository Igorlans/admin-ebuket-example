import {useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import toast from "react-hot-toast";
import {FcInfo} from 'react-icons/fc'

const redirectPaths = [
    '/settings/company',
    '/settings/payments',
    '/settings/schedule',
    '/settings/shipping',
]

const useVerificationRedirect = () => {

    const router = useRouter();
    const pathname = usePathname();
    const {data: session} = useSession();
    const verification = () => {
        if (session?.user?.store?.verified) return;
        if(!session?.user?.store?.verifyStep) return;
        const redirectPath = redirectPaths[session.user.store.verifyStep - 1]
        router.push(redirectPath)
        if (pathname !== redirectPath) {
            toast('Щоб почати продавати квіти, зробіть початкові налаштування магазину', {
                icon: <FcInfo  size={'50px'}/>,
            });
        }
    }

    useEffect(() => {
        verification()
    }, [session])
    return session;
}

export default useVerificationRedirect;