import React, { useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import Column from "../Column/index";
import {
  columnOrder as mockColumnOrder,
  columns as mockColumns,
  tasks as mockListAllTask,
} from "../dataset";
import { reOrderList } from "../helper";
import {
  allTasks,
  columnOrder,
  columns,
  dragColumns,
  dragTaskDifferentColumn,
  dragTasksSameColumn,
  setAllColumns,
  setAllTasks,
  setColumnOrder,
} from "../taskSlice";
import "./index.css";

const Board = () => {
  const listColumnData = useSelector(columns);
  const listColumnOrder = useSelector(columnOrder);
  const listAllTasks = useSelector(allTasks);

  const dispatch = useDispatch();

  useEffect(() => {
    //milo set mock data
    dispatch(setAllColumns(mockColumns));
    dispatch(setColumnOrder(mockColumnOrder));
    dispatch(setAllTasks(mockListAllTask));
  }, []);

  const dragColumn = (startIndex, endIndex) => {
    const newOrderColumns = reOrderList(listColumnOrder, startIndex, endIndex);
    dispatch(dragColumns(newOrderColumns));
  };

  const dragTasksInSameColumn = (droppableId, startIndex, endIndex) => {
    const columnId = droppableId.split("-")[2];
    const indexOfColumn = listColumnData.findIndex(
      (item) => item.id === columnId
    );
    if (indexOfColumn === -1) {
      return;
    }
    const currentColumn = listColumnData[indexOfColumn];
    const orderedTasks = reOrderList(
      currentColumn.listTaskId,
      startIndex,
      endIndex
    );
    const newColumns = [...listColumnData];
    newColumns[indexOfColumn] = {
      ...currentColumn,
      listTaskId: orderedTasks,
    };

    dispatch(dragTasksSameColumn(newColumns));
  };

  const dragTaskToDifferentColumn = (source, destination) => {
    const startColumnId = source.droppableId.split("-")[2];
    const startColumnIndex = listColumnData.findIndex(
      (item) => item.id === startColumnId
    );
    const startColumnData = listColumnData[startColumnIndex];
    const startColumnTasks = Array.from(startColumnData.listTaskId);
    startColumnTasks.splice(source.index, 1);

    const endColumnId = destination.droppableId.split("-")[2];
    const endColumnIndex = listColumnData.findIndex(
      (item) => item.id === endColumnId
    );
    const endColumnData = listColumnData[endColumnIndex];
    const endColumnTasks = Array.from(endColumnData.listTaskId);
    const dragTaskFromStartColumn = startColumnData.listTaskId[source.index];
    endColumnTasks.splice(destination.index, 0, dragTaskFromStartColumn);

    const newListColumnData = [...listColumnData];
    newListColumnData[startColumnIndex] = {
      ...startColumnData,
      listTaskId: startColumnTasks,
    };
    newListColumnData[endColumnIndex] = {
      ...endColumnData,
      listTaskId: endColumnTasks,
    };

    dispatch(dragTaskDifferentColumn(newListColumnData));
  };

  const onDragEnd = (result) => {
    const { destination, source, type } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }
    if (type === "column") {
      dragColumn(source.index, destination.index);
      return;
    }
    if (source.droppableId === destination.droppableId) {
      dragTasksInSameColumn(
        source.droppableId,
        source.index,
        destination.index
      );
      return;
    }
    dragTaskToDifferentColumn(source, destination);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId={`drag-board`}
        direction="horizontal"
        type="column"
      >
        {(provided, snapshot) => (
          <div
            className="list-column"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {listColumnOrder.map((columnId, index) => {
              const columnItem = listColumnData.find(
                (item) => item.id === columnId
              );
              const columnTasks = columnItem.listTaskId.map((taskId) =>
                listAllTasks.find((taskItem) => taskItem.id === taskId)
              );
              return (
                <Draggable
                  key={`column-${columnId}`}
                  draggableId={`column-${columnId}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="column-item"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Column
                        key={columnItem.id}
                        column={columnItem}
                        tasks={columnTasks}
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* {listColumnOrder.map((columnId) => {
          const columnItem = listColumnData.find(
            (item) => item.id === columnId
          );
          const columnTasks = columnItem.listTaskId.map((taskId) =>
            listAllTasks.find((taskItem) => taskItem.id === taskId)
          );

          return (
            <Column
              key={columnItem.id}
              column={columnItem}
              tasks={columnTasks}
            />
          );
        })} */}
    </DragDropContext>
  );
};

export default Board;
