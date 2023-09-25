export const testData = [
    {Id:1, Title:"Test Title", Description:"Test Description", LevelOfPriority: 2, Status: "Not Started", DueDate: "14-10-2023"},
    {Id:2, Title:"Test Title 2", Description:"Test Description", LevelOfPriority: 3, Status: "In Progress", DueDate: "15-10-2023"},
    {Id:3, Title:"Test Title 3", Description:"Test Description", LevelOfPriority: 1, Status: "Completed", DueDate: "16-10-2023"},
    {Id:4, Title:"Test Title 4", Description:"Test Description", LevelOfPriority: 4, Status: "In Progress", DueDate: "17-10-2023"},
]

export const entry = {
    title: "Test title",
    description: "Test description",
    dueDate: new Date(),
    levelOfPriority: 2,
    status: "Not Started",
    done: false,
    deleted: false,
};

export const filter = {
    LevelOfPriority: null,
    All: false,
    Deleted: false,
    Done: false,
    Status: null,
    SpecifiedDate: null,
    StartDate: null,
    EndDate: null,
    //DueDate: null
};

export const activeId = {
    id: 0
};

const url = "api/task";

export async function getDefault(){
    const res = await fetch(url);

    if(!res.ok && res.status !== 200){
        console.log("Not loading default data: ", res);
        notifyUser("Something went wrong, please refresh the page.");
        return [];
    }

    const result = await res.json();
    return result;
}

export function notifyUser(msg){
    const notificationEl = document.querySelector(".notifications");
    notificationEl.innerHTML = msg ? msg : "";
    if(msg)
        setTimeout(() => {
            notificationEl.innerHTML = ""
        }, 12000);
}

export function openModel(model){
    const model_ = document.querySelector("."+model);
    if(model_){
        model_.classList.remove("hidden");
    }
}

export function closeModel(model){
    const model_ = document.querySelector("."+model);
    if(model_){
        model_.classList.add("hidden");
    }
}

export function formatDateToString(d){
    const nd = d ? new Date(d) : new Date()
    const month_ = nd.getMonth() + 1;
    const monthStr = month_ > 9 ? month_ : 0 + "" + month_;
    const day_ = nd.getDate() > 9 ? nd.getDate() : 0 + "" + nd.getDate();
    return nd.getFullYear() + "-" + monthStr + "-" + day_;
}

export async function getTasks(filter_){
    const res = await fetch(url + "/filters",{
        method: "POST",
        body: JSON.stringify(filter_),
        headers: {
            "content-type": "application/json"
        }
    })

    if(!res.ok){
        console.log("Error in getting tasks with filters: ", res);
        notifyUser("Something went wrong, please clear the filters and try again.");
        return [];
    }

    return await res.json();
}

export async function createTask(newTask){
    const res = await fetch(url,{
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
            "content-type": "application/json"
        }
    });

    if(!res.ok){
        console.log("Error in creating new Task: ", res);
        notifyUser("Sorry, the new task cannot be created, please try again.");
        return {msg: res};
    }

    return await res.json();
}

export async function updateTask(updateTask){
    const res = await fetch(url + "/" + updateTask.id,{
        method: "PUT",
        body: JSON.stringify(updateTask),
        headers: {
            "content-type": "application/json"
        }
    });

    if(!res.ok){
        console.log("Error in updating task: ", res);
        notifyUser("Sorry, your task cannot be updated, please try again.");
        return {msg: res};
    }

    return res;
}

export async function deleteTask(id){
    const res = await fetch(url + "/" + id, {
        method: "DELETE"
    })

    if(!res.ok){
        console.log("Error in deleting task: ", res);
        notifyUser("Something went wrong, please refresh the page.");
        return {msg: res};
    }

    return res;
}


