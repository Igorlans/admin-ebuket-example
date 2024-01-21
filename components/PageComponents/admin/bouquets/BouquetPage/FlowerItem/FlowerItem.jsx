import classes from './flowerItem.module.scss'
import colors from '@/utils/colors.json';
const FlowerItem = ({flower}) => {

	return (
		<div
			className={classes.flowerItem}
		>
			{/* style={{borderColor: isSelected ? '#9DCA39' : '#D7D7E5' }} */}
				<div>
					{flower.store_flowers.flower.title_ua + ' ' + flower.store_flowers.variety}
				</div>
				<div>
					{flower.store_flowers.country}
				</div>
				<div>
					{flower.store_flowers.height + ' ' + "см"}
				</div>
				<div>
					<div style={{width: 40, height: 20, background: colors[flower.store_flowers.color], borderRadius: 5}}>
					</div>
				</div>
				<div>
					{flower.store_flowers.price + ' ' + "грн"}
				</div>
				<div>
					{flower.number + ' ' + "шт"}
				</div>
		</div>
	);
};

export default FlowerItem;