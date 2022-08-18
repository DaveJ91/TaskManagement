import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Typography } from '@mui/material';
import { TaskList } from '../../components/TaskList/TaskList.component';
import './TaskManagement.styles.css'

export const TaskManagement = () => {

    


    return (
        <div className="container">
            <h1 >Task Manangement Page</h1>
            <TaskList/>

        </div>
        
    )

}