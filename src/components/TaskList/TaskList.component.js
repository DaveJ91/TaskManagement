import React from "react";
import { useTasks } from "../../hooks/useTasks";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { TaskCard } from "../TaskCard/TaskCard.component";

export const TaskList = ()=>{

    const {tasks, loadingStatus } = useTasks();
    return(
        <>
         { loadingStatus==="loading" ?  <CircularProgress/> : 
         <>
            {tasks.map(task=>(
                <TaskCard title={task.title} dueDate={task.due}/>
            ))}
            </>
        }
        </>

    )
}