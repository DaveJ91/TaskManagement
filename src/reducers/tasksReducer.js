export const tasksReducer = (state, action) => {
    let newState = [...state];
    const index = state.findIndex(task=>task.id===action.taskId)??"";

    switch (action.type) {

        case "MARK_DONE":
            newState[index].completed=true;
            return newState;

        case "MARK_ALL_COMPLETE":
            return newState.map(task=>{return{...task, completed:true}})

        case "ADD_TASKS":
            return newState.concat(action.tasks);

        case "DELETE_TASK":
            console.log("clcik dle")
            newState[index].dismissed=true;
            return newState;

        case "DELETE_ALL_TASKS":
            return [];

        default:
            return newState.map(task=>{return{...task, dismissed:true}})
            
    }
}