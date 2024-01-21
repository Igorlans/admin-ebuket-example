import {customGetServerSession} from "@/utils/returnPropsWithSession";
import MainLayout from "@/components/Layouts/MainLayout";
import ShopPage from "@/components/PageComponents/admin/shops/shopPage/ShopPage";
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
    const storeId = Number(id)

    let orders = await prisma.orders.findMany({
		where: {
			Buket: {
                storeId
            },
		},
        include: {
            Buket: {
                include: {
                    idStore: true
                }
            },
			OrderAddition: true
        }
	})

	let quickOrders = await prisma.QuickOrder.findMany({
		where: {
			Buket: {
                storeId
            },
		},
        include: {
            Buket: true,
			Addition: true
        }
	})

    orders = JSON.parse(JSON.stringify(orders))
    quickOrders = JSON.parse(JSON.stringify(quickOrders))

    return {
        props: {
            orders,
            quickOrders
        }
    }

}
const AdminApproveBouquetPage = ( { orders, quickOrders } ) => {
    return (
        // <div>{JSON.stringify(bouquet)}</div>
        <div><ShopPage orders={orders} quickOrders={quickOrders} /></div>
    )
}

AdminApproveBouquetPage.getLayout = function getLayout(page) {
    console.log(page);
    return (
        <MainLayout session={page.props.session} iconSrc={'/assets/icons/bouquets.svg'} title={`Магазин "${page.props.orders?.[0].Buket.idStore.shop_name}"`}>
            {page}
        </MainLayout>
    )
}

export default AdminApproveBouquetPage;