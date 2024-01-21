import classes from './input.module.scss';
import {useController, useFormContext} from "react-hook-form";
import React from "react";


const Input = ({variant, name, className, label, postLabel, preLabel, onChange, array, arrayName, index, ...props}) => {
	const nestedName = name?.split('.')?.join('?.');
	const {register, control, formState: {errors}} = useFormContext();
	const { field } = useController({
		control,
		name
	});
	const isError = array ? !!errors[array]?.[index]?.[arrayName] : !!eval(`errors?.${nestedName}`);
	const outlinedErrorStyles = isError ? classes.outlined_error : null
	const underlinedErrorStyles = isError ? classes.underlined_error : null
	const outlinedClasses = [classes.input, outlinedErrorStyles].join(' ');
	const underlinedClasses = [classes.input, classes.underlined, underlinedErrorStyles].join(' ');
	const isRegistered = name ? {...register(name)} : null;

	switch (variant) {
		case 'outlined':
			return (
				<div className={className} style={{display: 'inline-block',position: 'relative', marginTop: label ? 25 : 0, marginBottom: 20}}>
					{label &&
						<span className={classes.label}>{label}</span>
					}
					<div className={classes.inputRow}>
						{preLabel &&
							<div>{preLabel}</div>
						}
						<input
							className={outlinedClasses}
							onChange={(event) => {
								field.onChange(event.target.value)
								onChange && onChange(event.target.value);
							}} // send value to hook form
							onBlur={field.onBlur} // notify when input is touched/blur
							value={field.value} // input value
							name={field.name} // send down the input name
							ref={field.ref}
							{...props}
						/>
						{postLabel &&
							<div>{postLabel}</div>
						}
					</div>
					{array
						?
						(
							!!errors?.[array]?.[index]?.[arrayName] &&
								<div className={classes.error_text}>{errors[array]?.[index][arrayName].message ?? ''}</div>
						)
						:
						(
							!!eval(`errors?.${nestedName}`) &&
								<div className={classes.error_text}>{eval(`errors?.${nestedName}?.message`) ?? ''}</div>
						)
					}
				</div>

			);
		case 'underlined':
			return (
				<div className={className} style={{display: 'inline-block',position: 'relative', marginTop: label ? 25 : 0, marginBottom: 20}}>
					{label &&
						<span className={classes.label}>{label}</span>
					}
					<div className={classes.inputRow}>
						{preLabel &&
							<div>{preLabel}</div>
						}
						<input
							{...props}
							className={underlinedClasses}
							{...isRegistered}
							onChange={onChange}
						/>
						{postLabel &&
							<div>{postLabel}</div>
						}
					</div>
					{array
						?
						(
							!!errors[array]?.[index]?.[arrayName] &&
							<div className={classes.error_text}>{errors[array]?.[index]?.[arrayName].message ?? ''}</div>
						)
						:
						(
							!!eval(`errors?.${nestedName}`) &&
								<div className={classes.error_text}>{eval(`errors?.${nestedName}?.message`) ?? ''}</div>
						)
					}

				</div>

			);

		default:
			return (
				<div className={className} style={{display: 'inline-block',position: 'relative', marginTop: label ? 25 : 0}}>
					{label &&
						<span className={classes.label}>{label}</span>
					}
					<div className={classes.inputRow}>
						{preLabel &&
							<div>{preLabel}</div>
						}
						<input
							className={outlinedClasses}
							{...isRegistered}
							onChange={onChange}
							{...props}
						/>
						{postLabel &&
							<div>{postLabel}</div>
						}
					</div>
					{array
						?
						(
							!!errors[array]?.[index]?.[arrayName] &&
							<div className={classes.error_text}>{errors[array]?.[index]?.[arrayName].message ?? ''}</div>
						)
						:
						(
							!!eval(`errors?.${nestedName}`) &&
								<div className={classes.error_text}>{eval(`errors?.${nestedName}?.message`) ?? ''}</div>
						)
					}
				</div>
			);
	}

};

export default Input;