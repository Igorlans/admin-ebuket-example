import React, { useState } from 'react';
import {useFormContext} from "react-hook-form";

const RadioGroup = ({ options, name, onChange }) => {
	const [selectedValue, setSelectedValue] = useState('');
	const {register, formState: {errors}, setValue} = useFormContext();
	const handleChange = (event) => {
		setSelectedValue(event.target.value);
		setValue(name, event.target.value)
		onChange(event.target.value);
	};

	return (
		<>
			{options.map((option) => (
				<div key={option.value}>
					<input
						type="radio"
						checked={selectedValue === option.value}
						{...register(name)}
						onChange={handleChange}
					/>
					<label htmlFor={option.value}>{option.label}</label>
				</div>
			))}
		</>
	);
};

export default RadioGroup;