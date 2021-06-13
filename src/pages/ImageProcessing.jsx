import React, { useEffect, useState } from 'react'
import { Container, Card, Row, Button, Image, Col } from 'react-bootstrap';
import LoadingPage from '../components/Loading.jsx';
import StatisticalReport from './StatisticalReport.jsx';

function ImageProcessing() {
    const [resultPresent, setResultPresent] = useState(false);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showReport, setShowReport] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [showPreprocessing, setShowPreprocessing] = useState(false)
    // const images = [{ imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }];
    useEffect(() => {
        window.api.getResult((result) => {
            console.log("data receive", result);
            setImages(result);
            setResultPresent(true);
            setShowPreprocessing(false);
        });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (window.api.readyForProcessing()) {
                setLoading(false);
                clearInterval(interval);
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, []);

    useEffect(async () => {
        if (loading === false) {
            const response = await window.api.getUploadedImages();
            console.log(response.images);
            setImages(response.images);
        }
    }, [loading]);

    const startProcessing = () => {
        setShowPreprocessing(true);
        window.api.startProcessing();
    };

    const generateReport = () => {
        setShowReport(true);
    }

    const imageCollection = images.map((image, index) => (
        <Card key={index} className="mx-auto m-3" style={{ width: '18rem' }}>
            <Card.Img src={image.imagePath} />
            <Card.Body>
                <Card.Text className="text-center">
                    {image.label}
                </Card.Text>
            </Card.Body>
        </Card>
    )
    );

    return (
        <>{
            showPreprocessing ?
                <LoadingPage animation="grow" variant="success">
                    Processing Images... Hang In there !!
                </LoadingPage>
                :
                (
                    showReport ?
                        <StatisticalReport resultPresent={resultPresent} result={images} />
                        :
                        loading || (images.length == 0) ?
                            <LoadingPage />
                            :
                            <Container fluid>
                                <h2 className="text-center mt-1 text-light">Images</h2>
                                <Row xs={1} md={2} lg={3} className="g-4 mx-4 mb-2" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
                                    {Array.from({ length: images.length }).map((_, idx) => (
                                        <Col className='mx-auto m-3'>
                                            <Card key={idx} className="h-100" style={{ width: '23rem' }}>
                                                <Card.Img src={images[idx].imagePath} />
                                                <Card.Body>
                                                    <Card.Text className="text-center">
                                                        {images[idx].label}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                                <Row className="d-flex justify-content-center p-2">
                                    {
                                        resultPresent ?
                                            <Button className="btn-success" onClick={generateReport}> Generate Report </Button>
                                            :
                                            <Button className="btn-success" onClick={startProcessing}>Start Processing</Button>
                                    }
                                </Row>
                            </Container >
                )
        }
        </>
    )
}

export default ImageProcessing
