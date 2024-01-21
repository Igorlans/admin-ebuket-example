import MainLayout from "@/components/Layouts/MainLayout";
import AdditionCreate from "@/components/PageComponents/assortment/Addition/AdditionCreate/AdditionCreate";
import withAuth from "@/utils/withAuth";
import {customGetServerSession} from "@/utils/returnPropsWithSession";
import {managerRoles} from "@/config";

export async function getServerSideProps(ctx) {
    const session = await customGetServerSession(ctx);

    if (!session?.user?.storeId || !managerRoles.includes(session?.user?.role)) {
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

function AdditionCreatePage() {
    return (
        <AdditionCreate />
    )
}

AdditionCreatePage.getLayout = function getLayout(page) {
    return (
        <MainLayout session={page.props.session} iconSrc={'/assets/icons/assortment.svg'} title={'Додати новий тип'}>
            {page}
        </MainLayout>
    )
}

export default withAuth(AdditionCreatePage)