import React from 'react'
import {Row, Col,Card ,CardGroup, Container} from 'react-bootstrap';

function ImageHolder(props) {
    const { src } = props;
    return (
        <>
        <Container>
        <Row>
        <CardGroup style={{ height: "auto", width: "auto" }}>

        <Card>
        <Card.Img variant="top" src={src} />
        </Card>
        <Card>
        <Card.Img variant="top" src={src} />
        </Card>
        <Card>
        <Card.Img variant="top" src={src} />
        </Card>

        </CardGroup >
        <CardGroup style={{ height: "auto", width: "auto" }}>
        <Card>
        <Card.Img variant="top" src={src} />
        </Card>
        <Card>
        <Card.Img variant="top" src={src} />
        </Card>
        <Card>
        <Card.Img variant="top" src={src} />
        </Card>
        </CardGroup>
        </Row>
        </Container>
        {/* <Card style={{ height: "auto", width: "auto" }}>
            <Card.Img variant="top" src={src} />
        </Card> */}
        
       
       
        </>
    )
}

export default ImageHolder
