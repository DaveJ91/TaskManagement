import { Endpoints } from "../utils/Endpoints"

export const taskActions = {
    async getTasks() {
        return fetch(Endpoints.getTasks(), {
            method: "GET"
        })
    },
    async getTask(taskId) {
        return ""
    },
    async putTask(taskId, task){
        return fetch(Endpoints.putTask(taskId), {
            method: "PUT",
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify(task)
        })
    },
    
}