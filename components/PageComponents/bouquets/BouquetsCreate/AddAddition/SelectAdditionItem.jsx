import classes from './addAddition.module.scss';
import {useFormContext} from "react-hook-form";
import Button from "@/components/UI/Button/Button";
import {MdOutlineClose} from "react-icons/md";
import {TbCirclePlus} from "react-icons/tb";
import toast from "react-hot-toast";
const SelectAdditionItem = ({addition}) => {
	console.log(addition)
	const methods = useFormContext();
	const isSelected = methods.watch('buket_addition')?.find(addit => addit.id === addition.id);
	const itemTypeArray = methods.watch('buket_addition')?.filter(addit => addit.type_addition === addition.type_addition)
	const selectAddition = () => {
		if (itemTypeArray.length > 2) {
			return toast.error('Вибрано 3 із 3')
		}
		methods.setValue('buket_addition', [...methods.getValues('buket_addition'), addition])
	}
	const deleteAddition = () => {
		const newSelectedAdditions = methods.getValues('buket_addition')?.filter(addit => addit.id !== addition.id)
		methods.setValue('buket_addition', newSelectedAdditions)
	}
	return (
		<div className={classes.additionItem}>
			<div className={classes.additionItem_body}>
				<div className={classes.image}>
					<img src={addition?.image?.url} alt={addition.name} />
				</div>
				<div>{addition.name}</div>
				<div>{addition.type_addition}</div>
				<div>{addition.price + ' грн'}</div>
			</div>
			{
				isSelected
					?
					<Button onClick={deleteAddition}>
						<MdOutlineClose size={20} />
					</Button>
					:
					<Button onClick={selectAddition}>
						<TbCirclePlus size={20} />
					</Button>
			}
		</div>
	);
};

export default SelectAdditionItem;