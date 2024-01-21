import {customGetServerSession} from "@/utils/returnPropsWithSession";
import MainLayout from "@/components/Layouts/MainLayout";
import BouquetPage from "@/components/PageComponents/admin/bouquets/BouquetPage/BouquetPage";
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
    }

    const {id} = ctx.query;

    let bouquet = await prisma.buket.findUnique({
        where: {
            id: Number(id)
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
            occasions: {
                include: {
                    Occasion: true
                }
            }
        }
    })

    if (!bouquet) return {notFound: true}
    bouquet = JSON.parse(JSON.stringify(bouquet))
    return {
        props: {bouquet}
    }
}
const AdminApproveBouquetPage = ({bouquet}) => {
    return (
        // <div>{JSON.stringify(bouquet)}</div>
        <div><BouquetPage bouquet={bouquet} /></div>
    )
}

AdminApproveBouquetPage.getLayout = function getLayout(page) {
    return (
        <MainLayout session={page.props.session} iconSrc={'/assets/icons/bouquets.svg'} title={`Модерація букету "${page.props.bouquet?.name_buket}"`}>
            {page}
        </MainLayout>
    )
}

export default AdminApproveBouquetPage;