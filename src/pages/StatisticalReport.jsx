import React, { useState } from 'react'
import graphGenerator from '../utilities/day_time'
import HoursPerDay from '../components/HoursPerDay';
import HoursPerMonth from '../components/HoursPerMonth';
import QuaterlyGraph from '../components/QuaterlyGraph';


function StatisticalReport({ result }) {
    const [loading, setLoading] = useState(true);
    graphGenerator.evaluate(result);
    const hoursPerDay = graphGenerator.hoursPerDay();
    const hoursPerMonth = graphGenerator.hoursPerMonth();
    const quaterly = graphGenerator.quaterly();
    return (
        <>{
            loading ?
                <h1>Loading</h1>
                :
                <>
                    <HoursPerDay labels={hoursPerDay.labels} data={hoursPerDay.data} />
                    <HoursPerMonth data={hoursPerMonth} />
                    <QuaterlyGraph data={quaterly} />
                </>
        }
        </>
    )
}

export default StatisticalReport
