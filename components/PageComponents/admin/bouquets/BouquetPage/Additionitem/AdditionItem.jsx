import classes from './additionItem.module.scss'

const AdditionItem = ({addition}) => {

	return (
		<div
			className={classes.additionItem}
		>
			{/* style={{borderColor: isSelected ? '#9DCA39' : '#D7D7E5' }} */}
				<div style={{width: '70px', height: '70px', border: '1px solid #d3d3d3', borderRadius: '10px', overflow: 'hidden'}}>
					<img src={addition.store_addition.image.url} alt="" style={{width: '100%', height: '100%'}}/>
				</div>
				<div>
					{addition.store_addition.name}
				</div>
				<div>
					{addition.store_addition.type_addition}
				</div>

				<div>
					{addition.store_addition.price + ' ' + "грн"}
				</div>

		</div>
	);
};

export default AdditionItem;