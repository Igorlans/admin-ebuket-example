import classes from './decorCreate.module.scss';
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Button from "@/components/UI/Button/Button";
import Input from "@/components/UI/Input/Input";
import {decorCreateSchema} from "@/validation/assortment/decorCreateSchema";
import Textarea from "@/components/UI/TextArea/Textarea";
import toast from "react-hot-toast";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {apiRequest} from "@/utils/apiRequest";

const DecorCreate = ({decor}) => {
	const methods = useForm({
		mode: 'onBlur',
		resolver: yupResolver(decorCreateSchema),
		defaultValues: {
			title: decor?.title || '',
			characteristic: decor?.characteristic || '',
			price: decor?.price || '',
			comment: decor?.comment || '',
		}
	})
	const {data: session} = useSession()
	const router = useRouter();

	console.log(methods.watch(methods.getValues()))
	console.log(methods.formState.errors)
	const submitHandler = async (data) => {
		try {
			console.log('passed validation')
			const formData = {
				...data,
				id: decor?.id,
				storeId: session.user.storeId,
				price: Number(data.price),
				oldPrice: decor?.price
			}

			await toast.promise(
				apiRequest(
					'/api/assortment/decor',
					formData,
					decor ? 'PUT' : 'POST'
				),
				{
					loading: decor ? 'Оновлення оформлення...' : 'Створення оформлення...',
					success: (data) => decor ? `Оформлення "${data.title}" оновлено` : `Оформлення "${data.title}" створено`,
					error: (err) => err.message
				}
			);
			router.push('/assortment/decor')
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<>
			<form className={classes.decorCreate} onSubmit={methods.handleSubmit(submitHandler)}>
				<FormProvider {...methods}>
					<div className={classes.left}>
						<Input variant={'outlined'} name={'title'} label={'Назва оформлення*'} placeholder={'Напр, стрічка'} />
						<Input variant={'outlined'} style={{width: 100}} name={'characteristic'} label={'Розмір'} placeholder={'50см'} />
						<Input variant={'outlined'} type={'number'} style={{width: 100}} name={'price'} label={'Ціна*'} placeholder={'0'} postLabel={'грн'}/>

					</div>
					<div className={classes.right}>
						<Textarea name={'comment'} placeholder={'Видно тільки менеджеру'} label={'Комментар'} />
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

export default DecorCreate;