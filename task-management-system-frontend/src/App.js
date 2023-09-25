import { Edit } from "./components/EditTask";
import { Delete } from "./components/DeleteTask";
import { New } from "./components/NewTask";
import { useEffect, useState } from "react";
import { Task } from "./components/Task";
import { getDefault, openModel, filter, getTasks, notifyUser } from "./components/Library";

function App() {

    const [dataList, setDataList] = useState([]);

    const [refreshData, setRefreshData] = useState(0);
    const [stateListener, setStateListener] = useState(0);

    // filter tasks
    const filterTask = (e) => {
        let name_ = e.target.name;
        let v_ = e.target.value;
    
        if (name_ === "All" || name_ === "Done" || name_ === "Deleted") {
          v_ = e.target.checked;
          filter[name_] = v_;
        }
    
        if (name_ === "period") {
          // 1 = today, 2 = this week, 3 = last week
          let sd_ = new Date(), ed_ = new Date();
          const dayNum = sd_.getDay();
    
          if (v_ === "1") {
            sd_.setDate(dayNum - 1);
          }
    
          if (v_ === "2") {
            let startDaysInSec = (dayNum - 1) * 24 * 60 * 60 * 1000;
            let endDaysInSec = (7 - dayNum) * 24 * 60 * 60 * 1000;
    
            sd_ = new Date(Date.now() - startDaysInSec);
            ed_ = new Date(Date.now() + endDaysInSec);
          }
    
          if (v_ === "3") {
            let startDaysInSec = dayNum * 24 * 60 * 60 * 1000;
            let endDaysInSec = (6 + dayNum) * 24 * 60 * 60 * 1000;
    
            ed_ = new Date(Date.now() - startDaysInSec);
            sd_ = new Date(Date.now() - endDaysInSec);
          }
    
          filter.StartDate = v_ === '4' ? null : sd_;
          filter.EndDate = v_ === '4' ? null : ed_;
          filter.SpecifiedDate = null;
        }
    
        if (name_ === "SpecifiedDate") {
          filter.SpecifiedDate = new Date(v_);
          filter.StartDate = null;
          filter.EndDate = null;
        }
    
        if (name_ === "LevelOfPriority") {
          filter.LevelOfPriority = Number(v_) === 6 ? null : Number(v_);
        }

        if (name_ === "Status") {
            filter.Status = String(v_) === 'reset' ? null : String(v_);
        }

        console.log("Filtered Object: ", filter);
    
        // fetch data with filter
        getTasks(filter).then(r => {
          if (r.length < 1) {
            notifyUser("Filter Result is Empty!");
          }
          setDataList(r);
        }).catch(e => console.log("Error in getting data on filter: ", e));
    }

    useEffect(() => {
        getDefault().then(data => {
            setDataList(data)
        }).catch(e => console.log("Error inside home page: ", e));
    },[refreshData]);
    
    return (
        <main>
            <header class="header">
                <h1>Task Management System</h1>
                <p>This Web Application helps you to manage your Tasks very easily.</p>
            </header>
            <div className="add-btn row items-center content-center">
                <label className="add-btn txt"> Add New Task </label>
                <div className="btn add" onClick={() => openModel("new-model")}>+</div>
            </div>

            <div className="notifications spacer-20"></div>

            <section className="row justify-btw items-center filter">
                <div className="model-title ms-10">Filters</div>
                <div className="row items-center filter-items">
                    <button className="me-15 btn-clearFilters" onClick={()=> window.location.reload()} >Clear Filters</button>
                    <div>
                        <label htmlFor="All_f">All</label> <br />
                        <input type="checkbox" id="All_f" name="All" onChange={filterTask} />
                    </div>
                    <div>
                        <label htmlFor="Done_f">Done</label> <br />
                        <input type="checkbox" id="Done_f" name="Done" onChange={filterTask} />
                    </div>
                    <div>
                        <label htmlFor="Deleted_f">Deleted</label> <br />
                        <input type="checkbox" id="Deleted_f" name="Deleted" onChange={filterTask} />
                    </div>
                    <div>
                        <label htmlFor="period">Time Period</label> <br/>
                        <select name="period" id="period" defaultValue={"4"} onChange={filterTask}>
                            <option value="5" disabled>Period</option>
                            <option value="4" >Default</option>
                            <option value="1" >Today</option>
                            <option value="2" >This week</option>
                            <option value="3" >Last week</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="DueDate">Due Date</label> <br />
                        <input type="date" id="DueDate" name="SpecifiedDate" onChange={filterTask} />
                    </div>
                    <div>
                        <label htmlFor="LevelOfPriority_f">Level Of Priority</label> <br/>
                        <select name="LevelOfPriority" id="LevelOfPriority_f" defaultValue={"7"} onChange={filterTask}>
                            <option value={7} disabled>Level Of Priority</option>
                            <option value={6} >Reset</option>
                            <option value={5} >Very High</option>
                            <option value={4} >High</option>
                            <option value={3} >Medium</option>
                            <option value={2} >Normal</option>
                            <option value={1} >Low</option>
                            <option value={0} >Very Low</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="Status_f">Status</label> <br/>
                        <select name="Status" id="Status_f" defaultValue={""} onChange={filterTask}>
                            <option value="" disabled>Status</option>
                            <option value="reset">Reset</option>
                            <option value="Not Started" >Not Started</option>
                            <option value="In Progress" >In Progress</option>
                            <option value="Completed" >Completed</option>
                        </select>
                    </div>
                </div>
            </section>

            <div className="row underline hdr">
                <div className="column id">#</div>
                <div className="column title">Title</div>
                <div className="column description">Description</div>
                <div className="column levelOfPriority">Priority</div>
                <div className="column status">Status</div>
                <div className="column dueDate">Due Date</div>
                <div className="column edit">Edit</div>
                <div className="column delete">Delete</div>
            </div>

            {
                dataList.length === 0 ?
                    <div className="row mt-15 waiting">Loading <div className="loading">...</div></div> : 
                    dataList.map(item=><Task item={item} key={item.id} stateListener={setStateListener} />)
            }
            <section>
                <section className="model new-model hidden">
                    <New refreshTask={setRefreshData} />
                </section>
                <section className="model edit-model hidden">
                    <Edit stateListener={stateListener} refreshTask={setRefreshData} />
                </section>
                <section className="model delete-model hidden">
                    <Delete stateListener={stateListener} refreshTask={setRefreshData} />
                </section>
            </section>
        </main>
    )
}

export default App;