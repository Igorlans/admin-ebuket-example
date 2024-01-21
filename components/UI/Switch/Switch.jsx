import React, {useState} from 'react';
import {useFormContext} from "react-hook-form";
import classes from './switch.module.scss';
const Switch =
	({
		 value,
		 name,
		 label,
		 className,
		 defaultValue,
		 onChange,
		 callback,
		 ...props
	}) => {
	const methods = useFormContext() || {};
	const controlled = Boolean(onChange);
	const isRegister = controlled ? undefined : {...methods.register(name)};
	const [checked, setChecked] = useState(isRegister ? methods?.getValues(name) : false);
	// const errorStyles = !!errors[name] ? classes.error : null

	const switchClasses = [classes.container, className].join(' ');
	const handleClick = () => {
		setChecked(!checked)
		if (!controlled) {
			methods.setValue(name, !checked);
		}
		if (onChange) {
			onChange(!checked);
		}
		callback && callback()

	};

	return (
		<div className={switchClasses}>
			{label &&
				<div className={classes['switch-text']}>{label}</div>
			}
			<div
				onClick={handleClick}
				className={`${classes.switch} ${checked ? classes.active : ''}`}
			>
				<input
					{...isRegister}
					{...props}
					type="checkbox"
					className={classes['switch-input']}
				/>
				<span className={classes['switch-label']} />
				<span className={`${classes['switch-handle']} ${checked ? classes['switch-handle-on'] : ''}`} />
			</div>
		</div>
	);
};

export default Switch;