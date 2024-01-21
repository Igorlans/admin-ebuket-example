import MainLayout from "@/components/Layouts/MainLayout";
import ScheduleForm from "@/components/PageComponents/settings/ScheduleForm/ScheduleForm";
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

	const schedule = await prisma.store_schedule.findUnique({
		where: {
			storeId: session.user.storeId,
		}
	})
	console.log("schedule",schedule)
	return {
		props: {
			schedule: schedule
		}
	}
}

const Schedule = ({schedule}) => {
	return (
		<div>
			<ScheduleForm schedule={schedule} />
		</div>
	);
};

Schedule.getLayout = function getLayout(page) {
	return (
		<MainLayout session={page.props.session} title={'Графік роботи'} iconSrc={'/assets/icons/settings.svg'} iconAlt={'schedule_icon'}>
			{page}
		</MainLayout>
	)
}

export default withAuth(Schedule)