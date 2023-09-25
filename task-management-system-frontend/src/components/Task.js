import { activeId, entry, openModel } from "./Library";

export function Task(props) {

    const handlingEdit = (row)=>{
        Object.assign(entry, row);
        // update state
        props.stateListener(Math.random() * 548 * Math.random());
        //open edit model
        openModel("edit-model");
    }

    const handlingDelete = (id) =>{
        activeId.id = id
        // update state
        props.stateListener(Math.random() * 848 * Math.random());
        //open edit model
        openModel("delete-model");
    }
    
    const LevelOfPriority = ["Very Low", "Low", "Normal", "Medium", "High", "Very High"];
    
    return (
        <div className={`row py-5 underline ${props.item.deleted ? ' bc-red' : props.item.done ? ' bc-green' : ''}`} key={props.item.id}>
            <div className="column id">{props.item.id}</div>
            <div className="column title">{props.item.title}</div>
            <div className="column description">{props.item.description}</div>
            <div className={`column levelOfPriority ${props.item.levelOfPriority === 0 ? ' bc-green' : 
            props.item.levelOfPriority === 4 ? ' bc-gold' : props.item.levelOfPriority === 5 ? ' bc-red' : ''}`}>{LevelOfPriority[props.item.levelOfPriority]}</div>
            <div className="column status">{props.item.status}</div>
            <div className="column dueDate">{props.item.dueDate.split("T")[0]}</div>
            <div className="column edit">
                <div className="btn edit" onClick={()=> handlingEdit(props.item)}>Edit</div>
            </div>
            <div className={`column delete ${props.item.deleted ? ' not-allowed' : ''}`}>
                <div className={`btn delete ${props.item.deleted ? ' no-event' : ''}`} onClick={()=> handlingDelete(props.item.id)}>Delete</div>
            </div>
        </div>
    )
}