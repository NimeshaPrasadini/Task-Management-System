import { useEffect } from "react";
import { activeId, closeModel, deleteTask } from "./Library";

// Delete Task
export function Delete(props) {

    const deleteTasks = () => {
        deleteTask(activeId.id).then(r=> {
            console.log("Task Deleted Successfully")
            props.refreshTask(Math.random() * 248 * Math.random())
        })
        .catch(e=>console.log("Couldn't delete the task: ", e));

        closeModel("delete-model");
    }
    
    useEffect(()=>{
        console.log("Delete component");

    }, [props.stateListener])
    
    return (
        <div className="model-container">
            <header class="header">
                <div className="model-title">Warning on Deleting the Task</div>
            </header>
            <p>Are you sure you want to delete the Task?</p>

            <div className="row justify-btw model-action-container mt-15">
                <div className="btn" onClick={()=>closeModel("delete-model")}>Cancel</div>
                <div className="btn" onClick={deleteTasks}>Yes</div>
            </div>
        </div>
    )
}