import classes from './window.module.scss';
import Image from "next/image";

const Window = ({title, children, iconSrc, iconAlt}) => {
	return (
		<main className={classes.window}>
			<div className={classes.window_body}>
				<div className={classes.window_header}>
					<div className={classes.window_title}>
						{iconSrc &&
							<div className={classes.title_icon}>
								<Image src={iconSrc} alt={iconAlt || title} width={30} height={25} />
							</div>
						}
						<div className={classes.title_text}>
							{title}
						</div>
					</div>
				</div>
				<div className={classes.window_content}>
					{children}
				</div>
			</div>
		</main>
	);
};

export default Window;