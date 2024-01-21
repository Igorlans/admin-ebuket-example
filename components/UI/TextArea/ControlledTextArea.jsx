import { useMemo } from 'react';
import classes from './textarea.module.scss';

const ControlledTextarea = ({value, onChange, className, label, maxLength, ...props}) => {
    const textAreaValue = useMemo(() => {
        return maxLength ? value?.slice(0, maxLength) : value
    }, [value])
	return (
		<div className={className} style={{position: "relative"}}>
			{label &&
				<span className={classes.label}>{label}</span>
			}
			<div className={classes.textarea_body}>
				<textarea
                    value={textAreaValue}
                    onChange={(e) => onChange(e)}
					className={classes.textarea}
					{...props}
				/>
                {maxLength &&
					<div className={classes.indicator}>
						<span>{textAreaValue.length}</span>
						<span>/</span>
						<span>{maxLength}</span>
					</div>
				}
			</div>
		</div>
	);
};

export default ControlledTextarea;