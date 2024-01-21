import MainLayout from "@/components/Layouts/MainLayout";
import Analytics from "@/components/PageComponents/analytics/Analytics.jsx";
import withAuth from "@/utils/withAuth";
import {customGetServerSession} from "@/utils/returnPropsWithSession";
import prisma from "@/prisma/client";
import { LAST_DATA, DATE_RANGE } from "@/utils/formatingAnalytic";
import { managerRoles } from "@/config";



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

    const query = ctx.query

    let lastData 
    const calendarFrom = query.from || 'none'
    const calendarTo = query.to || 'none'


    switch (query.sort) {
        case 'week':
            lastData = LAST_DATA(7, false)
            break;
        case 'date':
            
            lastData = DATE_RANGE(calendarFrom, calendarTo)
            break;
        default:
            lastData = LAST_DATA(30, false)
            break;
    }

    console.log(lastData)

    let resAnal = await prisma.Buket.findMany({
        where: {
            storeId: session.user.storeId,
        },
        include: {
            Analytic: {
                where: {
                    createdAt: {
                        in: lastData
                    }
                }
            }
        }
    })

    resAnal = JSON.parse(JSON.stringify(resAnal))
    console.log('analytics', resAnal)


    return {
        props: {
            analytics: resAnal,
            lastData: lastData
        }
    }
}

function AnalyticsPage({analytics, lastData}) {
    return (
        <Analytics analyticData={analytics} lastData={lastData} />
    )
}

AnalyticsPage.getLayout = function getLayout(page) {
    return (
        <MainLayout session={page.props.session} title={'Аналітика'} iconSrc={'/assets/icons/analytics.svg'} iconAlt={'reviews_icon'}>
            {page}
        </MainLayout>
    )
}

export default withAuth(AnalyticsPage)
