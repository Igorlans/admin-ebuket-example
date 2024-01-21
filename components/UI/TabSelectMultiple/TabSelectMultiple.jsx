import classes from './tabSelectMultiple.module.scss';
import {useFormContext} from "react-hook-form";
import React, {useState} from "react";
import {IoMdClose} from 'react-icons/io'
const TabSelectMultiple = ({label, name, options}) => {
    const {watch, setValue, trigger, formState: {errors}, getValues} = useFormContext();
    // const watchName = watch(name);
    const [selectedValues, setSelectedValues] = useState(getValues(name) || []);
    const selectedTabs = options.reduce((acc, option) => {
        if (selectedValues.includes(option.value)) {
            return [...acc, option]
        }
        return acc;
    }, [])
    const getTabStyles = (option) => {
        if (selectedValues.includes(option.value)) {
            return [classes.tab, classes.tabActive].join(' ');
        } else {
            return [classes.tab].join(' ');
        }
    }
    const onSelect = (option) => {
        if (!selectedValues.includes(option.value)) {
            const newValue = [...selectedValues, option.value];
            setSelectedValues(newValue)
            name && setValue(name, newValue)
            name && trigger(name)
        }
    }
    const onClose = (option) => {
        const newValue = selectedValues.filter(tab => tab !== option.value);
        setSelectedValues(newValue)
        name && setValue(name, newValue)
        name && trigger(name)
    }

    return (
        <div className={classes.tabSelect}>
            <div className={classes.label}>{label}</div>
            {selectedTabs?.length
                ?
                <div className={classes.tabList}>
                    {selectedTabs.map(option =>
                        <div
                            className={classes.tab}
                            key={option.value}
                        >
                            <div className={classes.text}>
                                {option.label}
                            </div>
                            <div
                                className={classes.close}
                                onClick={() => onClose(option)}
                            >
                                <IoMdClose size={'20px'} />
                            </div>
                        </div>
                    )}
                </div>
                : null
            }
            <div className={classes.tabList}>
                {options.map(option =>
                    <div
                        onClick={() => onSelect(option)}
                        className={getTabStyles(option)}
                        key={option.value}
                    >
                        {option.label}
                    </div>
                )}
            </div>
            {(errors?.[name]) && <div className={classes.error_text}>{errors?.[name]?.message ?? ''}</div>}
        </div>
    );
};

export default TabSelectMultiple;