import classes from './addFlowers.module.scss'
import Button from "@/components/UI/Button/Button";
import colors from '@/utils/colors.json'
import {MdOutlineClose} from "react-icons/md";
import {TbCirclePlus} from "react-icons/tb";
import {useFormContext} from "react-hook-form";
const SelectFlowersItem = ({flower}) => {
	const methods = useFormContext()
	const isSelected = methods.watch('buket_flower')?.find(fl => fl.id === flower.id);

	const selectFlower = () => {
		methods.setValue('buket_flower', [...methods.getValues('buket_flower'), flower])
	}
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
			{
				isSelected
					?
					<Button onClick={deleteFlower}>
						<MdOutlineClose size={20} />
					</Button>
					:
					<Button onClick={selectFlower}>
						<TbCirclePlus size={20} />
					</Button>

			}

		</div>
	);
};

export default SelectFlowersItem;