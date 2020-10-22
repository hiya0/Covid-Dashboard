import React,{useState,useEffect} from 'react';
import {fetchDailyData} from '../../api/index';

import {Line,Bar} from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({data:{confirmed,recovered,deaths },country}) => {
    const [dailyData,setDailyData]= useState([]);

    useEffect(()=>{
        const fetchD= async()=>{
            const data=await fetchDailyData();
            setDailyData(data);
        }

        fetchD();
    },[]);

    const barChart=(
        confirmed?
        (
            <Bar
                data={{
                    labels: ['Infected','Recovered','Deaths'],
                    datasets:[{
                        label:'People',
                        backgroundColor:['rgba(1, 157, 247, 0.829)','rgba(52, 170, 6, 0.87)','rgba(252, 14, 14, 0.829)'],
                        data:[confirmed.value,recovered.value,deaths.value]
                    }]
                }}
                options={{
                    legend:{ display: false},
                    title:{ display:true,text: `Current state in ${country}`}
                }}
            />
        ): null
    );

    const lineChart=(
        dailyData[0] ?
        (<Line 
            data={{
            labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
            datasets: [
                {
                    data: dailyData.map((data) => data.confirmed),
                    label: 'Infected',
                    borderColor: '#019df7d3',
                    fill: true
                },
                {
                    data: dailyData.map((data) => data.recovered),
                    label: 'Recovered',
                    borderColor: 'green',
                    backgroundColor: 'rgba(0, 255, 0, 0.5)',
                    fill: true,
                  },
                {
                    data: dailyData.map((data) => data.deaths),
                    label: 'Deaths',
                    borderColor: '#fc0e0ed3',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill: true
                }
            ]
        }}/>):null
    );

    return(
        <div className={styles.container}>
            {country?barChart:lineChart}
        </div>
    );
    }


export default Chart;