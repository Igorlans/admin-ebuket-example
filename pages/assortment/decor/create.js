import MainLayout from "@/components/Layouts/MainLayout";
import DecorCreate from "@/components/PageComponents/assortment/Decor/DecorCreate/DecorCreate";
import withAuth from "@/utils/withAuth";
import {customGetServerSession} from "@/utils/returnPropsWithSession";
import {managerRoles} from "@/config";
// import {customGetServerSession} from "@/utils/returnPropsWithSession";

// export async function getServerSideProps(ctx) {
//     const session = await customGetServerSession(ctx)
//
//     // ======== REDIRECT ========
//     if (!session) {
//         return {
//             redirect: {
//                 permanent: false,
//                 destination: '/login'
//             }
//         }
//     }
//
//     return {
//         props: {
//             sesh: session
//         }
//     }
//
// }

export async function getServerSideProps(ctx) {
    const session = await customGetServerSession(ctx);

    if (!session?.user?.storeId || !managerRoles.includes(session?.user?.role)) {
        return {
            redirect: {
                permanent: false,
                destination: '/authError'
            }
        }
    }

    return {
        props: {}
    }
}


function DecorCreatePage() {
    return <DecorCreate />
}

DecorCreatePage.getLayout = function getLayout(page) {
    return (
        <MainLayout session={page.props.session} iconSrc={'/assets/icons/assortment.svg'} title={'Додати оформлення'}>
            {page}
        </MainLayout>
    )
}

export default withAuth(DecorCreatePage)