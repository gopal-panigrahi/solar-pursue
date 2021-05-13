import React from 'react'
import { Card } from 'react-bootstrap';

function ImageHolder(props) {
    const { src } = props;
    return (
        <Card style={{ height: "40vh", width: "24vw" }}>
            <Card.Img variant="top" src={src} />
        </Card>
    )
}

export default ImageHolder
