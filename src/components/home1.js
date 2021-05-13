//import logo from './logo.svg';
//import './App.css';
// import MyIntro from './components/MyIntro';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container , Row, Col,Card,Button

} from 'react-bootstrap';
function App() {
  return (
    <>
<Container style = {{width : "80rem",height : '4rem', backgroundColor : ' #ADD8E6'}} > 
    <Row> <header> <h3>Solar Pursue</h3></header></Row>

</Container >
    
<Container >
  <Row>
    <Col style={{width : '80rem', height : 580, backgroundColor: '	#e6f2ff '}}> 
        <br/><br />
      <Card border="light" style={{ width: '33rem', height : '32rem' }}>
          <Card.Header><Button className = 'Rounded'> Region Info </Button>  </Card.Header>
          <Card.Body>
            
              <Card.Title>Light Card Title</Card.Title>
              <Card.Text>
                  
              </Card.Text>
          </Card.Body>
      </Card>
  </Col>
  <Col style = {{ width : "80rem", height : 580, backgroundColor: '	#e6f2ff'}} > 
    <br/><br />
    <Card border="light" style={{ width: '34rem', height : '32rem' }}>
        <Card.Header>Instruction</Card.Header>
        <Card.Body>
          {/* <Card.Title> </Card.Title> */}
          <Card.Text>
            1.If you are want to use our cloud then select cloud tab  <br />
            2.Otherwise,, start the docker using the command ... <br />
            3.Enter all the information of the region.<br />
            4.If you are want to use our cloud then select cloud tab.<br />
            5.Otherwise,, start the docker using the command .. <br />
            6.Enter all the information of the region<br  />
          </Card.Text>
        </Card.Body>
  </Card>
  </Col>
  </Row>
</Container>
    </>
  );
}

export default App;