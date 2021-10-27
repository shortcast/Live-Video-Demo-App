import React, { useState } from 'react';
import { Navbar, Form, Container, Row, Col, Button } from 'react-bootstrap';
import './App.css';
import MirrorService from './MirrorService';

const App = () => {
  const [ sessionReference, setSessionReference ] = useState();
  const [ sessionContact, setSessionContact ] = useState();

  const goToAgentApp = async () => {
    var newSessionWindow = window.open('', 'newSession');

    try {
      const session = await MirrorService.createSession(sessionReference);
      const conferenceURL = `https://app.mirror.me/agents/conferences/${session.friendly_id}/send`;
      window.open(conferenceURL, 'newSession');
    } catch (e) {
      newSessionWindow.close();
      console.log(e);
    }
  }

  const startLiveVideo = async () => {
    var newSessionWindow = window.open('', 'newSession');

    try {
      const session = await MirrorService.createSession(sessionReference);
      await MirrorService.sendMessage(session.id, sessionContact);
      const conferenceURL = `https://app.mirror.me/agents/conferences/${session.friendly_id}/view`;
      window.open(conferenceURL, 'newSession');
    } catch (e) {
      newSessionWindow.close();
      console.log(e);
    }
  }

  return (
    <div className="App">
      <Navbar className="app-nav-bar">
        <Navbar.Brand>Mirror Live video demo app</Navbar.Brand>
        <Navbar.Toggle />
      </Navbar>
      <Container className="pt-5">
      <Row className="p-2">
          <Col>
            <Form.Control 
              type="text" 
              value={sessionReference} 
              placeholder="Session Reference (optional, but recommended)"
              onChange={(e)=>setSessionReference(e.target.value)}/>
          </Col>
        </Row>
        <Row className="p-2">
          <Col>
            <Form.Control 
              type="text" 
              value={sessionContact}
              placeholder="Contact (required for full integration)"
              onChange={(e)=>setSessionContact(e.target.value)}/>
          </Col>
        </Row>
        <Row  className="p-2">
          <Col>
            Partial integration (opens 'send' page in agents app)
          </Col>
          <Col lg={4}>
            <Button onClick={goToAgentApp}>Start Mirror Live Video</Button>
          </Col>
        </Row>
        <Row  className="p-2">
          <Col>
            Full integration (goes straight to video conference)
          </Col>
          <Col lg={4}>
            <Button onClick={startLiveVideo}>Start Mirror Live Video</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
