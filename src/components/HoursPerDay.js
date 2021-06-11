import { Line } from 'react-chartjs-2';
import React from 'react';

function HoursPerDay({ labels, data }) {
    const state = {
        labels: labels,
        datasets: [
            {
                label: 'Hours Per Day',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: data
            }
        ]
    }
    return (
        <div className='w-75 mx-auto my-3 p-4'>
            <Line
                data={state}
                options={{
                    responsive: true,
                    maintainAspectRatio: true,
                }}
            />
        </div>
    )
}

export default React.memo(HoursPerDay);
