/*
 * OmOssComponent
 *
 * Denne komponenten tar seg kun av presenteringen av teammedlemmene.
 * Hvert teammedlem presenteres i et eget card-array som blir mappet
 * over og presenterer dem i rader og kolonner i en skalerbar conta-
 * iner gjennom react-bootstrap props.
 * 
 * Lagd av 6004
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Card, Col, Container, Row } from 'react-bootstrap';
import '../App.css';
import '../index.css';

const cards = [
    {
        image: "https://img.freepik.com/free-icon/anonymous_318-504651.jpg?w=2000",
        title: "Pedram Nourian",
        text: "Back-End dev"
    },
    {
        image: "https://img.freepik.com/free-icon/anonymous_318-504651.jpg?w=2000",
        title: "Mohammed Fawzi",
        text: "Back-End dev"
    },
    {
        image: "https://img.freepik.com/free-icon/anonymous_318-504651.jpg?w=2000",
        title: "Carl Chr. Roll-Lund",
        text: "Front-End dev"
    },
    {
        image: "https://img.freepik.com/free-icon/anonymous_318-504651.jpg?w=2000",
        title: "Agostino Montanaro",
        text: "Front-End dev"
    }
];

function OmOss() {
    return (
        <React.Fragment>
            <h1>Om Oss</h1>
            <hr />
            <Container style={{ maxWidth: "1200px" }}>
                <Row xs={1} md={2} className="g-4 justify-content-md-center">
                    {cards.map((card, index) => (
                        <Col className="d-flex justify-content-center" key={index}>
                            <Card className="omosscard">
                                <Card.Img variant="top" src={card.image} />
                                <Card.Body>
                                    <Card.Title>{card.title}</Card.Title>
                                    <Card.Text>{card.text}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default OmOss;

