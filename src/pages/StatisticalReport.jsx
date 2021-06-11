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
        // if (resultPresent) {
        result = [{ imagePath: 'file:///home/others/Workspace/BaseProjectFolder/kalyan_000000/20120707_141149.jpg', label: 'clear' }]
        graphGenerator.evaluate(result);
        setHoursPerDay(graphGenerator.hoursPerDay());
        setHoursPerMonth(graphGenerator.hoursPerMonth());
        setQuaterly(graphGenerator.quaterly());
        setLoading(false);
        // }
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
                        <Card className="m-4">
                            <Card.Header className="text-center h1" style={{ fontFamily: 'Times New Roman' }}>Solar Report</Card.Header>
                            <Card.Body>
                                <Card.Subtitle className="mb-2 text-muted text-center">This report contains details of the region {regionInfo.village}, Pincode : {regionInfo.pincode}</Card.Subtitle>
                                <HoursPerDay labels={hoursPerDay.labels} data={hoursPerDay.data} />
                                <div className="mx-auto w-75">
                                    <div className="bg-light p-1 rounded shadow-box" onClick={() => setDisableDayComment(!disableDayComment)} style={{ position: 'relative', float: 'right', top: '33px' }} >
                                        <AiTwotoneEdit size='1.5em' />
                                    </div>
                                    <Form.Control as="textarea" className="shadow-box" rows={6} disabled={disableDayComment} placeholder='Click on Edit Icon to Add Comments' />
                                </div>
                                <HoursPerMonth data={hoursPerMonth} />
                                <div className="mx-auto w-75">
                                    <div className="bg-light p-1 rounded shadow-box" onClick={() => setDisableMonthComment(!disableMonthComment)} style={{ position: 'relative', float: 'right', top: '33px' }} >
                                        <AiTwotoneEdit size='1.5em' />
                                    </div>
                                    <Form.Control as="textarea" className="shadow-box" rows={6} disabled={disableMonthComment} placeholder='Click on Edit Icon to Add Comments' />
                                </div>
                                <QuaterlyGraph data={quaterly} />
                                <div className="mx-auto w-75">
                                    <div className="bg-light p-1 rounded shadow-box" onClick={() => setDisableQuaterlyComment(!disableQuaterlyComment)} style={{ position: 'relative', float: 'right', top: '33px' }} >
                                        <AiTwotoneEdit className="" size='1.5em' />
                                    </div>
                                    <Form.Control as="textarea" className="shadow-box" rows={6} disabled={disableQuaterlyComment} placeholder='Click on Edit Icon to Add Comments' />
                                </div>
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
