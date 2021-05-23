import React from 'react'
import { Container, Spinner } from 'react-bootstrap'

function LoadingPage() {
    return (
        <>
            <Container className="row justify-content-center align-items-center" style={{ margin: 0, height: "80vh" }}>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </Container>
        </>
    )
}

export default LoadingPage;