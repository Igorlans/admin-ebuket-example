import classes from "@/components/PageComponents/bouquets/BouquetsCreate/AddFlowers/addFlowers.module.scss";
import colors from "@/utils/colors.json";
import Button from "@/components/UI/Button/Button";
import {useFormContext} from "react-hook-form";
import {MdDelete} from "react-icons/md";
import {TbCirclePlus} from "react-icons/tb";
import FlowerCoutner from "@/components/PageComponents/bouquets/BouquetsCreate/AddFlowers/FlowerCoutner";
import {IconButton} from "@mui/material";

const AddFlowersItem = ({flower, setSelectedFlowers}) => {
	const methods = useFormContext()
	const isSelected = methods.watch('buket_flower')?.find(fl => fl.id === flower.id);
	const deleteFlower = () => {
		const newSelectedFlowers = methods.getValues('buket_flower')?.filter(fl => fl.id !== flower.id)
		methods.setValue('buket_flower', newSelectedFlowers)
	}

	return (
		<div
			className={classes.selectFlowersItem}
			onClick={() => {
				// const filteredFlowers = selectedFlowers.filter(item => item.name !== flower.name)
				// setSelectedFlowers(filteredFlowers)
			}}
		>
			<div className={classes.selectFlowers_body} style={{borderColor: isSelected ? '#9DCA39' : '#D7D7E5' }}>
				<div>
					{flower.flower.title_ua + ' ' + flower.variety}
				</div>
				<div>
					{flower.country}
				</div>
				<div>
					{flower.height + ' ' + "см"}
				</div>
				<div>
					<div style={{width: 40, height: 20, background: colors[flower.color], borderRadius: 5}}>
					</div>
				</div>
				<div>
					{flower.price + ' ' + "грн"}
				</div>
			</div>
			<div style={{display: 'flex', gap: 10}}>
				<FlowerCoutner flower={flower} />
				<IconButton onClick={deleteFlower}>
					<MdDelete size={20} />
				</IconButton>
			</div>
		</div>
	)
};

export default AddFlowersItem;