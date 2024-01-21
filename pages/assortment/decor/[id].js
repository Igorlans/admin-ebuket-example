import MainLayout from "@/components/Layouts/MainLayout";
import DecorCreate from "@/components/PageComponents/assortment/Decor/DecorCreate/DecorCreate";
import withAuth from "@/utils/withAuth";
import prisma from "@/prisma/client";
import {customGetServerSession} from "@/utils/returnPropsWithSession";
import {managerRoles} from "@/config";

export async function getServerSideProps(ctx) {
    const session = await customGetServerSession(ctx);
    const {id: decorId} = ctx.query;
    console.log('decorId', decorId)
    console.log('Server session', session)
    const decor = await prisma.decor.findUnique({
        where: {
            id: Number(decorId)
        }
    })
    console.log('decor =========', decor)

    if (!decor) return {notFound: true}


    if (session?.user?.storeId !== decor?.storeId || !managerRoles.includes(session?.user?.role)) {
        return {
            redirect: {
                permanent: false,
                destination: '/authError'
            }
        }
    }

    return {
        props: {
            decor
        }
    }
}


function DecorUpdatePage({decor}) {
    return <DecorCreate decor={decor} />
}

DecorUpdatePage.getLayout = function getLayout(page) {
    return (
        <MainLayout session={page.props.session} iconSrc={'/assets/icons/assortment.svg'} title={`Змінити оформлення "${page.props.decor.title}"`}>
            {page}
        </MainLayout>
    )
}

export default withAuth(DecorUpdatePage)