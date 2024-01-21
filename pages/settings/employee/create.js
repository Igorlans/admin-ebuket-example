import MainLayout from "@/components/Layouts/MainLayout";
import withAuth from "@/utils/withAuth";
import EmployeeCreate from "@/components/PageComponents/settings/Employee/EmployeeCreate/EmployeeCreate";
import {customGetServerSession} from "@/utils/returnPropsWithSession";


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


	return {
		props: {}
	}
}


function BouquetsCreatePage() {
	return (
		<EmployeeCreate />
	)
}

BouquetsCreatePage.getLayout = function getLayout(page) {
	return (
		<MainLayout session={page.props.session} iconSrc={'/assets/icons/settings.svg'} title={'Додати працівника'}>
			{page}
		</MainLayout>
	)
}

export default withAuth(BouquetsCreatePage)