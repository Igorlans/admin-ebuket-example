import classes from './employeeCreate.module.scss';
import Input from "@/components/UI/Input/Input";
import {Controller, FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Button from "@/components/UI/Button/Button";
import TabSelect from "@/components/UI/TabSelect/TabSelect";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {apiRequest} from "@/utils/apiRequest";
import {employeeFormSchema} from "@/validation/settings/employeeFormSchema";
import toast from "react-hot-toast";
import ReactInputMask from 'react-input-mask';
import { TextField } from '@mui/material';
import ControlledInput from '@/components/UI/Input/ControlledInput';



const EmployeeCreate = ({employee}) => {
	console.log("FLOWERS", employee);

	const router = useRouter();

	const methods = useForm({
		mode: 'onBlur',
		defaultValues: {
			name: employee?.name || '',
			role: employee?.Employee?.role || '',
			phone: employee?.phone || '',
			email: employee?.email || '',
			password: employee?.password || ''
		},
		resolver: yupResolver(employeeFormSchema)
	})

	console.log('VALUES', methods.watch(methods.getValues()))
	console.log(methods.formState.errors)
	const {data: session, update} = useSession()

	const submitHandler = async (data) => {
		try {
			const request = async () => {
				const storeId = session?.user?.storeId;

				const formData = {
					...data,
					id: employee?.id,
					role: data.role,
					name: data.name,
					phone: data.phone,
					email: data.email,
					storeId
				}
				console.log("FORM DATA", formData)

				return await apiRequest('/api/employee', formData, employee ? 'PUT' : 'POST');
			}


			await toast.promise(
				request(),
				{
					loading: employee ? 'Оновлення працівника...' : 'Створення працівника...',
					success: (data) => {
						(async () => {
							await update({});
						})()

						if (employee) {
							return `Працівника "${data.name}" оновлено`
						} else {
							return `Працівника "${data.name}" створено`
						}
					},
					error: (err) => err.message
				}
			);
			router.push('/settings/employee')
		} catch (e) {
			console.log(e)
		}
	}


	return (
		<>
			<FormProvider {...methods}>
				<form className={classes.employeesCreate} onSubmit={methods.handleSubmit(submitHandler)}>
					<div className={classes.grid}>
						<div>
							<Input
								variant={'outlined'}
								name={'name'}
								label={'Імя*'}
								placeholder={"Вкажіть ім'я"}
							/>
						</div>
						<div>
							<TabSelect
								label={'Посада'}
								name={'role'}
								options={[
									{label: 'Менеджер', value: 'MANAGER'},
									{label: 'Флорист', value: 'FLORIST'},
									{label: 'Власник', value: 'OWNER'},
								]}
							/>
						</div>
						<div>


{/* 
							<Input
								variant={'outlined'}
								name={'phone'}
								label={'Телефон*'}
								placeholder={'+380'}
							/> */}


							<Controller
        					    name="phone"
        					    control={methods.control}
        					    placeholder={'+380 (99) 999-99-99'}
        					    // rules={
        					    //   {
        					    //     required: "Введіть коректний формат",
        					    //     minLength: {value: 19, message: "Введіть коректний формат"}
        					    //   }
        					    // }
        					    render={({ field }) => (
        					    <ReactInputMask
        					      mask="+380 (99) 999-99-99"
        					      maskChar={null}
        					      value={field.value}
        					      onChange={field.onChange}
        					    >
        					      {(inputProps) => (
        					        <ControlledInput
        					          {...inputProps}
									  error={methods.formState.errors?.phone?.message}
        					        //   error={!!errors['phone_recipient']}
        					        //   helperText={errors['phone_recipient']?.message ?? ''}
        					          label={"Номер телефону"}
        					        />
        					      )}
        					      </ReactInputMask>
        					    )}
        					  />























						</div>
						<div>
							<Input
								variant={'outlined'}
								name={'email'}
								label={'Email*'}
								placeholder={'Email'}
							/>
							<Input
								variant={'outlined'}
								name={'password'}
								label={'Пароль*'}
								placeholder={'Пароль'}
							/>
						</div>
					</div>		
					<div style={{marginTop: 40, display: 'flex', gap: 15}}>

					</div>			
				</form>
				<Button
					type={'submit'}
					onClick={methods.handleSubmit(submitHandler)}
				>
					{employee ? 'Змінити працівника' : 'Додати працівника'}

				</Button>
			</FormProvider>
		</>
	)
};

export default EmployeeCreate;