import MainLayout from "@/components/Layouts/MainLayout";
import Bouquets from "@/components/PageComponents/bouquets/Bouquets";
import withAuth from "@/utils/withAuth";
import {customGetServerSession} from "@/utils/returnPropsWithSession";
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

	let bukets = await prisma.buket.findMany({
		where: {
			storeId: session?.user?.storeId
		},
	})

	bukets = JSON.parse(JSON.stringify(bukets))

	return {
		props: {
			bukets,
		}
	}
}

function BouquetsPage({bukets}) {
	return (
		<Bouquets bouquets={bukets} />
	)
}

BouquetsPage.getLayout = function getLayout(page) {
	return (
		<MainLayout session={page.props.session} iconSrc={'/assets/icons/bouquets.svg'} title={'Букети'}>
			{page}
		</MainLayout>
	)
}

export default withAuth(BouquetsPage)
