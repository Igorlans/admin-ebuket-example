import {useFormContext} from "react-hook-form";
import classes from './addDecor.module.scss'
import {useMemo, useState} from "react";
import Modal from "@/components/UI/Modal/Modal";
import Button from "@/components/UI/Button/Button";
import SelectDecorItem from "@/components/PageComponents/bouquets/BouquetsCreate/AddDecor/SelectDecorItem";
import AddDecorItem from "@/components/PageComponents/bouquets/BouquetsCreate/AddDecor/AddDecorItem";

const AddDecor = ({decors}) => {
	const methods = useFormContext()
	const selectedDecors = methods.watch('buket_decor')
	console.log("DECORS", decors)
	const [isModalVisible, setIsModalVisible] = useState(false)

	const sortedDecors = useMemo(() => {
		return decors.sort((a, b) => {
			const isSelected = selectedDecors.find(decor => decor.id === a.id);
			if (isSelected) {
				return -1;
			} else if (!isSelected) {
				return 1;
			} else {
				return 0;
			}
		});
	}, [selectedDecors, decors])

	return (
		<div className={classes.addDecor}>
			<Modal
				style={{width: 'clamp(50%, 700px, 90%)'}}
				title={'Оберіть оформлення'}
				isVisible={isModalVisible}
				handleClose={() => setIsModalVisible(false)}
			>
				<div className={classes.selectDecors}>
					{sortedDecors?.map(decor =>
						<SelectDecorItem decor={decor} />
					)}
				</div>
			</Modal>
			<div>
				<div className={classes.header}>
					<div className={classes.title}>Оформлення</div>
					<div style={{justifySelf: 'start'}}>
						<Button
							onClick={() => setIsModalVisible(true)}
						>
							Додати
						</Button>
					</div>
				</div>
				<div className={classes.selectedDecors}>
					{selectedDecors?.map(decor =>
						<AddDecorItem decor={decor} />
					)}
				</div>

			</div>
		</div>
	);
};

export default AddDecor;