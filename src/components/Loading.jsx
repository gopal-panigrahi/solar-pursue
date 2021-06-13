import React from 'react'
import { Container, Spinner } from 'react-bootstrap'

function LoadingPage({ children = " Loading...", animation = "border", variant = "dark" }) {
    return (
        <>
            <Container className="h-100 d-flex justify-content-center align-items-center">
                <div>
                    <Spinner className="ml-5" animation={animation} variant={variant} role="status" />
                    <p className="h2 text-light">{children}</p>
                </div>
            </Container>
        </>
    )
}

export default LoadingPage;