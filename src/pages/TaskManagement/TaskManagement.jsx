import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Typography } from '@mui/material';
import { TaskList } from '../../components/TaskList/TaskList.component';

export const TaskManagement = () => {

    


    return (
        <>
         <AppBar position="static" color="primary">
         <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              ml: 10,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Arial',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            Fides
          </Typography>
        </AppBar>

            <h1>Task Manangement Page</h1>

            <TaskList/>
        </>
    )

}