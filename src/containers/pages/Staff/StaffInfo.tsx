import { useState, Dispatch, useEffect } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import bottomImage from './../../../assets/images/mettler_images/bg.svg';
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SecondaryButton from "../../../components/SecondaryButton";
import PrimaryButton from "../../../components/PrimaryButton";
import staffRegisterData from '../../../assets/data/StaffRegisterData.json'
import "./StaffDetails.css";
import "./../../../components/FormFieldsContainer.css";
import { connect } from "react-redux";
import React from "react";
import moment from "moment";
import { createStaff, UpdateStaff } from "../../../store/actions/Staff";
import * as Constants from "../Constants/ConstantValues";
import { HttpLogin } from "../../../utils/Http";
import loaddingFile from '../../../../src/assets/images/tenor.gif';

interface IStaffInfo { }
interface IStaffInfo {
    StaticPage: any;
    dispatch: Dispatch<any>;
    errorMessage: String;
    match: any;
    createStaffData: any;
    UpdateStaffData:any
    state: {
        nodes: [],
        checked: [],
        expanded: []
    }
}
const StaffInfo: React.FC<IStaffInfo> = ({
  dispatch,errorMessage,match, createStaffData, UpdateStaffData
}) => {
 
  let [organizationId, setOrganizationId] = useState("");
  let [inputStaffData, setInputStaffData] = useState(staffRegisterData);
  let [encryptStaffId, setEncryptStaffId] = useState(null);
  let [decryptStaffId, setDecryptStaffId] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [agreement, setAgreement] = useState(false);
  let [roleDropDownValues,setRoleDropDownValues] = useState(null);
  let [skillsAndQualifications,setSkillsAndQualifications] = useState(null);
  let [gender,setgender] = useState(null);
  let [country,setcountry] = useState(null);
  let [speciality,setspeciality] = useState(null);
  let [BackgroundcheckInformation,setBackgroundcheckInformation] = useState(null);
  let [HipaaTraining,setHipaaTraining] = useState(null);
  useEffect(() => {    
    setSpinner(true);    
    var orgData = JSON.parse(window.localStorage.getItem("LOGINDATA"));
    var staffIdData = JSON.parse(window.localStorage.getItem("LOGINDATA"));    
    orgData = orgData.loginInput.organization;   
   setOrganizationId(orgData);
    var encryptInitial = match.params.staffId;
    setEncryptStaffId(encryptInitial);
      var CryptoJS = require("crypto-js");
    let decodeStaffId = decodeURIComponent(encryptInitial);
    let decodeFinalStaffId = staffIdData.items.data.userType[0] === "Staff"  ? staffIdData.items.data.userDetail.id :CryptoJS.AES.decrypt(decodeStaffId.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
    setDecryptStaffId(decodeFinalStaffId); 
    console.log(JSON.stringify(decodeFinalStaffId));
   if(decodeFinalStaffId != ""){
    HttpLogin.axios().get("api/staff/get/"+decodeFinalStaffId)
    .then((res) => {
      if(res.data.message.code === "MHC - 0200"){
        console.log(JSON.stringify(res.data.data))
        res.data.data.dateofBirth = res.data.data.dateofBirth !== "Invalid date" && res.data.data.dateofBirth !== null && res.data.data.dateofBirth !== "" ? new Date(moment(res.data.data.dateofBirth,("YYYY-MM-DD"?"YYYY-MM-DD":"YYYYMMDD")).format("YYYY-MM-DDTHH:mm:ss.000Z")): null;
        res.data.data.terminationDate = res.data.data.terminationDate !== "Invalid date" && res.data.data.terminationDate !== null && res.data.data.terminationDate !== "" ?  new Date(moment(res.data.data.terminationDate,("YYYY-MM-DD"?"YYYY-MM-DD":"YYYYMMDD")).format("YYYY-MM-DDTHH:mm:ss.000Z")): null;
        res.data.data.employeeDetails[0].startDate = res.data.data.employeeDetails[0].startDate !== "Invalid date" && res.data.data.employeeDetails[0].startDate !== null && res.data.data.employeeDetails[0].startDate !== "" ? new Date(moment(res.data.data.employeeDetails[0].startDate,("YYYY-MM-DD"?"YYYY-MM-DD":"YYYYMMDD")).format("YYYY-MM-DDTHH:mm:ss.000Z")): null;
        res.data.data.employeeDetails[0].endDate = res.data.data.employeeDetails[0].endDate !== "Invalid date" && res.data.data.employeeDetails[0].endDate !== null && res.data.data.employeeDetails[0].endDate !== "" ? new Date(moment(res.data.data.employeeDetails[0].endDate,("YYYY-MM-DD"?"YYYY-MM-DD":"YYYYMMDD")).format("YYYY-MM-DDTHH:mm:ss.000Z")) : null;
        res.data.data.ssn = Constants.formatSSNumber(res.data.data.ssn);        
        setInputStaffData(res.data.data);
        setSpinner(false);
      }else{
        alert(res.data.message.description);
      }
     
    })
   }   
   HttpLogin.axios().get("api/dropdowns/get-all")
    .then((response) => {
      let newInputData = response.data.data.filter(k=>k.dropdown === "roles").map((i) => { return i.list }) 
      setRoleDropDownValues(newInputData[0]);    
      let newSkillsAndQualificationsDatas = response.data.data.filter(k=>k.dropdown === "SkillsAndQualifications").map((i) => { return i.list }) 
      setSkillsAndQualifications(newSkillsAndQualificationsDatas[0]); 
      let newgenderDatas = response.data.data.filter(k=>k.dropdown === "gender").map((i) => { return i.list }) 
      setgender(newgenderDatas[0]); 
      let newcountryDatas = response.data.data.filter(k=>k.dropdown === "country").map((i) => { return i.list }) 
      setcountry(newcountryDatas[0]); 
      let newspecialityDatas = response.data.data.filter(k=>k.dropdown === "speciality").map((i) => { return i.list }) 
      setspeciality(newspecialityDatas[0]); 
      let newBackgroundcheckInformationDatas = response.data.data.filter(k=>k.dropdown === "BackgroundcheckInformation").map((i) => { return i.list }) 
      setBackgroundcheckInformation(newBackgroundcheckInformationDatas[0]);
      let newHipaaTrainingDatas = response.data.data.filter(k=>k.dropdown === "HipaaTraining").map((i) => { return i.list }) 
      setHipaaTraining(newHipaaTrainingDatas[0]);
      setSpinner(false);
    })  
   
  }, []);

  let newRoleDropDown = roleDropDownValues != null && roleDropDownValues.length > 0 && roleDropDownValues.map((item, i) => {
    return (
      <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
    )
  })
  let newSkillsAndQualificationsDropDown = skillsAndQualifications != null && skillsAndQualifications.length > 0 && skillsAndQualifications.map((item, i) => {
    return (
      <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
    )
  }) 
  let newgenderDropDown = gender != null && gender.length > 0 && gender.map((item, i) => {
    return (
      <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
    )
  })
  let newcountryDropDown = country != null && country.length > 0 && country.map((item, i) => {
    return (
      <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
    )
  })
  let newspecialityDropDown = speciality != null && speciality.length > 0 && speciality.map((item, i) => {
    return (
      <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
    )
  })
  let newBackgroundcheckInformationDropDown = BackgroundcheckInformation != null && BackgroundcheckInformation.length > 0 && BackgroundcheckInformation.map((item, i) => {
    return (
      <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
    )
  })
  let newHipaaTrainingDropDown = HipaaTraining != null && HipaaTraining.length > 0 && HipaaTraining.map((item, i) => {
    return (
      <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
    )
  })
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    if(event.target.name === "staffGender"){
      inputStaffData.gender = event.target.value;
    } else if(event.target.name === "staffBackGroundCheck"){
      inputStaffData.backgroundCheck =  typeof value === 'string' ? value.split(',') : value;
    } else if(event.target.name === "staffHipaaTraining"){
      inputStaffData.hipaaTraining = event.target.value;
    } else if(event.target.name === "staffJobTitle"){
      inputStaffData.employeeDetails[0].jobTitle = event.target.value;
    } else if(event.target.name === "staffDepartment"){
      inputStaffData.employeeDetails[0].department = event.target.value;
    } else if(event.target.name === "staffSkills"){
      inputStaffData.employeeDetails[0].skills = typeof value === 'string' ? value.split(',') : value;
    } else if(event.target.name === "staffCountry"){
      inputStaffData.contact[0].address[0].country = event.target.value;
    }  else if(event.target.name === "staffrole"){
      inputStaffData.role = event.target.value;
    } else if(event.target.name === "staffUserType"){
      inputStaffData.userType = event.target.value;
    } else if(event.target.name === "staffSpeciality"){
      inputStaffData.speciality[0] = event.target.value;
    } 
    setInputStaffData({...inputStaffData});
  };
 
  const handleInputChange = (event:any)=>{
    if(event.target.id ==="staffFirstName"){
      inputStaffData.name[0].given = Constants.formatFirstName( event.target.value);
    }else if(event.target.id ==="staffMiddleName"){
      inputStaffData.name[0].use = event.target.value;
    }else if(event.target.id ==="staffLastName"){
      inputStaffData.name[0].family = event.target.value.toUpperCase();
    }else if(event.target.id ==="staffSsn"){
      inputStaffData.ssn = Constants.formatSSNumber(event.target.value);
    }else if(event.target.id ==="staffCity"){
      inputStaffData.contact[0].address[0].city = event.target.value;
    }else if(event.target.id ==="staffState"){
      inputStaffData.contact[0].address[0].state = event.target.value;
    }else if(event.target.id ==="staffZip"){
      inputStaffData.contact[0].address[0].zip = Constants.formatNumberOnly( event.target.value);
    }else if(event.target.id ==="staffWorkSchedule"){
      inputStaffData.employeeDetails[0].workSchedule = event.target.value;
    }else if(event.target.id ==="staffSalary"){
      inputStaffData.employeeDetails[0].salary = event.target.value;
    }else if(event.target.id ==="staffEmployeeId"){
      inputStaffData.employeeDetails[0].employeeId = event.target.value;
    }else if(event.target.id ==="staffAddressLine1"){
      inputStaffData.contact[0].address[0].addressLine1 = event.target.value;
    }else if(event.target.id ==="staffAddressLine2"){
      inputStaffData.contact[0].address[0].addressLine2 = event.target.value;
    }else if(event.target.id ==="staffEmail"){
      inputStaffData.email= event.target.value;
    }else if(event.target.id ==="staffMobileNumber"){
      inputStaffData.contact[0].mobilePhone = Constants.formatPhoneNumber(event.target.value);
    }else if(event.target.id ==="staffCredentials"){
      inputStaffData.employeeDetails[0].credentials = event.target.value;
    }else if(event.target.id ==="staffEmergencyContact"){
      inputStaffData.emergency[0].emergencyContact =event.target.value;
    }else if(event.target.id ==="staffImmunizationStatus"){
      inputStaffData.immunizationStatus = event.target.value;
    }else if(event.target.id ==="staffPrivacyAcknowledgement"){
      inputStaffData.privacyAcknowledgement = event.target.value;
    }else if(event.target.id ==="staffTerminationReason"){
      inputStaffData.terminationReason = event.target.value;
    }else if(event.target.id ==="staffNpi"){
      inputStaffData.npi = event.target.value;
    }else if(event.target.id ==="staffElectronicSignature"){
      inputStaffData.signature = event.target.value;
    } else if(event.target.id === "checkboxgendername"){      
      setAgreement(event.target.checked);
      inputStaffData.gender ="";
    }
    setInputStaffData({...inputStaffData});
  }

 
  const [isValid, setValid] = useState(true);
  const checkValidation=()=>{
    errorMessage="";
    setValid(true);
   var email = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/i;
   var snnnumber =/^\(?(\d{3})\)?[-]?(\d{2})[-]?(\d{4})$/;
   if(inputStaffData.name[0].given.length < 3 ){
    setValid(false);
  document.getElementById("staffFirstName").focus() 
  errorMessage="First Name Not a Valid ";
  return false;
}else  if(inputStaffData.name[0].family == null || inputStaffData.name[0].family == "" || inputStaffData.name[0].family.length == 0){
  setValid(false);
  document.getElementById("staffLastName").focus() 
  errorMessage="Last Name is Not a Valid ";
  return false;
 } else  if((inputStaffData.ssn == null || inputStaffData.ssn == "" || inputStaffData.ssn.length == 0)&& (!snnnumber.test(inputStaffData.ssn))){
    setValid(false);
    document.getElementById("staffSsn").focus() 
    errorMessage="Enter the valid SNN number ";
    return false;
} else if ((inputStaffData.email == null || inputStaffData.email == "" ||inputStaffData.email!.length == 0) && (!email.test(inputStaffData.email))) {
  setValid(false);
  document.getElementById("staffEmail").focus(); 
      errorMessage="Email is Not a Valid";
      return false;
}
else {          
  setValid(true);
  return true;
}
    
  }


  const [isCreateStaffPageLoaded, setCreateStaffPageLoaded] = useState(false);

  if (!isCreateStaffPageLoaded && !createStaffData.isLoading) { 
    createStaffData.items.data.dateofBirth = createStaffData.items.data.dateofBirth !== "Invalid date" && createStaffData.items.data.dateofBirth !== null && createStaffData.items.data.dateofBirth !== "" ? new Date(moment(createStaffData.items.data.dateofBirth,("YYYY-MM-DD"?"YYYY-MM-DD":"YYYYMMDD")).format("YYYY-MM-DDTHH:mm:ss.000Z")): null;
    createStaffData.items.data.terminationDate = createStaffData.items.data.terminationDate !== "Invalid date" && createStaffData.items.data.terminationDate !== null && createStaffData.items.data.terminationDate !== "" ?  new Date(moment(createStaffData.items.data.terminationDate,("YYYY-MM-DD"?"YYYY-MM-DD":"YYYYMMDD")).format("YYYY-MM-DDTHH:mm:ss.000Z")): null;
    createStaffData.items.data.employeeDetails[0].startDate = createStaffData.items.data.employeeDetails[0].startDate !== "Invalid date" && createStaffData.items.data.employeeDetails[0].startDate !== null && createStaffData.items.data.employeeDetails[0].startDate !== "" ? new Date(moment(createStaffData.items.data.employeeDetails[0].startDate,("YYYY-MM-DD"?"YYYY-MM-DD":"YYYYMMDD")).format("YYYY-MM-DDTHH:mm:ss.000Z")): null;
    createStaffData.items.data.employeeDetails[0].endDate = createStaffData.items.data.employeeDetails[0].endDate !== "Invalid date" && createStaffData.items.data.employeeDetails[0].endDate !== null && createStaffData.items.data.employeeDetails[0].endDate !== "" ? new Date(moment(createStaffData.items.data.employeeDetails[0].endDate,("YYYY-MM-DD"?"YYYY-MM-DD":"YYYYMMDD")).format("YYYY-MM-DDTHH:mm:ss.000Z")) : null;
    createStaffData.items.data.ssn = Constants.formatSSNumber(createStaffData.items.data.ssn);  
    setInputStaffData(createStaffData.items.data);    
    if (createStaffData.items.message.code === "MHC - 0200") {
      alert(createStaffData.items.message.description);  
      setTimeout(() => {
        if(decryptStaffId === ""){
          window.location.href = "/MettlerAllStaffDetailsList";
        }else{
        
        }    
        setSpinner(false);
      }, (1000));   
      setCreateStaffPageLoaded(true);    
    } else {
      alert(createStaffData.items.message.description);   
      setTimeout(() => {
        setCreateStaffPageLoaded(false);
        setSpinner(false);
      }, (1000));
    }
  
}
if (!createStaffData && createStaffData.isFormSubmit) {

    setTimeout(() => {
      setCreateStaffPageLoaded(false);
      setSpinner(false);
    }, (1000));
}


let [isUpdateStaffPageLoaded, setUpdateStaffPageLoaded] = useState(false);

if (!isUpdateStaffPageLoaded && !UpdateStaffData.isLoading) {
  UpdateStaffData.items.data.dateofBirth = UpdateStaffData.items.data.dateofBirth !== "Invalid date" && UpdateStaffData.items.data.dateofBirth !== null && UpdateStaffData.items.data.dateofBirth !== "" ? new Date(moment(UpdateStaffData.items.data.dateofBirth,("YYYY-MM-DD"?"YYYY-MM-DD":"YYYYMMDD")).format("YYYY-MM-DDTHH:mm:ss.000Z")): null;
  UpdateStaffData.items.data.terminationDate = UpdateStaffData.items.data.terminationDate !== "Invalid date" && UpdateStaffData.items.data.terminationDate !== null && UpdateStaffData.items.data.terminationDate !== "" ?  new Date(moment(UpdateStaffData.items.data.terminationDate,("YYYY-MM-DD"?"YYYY-MM-DD":"YYYYMMDD")).format("YYYY-MM-DDTHH:mm:ss.000Z")): null;
  UpdateStaffData.items.data.employeeDetails[0].startDate = UpdateStaffData.items.data.employeeDetails[0].startDate !== "Invalid date" && UpdateStaffData.items.data.employeeDetails[0].startDate !== null && UpdateStaffData.items.data.employeeDetails[0].startDate !== "" ? new Date(moment(UpdateStaffData.items.data.employeeDetails[0].startDate,("YYYY-MM-DD"?"YYYY-MM-DD":"YYYYMMDD")).format("YYYY-MM-DDTHH:mm:ss.000Z")): null;
  UpdateStaffData.items.data.employeeDetails[0].endDate = UpdateStaffData.items.data.employeeDetails[0].endDate !== "Invalid date" && UpdateStaffData.items.data.employeeDetails[0].endDate !== null && UpdateStaffData.items.data.employeeDetails[0].endDate !== "" ? new Date(moment(UpdateStaffData.items.data.employeeDetails[0].endDate,("YYYY-MM-DD"?"YYYY-MM-DD":"YYYYMMDD")).format("YYYY-MM-DDTHH:mm:ss.000Z")) : null;
  UpdateStaffData.items.data.ssn = Constants.formatSSNumber(UpdateStaffData.items.data.ssn);  
  setInputStaffData(UpdateStaffData.items.data); 
  if (UpdateStaffData.items.message.code === "MHC - 0200") {    
      alert(UpdateStaffData.items.message.description);   
  
      console.log(JSON.stringify(UpdateStaffData.items));  
      setTimeout(() => {
        if(decryptStaffId === ""){
          window.location.href = "/MettlerAllStaffDetailsList";
        }else{
        
        }  
        setSpinner(false);
      }, (1000)); 
      setUpdateStaffPageLoaded(true);  
  } else {

    alert(UpdateStaffData.items.message.description);     
    setTimeout(() => {
      setUpdateStaffPageLoaded(false);
      setSpinner(false);
    }, (1000));    
  }  

}

if (!UpdateStaffData && UpdateStaffData.isFormSubmit) {
  setTimeout(() => {
    setUpdateStaffPageLoaded(false);

  }, (1000));
}

  const handleClickChange = () =>{      
    inputStaffData.ssn = inputStaffData.ssn !== ""? inputStaffData.ssn.replace(/[^\w\s]/gi, ''):"";
      inputStaffData.dateofBirth = inputStaffData.dateofBirth !== null && inputStaffData.dateofBirth !== "" ? moment(inputStaffData.dateofBirth).format('YYYYMMDD'): null;
      inputStaffData.terminationDate = inputStaffData.terminationDate !== null && inputStaffData.terminationDate !== "" ? moment(inputStaffData.terminationDate).format('YYYYMMDD'):null;
      inputStaffData.employeeDetails[0].startDate = inputStaffData.employeeDetails[0].startDate !== null && inputStaffData.employeeDetails[0].startDate !== "" ? moment(inputStaffData.employeeDetails[0].startDate).format('YYYYMMDD'): null;
      inputStaffData.employeeDetails[0].endDate = inputStaffData.employeeDetails[0].endDate !== null && inputStaffData.employeeDetails[0].endDate !== "" ? moment(inputStaffData.employeeDetails[0].endDate).format('YYYYMMDD'): null; 
    checkValidation();          
    if(errorMessage === ""){   
      setSpinner(true);    
      setInputStaffData({...inputStaffData}); 
      if(inputStaffData.id !== ""){     
        dispatch(UpdateStaff(inputStaffData)); 
        setUpdateStaffPageLoaded(false);   
                    
      } else{     
        inputStaffData.organization = organizationId;    
        dispatch(createStaff(inputStaffData));  
        setCreateStaffPageLoaded(false);        
       
      } 
  }
 
else {
  alert(errorMessage); 
  inputStaffData.dateofBirth = inputStaffData.dateofBirth !== "Invalid date" && inputStaffData.dateofBirth !== null && inputStaffData.dateofBirth !== "" ? new Date(moment(inputStaffData.dateofBirth,("YYYY-MM-DD"?"YYYY-MM-DD":"YYYYMMDD")).format("YYYY-MM-DDTHH:mm:ss.000Z")): null;
  inputStaffData.terminationDate = inputStaffData.terminationDate !== "Invalid date" && inputStaffData.terminationDate !== null && inputStaffData.terminationDate !== "" ?  new Date(moment(inputStaffData.terminationDate,("YYYY-MM-DD"?"YYYY-MM-DD":"YYYYMMDD")).format("YYYY-MM-DDTHH:mm:ss.000Z")): null;
  inputStaffData.employeeDetails[0].startDate = inputStaffData.employeeDetails[0].startDate !== "Invalid date" && inputStaffData.employeeDetails[0].startDate !== null && inputStaffData.employeeDetails[0].startDate !== "" ? new Date(moment(inputStaffData.employeeDetails[0].startDate,("YYYY-MM-DD"?"YYYY-MM-DD":"YYYYMMDD")).format("YYYY-MM-DDTHH:mm:ss.000Z")): null;
  inputStaffData.employeeDetails[0].endDate = inputStaffData.employeeDetails[0].endDate !== "Invalid date" && inputStaffData.employeeDetails[0].endDate !== null && inputStaffData.employeeDetails[0].endDate !== "" ? new Date(moment(inputStaffData.employeeDetails[0].endDate,("YYYY-MM-DD"?"YYYY-MM-DD":"YYYYMMDD")).format("YYYY-MM-DDTHH:mm:ss.000Z")) : null;
  inputStaffData.ssn = Constants.formatSSNumber(inputStaffData.ssn);  
  setInputStaffData({...inputStaffData}); 
};
}

const handleCancelChange = ()=>{
  window.location.reload();
}
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <>
      {spinner &&
                (<div className='overlay-content'>
                    <div className='wrapper'>
                        <img alt="" src={loaddingFile} style={{ position: 'absolute', width: '100%', height:'-webkit-fill-available', zIndex: 2, opacity: '0.5' }} />
                    </div>
                </div>
                )}
        <div className="staff-details4" style={{height:'1437px'}}>  
          <div className="staff-details-child" />        
          <div className="staff-details-child2" />
          <div className="contact">
            <div className="expand-more-24px-group">
              <img
                className="expand-more-24px-icon1"
                alt=""
                src="/expand-more-24px.svg"
              />
              <div className="details1">Details</div>
            </div>
          </div>
          <div className="staffForm-fields3">
          <TextField id="staffFirstName"             
              className="destination-name-input2"
              color="primary"
              variant="outlined"
              value={inputStaffData.name[0].given}
              onChange={handleInputChange}
              type="text"
              label="First Name"
              placeholder="Placeholder"
              size="medium"
              margin="none"
              required
            />
            <TextField
              id="staffMiddleName"         
              className="destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              value={inputStaffData.name[0].use}
              onChange={handleInputChange}
              label="Middle Name"
              placeholder="Placeholder"
              size="medium"
              margin="none"
            />
            <TextField
             id="staffLastName"    
              className="destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              value={inputStaffData.name[0].family}
              onChange={handleInputChange}
              label="Last Name"
              placeholder="Placeholder"
              size="medium"
              margin="none"
              required
            />
          </div>
          <div className="staffForm-fields-4" >
            <div className="selectoutlined-1">
              <FormControlLabel
                
                label="Declined to Specify"
                labelPlacement="end"
                control={<Checkbox color="primary" size="medium" value={agreement} id="checkboxgendername"/>}
                onChange={handleInputChange}
              />
              <FormControl className="destination-name-input3" variant="outlined" required>
                <InputLabel id="staffgender-label" color="primary">Gender</InputLabel>
                <Select style={{background:agreement?'lightgrey':''}} disabled={agreement} labelId="staffgender-label" color="primary" size="medium" name="staffGender" id="staffGender" value={inputStaffData.gender} onChange={handleChange} label="Gender">
                 {newgenderDropDown}
                </Select>
                <FormHelperText />
              </FormControl>
            </div>
            <div className="selectoutlined-1">
              <DatePicker
                label="Date of Birth"
                value={inputStaffData.dateofBirth}
                onChange={(newValue) => {
                  inputStaffData.dateofBirth = newValue;
                  setInputStaffData({ ...inputStaffData });
                }
                }
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

          </div>
          <div className="staffForm-fields5">
            <TextField
            id="staffCity"
              className="destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="City"
              value={inputStaffData.contact[0].address[0].city}
              onChange={handleInputChange}
              placeholder="Placeholder"
              size="medium"
              margin="none"
            />
            <TextField
            id="staffState"
              className="destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="State/Provide"
              value={inputStaffData.contact[0].address[0].state}
              onChange={handleInputChange}
              placeholder="Placeholder"
              size="medium"
              margin="none"
            />
            <TextField
            id="staffZip"
              className="destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="Zip/Postal Code"
              value={inputStaffData.contact[0].address[0].zip}
              onChange={handleInputChange}
              placeholder="Placeholder"
              size="medium"
              margin="none"
            />
          </div>
          <div className="staffForm-fields6">
            <TextField
            id="staffWorkSchedule"
              className="destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="Work Schedule"
              value={inputStaffData.employeeDetails[0].workSchedule}
              onChange={handleInputChange}
              placeholder="Placeholder"
              size="medium"
              margin="none"
            />
            <TextField
            id="staffSalary"
              className="destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="Salary"
              value={inputStaffData.employeeDetails[0].salary}
              onChange={handleInputChange}
              placeholder="Placeholder"
              size="medium"
              margin="none"
            />
            <TextField
            id="staffEmployeeId"
              className="destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="Employee ID"
              value={inputStaffData.employeeDetails[0].employeeId}
              onChange={handleInputChange}
              placeholder="Placeholder"
              size="medium"
              margin="none"
            />
          </div>
          <div className="staffForm-fields7">
            <TextField
            id="staffAddressLine1"
              className="destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="Address Line 1"
              value={inputStaffData.contact[0].address[0].addressLine1}
              onChange={handleInputChange}
              placeholder="Placeholder"
              size="medium"
              margin="none"
            />
            <TextField
           id="staffAddressLine2"
              className="destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="Address Line 2"
              value={inputStaffData.contact[0].address[0].addressLine2}
              onChange={handleInputChange}
              placeholder="Placeholder"
              size="medium"
              margin="none"
            />
          </div>
          <div className="staffForm-fields14">
      <FormControl className="destination-name-input11" variant="outlined">
        <InputLabel color="primary">Country</InputLabel>
        <Select color="primary" size="medium" label="Country" name="staffCountry" value={inputStaffData.contact[0].address[0].country} onChange={handleChange}>
          {newcountryDropDown}
        </Select>
        <FormHelperText />
      </FormControl>
      <TextField
      id="staffMobileNumber"
        className="name-input20"
        color="primary"
        variant="outlined"
        type="text"
        label="Phone Number"
        value={inputStaffData.contact[0].mobilePhone}
        onChange={handleInputChange}
        placeholder="Placeholder"
        size="medium"
        margin="none"
      />
    </div>
          <div className="staffForm-fields8">
            <FormControl className="destination-name-input3" variant="outlined">
              <InputLabel color="primary">User Type</InputLabel>
              <Select color="primary" size="medium" label="User Type" name="staffUserType" value={inputStaffData.userType} onChange={handleChange}>
               <MenuItem value="Staff">Staff</MenuItem>    
               <MenuItem value="Admin">Admin</MenuItem>                      
               </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="destination-name-input3" variant="outlined">
              <InputLabel color="primary">Speciality</InputLabel>
              <Select color="primary" size="medium" label="Speciality" name="staffSpeciality" value={inputStaffData.speciality[0]} onChange={handleChange}>
              {newspecialityDropDown}             
               </Select>
              <FormHelperText />
            </FormControl>
          </div>
          <div className="staffForm-fields17">
          <div className="name-input18">
             
              <div className="selectoutlined1">
                <DatePicker
                  label="Termination Date"
                  value={inputStaffData.terminationDate}
                  onChange={(newValue) =>{
                    inputStaffData.terminationDate = newValue;
                    setInputStaffData({...inputStaffData});
                  }
                    }
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
            </div>
            <TextField
      id="staffTerminationReason"
        className="name-input20"
        color="primary"
        variant="outlined"
        type="text"
        label="Termination Reason"
        value={inputStaffData.terminationReason}
        onChange={handleInputChange}
        placeholder="Placeholder"
        size="medium"
        margin="none"
      />
          </div>
          <div className="staffForm-fields9">
          <div className="name-input18">
              <TextField
                className="input"
                color="primary"
                variant="outlined"
                type="text"
                label="Point of Contact Email Address"
                size="medium"
                margin="none"
              />
              <div className="selectoutlined1">
                <DatePicker
                  label="Start Date"
                  value={inputStaffData.employeeDetails[0].startDate}
                  onChange={(newValue) =>{
                    inputStaffData.employeeDetails[0].startDate = newValue;
                    setInputStaffData({...inputStaffData});
                  }
                    }
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
            </div>
            <div className="name-input18">
              <TextField
                className="input"
                color="primary"
                variant="outlined"
                type="text"
                label="Email address"
                size="medium"
                margin="none"
              />
              <div className="selectoutlined1">
                <DatePicker
                  label="End Date"
                  value={inputStaffData.employeeDetails[0].endDate}
                  onChange={(newValue) =>{
                    inputStaffData.employeeDetails[0].endDate = newValue;
                    setInputStaffData({...inputStaffData});
                  }
                    }
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
            </div>
          <div className="staffForm-fields13">
           
          </div>
            </div>
          <div className="staffForm-fields10">
            <TextField
            id="staffEmergencyContact"
              className="destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="Emergency Contact Name"
              value={inputStaffData.emergency[0].emergencyContact} onChange={handleInputChange}
              placeholder="Placeholder"
              size="medium"
              margin="none"
            />
            <FormControl className="destination-name-input3" variant="outlined">
              <InputLabel color="primary">
                Background Check Information
              </InputLabel>
              <Select
                color="primary"
                size="medium"
                label="Background Check Information"
                name = "staffBackGroundCheck"  multiple={true}
                value={inputStaffData.backgroundCheck} onChange={handleChange}>
              {newBackgroundcheckInformationDropDown}
               </Select>
              <FormHelperText />
            </FormControl>
          </div>
          <div className="staffForm-fields11">
            <TextField
            id="staffImmunizationStatus"
              className="destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="Immunization Status"
              value={inputStaffData.immunizationStatus} onChange={handleInputChange}
              placeholder="Placeholder"
              size="medium"
              margin="none"
            />
            <FormControl className="destination-name-input3" variant="outlined">
              <InputLabel color="primary">HIPPA Training</InputLabel>
              <Select color="primary" size="medium" label="HIPPA Training" name="staffHipaaTraining" value={inputStaffData.hipaaTraining} onChange={handleChange}>
              {newHipaaTrainingDropDown}
              </Select>
              <FormHelperText />
            </FormControl>
          </div>
          <div className="staffForm-fields15">
          <TextField
            id="staffSsn"
              className="destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="SSN#"
              value={inputStaffData.ssn}
              onChange={handleInputChange}
              placeholder="Placeholder"
              size="medium"
              margin="none"
              required
            />
              <TextField
            id="staffNpi"
              className="destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="NPI#"
              value={inputStaffData.npi}
              onChange={handleInputChange}
              placeholder="Placeholder"
              size="medium"
              margin="none"
              required
            />
            
            </div>
          <div className="staffForm-fields12">
            <TextField
            id="staffPrivacyAcknowledgement"
              className="destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="Privacy Acknowledgment"
              value={inputStaffData.privacyAcknowledgement} onChange={handleInputChange}
              placeholder="Placeholder"
              size="medium"
              margin="none"
            />
             <TextField
            id="staffElectronicSignature"
              className="destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="Electronic Signature Code"
              value={inputStaffData.signature} onChange={handleInputChange}
              placeholder="Placeholder"
              size="medium"
              margin="none"
            />
          </div>

          <div className="staffForm-fields13">
          <TextField
            id="staffCredentials"
              className="destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="Credentials"
              value={inputStaffData.employeeDetails[0].credentials}
              onChange={handleInputChange}
              placeholder="Placeholder"
              size="medium"
              margin="none"
            />
            <FormControl className="destination-name-input3" variant="outlined">
              <InputLabel color="primary">Skills and Qualifications</InputLabel>
              <Select
                color="primary"
                size="medium"
                label="Skills and Qualifications"
                name = "staffSkills" multiple={true}
                value={inputStaffData.employeeDetails[0].skills} onChange={handleChange}>
               {newSkillsAndQualificationsDropDown}
               </Select>            
              <FormHelperText />
            </FormControl>
            
          </div>
          <div className="staffForm-fields16">

          <TextField
      id="staffEmail"
        className="name-input20"
        color="primary"
        variant="outlined"
        type="email"
        label="Email"
        value={inputStaffData.email}
        onChange={handleInputChange}
        placeholder="Placeholder"
        size="medium"
        margin="none"
      />
       <FormControl className="destination-name-input3" variant="outlined">
              <InputLabel color="primary">Role</InputLabel>
              <Select color="primary" size="medium" label="Role" name="staffrole" value={inputStaffData.role} onChange={handleChange}>
             {newRoleDropDown}           
               </Select>
              <FormHelperText />
            </FormControl>
      </div>
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

                            label="Save"
                            primaryButtonCursor="pointer"
                            onNextContainerClick={handleClickChange}
                        />
                    </div>
                </div>
      <div className="staffForm-fields18">    
        

          </div>
        </div>
      
      </>
    </LocalizationProvider>
  );
};
const mapStateToProps = (state: any) => {
  const { deviceFormData, UpdateStaffData, createStaffData } = state;
  return {
      deviceFormData, UpdateStaffData, createStaffData
  };
};
export default connect(mapStateToProps)(StaffInfo)
 
