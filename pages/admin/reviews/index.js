import {customGetServerSession} from "@/utils/returnPropsWithSession";
import MainLayout from "@/components/Layouts/MainLayout";
import Reviews from "@/components/PageComponents/admin/reviews/Reviews";
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
        let reviews = await prisma.review.findMany({
            include: {
                Order: true
            }
        })
        reviews = JSON.parse(JSON.stringify(reviews));
        return {
            props: {reviews}
        }
    }
}
const AdminReviewsPage = ({reviews}) => {
    return (
        <div><Reviews reviews={reviews} /></div>
    )
}

AdminReviewsPage.getLayout = function getLayout(page) {
    return (
        <MainLayout session={page.props.session} iconSrc={'/assets/icons/reviews.svg'} title={'Відгуки'}>
            {page}
        </MainLayout>
    )
}

export default AdminReviewsPage;