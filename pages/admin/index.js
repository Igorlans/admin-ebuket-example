import MainLayout from "@/components/Layouts/MainLayout";
import {customGetServerSession} from "@/utils/returnPropsWithSession";

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
        return {
            props: {}
        }
    }
}

function AdminPage() {
    return (
        <div>
            ADMIN PAGE
        </div>
    )
}

AdminPage.getLayout = function getLayout(page) {
    return (
        <MainLayout title={'Головна'} iconSrc={'/assets/icons/settings.svg'} iconAlt={'reviews_icon'}>
            {page}
        </MainLayout>
    )
}

export default AdminPage;
