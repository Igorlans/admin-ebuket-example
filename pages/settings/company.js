import MainLayout from "@/components/Layouts/MainLayout";
import CompanyForm from "@/components/PageComponents/settings/CompanyForm/CompanyForm";
import withAuth from "@/utils/withAuth";
import {customGetServerSession} from "@/utils/returnPropsWithSession";
import prisma from "@/prisma/client";

export async function getServerSideProps(ctx) {
	const session = await customGetServerSession(ctx)

	if (!session?.user?.storeId || session?.user?.role !== 'OWNER') {
		return {
			redirect: {
				permanent: false,
				destination: '/authError'
			}
		}
	}

	let store = await prisma.store.findUnique({
		where: {
			id: session.user.storeId,
		}
	})
	const cities = await prisma.city.findMany()
	console.log(store, 'decors')
	store = JSON.parse(JSON.stringify(store))
	return {
		props: {
			store: store,
			cities
		}
	}
}

const Company = ({store, cities}) => {
	return (
		<CompanyForm store={store} cities={cities}/>
	);
};


Company.getLayout = function getLayout(page) {
	return (
		<MainLayout session={page.props.session} title={'Компанія'} iconSrc={'/assets/icons/settings.svg'} iconAlt={'company_icon'}>
			{page}
		</MainLayout>
	)
}

export default withAuth(Company)