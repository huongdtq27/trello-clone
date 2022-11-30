export const tasks = [
  { id: 1, title: "Init Project", description: "init project" },
  { id: 2, title: "Set Initial State", description: "set initial state" },
  { id: 3, title: "Create Slice", description: "create slice" },
  { id: 4, title: "Implement Board", description: "Implement board" },
];
export const columns = [
  { id: "column1", title: "TO DO", listTaskId: [1, 2] },
  { id: "column2", title: "IN PROGRESS", listTaskId: [3] },
  { id: "column3", title: "DONE", listTaskId: [4] },
];
export const columnOrder = ["column1", "column2", "column3"];
