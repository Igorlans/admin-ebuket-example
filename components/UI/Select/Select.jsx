import React, {useEffect, useRef, useState} from 'react';
import { useFormContext } from "react-hook-form";
import styles from './select.module.scss';
import {MdExpandMore} from "react-icons/md";
import {useOnClickOutside} from "@/hooks/useClickOutside";
import {motion} from "framer-motion";
const Select = ({ name, options, value, label, defaultValue, onChange, callback, className }) => {
	const menuRef = useRef(null);
	const selectedRef = useRef(null)
	const [showMenu, setShowMenu] = useState(false)
	console.log('DEFAULT VALUE', defaultValue)
	console.log('DEFAULT OPTIONS', options)
	const defaultOption = options.find(op => op.value === defaultValue);
	const [selectedOption, setSelectedOption] = useState(defaultOption || options?.[0]);
	const {register, setValue} = useFormContext() || {};
	const controlled = Boolean(onChange);

	useEffect(() => {
		if (!controlled) {
			setValue(name, defaultValue || options?.[0]?.value);
			callback && callback()
		}
	},[])

	const isRegister = controlled ? undefined : {...register(name)};
	const handleOptionClick = (option) => {
		const selectedValue = option;
		setSelectedOption(selectedValue);
		setShowMenu(false);
		if (!controlled) {
			setValue(name, selectedValue.value);
			callback && callback()
		}
		if (onChange) {
			onChange(selectedValue);
			callback && callback()
		}
	};

	useOnClickOutside(menuRef, () => setShowMenu(false), selectedRef);


	return (
		<div className={[styles.dropdown_container, className].join(' ')}>
			<span className={styles.dropdown_label}>{label}</span>
			<div className={styles.dropdown}>
				<div
					ref={selectedRef}
					className={styles.dropdown_selected}
					onClick={() => setShowMenu(!showMenu)}
					{...isRegister}
				>
					{value || selectedOption?.label}
					<motion.span
						style={{width: 25, height: 25}}
						className={styles.dropdown_arrow}
						initial={'closed'}
						animate={showMenu ? 'collapsed' : 'closed'}
						exit="collapsed"
						variants={{
							closed: {transform: 'rotate(0deg)'},
							collapsed: {transform: 'rotate(-180deg)'}
						}}
						transition={{duration: 0.2}}
					>
						<MdExpandMore size={'25px'} color={'#9C9CAA'} style={{marginRight: '-5px'}}/>
					</motion.span>
				</div>
				{showMenu &&
					<motion.ul
						initial={'closed'}
						animate={showMenu ? 'collapsed' : 'closed'}
						exit="collapsed"
						variants={{
							closed: {height: 0, opacity: 0},
							collapsed: {height: 'auto', opacity: 1}
						}}
						transition={{duration: 0.1}}
						className={styles.dropdown_menu}
						ref={menuRef}
					>
						{options?.map(option => (
							<li
								onClick={() => handleOptionClick(option)}
								className={styles.dropdown_menu_item}
								key={option.value}
							>
								{option.label}
							</li>
						))}
					</motion.ul>
				}
			</div>
		</div>

	);
};

export default Select;