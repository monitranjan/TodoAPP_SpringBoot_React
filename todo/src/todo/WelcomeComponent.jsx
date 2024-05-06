import { useParams,Link } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";
import {callHelloworldApiService }from "./api/HelloWorldApiService";
import {retrieveHelloWorldBeanService, retrieveHelloWorldPathVariable} from "./api/HelloWorldApiService"

export default function WelcomeComponent() {
    function callHelloworldApi(){
        // retrieveHelloWorldBeanService().then((response)=>successfulResponse(response)).catch((error)=>errorResponse(error)).finally(()=>console.log("cleanup"));

        retrieveHelloWorldPathVariable('monit').then((response)=>successfulResponse(response)).catch((error)=>errorResponse(error)).finally(()=>console.log("cleanup"));

    }

    function successfulResponse(response){
        console.log(response);
        setMessage(response.data.message);
    }

    function errorResponse(error){
        console.log(error);
    }

    const {username} = useParams();
    const [message,setMessage] = useState(null);

    return (
        <div>
            <h1>Welcome {username} </h1>
            <div className="welcome">Welcome component</div>
            <div>
                Manage Your Todos - <Link to='/todos'>Go here </Link>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={callHelloworldApi}>Call Hello world</button>
            </div>
            <div className="text-info">{message}</div>
        </div>
    )
}