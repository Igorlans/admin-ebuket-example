import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { Component } from 'react';
import {RangePicker } from 'react-trip-date';
import {ThemeProvider} from 'styled-components';
// const  handleResponsive  =  setNumberOfMonth  =>  {
// 	let  width  =  document.querySelector('.tp-calendar').clientWidth;
// 	if  (width  >  900)  {
// 		setNumberOfMonth(3);
// 	}  else  if  (width  <  900  &&  width  >  580)  {
// 		setNumberOfMonth(2);
// 	}  else  if  (width  <  580)  {
// 		setNumberOfMonth(1);
// 	}
// };

const  Day = () => {
	return  (
		<>
			<p  className="date">{dayjs.format('DD')}</p>
			<p  className="date">7</p>
		</>
		);
	};
	
export const Calendar = ({setIsActive, setDateCalendar}) => {
    const router = useRouter()

    const calendarFrom = router.query.from || 'none'
    const calendarTo = router.query.to || 'none'
    const handleDateChange = (selectedDates) => {
        console.log(selectedDates);
        setIsActive('date')
        setDateCalendar(selectedDates)

        router.push({
            pathname: '/analytics',
            query: { 
                sort: 'date', 
                from: selectedDates.from, 
                to: selectedDates.to || 'none' 
            },
        })
        // тут можна зробити що-небудь із масивом вибраних дат
      };
      
      const theme = {
        primary: {
          light: "#fff",
          main: "#282D4B",
          dark: "#282D4B",
        },
        grey: {
          700: "#707070",
          900: "#1b1b1d",
        },
        background: {
          default: "#fff",
        },
        text: {
          disabled: "#BABABA",
        },
      };



    return (
      <ThemeProvider theme={theme}>
       <RangePicker
            onChange={(e) => handleDateChange(e)}
            theme={theme}
            jalali={false}
            numberOfMonths={2}
            numberOfSelectableDays={3}
            disabledBeforToday={true}
            disabled={false}
            dayComponent={Day}
            titleComponent={"test"}
        />
      </ThemeProvider>
    );
}

// export default Calendar