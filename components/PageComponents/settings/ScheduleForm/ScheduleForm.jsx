import {FormProvider, useForm} from "react-hook-form";
import classes from './scheduleForm.module.scss';
import {yupResolver} from "@hookform/resolvers/yup";
import {scheduleFormSchema} from "@/validation/settings/scheduleFormSchema";
import ScheduleFormItem from "@/components/PageComponents/settings/ScheduleForm/ScheduleFormItem";
import Switch from "@/components/UI/Switch/Switch";
import Button from "@/components/UI/Button/Button";
import {useSession} from "next-auth/react";
import SupabaseFileService from "@/services/SupabaseFileService";
import {STORAGE_URL} from "@/config";
import {apiRequest} from "@/utils/apiRequest";
import toast from "react-hot-toast";

const days = [
	{id: 0, name: 'monday', label: 'Понеділок'},
	{id: 1, name: 'tuesday', label: 'Вівторок'},
	{id: 2, name: 'wednesday', label: 'Середа'},
	{id: 3, name: 'thursday', label: 'Четвер'},
	{id: 4, name: 'friday', label: 'П\'ятниця'},
	{id: 5, name: 'saturday', label: 'Субота'},
	{id: 6, name: 'sunday', label: 'Неділя'},
]

const ScheduleForm = ({schedule}) => {
	const methods = useForm({
		mode: 'onBlur',
		resolver: yupResolver(scheduleFormSchema),
		defaultValues: {
			order_schedule: schedule?.order_schedule,
			couriers_schedule: schedule?.couriers_schedule
		}
	})
	console.log(methods.watch())
	console.log(methods.formState.errors)
	const {data: session, update} = useSession()

	const submitHandler = async (data) => {
		try {
			const request = async () => {
				const storeId = session?.user?.storeId;
				const formData = {
					storeId: storeId,
					order_schedule: data.order_schedule,
					couriers_schedule: data.couriers_schedule,
				}
				return await apiRequest('/api/settings/schedule', formData, 'POST');
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
			<form className={classes.scheduleForm} onSubmit={methods.handleSubmit(submitHandler)}>
				<FormProvider {...methods}>
					<h2 className={classes.title}>Графік обробки заказів</h2>
					<p>Вказуйте актуальний графік, тому що через годину замовлення без обробки буде відхилено з вини магазину.</p>
					<Switch name={'order_schedule.advanced'} label={'Розширені налаштування'} />
					{methods.watch('order_schedule.advanced')
						?
						days.map(day =>
							<ScheduleFormItem name={`order_schedule.${day.name}`} label={day.label} />
						)
						:
						<>
							<ScheduleFormItem name={`order_schedule.weekdays`} label={'Пн-Пт:'} />
							<ScheduleFormItem name={`order_schedule.weekends`} label={'Сб-Нд:'} />
						</>
					}
					<h2 className={classes.title}>Графік роботи кур'єрів</h2>
					<Switch name={'couriers_schedule.advanced'} label={'Розширені налаштування'} />
					{methods.watch('couriers_schedule.advanced')
						?
							days.map(day =>
								<ScheduleFormItem name={`couriers_schedule.${day.name}`} label={day.label} />
							)
						:
							<>
								<ScheduleFormItem name={`couriers_schedule.weekdays`} label={'Пн-Пт:'} />
								<ScheduleFormItem name={`couriers_schedule.weekends`} label={'Сб-Нд:'} />
							</>
					}
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

export default ScheduleForm;