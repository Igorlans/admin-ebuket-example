import React, {useState} from 'react';
import {useFormContext} from "react-hook-form";
import classes from './checkbox.module.scss';

const Checkbox =
	({
		value,
		onChange,
		name,
		label,
		className,
		defaultValue,
		callback,
		...props
	}) => {
	const methods = useFormContext() || {};
	const uncontrolled = Boolean(name);
	const isRegister = uncontrolled ? {...methods.register(name)} : undefined;
	defaultValue = isRegister && methods.getValues(name) || defaultValue;
	const [checked, setChecked] = useState(defaultValue || false);
		console.log(name)
	// const errorStyles = !!errors[name] ? classes.error : null

	const checkboxClasses = [classes.checkbox_body, className].join(' ');
	const handleClick = () => {
		setChecked(!checked)
		console.log('change')
		if (uncontrolled) {
			console.log('uncontrolled change')
			methods.setValue(name, !checked);
		}
		if (onChange) {
			console.log('controlled change')
			onChange();
		}
		callback && callback()
	};

	return (
		<div
			className={checkboxClasses}
		>
			<label className={classes.checkbox_row}>
				<input
					{...isRegister}
					onChange={handleClick}
					className={classes.checkbox}
					type="checkbox"
					{...props}
				/>
				{label &&
					<span>{label}</span>
				}
			</label>
		</div>
	);
};

export default Checkbox;