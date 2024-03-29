import React, { useState } from "react";
import { Button, Container, Alert, Row, Image, Col } from 'react-bootstrap';

function Imageupload() {
  const [imgPreview, setImgPreview] = useState(null);
  const [error, setError] = useState(false);
  const [result, setResult] = useState('predicting...');

  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
        setError(false);
        window.api.classifySingle(reader.result.replace(/data:[a-z]+\/[a-z]+;base64,/, ''), (result) => {
          setResult(result);
        });
      };
      reader.readAsDataURL(selected);
    } else {
      setError(true);
    }
  };
  function handleRemove() {
    setImgPreview(null);
  }

  return (
    <>
      <Container className="p-5" >
        {error && <Alert variant="danger">File not supported</Alert>}
        <Col>
          {imgPreview && (<Alert className="m-0 text-center" variant='info'>{result}</Alert>)}
          <Row className="rounded mx-0 py-2 d-flex text-center justify-content-center align-items-center" style={{ height: '65vh', maxHeight: '65vh', background: '#F8F0E3' }}>

            {imgPreview ?
              (
                <Image src={imgPreview} className='h-100 w-75' />
              )
              :
              (
                <div>
                  <p className="">Add an image</p>
                  <label htmlFor="fileUpload" className="text-info h3">Choose file</label>
                  <input style={{ display: 'none' }} type="file" id="fileUpload" onChange={handleImageChange} />
                  <p className="">(jpg, jpeg or png)</p>
                </div>
              )
            }
          </Row>
          {imgPreview && (<Alert className="text-center" variant='warning' onClick={handleRemove}>Remove</Alert>)}
        </Col>
      </Container >
    </>
  );
}

export default Imageupload

