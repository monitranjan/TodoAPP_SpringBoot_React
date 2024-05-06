import { useParams,useNavigate } from "react-router-dom"
import { useAuth } from "./Security/AuthContext";
import {createTodoApi, retieveTodoApi, updateTodoApi} from './api/TodoApiService';
import { useEffect, useState } from "react";
import {Formik,Form,Field, ErrorMessage} from 'formik';
import moment from 'moment';
export default function TodoComponent(){
    const {id} =useParams();
    const {username} =useAuth();
    const [description,setDescription] = useState('');
    const [targetDate,setTargetDate] = useState('');
    const navigate = useNavigate();
    useEffect(
        ()=>retieveTodo(),[id]
    )

    function retieveTodo(){
        if(id!==-1){
        retieveTodoApi(username,id).then((response)=>{
            setDescription(response.data.description);
            setTargetDate(response.data.targetDate);
            console.log(response)
        }).catch(error=>console.log(error))
    }
    }

    function onSubmit(values){
        const todo = {
            id:id,
            userName:username,
            description:values.description,
            targetDate:values.targetDate,
            done:false
        }
        if(id==-1){
            createTodoApi(username,todo).then((response)=>{
                navigate(`/todos/`);
            }).catch((error)=>console.log(error));
        }else{
        updateTodoApi(username,id,todo).then((response)=>{
            navigate(`/todos/`);
        }).catch((error)=>console.log(error));
    }
    }

    function validate(values){
        let errors={
            // description:'Enter valid description',
            // targetDate:'Enter valid description'
        }
        if(values.description.length<5){
            errors.description ='Enter atleast 5 characters'
        }
        if(values.targetDate == null || values.targetDate===''|| !moment(values.targetDate).isValid()){
            errors.targetDate ='Enter valid target Date'
        }
        return errors;
    }
    return(
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                <Formik initialValues ={{description,targetDate}} enableReinitialize = {true} 
                onSubmit={onSubmit} validate={validate} validateOnBlur={false} validateOnChange={false}>
                    {
                        (props)=>(
                            <Form  >
                                <ErrorMessage name="description" component="div" className="alert alert-warning" />
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning" />
                                <fieldset className="form-group">
                                    <label> Description</label>
                                        <Field type='text' className='form-control' name='description'></Field>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label >Target date</label>
                                        <Field type='date' className='form-control' name='targetDate'></Field>
                                </fieldset>
                                <button className=" btn btn-success m-5" type="submit">save</button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )

}
