import {customGetServerSession} from "@/utils/returnPropsWithSession";
import MainLayout from "@/components/Layouts/MainLayout";
import Flowers from "@/components/PageComponents/admin/flowers/Flowers";
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
    } else {
        const flowers = await prisma.Flowers.findMany({
            where: {
                deleted: false
            }
        })
        return {
            props: {
                flowersData: flowers
            }
        }
    }
   
}

const AdminFlowersPage = ({flowersData}) => {
    return (
        <div><Flowers flowersData={flowersData}/></div>
    )
}

AdminFlowersPage.getLayout = function getLayout(page) {
    return (
        <MainLayout session={page.props.session} iconSrc={'/assets/icons/bouquets.svg'} title={'Типи квіток'}>
            {page}
        </MainLayout>
    )
}

export default AdminFlowersPage;