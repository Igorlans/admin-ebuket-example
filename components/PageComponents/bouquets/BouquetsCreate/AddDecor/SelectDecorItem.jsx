import {useFormContext} from "react-hook-form";
import Button from "@/components/UI/Button/Button";
import classes from './addDecor.module.scss';
import {MdOutlineClose} from "react-icons/md";
import {TbCirclePlus} from "react-icons/tb";

const SelectDecorItem = ({decor}) => {

	const methods = useFormContext()
	const isSelected = methods.watch('buket_decor')?.find(dec => dec.id === decor.id);

	const selectDecor = () => {
		methods.setValue('buket_decor', [...methods.getValues('buket_decor'), decor])
	}
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
			<div className={classes.selectDecors_body} style={{borderColor: isSelected ? '#9DCA39' : '#D7D7E5' }}>
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
			{
				isSelected
					?
					<Button onClick={deleteDecor}>
						<MdOutlineClose size={20} />
					</Button>
					:
					<Button onClick={selectDecor}>
						<TbCirclePlus size={20} />
					</Button>

			}

		</div>
	);
};

export default SelectDecorItem;