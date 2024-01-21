import MainLayout from "@/components/Layouts/MainLayout";
import FlowersCreate from "@/components/PageComponents/assortment/Flowers/FlowersCreate/FlowersCreate";
import withAuth from "@/utils/withAuth";
import prisma from "@/prisma/client";
import {customGetServerSession} from "@/utils/returnPropsWithSession";
import {managerRoles} from "@/config";

export async function getServerSideProps(ctx) {
    const session = await customGetServerSession(ctx);
    const {id: flowerId} = ctx.query;

    const flower = await prisma.store_flower.findUnique({
        where: {
            id: Number(flowerId)
        },
        include: {
            flower: true
        }
    })

    if (!flower) return {notFound: true}


    if (session?.user?.storeId !== flower?.storeId || !managerRoles.includes(session?.user?.role)) {
        return {
            redirect: {
                permanent: false,
                destination: '/authError'
            }
        }
    }


    const flowers = await prisma.flowers.findMany()

    return {
        props: {
            flowers,
            flower
        }
    }
}
function FlowersUpdatePage({flowers, flower}) {
    console.log(flowers)
    return (
        <FlowersCreate flowers={flowers} flower={flower} />
    )
}

FlowersUpdatePage.getLayout = function getLayout(page) {
    return (
        <MainLayout session={page.props.session} iconSrc={'/assets/icons/assortment.svg'} title={`Змінити квітку "${page.props.flower.flower.title_ua} ${page.props.flower.variety}"`}>
            {page}
        </MainLayout>
    )
}

export default withAuth(FlowersUpdatePage)
