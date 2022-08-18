import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Typography } from '@mui/material';
import { TaskList } from '../../components/TaskList/TaskList.component';
import './TaskManagement.styles.css'
import {Button} from '@mui/material';
import { taskActions } from '../../actions/taskActions';

export const TaskManagement = () => {

    const handleClick = ()=>{
        taskActions.postTask(
            {
                "createdAt": "2022-08-17T03:19:33.924Z",
                "title": "File Annual B1 return",
                "assignee": "assignee 1",
                "due": "2023-02-10T11:47:13.489Z",
                "completed": true,
                "category": "not important",
                "id": "1"
               }
        ).then(res=>console.log(res))
    }

    return (
        <div className="container">
            <Button onClick={handleClick}>Add Task</Button>
            <h2>Task Manangement</h2>
            <TaskList/>

        </div>
        
    )

}