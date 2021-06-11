import React from 'react';
import { Doughnut } from 'react-chartjs-2';

function QuaterlyGraph({ data }) {
    const state = {
        labels: ['January-March', 'April-June', 'July-September',
            'October-December'],
        datasets: [
            {
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                hoverBackgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1
            }
        ]
    }
    return (
        <div className='w-50 mx-auto my-3 p-4'>
            <Doughnut
                data={state}
                options={{
                    responsive: true,
                    maintainAspectRatio: true,
                }}
            />
        </div>
    )
}

export default React.memo(QuaterlyGraph);
