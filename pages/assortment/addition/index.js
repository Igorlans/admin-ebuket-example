import MainLayout from "@/components/Layouts/MainLayout";
import Addition from "@/components/PageComponents/assortment/Addition/Addition";
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

    const additions = await prisma.addition.findMany({
        where: {
            storeId: session?.user?.storeId,
        }
    })

    return {
        props: {
            additions: additions
        }
    }
}
function AdditionPage({additions}) {
    return (
        <Addition additions={additions} />
    )
}

AdditionPage.getLayout = function getLayout(page) {
    return (
        <MainLayout session={page.props.session} iconSrc={'/assets/icons/assortment.svg'} title={'Доповнення'}>
            {page}
        </MainLayout>
    )
}

export default withAuth(AdditionPage)

