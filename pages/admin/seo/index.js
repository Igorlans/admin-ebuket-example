import {customGetServerSession} from "@/utils/returnPropsWithSession";
import MainLayout from "@/components/Layouts/MainLayout";
import Seo from "@/components/PageComponents/admin/seo/Seo";

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

        const allSeos = await prisma.Seo.findMany({
            orderBy: {
                lastChange: 'desc'
            }
        })

        return {
            props: {
                allSeosData: allSeos
            }
        }
    }
}
const AdminSeoPage = ({allSeosData}) => {
    return (
        <div><Seo allSeosData={allSeosData} /></div>
    )
}

AdminSeoPage.getLayout = function getLayout(page) {
    return (
        <MainLayout session={page.props.session} iconSrc={'/assets/icons/settings.svg'} title={'SEO'}>
            {page}
        </MainLayout>
    )
}

export default AdminSeoPage;