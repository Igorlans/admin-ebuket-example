import {useFormContext} from "react-hook-form";
import classes from './addFlowers.module.scss'
import {useMemo, useState} from "react";
import Modal from "@/components/UI/Modal/Modal";
import Button from "@/components/UI/Button/Button";
import SelectFlowersItem from "@/components/PageComponents/bouquets/BouquetsCreate/AddFlowers/SelectFlowersItem";
import AddFlowersItem from "@/components/PageComponents/bouquets/BouquetsCreate/AddFlowers/AddFlowersItem";

const AddFlowers = ({flowers}) => {
	const methods = useFormContext()
	const selectedFlowers = methods.watch('buket_flower')
	console.log(selectedFlowers)
	const [isModalVisible, setIsModalVisible] = useState(false)
	console.log(flowers)

	const sortedFlowers = useMemo(() => {
			return flowers.sort((a, b) => {
				const isSelected = selectedFlowers.find(fl => fl.id === a.id);
				if (isSelected) {
					return -1;
				} else if (!isSelected) {
					return 1;
				} else {
					return 0;
				}
			});
	}, [selectedFlowers, flowers])

	return (
		<div className={classes.addFlowers}>
			<Modal
				style={{width: 'clamp(50%, 700px, 90%)'}}
				title={'Оберіть квіти'}
				isVisible={isModalVisible}
				handleClose={() => setIsModalVisible(false)}
			>
				<div className={classes.selectFlowers}>
					<div className={classes.selectFlowersHeader}>
						<div>
							Ім'я
						</div>
						<div>
							Країна
						</div>
						<div>
							Висота
						</div>
						<div>
							Колір
						</div>
						<div>
							Ціна
						</div>
					</div>
					{sortedFlowers?.map(flower =>
						<SelectFlowersItem key={flower.id} flower={flower} />
					)}

				</div>
				{/*<div>*/}
				{/*	<div>Квіти</div>*/}
				{/*	{filteredFlowers?.map(flower =>*/}
				{/*		<div*/}
				{/*			onClick={() => {*/}
				{/*				setSelectedFlowers([...selectedFlowers, flower])*/}
				{/*			}}*/}
				{/*		>*/}
				{/*			{flower.name}*/}
				{/*		</div>*/}
				{/*	)}*/}
				{/*</div>*/}
			</Modal>
			<div>
				<div className={classes.header}>
					<div className={classes.title}>Квіти</div>
					<div style={{justifySelf: 'start'}}>
						<Button
							onClick={() => setIsModalVisible(true)}
						>
							Додати
						</Button>
					</div>
				</div>
				<div className={classes.selectedFlowers}>
					{selectedFlowers?.map(flower =>
						<AddFlowersItem key={flower.id} flower={flower} />
					)}
				</div>

			</div>
		</div>
	);
};

export default AddFlowers;