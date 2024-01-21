import {customGetServerSession} from "@/utils/returnPropsWithSession";
import MainLayout from "@/components/Layouts/MainLayout";
import {SeoItemEditPage} from "@/components/PageComponents/admin/seo/seoItemPage/SeoItemPage";
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

    let seoData = await prisma.Seo.findUnique({
        where: {
            id
        }
    })

    seoData = JSON.parse(JSON.stringify(seoData))

    const cities = await prisma.city.findMany()

    const cityOptions = cities?.map(city => ({label: city.city, value: city?.title_eng}))


    return {
        props: {
            seoData,
            cities: [{label: 'Немає', value: ''}, ...cityOptions]
        }
    }

}

const SeoForm = ({seoData, cities}) => {

    return (
        <div>
            <SeoItemEditPage seoData={seoData} cities={cities} />
        </div>
    )
}

SeoForm.getLayout = function getLayout(page) {
    return (
        <MainLayout session={page.props.session} iconSrc={'/assets/icons/bouquets.svg'} title='Edit SEO'>
            {page}
        </MainLayout>
    )
}

export default SeoForm;