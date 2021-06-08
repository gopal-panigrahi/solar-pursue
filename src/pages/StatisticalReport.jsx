import React, { useState, useEffect } from 'react'
import graphGenerator from '../utilities/day_time'
import HoursPerDay from '../components/HoursPerDay';
import HoursPerMonth from '../components/HoursPerMonth';
import QuaterlyGraph from '../components/QuaterlyGraph';


function StatisticalReport({ resultPresent, result }) {
    const [loading, setLoading] = useState(true);
    const [hoursPerDay, setHoursPerDay] = useState(null);
    const [hoursPerMonth, setHoursPerMonth] = useState(null);
    const [quaterly, setQuaterly] = useState(null);


    useEffect(() => {
        if (resultPresent) {
            graphGenerator.evaluate(result);
            setHoursPerDay(graphGenerator.hoursPerDay());
            setHoursPerMonth(graphGenerator.hoursPerMonth());
            setQuaterly(graphGenerator.quaterly());
            setLoading(false);
        }
    }, [resultPresent, result])

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
