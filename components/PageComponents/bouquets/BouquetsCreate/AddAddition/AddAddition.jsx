import {useFormContext} from "react-hook-form";
import classes from './addAddition.module.scss'
import Modal from "@/components/UI/Modal/Modal";
import Button from "@/components/UI/Button/Button";
import {useMemo, useState} from "react";
import SelectAdditionItem from "@/components/PageComponents/bouquets/BouquetsCreate/AddAddition/SelectAdditionItem";

const AddAddition = ({additions}) => {
	const methods = useFormContext()
	const [isModalVisible, setIsModalVisible] = useState();
	const selectedAddition = methods.watch('buket_addition');
	const selectedPostCards = selectedAddition.filter(addition => addition.type_addition === 'Листівка')
	const selectedToys = selectedAddition.filter(addition => addition.type_addition === 'Іграшка')
	const selectedSweets = selectedAddition.filter(addition => addition.type_addition === 'Солодощі')

	const filteredAdditons = useMemo(() => {
		const excludedIds = selectedAddition.map(item => item.id);
		return additions.filter(item => !excludedIds.includes(item.id));
	}, [additions, selectedAddition])

	return (
		<div className={classes.addAddition}>
			<Modal
				style={{width: 'clamp(50%, 700px, 90%)'}}
				title={'Оберіть доповнення'}
				isVisible={isModalVisible}
				handleClose={() => setIsModalVisible(false)}
			>
				<div>
					{selectedPostCards.length
						?
						<div>
							<h3>Листівки {`(${selectedPostCards.length} із 3)`}</h3>
							<div className={classes.selectAdditonList}>
								{selectedPostCards.map(postcard =>
									<SelectAdditionItem addition={postcard} />
								)}
							</div>
						</div>
						: null
					}
					{selectedToys.length
						?
						<div>
							<h3>Іграшки {`(${selectedToys.length} із 3)`}</h3>
							<div className={classes.selectAdditonList}>
								{selectedToys.map(toy =>
									<SelectAdditionItem addition={toy} />
								)}
							</div>
						</div>
						: null
					}
					{selectedSweets.length
						?
						<div>
							<h3>Солодощі {`(${selectedSweets.length} із 3)`}</h3>
							<div className={classes.selectAdditonList}>
								{selectedSweets.map(sweet =>
									<SelectAdditionItem addition={sweet} />
								)}
							</div>
						</div>
						: null
					}
					{filteredAdditons.length
						?
						<div>
							<h3>Всі доповнення</h3>
							<div className={classes.selectAdditonList}>
								{filteredAdditons.map(addit =>
									<SelectAdditionItem addition={addit} />
								)}
							</div>
						</div>
						: null
					}

				</div>

			</Modal>
			<div>
				<div className={classes.header}>
					<div className={classes.title}>Доповнення</div>
					<div style={{justifySelf: 'start'}}>
						<Button
							onClick={() => setIsModalVisible(true)}
						>
							Додати
						</Button>
					</div>
				</div>
				<div className={classes.selectedFlowers}>
					{selectedPostCards.length
						?
						<div>
							<h3>Листівки {`(${selectedPostCards.length} із 3)`}</h3>
							<div className={classes.selectAdditonList}>
								{selectedPostCards.map(postcard =>
									<SelectAdditionItem addition={postcard} />
								)}
							</div>
						</div>
						: null
					}
					{selectedToys.length
						?
						<div>
							<h3>Іграшки {`(${selectedToys.length} із 3)`}</h3>
							<div className={classes.selectAdditonList}>
								{selectedToys.map(toy =>
									<SelectAdditionItem addition={toy} />
								)}
							</div>
						</div>
						: null
					}
					{selectedSweets.length
						?
						<div>
							<h3>Солодощі {`(${selectedSweets.length} із 3)`}</h3>
							<div className={classes.selectAdditonList}>
								{selectedSweets.map(sweet =>
									<SelectAdditionItem addition={sweet} />
								)}
							</div>
						</div>
						: null
					}
				</div>
			</div>
		</div>
	);
};

export default AddAddition;