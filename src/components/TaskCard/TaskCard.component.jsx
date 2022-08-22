import React from "react";
import "./TaskCard.styles.css";
import moment from "moment";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const TaskCard = (props) => {
  const CardStyle = {
    backgroundColor: props.done ? "inherit" : "white",
    boxShadow: props.done
      ? "none"
      : "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    border: props.done ? ".5px solid lightgrey" : "none",
  };

  const iconStyle = {
    color: props.done ? "grey" : "#3f9",
  };
  const formattedDate = moment(props.dueDate).format("DD-MM-YYYY");

  return (
    <div className="card" data-testid="task-card" style={CardStyle}>
      <TaskAltIcon style={iconStyle} className="icon" />
      <span
        className="card-text"
        style={{ textDecoration: props.done ? "line-through" : "none" }}
      >
        <p className="card-title">{props.title} &middot; </p>
        <p className="card-subtitle">Due: {formattedDate} </p>
      </span>

      <DeleteOutlinedIcon
        onClick={() => props.handleDelete(props.id)}
        className="icon"
      />
      {props.done ? (
        <CheckBoxIcon className="icon" />
      ) : (
        <CheckBoxOutlineBlankIcon
          onClick={() => props.handleMarkDone(props.id)}
          className="icon"
        />
      )}
    </div>
  );
};

export default TaskCard;
