import { Checkbox } from "primereact/checkbox";
import React, { Dispatch, useState, useEffect } from "react";
import 'list-to-tree';
import 'array-to-tree';
import { Message } from 'primereact/message';

import 'react-dropdown-tree-select/dist/styles.css'
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { connect } from "react-redux";

import '../../../../src/css/style.css';
import { createBrowserHistory } from "history";
import loaddingFile from '../../../../src/assets/images/tenor.gif';
import { ListBox } from "primereact/listbox";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

interface IAdminScheduleChanges { }
interface IAdminScheduleChanges {
    StaticPage: any;

    state: {
        nodes: [],
        checked: [],
        expanded: []
    }
}
const AdminScheduleChanges: React.FC<IAdminScheduleChanges> = ({



}) => {
    const history = createBrowserHistory();  
    const [spinner, setSpinner] = useState(false);
    const [isSumbmit, setSumbmited] = useState(false);

    const [locationDialog, setLocationDialog] = useState(false);
    const [activityDialog, setActivityDialog] = useState(false);
    const timingSchedule = [
        { label: "15 mins interval", value: "15" },
        { label: "30 mins interval", value: "30" },
        { label: "45 mins interval", value: "45" },
        { label: "60 mins interval", value: "60" }
    ]
   
    const PatientData = {
        patientName: "Chris Hemsforth",
        age: "35",
        overallTiming: "",
        locationCode:"",
        locationList:[
            { label: "Location 1", value: "L1" },
            { label: "Location 2", value: "L2" },
            { label: "Location 3", value: "L3" }
        ],
        activityList:[
            { label: "Activity 1", value: "A1" },
            { label: "Activity 2", value: "A2" },
            { label: "Activity 3", value: "A3" }
        ],
        location: "",
        activityCode:"",
        activity: ""
    }
    let [patientDetails, setPatientDetails] = useState(PatientData);
    let [locationAdd, setLocationAdd] = useState(PatientData.locationList);
    let [activityAdd, setActivityAdd] = useState(PatientData.activityList);

    const handleInputChange = (event: any) => {
        if (event.target.id === "overallTiming") {
            patientDetails.overallTiming = event.target.value;
        } else if (event.target.id === "patientName") {
            patientDetails.patientName = event.target.value;
        } else if (event.target.id === "age") {
            patientDetails.age = event.target.value;
        } else if (event.target.id === "age") {
            patientDetails.age = event.target.value;
        } else if (event.target.id === "location") {
            patientDetails.location = event.target.value;
        } else if (event.target.id === "activity") {
            patientDetails.activity = event.target.value;
        } else if (event.target.id === "locationCode") {
            patientDetails.locationCode = event.target.value;
        } else if (event.target.id === "activityCode") {
            patientDetails.activityCode = event.target.value;
        }
        setPatientDetails({ ...patientDetails });
    }
  

    const handleLocationChanges = (event: any) => {    
        if(patientDetails.locationCode === "" || (patientDetails.locationCode !== "" && patientDetails.location === "")){
            setLocationAdd([...locationAdd]);
            alert("Please Enter Location");
                   }else{
                     locationAdd !== null && locationAdd.map((item,k)=>{
                   if(item.value !== patientDetails.locationCode && item.label !== patientDetails.location){
                setLocationAdd([...locationAdd, {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
                    label: patientDetails.location,
                    value: patientDetails.locationCode
                }])
            }else{
               
                alert("Already Exist Location");   
                setLocationAdd(locationAdd); 
            }  
            setLocationDialog(false);         

        
        })
    }
    }

    const handleActivityChanges = (event: any) => {  
        if(patientDetails.activityCode === ""|| (patientDetails.activityCode !== "" && patientDetails.activity === "")){
            setActivityAdd([...activityAdd]);
            alert("Please Enter Activity");
        }else{
        activityAdd !== null && activityAdd.map((item,k)=>{
            if(item.value !== patientDetails.activityCode){
                setActivityAdd([...activityAdd, {
                    label: patientDetails.activity,
                    value: patientDetails.activityCode && patientDetails.activity

                }])
            }else{

           
                setActivityAdd([...activityAdd]);
                alert("Already Exist Activity");
            } 
            setActivityDialog(false);

        })          
       
    }
    }

    let listOfTiming = timingSchedule.map((item, k) => {
        return (
            <option key={k} value={item.value}>{item.label}</option>
        )
    }, this);

    const handleLocationDialog = (event:any)=>{
        patientDetails.location = "";
        patientDetails.locationCode = "";
        setLocationDialog(true);
    }

    const handleActivityDialog = (event:any)=>{
        patientDetails.activity = "";
        patientDetails.activityCode = "";
        setActivityDialog(true);
    }

    const handleQ15CheckPageChange =()=>{
        window.location.href = "/MettlerSafetyCheck";
    }

    const handleSaveChange =()=>{
    //    console.log(JSON.stringify(patientDetails));
    }
    function requiredMessage(key: string) { return <Message severity="error" key={key} text="Field is required" /> }

    return (
        <div id="removePaddingTop" className="p-grid p-fluid ">
            {spinner &&
                (<div className='overlay-content'>
                    <div className='wrapper'>
                        <img src={loaddingFile} style={{ position: 'absolute', width: '100%', zIndex: 2, opacity: '0.5' }} />
                    </div>
                </div>
                )}
            <div className="p-col-12 p-md-12">
                <h2 className="dashboard-title"><b>Admin Schedule Check</b> </h2>
            </div>
            <div id="removePaddingTop" style={{ fontFamily: "Times New Roman" }} className="p-col-12">
                <div style={{ border: '0px' }} className="card card-w-title">
                    <div className="p-grid">
                        <div id="removePadding" style={{ fontSize: '20px',width:"auto" }} className="p-col-12 p-md-2">
                            Timing Interval
                        </div>
                        <div id="removePadding" style={{ fontSize: '20px' }} className="p-col-12 p-md-3">
                            <select id="overallTiming" name="overallTiming" style={{ width: '90%', height: '34px',  }} onChange={handleInputChange} value={patientDetails.overallTiming} required >
                                <option value="">Select</option>
                                {listOfTiming}
                            </select>
                        </div>
                        <div id="removePadding" className="p-col-12 p-md-2">
                        </div>
                        <div id="removePadding" style={{ textAlign: 'end' }} className="p-col-12 p-md-4">
                            <span style={{ fontSize: '22px' }}><b>Patient Label:&nbsp;&nbsp;</b></span> <span style={{ fontSize: '20px' }}>{patientDetails.patientName + " - " + patientDetails.age}</span>
                        </div>
                        <div id="removePadding" style={{ fontSize: '20px',fontWeight:650 }} className="p-col-12 p-md-2">
                            Location List:
                        </div>
                        <div id="removePadding"  className="p-col-12 p-md-10">                        
                        </div>
                        <div id="removePadding"  className="p-col-12 p-md-4">  
                        <ListBox  id="location" onChange={handleInputChange} options={locationAdd} value={patientDetails.location}    />                      
                        </div>
                        <div id="removePadding"  className="p-col-12 p-md-1">  
                        <Button icon="pi pi-plus" onClick={handleLocationDialog}></Button>                       
                        </div>
                        <div id="removePadding"  className="p-col-12 p-md-7">                         
                        </div>
                        <div id="removePadding" style={{ fontSize: '20px',fontWeight:650 }} className="p-col-12 p-md-2">
                            Activity List:
                        </div>
                        <div id="removePadding"  className="p-col-12 p-md-10">                        
                        </div>
                        <div id="removePadding"  className="p-col-12 p-md-4">  
                        <ListBox  id="activity" onChange={handleInputChange} options={activityAdd} value={patientDetails.activity}  />                      
                        </div>
                        <div id="removePadding"  className="p-col-12 p-md-1">   
                        <Button icon="pi pi-plus" onClick={handleActivityDialog}></Button>                                
                        </div>
                        <div id="removePadding"  className="p-col-12 p-md-7">                         
                        </div>
                        <div id="removePadding"  className="p-col-12 p-md-4">                         
                        </div>
                        <div id="removePadding" style={{display:'flex'}} className="p-col-12 p-md-4">
                        <Button icon="pi pi-plus" style={{ width: 'fit-content' }} label="Save" onClick={handleSaveChange}></Button>&nbsp;&nbsp;&nbsp;  
                        <Button icon="pi pi-pencil" style={{ width: 'fit-content' }} label="Form Preview" onClick={handleQ15CheckPageChange}></Button>&nbsp;&nbsp;&nbsp;  
                        <Button icon="pi pi-step-backward" style={{ width: 'fit-content' }} label="Back" onClick={() => history.goBack()} />
                        </div>
                        <div id="removePadding"  className="p-col-12 p-md-4">                         
                        </div>
                    </div>
                    <Dialog
        header="Add Location"
        visible={locationDialog}
        modal={true}
        style={{ width: "55vw" }}
        onHide={() => setLocationDialog(false)}
      >
        {locationDialog && (
   
            <div className="p-grid">
            <div id="removePadding" className="p-col-12 p-md-2">
                Location Code:
            </div> 
            <div id="removePadding" className="p-col-12 p-md-2">
            <InputText id="locationCode" onChange={handleInputChange} value={patientDetails.locationCode} required  />   
            {isSumbmit && patientDetails.locationCode === "" && (requiredMessage("fn"))}
      
            </div> 
            <div id="removePadding" className="p-col-12 p-md-2">        
            </div> 
            <div id="removePadding" className="p-col-12 p-md-1">
                Location:
            </div> 
            <div id="removePadding" className="p-col-12 p-md-4">
            <InputText id="location" onChange={handleInputChange} value={patientDetails.location} required  />
            {isSumbmit && patientDetails.location === "" && (requiredMessage("fn"))}
         
            </div> 
            <div id="removePadding" className="p-col-12 p-md-1">        
            </div>            
            <div id="removePadding" className="p-col-12 p-md-4">       
            </div> 
            <div id="removePadding" className="p-col-12 p-md-4"> 
            <Button icon="pi pi-plus" label="Save" style={{width:'fit-content'}} onClick={handleLocationChanges}></Button>      
            </div> 
            <div id="removePadding" className="p-col-12 p-md-4">       
            </div> 
            </div>   
        
        )}
      </Dialog>
      <Dialog
        header="Add Activity"
        visible={activityDialog}
        modal={true}
        style={{ width: "55vw" }}
        onHide={() => setActivityDialog(false)}
      >
        {activityDialog && (
   
            <div className="p-grid">
            <div id="removePadding" className="p-col-12 p-md-2">
                Activity Code:
            </div> 
            <div id="removePadding" className="p-col-12 p-md-2">
            <InputText id="activityCode" onChange={handleInputChange} value={patientDetails.activityCode} required  />         
            </div> 
            <div id="removePadding" className="p-col-12 p-md-2">        
            </div> 
            <div id="removePadding" className="p-col-12 p-md-1">
                Activity:
            </div> 
            <div id="removePadding" className="p-col-12 p-md-4">
            <InputText id="activity" onChange={handleInputChange} value={patientDetails.activity} required  />         
            </div> 
            <div id="removePadding" className="p-col-12 p-md-1">        
            </div>            
            <div id="removePadding" className="p-col-12 p-md-4">       
            </div> 
            <div id="removePadding" className="p-col-12 p-md-4"> 
            <Button icon="pi pi-plus" label="Save" style={{width:'fit-content'}} onClick={handleActivityChanges}></Button>      
            </div> 
            <div id="removePadding" className="p-col-12 p-md-4">       
            </div> 
            </div>   
        
        )}
      </Dialog>
                </div>
            </div>
        </div>
    );


};
const mapStateToProps = (state: any) => {
    const { deviceFormData, I907FormData } = state;
    return {
        deviceFormData, I907FormData
    };
};
export default connect(mapStateToProps)(AdminScheduleChanges)