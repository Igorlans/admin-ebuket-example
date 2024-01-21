import classes from './button.module.scss';


const Button = ({variant, text, className, children, ...props}) => {
	const outlineClasses = [classes.button, classes.outlined, className].join(' ');
	const containedClasses = [classes.button, className].join(' ');


	switch (variant) {
		case 'contained':
			return (
				<button {...props} className={containedClasses} type={'button'}>
					{text ? text : children}
				</button>
			);
		case 'outlined':
			return (
				<button {...props} className={outlineClasses} type={'button'}>
					{text ? text : children}
				</button>
			);
		default:
			return (
				<button {...props} className={containedClasses} type={'button'}>
					{text ? text : children}
				</button>
			);
	}

};

export default Button;