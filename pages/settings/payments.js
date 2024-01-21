import MainLayout from "@/components/Layouts/MainLayout";
import PaymentsForm from "@/components/PageComponents/settings/PaymentsForm/PaymentsForm";
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

	const payment = await prisma.payment.findUnique({
		where: {
			storeId: session.user.storeId,
		}
	})
	console.log("PAYMENT",payment)
	return {
		props: {
			payment: payment
		}
	}
}
const Payments = ({payment}) => {
	return (
		<div>
			<PaymentsForm payment={payment} />
		</div>
	);
};

Payments.getLayout = function getLayout(page) {
	return (
		<MainLayout session={page.props.session} title={'Оплата'} iconSrc={'/assets/icons/settings.svg'} iconAlt={'payments_icon'}>
			{page}
		</MainLayout>
	)
}

export default withAuth(Payments)
