import { useEffect, useRef, useState } from "react";
import classes from "./daysSort.module.scss"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { ukUA } from '@mui/x-date-pickers/locales';
import 'dayjs/locale/uz-latn';
import { AiOutlineCalendar } from "react-icons/ai";
import  { Button } from "@mui/material";
import CalendarBtn from "@/components/UI/Button/Button";
import {useOnClickOutside} from "@/components/../hooks/useClickOutside"
import { useRouter } from "next/router";
import { Calendar } from "./Calendar/Calendar";

const DaysSort = () => {

    const router = useRouter()

    const [isActive, setIsActive] = useState(router.query.sort || 'week');
    const [dateCalendar, setDateCalendar] = useState('ss')
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    useOnClickOutside(ref, () => setIsOpen(false));

    const buttons = [
        { name: "Тиждень (Останні 7 днів)", index: 0, sort: 'week' },
        { name: "Місяць", index: 1, sort: 'month' },
    ];

    const handlerSorts = (e, index) => {
        // console.log(index)
        setIsActive(index)
        router.push({
            pathname: '/analytics',
            query: { sort: index },
        })
    }

    return ( 
        <div className={classes.wrapper}>
            <div className={classes.leftSide}>
                {buttons.map((button, index) => (
                    <CalendarBtn
                        key={index}
                        onClick={(e) => handlerSorts(e, button.sort)}
                        text={button.name}
                        variant={isActive === button.sort ? "contained" : "outlined"}
                        className={classes.Button}
                        style={isActive === button.sort ? { backgroundColor: "black", color: "white" } : {}}
                    />
                ))}
                <div className={classes.selectedDays}>
                    {isActive === 'date' && (
                        <CalendarBtn
                           text={`${router.query.from}-${router.query.to}`}
                           variant="outlined"
                           className={classes.Button}
                           style={{backgroundColor: "black", color: "white" }}
                        />
                    )}
                </div>

                
            </div>
            
            <div className={classes.rightSide}>
                <Button onClick={()=> {setIsOpen(!isOpen)}} variant="outlined" endIcon={<AiOutlineCalendar />} style={{color: '#000'}}>
                    Календар
                </Button>
                
                {
                    isOpen ? (
                        <div className={classes.calendarBox} ref={ref}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ukUA}>
                                <Calendar setIsActive={setIsActive} setDateCalendar={setDateCalendar}/>
                            </LocalizationProvider>
                        </div>
                    ):(null)
                }
            </div>
        </div>
     );
}
 
export default DaysSort;
