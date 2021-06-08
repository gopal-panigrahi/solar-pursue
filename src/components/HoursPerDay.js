import { Line } from 'react-chartjs-2';
import React from 'react';

function HoursPerDay({ labels, data }) {
    const state = {
        labels: labels,//['31/02', '31/01', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Hours Per Day',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: data//[65, 59, 80, 81, 56]
            }
        ]
    }
    return (
        <>
            <Line
                data={state}
                options={{
                    title: {
                        display: true,
                        text: 'Average Rainfall per month',
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
            />
        </>
    )
}

export default HoursPerDay;


// const state = {
//     labels: ['sunday', 'monday', 'tueasday', 'wednesday', 'thursday', 'friday', 'saturday'],
//     datasets: [
//         {
//             label: 'Prediction of Solar Exposure Hours for Year',
//             backgroundColor: 'rgba(75,192,192,1)',
//             borderColor: 'rgba(0,0,0,1)',
//             borderWidth: 2,
//             data: [4, 5, 6, 7, 5, 6, 7]
//         },
//         {
//             data: [589, 445, 483, 503, 689, 692, 634],
//             backgroundColor: "blue"
//         },
//         {
//             data: [209, 245, 383, 403, 589, 692, 580],
//             backgroundColor: "red"
//         },
//     ]
// }

// export default class HoursPerDay extends React.Component {
//     render() {
//         return (<div class="chart" >
//             <Bar data={state}
//                 height={1500}
//                 width={400}
//                 options={{
//                     maintainAspectRatio: false,
//                     title: {
//                         display: true,
//                         text: 'Prediction Result',
//                         fontsize: 20,
//                     },

//                     legend: {
//                         display: true,
//                         position: 'right'
//                     }
//                 }
//                 } />
//         </div>);
//     }
// }