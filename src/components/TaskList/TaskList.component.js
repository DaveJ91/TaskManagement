import React from "react";
import { useTasks } from "../../hooks/useTasks";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { TaskCard } from "../TaskCard/TaskCard.component";

export const TaskList = ()=>{

    const {tasks, loadingStatus, setTasks } = useTasks();

    const outstandingTasks = tasks.filter(task=>task.completed==false);

    const handleMarkDone = (taskId)=>{
        let updatedTasks = [...tasks];
        let index = updatedTasks.findIndex(task=>task.id==taskId);
        updatedTasks[index].completed=true;
        setTasks(updatedTasks);

        // 2. PUT request


        console.log(taskId);
    }



    return(
        <>
         { loadingStatus==="loading" ?  <CircularProgress/> : 
         <>
         <p>{outstandingTasks.length} outstanding tasks</p>
            {tasks.map(task=>(
                <TaskCard title={task.title} dueDate={task.due} done={task.completed} handleMarkDone={handleMarkDone} id={task.id} key={task.id}/>
            ))}
            </>
        }
        </>

    )
}