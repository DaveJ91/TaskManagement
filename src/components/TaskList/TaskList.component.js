import React from "react";
import { useTasks } from "../../hooks/useTasks";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { CircularProgress } from "@mui/material";
export const TaskList = ()=>{

    const {tasks, loadingStatus } = useTasks();
    return(
        <>
         { loadingStatus==="loading" ?  <CircularProgress/> : 
         <>
            <h1>Task List</h1>
            {tasks.map(task=>(
                <Card variant="outlined" sx={{ maxWidth: 345, margin: "20px auto" }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {task.title}
                        </Typography>
                        <br/>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {task.category}
                        </Typography>

                    </CardContent>

                    {task.completed ? null : <Button>Mark completed</Button>}
                    <Button>Dismiss</Button>
                    

                </Card>
            ))}
            </>
        }
        </>

    )
}