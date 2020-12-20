import React, { Component } from 'react';
import axios from 'axios';
import {Navbar, Form, Container, Row, Col, Button} from 'react-bootstrap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'currentView': 'none',
      'sessionReference': 'Ticket Reference'
    }
  }
  startLiveVideo = () => {
    const {sessionReference} = this.state;
    const self = this;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;
    const header = {
      'api-key': API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    const requestBody = {
    	"type": "stream",
    	"project_id": PROJECT_ID,
    	"custom": { "reference": sessionReference } 
    };
    axios.post(`https://api.mirror.me/api/v1/sessions`, requestBody, {'headers': header}).then(function(response){
      const friendlyID = response.data.session.friendly_id;
      const conferenceURL = `https://app.mirror.me/agents/conferences/${friendlyID}/send`;
      self.setState({'currentView': 'send', 'conferenceURL': conferenceURL});
    });    
  }
  sessionReferenceChanged = (evt) => {
    this.setState({'sessionReference': evt.target.value});
  }
  render() {
    const {currentView, conferenceURL, sessionReference} = this.state;
    let mirrorAgentView = <span/>;
    if (currentView === 'send') {
      mirrorAgentView = <iframe src={conferenceURL} height="600px" width="100%"/>
    }
    return (
      <div className="App">
        <Navbar className="app-nav-bar">
          <Navbar.Brand>Mirror Live video demo app</Navbar.Brand>
          <Navbar.Toggle />
        </Navbar>
        <Container>
          <Row className="view-frame-container">
            <Col lg={8}>
            <Form.Control type="text" value={sessionReference} onChange={this.sessionReferenceChanged}/>
            </Col>
            <Col lg={4}>
            <Button onClick={this.startLiveVideo}>Start Mirror Live Video</Button>
            </Col>
          </Row>
          <div className="view-frame">
            {mirrorAgentView}
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
