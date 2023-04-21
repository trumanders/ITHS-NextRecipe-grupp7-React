import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactForm.css';
import {Form, Button, Row, Col} from 'react-bootstrap';

const YOUR_SERVICE_ID = "service_ocxbiu4"
const YOUR_TEMPLATE_ID = "template_r5drq5v"
const YOUR_PUBLIC_KEY = "nHWPgzJslJB85tQhf"

export const ContactUs = () => {
  const form = useRef();
  const [status, setStatus] = useState(null);
  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs.sendForm(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, form.current, YOUR_PUBLIC_KEY)
      .then((result) => {
          console.log(result.text);
          setStatus("sent");
      }, (error) => {
          console.log(error.text);
          setStatus("error");
      });
  };

  return (
    <>
        <br></br>
        <div>
            <Col>
                <h2>Contact Us</h2>
            </Col>
        </div>
        <br></br>
        <div className="d-flex justify-content-center">
        <Col md={4}> 
        <Form ref={form} onSubmit={sendEmail}>          
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Row>  
        <Col lg={6}>
            <Form.Label>First name</Form.Label>
            <Form.Control required={true} type="name" name="from_firstname" placeholder="" />
        </Col>
        <Col lg={6}>
            <Form.Label>Last name</Form.Label>
            <Form.Control required={true} type="name" name="from_lastname" placeholder="" />
        </Col>
        </Row> 
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control required={true} type="email" name="from_email" placeholder="" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Message</Form.Label>
        <Form.Control required={true} as="textarea" name="message" rows={3} />        
        </Form.Group>       
        <Form.Group>
        <Button as="input" type="submit" value="Send" />
        </Form.Group>
        </Form>
        </Col>
        </div>

        {status === "sending" && (
            <div style={{ color: "blue" }}>sending...</div>
            )
        }
        {status === "sent" && (
            <div style={{ color: "green" }}>Message sent!</div>
        )
        }
        {status === "error" && (
            <div style={{ color: "red" }}>Message failed to send.</div>
        )

        }

</>
  );
};

