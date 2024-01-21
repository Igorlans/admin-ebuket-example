import MainLayout from "@/components/Layouts/MainLayout";
import FlowersCreate from "@/components/PageComponents/assortment/Flowers/FlowersCreate/FlowersCreate";
import withAuth from "@/utils/withAuth";
import prisma from "@/prisma/client";
import {customGetServerSession} from "@/utils/returnPropsWithSession";
import {managerRoles} from "@/config";

export async function getServerSideProps(ctx) {
	const session = await customGetServerSession(ctx);

	if (!session?.user?.storeId || !managerRoles.includes(session?.user?.role)) {
		return {
			redirect: {
				permanent: false,
				destination: '/authError'
			}
		}
	}

	const flowers = await prisma.flowers.findMany()

	return {
		props: {
			flowers
		}
	}
}

function FlowersCreatePage({flowers}) {
	console.log(flowers)
    return (
        <FlowersCreate flowers={flowers} />
    )
}

FlowersCreatePage.getLayout = function getLayout(page) {
    return (
        <MainLayout session={page.props.session} iconSrc={'/assets/icons/assortment.svg'} title={'Додати новий тип'}>
            {page}
        </MainLayout>
    )
}

export default withAuth(FlowersCreatePage)
