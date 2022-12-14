import React, { useState, useCallback, useMemo } from "react";
import "./TaskManagement.styles.css";
import { Button } from "@mui/material";
import { taskActions } from "../../actions/taskActions";
import { CircularProgress } from "@mui/material";
import TaskCard from "../../components/TaskCard/TaskCard.component";
import { useTasks } from "../../hooks/useTasks";
import AddTaskModal from "../../components/AddTaskModal/AddTaskModal.component";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import EditIcon from "@mui/icons-material/Edit";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddTaskIcon from "@mui/icons-material/AddTask";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

const TaskManagement = () => {
  const { tasks, dispatch, loadingStatus } = useTasks();
  const [modalOpen, setModalOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("all");
  const [manageTasksOpen, setManageTasksOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const handleMarkComplete = useCallback((task) => {
    dispatch({
      type: "MARK_COMPLETE",
      taskId: task.id,
    });

    // PUT request
    taskActions.putTask({...task, completed:true}).then(res=>console.log(res))
  },[dispatch]);

  const handleMarkAllComplete = useCallback(() => {

    dispatch({
      type: "MARK_ALL_COMPLETE",
    });

    // Bulk PUT request
    tasks.forEach(task=>{
      if (task.completed===false){
        taskActions.putTask({...task, completed:true})
      }
      
    })
  },[dispatch,tasks]);



  const handleDelete = useCallback((task) => {

    // 1. Update State
    dispatch({
      type: "DELETE_TASK",
      taskId: task.id,
    });

    // 2. PUT request
    taskActions.putTask({...task, dismissed:true}).then(res=>console.log(res))
    
  },[dispatch]);

  const handleDeleteAll = useCallback(() => {

    // 1. Update State
    dispatch({
      type: "DELETE_ALL_TASKS",
    });

     // Bulk PUT request - this will cause 429s so we would need a bulk patch endpoint
     tasks.forEach(task=>{
      if (task.dismissed===false){
        taskActions.putTask({...task, dismissed:true}).then(res=>console.log(res)).catch(err=>console.log(err));
      }
    })
  },[dispatch,tasks]);

  const addTask = useCallback((task) => {
    // 1. Update state
    dispatch({
      type: "ADD_TASKS",
      tasks: [task],
    });

    // 2. POST request to server
    taskActions.postTask(task).then((res) => console.log(res));

    // 3. Close the modal
    setModalOpen(false);
  },[dispatch]);

  const outstandingTasks = useMemo(()=>tasks.filter(
    (t) => t.completed === false && t.dismissed === false
  ),[tasks]);
  const completedTasks = useMemo(()=>tasks.filter(
    (t) => t.completed === true && t.dismissed === false
  ),[tasks]);

  let filteredTasks;

  switch (filterValue) {
    case "all":
      filteredTasks = tasks.filter((t) => t.dismissed === false);
      break;
    case "completed":
      filteredTasks = completedTasks;
      break;
    case "outstanding":
      filteredTasks = outstandingTasks;
      break;
    default:
      break;
  }

  return (
    <div className="tasks-container">
      <div className="app-header">
        <h1 className="title">My Tasks</h1>
        {loadingStatus === "loading" ? null : (
          <h4 className="title subtitle">
            ({outstandingTasks.length} outstanding)
          </h4>
        )}
      </div>

      {loadingStatus === "loading" ? (
        <div>
          <CircularProgress data-testid="tasks-loader" className="tasks-loader" />
          <h3>Loading ...</h3>
        </div>
      ) : (
        <div className="task-list">
          <div className="tasks-options">
            {filtersOpen ? (
              <Button
                variant="outlined"
                onClick={() => setFiltersOpen(false)}
                startIcon={<FilterAltIcon />}
              >
                Hide Filters
              </Button>
            ) : (
              <Button
                variant="outlined"
                onClick={() => setFiltersOpen(true)}
                startIcon={<FilterAltIcon />}
              >
                Show Filters
              </Button>
            )}

            {manageTasksOpen ? (
              <Button
                startIcon={<EditIcon />}
                variant="outlined"
                onClick={() => setManageTasksOpen(false)}
                style={{ marginLeft: "20px" }}
              >
                Close Manage Tasks
              </Button>
            ) : (
              <Button
                startIcon={<EditIcon />}
                variant="outlined"
                onClick={() => setManageTasksOpen(true)}
                style={{ marginLeft: "20px" }}
              >
                Open Manage Tasks
              </Button>
            )}
          </div>

          {manageTasksOpen ? (
            <div>
              <Button
                startIcon={<AddTaskIcon />}
                onClick={() => setModalOpen(true)}
              >
                Add a Task
              </Button>
              <Button
                startIcon={<DoneAllIcon />}
                onClick={handleMarkAllComplete}
              >
                Mark All Complete
              </Button>
              <Button startIcon={<DeleteSweepIcon />} onClick={handleDeleteAll}>
                Delete All
              </Button>
            </div>
          ) : null}

          {filtersOpen ? (
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
          ) : null}

          <div>
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                title={task.title}
                dueDate={task.due}
                done={task.completed}
                handleMarkDone={()=>handleMarkComplete(task)}
                handleDelete={()=>handleDelete(task)}
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
    </div>
  );
};

export default TaskManagement;
