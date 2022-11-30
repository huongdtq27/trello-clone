import { createSlice } from "@reduxjs/toolkit";
import { reOrderList } from "./helper";

const initialState = {
  allTasks: [],
  columns: [],
  columnOrder: [],
  currTaskIdToEdit: "",
  currColIdToEdit: "",
  isDialogOpen: false,
};

export const taskSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setAllTasks: (state, action) => {
      state.allTasks = action.payload;
    },
    setAllColumns: (state, action) => {
      state.columns = action.payload;
    },
    setColumnOrder: (state, action) => {
      state.columnOrder = action.payload;
    },
    dragColumns: (state, action) => {
      state.columnOrder = action.payload;
    },
    dragTasksSameColumn: (state, action) => {
      state.columns = action.payload;
    },
    dragTaskDifferentColumn: (state, action) => {
      state.columns = action.payload;
    },
  },
});

export const {
  setAllTasks,
  setAllColumns,
  setColumnOrder,
  dragColumns,
  dragTasksSameColumn,
  dragTaskDifferentColumn,
} = taskSlice.actions;

export const allTasks = (state) => state.board.allTasks;
export const columns = (state) => state.board.columns;
export const columnOrder = (state) => state.board.columnOrder;
export const currentColumn = (state) => state.board.currentColumn;
export const destinationColumn = (state) => state.board.destinationColumn;
export const board = (state) => state.board;

export default taskSlice.reducer;
