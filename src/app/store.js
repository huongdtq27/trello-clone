import { configureStore } from '@reduxjs/toolkit';
import taskSlice from "../components/taskSlice";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    board: taskSlice,
  },
});
