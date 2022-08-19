import React, {useState} from 'react';
import './TaskManagement.styles.css'
import {Button} from '@mui/material';
import { taskActions } from '../../actions/taskActions';
import { CircularProgress } from '@mui/material';
import TaskCard from '../../components/TaskCard/TaskCard.component';
import { useTasks } from '../../hooks/useTasks'
import {v4 as uuidv4} from 'uuid';
import Modal from '@mui/material/Modal';
import AddTaskModal from '../../components/AddTaskModal/AddTaskModal.component';

export const TaskManagement = () => {

    const {tasks, dispatch, loadingStatus} = useTasks();
    const [modalOpen, setModalOpen] = useState(false);

    const handleClick = ()=>{
        setModalOpen(true)
    }

    const handleMarkDone = (taskId)=>{
        dispatch({
            type:"MARK_DONE",
            taskId
        })
    }

    const addTask=(task)=>{
        dispatch({
            type:"ADD_TASKS",
            tasks: [task]
        })

        //POST request

        setModalOpen(false)
    }

    const outstandingTasks = tasks.filter(t=>t.completed===false)

    console.log(tasks)

    return (
        <div className="container">
            <Button onClick={handleClick}>Add Task</Button>
            <h2>Task Manangement</h2>
            { loadingStatus==="loading" ?  <CircularProgress/> : 
                <div>
                    <p>{outstandingTasks.length} outstanding tasks</p>
                        { tasks.map(task=>
                            <TaskCard key={task.id} title={task.title} dueDate={task.due} done={task.completed} handleMarkDone={handleMarkDone} id={task.id} />
                        )
            }
            </div>
            }
            <AddTaskModal open={modalOpen} handleClose={()=>setModalOpen(false)} addTask={addTask}/>
        </div>   
    )};
