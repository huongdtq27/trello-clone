import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import "./index.css";

const Column = (props) => {
  return (
    <div className="board-column">
      <div className="board-column-title">{props.column.title}</div>
      <Droppable droppableId={`drag-column-${props.column.id}`} type="task">
        {(provided, snapshot) => (
          <div
            className="task-item-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {props.tasks.map((taskItem, index) => (
              <Draggable
                key={`task-${taskItem.id}`}
                draggableId={`task-${taskItem.id}`}
                index={index}
              >
                {(provided) => (
                  <div
                    className="task-item"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {`${taskItem.id}. ${taskItem.title}`}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
