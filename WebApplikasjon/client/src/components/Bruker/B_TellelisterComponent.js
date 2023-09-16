/*
 * B_TellelisterComponent
 *
 * [Programbeskrivelse]
 * 
//utformet av mohammed fawzi mohammed - kandidatnr: 6000
 */

/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import axios from "axios";
import { Card, Form, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";

const path = "http://localhost:3500";

const B_TellelisterComponent = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [year, setYear] = useState();

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file || !year) {
      setData("Missing the file or the year.");
    } else {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("year", year);

      axios
        .post(`${path}/api/add`, formData)
        .then((res) => {
          setData(res.data);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Card>
      <Card.Body>
        <h3>Upload a file</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Select a file:</Form.Label>
            <Form.Control type="file" onChange={handleFileUpload} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Enter the year:</Form.Label>
            <Form.Control type="number" onChange={(event) => setYear(event.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Upload
          </Button>
          <p className="text-danger">{data}</p>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default B_TellelisterComponent;