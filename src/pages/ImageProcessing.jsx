import React, { useEffect, useState } from 'react'
import SideNav from '../components/SideNav.jsx';
import ImagePage from './ImagePage.jsx';
import { Container, Col, Row } from 'react-bootstrap';
import StatisticalReport from './StatisticalReport.jsx';

function ImageProcessing() {
    const [showReport, setShowReport] = useState(false);
    const [imageResult, setImageResult] = useState(null);
    useEffect(() => {
        window.api.getResult((result) => {
            console.log("data receive", result);
            setImageResult(result);
        });
    }, []);

    const goToPage = (page) => {
        if (page == 'reportPage') {
            if (imageResult) {
                setShowReport(true);
            } else {
                alert("Click On Start Processing");
            }
        } else {
            setShowReport(false);
        }
    };

    return (
        <>
            <Container className="m-0 p-0" fluid>
                <Row>
                    <Col className='pr-0 bg-dark' md={3} >
                        <SideNav goToPage={goToPage} />
                    </Col>
                    <Col>
                        {showReport ?
                            <StatisticalReport result={imageResult} />
                            :
                            < ImagePage result={imageResult} />
                        }
                    </Col>
                </Row>
            </Container >
        </>
    )
}

export default ImageProcessing
