import React from "react";
import { Row, Image, Col, Button } from "react-bootstrap";

const Uploadpage = () => {
  const images = [
    "https://i.pinimg.com/originals/03/ce/01/03ce015ea85dc84a17fb4c24a96cd87e.jpg",
    "https://i.pinimg.com/originals/03/ce/01/03ce015ea85dc84a17fb4c24a96cd87e.jpg",
    "https://i.pinimg.com/originals/03/ce/01/03ce015ea85dc84a17fb4c24a96cd87e.jpg",
    "https://i.pinimg.com/originals/03/ce/01/03ce015ea85dc84a17fb4c24a96cd87e.jpg",
    "https://i.pinimg.com/originals/03/ce/01/03ce015ea85dc84a17fb4c24a96cd87e.jpg",
    "https://i.pinimg.com/originals/03/ce/01/03ce015ea85dc84a17fb4c24a96cd87e.jpg",
  ];

  const imageCollection = images.map((image, index) => <Image className="m-4" key={index} src={image} height="200" width="200" rounded thumbnail />)

  return (
    <>
      <Row className="p-0 m-0 mx-auto" xl>
        <Col className="p-0 m-0 m-auto" md={1}><Button>Prev</Button> </Col>
        <Col className="">
          {imageCollection}
        </Col>
        <Col className="p-0 m-0 m-auto" md={1}><Button>Next</Button></Col>
      </Row>
    </>
  );
};

export default Uploadpage;