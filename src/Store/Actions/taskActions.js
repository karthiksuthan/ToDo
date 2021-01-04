export const addTask = (task) => {
  return {
    type: 'ADD_TASK',
    task: task,
  };
};

export const completeTask = (index) => {
  return {
    type: 'COMPLETE_TASK',
    index: index,
  };
};

export const redoTask = (index) => {
  return {
    type: 'REDO_TASK',
    index,
  };
};

export const deleteTask = (index, arraySelector) => {
  return {
    type: 'DELETE_TASK',
    index,
    arraySelector,
  };
};
