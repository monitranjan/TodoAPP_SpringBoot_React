import { useEffect, useState } from "react";
import { retrieveAllTodosForUser,deleteTodoApi } from "./api/TodoApiService";
import { useAuth } from "./Security/AuthContext";
import { useNavigate } from "react-router-dom";

function ListTodoComponent() {
    const today = new Date();
    const targetDate = new Date(today.getFullYear()+12,today.getMonth(),today.getDay());
    const [todos,setTodos] = useState([]);
    const [message,setMessage] = useState('');
    const authContext = useAuth();
    const navigate = useNavigate();
    // const todos = [
    //     { id: 1, description: 'Learn React',done:false,targetDate: targetDate},
    //     { id: 2, description: 'Learn Spring boot',done:false,targetDate: targetDate},
    //     { id: 3, description: 'Learn Full Stack',done:false,targetDate: targetDate}
    // ]

    useEffect(()=>refreshTodos(),[])

    function refreshTodos(){
        retrieveAllTodosForUser(authContext.username).then((response)=>setTodos(response.data)).catch((error)=> console.log(error))
    }

    function deleteTodo(id){
        deleteTodoApi(authContext.username,id).then((response)=>{
            setMessage(`Delete of todo with ${id} completed successfully`);
            refreshTodos();
        }).catch((error)=>{console.log(error);});
    }

    function updateTodo(id){
        navigate(`/todos/${id}`);
        console.log(id)
    }

    function addNewTodo(){
        navigate(`/todos/-1`)
    }

    return (

        <div className="container">
            <h1>Things you want to do!!</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Description</td>
                            <td>Is Done?</td>
                            <td>Target Date</td>
                            <td>Update</td>
                            <td>Delete</td>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                todos.map((todo) => (
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.completed.toString()}</td>
                                        <td>{todo.targetDate}</td>
                                        <td><button className="btn btn-success" onClick={()=>updateTodo(todo.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={()=>deleteTodo(todo.id)}>Delete</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                </table>
            </div>
            <button className="btn btn-success" onClick={addNewTodo}>Add new todo</button>
        </div>
    )
}

export default ListTodoComponent;