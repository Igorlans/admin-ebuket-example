import MainLayout from "@/components/Layouts/MainLayout";
import withAuth from "@/utils/withAuth";
import {customGetServerSession} from "@/utils/returnPropsWithSession";

export const getServerSideProps = async (ctx) => {
    const session = await customGetServerSession(ctx);
    const isSuperUser = !!session?.user?.SuperUser?.id;
    if (isSuperUser) {
        return {
            redirect: {
                permanent: false,
                destination: '/admin'
            }
        }
    } else {
        return {
            props: {}
        }
    }
}

function Home() {
  return (
    <div>
        Контент головної
    </div>
  )
}

Home.getLayout = function getLayout(page) {
    return (
        <MainLayout session={page.props.session} title={'Головна'} iconSrc={'/assets/icons/reviews.svg'} iconAlt={'reviews_icon'}>
            {page}
        </MainLayout>
    )
}

export default withAuth(Home)
