import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactForm.css';
import {Form, Button, Row, Col} from 'react-bootstrap';

// hårdkodade variabler som behövs skickas in som data i emailJS funktion sendForm
const YOUR_SERVICE_ID = "service_ocxbiu4"
const YOUR_TEMPLATE_ID = "template_r5drq5v"
const YOUR_PUBLIC_KEY = "nHWPgzJslJB85tQhf"

//useRef används för att skapa en referens som vi tilldelar variabeln form, som också är det data som skickas in i emailJS funktion och är det data som matas in i formuläret på sidan.
//useState används för att vi ska kunna skapa ett status för användaren. Som ingångsvärde är status null, men när användaren klickar på skicka vill vi att status ska förändras beroende på vilket status vi har.
export const ContactUs = () => {
  const form = useRef(); 
  const [status, setStatus] = useState(null);

  //funktionen sendEmail är funktionen som körs när formuläret submittas, se längre ner i returnen på "Form". Så fort vi submittar formuläret kommer status att förändras genom "setStatus" från null till "sending"
  const sendEmail = (event) => {
    event.preventDefault();
    setStatus("sending"); 
    //Med hjälp av emailJS funktion sendForm så skickas mailet från sidan till oss med den data som funktionen tar in. 
    //om meddelandet lyckas skickas så ska statusen förändras från sending till "sent" och om meddelandet inte lyckas skickas ska statusen förändras från sending till error med hjälp av setStatus
    emailjs.sendForm(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, form.current, YOUR_PUBLIC_KEY) 
     .then((result) => {         
          setStatus("sent");           
          document.getElementById("mailForm").reset();          
      }, (error) => {                            
          setStatus("error"); 
      });
  };

  return (
    <>
        <br></br>
        <div>
            <Col className="d-flex justify-content-center">
                <h2>Contact us</h2>
            </Col>
        </div>
        <br></br>
        <div className="d-flex justify-content-center">
        <Col md={4}> 
            <Form ref={form} id={"mailForm"} onSubmit={sendEmail}>       
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
                    <Form.Control pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required={true} type="email" name="from_email" placeholder="Format: your@emailadress.com" title="Example correct format: your.email@adress.com" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Message</Form.Label>
                    <Form.Control required={true} as="textarea" name="message" rows={3} />        
                </Form.Group>       
                <Form.Group>
                    <Button className="contactButton" as="input" type="submit" value="Send" />
                </Form.Group>
            </Form>
        </Col>
        </div>

        {status === "sending" && (
            <div style={{ color: "blue" }}>Sending...</div>
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

