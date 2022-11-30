import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "./index.css";

const Task = (props) => {
  return (
    <Draggable
      key={`drag-task-${props.task.id}`}
      draggableId={`drag-task-${props.task.id}`}
      index={props.index}
    >
      {(provided) => (
        <div
          className="drag-task-item"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}
        >
          {props.task.title}
        </div>
      )}
    </Draggable>
  );
};
export default Task;
