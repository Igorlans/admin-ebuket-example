import classes from './tabSelect.module.scss';
import Input from "@/components/UI/Input/Input";
import {useFormContext} from "react-hook-form";
const TabSelect = ({label, name, withInput = false, inputStyles, postLabel, placeholder, type, options}) => {
    const {watch, setValue, trigger, formState: {errors}} = useFormContext();
    const watchName = watch(name);
    const getTabStyles = (option) => {
        if (watchName === option.value) {
            return [classes.tab, classes.tabActive].join(' ');
        } else {
            return [classes.tab].join(' ');
        }
    }
    return (
        <div className={classes.tabSelect}>
            <div className={classes.label}>{label}</div>
            <div className={classes.tabList}>
                {options.map(option =>
                    <div
                        onClick={() => {
                            setValue(name, option.value)
                            trigger(name)
                        }}
                        className={getTabStyles(option)}
                        key={option.value}
                    >
                        {option.label}
                    </div>
                )}
            </div>
            {withInput &&
                <Input
                    variant={'outlined'}
                    name={name}
                    type={type}
                    style={inputStyles}
                    postLabel={postLabel}
                    placeholder={placeholder}
                />
            }
            {(errors?.[name] && !withInput) && <div className={classes.error_text}>{errors?.[name]?.message ?? ''}</div>}
        </div>
    );
};

export default TabSelect;