import { Bar } from 'react-chartjs-2';
// import './App.css';
//import { Bar } from 'react-chartjs-2';
import * as React from 'react';

const state = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octomber', 'November', 'December'],
    datasets: [
        {
            label: 'Prediction of Solar Exposure Hours for Year',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [4, 11, 22, 11, 7, 1, 2, 8, 65, 6, 7, 5]
        }
    ]
}

export default class HperMonth extends React.Component {
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
