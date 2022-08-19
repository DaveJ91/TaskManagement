export const tasksReducer = (state, action) => {
    let newState = [...state];

    switch (action.type) {

        case "MARK_DONE":
            const index = state.findIndex(task=>task.id===action.taskId);
            newState[index].completed=true;
            return newState;

        case "ADD_TASKS":
            return newState.concat(action.tasks);

        default:
            return state;
            
    }
}