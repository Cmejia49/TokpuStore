import React from 'react'
import {Spinner} from 'react-bootstrap'
import { BarChart } from '../../../components/Chart/BarChart';
import LineChart from '../../../components/Chart/LineChart';
import styles from './style.module.css';
import { useSelector } from 'react-redux';
import { selectBarChartData,selectLineChartData,selectSummaryData } from '../../../store/dashboard-slice';

export const lineOption = {
    responsive: true,
    maintainAspectRatio:true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'General Report',
      },
    },
  };

  export const barOptions = {
    responsive: true,
    maintainAspectRatio:true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'General Report',
      },
    },
  };
  
const DashboardBody= ({summaryStatus, chartStatus})=>{
    const lineChart = useSelector(selectLineChartData);
    const barChart = useSelector(selectBarChartData);
    const summaryData = useSelector(selectSummaryData);
    return(
        <div className='d-flex flex-column items-align-center mb-5 mt-5'>
            {summaryStatus === "succeeded" ? (
                <div className={styles.font + " d-flex justify-content-around"}>
                    <div className={styles.boxShadow + " p-2 text-center"}>
                        <div className=''>
                            Total Cost
                        </div>
                        <div className='mt-2'>
                            {summaryData.totalCost}
                        </div>
                    </div>
                    <div className={styles.boxShadow + " p-2 text-center"}>
                        <div className=''>
                            Total Expenses
                        </div>
                        <div className='mt-2'>
                            {summaryData.totalExpenses}
                        </div>
                    </div>
                    <div className={styles.boxShadow + " p-2 text-center"}>
                        <div className=''>
                            Total Sale
                        </div>
                        <div className='mt-2'>
                            {summaryData.totalSale}
                        </div>
                    </div>
                    <div className={styles.boxShadow + " p-2 text-center"}>
                        <div className=''>
                            Total Damage
                        </div>
                        <div className='mt-2'>
                            {summaryData.totalDamage}
                        </div>
                    </div>
                    <div className={styles.boxShadow + " p-2 text-center"}>
                        <div className=''>
                            Total Profit
                        </div>
                        <div className='mt-2'>
                            {summaryData.totalProfit}
                        </div>
                    </div>
                    <div className={styles.boxShadow + " p-2 text-center"}>
                        <div className=''>
                            Net Income
                        </div>
                        <div className='mt-2'>
                            {summaryData.netIncome}
                        </div>
                    </div>
                    <div className={styles.boxShadow + " p-2 text-center"}>
                        <div className=''>
                            Number of sale
                        </div>
                        <div className='mt-2'>
                        {summaryData.numOfTransac}
                        </div>
                    </div>
                </div>
            ):(
            <div>
                <Spinner
                    as="span"
                    animation="border"
                    size="xl"
                    role="status"
                    aria-hidden="true"/>
            </div>)}
             <div className="d-flex justify-content-between mt-5">
             {chartStatus === 'succeeded' ? (
                <>
             <div className={styles.boxShadow + " " +styles.chartContainer}>
                <div>
                    <LineChart options={lineOption} data={lineChart}/>
                </div>
            </div>
            <div className={styles.boxShadow + " " +styles.chartContainer}>
                <div>
                    <BarChart options={barOptions} data={barChart}/>
                </div>
            </div>
            </>
             ):(
                <div>
                    <Spinner
                        as="span"
                        animation="border"
                        size="xl"
                        role="status"
                        aria-hidden="true"/>
                </div>)}
             </div>
            
        </div>
    )
}

export default DashboardBody;