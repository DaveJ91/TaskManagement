import React, {useEffect, useState} from "react";
import { taskActions } from "../actions/taskActions";

export const useTasks = () =>{
    const [tasks, setTasks] = useState([]);
    const [loadingStatus, setLoadingStatus]=useState("loading")

    useEffect(()=>{
        taskActions.getTasks()
            .then(res=>res.json())
            .catch(err=>{
                console.log(err)
                setLoadingStatus("error")
            })
            .then(res=>{
                setTasks(res.slice(0,5))
                setLoadingStatus("loaded")
            })
    },[])

    return {tasks, setTasks, loadingStatus}
     

}