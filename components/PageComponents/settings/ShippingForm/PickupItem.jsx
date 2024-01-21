import React, {useEffect} from 'react';
import classes from "@/components/PageComponents/settings/ShippingForm/shippingForm.module.scss";
import {IoIosClose} from "react-icons/io";
import Input from "@/components/UI/Input/Input";
import {useFormContext, useWatch} from "react-hook-form";
import Select from "@/components/UI/Select/Select";
import {openAddress} from "@/utils/openAddress";



const TariffItem = ({remove, index, methods}) => {
	const timeMask = (value) => {
		return value
			.replace(/\D/g, '')
			.replace(/(\d{2})(\d)/, '$1:$2')
			.slice(0, 5);
	};


	const address = methods.watch('Pickup_list')[index]?.address;




	return (
		<div className={classes.pickup_item}>
			<div className={classes.pickup_header}>
				{`Точка самовивозу ${index + 1}`}
				<div className={classes.pickup_close}>
					<IoIosClose onClick={() => remove(index)} size={'2.2em'} />
				</div>
			</div>
			<div className={classes.input_list}>
				<div>
					<div className={classes.pickup_subtitle}>Адреса</div>
					{!!address &&
						<div className={classes.pickup_description}>
							Рекомендуємо перевірити адресу на правильність натиснувши на "Подивитись на карті"
						</div>
					}
					<Input
						className={classes.fullInput}
						name={`Pickup_list[${index}].address`}
						placeholder={'Введіть адресу'}
						array={'Pickup_list'}
						variant={'outlined'}
						index={index}
						arrayName={'address'}
					/>
					{!!address &&
						<div onClick={() => openAddress(address)} className={classes.pickup_checkmap}>
							Подивитись на карті
						</div>
					}


				</div>
				<div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
					<div className={classes.pickup_subtitle}>Графік роботи</div>
					<div style={{display: 'flex', gap: 40, alignItems: 'center'}}>
						<div>Пн-Пт:</div>
						<Input
							className={classes.short_input}
							preLabel={'З'}
							name={`Pickup_list[${index}].weekdays_time_from`}
							placeholder={'11:11'}
							onChange={(e) => methods.setValue(`Pickup_list[${index}].weekdays_time_from`, timeMask(e.target.value))}
							array={'Pickup_list'}
							index={index}
							arrayName={'weekdays_time_from'}
						/>
						<Input
							className={classes.short_input}
							preLabel={'До'}
							name={`Pickup_list[${index}].weekdays_time_to`}
							placeholder={'11:11'}
							onChange={(e) => methods.setValue(`Pickup_list[${index}].weekdays_time_to`, timeMask(e.target.value))}
							array={'Pickup_list'}
							index={index}
							arrayName={'weekdays_time_to'}
						/>
					</div>
					<div style={{display: 'flex', gap: 40, alignItems: 'center'}}>
						<div>Сб-Нд:</div>
						<Input
							className={classes.short_input}
							preLabel={'З'}
							name={`Pickup_list[${index}].weekend_time_from`}
							placeholder={'11:11'}
							onChange={(e) => methods.setValue(`Pickup_list[${index}].weekend_time_from`, timeMask(e.target.value))}
							array={'Pickup_list'}
							index={index}
							arrayName={'weekend_time_from'}
						/>
						<Input
							className={classes.short_input}
							preLabel={'До'}
							name={`Pickup_list[${index}].weekend_time_to`}
							placeholder={'11:11'}
							onChange={(e) => methods.setValue(`Pickup_list[${index}].weekend_time_to`, timeMask(e.target.value))}
							array={'Pickup_list'}
							index={index}
							arrayName={'weekend_time_to'}
						/>
					</div>
				</div>

				<div>
					<Select
						label={'Оплата'}
						className={classes.select}
						name={`Pickup_list[${index}].type_payment`}
						defaultValue={methods.getValues(`Pickup_list[${index}].type_payment`) || 'Готівкою'}
						options={[
							{label: 'Готівкою', value: 'Готівкою'},
							{label: 'Через термінал та готівкою', value: 'Через термінал та готівкою'},
						]}
					/>
				</div>

			</div>
		</div>
	);
};

export default TariffItem;