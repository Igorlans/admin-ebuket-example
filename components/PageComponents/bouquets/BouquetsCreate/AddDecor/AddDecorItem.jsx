import classes from "@/components/PageComponents/bouquets/BouquetsCreate/AddDecor/addDecor.module.scss";
import DecorCoutner from "@/components/PageComponents/bouquets/BouquetsCreate/AddDecor/DecorCounter";
import {IconButton} from "@mui/material";
import {MdDelete} from "react-icons/md";
import {useFormContext} from "react-hook-form";

const AddDecorItem = ({decor}) => {
	const methods = useFormContext()
	const deleteDecor = () => {
		const newSelectedDecors = methods.getValues('buket_decor')?.filter(dec => dec.id !== decor.id)
		methods.setValue('buket_decor', newSelectedDecors)
	}

	return (
		<div
			className={classes.selectDecorsItem}
			onClick={() => {
				// const filteredFlowers = selectedFlowers.filter(item => item.name !== flower.name)
				// setSelectedFlowers(filteredFlowers)
			}}
		>
			<div className={classes.selectDecors_body} style={{borderColor: '#9DCA39'}}>
				<div>
					{decor.title}
				</div>
				<div>
					{decor.characteristic}
				</div>
				<div>
					{decor.price + ' ' + "грн"}
				</div>
			</div>
			<div style={{display: 'flex', gap: 10}}>
				<DecorCoutner decor={decor} />
				<IconButton onClick={deleteDecor}>
					<MdDelete size={20} />
				</IconButton>
			</div>

		</div>
	);
};

export default AddDecorItem;