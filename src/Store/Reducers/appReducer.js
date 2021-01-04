let initialState = {
  taskToDo: [],
  taskCompleted: [],
};

const appReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case 'ADD_TASK':
      return {...state, taskToDo: [...state.taskToDo, actions.task]};
    case 'COMPLETE_TASK':
      let arr = state.taskToDo;
      const task = arr[actions.index];
      arr.splice(actions.index, 1);
      return {
        ...state,
        taskToDo: arr,
        taskCompleted: [...state.taskCompleted, task],
      };
    case 'REDO_TASK':
      arr = state.taskCompleted;
      const redo = arr[actions.index];
      arr.splice(actions.index, 1);
      return {
        ...state,
        taskToDo: [...state.taskToDo, redo],
        taskCompleted: arr,
      };
    case 'DELETE_TASK':
      if (actions.arraySelector) {
        arr = state.taskToDo;
        arr.splice(actions.index, 1);
        return {
          ...state,
          taskToDo: arr,
        };
      } else {
        arr = state.taskCompleted;
        arr.splice(actions.index, 1);
        return {
          ...state,
          taskCompleted: arr,
        };
      }

    default:
      return state;
  }
};
export default appReducer;
