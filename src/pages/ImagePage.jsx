import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Image, Col, Button } from "react-bootstrap";

const ImagePage = () => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const history = useHistory();

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
      setImages(response.images);
    }
  }, [loading]);

  const startProcessing = () => {
    window.api.startProcessing();
    history.push('/resultPage');
  }

  const imageCollection = images.map((image, index) => <Image className="m-4" key={index} src={image} height="200" width="200" rounded thumbnail />)
  console.log(images);
  return (
    <>
      {
        loading ?
          <h1>Loading</h1> :
          (
            <>
              <Row className="p-0 m-0 mx-auto" xl>
                <Col className="">
                  {imageCollection}
                </Col>
              </Row>
              <Row><Button onClick={startProcessing}>Start Processing</Button></Row>
            </>
          )
      }
    </>
  );
};

export default ImagePage;