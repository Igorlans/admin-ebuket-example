 import MainLayout from "@/components/Layouts/MainLayout";
import withAuth from "@/utils/withAuth";
import Reviews from "@/components/PageComponents/reviews/Reviews";
import { customGetServerSession } from "@/utils/returnPropsWithSession";
 import {managerRoles} from "@/config";
 import prisma from "@/prisma/client";


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

	let reviews = await prisma.review.findMany({
		where: {
			Buket: {
                storeId: session?.user?.storeId
            },
		},
        include: {
            Order: true
        }
	})
	
	reviews = JSON.parse(JSON.stringify(reviews))

	return {
		props: {
			reviews,
		}
	}
}


function ReviewsPage({reviews}) {
    return (
        <Reviews reviews={reviews} />
    )
}

ReviewsPage.getLayout = function getLayout(page) {
    return (
        <MainLayout session={page.props.session} title={'Відгуки'} iconSrc={'/assets/icons/reviews.svg'} iconAlt={'reviews_icon'}>
            {page}
        </MainLayout>
    )
}

export default withAuth(ReviewsPage)
