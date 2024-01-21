import classes from './bouquetsCreate.module.scss';
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Button from "@/components/UI/Button/Button";
import {bouquetsCreateSchema} from "@/validation/bouquets/bouquetsCreateSchema";
import Input from "@/components/UI/Input/Input";
import TabSelect from "@/components/UI/TabSelect/TabSelect";
import TabSelectMultiple from "@/components/UI/TabSelectMultiple/TabSelectMultiple";
import Cropper from "@/components/UI/Cropper/Cropper";
import {useMemo, useState} from "react";
import AddFlowers from "@/components/PageComponents/bouquets/BouquetsCreate/AddFlowers/AddFlowers";
import AddDecor from "@/components/PageComponents/bouquets/BouquetsCreate/AddDecor/AddDecor";
import AddAddition from "@/components/PageComponents/bouquets/BouquetsCreate/AddAddition/AddAddition";
import {apiRequest} from "@/utils/apiRequest";
import toast from "react-hot-toast";
import {useSession} from "next-auth/react";
import SupabaseFileService from "@/services/SupabaseFileService";
import {STORAGE_URL} from "@/config";
import {useRouter} from "next/navigation";

const BouquetsCreate = ({flowers, additions, decors, occasions, bouquet}) => {
	console.log("FLOWERS", flowers);
	console.log("ADDITIONS", additions);
	console.log("DECORS", decors);
	console.log("BUKET", bouquet);
	const router = useRouter();

	const methods = useForm({
		mode: 'onBlur',
		resolver: yupResolver(bouquetsCreateSchema),
		defaultValues: {
			name_buket: bouquet?.name_buket || '',
			name_buket_ru: bouquet?.name_buket_ru || '',
			category_buket: bouquet?.category_buket || '',
			size_width: bouquet?.size_width || '',
			size_height: bouquet?.size_height || '',
			time_build: bouquet?.time_build || '',
			occasions: bouquet?.occasions || [],
			buket_flower: bouquet?.buket_flower || [],
			buket_decor: bouquet?.buket_decors || [],
			buket_addition: bouquet?.buket_addition || []
		}
	})

	console.log('VALUES', methods.watch(methods.getValues()))
	console.log(methods.formState.errors)

	const buketPrice = useMemo(() => {
		const flowersPrice = methods.getValues('buket_flower')?.reduce((acc, flower) => {
			return acc += flower.price * flower.number
		}, 0)
		const decorsPrice = methods.getValues('buket_decor')?.reduce((acc, decor) => {
			return acc += decor.price * decor.number
		}, 0)
		return decorsPrice + flowersPrice;
	}, [methods.watch(methods.getValues())])

	const {data: session} = useSession();

	const submitHandler = async (data) => {
		try {
			if (data.buket_flower < 1) return toast.error('Виберіть хоча б одну квітку')
			if (
				!(
				image &&
				image2 &&
				image3 &&
				image4 &&
				image5) &&
				!bouquet
			) return toast.error('Завантажте 5 фото')
			const request = async () => {
				const storeId = session?.user?.storeId;
				const buket_addition = data?.buket_addition?.map(addition => ({idAddition: addition.id}))
				const buket_flower = data?.buket_flower?.map(flower => ({stroreFlowerId: flower.id, number: Number(flower.number)}))
				const buket_decor = data?.buket_decor?.map(decor => ({idDecor: decor.id, numbers: Number(decor.number)}))
				const occasions = data?.occasions?.map(occasion => ({occasionId: occasion}))

				const newImagesArr = [image, image2, image3, image4, image5];
				let imagesArr = [];

				if (bouquet) {
					imagesArr = await Promise.all(bouquet?.images_hash?.images?.map(async (item, index) => {
						const newImage = newImagesArr[index]
						if (newImage) {
							await SupabaseFileService.removeFile('shops', `shop-${storeId}/buketImages/${item.name}`)
							const {path} = await SupabaseFileService.uploadFile(newImage, 'shops', newImage.name, `shop-${storeId}/buketImages`)
							return ({name: newImage.name, url: `${STORAGE_URL}/${path}`})
						} else {
							return item;
						}
					}))
				} else {
					imagesArr = await Promise.all(newImagesArr.map(async (item) => {
						const {path} = await SupabaseFileService.uploadFile(item, 'shops', item.name, `shop-${storeId}/buketImages`)
						return ({name: item.name, url: `${STORAGE_URL}/${path}`})
					}))
				}



				const formData = {
					...data,
					id: bouquet?.id,
					buket_addition: buket_addition,
					buket_flower: buket_flower,
					buket_decor: buket_decor,
					price: buketPrice,
					occasions: occasions,
					images_hash: {images: imagesArr},
					storeId
				}
				console.log("FORM DATA", formData)

				return await apiRequest('/api/bouquets', formData, bouquet ? 'PUT' : 'POST');
			}


			await toast.promise(
				request(),
				{
					loading: bouquet ? 'Оновлення букету...' : 'Створення букету...',
					success: (data) => bouquet ? `Букет "${data.name_buket}" оновлено` : `Букет "${data.name_buket}" створено`,
					error: (err) => err.message
				}
			);
			router.push('/bouquets')
		} catch (e) {
			console.log(e)
		}
	}

	const [image, setImage] = useState(null)
	const [image2, setImage2] = useState(null)
	const [image3, setImage3] = useState(null)
	const [image4, setImage4] = useState(null)
	const [image5, setImage5] = useState(null)

	return (
		<>
			<FormProvider {...methods}>
				<form className={classes.bouquetsCreate} onSubmit={methods.handleSubmit(submitHandler)}>
						<div className={classes.left}>
							<Input
								variant={'outlined'}
								name={'name_buket'}
								label={'Назва букету*'}
								placeholder={'Напр, Букет веснянний'}
							/>
							<Input
								variant={'outlined'}
								name={'name_buket_ru'}
								label={'Назва букету російською*'}
								placeholder={'Напр, Букет весенний'}
							/>
							<div>
								<div className={classes.title}>
									Розмір букету*
								</div>
								<div style={{display: 'flex', gap: 20}}>
									<Input
										variant={'outlined'}
										style={{width: 100}}
										type={'number'}
										name={'size_width'}
										placeholder={'Ширина'}
										postLabel={'см'}
									/>
									<Input
										variant={'outlined'}
										style={{width: 100}}
										type={'number'}
										name={'size_height'}
										placeholder={'Висота'}
										postLabel={'см'}
									/>
								</div>
							</div>

							<Input
								variant={'outlined'}
								style={{width: 100}}
								type={'number'}
								label={'Час на зборку букету*'}
								name={'time_build'}
								placeholder={'10'}
								postLabel={'хв'}
							/>
							<div>
								<div className={classes.title}>
									Категорія букету*
								</div>
								<TabSelect
									name={'category_buket'}
									options={[
										{label: 'Авторські букети', value: 'avtorsky'},
										{label: 'Монобукети', value: 'mono'},
										{label: 'Букети у кошику', value: 'inBasket'},
										{label: 'Букети в коробці', value: 'inBox'},
									]}
								/>
							</div>
							<div>
								<div className={classes.title}>
									Оберіть привід
								</div>
								<TabSelectMultiple
									name={'occasions'}
									options={occasions?.map(occasion => ({label: occasion.name, value: occasion.id}))}
								/>
							</div>

						</div>
						<div className={classes.right}>
							<Cropper
								file={image}
								setFile={setImage}
								width={290}
								height={290}
								placeholder={bouquet?.images_hash?.images?.[0]?.url}
							/>
							<div style={{display: 'flex', gap: 10}}>
								<Cropper
									file={image2}
									setFile={setImage2}
									width={62}
									height={62}
									placeholder={bouquet?.images_hash?.images?.[1]?.url || '/assets/icons/image_uploader_plus.svg'}
								/>
								<Cropper
									file={image3}
									setFile={setImage3}
									width={62}
									height={62}
									placeholder={bouquet?.images_hash?.images?.[2]?.url || '/assets/icons/image_uploader_plus.svg'}
								/>
								<Cropper
									file={image4}
									setFile={setImage4}
									width={62}
									height={62}
									placeholder={bouquet?.images_hash?.images?.[3]?.url || '/assets/icons/image_uploader_plus.svg'}
								/>
								<Cropper
									file={image5}
									setFile={setImage5}
									width={62}
									height={62}
									placeholder={bouquet?.images_hash?.images?.[4]?.url || '/assets/icons/image_uploader_plus.svg'}
								/>
							</div>
						</div>
				</form>
				<div>
					<AddFlowers flowers={flowers} />
					<AddDecor decors={decors} />
					<AddAddition additions={additions} />
				</div>
				<div className={classes.buketPrice}>
					<span>Сума букету</span>
					<div>
						{buketPrice + ' грн'}
					</div>
				</div>
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
			</FormProvider>
		</>
	)
};

export default BouquetsCreate;