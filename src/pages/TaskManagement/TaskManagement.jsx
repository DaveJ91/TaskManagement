import React, { useState } from "react";
import "./TaskManagement.styles.css";
import { Button } from "@mui/material";
import { taskActions } from "../../actions/taskActions";
import { CircularProgress } from "@mui/material";
import TaskCard from "../../components/TaskCard/TaskCard.component";
import { useTasks } from "../../hooks/useTasks";
import AddTaskModal from "../../components/AddTaskModal/AddTaskModal.component";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Collapse from '@mui/material/Collapse';
import Fade from '@mui/material/Fade';
import EditIcon from '@mui/icons-material/Edit';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

export const TaskManagement = () => {
  const { tasks, dispatch, loadingStatus } = useTasks();
  const [modalOpen, setModalOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("all");
  const [manageTasksOpen, setManageTasksOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);



  const handleMarkDone = (taskId) => {
    dispatch({
      type: "MARK_DONE",
      taskId,
    });

    // PUT
  };

  const handleMarkAllComplete = () => {
    dispatch({
      type: "MARK_ALL_COMPLETE",
    });

    // BULK PUT
  };

  const handleDelete= (taskId)=> {
    dispatch({
      type: "DELETE_TASK",
      taskId
    })

    // PUT
  }

  const handleDeleteAll = () => {
    dispatch({
      type: "DELETE_ALL_TASKS",
    });
    //  Bulk Put to mark
  };

  const addTask = (task) => {
    dispatch({
      type: "ADD_TASKS",
      tasks: [task],
    });

  
    //POST request
    taskActions.postTask(task).then((res) => console.log(res));

    setModalOpen(false);
  };

  const outstandingTasks = tasks.filter((t) => t.completed === false && t.dismissed===false);
  const completedTasks = tasks.filter((t) => t.completed === true && t.dismissed===false);

  let filteredTasks;

  switch (filterValue) {
    case "all":
      filteredTasks = tasks.filter((t)=>t.dismissed===false);
      break;
    case "completed":
      filteredTasks = completedTasks;
      break;
    case "outstanding":
      filteredTasks = outstandingTasks;
      break;
  }

  console.log(tasks.map(t=>t.dismissed))

  return (
    <div className="tasks-container">
      <div className="app-header">
      <h1 className="title">My Tasks</h1>
      {loadingStatus==="loading" ? null : 
      <h4 className="title subtitle">({outstandingTasks.length} outstanding)</h4>}
      </div>



        
        {loadingStatus === "loading" ? (
        <div>
            <CircularProgress className="tasks-loader"/>
            <h3>Loading ...</h3>
        </div>) : (
            <div className="task-list">
                    <div className="tasks-options">
              {filtersOpen ? (
                  <Button variant="outlined" onClick={()=>setFiltersOpen(false)} startIcon={<FilterAltIcon/>}>Hide Filters</Button>) : (
                  <Button variant="outlined" onClick={()=>setFiltersOpen(true)} startIcon={<FilterAltIcon/>}>Show Filters</Button>
                )
              }

              {manageTasksOpen ? (
                <Button startIcon={<EditIcon/>} variant="outlined" onClick={()=>setManageTasksOpen(false)} style={{marginLeft: "20px"}}>Close Manage Tasks</Button>) :(
                <Button startIcon={<EditIcon/>} variant="outlined" onClick={()=>setManageTasksOpen(true)} style={{marginLeft: "20px"}}>Open Manage Tasks</Button>
                )}    
            </div>
        
               {manageTasksOpen ? 
                    <>
                        <Button startIcon={<AddTaskIcon/>} onClick={()=>setModalOpen(true)}>Add a Task</Button>
                        <Button startIcon={<DoneAllIcon/>} onClick={handleMarkAllComplete}>Mark All Complete</Button>
                        <Button startIcon={<DeleteSweepIcon/>} onClick={handleDeleteAll}>Delete All</Button>
                </>: 
                null}
        
                
                { filtersOpen ? 
                <ToggleButtonGroup
                    color="primary"
                    value={filterValue}
                    exclusive
                    size="small"
                    onChange={(e) => setFilterValue(e.target.value)}
                >
                    <ToggleButton value="all">All</ToggleButton>
                    <ToggleButton value="outstanding">Outstanding</ToggleButton>
                    <ToggleButton value="completed">Completed</ToggleButton>
                </ToggleButtonGroup>
                : null}
            

                <div>
                {filteredTasks.map((task) => (
                    <TaskCard
                    key={task.id}
                    title={task.title}
                    dueDate={task.due}
                    done={task.completed}
                    handleMarkDone={handleMarkDone}
                    handleDelete={handleDelete}
                    id={task.id}
                    />
                ))}
                </div>

            <AddTaskModal
                open={modalOpen}
                handleClose={() => setModalOpen(false)}
                addTask={addTask}
            />
                
            </div>    
  )}
  </div>)
};
