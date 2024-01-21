import MainLayout from "@/components/Layouts/MainLayout";
import withAuth from "@/utils/withAuth";
import EmployeeCreate from "@/components/PageComponents/settings/Employee/EmployeeCreate/EmployeeCreate";
import {customGetServerSession} from "@/utils/returnPropsWithSession";
import prisma from "@/prisma/client";

export async function getServerSideProps(ctx) {
    const session = await customGetServerSession(ctx);
    const {id} = ctx.query;
    let employee = await prisma.user.findUnique({
        where: {
            id: id
        },
        include: {
            Employee: true
        }
    })

    if (session?.user?.storeId !== employee?.Employee?.storeId || session?.user?.role !== 'OWNER') {
        return {
            redirect: {
                permanent: false,
                destination: '/authError'
            }
        }
    }

    employee = JSON.parse(JSON.stringify(employee))
    console.log('Employee', employee)

    if(!employee?.Employee) {
        return {
            notFound: true
        }
    }


    return {
        props: {
            employee: employee
        }
    }
}



function BouquetsUpdatePage({employee}) {
    return (
        <EmployeeCreate employee={employee} />
    )
}

BouquetsUpdatePage.getLayout = function getLayout(page) {
    return (
        <MainLayout session={page.props.session} iconSrc={'/assets/icons/settings.svg'} title={`Змінити працівника` + (page?.props?.employee?.name ? `"${page?.props?.employee?.name}"` : '')}>
            {page}
        </MainLayout>
    )
}

export default withAuth(BouquetsUpdatePage)