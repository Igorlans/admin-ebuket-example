import { Chart as ChartJS, registerables } from 'chart.js';
import classes from "./analytics.module.scss"
import { Line } from 'react-chartjs-2'
import AnalyticsTable from './analyticsTable/AnalyticsTable';
import TopBar from './topBar/TopBar';
import { Button, FormControl, FormControlLabel, FormGroup } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import Checkbox from "@/components/UI/Checkbox/Checkbox"
import { CHART_STYLE, X_COORDINATE } from "@/components/PageComponents/analytics/chart.cofing";
import { useRouter } from 'next/router';
import { LAST_DATA, sumAnalDate } from '@/utils/formatingAnalytic';

ChartJS.register(...registerables);

const colors = ['#5051F9', '#1EA7FF', '#FADC3C', '#9DCA39'];


const optionChart = (data, lable, color) => {
  return {
    label: lable,
    
    data: [...data],
    
    ...CHART_STYLE(color),
    background: (context) => {
      const { chart } = context;
      const { ctx, chartArea } = chart;
      if (!chartArea) {
        return null;
      }
      const gradient = ctx.createLinearGradient(
        chartArea.left,
        chartArea.bottom,
        chartArea.left,
        chartArea.top
      );
      gradient.addColorStop(0, 'rgba(80, 81, 249, 0.2)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      return gradient;
    },
  }
}

const options = {
  plugins: {
    legend: {
      fullSize: true,
      display: false,
      labels: {
        color: '#5051F9',
      },
    },
  },
  scales: {},
  responsive: true, // Set responsive to true
  maintainAspectRatio: false, // Set maintainAspectRatio to false
};


const Analytics = ({analyticData, lastData}) => {
  console.log(analyticData)
  const router = useRouter()
  const DATE_ARR_CHARTS = lastData
  const chartData = sumAnalDate(DATE_ARR_CHARTS, analyticData)

  console.log(chartData.map((item) => item.clicks))

  const data = {
    labels: [...X_COORDINATE(router.query.sort, DATE_ARR_CHARTS)],
    datasets: [
      optionChart(chartData.map((item) => item.clicks), 'Кліки', '#5051F9'),
      optionChart(chartData.map((item) => item.views), 'Переглядів', '#1EA7FF'),
      optionChart(chartData.map((item) => item.orders), 'Замовлень', '#FADC3C'),
      optionChart(chartData.map((item) => item.ctr), 'CTR', '#9DCA39'),
    ],
  };
  
  const [displayedDatasets, setDisplayedDatasets] = useState(
    Object.fromEntries(data.datasets.map((dataset) => [dataset.label, true]))
  );

  const filteredData = useMemo(
    () => ({
      ...data,
      datasets: data.datasets.filter(
        (dataset) => displayedDatasets[dataset.label]
      ),
    }),
    [data, displayedDatasets]
  );
  // const PreviewColor = useMemo(() => {
  //   switch(data.datasets.label) {
  //     case 'Покази': return "#5051F9"
  //     case 'Перегляди': return "#1EA7FF"
  //     case 'Замовлення': return "#FADC3C"
  //     case 'CTR': return "#9DCA39"
  //     default: return "#5051F9"
  //   }
  // }, [])
  

  return (
    <div className={classes.wrapper}>
      <TopBar data={analyticData}/>
      <div style={{height: 400}}>
        <Line options={options} data={filteredData}/>
      </div>
      <FormGroup>
        {/* <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setDisplayedDatasets((prevDisplayedDatasets) =>
              Object.fromEntries(
                Object.keys(prevDisplayedDatasets).map((key) => [key, false])
              )
            );
          }}
        >
          Deselect all
        </Button> */}
        <div className={classes.dataSets}>
          {data.datasets.map((dataset) => (
            <div className={classes.dataSetCheckbox}>
              <Checkbox
                checked={displayedDatasets[dataset.label]}
                onChange={() =>
                  setDisplayedDatasets((prevDisplayedDatasets) => ({
                    ...prevDisplayedDatasets,
                    [dataset.label]: !prevDisplayedDatasets[dataset.label],
                  }))
                }
                label={dataset.label}
                color="primary"
              />
              <div className={classes.dataSetColorPreview} style={{backgroundColor: dataset.borderColor}}>
                
              </div>
          </div>
          ))}
        </div>

      </FormGroup>
      <AnalyticsTable data={analyticData} />
    </div>
  );
};



export default Analytics;
