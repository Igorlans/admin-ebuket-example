import classes from './shippingForm.module.scss';
import Button from "@/components/UI/Button/Button";
import {FormProvider, useFieldArray, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {shippingFormSchema} from "@/validation/settings/shippingFormSchema";
import Select from "@/components/UI/Select/Select";
import Checkbox from "@/components/UI/Checkbox/Checkbox";
import Switch from "@/components/UI/Switch/Switch";
import React, {useState} from "react";
import Input from "@/components/UI/Input/Input";
import TariffItem from "@/components/PageComponents/settings/ShippingForm/TariffItem";
import PickupItem from "@/components/PageComponents/settings/ShippingForm/PickupItem";
import {apiRequest} from "@/utils/apiRequest";
import toast from "react-hot-toast";
import {useSession} from "next-auth/react";





const ShippingForm = ({shipping}) => {
	console.log('SHIPPING', shipping)

	const methods = useForm({
		mode: 'onChange',
		resolver: yupResolver(shippingFormSchema),
		defaultValues: {
			prefer_courier: shipping?.prefer_courier,
			time_delivery: shipping?.time_delivery,
			price_delivery: shipping?.price_delivery,
			free_delivery_from: shipping?.free_delivery_from,
			advanced_delivery: shipping?.advanced_delivery,
			divergence_time: shipping?.divergence_time,
			prefer_free_from: shipping?.prefer_free_from,
			prefer_pickup: shipping?.prefer_pickup,
			prefer_in_time: shipping?.prefer_in_time,
			price_in_time: shipping?.price_in_time,
			repeat_delivery: shipping?.repeat_delivery,
			type_repeat_delivery: shipping?.type_repeat_delivery,
			price_in_repeat: shipping?.price_in_repeat,
			Delivery_rates: shipping?.Delivery_rates?.items || [],
			Pickup_list: shipping?.Pickup_list?.items || [],
		}
	})
	const {fields: deliveryFields, append: deliveryAppend, remove: deliveryRemove} = useFieldArray({
		control: methods.control,
		name: 'Delivery_rates'
	})
	const {fields: pickupFields, append: pickupAppend, remove: pickupRemove} = useFieldArray({
		control: methods.control,
		name: 'Pickup_list'
	})
	console.log(methods.watch())
	console.log(methods.formState.errors)

	const {data: session, update} = useSession()
	const submitHandler = async (data) => {
		try {
			console.log("DATAAA RHF", data)
			const request = async () => {
				const storeId = session?.user?.storeId;
				const formData = {
					...data,
					Delivery_rates: {items: data.Delivery_rates},
					Pickup_list: {items: data.Pickup_list},
					storeId
				}
				console.log("FORMDATA", formData)
				return await apiRequest('/api/settings/shipping', formData, 'POST');
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
		} catch (e) {
			console.log(e)
		}
	}

	const clearCourier = () => {
		methods.setValue('time_delivery', undefined)
		methods.setValue('price_delivery', undefined)
		methods.setValue('free_delivery_from', undefined)
		methods.setValue('prefer_free_from', undefined)
	}




	return (
		<>
			<Button
				type={'submit'}
				onClick={methods.handleSubmit(submitHandler)}
				className={classes.submit_btn}
			>
				Зберегти
			</Button>
			<form className={classes.shippingForm} onSubmit={methods.handleSubmit(submitHandler)}>
				<FormProvider {...methods}>
					{/*<Select*/}
					{/*	label={'Налаштувати спосіб доставки в місті'}*/}
					{/*	name={'cityId'}*/}
					{/*	options={cityList}*/}
					{/*/>*/}
					{/*<Checkbox name={'checkbox'} label={'Налаштувати однаковий спосіб оплати для філіалів у всіх містах'}/>*/}
					<Switch
						name={'prefer_courier'}
						label={'Доставка курьером'}
						callback={clearCourier}
					/>
					{methods.watch('prefer_courier') &&
						<>
							<Input
								className={classes.short_input}
								postLabel={'хв'}
								label={'Час для здійснення доставки замовлення'}
								type={'number'}
								name={'time_delivery'}
							/>
							<div className={classes.description_text}>
								Доставка  розраховується як час на доставку  плюс час на збірку букету
							</div>
							<Input
								className={classes.short_input}
								postLabel={'грн'}
								label={'Вартість доставки'}
								name={'price_delivery'}
							/>
							<div style={{display: 'flex', alignItems: 'center'}}>
								<Checkbox
									label={'Безкоштовно від суми замовлення'}
									name={'prefer_free_from'}
									defaultValue={shipping?.prefer_free_from}
									callback={() => methods.setValue('free_delivery_from', undefined)}
								/>
								{methods.watch('prefer_free_from') &&
									<Input
										className={classes.short_input}
										postLabel={'грн'}
										type={'number'}
										name={'free_delivery_from'}
									/>
								}
							</div>
							<Switch
								name={'advanced_delivery'}
								label={'Розширенні  налаштування вартості доставки'}
								// callback={() => methods.setValue('Delivery_rates', methods.getValues('Delivery_rates').length ? methods.getValues('Delivery_rates'))}
							/>
							{methods.watch('advanced_delivery') &&
								<div>
									<div>
										<div className={classes.tariff_form}>
											{deliveryFields.map((field, index) =>
												<TariffItem key={field.id} remove={deliveryRemove} index={index} />
											)}
										</div>
										<Button
											onClick={() => deliveryAppend({
												rate_price_delivery: '',
												rate_prefer_free_from: false,
												rate_free_delivery_from: ''
											})}
											text={'Додати тариф'}
										/>
									</div>
								</div>
							}
							<Select
								className={classes.select}
								label={'Максимальне відхилення часу доставки  від вказаного замовником'}
								name={'divergence_time'}
								defaultValue={shipping?.divergence_time || 'Протягом дня'}
								options={[
									{label: 'Протягом дня', value: 'Протягом дня'},
									{label: 'Протягом тижня', value: 'Протягом тижня'},
									{label: 'Протягом місяця', value: 'Протягом місяця'},
								]}
							/>
						</>
					}
					<Switch
						name={'prefer_pickup'}
						label={'Самовивіз'}
					/>
					{methods.watch('prefer_pickup') &&
						<>
							<div className={classes.pickup_form}>
								{pickupFields.map((field, index) =>
									<PickupItem key={field.id} remove={pickupRemove} methods={methods} index={index} />
								)}
								<Button
									style={{alignSelf: 'flex-start'}}
									onClick={() => pickupAppend({
										address: '',
										weekdays_time_from: '',
										weekdays_time_to: '',
										weekend_time_from: '',
										weekend_time_to: '',
										type_payment: undefined
									})}
									text={'Додати точку самовивозу'}
								/>
							</div>

						</>
					}
					{/*<Switch name={'switch2'} label={'Самовивіз'} defaultValue={false} />*/}
					<Switch name={'prefer_in_time'} label={'Доставка в точний час'} defaultValue={false} />
					{methods.watch('prefer_in_time') &&
						<>
							<Select
								className={classes.select}
								name={'type_in_time'}
								defaultValue={shipping?.type_in_time || 'Безкоштовно'}
								options={[
									{label: 'Безкоштовна', value: 'Безкоштовна'},
									{label: 'Платна', value: 'Платна'},
								]}
							/>
							{methods.watch('type_in_time') === 'Платна' &&
								<Input
									className={classes.short_input}
									postLabel={'грн'}
									label={'Вартість доставки'}
									name={'price_in_time'}
								/>
							}
						</>
					}
					<Switch name={'repeat_delivery'} label={'Повторна доставка'} defaultValue={false} />

					{methods.watch('repeat_delivery') &&
						<>
							<Select
								className={classes.select}
								name={'type_repeat_delivery'}
								defaultValue={shipping?.type_repeat_delivery || 'Безкоштовно'}
								options={[
									{label: 'Безкоштовна', value: 'Безкоштовна'},
									{label: 'Платна', value: 'Платна'},
								]}
							/>
							{methods.watch('type_repeat_delivery') === 'Платна' &&
								<Input
									className={classes.short_input}
									postLabel={'грн'}
									label={'Вартість доставки'}
									name={'price_in_repeat'}
								/>
							}
						</>
					}
					{/*<div style={{fontSize: 14}}>У випадку, якщо доставка не відбулася з вини клієнта </div>*/}
				</FormProvider>
			</form>
		</>
	);
};
export default ShippingForm;