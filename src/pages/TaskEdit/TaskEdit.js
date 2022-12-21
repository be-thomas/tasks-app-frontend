import { Col, Button, Row, Container, Card, Form, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import API from "../../components/API";
import axios from "axios";

function TaskEdit() {
    let [ title, setTitle ] = useState("")
    let [ description, setDescription ] = useState("")
    let [ completed, setCompleted ] = useState(false)
    let [ attachments, setAttachments ] = useState([])
    
    let { task_id } = useParams()
    const MakeNewTask = task_id === undefined
    // One of: IDLE, FETCHING, UPDATING
    let [ status, SetStatus ] = useState(MakeNewTask ? "IDLE" : "FETCHING")

    let navigate = useNavigate()

    const handleChangeFile = e => {
        let file = e.target.files[0]
        const formData = new FormData()
        formData.append("file", file)
        axios.post(`${API.getBaseURI()}/attachments`, formData,
            { headers: { 'x-access-token': API.getAccessToken() } })
            .then(resp => {
                console.log("resp: ", resp)
                let data = resp.data
                if(data.success) {
                    setAttachments([ data.attachment ])
                } else {
                    alert(data.message)
                }
            }).catch(err => {
                alert("Error Uploading File!")
            })
    }

    useEffect(() => {
        if(!API.isLoggedIn()) {
            navigate('/')
        }

        let EditTask = !MakeNewTask
        if(EditTask) {
            API.Tasks().get(task_id)
            .then(resp => {
                let data = resp.data
                console.log("data: ", data)
                if(data.success) {
                    setTitle(data.task.title)
                    setDescription(data.task.description)
                    setCompleted(data.task.completed)
                    setAttachments(data.task.attachments)
                    SetStatus("IDLE")
                } else {
                    alert(data.message)
                }
            }).catch(err => {
                alert("Error Fetching Task Data")
                navigate('/')
            })
        }
    }, [])

    const onSubmit = e => {
        e.preventDefault();
        SetStatus("FETCHING");
        let attachment_ids = attachments.map(x => x._id)

        if(MakeNewTask) {
            API.Tasks().create({
                title, description, completed, attachments: attachment_ids
            }).then(resp => {
                let data = resp.data
                if(data.success) {
                    alert("Task Added Successfully!")
                    navigate('/')
                } else {
                    alert(data.message)
                }
            }).catch(err => {
                alert("Error Adding New Task!")
            })
        } else {
            
            API.Tasks().update(task_id, {
                title, description, completed, attachments: attachment_ids
            }).then(resp => {
                let data = resp.data
                if(data.success) {
                    alert("Task Updated Successfully!")
                    navigate('/')
                } else {
                    alert(data.message)
                }
            }).catch(err => {
                alert("Error Updating Task Data!")
            })
        }
    }

    return (
        <div>
            <Container>
            <Row className="vh-100 d-flex justify-content-center align-items-center">
                <Col md={8} lg={6} xs={12}>
                <Card className="shadow">
                    <Card.Body>
                    <div className="mb-3 mt-md-4">
                        <h2 className="fw-bold mb-2">{MakeNewTask ? "Add" : "Edit"} Task</h2>
                        <div className="mb-3">
                            {status === "FETCHING" &&
                                <div className="d-flex justify-content-center">
                                    <Spinner />
                                </div>}
                            {status === "IDLE" &&
                            <Form onSubmit={onSubmit} encType="multipart/form-data">
                                <Form.Group className="mb-3" controlId="title">
                                    <Form.Label className="text-center">
                                        Title
                                    </Form.Label>
                                    <Form.Control type="text" placeholder="Enter Title"
                                        value={title} onChange={e => setTitle(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="description">
                                    <Form.Label className="text-center">
                                        Description
                                    </Form.Label>
                                    <Form.Control as="textarea" rows="3" placeholder="Enter Description"
                                        value={description} onChange={e => setDescription(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3 d-flex flex-wrap align-items-center">
                                    <Form.Label className="mb-0">Status: &nbsp;
                                        <span style={{ color: completed ? 'green' : 'red' }}>{completed ? "Complete" : "Not Complete"}</span></Form.Label>
                                    <div className="ps-2 ps-md-4 d-flex align-items-center" >
                                        <Button variant="link" style={{color: 'black'}}
                                            onClick={() => setCompleted(x => !x)}>Mark As {completed ? "Not Complete" : "Complete"}</Button>
                                    </div>
                                </Form.Group>

                                {attachments.length === 1 && <Form.Group>
                                    <Form.Label>Attachment: <b>{attachments[0].originalname}</b></Form.Label>
                                    <Button variant="link" onClick={() => {
                                        setAttachments([])
                                    }}>Remove</Button>
                                </Form.Group>}

                                {attachments.length == 0 &&
                                    <Form.Group controlId="formFile" className="mb-5">
                                        <Form.Label>Attach File</Form.Label>
                                        <Form.Control type="file" onChange={handleChangeFile} />
                                    </Form.Group>}

                                <div className="d-flex justify-content-evenly">
                                    {status === "IDLE" &&
                                    <>
                                        <Button variant="primary" type="submit">
                                            { MakeNewTask ? "Add Task" : "Save Changes" }
                                        </Button>
                                        <Button variant="secandary" onClick={() => navigate('/')}>
                                            Cancel
                                        </Button>
                                    </>}
                                    {status === "UPDATING" &&
                                        <Spinner />
                                    }
                                </div>
                            </Form>}
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

export default TaskEdit;
