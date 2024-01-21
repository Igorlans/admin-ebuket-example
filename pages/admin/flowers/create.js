import {customGetServerSession} from "@/utils/returnPropsWithSession";
import MainLayout from "@/components/Layouts/MainLayout";

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
const AdminCreateFlowersPage = () => {
    return (
        <div>FLOWERS CREATE PAGE</div>
    )
}

AdminCreateFlowersPage.getLayout = function getLayout(page) {
    return (
        <MainLayout session={page.props.session} iconSrc={'/assets/icons/bouquets.svg'} title={'Створити квтіку'}>
            {page}
        </MainLayout>
    )
}

export default AdminCreateFlowersPage;