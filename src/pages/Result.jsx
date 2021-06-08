import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';

function Result() {
    const [loading, setLoading] = useState(true);
    const [imageResult, setImageResult] = useState([]);

    useEffect(() => {
        window.api.getResult((result) => {
            console.log("data receive", result);
            setLoading(false);
            setImageResult(result);
        });
    }, []);

    return (
        <>
            {
                loading ?
                    <h1>Loading</h1> :
                    (
                        <>
                            {
                                imageResult.map((image, index) => (
                                    <div key={image[0]}>
                                        <img src={'file://' + image[0]} height={100} width={100} />
                                        {/* <p>{image[0]}</p> */}
                                        <p>{image[1]}</p>
                                    </div>
                                ))
                            }
                        </>
                    )
            }
        </>
    )
}

export default Result
