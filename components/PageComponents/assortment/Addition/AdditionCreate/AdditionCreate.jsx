import classes from './additionCreate.module.scss';
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Button from "@/components/UI/Button/Button";
import {additionCreateSchema} from "@/validation/assortment/additionCreateSchema";
import Input from "@/components/UI/Input/Input";
import TabSelect from "@/components/UI/TabSelect/TabSelect";
import Checkbox from "@/components/UI/Checkbox/Checkbox";
import {useState} from "react";
import Cropper from "@/components/UI/Cropper/Cropper";
import SupabaseFileService from "@/services/SupabaseFileService";
import {useSession} from "next-auth/react";
import {STORAGE_URL} from "@/config";
import toast from "react-hot-toast";
import {apiRequest} from "@/utils/apiRequest";
import {useRouter} from "next/navigation";

const AdditionCreate = ({addition}) => {
	const router = useRouter();
	const methods = useForm({
		mode: 'onBlur',
		resolver: yupResolver(additionCreateSchema),
		defaultValues: {
			name: addition?.name || '',
			type_addition: addition?.type_addition || '',
			price: addition?.price || '',
			prefer_free: addition?.prefer_free || false,
		}
	})
	const [image, setImage] = useState(null);
	console.log(methods.watch(methods.getValues()))
	console.log(methods.formState.errors)
	const {data: session} = useSession()
	const submitHandler = async (data) => {
		try {
			console.log('passed validation')
			console.log(data)
			console.log(image)
			const request = async () => {
				const storeId = session?.user?.storeId
				const newData = {
					...data,
					id: addition?.id,
					storeId: storeId,
					image: addition?.image,
					price: Number(data.price)
				}

				if (image) {
					const file = await SupabaseFileService.uploadFile(image, 'shops', image.name, `shop-${storeId}/addition`);
					newData.image = {
						name: image.name,
						url: `${STORAGE_URL}/${file.path}`
					}
					if (addition?.image?.url) {
						await SupabaseFileService.removeFile('shops', `shop-${storeId}/addition/${addition.image.name}`)
					}
				}
				return await apiRequest('/api/assortment/addition', newData, addition ? 'PUT' : 'POST');
			}


			await toast.promise(
				request(),
				{
					loading: addition ? 'Оновлення доповнення...' : 'Створення доповнення...',
					success: (data) => addition ? `Доповнення "${data.name}" оновлено` : `Доповнення "${data.name}" створено`,
					error: (err) => err.message
				}
			);

			router.push('/assortment/addition')
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<>
			<form className={classes.additionCreate} onSubmit={methods.handleSubmit(submitHandler)}>
				<FormProvider {...methods}>
					<div className={classes.left}>
						<Input
							variant={'outlined'}
							name={'name'}
							label={'Назва додатку*'}
							placeholder={'Назва додатку'}
						/>
						<TabSelect
							type={'number'}
							name={'type_addition'}
							label={'Тип додатку*'}
							options={[
								{label: 'Листівка', value: 'Листівка'},
								{label: 'Іграшка', value: 'Іграшка'},
								{label: 'Солодощі', value: 'Солодощі'},
								{label: 'Інше', value: 'Інше'},
							]}
						/>
						<div style={{display: 'flex', gap: 60, alignItems: 'center'}}>
							<Input
								variant={'outlined'}
								name={'price'}
								style={{width: 100}}
								label={'Ціна*'}
								type={'number'}
								placeholder={'100'}
								postLabel={'грн.'}
							/>
							<Checkbox
								name={'prefer_free'}
								label={'Безкоштовно'}
								callback={() => methods.trigger('price')}
							/>
						</div>
					</div>
					<div className={classes.right}>
						<Cropper file={image} setFile={setImage} width={290} height={290} placeholder={addition?.image?.url}/>
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
	)
};

export default AdditionCreate;