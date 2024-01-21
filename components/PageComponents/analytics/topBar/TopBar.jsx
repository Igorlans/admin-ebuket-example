import DaysSort from "./daysSort/DaysSort";
import Indicators from "./indicators/Indicators";
import classes from "./topBar.module.scss"

const TopBar = ({data}) => {
    return ( 
        <div className={classes.wrapper}>
            <DaysSort/>
            <Indicators data={data}/>
        </div>
     );
}
 
export default TopBar;