import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import API from "../../components/API";

function Register() {
    let navigate = useNavigate()
    let [ email, setEmail ] = useState("")
    let [ password, setPassword ] = useState("")

    const onSubmit = e => {
        e.preventDefault();

        API.register(email, password)
        .then(resp => {
            let data = resp.data;
            if(data.success) {
                alert("Successfully Registered!, Now you can continue to Login")
                navigate("/login")
            } else {
                alert(data.message);
            }
        }).catch(err => {
            alert("Error during registration!")
        })
    }


    return (
        <div>
        <Container>
            <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col md={8} lg={6} xs={12}>
                <Card className="shadow">
                <Card.Body>
                    <div className="mb-3 mt-md-4">
                    <h2 className="fw-bold mb-2">Tasks App</h2>
                    <div className="mb-3">
                        <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-center">
                            Email address
                            </Form.Label>
                            <Form.Control type="email" placeholder="Enter email"
                                value={email} onChange={e => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"
                                value={password} onChange={e => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicCheckbox"
                        >
                        </Form.Group>
                        <div className="d-grid">
                            <Button variant="primary" type="submit">
                            Register
                            </Button>
                        </div>
                        </Form>
                        <div className="mt-3">
                        <p className="mb-0  text-center">
                            Already have an account?{" "}
                            <Link to="/login" className="text-primary fw-bold">
                            Login
                            </Link>
                        </p>
                        </div>
                    </div>
                    </div>
                </Card.Body>
                </Card>
            </Col>
            </Row>
        </Container>
        </div>
    )
}

export default Register;
