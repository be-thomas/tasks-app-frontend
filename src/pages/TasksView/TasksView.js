import React, { useState, useEffect } from 'react';
import API from "../../components/API";
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import TaskOverview from './TaskOverview';
import { Button } from 'react-bootstrap';


function Content({ tasksList, onAddTask, onDeleteTask }) {
    return (
        <div className="TasksView d-flex flex-column align-items-center">
            <div className='d-flex w-100 px-2 px-md-5 py-2'>
                <h1 style={{flex: 1, textAlign: 'center'}}>Tasks</h1>
                <Button onClick={onAddTask}>+ Add</Button>
            </div>
            <div className='TasksContainer w-100 p-2 p-md-5 d-flex flex-column align-items-center'>
                {tasksList === null
                    ? <Spinner />
                    : tasksList.map((task, i) => <TaskOverview task={task} onDeleteTask={onDeleteTask} key={i} />)}
            </div>
        </div>
    )
}

function TasksView() {
    let navigate = useNavigate();
    let [ tasksList, setTasksList ] = useState(null);

    const fetchTasks = () => {
        API.Tasks().list()
        .then(resp => {
            let data = resp.data;
            if(data.success) {
                setTasksList(data.tasks)
            } else {
                alert(data.message)
            }
        })
    }
    
    useEffect(() => {
        if (!API.isLoggedIn()) {
            navigate("/login");
        }
        fetchTasks();

    }, []);


    const onAddTask = () => navigate('/add')

    const onDeleteTask = task_id => {
        if(!window.confirm("Are you sure, you want to Delete Task?")) return
        API.Tasks().delete(task_id)
        .then(resp => {
            let data = resp.data;
            if(data.success) {
                alert("Task Deleted Successfully!")
                setTasksList(null)
                fetchTasks();
            } else {
                alert(data.message)
            }
        }).catch(err => {
            alert("Error Deleting Task!")
        })
    }

    return (
        <div>
            <Content onAddTask={onAddTask} onDeleteTask={onDeleteTask} 
                        tasksList={tasksList} />
        </div>
    )
}

export default TasksView;
