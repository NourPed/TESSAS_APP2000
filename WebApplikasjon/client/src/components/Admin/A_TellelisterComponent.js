/*
 * A_TellelisterComponent
 *
 * [Programbeskrivelse]
 * 
//utformet av mohammed fawzi mohammed - kandidatnr: 6000
 */

/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Table, Form, Button, Row, Col } from 'react-bootstrap';

const path = "http://localhost:3500";

const getData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${path}/api/getData`);
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Year</th>
          <th>Download</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(data) && data.length > 0 ? (
          data.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.year}</td>
              <td>
                <a href={`${path}/api/download/${item._id}`}>Download</a>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">No data available</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

const A_TellelisterComponent = () => {
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
          <Row className="align-items-center">
            <Col sm={4}>
              <Form.Group>
                <Form.Label>Select a file:</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group>
                <Form.Label>Enter the year:</Form.Label>
                <Form.Control type="number" onChange={(event) => setYear(event.target.value)} />
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Button variant="primary" type="submit">
                Upload
              </Button>
            </Col>
          </Row>
          <p className="text-danger">{data}</p>
        </Form>
        <div className="mt-4">
          {getData()}
        </div>
      </Card.Body>
    </Card>
  );
};

export default A_TellelisterComponent;