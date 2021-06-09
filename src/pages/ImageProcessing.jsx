import React, { useEffect, useState } from 'react'
import { Container, Card, Row, Button, Image } from 'react-bootstrap';
import LoadingPage from '../components/Loading.jsx';
import StatisticalReport from './StatisticalReport.jsx';

function ImageProcessing() {
    const [resultPresent, setResultPresent] = useState(false);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showReport, setShowReport] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    // const images = [{ imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }, { imagePath: '20120707_141149.jpg', label: 'not-predicted' }];
    useEffect(() => {
        window.api.getResult((result) => {
            console.log("data receive", result);
            setImages(result);
            setResultPresent(true);
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
        setDisableButton(true);
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
        <>
            {showReport ?
                <StatisticalReport resultPresent={resultPresent} result={images} />
                :
                (
                    loading ?
                        <LoadingPage />
                        :
                        <Container fluid>
                            <h2 className="text-center mt-1 text-primary">Images</h2>
                            <Row className="mx-4 mb-2" style={{ maxHeight: '75vh', overflowY: 'auto', border: '5px inset cyan' }} >
                                {imageCollection}
                            </Row>
                            <Row className="d-flex justify-content-center p-2">
                                {
                                    resultPresent ?
                                        <Button onClick={generateReport}> Generate Report </Button>
                                        :
                                        <Button onClick={startProcessing} disabled={disableButton}>Start Processing</Button>
                                }
                            </Row>
                        </Container >
                )
            }
        </>
    )
}

export default ImageProcessing
