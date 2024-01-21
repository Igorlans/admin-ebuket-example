import React from 'react';
import classes from "@/components/PageComponents/settings/ShippingForm/shippingForm.module.scss";
import {IoIosClose} from "react-icons/io";
import Input from "@/components/UI/Input/Input";
import Checkbox from "@/components/UI/Checkbox/Checkbox";
import {useFormContext} from "react-hook-form";

const TariffItem = ({remove, index}) => {
	const methods = useFormContext();
	const timeMask = (value) => {
		return value
			.replace(/\D/g, '')
			.replace(/(\d{2})(\d)/, '$1:$2')
			.slice(0, 5);
	};


	return (
		<div className={classes.tariff_rate}>
			<div className={classes.tariff_header}>
				{`Тариф ${index + 1}`}
				<div className={classes.tariff_close}>
					<IoIosClose onClick={() => remove(index)} size={'2.2em'} />
				</div>
			</div>
			<div className={classes.input_list}>
				<div style={{display: 'flex', gap: 40, alignItems: 'center'}}>
					<Input
						className={classes.short_input}
						preLabel={'З'}
						name={`Delivery_rates[${index}].time_from`}
						placeholder={'11:11'}
						onChange={(e) => methods.setValue(`Delivery_rates[${index}].time_from`, timeMask(e.target.value))}
						array={'Delivery_rates'}
						index={index}
						arrayName={'time_from'}
					/>
					<Input
						className={classes.short_input}
						preLabel={'До'}
						name={`Delivery_rates[${index}].time_to`}
						placeholder={'11:11'}
						onChange={(e) => methods.setValue(`Delivery_rates[${index}].time_to`, timeMask(e.target.value))}
						array={'Delivery_rates'}
						index={index}
						arrayName={'time_to'}
					/>
				</div>
				<Input
					className={classes.short_input}
					postLabel={'грн'}
					label={'Вартість доставки'}
					name={`Delivery_rates[${index}].rate_price_delivery`}
					array={'Delivery_rates'}
					index={index}
					arrayName={'rate_price_delivery'}
				/>
				<div style={{display: 'flex', gap: 30, alignItems: 'center'}}>
					<Checkbox
						label={'Безкоштовно від суми замовлення'}
						name={`Delivery_rates[${index}].rate_prefer_free_from`}
					/>

					{methods.watch(`Delivery_rates[${index}].rate_prefer_free_from`) &&
						<>
							<Input
								className={classes.short_input}
								postLabel={'грн'}
								type={'number'}
								name={`Delivery_rates[${index}].rate_free_delivery_from`}
								array={'Delivery_rates'}
								index={index}
								arrayName={'rate_free_delivery_from'}
							/>
						</>
					}
				</div>
			</div>
		</div>
	);
};

export default TariffItem;