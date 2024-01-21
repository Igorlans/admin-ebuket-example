import classes from './paymentsForm.module.scss';
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Button from "@/components/UI/Button/Button";
import {paymentsFormSchema} from "@/validation/settings/paymentsFormSchema";
import Switch from "@/components/UI/Switch/Switch";
import Input from "@/components/UI/Input/Input";
import Checkbox from "@/components/UI/Checkbox/Checkbox";
import {apiRequest} from "@/utils/apiRequest";
import toast from "react-hot-toast";
import {useSession} from "next-auth/react";

const PaymentsForm = ({payment}) => {
	console.log(payment)
	const methods = useForm({
		mode: 'onBlur',
		resolver: yupResolver(paymentsFormSchema),
		defaultValues: {
			prefer_cash: payment?.prefer_cash || false,
			prefer_prepayment: payment?.prefer_prepayment || false,
			prefer_all_payment: payment?.prefer_all_payment || false,
			prefer_crypto: payment?.prefer_crypto || false,
			prefer_payment_number: payment?.prefer_payment_number || false,
			prefer_cashless: payment?.prefer_cashless || false,
			sum_prepayment: payment?.sum_prepayment,
			payment_card: payment?.payment_card,
			fio_card: payment?.fio_card,
			name_bank: payment?.name_bank,
			payment_number: payment?.payment_number
		}
	})
	console.log(methods.watch())
	console.log(methods.formState.errors)
	const {data: session, update} = useSession();

	const submitHandler = async (data) => {
		try {
			const request = async () => {
				const storeId = session?.user?.storeId;
				const formData = {
					...data,
					sum_prepayment: Number(data.sum_prepayment),
					storeId: storeId
				}

				return await apiRequest('/api/settings/payment', formData, 'POST');
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
			// router.push('/settings/payments')
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<>
			<form className={classes.paymentsForm} onSubmit={methods.handleSubmit(submitHandler)}>
				<FormProvider {...methods}>
					<Switch
						name={'prefer_cash'}
						label={'Готівкою при отриманні'}
					/>
					<Switch
						name={'prefer_prepayment'}
						label={'Часткова передплата'}
					/>
					{methods.watch('prefer_prepayment') &&
						<>
							<Input
								style={{width: 100}}
								label={'Сума*'}
								name={'sum_prepayment'}
							/>
						</>
					}
					<Switch
						name={'prefer_all_payment'}
						label={'Повна передплата'}
					/>
					{methods.watch('prefer_all_payment') &&
						<>
							<Input
								label={'Номер карти'}
								name={'payment_card'}
							/>
							<Input
								label={'ФIO'}
								name={'fio_card'}
							/>
							<Input
								label={'Назва банка*'}
								name={'name_bank'}
							/>
							<Checkbox name={'prefer_payment_number'} label={'Розрахунковий рахунок'} />
							{methods.watch('prefer_payment_number') &&
								<Input
									name={'payment_number'}
									placeholder={'UA173000010000032003102901026'}
								/>
							}
						</>
					}
					<Switch
						name={'prefer_cashless'}
						label={'Безгот. для юр. осіб'}
					/>
					<Switch
						name={'prefer_crypto'}
						label={'Оплата криптовалютою'}
					/>
					<Button
						type={'submit'}
						onClick={methods.handleSubmit(submitHandler)}
						style={{alignSelf: 'flex-start'}}
						// className={classes.submit_btn}
					>
						Зберегти
					</Button>
				</FormProvider>
			</form>
		</>
	);
};

export default PaymentsForm;