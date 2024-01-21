import Button from "@/components/UI/Button/Button";
import styles from "./seoItemPage.module.scss"
import {useRouter} from "next/router";
import {FormProvider, useForm} from "react-hook-form";
import Input from "@/components/UI/Input/Input";
import Select from "@/components/UI/Select/Select";
import Textarea from "@/components/UI/TextArea/Textarea";
import toast from "react-hot-toast";
import {apiRequest} from "@/utils/apiRequest";



const SeoItemPage = ({cities}) => {
    const router = useRouter();

    const methods = useForm({
        defaultValues: {
            heading: '',
            heading_ru: '',
            url: '',
            title: '',
            title_ru: '',
            city: '',
            complexity: 1,
            description: '',
            description_ru: '',
            pageText: '',
            pageText_ru: ''
        }
    })

    const handleSubmit = async (data) => {
        // TODO: add submit logic
        try {
            // router.push(`/admin/seo`)
            const formData = {
                ...data,
                url: data.city ? `/${data.city}${data.url ? '/' + data?.url : ''}` : `/${data.url}`
            }

            await toast.promise(apiRequest('/api/seo', formData, 'POST'), {
                loading: 'Створення SEO...',
                success: () => {
                    router.push('/admin/seo')
                    return 'SEO створено'
                },
                error: 'Помилка створення SEO'
            })
        } catch (e) {
            toast.error(e.message)
        }


        // toast.success(JSON.stringify(formData))

    }

    return (
        <div className={styles.seoPageWrapper}>
            <FormProvider {...methods}>
                <div style={{
                        border: '2px #9DCA39 solid',
                        padding: 30,
                        borderRadius: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 20
                    }}
                >
                    <Input
                        label={'URL'}
                        name={'url'}
                        variant={'outlined'}
                        style={{width: '100%'}}
                    />

                    {/*<div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20}}>*/}
                    <Select
                        label={'Місто'}
                        name={'city'}
                        options={cities}
                    />

                    <Select
                        label={'Вкладеність'}
                        name={'complexity'}
                        options={[
                            {label: 1, value: 1},
                            {label: 2, value: 2},
                            {label: 3, value: 3},
                            {label: 4, value: 4},
                            {label: 5, value: 5},
                        ]}
                    />

                    {/*</div>*/}
                </div>



                <div style={{
                    border: '2px #9DCA39 solid',
                    padding: 30,
                    borderRadius: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20
                }}
                >
                    <Input
                        label={'Title UA'}
                        name={'title'}
                        variant={'outlined'}
                        style={{width: '100%'}}
                    />

                    <Input
                        label={'Title RU'}
                        name={'title_ru'}
                        variant={'outlined'}
                        style={{width: '100%'}}
                    />
                </div>

                <div style={{
                    border: '2px #9DCA39 solid',
                    padding: 30,
                    borderRadius: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20
                }}
                >
                    <Input
                        label={'H1 UA'}
                        name={'heading'}
                        variant={'outlined'}
                        style={{width: '100%'}}
                    />

                    <Input
                        label={'H1 RU'}
                        name={'heading_ru'}
                        variant={'outlined'}
                        style={{width: '100%'}}
                    />
                </div>



                <div style={{
                    border: '2px #9DCA39 solid',
                    padding: 30,
                    borderRadius: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20
                }}
                >
                    <Textarea
                        label={'Description UA'}
                        name={'description'}
                        variant={'outlined'}
                        style={{width: '100%', minHeight: 200}}
                    />

                    <Textarea
                        label={'Description RU'}
                        name={'description_ru'}
                        variant={'outlined'}
                        style={{width: '100%', minHeight: 200}}
                    />
                </div>



                <div style={{
                    border: '2px #9DCA39 solid',
                    padding: 30,
                    borderRadius: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20
                }}
                >
                    <Textarea
                        label={'Текст UA'}
                        name={'pageText'}
                        variant={'outlined'}
                        style={{width: '100%', minHeight: 200}}
                    />

                    <Textarea
                        label={'Текст RU'}
                        name={'pageText_ru'}
                        variant={'outlined'}
                        style={{width: '100%', minHeight: 200}}
                    />
                </div>



                <div style={{width: '100%', display: 'flex', justifyContent: 'right', marginTop: "40px"}}>
                    <Button onClick={methods.handleSubmit(handleSubmit)} variant="contained" color="primary" style={{width: "20%"}}>
                        Готово
                    </Button>
                </div>
            </FormProvider>

        </div>
    );
};

const SeoItemEditPage = ({seoData, cities}) => {
    const router = useRouter();
    const formatedUrl = `${seoData?.url?.split('/')?.slice(2).join('/')}`
    const city = seoData?.url?.split('/')?.[1];

    console.log('ciewrewr', city)

    const methods = useForm({
        defaultValues: {
            heading: seoData?.heading || '',
            heading_ru: seoData?.heading_ru || '',
            url: seoData?.url ? formatedUrl : '',
            title: seoData?.title || '',
            title_ru: seoData?.title_ru || '',
            city: city || '',
            complexity: seoData?.complexity || 1,
            description: seoData?.description || '',
            description_ru: seoData?.description_ru || '',
            pageText: seoData?.pageText || '',
            pageText_ru: seoData?.pageText_ru || '',
        }
    })

    const handleSubmit = async (data) => {
        try {
            // router.push(`/admin/seo`)
            const formData = {
                ...data,
                id: seoData?.id,
                url: data.city ? `/${data.city}${data.url ? '/' + data?.url : ''}` : `/${data.url}`
            }

            await toast.promise(apiRequest('/api/seo', formData, 'PUT'), {
                loading: 'Оновлення SEO...',
                success: () => {
                    router.push('/admin/seo')
                    return 'SEO оновлено'
                },
                error: 'Помилка оновлення SEO'
            })
        } catch (e) {
            toast.error(e.message)
        }


        // toast.success(JSON.stringify(formData))

    }

    return (
        <div className={styles.seoPageWrapper}>
            <FormProvider {...methods}>
                <div style={{
                    border: '2px #9DCA39 solid',
                    padding: 30,
                    borderRadius: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20
                }}
                >
                    <Input
                        label={'URL'}
                        name={'url'}
                        variant={'outlined'}
                        style={{width: '100%'}}
                    />

                    {/*<div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20}}>*/}
                    <Select
                        label={'Місто'}
                        name={'city'}
                        options={cities}
                        defaultValue={city || ''}
                    />

                    <Select
                        label={'Вкладеність'}
                        name={'complexity'}
                        defaultValue={seoData?.complexity || 1}
                        options={[
                            {label: 1, value: 1},
                            {label: 2, value: 2},
                            {label: 3, value: 3},
                            {label: 4, value: 4},
                            {label: 5, value: 5},
                        ]}
                    />

                    {/*</div>*/}
                </div>



                <div style={{
                    border: '2px #9DCA39 solid',
                    padding: 30,
                    borderRadius: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20
                }}
                >
                    <Input
                        label={'Title UA'}
                        name={'title'}
                        variant={'outlined'}
                        style={{width: '100%'}}
                    />

                    <Input
                        label={'Title RU'}
                        name={'title_ru'}
                        variant={'outlined'}
                        style={{width: '100%'}}
                    />
                </div>

                <div style={{
                    border: '2px #9DCA39 solid',
                    padding: 30,
                    borderRadius: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20
                }}
                >
                    <Input
                        label={'H1 UA'}
                        name={'heading'}
                        variant={'outlined'}
                        style={{width: '100%'}}
                    />

                    <Input
                        label={'H1 RU'}
                        name={'heading_ru'}
                        variant={'outlined'}
                        style={{width: '100%'}}
                    />
                </div>



                <div style={{
                    border: '2px #9DCA39 solid',
                    padding: 30,
                    borderRadius: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20
                }}
                >
                    <Textarea
                        label={'Description UA'}
                        name={'description'}
                        variant={'outlined'}
                        style={{width: '100%', minHeight: 200}}
                    />

                    <Textarea
                        label={'Description RU'}
                        name={'description_ru'}
                        variant={'outlined'}
                        style={{width: '100%', minHeight: 200}}
                    />
                </div>



                <div style={{
                    border: '2px #9DCA39 solid',
                    padding: 30,
                    borderRadius: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20
                }}
                >
                    <Textarea
                        label={'Текст UA'}
                        name={'pageText'}
                        variant={'outlined'}
                        style={{width: '100%', minHeight: 200}}
                    />

                    <Textarea
                        label={'Текст RU'}
                        name={'pageText_ru'}
                        variant={'outlined'}
                        style={{width: '100%', minHeight: 200}}
                    />
                </div>



                <div style={{width: '100%', display: 'flex', justifyContent: 'right', marginTop: "40px"}}>
                    <Button onClick={methods.handleSubmit(handleSubmit)} variant="contained" color="primary" style={{width: "20%"}}>
                        Готово
                    </Button>
                </div>
            </FormProvider>

        </div>
    );
};

export {
    SeoItemPage,
    SeoItemEditPage
};