import { apiClient } from "./ApiClient";

export const executeBasicAuthenticationService=(token) =>apiClient.get(`/basicAuthCheck`,{
    headers:{
        Authorization: token
    }
})
export const retrieveAllTodosForUser =(username)=> apiClient.get(`/users/${username}/todos`);
export const deleteTodoApi =(username,id)=> apiClient.delete(`/users/${username}/todos/${id}`);
export const updateTodoApi =(username,id,todo)=> apiClient.put(`/users/${username}/todos/${id}`,todo);
export const retieveTodoApi =(username,id)=> apiClient.get(`/users/${username}/todos/${id}`);
export const createTodoApi =(username,todo)=> apiClient.post(`/users/${username}/todos/`,todo);