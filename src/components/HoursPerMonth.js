import { Bar } from 'react-chartjs-2';
import React from 'react';

function HoursPerMonth({ data }) {

    const state = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octomber', 'November', 'December'],
        datasets: [
            {
                label: 'Prediction of Solar Exposure Hours for Year',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: data
            }
        ]
    }
    return (
        <div className='w-75 mx-auto my-3 p-4'>
            <Bar
                data={state}
                options={{
                    responsive: true,
                    maintainAspectRatio: true,
                }}
            />
        </div>
    )
}
export default React.memo(HoursPerMonth)
