import React from 'react';
import { Pie } from 'react-chartjs-2';

function QuaterlyGraph({ data }) {
    const state = {
        labels: ['January-March', 'April-June', 'July-September',
            'October-December'],
        datasets: [
            {
                label: 'Rainfall',
                backgroundColor: [
                    '#B21F00',
                    '#C9DE00',
                    '#2FDE00',
                    '#00A6B4'
                ],
                hoverBackgroundColor: [
                    '#501800',
                    '#4B5000',
                    '#175000',
                    '#003350'
                ],
                data: data//[65, 59, 80, 81]
            }
        ]
    }
    return (
        <>
            <Pie
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

export default QuaterlyGraph
