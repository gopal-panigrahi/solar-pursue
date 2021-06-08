import { Bar } from 'react-chartjs-2';
import React from 'react';

function YearlyClearUnclearGraph({ data }) {
    const state = {
        labels: ['clear', 'unclear'],
        datasets: [
            {
                label: 'classificaton',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: data//[65, 59]
            }
        ]
    };

    return (
        <div>
            <Bar data={state}
                height={30}
                width={20}
                options={{
                    maintainAspectRatio: true,
                    title: {
                        display: true,
                        text: 'classification result',
                        fontsize: 20,
                    },

                    legend: {
                        display: true,
                        position: 'right'
                    }
                }
                } />
        </div>
    )
}

export default YearlyClearUnclearGraph;

