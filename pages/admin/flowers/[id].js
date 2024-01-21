import {customGetServerSession} from "@/utils/returnPropsWithSession";
import MainLayout from "@/components/Layouts/MainLayout";
import prisma from "@/prisma/client";

export const getServerSideProps = async (ctx) => {
    const session = await customGetServerSession(ctx);
    const isSuperUser = !!session?.user?.SuperUser?.id;

    if (!isSuperUser) {
        return {
            redirect: {
                permanent: false,
                destination: '/authError'
            }
        }
    }

    const {id} = ctx.query;

    const flower = await prisma.flowers.findUnique({
        where: {
            id: Number(id)
        }
    })

    if (!flower) return {notFound: true}

    return {
        props: {flower}
    }
}
const AdminUpdateFlowersPage = ({flower}) => {
    return (
        <div>{JSON.stringify(flower)}</div>
    )
}

AdminUpdateFlowersPage.getLayout = function getLayout(page) {
    return (
        <MainLayout session={page.props.session} iconSrc={'/assets/icons/bouquets.svg'} title={`Змінити квітку "${page.props.flower.title_ua}"`}>
            {page}
        </MainLayout>
    )
}

export default AdminUpdateFlowersPage;