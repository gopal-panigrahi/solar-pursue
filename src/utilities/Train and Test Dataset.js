
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const state = {
    labels: ['Train_Images', 'Test_Dataset'],
    datasets: [
        {
            label: 'Train and Test Dataset',
            backgroundColor: [
                '#B21F00',
                '#C9DE00',

            ],
            hoverBackgroundColor: [
                '#501800',
                '#4B5000'
            ],
            data: [65, 59]
        }
    ]
}

class TrainAndTest extends React.Component {
    render() {
        return (
            <div>


                <Doughnut
                    data={state}
                    options={{
                        title: {
                            display: true,
                            text: 'Train and Test Dataset',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />
            </div>
        );
    }
} export default TrainAndTest;// JavaScript source code
