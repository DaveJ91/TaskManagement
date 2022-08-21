import React, { useState } from "react";
import {v4 as uuidv4} from 'uuid';
import Modal from '@mui/material/Modal';
import { Box, useRadioGroup } from "@mui/material";
import { Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { useUser } from "../../contexts/UserContext/UserContext";

const AddTaskModal=(props)=>{

    const style = {
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius:"3px",
        boxShadow: 24,
        p: 4,
      };

      const [taskTitle, setTaskTitle] = useState("");
      const [taskDate, setTaskDate] = useState(new Date());

      const handleSubmit=()=>{
        const newTask = 
            {
                createdAt: new Date(),
                title: taskTitle,
                assignee: "assignee 1",
                due: taskDate,
                completed: false,
                dismissed: false,
                category: "not important",
                id: uuidv4()
            }
        
        props.addTask(newTask);

      

      }

      console.log(useUser())

    return (
        <Modal
                open={props.open}
                onClose={props.handleClose}
            >
            <Box sx={style}>
          <h2>Add Task</h2>
          <TextField id="outlined-basic" variant="outlined"  placeholder="What needs to be done?" value={taskTitle} onChange={(e)=>setTaskTitle(e.target.value)}/>

          {/* TextField who needs to do it?*/}
          <br/>
          <br/>
          <DatePicker
          label="Due date"
          inputFormat="DD/MM/yyyy"
          value={taskDate}
          onChange={(newValue)=>setTaskDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        <br/>
        <br/>
        <br/>
        <Button onClick={handleSubmit} variant="outlined">Add Task</Button>

          
        </Box>

            </Modal>
    )
}

export default AddTaskModal;