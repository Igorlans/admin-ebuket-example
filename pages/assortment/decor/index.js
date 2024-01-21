import MainLayout from "@/components/Layouts/MainLayout";
import Decor from "@/components/PageComponents/assortment/Decor/Decor";
import withAuth from "@/utils/withAuth";
import prisma from "@/prisma/client";
import {customGetServerSession} from "@/utils/returnPropsWithSession";
import {managerRoles} from "@/config";
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

    const decors = await prisma.decor.findMany({
        where: {
            storeId: session.user.storeId
        }
    })

    console.log('DDSRFERDG', decors)

    return {
        props: {
            decors: decors
        }
    }

}
function DecorPage({decors}) {
    return <Decor decors={decors} />
}

DecorPage.getLayout = function getLayout(page) {
    return (
        <MainLayout session={page.props.session} iconSrc={'/assets/icons/assortment.svg'} title={'Оформлення'}>
            {page}
        </MainLayout>
    )
}

export default withAuth(DecorPage)
