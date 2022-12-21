import React from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function TaskOverview({ task, onDeleteTask }) {
    let navigate = useNavigate()
    let { title, description, completed, _id } = task;

    return (
        <div className='Task w-100 d-flex my-2 p-2 p-md-3 rounded'
            style={{ background: completed ? 'lightgreen' : 'lightblue', maxWidth: '800px', boxShadow: '5px 5px 4px grey' }}>
            <div className='TaskContents d-flex flex-column' style={{ flex: 1 }}>
                <div className="Title display-4" style={{ fontSize: 'calc(1.5em + 1.5vw)' }}>{title}</div>
                <div className='Description'>{description}</div>
            </div>
            <div className='TaskControls d-flex'>
                <div><Button variant="outline-dark" onClick={() => navigate(`/edit/${_id}`)}>Edit</Button></div>
                <div className='ps-2 ps-md-3'><Button onClick={() => onDeleteTask(_id)} variant="danger">Delete</Button></div>
            </div>
        </div>
    )
}

export default TaskOverview;
