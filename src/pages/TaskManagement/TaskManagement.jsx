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

export const TaskManagement = () => {
  const { tasks, dispatch, loadingStatus } = useTasks();
  const [modalOpen, setModalOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("all");

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleMarkDone = (taskId) => {
    dispatch({
      type: "MARK_DONE",
      taskId,
    });
  };

  const handleMarkAllComplete = () => {
    dispatch({
      type: "MARK_ALL_COMPLETE",
    });
  };

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

    // add completed date and who completed it

    //POST request
    taskActions.postTask(task).then((res) => console.log(res));

    setModalOpen(false);
  };

  const outstandingTasks = tasks.filter((t) => t.completed === false);
  const completedTasks = tasks.filter((t) => t.completed === true);

  let filteredTasks;

  switch (filterValue) {
    case "all":
      filteredTasks = tasks;
      break;
    case "completed":
      filteredTasks = completedTasks;
      break;
    case "outstanding":
      filteredTasks = outstandingTasks;
      break;
  }

  return (
    <div className="tasks-container">
        <h1>My Tasks</h1>
        <h4>{outstandingTasks.length} outstanding tasks</h4>
      <Button onClick={handleClick}>Add Task</Button>
      <Button onClick={handleMarkAllComplete}>Mark All Complete</Button>
      <Button onClick={handleDeleteAll}>Delete All</Button>

      <div>
        <ToggleButtonGroup
          color="primary"
          value={filterValue}
          exclusive
          onChange={(e) => setFilterValue(e.target.value)}
          aria-label="Platform"
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="outstanding">Outstanding</ToggleButton>
          <ToggleButton value="completed">Completed</ToggleButton>
        </ToggleButtonGroup>
      </div>

      {loadingStatus === "loading" ? (
        <CircularProgress />
      ) : (
        <div>
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              dueDate={task.due}
              done={task.completed}
              handleMarkDone={handleMarkDone}
              id={task.id}
            />
          ))}
        </div>
      )}
      <AddTaskModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        addTask={addTask}
      />
    </div>
  );
};
