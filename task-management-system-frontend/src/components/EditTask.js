import { useEffect, useState } from "react";
import { closeModel, entry, updateTask } from "./Library";

// Edit Task
export function Edit(props) {

    const [done_, setDone_] = useState(false);
    const [deleted_, setDeleted_] = useState(false);
    const [priority, setPriority] = useState(0);
    const [data, setData] = useState({});
    
    const editTask =(e)=> {
        const name_ = e.target.name;
        let v_ = e.target.value;

        if(name_ === "done"){
            v_ = e.target.checked;
            setDone_(v_);
        }

        if(name_ === "deleted"){
            v_ = e.target.checked;
            setDeleted_(v_);
        }

        if(name_ === "dueDate"){
            v_ = new Date(v_);
        }

        if(name_ === "levelOfPriority"){
            v_ = Number(v_);
            setPriority(v_);
        }

        entry[name_] = v_;
    }

    const updateTasks = ()=>{
        updateTask(entry).then(r =>{
            console.log("Updated successfully: ", r)
            props.refreshTask(Math.random() * 248 * Math.random())
        })
        .catch(e=>console.log("Couldn't update the task: ", e))
        closeModel("edit-model")
    }

    const defaultDate = typeof(entry.dueDate) === "string" ? entry.dueDate.split("T")[0] : "";
    
    useEffect(()=>{
        console.log("Edit component");
        setDone_(entry.done);
        setDeleted_(entry.deleted);
        setPriority(entry.levelOfPriority);
        setData(entry);
    }, [props.stateListener])
    
    return (
        <div className="model-container">
            <header class="header">
                <div className="model-title">Edit Task</div>
            </header>

            <div className="mt-15">
                <label htmlFor="Title_e">Title</label> <br />
                <input type="text" id="Title_e" maxLength={150} className="mt-5" name="title" defaultValue={data.title} onChange={editTask} />
                <span className="ms-10">0/150</span>
            </div>
            <div className="mt-15">
                <label htmlFor="Description_e">Description</label> <br/>
                <textarea id="Description_e" maxLength={300} className="mt-5" name="description" defaultValue={data.description} cols={100} rows={10} onChange={editTask}></textarea> <br />
                <span className='float-right me-10'>0/300</span>
            </div><br />
            <div className="row mt-25">
                <div>
                    <label htmlFor="LevelOfPriority_e">Level Of Priority</label>
                    <select name="levelOfPriority" id="LevelOfPriority_e" defaultValue={2} value={priority} onChange={editTask}>
                        <option value={5}>Very High</option>
                        <option value={4}>High</option>
                        <option value={3}>Medium</option>
                        <option value={2}>Normal</option>
                        <option value={1}>Low</option>
                        <option value={0}>Very Low</option>
                    </select>
                </div>
                <div className="ms-10">
                    <label htmlFor="Status_e">Status</label>
                    <select name="status" id="Status_e" defaultValue={data.status} onChange={editTask}>
                        <option value="" disabled>Status</option>
                        <option value="Not Started" >Not Started</option>
                        <option value="In Progress" >In Progress</option>
                        <option value="Completed" >Completed</option>
                    </select>
                </div>
            </div>
            <div className="row mt-15 items-center">
                <div>
                    <label htmlFor="DueDate_e">Due Date</label>
                    <input type="date" id="DueDate_e" name="dueDate" onChange={editTask} defaultValue={defaultDate} />
                </div>
                
                <div className="ms-30 row items-center">
                    <label htmlFor="Done_e">Done</label>
                    <input type="checkbox" id="Done_e"  name="done" checked={done_} onChange={editTask} />
                </div>

                <div className="ms-30 row items-center">
                    <label htmlFor="Deleted_e">Deleted</label>
                    <input type="checkbox" id="Deleted_e" name="deleted" checked={deleted_} onChange={editTask} />
                </div>
            </div>

            <div className="row justify-btw model-action-container mt-15">
                <div className="btn" onClick={()=> closeModel("edit-model")}>Cancel</div>
                <div className="btn" onClick={updateTasks}>Update</div>
            </div>

        </div>
    )
}