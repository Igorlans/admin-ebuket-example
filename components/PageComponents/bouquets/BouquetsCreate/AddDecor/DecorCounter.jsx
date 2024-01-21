import classes from './addDecor.module.scss';
import {useFormContext} from "react-hook-form";
import {useEffect, useState} from "react";
import ControlledInput from "@/components/UI/Input/ControlledInput";
import Button from "@/components/UI/Button/Button";

const DecorCoutner = ({decor}) => {
	const methods = useFormContext();
	const [value, setValue] = useState(decor?.number || 1);

	useEffect(() => {
		const newValue = methods.getValues('buket_decor')?.map(fl => fl.id === decor.id ? {...fl, number: value} : fl)
		methods.setValue('buket_decor', newValue)
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

export default DecorCoutner;