import { useState, Dispatch, useEffect } from "react";


import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
  FormControlLabel,
  RadioGroup,
  Radio,

} from "@mui/material";
import moment from "moment";
import "./AdmitPatientupdated.css";
import React from "react";
import { connect } from "react-redux";
import { DatePicker, LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import bottomImage from './../../../assets/images/mettler_images/bg.svg';
import PatientVisitData from './../../../assets/data/PatientVisitData.json'
import { createPatientVisit, getPatientVisitById, UpdatePatientVisit } from "../../../store/actions/PatientVisitAdminController";
import SecondaryButton from "../../../components/SecondaryButton";
import PrimaryButton from "../../../components/PrimaryButton";
import "../../../components/BottomFooter.css";
import { HttpLogin } from "../../../utils/Http";
import { getAllPatient } from "../../../store/actions/Patient";
import { getAllStaff } from "../../../store/actions/Staff";
import AvatarBigImage from './../../../assets/images/mettler_images/AvatarBigImage.png';
import bloodBag from './../../../assets/images/mettler_images/blood_bag.svg';
import bloodDrop from './../../../assets/images/mettler_images/blood_drop.svg';
import bloodDropNew from './../../../assets/images/mettler_images/blood_dropNew.svg';
import bloodDropNewOne from './../../../assets/images/mettler_images/blood_dropNewOne.svg';
import AvatarDoctorImage from './../../../assets/images/mettler_images/AvatarDoctor.png';
import { createBrowserHistory } from "history";
import loaddingFile from '../../../../src/assets/images/tenor.gif';
interface IAdmitPatientupdated { }
interface IAdmitPatientupdated {
  StaticPage: any;
  dispatch: Dispatch<any>;
  getbyidPatientVisitData: any;
  CreateptvisitData: any;
  updatePatientVisitData: any;
  getAllPatientData: any;
  CreatePatientVisitData:any;
  errorMessage: any;
  getAllStaffData: any;
  match: any;
  state: {
    nodes: [],
    checked: [],
    expanded: []
  }
}
const AdmitPatientupdated: React.FC<IAdmitPatientupdated> = ({
  dispatch, getbyidPatientVisitData, errorMessage, match, CreateptvisitData,CreatePatientVisitData, updatePatientVisitData, getAllPatientData, getAllStaffData


}) => {

  const history = createBrowserHistory();
  let [inputFormData, setInputFormData] = useState(PatientVisitData);
  let [getPatientDataItems, setGetPatientDataItems] = useState(new Array<any>());
  let [getStaffDataItems, setGetStaffDataItems] = useState(new Array<any>());
  let [encryptPatientId, setEncryptPatientId] = useState(null);
  let [decryptPatientId, setDecryptPatientId] = useState(null);
  let [encryptVisitId, setEncryptVisitId] = useState(null);
  let [decryptVisitId, setDecryptVisitId] = useState(null);
  let [inputOrgData, setInputOrgData] = useState("");
  
   let [patientSSN, setPatientSSN] = useState(null);
  let [patientImage, setPatientImage] = useState("");
  let [patientGender, setPatientGender] = useState(null);
  let [patientDateOfBirth, setPatientDateOfBirth] = useState(null);
  let [inputPatientInfo, setInputPatientInfo] = useState(null);
  let [patientAge, setPatientAge] = useState(null);
  let [StatusData, setStatusData] = useState(null);
  let [specialityData, setspecialityData] = useState(null);
  let [inputOrgId, setInputOrgId] = useState("");
  let [newLastVisitId, setNewLastVisitId] = useState("");
  const [spinner, setSpinner] = useState(false);
  useEffect(() => {
    setSpinner(true); 
    var orgData = JSON.parse(window.localStorage.getItem("LOGINDATA"));
    orgData = orgData.loginInput.organization;
    HttpLogin.axios().get("api/org/getById/" + orgData)
      .then((res) => {
        if (res.data.message.code === "MHC - 0200") {
        //  console.log(JSON.stringify(res.data.data));
          setInputOrgId(res.data.data.id);
          setInputOrgData(res.data.data.organizationdetails[0].name);

        } else {
          setInputOrgData("");
        }
      })
    var CryptoJS = require("crypto-js");
    var encryptPatient = match.params.patientId;
    setEncryptPatientId(encryptPatient);
    let decodePatientid = decodeURIComponent(encryptPatient);
    let decodeFinalPatientid = CryptoJS.AES.decrypt(decodePatientid.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
    setDecryptPatientId(decodeFinalPatientid);
    //  console.log(JSON.stringify(decodeFinalPatientid));
    var encryptInitial = match.params.id;
    setEncryptVisitId(encryptInitial);
    let decodeVisitid = decodeURIComponent(encryptInitial);
    let decodeFinalVisitid = CryptoJS.AES.decrypt(decodeVisitid.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
    setDecryptVisitId(decodeFinalVisitid);
    if (decodeFinalVisitid != "") {
      //  console.log(JSON.stringify(decodeFinalVisitid));
      dispatch(getPatientVisitById(decodeFinalVisitid));
    }
    HttpLogin.axios().get("api/patient/getPatient/" + decodeFinalPatientid)
      .then((response) => {
        //     console.log(JSON.stringify(response.data.data))     
        
        if (response.data.message.code === "MHC - 0200") {
          setInputPatientInfo(response.data.data.basicDetails[0].name[0].given+" "+response.data.data.basicDetails[0].name[0].family);
          setPatientImage(response.data.data.basicDetails[0].profile !== ""? response.data.data.basicDetails[0].profile:"");           
          setPatientDateOfBirth(moment(response.data.data.basicDetails[0].birthDate).format('MMM DD,YYYY'));
          var genderChanges = response.data.data.basicDetails[0].gender === "M" ? "Male" : response.data.data.basicDetails[0].gender === "fm" ? "Female" : "Not Specify";
          setPatientGender(genderChanges);
          var ssnValue = response.data.data.basicDetails[0].ssn != undefined ? response.data.data.basicDetails[0].ssn.slice(6, 9) : ""
          setPatientSSN(ssnValue);
          var today = new Date();
          var birthDate = new Date(moment(response.data.data.basicDetails[0].birthDate,"YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z"));
          // create a date object directly from `dob1` argument
          var age_now = today.getFullYear() - birthDate.getFullYear();
          var m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age_now--;
          }
          setPatientAge(age_now);       
        } else {
          alert(response.data.message.description);
        }

      })
      HttpLogin.axios().get("/api/visit/ByPid/"+decodeFinalPatientid)
      .then((resp) => {
        console.log(JSON.stringify(resp.data));
        if(resp.data.message.code === "MHC - 0200"){
          setNewLastVisitId(resp.data.data[resp.data.data.length - 1].id);
          
        }      
      })
    HttpLogin.axios().get("api/dropdowns/get-all")
      .then((response) => {
        let StatusInputData = response.data.data.filter(k => k.dropdown === "status").map((i) => { return i.list })
        setStatusData(StatusInputData[0]);
        let specialityData = response.data.data.filter(k => k.dropdown === "speciality").map((i) => { return i.list })
        setspecialityData(specialityData[0]);
      })   
    dispatch(getAllStaff());
    dispatch(getAllPatient());
  }, []);
  let newstatusData = StatusData != null && StatusData.length > 0 && StatusData.map((item, i) => {
    return (
      <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
    )
  })
  let newspecialityData = specialityData != null && specialityData.length > 0 && specialityData.map((item, i) => {
    return (
      <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
    )
  })
  const handleInputChange = (event: any) => {
    if (event.target.name === "visitType") {
      inputFormData.visitType = event.target.value;
    } else if (event.target.name === "refferingPhysycian") {
      inputFormData.refferingPhysycian = event.target.value;
    } else if (event.target.name === "speciality") {
      inputFormData.speciality = event.target.value;
    } else if (event.target.name === "schedule") {
      inputFormData.schedule = event.target.value;
    }  else if (event.target.name === "admissionReason") {
      inputFormData.visitReason = event.target.value;
    } else if (event.target.name === "status") {
      inputFormData.status = event.target.value;
    } else if (event.target.id === "location") {
      inputFormData.location = event.target.value;
    }

    setInputFormData({ ...inputFormData });
  }

  const [isPatientPageLoaded, setPatientPageLoaded] = useState(false);

  if (!isPatientPageLoaded && !getAllPatientData.isLoading) {
    if (getAllPatientData.items.message.code === "MHC - 0200") {
      setGetPatientDataItems(getAllPatientData.items.data.filter(t => t.organization === inputOrgData));
      setSpinner(false);
    } else {
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

  const [isStaffPageLoaded, setStaffPageLoaded] = useState(false);

  if (!isStaffPageLoaded && !getAllStaffData.isLoading) {
    if (getAllStaffData.items.message.code === "MHC - 0200") {
      setGetStaffDataItems(getAllStaffData.items.data.filter(t => t.organization === inputOrgData));
      //  console.log(JSON.stringify(getAllStaffData.items.data));
      setSpinner(false);
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
  const [isAdmitPatientupdateLoaded, setAdmitPatientupdateLoaded] = useState(false);

  if (!isAdmitPatientupdateLoaded && !CreatePatientVisitData.isLoading) { 
    CreatePatientVisitData.items.data.visitStartDate = CreatePatientVisitData.items.data.visitStartDate != null ? new Date(moment(CreatePatientVisitData.items.data.visitStartDate, "YYYYMMDDHHmm").format("YYYY-MM-DDTHH:mm:ss.027Z")) : null;
    CreatePatientVisitData.items.data.visitEndDate = CreatePatientVisitData.items.data.visitEndDate != null ? new Date(moment(CreatePatientVisitData.items.data.visitEndDate, "YYYYMMDDHHmm").format("YYYY-MM-DDTHH:mm:ss.145Z")) : null;
    CreatePatientVisitData.items.data.admitDate = CreatePatientVisitData.items.data.admitDate != null ? new Date(moment(CreatePatientVisitData.items.data.admitDate, "YYYYMMDDHHmm").format("YYYY-MM-DDTHH:mm:ss.027Z")) : null;
    CreatePatientVisitData.items.data.dischargeDate = CreatePatientVisitData.items.data.dischargeDate != null ? new Date(moment(CreatePatientVisitData.items.data.dischargeDate, "YYYYMMDDHHmm").format("YYYY-MM-DDTHH:mm:ss.076Z")) : null; 
        setInputFormData(CreatePatientVisitData.items.data);    
    if (CreatePatientVisitData.items.message.code === "MHC - 0200") {
      alert(CreatePatientVisitData.items.message.description);  
      setTimeout(() => {
        window.location.href = "/MettlerVisitPatientDetails/"+encryptPatientId;
        setSpinner(false);
      }, (1000));   
      setAdmitPatientupdateLoaded(true);    
    } else {
      alert(CreatePatientVisitData.items.message.description);   
      setTimeout(() => {
        setAdmitPatientupdateLoaded(false);
        setSpinner(false);
      }, (1000));
    }
  
}
if (!CreatePatientVisitData && CreatePatientVisitData.isFormSubmit) {

    setTimeout(() => {
      setAdmitPatientupdateLoaded(false);
      setSpinner(false);
    }, (1000));
}


let [isUpdateAdmitpatientLoaded, setUpdateAdmitpatientLoaded] = useState(false);

if (!isUpdateAdmitpatientLoaded && !updatePatientVisitData.isLoading) {
  updatePatientVisitData.items.data.visitStartDate = updatePatientVisitData.items.data.visitStartDate != null ? new Date(moment(updatePatientVisitData.items.data.visitStartDate, "YYYYMMDDHHmm").format("YYYY-MM-DDTHH:mm:ss.027Z")) : null;
  updatePatientVisitData.items.data.visitEndDate = updatePatientVisitData.items.data.visitEndDate != null ? new Date(moment(updatePatientVisitData.items.data.visitEndDate, "YYYYMMDDHHmm").format("YYYY-MM-DDTHH:mm:ss.145Z")) : null;
  updatePatientVisitData.items.data.admitDate = updatePatientVisitData.items.data.admitDate != null ? new Date(moment(updatePatientVisitData.items.data.admitDate, "YYYYMMDDHHmm").format("YYYY-MM-DDTHH:mm:ss.027Z")) : null;
  updatePatientVisitData.items.data.dischargeDate = updatePatientVisitData.items.data.dischargeDate != null ? new Date(moment(updatePatientVisitData.items.data.dischargeDate, "YYYYMMDDHHmm").format("YYYY-MM-DDTHH:mm:ss.076Z")) : null; 

  setInputFormData(updatePatientVisitData.items.data); 
  if (updatePatientVisitData.items.message.code === "MHC - 0200") {    
      alert(updatePatientVisitData.items.message.description);   
  
      console.log(JSON.stringify(updatePatientVisitData.items));  
      setTimeout(() => {
        window.location.href = "/MettlerAdmitPatient";
        setSpinner(false);
      }, (1000)); 
      setUpdateAdmitpatientLoaded(true);  
  } else {

    alert(updatePatientVisitData.items.message.description);     
    setTimeout(() => {
      setUpdateAdmitpatientLoaded(false);
      setSpinner(false);
    }, (1000));    
  }  

}

if (!updatePatientVisitData && updatePatientVisitData.isFormSubmit) {
  setTimeout(() => {
    setUpdateAdmitpatientLoaded(false);

  }, (1000));
}
  const [isPageLoaded, setPageLoaded] = useState(false);

  if (!isPageLoaded && !getbyidPatientVisitData.isLoading) {
    
    if (getbyidPatientVisitData.items.message.code === "MHC - 0200") {
      getbyidPatientVisitData.items.data.visitStartDate = getbyidPatientVisitData.items.data.visitStartDate != null ? new Date(moment(getbyidPatientVisitData.items.data.visitStartDate, "YYYYMMDDHHmm").format("YYYY-MM-DDTHH:mm:ss.027Z")) : null;
      getbyidPatientVisitData.items.data.visitEndDate = getbyidPatientVisitData.items.data.visitEndDate != null ? new Date(moment(getbyidPatientVisitData.items.data.visitEndDate, "YYYYMMDDHHmm").format("YYYY-MM-DDTHH:mm:ss.145Z")) : null;
      getbyidPatientVisitData.items.data.admitDate = getbyidPatientVisitData.items.data.admitDate != null ? new Date(moment(getbyidPatientVisitData.items.data.admitDate, "YYYYMMDDHHmm").format("YYYY-MM-DDTHH:mm:ss.027Z")) : null;
      getbyidPatientVisitData.items.data.dischargeDate = getbyidPatientVisitData.items.data.dischargeDate != null ? new Date(moment(getbyidPatientVisitData.items.data.dischargeDate, "YYYYMMDDHHmm").format("YYYY-MM-DDTHH:mm:ss.076Z")) : null;
     setInputFormData(getbyidPatientVisitData.items.data);
      setPageLoaded(true)
    } else {
      setInputFormData({ ...PatientVisitData });
      setPageLoaded(true);
    }
    setSpinner(false);
  }
  if (!getbyidPatientVisitData && getbyidPatientVisitData.isFormSubmit) {

    setTimeout(() => {
      setPageLoaded(false);
      setSpinner(false);
    }, (1000));
  }



  const handleClickChange = () => {
   
    inputFormData.pid = decryptPatientId;
    inputFormData.organization = inputOrgId;
    setInputFormData({ ...inputFormData });
    setSpinner(true);
    if (inputFormData.visitStartDate === null || inputFormData.visitStartDate === "" || inputFormData.visitEndDate === null || inputFormData.visitEndDate === "" ||
      inputFormData.admitDate === null || inputFormData.admitDate === "" || inputFormData.visitType === "" || inputFormData.refferingPhysycian === "") {
      alert("Please Enter required data");
    } else if (inputFormData.id != "") {
      inputFormData.id = decryptVisitId;      
      dispatch(UpdatePatientVisit(inputFormData));
    } else {
      inputFormData.lastVisit = newLastVisitId;
      dispatch(createPatientVisit(inputFormData));   
    }


  }
//   const handleClickChange = () =>{      
//     inputFormData.admitDate = inputFormData.admitDate !== null && inputFormData.admitDate !== "" ? moment(inputFormData.admitDate).format('YYYYMMDD'): null;
//     inputFormData.dischargeDate = inputFormData.dischargeDate !== null && inputFormData.dischargeDate !== "" ? moment(inputFormData.dischargeDate).format('YYYYMMDD'):null;
//     inputFormData.visitStartDate = inputFormData.visitStartDate !== null && inputFormData.visitStartDate !== "" ? moment(inputFormData.visitStartDate).format('YYYYMMDD'): null;
//     inputFormData.visitEndDate = inputFormData.visitEndDate !== null && inputFormData.visitEndDate !== "" ? moment(inputFormData.visitEndDate).format('YYYYMMDD'): null;           
//     if(errorMessage === ""){   
//       setSpinner(true);    
//       setInputFormData({...inputFormData}); 
//       if(inputFormData.id !== ""){     
//         dispatch(UpdatePatientVisit(inputFormData)); 
//         setUpdateAdmitpatientLoaded(false);   
                    
//       } else{     
//         inputFormData.lastVisit = newLastVisitId;    
//         dispatch(createPatientVisit(inputFormData));  
//         setAdmitPatientupdateLoaded(false);        
       
//       } 
//   }
 
// else {
//   alert(errorMessage); 
//   inputFormData.admitDate = inputFormData.admitDate !== null && inputFormData.admitDate !== "" ? moment(inputFormData.admitDate).format('YYYYMMDD'): null;
//   inputFormData.dischargeDate = inputFormData.dischargeDate !== null && inputFormData.dischargeDate !== "" ? moment(inputFormData.dischargeDate).format('YYYYMMDD'):null;
//   inputFormData.visitStartDate = inputFormData.visitStartDate !== null && inputFormData.visitStartDate !== "" ? moment(inputFormData.visitStartDate).format('YYYYMMDD'): null;
//   inputFormData.visitEndDate = inputFormData.visitEndDate !== null && inputFormData.visitEndDate !== "" ? moment(inputFormData.visitEndDate).format('YYYYMMDD'): null;   
//   setInputFormData({...inputFormData}); 
// };
// }

const handleCancelChange = ()=>{
  window.location.reload();
}

  return (


    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <>
        <div style={{ top: "6px", background: decryptPatientId != "" ? '#2D56AD' : "#FFF", height: decryptPatientId != "" ? '98px' : '0px', display: 'flex', width: 'calc(100% - 0px)', position: 'absolute', left: "0px" }} >
          <div id="mettlerEmptyPadding" className="p-col-12 p-md-1">

            <div id="mettlerEmptyPadding" className="p-col-12 p-md-1">
              <img style={{width:'60px',height:'60px',position:'relative',left:'21px',top:'23px',borderRadius:patientImage !== ""?"30px":""}} src={patientImage !== ""?patientImage:AvatarBigImage}></img>
            </div>
            <div id="mettlerEmptyPadding" style={{ display: 'flex', flexDirection: 'column' }} className="p-col-12 p-md-6">
              <div style={{ display: 'flex', flexDirection: 'row', position: "absolute", top: "7px", left: "97px" }}>
                <div style={{ position: 'relative', top: '19px', minWidth: 'max-content', fontSize: '18px' }} className="App-TopBar-PatientName">{inputPatientInfo}</div>
                <div style={{ position: 'relative', top: '23px', left: '6px', minWidth: 'max-content', fontSize: '14px' }} className="App-TopBar-PatientAge">{patientAge}Years</div>

                <div className="admit-patient-ss" style={{ width: '110px', height: '24px', background: '#5574B7', border: '1px solid #5574B7', position: 'relative', top: '19px', left: '23px' }}>
                  <div style={{ fontWeight: 400, fontSize: '12px', opacity: 0.6, color: '#FFF' }} className="admit-patient-profileName">SS#:</div>
                  <div style={{ fontWeight: 400, fontSize: '12px', color: '#FFF' }} className="admit-patient-profileName">SS-</div>
                </div>
                <div className="admit-patient-ss" style={{ width: '110px', height: '24px', position: 'relative', left: '40px', top: '19px', background: '#5574B7', border: '1px solid #5574B7' }}>
                  <div style={{ fontWeight: 400, fontSize: '12px', opacity: 0.6, color: '#FFF' }} className="admit-patient-profileName">MR:</div>
                  <div style={{ fontWeight: 400, fontSize: '12px', color: '#FFF' }} className="admit-patient-profileName">MR-345</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', position: "absolute", top: "20px", left: "86px" }}>
                <div style={{ position: 'relative', top: '32px', display: 'flex' }} >
                  <img style={{ width: '26px', height: '26px', position: 'relative', top: '8px', left: '5px', fontSize: '10px' }} src={bloodBag}></img>
                  <span style={{ opacity: 0.6000000238418579, position: 'relative', left: '7px', top: '1px', fontSize: '10px' }} className="App-TopBar-BloodName">Blood</span>
                  <span style={{ position: 'relative', top: '14px', left: '-22px', fontSize: '12px' }} className="App-TopBar-PatientValue">A</span><span style={{ position: 'relative', top: '13px', left: '-22px', fontSize: '12px' }} className="App-TopBar-PatientValue">+</span>
                </div>
                <div style={{ position: 'relative', top: '30px', left: '', display: 'flex' }}>
                  <img style={{ width: '26px', height: '26px', position: 'relative', top: '10px', left: '5px', fontSize: '10px' }} src={bloodDrop}></img>
                  <span style={{ opacity: 0.6000000238418579, position: 'relative', left: '6px', top: '5px', fontSize: '10px' }} className="App-TopBar-BloodName">Height</span>
                  <span style={{ position: 'relative', top: '18px', left: '-25px', fontSize: '12px', width: '30px' }} className="App-TopBar-PatientValue">--</span>
                </div>
                <div style={{ position: 'relative', top: '30px', display: 'flex' }}>
                  <img style={{ width: '26px', height: '26px', position: 'relative', top: '10px', left: '5px' }} src={bloodDropNew}></img>
                  <span style={{ opacity: 0.6000000238418579, position: 'relative', left: '6px', top: '8px', fontSize: '10px' }} className="App-TopBar-BloodName">Weight</span>
                  <span style={{ position: 'relative', top: '23px', left: '-29px', fontSize: '12px' }} className="App-TopBar-PatientValue">45kg</span>
                </div>
                <div style={{ position: 'relative', top: '30px', display: 'flex' }} >
                  <img style={{ width: '26px', height: '26px', position: 'relative', top: '10px', left: '5px' }} src={bloodDropNewOne}></img>
                  <span style={{ opacity: 0.6000000238418579, position: 'relative', left: '7px', top: '9px', fontSize: '10px' }} className="App-TopBar-BloodName">DOB</span>
                  <span style={{ position: 'relative', top: '22px', left: '-13px', fontSize: '12px', width: '75px' }} className="App-TopBar-PatientValue">{patientDateOfBirth}</span>
                </div>
                <div style={{ position: 'relative', top: '30px', left: '10px', display: 'flex' }}>
                  <img style={{ width: '26px', height: '26px', position: 'relative', top: '10px', left: '5px' }} src={AvatarDoctorImage}></img>
                  <span style={{ fontSize: '16px', position: 'relative', top: '11px', left: '13px', width: '200px' }} className="App-TopBar-PatientValue">Dr. Linda Blair, OP</span>
                </div>
              </div>
            </div>

          </div>
          <div id="mettlerEmptyPadding" className="p-col-12 p-md-5">  </div>
        </div>
        <div className="AdmitPatientupdated-details" style={{ height: "1178px" }}>
        {spinner &&
                (<div className='overlay-content'>
                    <div className='wrapper'>
                        <img alt="" src={loaddingFile} style={{ position: 'absolute', width: '100%', height:'-webkit-fill-available', zIndex: 2, opacity: '0.5' }} />
                    </div>
                </div>
                )}
          <div className="AdmitPatientupdated-details-child" />
          <div className="AdmitPatientupdated-details-child1" />
          <div className="AdmitPatientupdatedline-div" />
          <div className="AdmitPatientupdatedexpand-more-24px-parent" >
            <img
              className="AdmitPatientupdatedexpand-more-24px-icon"
              alt=""
              src="/expand-more-24px.svg"
            />
            <div style={{ minWidth: 'max-content' }} className="AdmitPatientupdateddetails">Add a Visit</div>
          </div>


          <div className="AdmitPatientupdatedorgForm-fields2">

            <MobileDateTimePicker
              label="Expected admit Date Time"
              value={inputFormData.admitDate}
              onChange={(newValue) => {
                inputFormData.admitDate = newValue
                setInputFormData({ ...inputFormData });
              }}
              slotProps={{
                textField: {
                  variant: "outlined",
                  size: "medium",
                  fullWidth: true,
                  color: "primary",
                },
              }}
            />
            <MobileDateTimePicker
              label="Expected discharge Date Time"
              value={inputFormData.dischargeDate}
              onChange={(newValue) => {
                inputFormData.dischargeDate = newValue
                setInputFormData({ ...inputFormData });
              }}
              slotProps={{
                textField: {
                  variant: "outlined",
                  size: "medium",
                  fullWidth: true,
                  color: "primary",
                },
              }}
            />

          </div>
          <div className="AdmitPatientupdatedorgForm-fields3" style={{ top: "279px" }}>
            <FormControl className="AdmitPatientupdatedname-input13" variant="outlined">
              <InputLabel color="primary">Visit Reason</InputLabel>
              <Select
                value={inputFormData.visitReason}
                color="primary"
                size="medium"
                label="Visit Reason"
                name="admissionReason" id="admissionReason" onChange={handleInputChange}>
                <MenuItem value="Reason1">Reason 1</MenuItem>
                <MenuItem value="Reason2">Reason 2</MenuItem>
                <MenuItem value="Reason3">Reason 3</MenuItem>
                <MenuItem value="Reason4">Reason 4</MenuItem>
                <MenuItem value="Reason5">Reason 5</MenuItem>
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="AdmitPatientupdatedname-input13" variant="outlined">
              <InputLabel color="primary">Visit Type</InputLabel>
              <Select
                value={inputFormData.visitType}
                color="primary"
                size="medium"
                label="Visit Type"
                name="visitType" id="visitType" onChange={handleInputChange}>
                 <MenuItem value="Visit Type1">Visit Type 1</MenuItem>
                <MenuItem value="Visit Type2">Visit Type 2</MenuItem>
                <MenuItem value="Visit Type3">Visit Type 3</MenuItem>
                <MenuItem value="Visit Type4">Visit Type 4</MenuItem>
                <MenuItem value="Visit Type5">Visit Type 5</MenuItem>
              </Select>
              <FormHelperText />
            </FormControl>

          </div>
          <div className="AdmitPatientupdatedorgForm-fields4" style={{ top: "518px", flexDirection: "row-reverse" }}>
            <FormControl className="AdmitPatientupdatedname-input13" variant="outlined">
              <InputLabel color="primary">Reffering Physycian </InputLabel>
              <Select
                value={inputFormData.refferingPhysycian}

                color="primary"
                size="medium"
                label="Admitting Nurse"
                name="refferingPhysycian" onChange={handleInputChange}>
                {getStaffDataItems.filter(i => i.role === "Registered Nurses").map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given+" "+newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="AdmitPatientupdatedname-input13" variant="outlined">
              <InputLabel color="primary">Speciality</InputLabel>
              <Select

                id="speciality"
                color="primary"
                size="medium"
                label="Speciality "
                name="speciality" value={inputFormData.speciality} onChange={handleInputChange}>
                {newspecialityData}
              </Select>
              <FormHelperText />
            </FormControl>
          </div>
          <div className="AdmitPatientupdatedorgForm-fields8">

            <MobileDateTimePicker

              label="Visit Start Date & Time"
              value={inputFormData.visitStartDate}
              onChange={(newValue) => {
                inputFormData.visitStartDate = newValue
                setInputFormData({ ...inputFormData });
              }}
              slotProps={{
                textField: {
                  variant: "outlined",
                  size: "medium",
                  fullWidth: true,
                  color: "primary",
                },
              }}
            />
            <MobileDateTimePicker
              label="Visit End Date & Time"
              value={inputFormData.visitEndDate}
              onChange={(newValue) => {
                inputFormData.visitEndDate = newValue
                setInputFormData({ ...inputFormData });
              }}
              slotProps={{
                textField: {
                  variant: "outlined",
                  size: "medium",
                  fullWidth: true,
                  color: "primary",
                },
              }}
            />

          </div>
          <div className="AdmitPatientupdatedorgForm-fields9" style={{ top: "360px" }}>
            <FormControl className="AdmitPatientupdatedname-input13" variant="outlined">
              <InputLabel color="primary">Status</InputLabel>
              <Select
                value={inputFormData.status}
                color="primary"
                size="medium"
                label="Status"
                name="status" onChange={handleInputChange}>
                {newstatusData}
              </Select>
              <FormHelperText />
            </FormControl>
            <TextField
              id="location" value={inputFormData.location} onChange={handleInputChange}
              className="AdmitPatientupdatedname-input13"
              color="primary"
              variant="outlined"
              type="text"
              name="location"
              label="Location"
              placeholder="Placeholder"
              size="medium"
              margin="none"
            />

          </div>
          <div style={{ position: "relative", left: "304px", top: "600px", color: "#000", fontFamily: "Roboto", fontSize: "16px", fontStyle: "normal", fontWeight: 400, lineHeight: "24px", letterSpacing: "0.15px" }}>Is Schedule Visit?</div>

          <RadioGroup name="schedule" value={inputFormData.schedule} onChange={handleInputChange}
            style={{ position: "absolute", top: "528px", left: "-54px" }}
            row>
            <div className="frame-parent7" style={{ color: 'darkslategray', flexWrap: "nowrap", gap: "30px", position: 'relative', left: '226px', top: '123px' }}>
              <FormControlLabel
                style={{ left: "129px" }}
                className="radio-buttongray-icon3"
                label="Observed" value={true}
                labelPlacement="end"
                control={<Radio color="primary" size="medium" />}
              />
              <FormControlLabel
                style={{ left: "229px" }}
                className="radio-buttongray-icon3"
                label="Historical" value={false}
                labelPlacement="end"
                control={<Radio color="primary" size="medium" />}
              />
            </div>
          </RadioGroup>

          <div className="component-5011">
            <div className="cancel-group">
              <SecondaryButton
                label="Cancel"
                secondaryButtonCursor="pointer"
                onCancelContainerClick={handleCancelChange}
              />
              <div className="previous1">
                <img className="bg-icon3" alt="" src={bottomImage} />
                <div className="label5">Previous</div>
              </div>
              <PrimaryButton
                label="Add"
                primaryButtonCursor="pointer"
                onNextContainerClick={handleClickChange}
              />
            </div>
          </div>

        </div>
      </>
    </LocalizationProvider>
  );

};
const mapStateToProps = (state: any) => {
  const { deviceFormData, getbyidPatientVisitData, getAllPatientData, getAllStaffData, updatePatientVisitData,CreatePatientVisitData } = state;
  return {
    deviceFormData, getbyidPatientVisitData, getAllPatientData, getAllStaffData, updatePatientVisitData,CreatePatientVisitData
  };
};

export default connect(mapStateToProps)(AdmitPatientupdated)