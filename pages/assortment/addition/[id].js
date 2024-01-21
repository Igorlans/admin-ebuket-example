import MainLayout from "@/components/Layouts/MainLayout";
import AdditionCreate from "@/components/PageComponents/assortment/Addition/AdditionCreate/AdditionCreate";
import withAuth from "@/utils/withAuth";
import {customGetServerSession} from "@/utils/returnPropsWithSession";
import prisma from "@/prisma/client";
import {managerRoles} from "@/config";

export async function getServerSideProps(ctx) {
    const session = await customGetServerSession(ctx);
    const {id: additionId} = ctx.query;

    const addition = await prisma.addition.findUnique({
        where: {
            id: Number(additionId)
        }
    })

    if (!addition) return {notFound: true}

    if (session?.user?.storeId !== addition?.storeId || !managerRoles.includes(session?.user?.role)) {
        return {
            redirect: {
                permanent: false,
                destination: '/authError'
            }
        }
    }

    return {
        props: {
            addition
        }
    }
}


function AdditionCreatePage({addition}) {
    return (
        <AdditionCreate addition={addition} />
    )
}

AdditionCreatePage.getLayout = function getLayout(page) {
    return (
        <MainLayout session={page.props.session} iconSrc={'/assets/icons/assortment.svg'} title={`Змінити доповнення "${page.props.addition.name}"`}>
            {page}
        </MainLayout>
    )
}

export default withAuth(AdditionCreatePage)