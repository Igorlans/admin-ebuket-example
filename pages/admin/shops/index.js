import {customGetServerSession} from "@/utils/returnPropsWithSession";
import MainLayout from "@/components/Layouts/MainLayout";
import Shops from "@/components/PageComponents/admin/shops/Shops";
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
        let shops = await prisma.store.findMany({})
        let orders = await prisma.orders.findMany({
            include: {
                Buket: {
                    include: {
                        idStore: true
                    }
                },
            }
        })
        shops = JSON.parse(JSON.stringify(shops))
        orders = JSON.parse(JSON.stringify(orders))
        
        return {
            props: {
                shops,
                orders
            }
        }
    }
}
const AdminBouquetsPage = ({ shops, orders }) => {
    return (
        <div><Shops shops={ shops } orders={orders} /></div>
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