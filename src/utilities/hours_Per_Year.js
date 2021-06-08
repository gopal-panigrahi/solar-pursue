// JavaScript source code
import { Bar } from 'react-chartjs-2';
// import './App.css';
//import { Bar } from 'react-chartjs-2';
import * as React from 'react';

const state = {
    labels: [2015, 2016, 2017, 2018, 2019, 2020],
    datasets: [
        {
            label: 'Prediction of Solar Exposure Hours for Year',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [565, 764, 767, 343, 234, 867]
        }
    ]
}

export default class HperYear extends React.Component {
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










