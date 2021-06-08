import { Bar } from 'react-chartjs-2';
// import './App.css';
//import { Bar } from 'react-chartjs-2';
import * as React from 'react';

const state = {
    labels: ['sunday', 'monday', 'tueasday', 'wednesday', 'thursday', 'friday', 'saturday'],
    datasets: [
        {
            label: 'Prediction of Solar Exposure Hours for Year',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [4, 5, 6, 7, 5, 6, 7]
        },
        {
            data: [589, 445, 483, 503, 689, 692, 634],
            backgroundColor: "blue"
        },
        {
            data: [209, 245, 383, 403, 589, 692, 580],
            backgroundColor: "red"
        },
    ]
}

export default class HperDay extends React.Component {
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