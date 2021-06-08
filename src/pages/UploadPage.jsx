import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Image, Col, Button } from "react-bootstrap";

const Uploadpage = () => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [count, setCount] = useState(0);
  const [noMoreImages, setNoMoreImages] = useState(false)
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
                <Col className="p-0 m-0 m-auto" md={1}><Button>Prev</Button> </Col>
                <Col className="">
                  {imageCollection}
                </Col>
                <Col className="p-0 m-0 m-auto" md={1}><Button onClick={getMoreImages} disabled={noMoreImages}>Next</Button></Col>
              </Row>
              <Row><Button onClick={startProcessing}>Start Processing</Button></Row>
            </>
          )
      }
    </>
  );
};

export default Uploadpage;