import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Security/AuthContext";


function LoginComponent() {
    const [username,setUsername] =useState('');
    const [password,setPassword] =useState('');
    const [showsuccess,setShowSuccess] =useState(false);
    const [showError,setshowError] =useState(false);
    const navigate = useNavigate();
    const authContext = useAuth();


    function handleUsernameChange(event){
        setUsername(event.target.value);
    }

    function handlePasswordChange(event){
        setPassword(event.target.value)
    }

    async function handleSubmit(){
        if(await authContext.login(username,password)){
            setShowSuccess(true);
            setshowError(false);
            navigate(`/welcome/${username}`);
        }else{
            setShowSuccess(false);
            setshowError(true);
        }
    }

    function SuccessMsgComponent(){
        if(showsuccess){
        return(
            <div className='successmsg' >Authenticated Successfully</div>
        )
    }
    return null
    }
    
    // function ErrorMsgComponent(){
    //     if(showError){
    //     return(
    //         <div className='errormsg' >Authentication Failed. Please check your credentials.</div>
    //     )
    // }
    // return null
    // }

    return (<div>
        <h1>Time to Login</h1>
        <div className="Login">
            <SuccessMsgComponent/>
            {showError && <div className='errormsg' >Authentication Failed. Please check your credentials.</div>}
            <div className="Loginform">
                <div>
                    <label>User Name</label>
                    <input type="text" name="username" value={username} onChange = {handleUsernameChange} placeholder="Enter your username"/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password"  value={password} onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button type="button" name="Login" onClick={handleSubmit}>
                        Login
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
}

export default LoginComponent