import classes from './scheduleForm.module.scss';
import Input from "@/components/UI/Input/Input";
import React from "react";
import Checkbox from "@/components/UI/Checkbox/Checkbox";
import {useFormContext} from "react-hook-form";
const ScheduleFormItem = ({name, weekend, label}) => {
	const methods = useFormContext();
	const timeMask = (value) => {
		return value
			.replace(/\D/g, '')
			.replace(/(\d{2})(\d)/, '$1:$2')
			.slice(0, 5);
	};

	return (
		<div className={classes.scheduleItem}>
			<div className={classes.label}>{label}</div>
			<div className={classes.inputs}>
				<Input
					className={classes.input}
					style={{width: 100}}
					label={'з'}
					name={`${name}.opening`}
					placeholder={'11:11'}
					onChange={(e) => {
						e.target.value = timeMask(e.target.value)
					}}
				/>
				<Input
					className={classes.input}
					style={{width: 100}}
					label={'до'}
					placeholder={'11:11'}
					name={`${name}.closing`}
					onChange={(e) => {
						e.target.value = timeMask(e.target.value)
					}}
				/>
			</div>
			<div className={classes.checkbox}>
				<Checkbox
					label={'Вихідний'}
					name={`${name}.isWeekend`}
					// callback={() => methods.setValue('free_delivery_from', undefined)}
				/>
			</div>
		</div>
	);
};

export default ScheduleFormItem;