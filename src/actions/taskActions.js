import { Endpoints } from "../utils/Endpoints"

export const taskActions = {
    getTasks() {
        return fetch(Endpoints.getTasks(), {
            method: "GET"
        })
    },
    async postTask(task){
        return fetch(Endpoints.postTask(), {
            method: "POST",
            headers:{
                'Content-type':'application/json',
            },
            body: JSON.stringify(task)
        })
    },
    async putTask(task){
        return fetch(Endpoints.putTask(task.id), {
            method: "PUT",
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify(task)
        })
    },

    
}