import {  useState, useCallback, Dispatch, useEffect } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
  Button,
  Icon,
} from "@mui/material";
import HIPAAComplianceContainer from "./../../../components/HIPAAComplianceContainer";
import "./OrganizationDetails.css";
import React from "react";
import { connect } from "react-redux";
import bottomImage from './../../../assets/images/mettler_images/bg.svg';
import newImage from './../../../assets/images/mettler_images/rectangle-5999.svg';
import organizationRegisterData from './../../../assets/data/OrganizationRegisterData.json'
import { createOrganization, getByIdOrganization, updateOrganization } from "../../../store/actions/Organization";
import * as Constants from "./../Constants/ConstantValues";
import SecondaryButton from "../../../components/SecondaryButton";
import PrimaryButton from "../../../components/PrimaryButton";
import "../../../components/BottomFooter.css";
import { HttpLogin } from "../../../utils/Http";
import loaddingFile from '../../../../src/assets/images/tenor.gif';
import moment from "moment";
interface IOrganizationDetails { }
interface IOrganizationDetails {
    StaticPage: any;
    dispatch: Dispatch<any>;
    getByIdOrganizationData:any;
    createOrganizationData:any;
    updateOrganizationData:any;
    errorMessage: any;
    match: any;
    state: {
        nodes: [],
        checked: [],
        expanded: []
    }
}
const OrganizationDetails: React.FC<IOrganizationDetails> = ({
  dispatch,getByIdOrganizationData,errorMessage,match,createOrganizationData,updateOrganizationData


}) => {

  
  let [inputOrgData,setInputOrgData] = useState(organizationRegisterData);
  let [organizationId, setOrganizationId] = useState("");
  let [encryptOrgId,setEncryptOrgId] = useState("");
  let [decryptOrgId,setDecryptOrgId] = useState("");
  let [newUserType, setNewUserType] = useState("");
  const [spinner, setSpinner] = useState(false);
  useEffect(() => {  
    setSpinner(true);      
    var encryptInitial = match.params.id;
    setEncryptOrgId(encryptInitial);
    var CryptoJS = require("crypto-js");
    let decodeOrgid = decodeURIComponent(encryptInitial);
    let decodeFinalOrgid = CryptoJS.AES.decrypt(decodeOrgid.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
    setDecryptOrgId(decodeFinalOrgid);   
    if(decodeFinalOrgid !== ""){
      HttpLogin.axios().get("api/org/getById/"+decodeFinalOrgid)
      .then((res) => {
       if(res.data.message.code === "MHC - 0200"){
        setOrganizationId(res.data.data.id);
         setInputOrgData(res.data.data);
         setSpinner(false);
       }else{
         alert(res.data.message.description);
       }      
      })
    } else{
      var orgData = JSON.parse(window.localStorage.getItem("LOGINDATA")); 
      orgData = orgData.loginInput.organization;  
      var newOrgData = JSON.parse(window.localStorage.getItem("LOGINDATA"));
      newOrgData = newOrgData.items.data.userType[0] ;
      setNewUserType(newOrgData);
      console.log(JSON.stringify(newOrgData));
     HttpLogin.axios().get("api/org/getById/"+orgData)
     .then((res) => {
      if(res.data.message.code === "MHC - 0200"){
        setOrganizationId(res.data.data.id);
        setInputOrgData(res.data.data);
        setSpinner(false);
      }else{
        alert(res.data.message.description);
      }      
     })
    }
   
  }, []);

  const handleInputChange = (event:any) =>{
    if(event.target.id ==="orgDetailsTin"){
      inputOrgData.organizationdetails[0].tin = event.target.value;
    } else if(event.target.id ==="orgDetailsName"){
      inputOrgData.organizationdetails[0].name = event.target.value;
    } else if(event.target.id ==="orgDetailsNpi"){
      inputOrgData.organizationdetails[0].npi = event.target.value;
    } else if(event.target.id ==="orgEmail"){
      inputOrgData.email = event.target.value;
    } else if(event.target.id ==="orgAddressLine1"){
      inputOrgData.contact[0].addressLine1 = event.target.value;
    } else if(event.target.id ==="orgWebsiteUrl"){
      inputOrgData.websiteUrl = event.target.value;
    } else if(event.target.id ==="orgPOCName"){
      inputOrgData.pointofcontact[0].name = event.target.value;
    } else if(event.target.id ==="orgPOCEmail"){
      inputOrgData.pointofcontact[0].email = event.target.value;
    } else if(event.target.id ==="orgPOCPhoneNumber"){
      inputOrgData.pointofcontact[0].phoneNumber = Constants.formatPhoneNumber(event.target.value);
    } else if(event.target.id ==="orgHippaPOMobile"){
      inputOrgData.hippaprivacyofficer[0].mobile = Constants.formatPhoneNumber(event.target.value);
    } else if(event.target.id ==="orgHippaPOName"){
      inputOrgData.hippaprivacyofficer[0].name = event.target.value;
    } else if(event.target.id ==="orgHippaPOEmail"){
      inputOrgData.hippaprivacyofficer[0].email = event.target.value;
    } else if(event.target.id ==="orgHippaSOMobile"){
      inputOrgData.hippassecurityofficer[0].mobile = Constants.formatPhoneNumber(event.target.value);
    } else if(event.target.id ==="orgHipppaSOName"){
      inputOrgData.hippassecurityofficer[0].name = event.target.value;
    } else if(event.target.id ==="orgHippaSOEmail"){
      inputOrgData.hippassecurityofficer[0].email = event.target.value;
    } else if(event.target.name === "orgDetailsType"){
      inputOrgData.organizationdetails[0].type = event.target.value;
    } else if(event.target.id === "orgMobileNumber"){
      inputOrgData.mobileNumber = Constants.formatPhoneNumber(event.target.value);
    } 
    setInputOrgData({...inputOrgData});
  }

//   const [isPageLoaded, setPageLoaded] = useState(false);

// if (!isPageLoaded && !getByIdOrganizationData.isLoading) {
//  // console.log(JSON.stringify(getByIdOrganizationData));
//  // setInputOrgData(getByIdOrganizationData.items);
//   setPageLoaded(true)
// }
// if (!getByIdOrganizationData && getByIdOrganizationData.isFormSubmit) {

//   setTimeout(() => {
//     setPageLoaded(false);

//   }, (1000));
// }


let [isUpdateOrganizationPageLoaded, setUpdateOrganizationPageLoaded] = useState(false);

if (!isUpdateOrganizationPageLoaded && !updateOrganizationData.isLoading) {
  setInputOrgData(updateOrganizationData.items.data); 
if (updateOrganizationData.items.message.code === "MHC - 0200") {    
    alert(updateOrganizationData.items.message.description);   

    console.log(JSON.stringify(updateOrganizationData.items));  
    setTimeout(() => {
      if(decryptOrgId !== ""){
        window.location.href = "/MettlerOrganizationList";
      }else{
        window.location.reload();
      }  
    setSpinner(false);
    }, (1000)); 
    setUpdateOrganizationPageLoaded(true);  
} else {

  alert(updateOrganizationData.items.message.description);     
  setTimeout(() => {
    setUpdateOrganizationPageLoaded(false);
  setSpinner(false);
  }, (1000));    
}  

}

if (!updateOrganizationData && updateOrganizationData.isFormSubmit) {
setTimeout(() => {
  setUpdateOrganizationPageLoaded(false);

}, (1000));
}

const [isValid, setValid] = useState(true);
  const checkValidation=()=>{
    errorMessage="";
    setValid(true);
   var email = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/i;
  
 if ((inputOrgData.email == null || inputOrgData.email == "" ||inputOrgData.email!.length == 0) && (!email.test(inputOrgData.email))) {
  setValid(false);
  document.getElementById("staffEmail").focus(); 
      errorMessage="Email is Not a Valid";
      return false;
} else if ((inputOrgData.pointofcontact[0].email == null || inputOrgData.pointofcontact[0].email == "" ||inputOrgData.pointofcontact[0].email!.length == 0) && (!email.test(inputOrgData.pointofcontact[0].email))) {
  setValid(false);
  document.getElementById("staffEmail").focus(); 
      errorMessage="Point of contact Email is Not a Valid";
      return false;
}
else if ((inputOrgData.hippaprivacyofficer[0].email == null || inputOrgData.hippaprivacyofficer[0].email == "" ||inputOrgData.hippaprivacyofficer[0].email!.length == 0) && (!email.test(inputOrgData.hippaprivacyofficer[0].email))) {
  setValid(false);
  document.getElementById("staffEmail").focus(); 
      errorMessage="HIPPA privacy officer Email is Not a Valid";
      return false;
}
else if ((inputOrgData.hippassecurityofficer[0].email == null || inputOrgData.hippassecurityofficer[0].email == "" ||inputOrgData.hippassecurityofficer[0].email!.length == 0) && (!email.test(inputOrgData.hippassecurityofficer[0].email))) {
  setValid(false);
  document.getElementById("staffEmail").focus(); 
      errorMessage="HIPPA Security officer Email is Not a Valid";
      return false;
}
else {          
  setValid(true);
  return true;
}
    
  }

  // const handleClickChange = () =>{   
  //   checkValidation();   
  //   if(isValid && errorMessage==""){   
  //     setInputOrgData({...inputOrgData});
  //     inputOrgData.userType = "Admin";
  //     if(inputOrgData.id != ""){       
  //       dispatch(updateOrganization(inputOrgData));
  //       alert("Organiztion Updated"); 
  //       window.location.reload();
  //     }else{
  //       dispatch(createOrganization(inputOrgData));
  //       alert("Organiztion Created"); 
  //       window.location.reload();
  //     }     
  //   } 
  
  // }
  const handleClickChange = () =>{    
    checkValidation();             
    if(errorMessage === ""){   
      setSpinner(true);    
      setInputOrgData({...inputOrgData}); 
      if(inputOrgData.id !== ""){   
        inputOrgData.id = organizationId;     
        dispatch(updateOrganization(inputOrgData)); 
        setUpdateOrganizationPageLoaded(false);                       
      } 
  }
 
else {
  alert(errorMessage); 
  setInputOrgData({...inputOrgData}); 
};
}

const handleCancelChange = ()=>{
  window.location.reload();
}
  return (
    <>
       {spinner &&
                (<div className='overlay-content'>
                    <div className='wrapper'>
                        <img alt="" src={loaddingFile} style={{ position: 'absolute', width: '100%', height:'-webkit-fill-available', zIndex: 2, opacity: '0.5' }} />
                    </div>
                </div>
                )}
      <div className="organization-details">  
        <div className="organization-details-child" />      
        <div className="organization-details-child1" />            
        <div className="line-div" />
        <div className="expand-more-24px-parent">
          <img
            className="expand-more-24px-icon"
            alt=""
            src="/expand-more-24px.svg"
          />
          <div className="details">Details</div>
        </div>
        <div className="orgForm-fields">
          <TextField
            id = "orgDetailsTin"
            className="destination-name-input"
            color="primary"
            variant="outlined"
            disabled={newUserType === "Staff"}
            type="text"
            label="Tax ID Number (TIN)"
            value={inputOrgData.organizationdetails[0].tin}
            onChange={handleInputChange}
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
          <TextField
            id = "orgDetailsNpi"
            className="destination-name-input"
            color="primary"
            variant="outlined"
            disabled={newUserType === "Staff"}
            type="text"
            label="National Provider Identifier (NPI)"
            value={inputOrgData.organizationdetails[0].npi}
            onChange={handleInputChange}
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
        </div>
        <div className="orgForm-fields1">
          <TextField
            id = "orgAddressLine1"
            className="destination-name-input"
            color="primary"
            variant="outlined"
            disabled={newUserType === "Staff"}
            type="text"
            label="Business Address"
            value = {inputOrgData.contact[0].addressLine1}
            onChange={handleInputChange}
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
        </div>
        <div className="orgForm-fields2">
          <TextField
            id="orgEmail"
            className="destination-name-input"
            color="primary"
            variant="outlined"
            disabled={newUserType === "Staff"}
            type="email"
            label="Email"
            value={inputOrgData.email}
            onChange={handleInputChange}
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
          <TextField
          id = "orgMobileNumber"
            className="destination-name-input"
            color="primary"
            variant="outlined"
            disabled={newUserType === "Staff"}
            type="text"
            label="Phone Number"
            value={inputOrgData.mobileNumber}
            onChange={handleInputChange}
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
        </div>
        <div className="orgForm-fields3">
          <TextField
            id = "orgWebsiteUrl"
            className="destination-name-input"
            color="primary"
            variant="outlined"
            disabled={newUserType === "Staff"}
            type="email"
            label="Websit URL"
            value={inputOrgData.websiteUrl}
            onChange={handleInputChange}
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
          <TextField
            id="orgPOCName"
            className="destination-name-input"
            color="primary"
            variant="outlined"
            disabled={newUserType === "Staff"}
            type="text"
            label="Point of Contact Name"
            value={inputOrgData.pointofcontact[0].name}
            onChange={handleInputChange}
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
        </div>
        <div className="orgForm-fields4">
          <TextField
            id = "orgPOCEmail"
            className="destination-name-input"
            color="primary"
            variant="outlined"
            disabled={newUserType === "Staff"}
            type="email"
            label="Email"
            value={inputOrgData.pointofcontact[0].email}
            onChange={handleInputChange}
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
          <TextField
            id = "orgPOCPhoneNumber"
            className="destination-name-input"
            color="primary"
            variant="outlined"
            disabled={newUserType === "Staff"}
            type="text"
            label="Point of Contact Phone Number"
            value={inputOrgData.pointofcontact[0].phoneNumber}
            onChange={handleInputChange}
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
        </div>
        <div className="orgForm-fields5">
          <TextField
            id = "orgHippaPOMobile"
            className="destination-name-input"
            color="primary"
            variant="outlined"
            disabled={newUserType === "Staff"}
            type="text"
            label="HIPAA Privacy Officer Phone Number"
            value={inputOrgData.hippaprivacyofficer[0].mobile}
            onChange={handleInputChange}
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
          <TextField
            id = "orgHipppaSOName"
            className="destination-name-input"
            color="primary"
            variant="outlined"
            disabled={newUserType === "Staff"}
            type="text"
            label="HIPAA Security Officer Name"
            value = {inputOrgData.hippassecurityofficer[0].name}
            onChange={handleInputChange}
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
        </div>
        <div className="orgForm-fields6">
          <TextField
            id = "orgHippaPOName"
            className="destination-name-input"
            color="primary"
            variant="outlined"
            disabled={newUserType === "Staff"}
            type="email"
            label="HIPAA Privacy Officer Name"
            value = {inputOrgData.hippaprivacyofficer[0].name}
            onChange={handleInputChange}
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
          <TextField
            id = "orgHippaPOEmail"
            className="destination-name-input"
            color="primary"
            variant="outlined"
            disabled={newUserType === "Staff"}
            type="text"
            label="HIPAA Privacy Officer Email Address"
            value = {inputOrgData.hippaprivacyofficer[0].email}
            onChange={handleInputChange}
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
        </div>
        <div className="orgForm-fields7">
          <TextField
            id = "orgHippaSOEmail"
            className="destination-name-input"
            color="primary"
            variant="outlined"
            disabled={newUserType === "Staff"}
            type="email"
            label="HIPAA Security Officer Email Address"
            value = {inputOrgData.hippassecurityofficer[0].email}
            onChange={handleInputChange}
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
          <TextField
            id = "orgHippaSOMobile"
            className="destination-name-input"
            color="primary"
            variant="outlined"
            disabled={newUserType === "Staff"}
            type="text"
            label="HIPAA Security Officer Phone Number"
            value = {inputOrgData.hippassecurityofficer[0].mobile}
            onChange={handleInputChange}
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
        </div>
        <div className="orgForm-fields8">
          <TextField
            id = "orgDetailsName"
            className="destination-name-input"
            color="primary"
            variant="outlined"
            disabled={newUserType === "Staff"}
            type="text"
            label="Organization Name"
            value = {inputOrgData.organizationdetails[0].name}
            onChange={handleInputChange}
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
          <FormControl className="name-input13" variant="outlined">
            <InputLabel color="primary">Organization Type</InputLabel>
            <Select color="primary" size="medium" label="Organization Type"   disabled={newUserType === "Staff"} name="orgDetailsType" value={inputOrgData.organizationdetails[0].type} onChange={handleInputChange}>
            <MenuItem value="Managed Care Organization (MCO)">Managed Care Organization (MCO)</MenuItem>
            <MenuItem value="Patient-Centered Medical Home (PCMH)">Patient-Centered Medical Home (PCMH)</MenuItem>
            <MenuItem value="Accountable Care Organization (ACO)">Accountable Care Organization (ACO)</MenuItem>
            <MenuItem value="Concierge Practice">Concierge Practice</MenuItem>
            <MenuItem value="Pay-As-You-Go Clinic">Pay-As-You-Go Clinic</MenuItem>
            </Select>
            <FormHelperText />
          </FormControl>
        </div>
        {newUserType !== "Staff" &&
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
    </div> }
        <HIPAAComplianceContainer complianceDocumentation="Business Associate Agreement (BAA) with Covered Entities" />
        <div className="vector-parent">
          <img className="frame-child1" alt="" src={newImage} />
          <Button
            className="orgButtoncontainedtruefalse1"
            variant="outlined"
            color="primary"
            startIcon={<Icon>attachment_sharp</Icon>}
          >
            Attach Document
          </Button>
          <div className="orgLabel2">Risk AssessmentDocumentation</div>
        </div>
        <HIPAAComplianceContainer
          complianceDocumentation="HIPAA Compliance Policies and Procedures Documentation "
          propTop="1174px"
        />
      </div>       
    </>
  );

  };
const mapStateToProps = (state: any) => {
  const { deviceFormData, getByIdOrganizationData,createOrganizationData,updateOrganizationData } = state;
  return {
      deviceFormData, getByIdOrganizationData,createOrganizationData,updateOrganizationData
  };
};

export default connect(mapStateToProps)(OrganizationDetails)