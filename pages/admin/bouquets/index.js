import {customGetServerSession} from "@/utils/returnPropsWithSession";
import MainLayout from "@/components/Layouts/MainLayout";
import Bouquets from "@/components/PageComponents/admin/bouquets/Bouquets";
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
        let bouquets = await prisma.buket.findMany({
            where: {
                deleted: false
            }
        })
        bouquets = JSON.parse(JSON.stringify(bouquets))
        return {
            props: {
                bouquets
            }
        }
    }
}
const AdminBouquetsPage = ({bouquets}) => {
    return (
        <div><Bouquets bouquets={bouquets} /></div>
    )
}

AdminBouquetsPage.getLayout = function getLayout(page) {
    return (
        <MainLayout session={page.props.session} iconSrc={'/assets/icons/bouquets.svg'} title={'Букети'}>
            {page}
        </MainLayout>
    )
}

export default AdminBouquetsPage;