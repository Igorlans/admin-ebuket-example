import MainLayout from "@/components/Layouts/MainLayout";
import Flowers from "@/components/PageComponents/assortment/Flowers/Flowers";
import prisma from "@/prisma/client";
import withAuth from "@/utils/withAuth";
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

    const flowers = await prisma.store_flower.findMany({
        where: {
            storeId: session?.user?.storeId,
        },
        include: {
            flower: true
        }
    })

    return {
        props: {
            flowers: flowers
        }
    }
}

function FlowersPage({flowers}) {
    return (
        <Flowers flowers={flowers} />
    )
}

FlowersPage.getLayout = function getLayout(page) {
    return (
        <MainLayout session={page.props.session} iconSrc={'/assets/icons/assortment.svg'} title={'Квіти'}>
            {page}
        </MainLayout>
    )
}

export default withAuth(FlowersPage)
