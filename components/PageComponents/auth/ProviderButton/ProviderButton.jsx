import classes from './providerButton.module.scss'
const ProviderButton = ({provider, onClick}) => {
	switch (provider) {
		case 'google':
			return (
				<button type={'button'} className={classes.providerButton} onClick={onClick}>
					<div className={classes.icon}>
						<img src="/assets/icons/google.png" alt="google"/>
					</div>
					<span>Google</span>
				</button>
			);
		case 'facebook':
			return (
				<button type={'button'} className={classes.providerButton} onClick={onClick}>
					<div className={classes.icon}>
						<img  src="/assets/icons/facebook.png" alt="facebook"/>
					</div>
					<span>Facebook</span>
				</button>
			);
		default:
			return (
				<button  type={'button'} className={classes.providerButton} onClick={onClick}>
					<img className={classes.icon} src="/assets/icons/google.png" alt="google"/>
					<span>Google</span>
				</button>
			);
	}
};
export default ProviderButton;