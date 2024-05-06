import { createContext, useContext, useState } from "react";
import {executeBasicAuthenticationService } from "../api/TodoApiService";
import { apiClient } from "../api/ApiClient";

export const AuthContext = createContext();
export const useAuth = () =>useContext(AuthContext);
export default function AuthProvider({children}){
    const [isAuthenticated,setAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState(null);
    const valueToBeShared ={isAuthenticated,setAuthenticated,login,logout,username,token}
    // function login(username,password){
    //     if(username ==='monit' && password ==='test'){
    //         setAuthenticated(true);
    //         setUsername(username)
    //         return true;
    //     }else{
    //         setAuthenticated(false);
    //         setUsername(null);
    //         return false;
    //     }
    // }

    async function login(username, password) {
        const baToken = 'Basic ' + window.btoa(username + ":" + password);
        try {
            const response = await executeBasicAuthenticationService(baToken)
            if (response.status == 200) {
                setAuthenticated(true);
                setUsername(username)
                setToken(baToken)

                apiClient.interceptors.request.use(
                    (config) =>{
                        console.log('intercepting the token')
                        config.headers.Authorization = baToken;
                        return config
                    }
                )
                return true;
            } else {
                logout();
                return false;
            }
        } catch (error){
            console.log(error);
            logout();
            return false;
        }
    }

    function logout(){
        setAuthenticated(false);
        setUsername(null);
        setToken(null);
    }

    return(
        <AuthContext.Provider value={valueToBeShared}>
            {children}
        </AuthContext.Provider>
    )
}