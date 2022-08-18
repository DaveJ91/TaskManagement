import React from "react";

import { Button } from "@mui/material";
import './TaskCard.styles.css'
import TaskOutlinedIcon from "@mui/icons-material/Task";
import moment from "moment";

export const TaskCard = (props)=>{

    const CardStyle = {
        backgroundColor: props.done ? "inherit": "white",
        boxShadow : props.done ? "none" : "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
        border: props.done ? ".5px solid lightgrey" : "none",
    }

    const iconStyle = {
        color: props.done ? "grey" : "#3f9"
    }
    const formattedDate = moment(props.due).format("DD-MM-YYYY")
    return(
       <div className="card" style={CardStyle}>
            <TaskOutlinedIcon style={iconStyle} className="icon"/>
            <span className="card-text" style={{textDecoration: props.done ? "line-through": "none"}}>
                <p className="card-title">{props.title}  &middot; </p>
                <p className="card-subtitle">Due: {formattedDate} </p>

            </span>
           

            {props.done ? null : 
            <Button onClick={()=>props.handleMarkDone(props.id)} id="card-button" size="small">Done</Button>
            }



       </div>
    )
}