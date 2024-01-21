import MainLayout from "@/components/Layouts/MainLayout";
import ShippingForm from "@/components/PageComponents/settings/ShippingForm/ShippingForm";
import withAuth from "@/utils/withAuth";
import {customGetServerSession} from "@/utils/returnPropsWithSession";
import prisma from "@/prisma/client";

export async function getServerSideProps(ctx) {
	const session = await customGetServerSession(ctx);

	if (!session?.user?.storeId || session?.user?.role !== 'OWNER') {
		return {
			redirect: {
				permanent: false,
				destination: '/authError'
			}
		}
	}

	const delivery = await prisma.delivery.findUnique({
		where: {
			storeId: session.user.storeId,
		}
	})

	console.log("PAYMENT",delivery)
	return {
		props: {
			shipping: delivery
		}
	}
}


const Shipping = ({shipping}) => {
	return (
		<div>
			<ShippingForm shipping={shipping} />
		</div>
	);
};

Shipping.getLayout = function getLayout(page) {
	return (
		<MainLayout session={page.props.session} title={'Доставки'} iconSrc={'/assets/icons/settings.svg'} iconAlt={'shipping_icon'}>
			{page}
		</MainLayout>
	)
}

export default withAuth(Shipping)


