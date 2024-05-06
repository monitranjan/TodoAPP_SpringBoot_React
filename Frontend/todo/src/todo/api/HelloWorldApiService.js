import axios from "axios";

// export function callHelloworldApiService(){
//     return axios.get("http://localhost:8080/hello-world");
// }
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/'
});
export const retrieveHelloWorldBeanService =()=> apiClient.get('/hello-world-bean');
export const retrieveHelloWorldPathVariable =(username)=> apiClient.get(`/hello-world/path-variable/${username}`,{
    headers:{
        // Authorization: 'Basic bW9uaXQ6dGVzdA=='
    }
});

