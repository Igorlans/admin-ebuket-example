import classes from './companyForm.module.scss';
import {useState} from "react";
import Button from "@/components/UI/Button/Button";
import data from "../../../../data/cities.json";
import Input from "@/components/UI/Input/Input";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {companyFormSchema} from "@/validation/settings/companyFormSchema";
import Modal from "@/components/UI/Modal/Modal";
import Textarea from "@/components/UI/TextArea/Textarea";
import Checkbox from "@/components/UI/Checkbox/Checkbox";
import Image from "next/image";
import FileUploader from "@/components/UI/FileUploader/FileUploader";
import Select from "@/components/UI/Select/Select";
import {apiRequest} from "@/utils/apiRequest";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import Cropper from "@/components/UI/Cropper/Cropper";
import SupabaseFileService from "@/services/SupabaseFileService";
import {STORAGE_URL} from "@/config";

const CompanyForm = ({store, cities}) => {
	const [picture, setPicture] = useState(null)

	const optionsCities = cities.map(cit => ({...cit, label: cit.city, value: cit.id}))
	const router = useRouter()
	const {data: session, update } = useSession()
	const methods = useForm({
		mode: 'onBlur',
		resolver: yupResolver(companyFormSchema),
		defaultValues: {
			cityId: store?.cityId || cities?.[0]?.id,
			shop_name: store?.shop_name || '',
			description: store?.description || '',
			phone: store?.phone || '',
			email: store?.email || '',
			name: store?.name || '',
			prefer_phone: store?.prefer_phone || false,
			prefer_viber: store?.prefer_viber || false,
			prefer_telegram: store?.prefer_telegram || false,
			prefer_email: store?.prefer_email || false,
		}
	})
	console.log("FORM VALUES",methods.watch(methods.getValues()))
	console.log("FORM ERRORS", methods.formState.errors)

	const submitHandler = async (data) => {
		try {
			const request = async () => {
				const storeId = session?.user?.storeId;
				const formData = {
					...data,
					storeId
				}
				if (picture) {
					const file = await SupabaseFileService.uploadFile(picture, 'shops', picture.name, `shop-${storeId}/avatar`);
					formData.image = {
						name: picture.name,
						url: `${STORAGE_URL}/${file.path}`
					}
					if (store?.image?.url) {
						await SupabaseFileService.removeFile('shops', `shop-${storeId}/avatar/${store?.image?.name}`)
					}

				}
				return await apiRequest('/api/settings/company', formData, 'POST');
			}


			await toast.promise(
				request(),
				{
					loading: 'Збереження налаштувань...',
					success: () => {
						(async () => {
							await update({});
						})()
						return `Налаштування збережні`
					},
					error: (err) => err.message
				}
			);
			await update({})
			// router.push('/settings/payments')
		} catch (e) {
			console.log(e)
		}
	}
	console.log(session)

	return (
		<>
			<Button
				type={'submit'}
				onClick={methods.handleSubmit(submitHandler)}
				className={classes.submit_btn}
			>
				Зберегти
			</Button>
			<form className={classes.companyForm} onSubmit={methods.handleSubmit(submitHandler)}>
				<FormProvider {...methods}>
					<div className={classes.logo}>
						<Cropper file={picture} setFile={setPicture} rounded width={150} height={150} placeholder={session?.user?.store?.image?.url} />
					</div>
					<div className={classes.info}>
						<Input
							name={'shop_name'}
							placeholder={'Введіть назву магазину'}
							label={'Назва магазину'}
							className={classes.input}
						/>
						<Textarea
							name={'description'}
							label={'Опис'}
							className={classes.textarea}
							maxLength={500}
							placeholder={'Напр, Букет веснянний'}
						/>
						<div className={classes.shipping}>
							<div className={classes.shipping_header}>
								<div className={classes.shipping_title}>
									Доставка в межах міста
								</div>
							</div>
							<Select defaultValue={store?.cityId || optionsCities?.[0]?.value} name="cityId" options={optionsCities} />
							<p
								style={{padding: '10px 0 10px 20px', color: '#9E9E9E', fontSize: '14px'}}
							>Додати інші міста можна буде згодом, ми працюємо над цим</p>
						</div>


					</div>
					<div className={classes.contacts}>
						<div className={classes.title}>Контактна особа</div>
						<Input
							variant={'underlined'}
							name={'name'}
							label={'Ім\'я'}
							className={classes.input}
							placeholder={'Введіть ім\'я'}
						/>
						<Input
							variant={'underlined'}
							name={'phone'}
							label={'Телефон'}
							className={classes.input}
							placeholder={'Введіть телефон'}
						/>
						<Input
							variant={'underlined'}
							name={'email'}
							label={'Email'}
							className={classes.input}
							placeholder={'Введіть email'}
						/>
						<div className={classes.subtitle}>
							Бажаний спосіб зв'язку
						</div>
						<Checkbox className={classes.checkbox} name={'prefer_phone'} label={'Телефон'} />
						<Checkbox className={classes.checkbox} name={'prefer_viber'} label={'Viber'} />
						<Checkbox className={classes.checkbox} name={'prefer_telegram'} label={'Telegram'} />
						<Checkbox className={classes.checkbox} name={'prefer_email'} label={'Email'} />
					</div>

					{/*<Switch name={'toggle'} label={'Дізайнер підарас'} />*/}
					<Button
						type={'submit'}
						onClick={methods.handleSubmit(submitHandler)}
					>
						Зберегти
					</Button>
				</FormProvider>
			</form>
		</>
	);
};

export default CompanyForm;