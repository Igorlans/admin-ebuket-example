import {customGetServerSession} from "@/utils/returnPropsWithSession";
import MainLayout from "@/components/Layouts/MainLayout";
import Occasions from "@/components/PageComponents/admin/occasions/Occasions";
import prisma from "@/prisma/client";

export const getServerSideProps = async (ctx) => {
    const session = await customGetServerSession(ctx);
    const isSuperUser = !!session?.user?.SuperUser?.id;
    if (!isSuperUser) {
        return {
            redirect: {
                permanent: false,
                destination: '/authError'
            }
        }
    } else {
        const allOcasions = await prisma.Occasion.findMany({
            where: {
                deleted: false
            }
        })


        return {
            props: {
                allOcasions: allOcasions
            }
        }
    }
}
const AdminFlowersPage = ({allOcasions}) => {
    return (
        <div><Occasions allOcasions={allOcasions} /></div>
    )
}

AdminFlowersPage.getLayout = function getLayout(page) {
    return (
        <MainLayout session={page.props.session} iconSrc={'/assets/icons/reviews.svg'} title={'Приводи'}>
            {page}
        </MainLayout>
    )
}

export default AdminFlowersPage;