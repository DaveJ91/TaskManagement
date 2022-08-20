export const tasksReducer = (state, action) => {
    let newState = [...state];

    switch (action.type) {

        case "MARK_DONE":
            const index = state.findIndex(task=>task.id===action.taskId);
            newState[index].completed=true;
            return newState;

        case "MARK_ALL_COMPLETE":
            return newState.map(task=>{return{...task, completed:true}})

        case "ADD_TASKS":
            return newState.concat(action.tasks);

        case "DELETE_ALL_TASKS":
            return [];

        default:
            return state;
            
    }
}