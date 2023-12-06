import React, { useEffect, useState, Dispatch } from "react";
import { connect } from "react-redux";
import "./AdmitPatient.css";
import { FormControl, InputLabel, MenuItem, FormHelperText, Select } from "@mui/material";
import { getAllPatient } from "../../../store/actions/Patient";
import AvatarBigImage from './../../../assets/images/mettler_images/AvatarBigImage.png';
import CombinedShapeImage from './../../../assets/images/mettler_images/CombinedShape.svg';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {getallPatientVisit} from './../../../store/actions/PatientVisitAdminController'
import moment from "moment";
import { HttpLogin } from "../../../utils/Http";
import { getAllStaff } from "../../../store/actions/Staff";

interface IAdmitPatient {}
interface IAdmitPatient {
    StaticPage: any;
    getAllPatientData:any;
    getAllStaffData:any;
    dispatch: Dispatch<any>;
    getallPatientVisitData: any;
    state: {
      nodes: [],
      checked: [],
      expanded: []
    }
}




 
const  AdmitPatient: React.FC<IAdmitPatient> = ({
    dispatch, getAllPatientData, getallPatientVisitData, getAllStaffData
}) => {
    let [getPatientDataItems, setGetPatientDataItems] = useState(new Array<any>()); 
    let [tableData,setTableData] = useState(new Array<any>());
    let [tableNewData,setTableNewData] = useState(new Array<any>());
    const [selectedValues, setSelectedValues] = useState([]);
    const [selectedRow, setSelectedRow] = useState(0); 
    let [selectedPatientId,setSelectedPatientId] = useState("");
    let [inputOrgData,setInputOrgData] = useState("");
    let [getStaffDataItems, setGetStaffDataItems] = useState(new Array<any>());
    let [StatusData, setStatusData] = useState(null);

    useEffect(() => {  
      var orgData = JSON.parse(window.localStorage.getItem("LOGINDATA"));
      orgData = orgData.loginInput.organization;   
      HttpLogin.axios().get("api/dropdowns/get-all")
      .then((response) => {
        let StatusInputData = response.data.data.filter(k => k.dropdown === "status").map((i) => { return i.list })
        setStatusData(StatusInputData[0]);      
      }) 
     HttpLogin.axios().get("api/org/getById/"+orgData)
     .then((res) => {
      if(res.data.message.code === "MHC - 0200"){        
        setInputOrgData(res.data.data.organizationdetails[0].name);
      }else{    
        alert(res.data.message.description);      
        setInputOrgData("");
      }
 
  
     })
          dispatch(getallPatientVisit());
        dispatch(getAllPatient());   
        dispatch(getAllStaff());  
        
      }, []);
      let [inputPatientInfo, setInputPatientInfo] = useState(null);
      let [patientAge, setPatientAge] = useState(null);
      let [patientDateOfBirth, setPatientDateOfBirth] = useState(null);
      let [patientGender, setPatientGender] = useState(null);
       let [patientSSN, setPatientSSN] = useState(null);
  let [patientImage, setPatientImage] = useState("");

    const [isPatientPageLoaded, setPatientPageLoaded] = useState(false);

if (!isPatientPageLoaded && !getAllPatientData.isLoading) { 
  if(getAllPatientData.items.message.code === "MHC - 0200"){
    setGetPatientDataItems(getAllPatientData.items.data.filter(t=>t.organization === inputOrgData));
  }else{
    setGetPatientDataItems([]);
    alert(getAllPatientData.items.message.description);
  } 
  setPatientPageLoaded(true);
}
if (!getAllPatientData && getAllPatientData.isFormSubmit) {

  setTimeout(() => {
    setPatientPageLoaded(false);

  }, (1000));
}

const [isPatientVisitPageLoaded, setPatientVisitPageLoaded] = useState(false);

if (!isPatientVisitPageLoaded && !getallPatientVisitData.isLoading) {  
  //  console.log(JSON.stringify(getallPatientVisitData.items));
 if(getallPatientVisitData.items.message.code === "MHC - 0200"){
  setTableData(getallPatientVisitData.items.data);    
  if(selectedPatientId != ""){
    setTableData(getallPatientVisitData.items.data);
  }else{
    setTableNewData(getallPatientVisitData.items.data);
  }   
 }else{
  setTableData([]);
  alert(getallPatientVisitData.items.message.description);
 }
 setPatientVisitPageLoaded(true);
}

if (!getallPatientVisitData && getallPatientVisitData.isFormSubmit) {

  setTimeout(() => {
    setPatientVisitPageLoaded(false);

  }, (1000));
}

const [isStaffPageLoaded, setStaffPageLoaded] = useState(false);

if (!isStaffPageLoaded && !getAllStaffData.isLoading) {
  if (getAllStaffData.items.message.code === "MHC - 0200") {
    setGetStaffDataItems(getAllStaffData.items.data.filter(t => t.organization === inputOrgData));
    //  console.log(JSON.stringify(getAllStaffData.items.data));
  } else {
    setGetStaffDataItems([]);
    alert(getAllStaffData.items.message.description);
  }
  setStaffPageLoaded(true)
}
if (!getAllStaffData && getAllStaffData.isFormSubmit) {

  setTimeout(() => {
    setStaffPageLoaded(false);

  }, (1000));
}


const onSelectionChangedData = (rowData)=>{
    const value = rowData.value;       
    setSelectedValues(value); 
    setSelectedRow(rowData.value.length);
  }
  const onRowSelectData = (event) =>{
    var CryptoJS = require("crypto-js"); 
  var encryptVisitId = CryptoJS.AES.encrypt(event.data.id, 'secret key 123');
   var setEncryptVisitId = encodeURIComponent(encryptVisitId.toString()); 
   var encryptPatientId = CryptoJS.AES.encrypt(event.data.pid, 'secret key 123');
   var setEncryptPatientId = encodeURIComponent(encryptPatientId.toString());   
   //  console.log(JSON.stringify(event.data));
  window.location.href = "/MettlerAdmitPatientupdated/"+setEncryptPatientId+"/"+setEncryptVisitId;
  }
  let [increment, setIncrement] = useState(1);

  function incrementValue (){
    return increment++;
  }

  const dataVisitStartDate = (rowData:any)=>{
    return rowData.visitStartDate != "string"? <span> {moment(rowData.visitStartDate,"YYYYMMDDHHmm").format('MMM DD,hh:mm A')}</span>:<span>{rowData.visitStartDate}</span>
  }

  const dataAdmitDate = (rowData:any) =>{
    return rowData.admitDate != "string" && rowData.admitDate != null ? <span> {moment(rowData.admitDate,"YYYYMMDDHHmm").format('MMM DD,hh:mm A')}</span>:<span>{rowData.admitDate}</span>    
  }

  const dataVisitType = (rowData:any) =>{
    var staffData = getStaffDataItems.length>0 && getStaffDataItems.filter(i => i.id === rowData.visitType).map(k=>{return k.name[0].given+" "+k.name[0].family})
    return rowData.visitType != "" ?<span>{staffData !== null &&  staffData !== undefined && staffData.length !== 0? staffData:rowData.visitType}</span>:<span>--</span>
  }

  const dataDischDate = (rowData:any) =>{
    return rowData.dischargeDate != "string" && rowData.dischargeDate != null ? <span> {moment(rowData.dischargeDate,"YYYYMMDDHHmm").format('MMM DD,hh:mm A')}</span>:<span>{rowData.dischargeDate}</span>    
  }


  const dataAdmitPhys = (rowData:any) =>{
    var staffData = getStaffDataItems.length>0 && getStaffDataItems.filter(i => i.id === rowData.refferingPhysycian).map(k=>{return k.name[0].given+" "+k.name[0].family})
    return rowData.refferingPhysycian != "" ?<span>{staffData}</span>:<span>--</span>
  }

  const dataAdmitcode = (rowData:any) =>{
    var newStatus = StatusData !== null && StatusData.length>0 && StatusData.filter(l=>l.id === rowData.status).map(k=>{return k.value})
    return rowData.status != "" ?<span>{newStatus}</span>:<span>--</span>
  }

  const handleVisitPage =()=>{
    var CryptoJS = require("crypto-js"); 
    var encryptPatientId = CryptoJS.AES.encrypt(selectedPatientId, 'secret key 123');
     var setEncryptPatientId = encodeURIComponent(encryptPatientId.toString()); 
     window.location.href = "/MettlerAdmitPatientupdated/"+setEncryptPatientId;
  }

return  (
  <div>
      <div className="admit-patient-dropdown">
          <div className="admit-patient-inputs-row">
          <FormControl className="admit-patient-departure-field" variant="outlined">
            <InputLabel color="primary">Select Patient(s)</InputLabel>
            <Select color="primary" size="medium" label="Select Patient (s)" value={selectedPatientId} onChange={(e)=>{
              selectedPatientId = e.target.value;
              setSelectedPatientId(selectedPatientId);   
              console.log(JSON.stringify(tableData));    
              if(selectedPatientId !== ""){
                setTableNewData(tableData.filter(k=>k.pid === selectedPatientId));     
              } else{
                setTableNewData(tableData);
              }
                           
                HttpLogin.axios().get("api/patient/getPatient/" + selectedPatientId)
                .then((res) => {                  
                  setInputPatientInfo(res.data.data.basicDetails[0].name[0].given+" "+res.data.data.basicDetails[0].name[0].family);
          setPatientImage(res.data.data.basicDetails[0].profile !== ""? res.data.data.basicDetails[0].profile:"");
                  setPatientDateOfBirth(moment(res.data.data.basicDetails[0].birthDate).format('MMM DD,YYYY'));
                  var genderChanges = res.data.data.basicDetails[0].gender === "M"?"Male":res.data.data.basicDetails[0].gender === "fm" ?"Female":"Not Specify";
                  setPatientGender(genderChanges);
                  var ssnValue = res.data.data.basicDetails[0].ssn != undefined ? res.data.data.basicDetails[0].ssn.slice(6,9):""
                  setPatientSSN(ssnValue);
                })
            }}>
              <MenuItem value="">Select</MenuItem>
            {getPatientDataItems.map((newData,i) =>{
                return (
                  <MenuItem key={i} value={newData.id}>{newData.basicDetails[0].name[0].given}</MenuItem>
                )
              })}           
            </Select>
            <FormHelperText />
          </FormControl>
          </div>
        </div>
        {(selectedPatientId != "")?<>
        <div>
        <img style={{width:'56px',height:'56px',position:'absolute',left:'21px',top:'116px'}} src={AvatarBigImage}></img>  
        </div>
        <div style={{display:'flex',flexDirection:'row',position:'absolute',left:'88px',top:'117px'}}>
            <div className="admit-patient-profileName">{inputPatientInfo}</div>
            <div style={{fontWeight:400,fontSize:'12px',opacity:0.6,position:'relative',left:'16px',top:'5px'}} className="admit-patient-profileName">DOB:</div>
            <div style={{fontWeight:400,fontSize:'12px',position:'relative',left:'28px',top:'5px'}} className="admit-patient-profileName">{patientDateOfBirth}</div>
            <div style={{fontWeight:400,fontSize:'12px',opacity:0.6,position:'relative',left:'59px',top:'5px'}} className="admit-patient-profileName">Gender:</div>
            <div style={{fontWeight:400,fontSize:'12px',position:'relative',left:'70px',top:'5px'}} className="admit-patient-profileName">{patientGender}</div>
        </div>
        <div style={{display:'flex',flexDirection:'row',position:'absolute',top:'147px',left:'88px'}}>
            <div className="admit-patient-ss" style={{width:'110px',height:'24px'}}>
            <div style={{fontWeight:400,fontSize:'12px',opacity:0.6}} className="admit-patient-profileName">SS#:</div>
            <div style={{fontWeight:400,fontSize:'12px'}} className="admit-patient-profileName">SS-{patientSSN}</div>            
            </div>
            <div className="admit-patient-ss" style={{width:'110px',height:'24px',position:'relative',left:'12px'}}>
            <div style={{fontWeight:400,fontSize:'12px',opacity:0.6}} className="admit-patient-profileName">MR:</div>
            <div style={{fontWeight:400,fontSize:'12px'}} className="admit-patient-profileName">MR-345</div>            
            </div>          
        </div>
        <div style={{position:'absolute',left:'1083px',top:'163px',display:'flex'}}>
            <img style={{width:'12px',height:'12px'}} src={CombinedShapeImage}></img>  
            <a style={{ cursor: 'pointer' }} onClick={handleVisitPage}><div style={{position:'relative',left:'7px',top:'-7px'}}className="admit-patient-add-visit">Add a Visit</div></a>
            </div>
            <div style={{background:'#DEE5ED',height:'1px',width:'calc(100% - 50px)',position:'absolute',top:'194px',left:'20px'}}></div>
            </>:<></>}
     <div style={{position:'absolute',top:'199px',left:'6px',width:'calc(100% - 13px)'}}>
            <DataTable style={{border:'0px'}}
                  value={tableNewData} onRowSelect={onRowSelectData}
                  selectionMode="multiple" 
                  rows={50} scrollable={true} 
                  responsive={true} selection={selectedValues} onSelectionChange={onSelectionChangedData}
                  emptyMessage="No records found">
                  <Column selectionMode="multiple" headerStyle={{width:'4%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'5%',background:'#FFF'}}></Column>
                  <Column body={incrementValue} header="Visit Id" headerStyle={{width:'10%', textAlign:'start',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'20%',background:'#FFF'}} />
                  <Column field="visitStartDate" header="Visit Date & Time" headerStyle={{width:'14%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'23%',background:'#FFF'}} body={dataVisitStartDate}/>
                  <Column field="visitType" header="Visit Type" headerStyle={{width:'8%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'15%',background:'#FFF'}} body={dataVisitType}/>
                  <Column field="admitDate" header="Admitted Date & Time" headerStyle={{width:'16%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'29%',background:'#FFF'}} body={dataAdmitDate}/>                  
                  <Column field="dischargeDate" header="Discharge Date & Time" headerStyle={{width:'17%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'27%',background:'#FFF'}} body={dataDischDate}/>                  
                  <Column field="refferingPhysycian" header="Referring Physician" headerStyle={{width:'15%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'31%',background:'#FFF'}} body={dataAdmitPhys}/>
                  <Column field="status" header="Status" headerStyle={{width:'13%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'13%',background:'#FFF'}} body={dataAdmitcode}/>                 
                  <Column field="" header="" headerStyle={{width:'',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'7%',background:'#FFF'}} /> 
                </DataTable>
                </div>
    </div>
  );
      
  
};
const mapStateToProps = (state: any) => {
  const { deviceFormData,getAllPatientData,getallPatientVisitData, getAllStaffData } = state;
  return {
      deviceFormData,getAllPatientData,getallPatientVisitData, getAllStaffData
  };
};
export default connect(mapStateToProps)(AdmitPatient)