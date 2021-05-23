import React from 'react'
import SideNav from '../components/SideNav';
import Uploadpage from './UploadPage';
import { Container, Col, Row, CardGroup } from 'react-bootstrap';

function ImageProcessing() {
    return (
        <>
            <Container className="m-0 p-0" fluid>
                <Row>
                    <Col className='pr-0 bg-dark' md={3} >
                        <SideNav />
                    </Col>
                    <Col className="">
                        <Uploadpage />
                    </Col>
                </Row>
            </Container >
        </>
    )
}

export default ImageProcessing
