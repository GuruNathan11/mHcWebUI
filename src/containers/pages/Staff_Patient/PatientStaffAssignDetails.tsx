import React, { useEffect, useState, Dispatch } from "react";
import { connect } from "react-redux";
import "../Patient/AdmitPatient.css";
import { FormControl, InputLabel, MenuItem, FormHelperText, Select } from "@mui/material";
import { getAllPatient } from "../../../store/actions/Patient";
import AvatarBigImage from './../../../assets/images/mettler_images/AvatarBigImage.png';
import CombinedShapeImage from './../../../assets/images/mettler_images/CombinedShape.svg';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {getallPatientVisit} from './../../../store/actions/PatientVisitAdminController'
import moment from "moment";
import { HttpLogin } from "../../../utils/Http";
import "./PatientStaffAssignment.css";

interface IPatientStaffAssign {}
interface IPatientStaffAssign {
    StaticPage: any;
    getAllPatientData:any;
    dispatch: Dispatch<any>;
    getallPatientVisitData: any;
    state: {
      nodes: [],
      checked: [],
      expanded: []
    }
}




 
const  PatientStaffAssign: React.FC<IPatientStaffAssign> = ({
    dispatch, getAllPatientData, getallPatientVisitData 
}) => {
    let [getPatientDataItems, setGetPatientDataItems] = useState(new Array<any>()); 
    let [tableData,setTableData] = useState(new Array<any>());
    let [tableNewData,setTableNewData] = useState(new Array<any>());
    const [selectedValues, setSelectedValues] = useState([]);
    const [selectedRow, setSelectedRow] = useState(0); 
    let [selectedPatientId,setSelectedPatientId] = useState("");
    let [inputOrgData,setInputOrgData] = useState("");
    useEffect(() => {  
      var orgData = JSON.parse(window.localStorage.getItem("LOGINDATA"));
      orgData = orgData.loginInput.organization;   
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
        
      }, []);

    const [isPatientPageLoaded, setPatientPageLoaded] = useState(false);

if (!isPatientPageLoaded && !getAllPatientData.isLoading) { 
  if(getAllPatientData.items.message.code === "MHC - 0200"){
    setGetPatientDataItems(getAllPatientData.items.data.filter(t=>t.organization === inputOrgData));
  }else{
    setGetPatientDataItems([]);
    alert(getAllPatientData.items.message.description);
  } 
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

const onSelectionChangedData = (rowData)=>{
    const value = rowData.value;       
    setSelectedValues(value); 
    setSelectedRow(rowData.value.length);
  }
  const onRowSelectData = (event) =>{
    var CryptoJS = require("crypto-js"); 
  var encryptPatientId = CryptoJS.AES.encrypt(event.data.id, 'secret key 123');
   var setEncryptPatientId = encodeURIComponent(encryptPatientId.toString()); 
   window.location.href = "/MettlerAdmitPatientupdated/"+setEncryptPatientId;
  }

  const handleFixedChange = () =>{
    
  }

  const dataVisitStartDate = (rowData:any)=>{
    return rowData.visit[0].visitStartDate != "string"? <span> {moment(rowData.visit[0].visitStartDate,"YYYYMMDDHHmmss947").format('MMM DD,HH:mm A')}</span>:<span>{rowData.visit[0].visitStartDate}</span>
  }

  const dataAdmitDate = (rowData:any) =>{
    return rowData.visit[0].admit[0].admitDate != "string" && rowData.visit[0].admit[0].admitDate != null ? <span> {moment(rowData.visit[0].admit[0].admitDate,"YYYYMMDDHHmmss947").format('MMM DD,HH:mm A')}</span>:<span>{rowData.visit[0].admit[0].admitDate}</span>    
  }

  const dataDischDate = (rowData:any) =>{
    return rowData.visit[0].admit[0].dischDate != "string" && rowData.visit[0].admit[0].dischDate != null ? <span> {moment(rowData.visit[0].admit[0].dischDate,"YYYYMMDDHHmmss947").format('MMM DD,HH:mm A')}</span>:<span>{rowData.visit[0].admit[0].dischDate}</span>    
  }

  const dataResourceType = (rowData:any) =>{
    return rowData.resource[0].resourceType != "" ?<span>{rowData.resource[0].resourceType}</span>:<span></span>
  }

  const dataAdmitPhys = (rowData:any) =>{
    return rowData.visit[0].admit[0].admittech[0].admitPhys1Index != "" ?<span>{rowData.visit[0].admit[0].admittech[0].admitPhys1Index}</span>:<span></span>
  }

  const dataAdmitcode = (rowData:any) =>{
    return rowData.code != "" ?<span>{rowData.code}</span>:<span></span>
  }

  const handleVisitPage =()=>{
    var CryptoJS = require("crypto-js"); 
    var encryptPatientId = CryptoJS.AES.encrypt(selectedPatientId, 'secret key 123');
     var setEncryptPatientId = encodeURIComponent(encryptPatientId.toString()); 
     window.location.href = "/MettlerAdmitPatientupdated/"+setEncryptPatientId;
  }
  let [patientStaffTab,setPatientStaffTab] = useState(Number);  
  const handleChangeEvent = (event) => {
    patientStaffTab = event;
    setPatientStaffTab(event);
};

return  (
  <div>
     <div className="spAssignment-details-child" style={{height:patientStaffTab === 1 || patientStaffTab === 0?'1561px':'561px'}}/>        
          <div className="psaAssignment-details-child2" />
          <div className="patientStaff">                     
              <a style={{cursor:'pointer',color:patientStaffTab === 1 || patientStaffTab === 0 ?'darkslateblue':'rgba(0, 0, 0, 0.87)'}} onClick={()=>handleChangeEvent(1)}><div className="psDetails">Patient- Staff(s)</div></a>             
              <a style={{cursor:'pointer',color:patientStaffTab === 2 ?'darkslateblue':'rgba(0, 0, 0, 0.87)'}} onClick={()=>handleChangeEvent(2)}><div className="spDetails">Staff- Patient(s)</div></a>          
          </div>
          {((patientStaffTab ===1 || patientStaffTab === 0) &&  <div className="patientStaff-childs3" />)}
          {(patientStaffTab ===2 &&  <div className="staffPatient-childs3" />)}             
          {((patientStaffTab ===1 || patientStaffTab === 0) &&  <div style={{position:'absolute',top:'199px',left:'6px',width:'calc(100% - 13px)'}}>
          <div>
        <img style={{ width: '56px', height: '56px', position: 'absolute', left: '21px', top: '-43px' }} src={AvatarBigImage}></img>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', position: 'absolute', left: '88px', top: '-47px' }}>
        <div className="admit-patient-profileName">Koray Okumus</div>
        <div style={{ fontWeight: 400, fontSize: '12px', opacity: 0.6, position: 'relative', left: '16px', top: '5px' }} className="admit-patient-profileName">DOB:</div>
        <div style={{ fontWeight: 400, fontSize: '12px', position: 'relative', left: '28px', top: '5px' }} className="admit-patient-profileName">May 24, 1989</div>
        <div style={{ fontWeight: 400, fontSize: '12px', opacity: 0.6, position: 'relative', left: '59px', top: '5px' }} className="admit-patient-profileName">Gender:</div>
        <div style={{ fontWeight: 400, fontSize: '12px', position: 'relative', left: '70px', top: '5px' }} className="admit-patient-profileName">Male</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', position: 'absolute', top: '-13px', left: '88px' }}>
        <div className="admit-patient-ss" style={{ width: '105px', height: '24px' }}>
          <div style={{ fontWeight: 400, fontSize: '12px', opacity: 0.6 }} className="admit-patient-profileName">SS#:</div>
          <div style={{ fontWeight: 400, fontSize: '12px' }} className="admit-patient-profileName">SS-148</div>
        </div>
        <div className="admit-patient-ss" style={{ width: '110px', height: '24px', position: 'relative', left: '12px' }}>
          <div style={{ fontWeight: 400, fontSize: '12px', opacity: 0.6 }} className="admit-patient-profileName">MR:</div>
          <div style={{ fontWeight: 400, fontSize: '12px' }} className="admit-patient-profileName">MR-345</div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: '1083px', top: '163px', display: 'flex' }}>
        <img style={{ width: '12px', height: '12px', position: "absolute", top: "-176px", left: "-225px"}} src={CombinedShapeImage}></img>
        <a style={{ cursor: 'pointer' }} onClick={handleVisitPage}><div style={{ position: 'relative', left: '-202px', top: '-182px',textAlign:"justify" }} className="admit-patient-add-visit">Add a Visit</div></a>
      </div> 
          
          
          
          
          <div className="admit-patient-dropdown">
        <div className="admit-patient-inputs-row">
          <FormControl className="admit-patient-departure-fields" variant="outlined">
            <InputLabel color="primary">Select Patient(s)</InputLabel>
            <Select color="primary" size="medium" label="Select Patient (s)" value={selectedPatientId} onChange={(e) => {
              selectedPatientId = e.target.value;
              setSelectedPatientId(selectedPatientId);
              setTableNewData(tableData.filter(k => k.patientid === selectedPatientId));


            }}>
              <MenuItem value="">Select</MenuItem>
              {getPatientDataItems.map((newData, i) => {
                return (
                  <MenuItem key={i} value={newData.id}>{newData.basicDetails[0].name[0].given}</MenuItem>
                )
              })}
            </Select>
            <FormHelperText />
          </FormControl>
        </div>
      </div>
     
            <DataTable style={{border:'0px',top:"20px"}}
                  value={tableNewData} onRowSelect={onRowSelectData}
                  selectionMode="multiple" 
                  rows={50} scrollable={true} 
                  responsive={true} selection={selectedValues} onSelectionChange={onSelectionChangedData}
                  emptyMessage="No records found">
                  <Column selectionMode="multiple" headerStyle={{width:'4%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'5%',background:'#FFF'}}></Column>
                  <Column field="id" header="Visit Id" headerStyle={{width:'10%', textAlign:'start',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'20%',background:'#FFF'}} />
                  <Column field="visit[0].visitStartDate" header="Visit Date & Time" headerStyle={{width:'14%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'23%',background:'#FFF'}} body={dataVisitStartDate}/>
                  <Column field="resource[0].resourceType" header="Visit Type" headerStyle={{width:'8%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'15%',background:'#FFF'}} body={dataResourceType}/>
                  <Column field="visit[0].admit[0].admitDate" header="Admitted Date & Time" headerStyle={{width:'16%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'29%',background:'#FFF'}} body={dataAdmitDate}/>                  
                  <Column field="visit[0].admit[0].dischDate" header="Discharge Date & Time" headerStyle={{width:'17%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'27%',background:'#FFF'}} body={dataDischDate}/>                  
                  <Column field="visit[0].admit[0].admittech[0].admitPhys1Index" header="Admitting Physician" headerStyle={{width:'15%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'31%',background:'#FFF'}} body={dataAdmitPhys}/>
                  <Column field="code" header="Ward & Bed Info" headerStyle={{width:'13%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'13%',background:'#FFF'}} body={dataAdmitcode}/>                 
                  <Column field="" header="" headerStyle={{width:'',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'7%',background:'#FFF'}} /> 
                </DataTable>
                </div> )}
          {(patientStaffTab ===2 &&  <div style={{position:'absolute',top:'199px',left:'6px',width:'calc(100% - 13px)'}}>


          <img style={{ width: '56px', height: '56px', position: 'absolute', left: '21px', top: '-43px' }} src={AvatarBigImage}></img>
      
      <div style={{ display: 'flex', flexDirection: 'row', position: 'absolute', left: '88px', top: '-47px' }}>
        <div className="admit-patient-profileName">Koray Okumus</div>
        <div style={{ fontWeight: 400, fontSize: '12px', opacity: 0.6, position: 'relative', left: '16px', top: '5px' }} className="admit-patient-profileName">DOB:</div>
        <div style={{ fontWeight: 400, fontSize: '12px', position: 'relative', left: '28px', top: '5px' }} className="admit-patient-profileName">May 24, 1989</div>
        <div style={{ fontWeight: 400, fontSize: '12px', opacity: 0.6, position: 'relative', left: '59px', top: '5px' }} className="admit-patient-profileName">Gender:</div>
        <div style={{ fontWeight: 400, fontSize: '12px', position: 'relative', left: '70px', top: '5px' }} className="admit-patient-profileName">Male</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', position: 'absolute', top: '-13px', left: '88px' }}>
        <div className="admit-patient-ss" style={{ width: '105px', height: '24px' }}>
          <div style={{ fontWeight: 400, fontSize: '12px', opacity: 0.6 }} className="admit-patient-profileName">SS#:</div>
          <div style={{ fontWeight: 400, fontSize: '12px' }} className="admit-patient-profileName">SS-148</div>
        </div>
        <div className="admit-patient-ss" style={{ width: '110px', height: '24px', position: 'relative', left: '12px' }}>
          <div style={{ fontWeight: 400, fontSize: '12px', opacity: 0.6 }} className="admit-patient-profileName">MR:</div>
          <div style={{ fontWeight: 400, fontSize: '12px' }} className="admit-patient-profileName">MR-345</div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: '1083px', top: '163px', display: 'flex' }}>
        <img style={{ width: '12px', height: '12px', position: "absolute", top: "-176px", left: "-225px"}} src={CombinedShapeImage}></img>
        <a style={{ cursor: 'pointer' }} onClick={handleVisitPage}><div style={{ position: 'relative', left: '-202px', top: '-182px',textAlign:"justify" }} className="admit-patient-add-visit">Add a Visit</div></a>
      </div> 
            
          <div className="admit-patient-dropdown">
        <div className="admit-patient-inputs-row">
          <FormControl className="admit-patient-departure-fields" variant="outlined">
            <InputLabel color="primary">Select Patient(s)</InputLabel>
            <Select color="primary" size="medium" label="Select Patient (s)" value={selectedPatientId} onChange={(e) => {
              selectedPatientId = e.target.value;
              setSelectedPatientId(selectedPatientId);
              setTableNewData(tableData.filter(k => k.patientid === selectedPatientId));


            }}>
              <MenuItem value="">Select</MenuItem>
              {getPatientDataItems.map((newData, i) => {
                return (
                  <MenuItem key={i} value={newData.id}>{newData.basicDetails[0].name[0].given}</MenuItem>
                )
              })}
            </Select>
            <FormHelperText />
          </FormControl>
        </div>
      </div>
            <DataTable style={{border:'0px',top:"20px"}}
                  value={tableNewData} onRowSelect={onRowSelectData}
                  selectionMode="multiple"
                  rows={50} scrollable={true}
                  responsive={true} selection={selectedValues} onSelectionChange={onSelectionChangedData}
                  emptyMessage="No records found">
                  <Column selectionMode="multiple" headerStyle={{width:'4%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'5%',background:'#FFF'}}></Column>
                  <Column field="id" header="Visit Id" headerStyle={{width:'10%', textAlign:'start',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'20%',background:'#FFF'}} />
                  <Column field="visit[0].visitStartDate" header="Visit Date & Time" headerStyle={{width:'14%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'23%',background:'#FFF'}} body={dataVisitStartDate}/>
                  <Column field="resource[0].resourceType" header="Visit Type" headerStyle={{width:'8%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'15%',background:'#FFF'}} body={dataResourceType}/>
                  <Column field="visit[0].admit[0].admitDate" header="Admitted Date & Time" headerStyle={{width:'16%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'29%',background:'#FFF'}} body={dataAdmitDate}/>                  
                  <Column field="visit[0].admit[0].dischDate" header="Discharge Date & Time" headerStyle={{width:'17%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'27%',background:'#FFF'}} body={dataDischDate}/>                  
                  <Column field="visit[0].admit[0].admittech[0].admitPhys1Index" header="Admitting Physician" headerStyle={{width:'15%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'31%',background:'#FFF'}} body={dataAdmitPhys}/>
                  <Column field="code" header="Ward & Bed Info" headerStyle={{width:'13%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'13%',background:'#FFF'}} body={dataAdmitcode}/>                 
                  <Column field="" header="" headerStyle={{width:'',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'7%',background:'#FFF'}} /> 
                </DataTable>
                </div> )}         
    </div>
  );
      
  
};
const mapStateToProps = (state: any) => {
  const { deviceFormData,getAllPatientData,getallPatientVisitData } = state;
  return {
      deviceFormData,getAllPatientData,getallPatientVisitData
  };
};
export default connect(mapStateToProps)(PatientStaffAssign)