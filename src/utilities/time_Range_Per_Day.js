import { Bar } from 'react-chartjs-2';
// import './App.css';
//import { Bar } from 'react-chartjs-2';
import * as React from 'react';

const state = {
    labels: ['1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', '9-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16', '16-17', '17-18', '18-19', '19-20', '21-22', '23-24'],
    datasets: [
        {
            label: 'Prediction of Solar Exposure Hours for Year',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [10, 11, 9, 8, 3, 14, 15, 20, 1, 2, 4, 5, 40, 30, 22, 28, 32, 35, 39, 10, 8, 9, 7],
        },

    ]
}

export default class TimeRangePerDay extends React.Component {
    render() {
        return (<div class="chart" >
            <Bar data={state}
                height={1500}
                width={400}
                options={{
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        text: 'Prediction Result',
                        fontsize: 20,
                    },

                    legend: {
                        display: true,
                        position: 'right'
                    }
                }
                } />
        </div>);
    }
}






// JavaScript source code
