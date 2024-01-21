import {useFormContext} from "react-hook-form";
import React, {useMemo, useState} from "react";
import Input from "@/components/UI/Input/Input";
import classes from "./flowersAutocomplete.module.scss";
import {motion} from "framer-motion";

const FlowersAutocomplete = ({flowers, label, placeholder}) => {
	const [suggestions, setSuggestions] = useState(flowers);
	const {control, formState: {errors}, setValue, watch, trigger, register} = useFormContext();
	const inputValue = watch('name') || '';
	const searchedSuggestions = useMemo(() => {
		const results = suggestions?.filter(suggestion => {
			if (inputValue === suggestion.title_ua) {
				return null
			}
			return suggestion.title_ua.toLowerCase().includes(inputValue.toLowerCase()) ||
				   suggestion.title_ru.toLowerCase().includes(inputValue.toLowerCase())
		})
		return results?.slice(0, 9);
	}, [suggestions, inputValue]);
	console.log(searchedSuggestions?.length)


	const onAutocompleteChange = (event) => {
		const value = event.target.value;
		setValue('flowerId', value.id)
		// You can do something with the selected value here
	};

	const onAutocompleteInput = (value) => {
		setValue('flowerId', '')
		// const results = fetchSuggestions(value);
		// setSuggestions(results);
	};

	const renderAutocompleteSuggestion = (suggestion) => (
		<div>{suggestion.title_ua}</div>
	);

	return (
			<div>
					<input style={{ opacity: 0, pointerEvents: "none", height: 0, width: 0, margin: 0, padding: 0, border: 0}} {...register('id_flower')} />
					<Input
						placeholder={placeholder}
						label={label}
						variant={'outlined'}
						name={'name'}
						onChange={(value) => {
							onAutocompleteInput(value);
							trigger('flowerId')
						}}
					/>
					{searchedSuggestions?.length > 0 && (
						<motion.ul
							initial={'closed'}
							animate={searchedSuggestions?.length > 0 ? 'collapsed' : 'closed'}
							exit="collapsed"
							variants={{
								closed: {height: 0, opacity: 0},
								collapsed: {height: 'auto', opacity: 1}
							}}
							transition={{duration: 0.1}}
							className={classes.dropdown_menu}
						>
							{searchedSuggestions?.map((suggestion, index) => (
								<li className={classes.dropdown_menu_item} key={index} onClick={(e) => {
									setValue('flowerId', suggestion.id)
									setValue('name', suggestion.title_ua)
									searchedSuggestions.slice(0, 0)
									trigger('flowerId')
								}}>
									{renderAutocompleteSuggestion(suggestion)}
								</li>
							))}
						</motion.ul>
					)}
					{errors?.flowerId && <div className={classes.error_text}>{errors?.flowerId?.message ?? ''}</div>}
			</div>
	)
};

export default FlowersAutocomplete;
