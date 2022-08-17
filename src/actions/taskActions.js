import { Endpoints } from "../utils/Endpoints"

export const taskActions = {
    async getTasks() {
        return fetch(Endpoints.getTasks)
    },
    async getTask(taskId) {
        return ""
    },
    async putTask(taskId){
        return ""
    },
    
}