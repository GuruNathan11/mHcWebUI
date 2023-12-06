
import { useState, useCallback, Dispatch, useEffect } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
  Button,
  Icon,
  colors,
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
import { hi } from "date-fns/locale";
import { Label } from "reactstrap";
import loaddingFile from '../../../../src/assets/images/tenor.gif';
interface IAddOrganization { }
interface IAddOrganization {
  StaticPage: any;
  dispatch: Dispatch<any>;
  createOrganizationData: any;
  errorMessage: any;
  state: {
    nodes: [],
    checked: [],
    expanded: []
  }
}
const AddOrganization: React.FC<IAddOrganization> = ({
  dispatch, createOrganizationData, errorMessage


}) => {


  let [inputOrgData, setInputOrgData] = useState(organizationRegisterData);
  const [spinner, setSpinner] = useState(false);

  const [organizationred, setorganizationred] = useState(false);
  const handleInputChange = (event: any) => {
    if (event.target.id === "orgDetailsTin") {
      inputOrgData.organizationdetails[0].tin = event.target.value;
    } else if (event.target.id === "orgDetailsName") {
      inputOrgData.organizationdetails[0].name = event.target.value;
    } else if (event.target.id === "orgDetailsNpi") {
      inputOrgData.organizationdetails[0].npi = event.target.value;
    } else if (event.target.id === "orgEmail") {
      inputOrgData.email = event.target.value;
    } else if (event.target.id === "orgAddressLine1") {
      inputOrgData.contact[0].addressLine1 = event.target.value;
    } else if (event.target.id === "orgWebsiteUrl") {
      inputOrgData.websiteUrl = event.target.value;
    } else if (event.target.id === "orgPOCName") {
      inputOrgData.pointofcontact[0].name = event.target.value;
    } else if (event.target.id === "orgPOCEmail") {
      inputOrgData.pointofcontact[0].email = event.target.value;
    } else if (event.target.id === "orgPOCPhoneNumber") {
      inputOrgData.pointofcontact[0].phoneNumber = Constants.formatPhoneNumber(event.target.value);
    } else if (event.target.id === "orgHippaPOMobile") {
      inputOrgData.hippaprivacyofficer[0].mobile = Constants.formatPhoneNumber(event.target.value);
    } else if (event.target.id === "orgHippaPOName") {
      inputOrgData.hippaprivacyofficer[0].name = event.target.value;
    } else if (event.target.id === "orgHippaPOEmail") {
      inputOrgData.hippaprivacyofficer[0].email = event.target.value;
    } else if (event.target.id === "orgHippaSOMobile") {
      inputOrgData.hippassecurityofficer[0].mobile = Constants.formatPhoneNumber(event.target.value);
    } else if (event.target.id === "orgHipppaSOName") {
      inputOrgData.hippassecurityofficer[0].name = event.target.value;
    } else if (event.target.id === "orgHippaSOEmail") {
      inputOrgData.hippassecurityofficer[0].email = event.target.value;
    } else if (event.target.name === "orgDetailsType") {
      inputOrgData.organizationdetails[0].type = event.target.value;
    } else if (event.target.id === "orgMobileNumber") {
      inputOrgData.mobileNumber = Constants.formatPhoneNumber(event.target.value);
    } else if (event.target.id === "colorred") {
      setorganizationred(event.target.checked);
      inputOrgData.organizationdetails[0].type = "";
    }

    setInputOrgData({ ...inputOrgData });
  }

  
  const [isValid, setValid] = useState(true);
  const checkValidation = () => {
    errorMessage = "";
    setValid(true);
    var email = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/i;
    var phoneno = /^\(\d{3}\) \d{3}-\d{4}$/;
    if ((inputOrgData.organizationdetails[0].name == null || inputOrgData.organizationdetails[0].name == "" || inputOrgData.organizationdetails[0].name.length == 0)) {
      setValid(false);
      document.getElementById("orgDetailsName").focus();
      errorMessage = "Organization Name is Not a Valid";
      return false;
    } else if ((inputOrgData.organizationdetails[0].type == null || inputOrgData.organizationdetails[0].type == "" || inputOrgData.organizationdetails[0].type!.length == 0)) {
      setValid(false);
      document.getElementById("orgDetailsType").focus();
      errorMessage = "Select Organization";
      return false;
    } else if ((inputOrgData.organizationdetails[0].tin == null || inputOrgData.organizationdetails[0].tin == "" || inputOrgData.organizationdetails[0].tin!.length == 0)) {
      setValid(false);
      document.getElementById("orgDetailsTin").focus();
      errorMessage = "Organization Txn ID Number is Not a Valid";
      return false;
    } else if ((inputOrgData.organizationdetails[0].npi == null || inputOrgData.organizationdetails[0].npi == "" || inputOrgData.organizationdetails[0].npi!.length == 0)) {
      setValid(false);
      document.getElementById("orgDetailsNpi").focus();
      errorMessage = "Organization NPI is Not a Valid";
      return false;
    } else if ((inputOrgData.contact[0].addressLine1 == null || inputOrgData.contact[0].addressLine1 == "" || inputOrgData.contact[0].addressLine1!.length == 0)) {
      setValid(false);
      document.getElementById("orgAddressLine1").focus();
      errorMessage = "Organization Business Address is Not a Valid";
      return false;
    } else if ((inputOrgData.email == null || inputOrgData.email == "" || inputOrgData.email.length == 0 || !email.test(inputOrgData.email))) {
      setValid(false);
      document.getElementById("orgEmail").focus();
      errorMessage = "Organization Email is Not a Valid";
      return false;
    } else if ((inputOrgData.mobileNumber == null || inputOrgData.mobileNumber == "" || inputOrgData.mobileNumber!.length == 0 || !phoneno.test(inputOrgData.mobileNumber))) {
      setValid(false);
      document.getElementById("orgMobileNumber").focus();
      errorMessage = "Organization mobileNumber is Not a Valid";
      return false;
    } else if ((inputOrgData.pointofcontact[0].email == null || inputOrgData.pointofcontact[0].email == "" || inputOrgData.pointofcontact[0].email.length == 0 || !email.test(inputOrgData.pointofcontact[0].email))) {
      setValid(false);
      document.getElementById("orgPOCEmail").focus();
      errorMessage = "Alternative Email is Not a Valid";
      return false;
    } else if ((inputOrgData.hippassecurityofficer[0].email == null || inputOrgData.hippassecurityofficer[0].email == "" || inputOrgData.hippassecurityofficer[0].email.length == 0 || !email.test(inputOrgData.hippassecurityofficer[0].email))) {
      setValid(false);
      document.getElementById("orgHippaSOEmail").focus();
      errorMessage = "HIPAA Security Officer Email Address is Not a Valid";
      return false;
    } else if ((inputOrgData.hippaprivacyofficer[0].email == null || inputOrgData.hippaprivacyofficer[0].email == "" || inputOrgData.hippaprivacyofficer[0].email.length == 0 || !email.test(inputOrgData.hippaprivacyofficer[0].email))) {
      setValid(false);
      document.getElementById("orgHippaPOEmail").focus();
      errorMessage = "HIPAA Privacy Officer Email Address is Not a Valid";
      return false;
    }
    else {
      setValid(true);
      return true;
    }

  }
  const [isCreateOrganizationPageLoaded, setCreateOrganizationPageLoaded] = useState(false);

  if (!isCreateOrganizationPageLoaded && !createOrganizationData.isLoading) { 
    setInputOrgData(createOrganizationData.items.data);    
    if (createOrganizationData.items.message.code === "MHC - 0200") {
      alert(createOrganizationData.items.message.description);  
      setTimeout(() => {
        window.location.href = "/Login";
        setSpinner(false);
      }, (1000));   
      setCreateOrganizationPageLoaded(true);    
    } else {
      alert(createOrganizationData.items.message.description);   
      setTimeout(() => {
        setCreateOrganizationPageLoaded(false);
        setSpinner(false);
      }, (1000));
    }
  
  }
  if (!createOrganizationData && createOrganizationData.isFormSubmit) {
  
    setTimeout(() => {
      setCreateOrganizationPageLoaded(false);
      setSpinner(false);
    }, (1000));
  }
  
  const handleClickChange = () => {
    checkValidation();
    setSpinner(true);
    if (isValid && errorMessage.length === 0) {
      inputOrgData.userType = "Admin";
      setInputOrgData({ ...inputOrgData });

     
      if (inputOrgData.id != "") {
        dispatch(createOrganization(inputOrgData));    
        window.location.reload();
      } 

    } else {
      alert(errorMessage);
    }


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
          <div className="details">Add Organization</div>
        </div>
        <div className="orgForm-fields">
          <TextField
            id="orgDetailsTin"
            className="destination-name-input"
            color="primary"
            variant="outlined"
            type="text"
            label={<span>
              Tax Id Number (TIN) <span style={{ color: 'red' }}>*</span>
            </span>}
            value={inputOrgData.organizationdetails[0].tin}
            onChange={handleInputChange}
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
          <TextField
            id="orgDetailsNpi"
            className="destination-name-input"
            color="primary"
            variant="outlined"
            label={
              <span>
                National Provider Identifier (NPI) <span style={{ color: 'red' }}>*</span>
              </span>
            }
            type="text"
            value={inputOrgData.organizationdetails[0].npi}
            onChange={handleInputChange}
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
        </div>
        <div className="orgForm-fields1">
          <TextField
            id="orgAddressLine1"
            className="destination-name-input"
            color="primary"
            variant="outlined"
            type="text"
            label={
              <span>
               Business Address <span style={{ color: 'red' }}>*</span>
              </span>
            }
            value={inputOrgData.contact[0].addressLine1}
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
            type="email"
            label={
              <span>
               Email <span style={{ color: 'red' }}>*</span>
              </span>
            }
            value={inputOrgData.email}
            onChange={handleInputChange}
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
          <TextField
            id="orgMobileNumber"
            className="destination-name-input"
            color="primary"
            variant="outlined"
            type="text"
            label={
              <span>
               Phone Number <span style={{ color: 'red' }}>*</span>
              </span>
            }
            value={inputOrgData.mobileNumber}
            onChange={handleInputChange}
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
        </div>
        <div className="orgForm-fields3">
          <TextField
            id="orgWebsiteUrl"
            className="destination-name-input"
            color="primary"
            variant="outlined"
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
            id="orgPOCEmail"
            className="destination-name-input"
            color="primary"
            variant="outlined"
            type="email"
            label="Alternative Email"
            value={inputOrgData.pointofcontact[0].email}
            onChange={handleInputChange}
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
          <TextField
            id="orgPOCPhoneNumber"
            className="destination-name-input"
            color="primary"
            variant="outlined"
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
            id="orgHippaPOMobile"
            className="destination-name-input"
            color="primary"
            variant="outlined"
            type="text"
            label="HIPAA Privacy Officer Phone Number"
            value={inputOrgData.hippaprivacyofficer[0].mobile}
            onChange={handleInputChange}
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
          <TextField
            id="orgHipppaSOName"
            className="destination-name-input"
            color="primary"
            variant="outlined"
            type="text"
            label="HIPAA Security Officer Name"
            value={inputOrgData.hippassecurityofficer[0].name}
            onChange={handleInputChange}
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
        </div>
        <div className="orgForm-fields6">
          <TextField
            id="orgHippaPOName"
            className="destination-name-input"
            color="primary"
            variant="outlined"
            type="email"
            label="HIPAA Privacy Officer Name"
            value={inputOrgData.hippaprivacyofficer[0].name}
            onChange={handleInputChange}
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
          <TextField
            id="orgHippaPOEmail"
            className="destination-name-input"
            color="primary"
            variant="outlined"
            type="text"
            label="HIPAA Privacy Officer Email Address"
            value={inputOrgData.hippaprivacyofficer[0].email}
            onChange={handleInputChange}
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
        </div>
        <div className="orgForm-fields7">
          <TextField
            id="orgHippaSOEmail"
            className="destination-name-input"
            color="primary"
            variant="outlined"
            type="email"
            label="HIPAA Security Officer Email Address"
            value={inputOrgData.hippassecurityofficer[0].email}
            onChange={handleInputChange}
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
          <TextField
            id="orgHippaSOMobile"
            className="destination-name-input"
            color="primary"
            variant="outlined"
            type="text"
            label="HIPAA Security Officer Phone Number"
            value={inputOrgData.hippassecurityofficer[0].mobile}
            onChange={handleInputChange}
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
        </div>
        <div className="orgForm-fields8">
          <TextField

            id="orgDetailsName"
            className="destination-name-input"
            color="primary"
            variant="outlined"
            type="text"
            label={
              <span >Organization Name
                <span style={{ color: 'red' }}>*</span>

              </span>
            }
            value={inputOrgData.organizationdetails[0].name}
            onChange={handleInputChange}
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
          <FormControl className="name-input13" variant="outlined">
            <InputLabel color="primary" ><span >Organization Type
              <span style={{ color: 'red' }}>*</span>

            </span></InputLabel>
            <Select color="primary" size="medium" label="Organization Type" id="orgDetailsType" name="orgDetailsType" value={inputOrgData.organizationdetails[0].type} onChange={handleInputChange}>
              <MenuItem value="Managed Care Organization (MCO)">Managed Care Organization (MCO)</MenuItem>
              <MenuItem value="Patient-Centered Medical Home (PCMH)">Patient-Centered Medical Home (PCMH)</MenuItem>
              <MenuItem value="Accountable Care Organization (ACO)">Accountable Care Organization (ACO)</MenuItem>
              <MenuItem value="Concierge Practice">Concierge Practice</MenuItem>
              <MenuItem value="Pay-As-You-Go Clinic">Pay-As-You-Go Clinic</MenuItem>
            </Select>
            <FormHelperText />
          </FormControl>
        </div>
        <div className="component-5011">
          <div className="cancel-group">
            <SecondaryButton
              label="Cancel"
              secondaryButtonCursor="pointer"
              onCancelContainerClick={null}
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
  const { deviceFormData, createOrganizationData } = state;
  return {
    deviceFormData, createOrganizationData
  };
};

export default connect(mapStateToProps)(AddOrganization)




