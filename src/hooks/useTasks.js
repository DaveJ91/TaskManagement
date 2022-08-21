import {useEffect, useState, useReducer} from "react";
import { taskActions } from "../actions/taskActions";
import { tasksReducer } from "../reducers/tasksReducer";

export const useTasks = () =>{
    const [tasks, dispatch] = useReducer(tasksReducer,[]);
    const [loadingStatus, setLoadingStatus]=useState("loading")

    useEffect(()=>{
        taskActions.getTasks()
            .then(res=>res.json())
            .catch(err=>{
                console.log(err)
                setLoadingStatus("error")
            })
            .then(tasks=>{
                dispatch({
                    type: "ADD_TASKS",
                    tasks
                })
                setInterval(()=>setLoadingStatus("loaded"),1000)
            })
    },[])

    return {tasks, dispatch, loadingStatus}
     

}