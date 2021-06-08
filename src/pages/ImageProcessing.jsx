import React, { useEffect, useState } from 'react'
import SideNav from '../components/SideNav.jsx';
import ImagePage from './ImagePage.jsx';
import { Container, Col, Row, Button, Image } from 'react-bootstrap';
import StatisticalReport from './StatisticalReport.jsx';

function ImageProcessing() {
    const [resultPresent, setResultPresent] = useState(false);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showReport, setShowReport] = useState(false);
    const [disableButton, setDisableButton] = useState(false);

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

    const imageCollection = images.map((image, index) => <Image className="m-4" key={index} src={image.imagePath} height="200" width="200" rounded thumbnail />)

    return (
        <>
            {showReport ?
                <StatisticalReport resultPresent={resultPresent} result={images} />
                :
                (
                    loading ?
                        <h1>loading</h1>
                        :
                        <Container className="m-0 p-0" fluid>
                            <Row className="p-0 m-0 mx-auto" xl>
                                {imageCollection}
                            </Row>
                            <Row>
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
