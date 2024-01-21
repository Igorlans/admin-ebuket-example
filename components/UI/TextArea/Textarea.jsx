import React from 'react';
import {useFormContext} from "react-hook-form";
import classes from './textarea.module.scss';

const Textarea = ({name, className, label, maxLength, ...props}) => {
	const {register, watch, formState: {errors}} = useFormContext();
	const errorStyles = !!errors[name] ? classes.error : null

	const textAreaClasses = [classes.textarea, errorStyles].join(' ');
	const isRegistered = name ? {...register(name)} : null
	return (
		<div className={className} style={{position: "relative"}}>
			{label &&
				<span className={classes.label}>{label}</span>
			}
			<div className={classes.textarea_body}>
				<textarea
					className={textAreaClasses}
					{...props}
					{...isRegistered}
				/>
				{maxLength &&
					<div className={classes.indicator}>
						<span>{watch(name)?.length ? watch(name).length : 0}</span>
						<span>/</span>
						<span>{maxLength}</span>
					</div>
				}
			</div>
			{!!errors[name] &&
				<div className={classes.error_text}>{errors[name]?.message ?? ''}</div>
			}
		</div>
	);
};

export default Textarea;