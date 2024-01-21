import MainLayout from "@/components/Layouts/MainLayout";
import BouquetsCreate from "@/components/PageComponents/bouquets/BouquetsCreate/BouquetsCreate";
import withAuth from "@/utils/withAuth";
import {customGetServerSession} from "@/utils/returnPropsWithSession";
import prisma from "@/prisma/client";
import {managerRoles} from "@/config";

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

	const flowers = await prisma.store_flower.findMany({
		where: {
			storeId: session.user.storeId,
		},
		include: {
			flower: true
		}
	})
	const occasions = await prisma.occasion.findMany()
	const additions = await prisma.addition.findMany({
		where: {
			storeId: session.user.storeId,
		}
	})
	const decors = await prisma.decor.findMany({
		where: {
			storeId: session.user.storeId
		}
	})

	return {
		props: {
			flowers: flowers,
			additions: additions,
			decors: decors,
			occasions: occasions
		}
	}
}
function BouquetsCreatePage({flowers, additions, decors, occasions}) {
	return (
		<BouquetsCreate flowers={flowers} additions={additions} decors={decors} occasions={occasions} />
	)
}

BouquetsCreatePage.getLayout = function getLayout(page) {
	return (
		<MainLayout session={page.props.session} iconSrc={'/assets/icons/bouquets.svg'} title={'Додати новий букет'}>
			{page}
		</MainLayout>
	)
}

export default withAuth(BouquetsCreatePage)