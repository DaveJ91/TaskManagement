import React from "react";
import { useTasks } from "../../hooks/useTasks";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { CircularProgress } from "@mui/material";
import './TaskCard.styles.css'
import TaskOutlinedIcon from "@mui/icons-material/Task";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import moment from "moment";

export const TaskCard = (props)=>{

    const formattedDate = moment(props.due).format("DD-MM-YYYY")
    return(
       <div className="card">
            <TaskOutlinedIcon className="icon" id="task-icon"/>
            <p className="card-text">{props.title}  &middot; </p>
            <p className="card-text card-subtitle">Due: {formattedDate} </p>


            <Button id="card-button" size="small">Done</Button>



       </div>
    )
}