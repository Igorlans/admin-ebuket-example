import classes from './colorSelect.module.scss';
import {useFormContext} from "react-hook-form";
import colors from '@/utils/colors.json';
const ColorSelect = ({name, colorOptions, label}) => {
    const {watch, register, setValue, formState: {errors}, trigger} = useFormContext();
    const handleClick = (color) => {
        setValue(name, color)
    }
    const getItemStyles = (value) => {
        if (watch(name) === value) {
            return [classes.colorItem, classes.colorItemActive].join(' ');
        } else {
            return [classes.colorItem].join(' ');
        }
    }
    return (
        <div className={classes.colorSelect}>
            <input style={{ opacity: 0, pointerEvents: "none", height: 0, width: 0, margin: 0, padding: 0, border: 0}} {...register(name)}/>
            <div className={classes.label}>{label}</div>
            <div className={classes.colorList} >
                {colorOptions.map(color =>
                    <div
                        className={getItemStyles(color)}
                        onClick={() => {
                            handleClick(color)
                            trigger('color')
                        }}
                        key={color} style={{background: colors[color]}}
                    ></div>
                )}
            </div>
            {!!errors?.[name] &&
                <div className={classes.error_text}>{errors?.[name]?.message ?? ''}</div>
            }
            {/*<div key={color} style={{backgroundColor: color}}></div>*/}
        </div>
    );
};

export default ColorSelect;