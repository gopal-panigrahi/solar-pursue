import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';

function Result() {
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [count, setCount] = useState(0);
    const [noMoreImages, setNoMoreImages] = useState(false)
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
            const response = await window.api.getUploadedImages(count);
            setCount(response.count);
            setImages(response.images);
            setNoMoreImages(response.over);
        }
    }, [loading]);

    const getMoreImages = async () => {
        const response = await window.api.getUploadedImages(count);
        setImages(response.images);
        setCount(response.count);
        setNoMoreImages(response.over);
    }
    return (
        <>
            {
                loading ?
                    <h1>Loading</h1> :
                    (
                        <>
                            {
                                images.map((image, index) => (
                                    <img src={image} height={100} width={100} />
                                ))
                            }
                            <Button onClick={getMoreImages} disabled={noMoreImages}>
                                {noMoreImages ? "No More Images" : "Get More"}
                            </Button>
                        </>
                    )
            }
        </>
    )
}

export default Result
