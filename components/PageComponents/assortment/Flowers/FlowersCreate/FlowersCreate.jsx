import classes from './flowersCreate.module.scss';
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {flowerCreateSchema} from "@/validation/assortment/flowerCreateSchema";
import Button from "@/components/UI/Button/Button";
import Input from "@/components/UI/Input/Input";
import TabSelect from "@/components/UI/TabSelect/TabSelect";
import ColorSelect from "@/components/PageComponents/assortment/Flowers/FlowersCreate/ColorSelect/ColorSelect";
import Textarea from "@/components/UI/TextArea/Textarea";
import FlowersAutocomplete
    from "@/components/PageComponents/assortment/Flowers/FlowersCreate/FlowersAutocomplete/FlowersAutocomplete";
import {useSession} from "next-auth/react";
import {
    createStoreFlower
} from "@/components/PageComponents/assortment/Flowers/FlowersCreate/request";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {apiRequest} from "@/utils/apiRequest";

const FlowersCreate = ({flowers, flower}) => {
    console.log('flowerssss', flowers)
    const router = useRouter()
    const methods = useForm({
        mode: 'onBlur',
        resolver: yupResolver(flowerCreateSchema),
        defaultValues: {
            flowerId: flower?.flowerId || null,
            name: flower?.flower.title_ua || null,
            country: flower?.country || '',
            color: flower?.color || null,
            price: flower?.price || '',
            height: flower?.height || '',
            variety: flower?.variety || '',
            comment: flower?.comment || '',
            // prefer_stock: yup.boolean().optional(),
        }
    })
    const {data: session} = useSession()
    // console.log(methods.watch(methods.getValues()))
    // console.log(methods.formState.errors)
    const submitHandler = async (data) => {
        try {
            const formData = {
                ...data,
                id: flower?.id,
                storeId: session.user.storeId,
                flowerId: Number(data.flowerId),
                price: Number(data.price),
                oldPrice: flower?.price
            }
            await toast.promise(
                apiRequest(
                    '/api/assortment/flowers',
                    formData,
                    flower ? 'PUT' : 'POST'
                ),
                {
                    loading: flower ? 'Оновлення квітки' : 'Створення квітки...',
                    success: (data) => flower ? `Квітку оновлено` : 'Квітку створено',
                    error: (err) => err.message
                }
            );
            router.push('/assortment/flowers')
        } catch (e) {
            console.log(e)
        }
    }

    console.log("FORM VALUES", methods.watch())

    return (
        <>
            <form className={classes.flowersCreate} onSubmit={methods.handleSubmit(submitHandler)}>
                <FormProvider {...methods}>
                    <div className={classes.left}>
                        <FlowersAutocomplete flowers={flowers} label={'Назва квітів*'} placeholder={'Напр, троянда'} />
                        <TabSelect
                            withInput={true}
                            name={'country'}
                            label={'Країна походження*'}
                            placeholder={'Інша країна'}
                            options={[
                                {label: 'Україна', value: 'Україна'},
                                {label: 'Голландія', value: 'Голландія'},
                                {label: 'Кенія', value: 'Кенія'},
                                {label: 'Еквадор', value: 'Еквадор'},
                            ]}
                        />
                        <ColorSelect
                            name={'color'}
                            label={'Колір*'}
                            colorOptions={[
                                "Білий",
                                "Червоний",
                                "Фіолетовий",
                                "Помаранчевий",
                                "Жовтий",
                                "Зелений",
                                "Блакитний",
                                "Персиковий",
                                "Рожевий",
                                "Різнокольоровий"
                            ]}
                        />
                            <Input
                                variant={'outlined'}
                                style={{width: 100}}
                                type={'number'}
                                name={'price'}
                                label={'Ціна*'}
                                postLabel={'грн'}
                                placeholder={'0'}
                            />
                    </div>
                    <div className={classes.right}>
                        <Input
                            variant={'outlined'}
                            name={'variety'}
                            label={'Сорт квітів'}
                            placeholder={'Напр, троянда'}
                        />
                        <Textarea name={'comment'} label={'Коментар'} placeholder={'Видно тільки менеджеру'} />
                        <TabSelect
                            withInput={true}
                            type={'number'}
                            name={'height'}
                            inputStyles={{width: 100}}
                            label={'Висота*'}
                            postLabel={'см'}
                            options={[
                                {label: '40', value: '40'},
                                {label: '50', value: '50'},
                                {label: '60', value: '60'},
                                {label: '70', value: '70'},
                                {label: '80', value: '80'},
                                {label: '90', value: '90'},
                                {label: '100', value: '100'}
                            ]}
                        />
                    </div>

                </FormProvider>
            </form>
            <div style={{marginTop: 40, display: 'flex', gap: 15}}>
                <Button
                    type={'submit'}
                    onClick={methods.handleSubmit(submitHandler)}
                >
                    Зберегти
                </Button>
                <Button
                    type={'submit'}
                    variant={'outlined'}
                    onClick={methods.handleSubmit(submitHandler)}
                >
                    Зберегти и додати подібний
                </Button>
            </div>
        </>
    );
};

export default FlowersCreate;