import React, { useState, useEffect } from 'react'
import graphGenerator from '../utilities/graphGenerator'
import HoursPerDay from '../components/HoursPerDay.js';
import HoursPerMonth from '../components/HoursPerMonth.js';
import QuaterlyGraph from '../components/QuaterlyGraph.js';
import { Container, Form, Card, Button } from 'react-bootstrap';
import { AiTwotoneEdit } from 'react-icons/ai';
import LoadingPage from '../components/Loading.jsx';

function StatisticalReport({ resultPresent, result }) {
    const [loading, setLoading] = useState(true);
    const [hoursPerDay, setHoursPerDay] = useState(null);
    const [hoursPerMonth, setHoursPerMonth] = useState(null);
    const [quaterly, setQuaterly] = useState(null);
    const [regionInfo, setRegionInfo] = useState(null)

    const [disableQuaterlyComment, setDisableQuaterlyComment] = useState(true)
    const [disableMonthComment, setDisableMonthComment] = useState(true)
    const [disableDayComment, setDisableDayComment] = useState(true)

    useEffect(() => {
        if (resultPresent) {
            // result = [{ imagePath: 'file:///home/others/Workspace/BaseProjectFolder/kalyan_000000/20120707_141149.jpg', label: 'clear' }]
            graphGenerator.evaluate(result);
            setHoursPerDay(graphGenerator.hoursPerDay());
            setHoursPerMonth(graphGenerator.hoursPerMonth());
            setQuaterly(graphGenerator.quaterly());
            setLoading(false);
        }
    }, [resultPresent, result]);

    useEffect(() => {
        setRegionInfo(window.api.getRegionInfo());
    }, [])

    const printToPdf = () => {
        window.api.print();
    };

    return (
        <>{
            loading || !regionInfo ?
                <LoadingPage />
                :
                <>
                    <Container>
                        <Card>
                            <Card.Body>
                                <Card.Title className="text-center">Solar Report</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted text-center">This report contains details of the region {regionInfo.village}, Pincode : {regionInfo.pincode}</Card.Subtitle>
                                <HoursPerDay labels={hoursPerDay.labels} data={hoursPerDay.data} />
                                <AiTwotoneEdit className='float-right m-1' size='1.5em' onClick={() => setDisableDayComment(!disableDayComment)} />
                                <Form.Control as="textarea" rows={5} disabled={disableDayComment} placeholder='Click on Edit Icon to Add Comments' />
                                <HoursPerMonth data={hoursPerMonth} />
                                <AiTwotoneEdit className='float-right m-1' size='1.5em' onClick={() => setDisableMonthComment(!disableMonthComment)} />
                                <Form.Control as="textarea" rows={5} disabled={disableMonthComment} placeholder='Click on Edit Icon to Add Comments' />
                                <QuaterlyGraph data={quaterly} />
                                <AiTwotoneEdit className='float-right m-1' size='1.5em' onClick={() => setDisableQuaterlyComment(!disableQuaterlyComment)} />
                                <Form.Control as="textarea" rows={5} disabled={disableQuaterlyComment} placeholder='Click on Edit Icon to Add Comments' />
                                <div className='d-flex justify-content-center'>
                                    <Button className="my-3" onClick={printToPdf}>Print</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Container>
                </>
        }
        </>
    )
}

export default StatisticalReport
