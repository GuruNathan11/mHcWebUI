import React, { useEffect, useState, Dispatch } from "react";
import { connect } from "react-redux";
import {Button, Tab} from '@mui/material';
import { TabList, TabContext, TabPanel } from '@mui/lab';
import bloodBag from './../../../assets/images/mettler_images/blood_bag.svg';
import bloodDrop from './../../../assets/images/mettler_images/blood_drop.svg';
import bloodDropNew from './../../../assets/images/mettler_images/blood_dropNew.svg';
import bloodDropNewOne from './../../../assets/images/mettler_images/blood_dropNewOne.svg';
import AvatarBigImage from './../../../assets/images/mettler_images/AvatarBigImage.png';
import AvatarDoctorImage from './../../../assets/images/mettler_images/AvatarDoctor.png';
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { getAllStaff } from "../../../store/actions/Staff";
import moment from "moment";
import { getAllPatient } from "../../../store/actions/Patient";
import { getallPatientVisit } from "../../../store/actions/PatientVisitAdminController";
import filterList from './../../../assets/images/mettler_images/filter_list.svg';
import searchImage from './../../../assets/images/mettler_images/Search.svg';
import addSymbol from './../../../assets/images/mettler_images/addSymbol.svg';
import switchVertical from './../../../assets/images/mettler_images/switch-vertical.svg';
import { HttpLogin } from "../../../utils/Http";

interface IVisitPatient {}
interface IVisitPatient {
    StaticPage: any;
    getAllStaffData:any;
    dispatch: Dispatch<any>;
    getallptvisitData: any;
    match:any;
    state: {
      nodes: [],
      checked: [],
      expanded: []
    }
}




 
const  VisitPatient: React.FC<IVisitPatient> = ({
  dispatch, getAllStaffData, getallptvisitData , match

    
}) => {
  let [getPatientDataItems, setGetPatientDataItems] = useState(new Array<any>()); 
  let [tableData,setTableData] = useState(new Array<any>());
  let [tableNewData,setTableNewData] = useState(new Array<any>());
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedRow, setSelectedRow] = useState(0); 
  let [inputPatientInfo, setInputPatientInfo] = useState(null);
  let [patientAge, setPatientAge] = useState(null);
  let [patientDateOfBirth, setPatientDateOfBirth] = useState(null);
  let [patientGender, setPatientGender] = useState(null);
   let [patientSSN, setPatientSSN] = useState(null);
  let [patientImage, setPatientImage] = useState("");
  let [decryptPatientId,setDecryptPatientId] = useState("");
  let [encryptPatientId,setEncryptPatientId] = useState("");
  let [getStaffDataItems, setGetStaffDataItems] = useState(new Array<any>());
  let [inputOrgData, setInputOrgData] = useState("");
  let [StatusData, setStatusData] = useState(null);

  useEffect(() => {  
    var encryptInitial = match.params.id; 
    setEncryptPatientId(encryptInitial);
    var CryptoJS = require("crypto-js");
    let decodePatientid = decodeURIComponent(encryptInitial);
    let decodeFinalPatientid = CryptoJS.AES.decrypt(decodePatientid.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);       
  
    setDecryptPatientId(decodeFinalPatientid);
    var orgData = JSON.parse(window.localStorage.getItem("LOGINDATA"));
    orgData = orgData.loginInput.organization;
    HttpLogin.axios().get("api/dropdowns/get-all")
      .then((response) => {
        let StatusInputData = response.data.data.filter(k => k.dropdown === "status").map((i) => { return i.list })
        setStatusData(StatusInputData[0]);      
      }) 
    HttpLogin.axios().get("api/org/getById/" + orgData)
        .then((result) => {
          setInputOrgData(result.data.data.organizationdetails[0].name);
    if(decodeFinalPatientid != ""){
      HttpLogin.axios().get("/api/visit/ByPid/" + decodeFinalPatientid)
      .then((resp) => {  
        HttpLogin.axios().get("api/patient/getPatient/" + decodeFinalPatientid)
        .then((res) => {
          //  console.log(JSON.stringify(res.data));    
          if(res.data.message.code === "MHC - 0200"){   
          setInputPatientInfo(res.data.data.basicDetails[0].name[0].given+" "+res.data.data.basicDetails[0].name[0].family);
          setPatientImage(res.data.data.basicDetails[0].profile !== ""? res.data.data.basicDetails[0].profile:"");          
          setPatientDateOfBirth(moment(res.data.data.basicDetails[0].birthDate).format('MMM DD,YYYY'));
          var genderChanges = res.data.data.basicDetails[0].gender === "M"?"Male":res.data.data.basicDetails[0].gender === "fm" ?"Female":"Not Specify";
          setPatientGender(genderChanges);
          var ssnValue = res.data.data.basicDetails[0].ssn != undefined ? res.data.data.basicDetails[0].ssn.slice(6,9):""
          setPatientSSN(ssnValue);
          var today = new Date();
          var birthDate = new Date(moment(res.data.data.basicDetails[0].birthDate,"YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z"));
  // create a date object directly from `dob1` argument
  var age_now = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
  {
    age_now--;
  }     
  setPatientAge(age_now);
          }else{
            alert(res.data.message.description);
          }
        })
       if(resp.data.message.code === "MHC - 0200"){
        setTableNewData(resp.data.data.filter(t=>t.organization === result.data.data.id));                
    }else{
      alert(resp.data.message.description);
    }
    })
    }else{
      HttpLogin.axios().get('/api/visit/getAll')
      .then((response)=>{
        if(response.data.message.code === "MHC - 0200"){  
        //  console.log(JSON.stringify(response.data.data.filter(t=>t.organization === result.data.data.id))); 
        //  console.log(JSON.stringify(result.data.data.id));           
        setTableNewData(response.data.data.filter(t=>t.organization === result.data.data.id));
        }else{
          alert(response.data.message.description);
        }
      })
    }
  })
  dispatch(getAllStaff());
    }, []);

 
    let [increment, setIncrement] = useState(1);

    function incrementValue (){
      return increment++;
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
 var newEncryptPid =  CryptoJS.AES.encrypt(event.data.pid, 'secret key 123');
 var setNewEncryptPid = encodeURIComponent(newEncryptPid.toString());
   //console.log(JSON.stringify(event.data));
 window.location.href = "/MettlerVisitPatientdata/"+setNewEncryptPid+"/"+setEncryptVisitId;
}

const handleFixedChange = () =>{
  
}
let [getValidCount,setVaildCount] = useState(1);
const handleOrder =(event)=>{
  setVaildCount(getValidCount+1);
  if(getValidCount%2 === 0){
   //   console.log(JSON.stringify(tableData.sort((a, b) => a.patientId > b.patientId ? 1:-1)));
  }else{
  //    console.log(JSON.stringify(tableData.sort((a, b) => a.patientId < b.patientId ? 1:-1)));
  }
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

const dataVisitStartDate = (rowData:any)=>{
  return rowData.visitStartDate != "string"? <span> {moment(rowData.visitStartDate,"YYYYMMDDHHmmss").format('MMM DD,hh:mm A')}</span>:<span>--</span>
}

const dataAdmitDate = (rowData:any) =>{
  return rowData.admitDate != "string" && rowData.admitDate != null ? <span> {moment(rowData.admitDate,"YYYYMMDDHHmmss").format('MMM DD,hh:mm A')}</span>:<span>--</span>    
}

const dataDischDate = (rowData:any) =>{
  return rowData.dischargeDate != "string" && rowData.dischargeDate != null ? <span> {moment(rowData.dischargeDate,"YYYYMMDDHHmmss").format('MMM DD,hh:mm A')}</span>:<span>--</span>    
}

const dataResourceType = (rowData:any) =>{
  return rowData.resource[0].resourceType != "" ?<span>{rowData.resource[0].resourceType}</span>:<span>--</span>
}

const dataAdmitPhys = (rowData:any) =>{
  var staffData = getStaffDataItems.length>0 && getStaffDataItems.filter(i => i.id === rowData.refferingPhysycian).map(k=>{return k.name[0].given+" "+k.name[0].family})
  return rowData.refferingPhysycian != "" ?<span>{staffData}</span>:<span>--</span>
}

const dataAdmitStatus = (rowData:any) =>{
  var newStatus = StatusData !== null && StatusData.length>0 && StatusData.filter(l=>l.id === rowData.status).map(k=>{return k.value})
  return rowData.status != "" ?<span>{newStatus}</span>:<span>--</span>
}

  
const handleAddVisit = () =>{
  var CryptoJS = require("crypto-js"); 
  var encryptPatientId = CryptoJS.AES.encrypt(decryptPatientId, 'secret key 123');
   var setEncryptPatientId = encodeURIComponent(encryptPatientId.toString()); 
  window.location.href = "/MettlerAdmitPatientupdated/"+setEncryptPatientId;
}
  return  (
    <div style={{background:decryptPatientId != ""?'#2D56AD':"#FFF",height:decryptPatientId != ""?'98px':'0px',display:'flex',width:'calc(100% - 0px)',position:'absolute'}} >
      {decryptPatientId && <>
        <div id="mettlerEmptyPadding" className="p-col-12 p-md-1">    
     
     <img style={{width:'60px',height:'60px',position:'relative',left:'21px',top:'23px',borderRadius:patientImage !== ""?"30px":""}} src={patientImage !== ""?patientImage:AvatarBigImage}></img>     
     </div>
        <div id="mettlerEmptyPadding" style={{display:'flex',flexDirection:'column'}} className="p-col-12 p-md-6"> 
        <div style={{display:'flex',flexDirection:'row'}}>
      <div style={{position:'relative',top:'19px',minWidth:'max-content',fontSize:'18px'}} className="App-TopBar-PatientName">{inputPatientInfo}</div>
      <div style={{position:'relative',top:'23px',left:'6px',minWidth:'max-content',fontSize:'14px'}} className="App-TopBar-PatientAge">{patientAge} Years</div>

            <div className="admit-patient-ss" style={{width:'110px',height:'24px',background:'#5574B7',border:'1px solid #5574B7',position:'relative',top:'19px',left:'23px',borderRadius:'14px',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{fontWeight:400,fontSize:'12px',opacity:0.6,color:'#FFF'}} className="admit-patient-profileName">SS#:</div>
            <div style={{fontWeight:400,fontSize:'12px',color:'#FFF'}} className="admit-patient-profileName">SS-{patientSSN}</div>            
            </div>
            <div className="admit-patient-ss" style={{width:'110px',height:'24px',position:'relative',left:'40px',top:'19px',background:'#5574B7',border:'1px solid #5574B7',borderRadius:'14px',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{fontWeight:400,fontSize:'12px',opacity:0.6,color:'#FFF'}} className="admit-patient-profileName">MR:</div>
            <div style={{fontWeight:400,fontSize:'12px',color:'#FFF'}} className="admit-patient-profileName">MR-345</div>            
            </div>          
        </div>
        <div style={{display:'flex',flexDirection:'row'}}>
      <div style={{position:'relative',top:'32px',display:'flex'}} >
        <img style={{width:'26px',height:'26px',position:'relative',top:'8px',left:'5px',fontSize:'10px'}} src={bloodBag}></img>
       <span style={{opacity: 0.6000000238418579,position:'relative',left:'7px',top:'1px',fontSize:'10px'}}className="App-TopBar-BloodName">Blood</span> 
       <span  style={{position:'relative',top:'14px',left:'-22px',fontSize:'12px'}} className="App-TopBar-PatientValue">A</span><span style={{position:'relative',top:'13px',left:'-22px',fontSize:'12px'}}className="App-TopBar-PatientValue">+</span> 
       </div>
       <div style={{position:'relative',top:'30px',left:'',display:'flex'}}>
        <img style={{width:'26px',height:'26px',position:'relative',top:'10px',left:'5px',fontSize:'10px'}} src={bloodDrop}></img>
       <span style={{opacity: 0.6000000238418579,position:'relative',left:'6px',top:'5px',fontSize:'10px'}}className="App-TopBar-BloodName">Height</span> 
       <span  style={{position:'relative',top:'18px',left:'-25px',fontSize:'12px',width:'30px'}} className="App-TopBar-PatientValue">--</span>
       </div>
       <div style={{position:'relative',top:'30px',display:'flex'}}>
        <img style={{width:'26px',height:'26px',position:'relative',top:'10px',left:'5px'}} src={bloodDropNew}></img>
       <span style={{opacity: 0.6000000238418579,position:'relative',left:'6px',top:'8px',fontSize:'10px'}}className="App-TopBar-BloodName">Weight</span> 
       <span  style={{position:'relative',top:'23px',left:'-29px',fontSize:'12px'}} className="App-TopBar-PatientValue">45kg</span> 
       </div>
       <div style={{position:'relative',top:'30px',display:'flex'}} >
        <img style={{width:'26px',height:'26px',position:'relative',top:'10px',left:'5px'}} src={bloodDropNewOne}></img>
       <span style={{opacity: 0.6000000238418579,position:'relative',left:'7px',top:'9px',fontSize:'10px'}}className="App-TopBar-BloodName">DOB</span> 
       <span  style={{position:'relative',top:'22px',left:'-13px',fontSize:'12px',width:'75px'}} className="App-TopBar-PatientValue">{patientDateOfBirth}</span> 
       </div>
       <div style={{position:'relative',top:'30px',left:'10px',display:'flex'}}>
       <img style={{width:'26px',height:'26px',position:'relative',top:'10px',left:'5px'}} src={AvatarDoctorImage}></img>
        <span style={{fontSize:'16px',position:'relative',top:'11px',left:'13px',width:'200px'}} className="App-TopBar-PatientValue">Dr. Linda Blair, OP</span>
       </div>
       </div>
      </div> 
      <div id="mettlerEmptyPadding" className="p-col-12 p-md-5">  </div>   
      </>}
      <div id="removePadding" style={{width:'calc(100% - 2px)',position:"absolute",top:decryptPatientId!=""?'127px':'58px'}} className="p-col-12 p-md-12 vpdashboard-Title">
              <span style={{position:'relative',left:'10px'}}  className="dashboard-Title-insideText">All Visit List</span>
              <span className="patient-dashboard-count-deleteText">{selectedRow} Selected</span>
              <span style={{width:'1px',height:'20px', color:'#BBC5CE',position:'relative',left:'557px',top:'6px',borderLeftStyle:'groove'}}></span>
              <a style={{cursor:'pointer'}} onClick={(e)=>handleOrder(e)}><img src={switchVertical} style={{width:'24px',height:'24px',position:'relative',left:'570px',top:'4px'}}></img></a>
              <img src={filterList} style={{width:'24px',height:'24px',position:'relative',left:'588px',top:'3px'}}></img>
              <a style={{cursor:'pointer'}} onClick={handleAddVisit}><img src={addSymbol} style={{width:'24px',height:'24px',position:'relative',left:'604px',top:'3px'}}></img></a>
              <input type="text" className="dashboard-search-text" id="new" name="new" value={null} onChange={null} placeholder="Search" style={{paddingLeft:'36px',fontFamily: 'system-ui',position:'relative', width:'199px',left:'609px'}} />
              <img src={searchImage} style={{width:'20x',height:'20px',position:'relative',left:'415px',top:'5px',opacity:0.3}}></img>
            </div>   
      <div style={{position:'absolute',top:decryptPatientId!=""?'199px':'117px',left:'6px',width:'calc(100% - 13px)'}}>
            <DataTable style={{border:'0px'}}
                  value={tableNewData} onRowSelect={onRowSelectData}
                  selectionMode="multiple" 
                  rows={50} scrollable={true} 
                  responsive={true} selection={selectedValues} onSelectionChange={onSelectionChangedData}
                  emptyMessage="No records found">
                  <Column selectionMode="multiple" headerStyle={{width:'4%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'5%',background:'#FFF'}}></Column>
                  <Column header="S.No." headerStyle={{width:'10%', textAlign:'start',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'20%',background:'#FFF'}} body={incrementValue}/>
                  <Column field="visitStartDate" header="Visit Date & Time" headerStyle={{width:'14%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'23%',background:'#FFF'}} body={dataVisitStartDate}/>
                  <Column field="visitReason" header="Visit Reason" headerStyle={{width:'8%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'15%',background:'#FFF'}} />
                  <Column field="admitDate" header="Admitted Date & Time" headerStyle={{width:'16%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'29%',background:'#FFF'}} body={dataAdmitDate}/>                  
                  <Column field="dischargeDate" header="Discharge Date" headerStyle={{width:'17%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'27%',background:'#FFF'}} body={dataDischDate}/>                  
                  <Column field="refferingPhysycian" header="Referring Physician" headerStyle={{width:'15%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'31%',background:'#FFF'}} body={dataAdmitPhys}/>
                  <Column field="status" header="Status" headerStyle={{width:'13%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'13%',background:'#FFF'}} body={dataAdmitStatus}/>                 
                  <Column field="" header="" headerStyle={{width:'',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500}} style={{borderLeft:'0px',borderRight:'0px',width:'7%',background:'#FFF'}} /> 
                </DataTable>
                </div> 
      </div>
    );
        
    
};
const mapStateToProps = (state: any) => {
    const { deviceFormData,getAllStaffData,getallptvisitData } = state;
    return {
        deviceFormData,getAllStaffData,getallptvisitData
    };
};
export default connect(mapStateToProps)(VisitPatient)