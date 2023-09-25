import { useState } from "react";
import { closeModel, entry, formatDateToString, createTask } from "./Library";

export function New(props) {

    const [titleLength, setTitleLength] = useState(0);
    const [desLength, setDesLength] = useState(0);
    
    const newTask =(e)=> {
        const name_ = e.target.name;
        let v_ = e.target.value;

        if(name_ === "title"){
            setTitleLength(v_.length);
        }

        if(name_ === "description"){
            setDesLength(v_.length);
        }

        // if(name_ === "status"){
            
        // }

        if(name_ === "dueDate"){
            v_ = new Date(v_);
        }

        if(name_ === "levelOfPriority"){
            v_ = Number(v_);
        }

        entry[name_] = v_;
    }

    const postTask = ()=> {
        createTask(entry).then(r=> {
            console.log("Task created successfully! ", r);
            props.refreshTask(Math.random() * 125 * Math.random());
        }).catch(e=>console.log("Error happened at posting new task: ", e));

        closeModel("new-model");
    }
    
    return (
        <div className="model-container">
            <header class="header">
                <div className="model-title">New Task</div>
            </header>
            <div className="mt-15">
                <label htmlFor="Title_n">Title</label> <br />
                <input type="text" id="Title_n" maxLength={150} className="mt-5" name="title"  onChange={newTask}/>
                <span className="ms-10">{titleLength} / 150</span>
            </div>
            <div className="mt-15">
                <label htmlFor="Description_n">Description</label> <br/>
                <textarea id="Description_n" maxLength={400} className="mt-5" name="description" onChange={newTask} cols={100} rows={10}></textarea> <br />
                <span className='float-right me-10'>{desLength} / 400</span>
            </div><br />
            <div className="row mt-25">
                <div>
                    <label htmlFor="LevelOfPriority_n">Level Of Priority</label>
                    <select name="levelOfPriority" id="LevelOfPriority_n" onChange={newTask} defaultValue={2}>
                        <option value={5}>Very High</option>
                        <option value={4}>High</option>
                        <option value={3}>Medium</option>
                        <option value={2}>Normal</option>
                        <option value={1}>Low</option>
                        <option value={0}>Very Low</option>
                    </select>
                </div>
                <div className="ms-10">
                    <label htmlFor="Status_n">Status</label>
                    <select name="status" id="Status_n" onChange={newTask} defaultValue={""}>
                        <option value="" disabled>Status</option>
                        <option value="Default" >Default</option>
                        <option value="Not Started" >Not Started</option>
                        <option value="In Progress" >In Progress</option>
                        <option value="Completed" >Completed</option>
                    </select>
                </div>
            </div>
            <div className="row mt-15">
                <div>
                    <label htmlFor="DueDate_n">Due Date</label>
                    <input type="date" id="DueDate_n" name="dueDate" defaultValue={formatDateToString()} onChange={newTask}/>
                </div>
            </div>

            <div className="row justify-btw model-action-container mt-15">
                <div className="btn" onClick={()=> closeModel("new-model")}>Cancel</div>
                <div className="btn" onClick={postTask}>Add</div>
            </div>

        </div>
    )
}