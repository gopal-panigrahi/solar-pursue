import React, { useState } from "react";
import { Button, Container, Alert, Row, Image } from 'react-bootstrap';
import './k.css';

function Imageupload() {
  const [imgPreview, setImgPreview] = useState(null);
  const [error, setError] = useState(false);
  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
        setError(false);
      };
      reader.readAsDataURL(selected);
    } else {
      setError(true);
    }
  };
  return (
    <>
      <Container className="p-5">
        {error && <Alert variant="danger">File not supported</Alert>}
        <Row className="mx-5 mb-3 py-2 d-flex text-center justify-content-center align-items-center" style={{ height: '65vh', maxHeight: '65vh', background: '#F8F0E3' }}>

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
        <Row className="d-flex justify-content-center">
          {imgPreview && (
            <Button className="w-75 btn-success" block>Classify</Button>
          )}
        </Row>
      </Container>

      {/* <div className="Imageupload">
        <div className="container">
          {error && <p className="errorMsg">File not supported</p>}
          <div className="imgPreview"
            style={{
              background: imgPreview
                ? `url("${imgPreview}") no-repeat center/cover`
                : "#131313"
            }}
          >
            {!imgPreview && (
              <>
                <p>Add an image</p>
                <label htmlFor="fileUpload" className="customFileUpload">Choose file</label>
                <input type="file" id="fileUpload" onChange={handleImageChange} />
                <span>(jpg, jpeg or png)</span>
              </>
            )}
          </div>
          {imgPreview && (
            <button onClick={() => setImgPreview(null)}>Remove image</button>
          )}


        </div>

      </div> */}

      {/* <Button style={{ backgroundColor: "#80b3ff", width: "10rem" }}>Classify</Button> */}


    </>
  );
}

export default Imageupload

