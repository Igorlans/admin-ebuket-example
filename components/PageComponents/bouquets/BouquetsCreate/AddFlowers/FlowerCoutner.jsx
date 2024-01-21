import classes from './addFlowers.module.scss';
import {useFormContext} from "react-hook-form";
import {useEffect, useState} from "react";
import ControlledInput from "@/components/UI/Input/ControlledInput";
import Button from "@/components/UI/Button/Button";

const FlowerCoutner = ({flower}) => {
	const methods = useFormContext();
	const [value, setValue] = useState(flower?.number || 1);

	useEffect(() => {
		const newValue = methods.getValues('buket_flower')?.map(fl => fl.id === flower.id ? {...fl, number: value} : fl)
		methods.setValue('buket_flower', newValue)
	}, [value])

	const handleChange = (e) => {
		const newValue = e.target.value;
		if (newValue > 0 || newValue === '') {
			setValue(newValue)
		}
	}
	const handleCount = (action) => {
		if (action === '+') {
			setValue(prevState => Number(prevState) + 1);
		} else {
			if (value < 2) return;
			setValue(prevState => Number(prevState) - 1);
		}
	}

	return (
		<div className={classes.counter}>
			<Button onClick={() => handleCount('-')}>
				-
			</Button>
			<ControlledInput style={{width: 70}} type={'number'} value={value} onChange={handleChange} />
			<Button onClick={() => handleCount('+')}>
				+
			</Button>
		</div>
	);
};

export default FlowerCoutner;