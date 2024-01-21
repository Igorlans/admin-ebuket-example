import MainLayout from "@/components/Layouts/MainLayout";
import withAuth from "@/utils/withAuth";
import Orders from "@/components/PageComponents/orders/Orders";
import { customGetServerSession } from "@/utils/returnPropsWithSession";
import {managerRoles} from "@/config";
import prisma from "@/prisma/client";

export async function getServerSideProps(ctx) {
	const session = await customGetServerSession(ctx)

	if (!session?.user?.storeId || !managerRoles.includes(session?.user?.role)) {
		return {
			redirect: {
				permanent: false,
				destination: '/authError'
			}
		}
	}

	let orders = await prisma.orders.findMany({
		orderBy: {
			createdAt: 'desc'
		},
		where: {
			Buket: {
                storeId: session?.user?.storeId
            },
		},
        include: {
            Buket: true,
			OrderAddition: true
        }
	})

	let quickOrders = await prisma.quickOrder.findMany({
		orderBy: {
			createdAt: 'desc'
		},
		where: {
			Buket: {
                storeId: session?.user?.storeId
            },
		},
        include: {
            Buket: true,
			Addition: true
        }
	})


	
	orders = JSON.parse(JSON.stringify(orders))
	quickOrders = JSON.parse(JSON.stringify(quickOrders))
	console.log('orders', orders)

	const ALL_ORDERS = [...orders, ...quickOrders].sort((obj1, obj2) =>
		new Date(obj2.createdAt) - new Date(obj1.createdAt),
	);
	console.log('all orders', ALL_ORDERS)

	return {
		props: {
			orders: ALL_ORDERS
		}
	}
}


function OrdersPage({orders}) {
	return (
		<Orders orders={orders}/>
	)
}

OrdersPage.getLayout = function getLayout(page) {
	return (
		<MainLayout session={page.props.session} title={'Замовлення'} iconSrc={'/assets/icons/cart.svg'} iconAlt={'reviews_icon'}>
			{page}
		</MainLayout>
	)
}

export default withAuth(OrdersPage)
