import classes from './input.module.scss';

const ControlledInput = ({value, variant, className, label, postLabel, preLabel, error, onChange, ...props}) => {
	const outlinedClasses = [classes.input, !!error ? classes.outlined_error : null].join(' ');
	const underlinedClasses = [classes.input, classes.underlined, !!error ? classes.underlined_error : null].join(' ');

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
							onChange={onChange} // send value to hook form
							value={value} // input value
							{...props}
						/>
						{postLabel &&
							<div>{postLabel}</div>
						}
					</div>
					{!!error &&
						<div className={classes.error_text}>{error}</div>
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
							onChange={onChange} // send value to hook form
							value={value}
						/>
						{postLabel &&
							<div>{postLabel}</div>
						}
					</div>
					{!!error &&
						<div className={classes.error_text}>{error}</div>
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
							value={value}
							onChange={onChange}
							{...props}
						/>
						{postLabel &&
							<div>{postLabel}</div>
						}
					</div>
					{!!error &&
						<div className={classes.error_text}>{error}</div>
					}
				</div>
			);
	}

};

export default ControlledInput;