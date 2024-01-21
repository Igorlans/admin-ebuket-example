import classes from './switch.module.scss';
const ControlledSwitch =
	({
		 value,
		 label,
		 onClick,
		 className,
		 onChange,
		 ...props
	 }) => {

		const switchClasses = [classes.container, className].join(' ');
		const handleClick = (e) => {
			onClick && onClick(e)
			onChange()
		};

		return (
			<div className={switchClasses}>
				{label &&
					<div className={classes['switch-text']}>{label}</div>
				}
				<div
					onClick={handleClick}
					className={`${classes.switch} ${value ? classes.active : ''}`}
				>
					<input
						{...props}
						type="checkbox"
						className={classes['switch-input']}
					/>
					<span className={classes['switch-label']} />
					<span className={`${classes['switch-handle']} ${value ? classes['switch-handle-on'] : ''}`} />
				</div>
			</div>
		);
	};

export default ControlledSwitch;