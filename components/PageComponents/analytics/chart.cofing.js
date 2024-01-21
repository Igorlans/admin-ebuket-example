import { colorChannel } from "@mui/system"


export const CHART_STYLE = (color) => {
    return {
        fill: false,
        lineTension: 0.5,
        borderColor: color,
        borderWidth: 2,
        pointBackgroundColor: color,
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: color,
        pointHoverBorderColor: color,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
    }
}

export const X_COORDINATE = (type_sort, dates) => {

    if(type_sort == 'month'){
        return dates
    }else{
        return dates
    }
}