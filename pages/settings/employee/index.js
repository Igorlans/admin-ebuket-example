import MainLayout from "@/components/Layouts/MainLayout";
import Employee from "@/components/PageComponents/settings/Employee/Employee"
import { customGetServerSession } from "@/utils/returnPropsWithSession";
import withAuth from "@/utils/withAuth";
import prisma from "@/prisma/client";


export async function getServerSideProps(ctx) {
    const session = await customGetServerSession(ctx)
    const query = ctx.query

    if (!session?.user?.storeId || session?.user?.role !== 'OWNER') {
        return {
            redirect: {
                permanent: false,
                destination: '/authError'
            }
        }
    }

    let resEmployee = await prisma.user.findMany({
        where: {
			Employee: {
				storeId: session.user.storeId,
			}
        },
        include: {
			Employee: true       
        }
    })

    resEmployee = JSON.parse(JSON.stringify(resEmployee))
    console.log('Employee', resEmployee)


    return {
        props: {
            employees: resEmployee
        }
    }
}

const EmployeePage = ({employees}) => {
	return (
		<div>
			<Employee employees={employees} />
		</div>
	);
};

EmployeePage.getLayout = function getLayout(page) {
	return (
		<MainLayout session={page.props.session} title={'Працівники'} iconSrc={'/assets/icons/settings.svg'} iconAlt={'employee_icon'}>
			{page}
		</MainLayout>
	)
}

export default withAuth(EmployeePage)