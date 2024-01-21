
import MainLayout from "@/components/Layouts/MainLayout";
import { SeoItemPage } from "@/components/PageComponents/admin/seo/seoItemPage/SeoItemPage";
import prisma from "@/prisma/client";

export const getServerSideProps = async () => {
    const cities = await prisma.city.findMany()

    const cityOptions = cities?.map(city => ({label: city.city, value: city?.title_eng}))

    return {
        props: {
            cities: [{label: 'Немає', value: ''}, ...cityOptions]
        }
    }
}
const SeoForm = ({cities}) => {
    return (
        <div>
            <SeoItemPage cities={cities} />
        </div>
    )
}

SeoForm.getLayout = function getLayout(page) {
    return (
        <MainLayout session={page.props.session} iconSrc={'/assets/icons/bouquets.svg'} title='Create SEO'>
            {page}
        </MainLayout>
    )
}

export default SeoForm;