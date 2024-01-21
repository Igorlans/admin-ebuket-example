import classes from './decorItem.module.scss'

const DecorItem = ({decor}) => {

	return (
		<div
			className={classes.decorItem}
		>
			<div>
				{decor.decors.title}
			</div>
			<div>
				{decor.decors.characteristic}
			</div>
			<div>
				{decor.numbers} шт
			</div>
			<div>
				{decor.decors.price + ' ' + "грн"}
			</div>
		</div>
	);
};

export default DecorItem;