import MainLayout from "@/components/Layouts/MainLayout";
import BouquetsCreate from "@/components/PageComponents/bouquets/BouquetsCreate/BouquetsCreate";
import withAuth from "@/utils/withAuth";
import {customGetServerSession} from "@/utils/returnPropsWithSession";
import prisma from "@/prisma/client";
import {managerRoles} from "@/config";

export async function getServerSideProps(ctx) {

    const session = await customGetServerSession(ctx);

    const {id: buketId} = ctx.query;

    let bouquet = await prisma.buket.findUnique({
        where: {
            id: Number(buketId)
        },
        include: {
            buket_addition: {
                include: {
                    store_addition: true
                }
            },
            buket_decors: {
                include: {
                    decors: true
                }
            },
            buket_flower: {
                include: {
                    store_flowers: {
                        include: {
                            flower: true
                        }
                    }
                }
            },
            occasions: true
        }
    })

    if (!bouquet) return {notFound: true}


    if (session?.user?.storeId !== bouquet?.storeId || !managerRoles.includes(session?.user?.role)) {
        return {
            redirect: {
                permanent: false,
                destination: '/authError'
            }
        }
    }

    bouquet = JSON.parse(JSON.stringify(bouquet))
    bouquet.buket_addition = bouquet?.buket_addition?.map(addition => ({...addition?.store_addition}))
    bouquet.buket_decors = bouquet?.buket_decors?.map(decor => ({...decor?.decors, number: decor?.numbers}))
    bouquet.buket_flower = bouquet?.buket_flower?.map(flower => ({...flower?.store_flowers, number: flower?.number}))
    bouquet.occasions = bouquet?.occasions?.map(occasion => occasion?.occasionId)


    if (!bouquet || session?.user?.storeId !== bouquet?.storeId) {
        return {
            redirect: {
                permanent: false,
                destination: '/bouquets'
            }
        }
    }
    const flowers = await prisma.store_flower.findMany({
        where: {
            storeId: session.user.storeId,
        },
        include: {
            flower: true
        }
    })
    const occasions = await prisma.occasion.findMany()
    const additions = await prisma.addition.findMany({
        where: {
            storeId: session.user.storeId,
        }
    })
    const decors = await prisma.decor.findMany({
        where: {
            storeId: session.user.storeId
        }
    })

    return {
        props: {
            flowers: flowers,
            additions: additions,
            decors: decors,
            occasions: occasions,
            bouquet: bouquet
        }
    }
}
function BouquetsCreatePage({flowers, additions, decors, occasions, bouquet}) {
    return (
        <BouquetsCreate bouquet={bouquet} flowers={flowers} additions={additions} decors={decors} occasions={occasions} />
    )
}

BouquetsCreatePage.getLayout = function getLayout(page) {
    return (
        <MainLayout session={page.props.session} iconSrc={'/assets/icons/bouquets.svg'} title={`Змінити букет "${page?.props?.bouquet?.name_buket}"`}>
            {page}
        </MainLayout>
    )
}

export default withAuth(BouquetsCreatePage)