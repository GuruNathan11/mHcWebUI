
import React, { Dispatch, useState, useEffect, useCallback, useRef } from "react";
import { connect } from "react-redux";
import RoundVectorImage from "./../../../assets/images/mettler_images/RoundVector.svg";
import DarkVectorImage from "./../../../assets/images/mettler_images/DarkVector.svg";
import plusImage from './../../../assets/images/mettler_images/plusImage.png';
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
  Button,
  Radio,
  Icon,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Tab,
  Tabs,
  Box,
  colors
} from "@mui/material";

import loaddingFile from '../../../../src/assets/images/tenor.gif';
import "./././../../../components/FormFieldsContainer1.css"
import Dialog from 'primereact/dialog';
import CheckBoxgary from "../../../components/CheckBoxgary";
import SecondaryButton from "../../../components/SecondaryButton";
import PrimaryButton from "../../../components/PrimaryButton";
import previousImage from "./../../../assets/images/mettler_images/bg.svg";
import leftClick from "./../../../assets/images/mettler_images/arrow-circle-left.svg";
import uploadImage from "./../../../assets/images/mettler_images/rectangle-59991.svg";
import expandMore24px from "./../../../assets/images/mettler_images/expand-more-24px.svg";
import "./AddPatientBasicDetails1.css";
import "./AddPatientContact.css";
import "./AddPatientEmployer.css";
import "./AddPatientGuardian.css";
import "./AddPatientMisc.css";
import "./AddPatientState.css";
import "./AddPatientInsurance.css";
import "./AddPatientFamilyHealthHis.css";
import "./AddPatientSocialHistory.css";
import "./../../../components/CreatePatientForm4.css";
import "./../../../components/FormFieldsContainer2.css";
import "./../../../components/FormContainer.css";
import wifiImage from "./../../../assets/images/mettler_images/wifi_symbol.svg";
import radiobuttongray3 from './../../../assets/images/mettler_images/radiobuttongray3.svg';
import radiobuttongray2 from './../../../assets/images/mettler_images/radiobuttongray2.svg';
import radiobuttongray1 from './../../../assets/images/mettler_images/radiobuttongray1.svg';
import selectorImage from "./../../../assets/images/mettler_images/selectorPatientDetail.svg";
import FooterSection from "../../../components/FooterSection";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import FormFieldsContainer2 from "../../../components/FormFieldsContainer2";
import FormFieldsContainer1 from "../../../components/FormFieldsContainer1";
import FormContainer from "../../../components/FormContainer";
import FormContainer1 from "../../../components/FormContainer1";

import FormRadio1 from "../../../components/FormRadio1";
import FormRadio from "../../../components/FormRadio";
import patientRegisteredData from './../../../assets/data/PatientRegisterData.json'
import { DataTable } from "primereact/datatable";
import healthHistoryData from '../../../assets/data/FamilyHealthHistoryData.json';
import { Column } from "primereact/column";
import * as Constants from "../Constants/ConstantValues";
import { createPatient, getAllPatient, updatePatientById } from "../../../store/actions/Patient";
import { TabList, TabContext, TabPanel } from '@mui/lab';
import employerIndustryData from '../../../assets/data/Dropdown_JSON/EmployerIndustry.json';
import { HttpLogin } from "../../../utils/Http";
import moment from "moment";
import { spawn } from "redux-saga/effects";

interface ICreatePatient { }
interface ICreatePatient {
  StaticPage: any;
  match: any;
  dispatch: Dispatch<any>;
  getAllPatientData: any;
  errorMessageId: any;
  errorMessage: any;
  createPatientData:any;
  updatePatientData:any;
  state: {
    nodes: [],
    checked: [],
    expanded: []
  }
}


const CreatePatient: React.FC<ICreatePatient> = ({
  dispatch, getAllPatientData, match, errorMessageId, errorMessage,createPatientData,updatePatientData


}) => {

  let [organizationId, setOrganizationId] = useState("");
  let [encryptPatientId, setEncryptPatientId] = useState(null);
  let [decryptPatientId, setDecryptPatientId] = useState(null);
  let [inputPatientData, setInputPatientData] = useState(patientRegisteredData);
  //let [inputPatientData, setInputPatientData] = useState(patientRegisteredData);
  const [Language, setAgreements] = useState(false);
  const [ethnicity, setEthnicity] = useState(false);
  const [race, setRace] = useState(false);
  const [Gendercreatepation, setGendercreatepation] = useState(false);
  const [SexualOrientation, setSexualOrientation] = useState(false);
  const [Gendergardian, setGendergardian] = useState(false);
  const [Genderinsurance, setgenderinsurance] = useState(false);
  const [Secondarygenderinsu, setSecondarygenderinsu] = useState(false);
  let [genderDropDownValues, setGenderDropDownValues] = useState(null);
  let [languageDropDownValues, setLanguageDropDownValues] = useState(null);
  let [EthnicityDropDownValues, setEthnicityDropDownValues] = useState(null);
  let [RaceDropDownValues, setRaceDropDownValues] = useState(null)
  let [IndustryDropDownValues, setIndustryDropDownValues] = useState(null)
  let [RelationshipDropDownValues, setRelationshipDropDownValues] = useState(null)
  let [OccupationDropDownValues, setOccupationDropDownValues] = useState(null)

  let [StateDownValues, setStateDropDownValues] = useState(null)
  let [CountryDownValues, setCountryDropDownValues] = useState(null)
  let [InsuranceProviderDownValues, setInsuranceProviderDownValues] = useState(null)
  let [ReligionDownValues, setReligionDownValue] = useState(null)
  let [ReferralSourceDownValues, setReferralSourceDownValues] = useState(null)
  const [spinner, setSpinner] = useState(false);
  useEffect(() => {
    setSpinner(true); 
    var orgData = JSON.parse(window.localStorage.getItem("LOGINDATA"));
    var patientInfoData = JSON.parse(window.localStorage.getItem("LOGINDATA"));
    orgData = orgData.loginInput.organization;
    setOrganizationId(orgData);

    var encryptInitial = match.params.patientId;
    setEncryptPatientId(encryptInitial);
    var CryptoJS = require("crypto-js");
    let decodePatientid = decodeURIComponent(encryptInitial);
    let decodeFinalPatientid = patientInfoData.items.data.userType[0] === "Patient"  ? patientInfoData.items.data.userDetail.id : CryptoJS.AES.decrypt(decodePatientid.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
    setDecryptPatientId(decodeFinalPatientid);
    HttpLogin.axios().get("api/dropdowns/get-all")
    .then((response) => {
      let newInputData = response.data.data.filter(k=>k.dropdown === "gender").map((i) => { return i.list })
      setGenderDropDownValues(newInputData[0]);
      let lgInputData = response.data.data.filter(k=>k.dropdown === "language").map((i => { return i.list }))
      setLanguageDropDownValues(lgInputData[0]);
      let EthnicInputData = response.data.data.filter(k=>k.dropdown === "ethnicity").map((i => { return i.list }))
      setEthnicityDropDownValues(EthnicInputData[0]);
      let RaceInputData = response.data.data.filter(k=>k.dropdown === "race").map((i => { return i.list }))
      setRaceDropDownValues(RaceInputData[0]);
      let IndustryInputData = response.data.data.filter(k=>k.dropdown === "industry").map((i => { return i.list }))
      setIndustryDropDownValues(IndustryInputData[0]);
      let RelationshipInputData = response.data.data.filter(k=>k.dropdown === "relationShip").map((i => { return i.list }))
      setRelationshipDropDownValues(RelationshipInputData[0]);
      let OccupationInputData = response.data.data.filter(k=>k.dropdown === "occupation").map((i => { return i.list }))
      setOccupationDropDownValues(OccupationInputData[0]);
      let StateInputData = response.data.data.filter(k=>k.dropdown === "state").map((i => { return i.list }))
      setStateDropDownValues(StateInputData[0]);
      let CountryInputData = response.data.data.filter(k=>k.dropdown === "country").map((i => { return i.list }))
      setCountryDropDownValues(CountryInputData[0]);
      let InsuranceProviderInputData = response.data.data.filter(k=>k.dropdown === "insuranceProvider").map((i => { return i.list }))
      setInsuranceProviderDownValues(InsuranceProviderInputData[0]);
      let ReligionInputData = response.data.data.filter(k=>k.dropdown === "religion").map((i => { return i.list }))
      setReligionDownValue(ReligionInputData[0]);
      let ReferalSourceInputData = response.data.data.filter(k=>k.dropdown === "referralSource").map((i => { return i.list }))
      setReferralSourceDownValues(ReferalSourceInputData[0]);
      setSpinner(false);

    })
    if(decodeFinalPatientid !== ""){
    HttpLogin.axios().get("api/patient/getPatient/" + decodeFinalPatientid)
      .then((res) => {
        if (res.data.message.code === "MHC - 0200") {
          res.data.data.basicDetails[0].birthDate = res.data.data.basicDetails[0].birthDate  !== null && res.data.data.basicDetails[0].birthDate !== undefined  && res.data.data.basicDetails[0].birthDate !== ""? new Date(moment(res.data.data.basicDetails[0].birthDate, "YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z")): null;
          res.data.data.contact[0].additionalAddress[0].startDate = res.data.data.contact[0].additionalAddress[0].startDate !== null && res.data.data.contact[0].additionalAddress[0].startDate !== undefined && res.data.data.contact[0].additionalAddress[0].startDate !== ""? new Date(moment(res.data.data.contact[0].additionalAddress[0].startDate, "YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z")):null;
          res.data.data.contact[0].additionalAddress[0].endDate = res.data.data.contact[0].additionalAddress[0].endDate !== null && res.data.data.contact[0].additionalAddress[0].endDate !== undefined && res.data.data.contact[0].additionalAddress[0].endDate !== "" ? new Date(moment(res.data.data.contact[0].additionalAddress[0].endDate, "YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z")):null;
          res.data.data.misc[0].dateDeceased = res.data.data.misc[0].dateDeceased !== null && res.data.data.misc[0].dateDeceased !== undefined && res.data.data.misc[0].dateDeceased !== "" ? new Date(moment(res.data.data.misc[0].dateDeceased, "YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z")):null;
          res.data.data.stats[0].financialReviewDate = res.data.data.stats[0].financialReviewDate !== null && res.data.data.stats[0].financialReviewDate !== undefined && res.data.data.stats[0].financialReviewDate !== "" ? new Date(moment(res.data.data.stats[0].financialReviewDate, "YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z")):null;
          res.data.data.insurance[0].primary[0].birthDate = res.data.data.insurance[0].primary[0].birthDate !== null && res.data.data.insurance[0].primary[0].birthDate !== undefined && res.data.data.insurance[0].primary[0].birthDate !== "" ? new Date(moment(res.data.data.insurance[0].primary[0].birthDate, "YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z")):null;
          res.data.data.insurance[0].primary[0].effectivedate = res.data.data.insurance[0].primary[0].effectivedate !== null && res.data.data.insurance[0].primary[0].effectivedate !== undefined && res.data.data.insurance[0].primary[0].effectivedate !== "" ? new Date(moment(res.data.data.insurance[0].primary[0].effectivedate, "YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z")):null;
          if (res.data.data.insurance[0].secondary != "") {
            if (res.data.data.insurance[0].secondary.length > 0) {
              for (var i = 0; i < res.data.data.insurance[0].secondary.length; i++) {
                res.data.data.insurance[0].secondary[i].insuranceDetails.birthDate = res.data.data.insurance[0].secondary[i].insuranceDetails.birthDate !== null && res.data.data.insurance[0].secondary[i].insuranceDetails.birthDate !== undefined && res.data.data.insurance[0].secondary[i].insuranceDetails.birthDate !== "" ? new Date(moment(res.data.data.insurance[0].secondary[i].insuranceDetails.birthDate, "YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z")):null;
                res.data.data.insurance[0].secondary[i].insuranceDetails.effectivedate = res.data.data.insurance[0].secondary[i].insuranceDetails.effectivedate !== null && res.data.data.insurance[0].secondary[i].insuranceDetails.effectivedate !== undefined && res.data.data.insurance[0].secondary[i].insuranceDetails.effectivedate !== "" ? new Date(moment(res.data.data.insurance[0].secondary[i].insuranceDetails.effectivedate, "YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z")):null;
              }
            } else {

            }
          }
          res.data.data.basicDetails[0].ssn = res.data.data.basicDetails[0].ssn !== "" ? Constants.formatSSNumber(res.data.data.basicDetails[0].ssn) : "";
          setInputPatientData(res.data.data);
          setSpinner(false);
        } else {
          alert(res.data.message.description);
        }

      })

 
    }
   
    dispatch(getAllPatient());
  }, []);
  const [value, setValue] = React.useState(0);
  let [employerDropData, setEmployerDropData] = useState(employerIndustryData);




  let [patientSelectId, setPatientSelectId] = useState(0);


  const handleChangeEvent = (event) => {
    patientSelectId = event;
    setPatientSelectId(event);
  };

  const [imageUpload, setImageUpload] = useState(false);
  const hiddenFileInput = useRef(null);

  const handleProfileChange = () => {
    setImageUpload(true);
    hiddenFileInput.current.click();
  }
  
  let newGenderDropDown = genderDropDownValues != null && genderDropDownValues.length > 0 && genderDropDownValues.map((item, i) => {
    return (
      <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
    )
  })
  let newLanguageDropDown = languageDropDownValues != null && languageDropDownValues.length > 0 && languageDropDownValues.map((item, i) => {
    return (
      <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
    )
  })
  let newEthnicityDropDown = EthnicityDropDownValues != null && EthnicityDropDownValues.length > 0 && EthnicityDropDownValues.map((item, i) => {
    return (
      <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
    )
  })
  let newRaceDropDown = RaceDropDownValues != null && RaceDropDownValues.length > 0 && RaceDropDownValues.map((item, i) => {
    return (
      <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
    )
  })
  let newIndustryDropDown = IndustryDropDownValues != null && IndustryDropDownValues.length > 0 && IndustryDropDownValues.map((item, i) => {
    return (
      <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
    )
  })
  let newRelationshipDropDown = RelationshipDropDownValues != null && RelationshipDropDownValues.length > 0 && RelationshipDropDownValues.map((item, i) => {
    return (
      <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
    )
  })
  let newOccupationDropDown = OccupationDropDownValues != null && OccupationDropDownValues.length > 0 && OccupationDropDownValues.map((item, i) => {
    return (
      <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
    )
  })
  let newStateDropDown = StateDownValues != null && StateDownValues.length > 0 && StateDownValues.map((item, i) => {
    return (
      <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
    )
  })
  let newCountryDropDown = CountryDownValues != null && CountryDownValues.length > 0 && CountryDownValues.map((item, i) => {
    return (
      <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
    )
  })
  let newInsuranceProviderDropDown = InsuranceProviderDownValues != null && InsuranceProviderDownValues.length > 0 && InsuranceProviderDownValues.map((item, i) => {
    return (
      <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
    )
  })
  let newReligionProviderDropDown = ReligionDownValues != null && ReligionDownValues.length > 0 && ReligionDownValues.map((item, i) => {
    return (
      <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
    )
  })
  let newReferralProviderProviderDropDown = ReferralSourceDownValues != null && ReferralSourceDownValues.length > 0 && ReferralSourceDownValues.map((item, i) => {
    return (
      <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
    )
  })

  const checkValidation = (inputPatientData) => {
    errorMessage = "";
    errorMessageId = "";
    setValid(true);
    var email = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/i;
    var ssnNumber = /^\(?(\d{3})\)?[-]?(\d{2})[-]?(\d{4})$/;


    if (inputPatientData.basicDetails[0].name[0].given.length < 3) {
      setValid(false);
      patientSelectId = 1;
      errorMessageId = "patientFirstName";
      //document.getElementById("patientFirstName").focus() 
      errorMessage = "First Name Not a Valid ";
      return false;
    } else if (inputPatientData.basicDetails[0].name[0].family === "" || inputPatientData.name[0].family.length == 0) {
      setValid(false);
      // document.getElementById("patientFamilyName").focus() 
      errorMessage = "Last Name is Not a Valid ";
      return false;
    }
    else if ((inputPatientData.email == null || inputPatientData.email == "" || inputPatientData.email.length === 0) && (!email.test(inputPatientData.email))) {
      setValid(false);
      // document.getElementById("patientEmail").focus(); 
      errorMessage = "Email is Not a Valid";
      return false;
    }
    else if ((inputPatientData.basicDetails[0].ssn == null || inputPatientData.basicDetails[0].ssn == "" || inputPatientData.basicDetails[0].ssn.length !== 0) && (!ssnNumber.test(inputPatientData.basicDetails[0].ssn))) {
      setValid(false);
      // document.getElementById("patientSsn").focus();
      errorMessage = "Enter the valid SNN number ";
      return false;
    }

    else if ((inputPatientData.contact[0].firstName == null || inputPatientData.contact[0].firstName == "" || inputPatientData.contact[0].firstName === 0)) {
      setValid(false);
      // document.getElementById("patientContactFirstName").focus(); 
      errorMessage = "First Name Not a Valid ";
      return false;
    }
    else if ((inputPatientData.contact[0].contactEmail == null || inputPatientData.contact[0].contactEmail == "" || inputPatientData.contact[0].contactEmail === 0) && (!email.test(inputPatientData.contact[0].email))) {
      setValid(false);
      // document.getElementById("patientContactEmail").focus(); 
      errorMessage = "Email is Not a Valid";
      return false;
    }
    else if ((inputPatientData.contact[0].trustedEmail == null || inputPatientData.contact[0].trustedEmail == "" || inputPatientData.contact[0].trustedEmail === 0) && (!email.test(inputPatientData.contact[0].email))) {
      setValid(false);
      // document.getElementById("patientTrustedEmail").focus(); 
      errorMessage = "Email is Not a Valid";
      return false;
    }
    else if ((inputPatientData.guardian[0].name == null || inputPatientData.guardian[0].name == "" || inputPatientData.guardian[0].name === 0)) {
      setValid(false);
      // document.getElementById("patientGuardianName").focus(); 
      errorMessage = "Enter the valid Guardian Name";
      return false;
    }
    else if ((inputPatientData.guardian[0].email == null || inputPatientData.guardian[0].email == "" || inputPatientData.guardian[0].email === 0)) {
      setValid(false);
      // document.getElementById("patientPriInsSsn").focus(); 
      errorMessage = "Enter the valid Guardian Email";
      return false;
    }
    else if ((inputPatientData.insurance[0].primary[0].ss == null || inputPatientData.insurance[0].primary[0].ss == "" || inputPatientData.insurance[0].primary[0].ss === 0) && (!ssnNumber.test(inputPatientData.insurance[0].primary[0].ss))) {
      setValid(false);
      // document.getElementById("patientPriInsSsn").focus(); 
      errorMessage = "Enter the valid Guardian Email";
      return false;
    }
    else if ((inputPatientData.insurance[0].secondary[0].insuranceDetails.ss == null || inputPatientData.insurance[0].secondary[0].insuranceDetails.ss == "" || inputPatientData.insurance[0].secondary[0].insuranceDetails.ss === 0) && (!ssnNumber.test(inputPatientData.insurance[0].secondary[0].insuranceDetails.ss))) {
      setValid(false);
      // document.getElementById("patientSecInsSsn").focus(); 
      errorMessage = "Enter the valid Guardian Email";
      return false;
    }
    else {
      setValid(true);
      return true;
    }

  }

  const handleInputChange = (event: any) => {
    if (event.target.id === "patientSsn") {
      inputPatientData.basicDetails[0].ssn = Constants.formatSSNumber(event.target.value);
    } else if (event.target.id === "patientLicense") {
      inputPatientData.basicDetails[0].licenseId = event.target.value;
    } else if (event.target.name === "patientMaritalStatus") {
      inputPatientData.basicDetails[0].maritalStatus = event.target.value;
    } else if (event.target.id === "patientEmail") {
      inputPatientData.email = event.target.value;
    } else if (event.target.name === "patientType") {
      inputPatientData.basicDetails[0].coding[0].code = event.target.value;
    } else if (event.target.id === "patientFirstName") {
      inputPatientData.basicDetails[0].name[0].given = Constants.formatFirstName(event.target.value);
    } else if (event.target.id === "patientMiddleName") {
      inputPatientData.basicDetails[0].name[0].use = event.target.value;
    } else if (event.target.id === "patientFamilyName") {
      inputPatientData.basicDetails[0].name[0].family = event.target.value.toUpperCase();;
    } else if (event.target.name === "patientGender") {
      inputPatientData.basicDetails[0].gender = event.target.value;
    } else if (event.target.name === "patientSexual") {
      inputPatientData.basicDetails[0].sexualOrientation = event.target.value;
    } else if (event.target.name === "patientCountry") {
      inputPatientData.contact[0].address[0].country = event.target.value;
    } else if (event.target.id === "patientMotherName") {
      inputPatientData.contact[0].motherName = event.target.value;
    } else if (event.target.id === "patientCity") {
      inputPatientData.contact[0].address[0].city = event.target.value;
    } else if (event.target.id === "patientState") {
      inputPatientData.contact[0].address[0].state = event.target.value;
    } else if (event.target.id === "patientPostalCode") {
      inputPatientData.contact[0].address[0].postalCode = event.target.value;
    } else if (event.target.id === "patientAddressLine1") {
      inputPatientData.contact[0].address[0].addressLine1 = event.target.value;
    } else if (event.target.id === "patientAddressLine2") {
      inputPatientData.contact[0].address[0].addressLine2 = event.target.value;
    } else if (event.target.id === "patientContactFirstName") {
      inputPatientData.contact[0].firstName = Constants.formatFirstName(event.target.value);
    } else if (event.target.id === "patientContactMiddleName") {
      inputPatientData.contact[0].lastName = event.target.value;
    } else if (event.target.id === "patientContactEmail") {
      inputPatientData.contact[0].contactEmail = event.target.value;
    } else if (event.target.id === "patientTrustedEmail") {
      inputPatientData.contact[0].trustedEmail = event.target.value;
    } else if (event.target.name === "patientAddressType") {
      inputPatientData.contact[0].additionalAddress[0].addressType = event.target.value;
    } else if (event.target.id === "patientUnassignedUSA") {
      inputPatientData.employer[0].unassignedUSA = event.target.value;
    } else if (event.target.name === "patientIndustry") {
      inputPatientData.employer[0].industry = event.target.value;
    } else if (event.target.id === "patientEmployerAddressLine1") {
      inputPatientData.employer[0].addressLine1 = event.target.value;
    } else if (event.target.id === "patientEmployerAddressLine2") {
      inputPatientData.employer[0].addressLine2 = event.target.value;
    } else if (event.target.id === "patientEmployerCity") {
      inputPatientData.employer[0].city = event.target.value;
    } else if (event.target.id === "patientEmployerState") {
      inputPatientData.employer[0].state = event.target.value;
    } else if (event.target.id === "patientEmployerPostalCode") {
      inputPatientData.employer[0].postalCode = event.target.value;
    } else if (event.target.name === "patientOccupation") {
      inputPatientData.employer[0].occupation = event.target.value;
    } else if (event.target.id === "patientGuardianWorkPhone") {
      inputPatientData.guardian[0].workPhone = Constants.formatPhoneNumber(event.target.value);
    } else if (event.target.id === "patientGuardianEmail") {
      inputPatientData.guardian[0].email = event.target.value;
    } else if (event.target.name === "patientGuardianGender") {
      inputPatientData.guardian[0].gender = event.target.value;
    } else if (event.target.id === "patientGuardianAddressLine1") {
      inputPatientData.guardian[0].address[0].addressLine1 = event.target.value;
    } else if (event.target.id === "patientGuardianName") {
      inputPatientData.guardian[0].name = Constants.formatFirstName(event.target.value);
    } else if (event.target.id === "patientGuardianCity") {
      inputPatientData.guardian[0].address[0].city = event.target.value;
    } else if (event.target.name === "patientGuardianState") {
      inputPatientData.guardian[0].address[0].state = event.target.value;
    } else if (event.target.name === "patientGuardianCountry") {
      inputPatientData.guardian[0].address[0].country = event.target.value;
    } else if (event.target.name === "patientGuardianRelationship") {
      inputPatientData.guardian[0].relationship = event.target.value;
    } else if (event.target.id === "patientMiscReason") {
      inputPatientData.misc[0].reason = event.target.value;
    } else if (event.target.id === "patientStatsMigrant") {
      inputPatientData.stats[0].migrant = event.target.value;
    } else if (event.target.id === "patientStatsFamilySize") {
      inputPatientData.stats[0].familySize = event.target.value;
    } else if (event.target.id === "patientStatsMonthlyIncome") {
      inputPatientData.stats[0].monthlyIncome = event.target.value;
    } else if (event.target.name === "patientStatsReferralSource") {
      inputPatientData.stats[0].referralSource = event.target.value;
    } else if (event.target.name === "patientStatsReligion") {
      inputPatientData.stats[0].religion = event.target.value;
    } else if (event.target.id === "patientStatsVfc") {
      inputPatientData.stats[0].vfc = event.target.value;
    } else if (event.target.id === "patientStatsHomeless") {
      inputPatientData.stats[0].homeless = event.target.value;
    } else if (event.target.id === "patientStatsInterpreter") {
      inputPatientData.stats[0].interpreter = event.target.value;
    } else if (event.target.name === "patientStatsLanguage") {
      inputPatientData.stats[0].language = event.target.value;
    } else if (event.target.name === "patientStatsEthnicity") {
      inputPatientData.stats[0].ethnicity = event.target.value;
    } else if (event.target.name === "patientStatsRace") {
      inputPatientData.stats[0].race = event.target.value;
    } else if (event.target.id === "patientPriInsSEZipCode") {
      inputPatientData.insurance[0].primary[0].subscriberAddress[0].zipCode = event.target.value;
    } else if (event.target.id === "patientPriInsZipCode") {
      inputPatientData.insurance[0].primary[0].zipCode = event.target.value;
    } else if (event.target.name === "patientPriInsSECountry") {
      inputPatientData.insurance[0].primary[0].subscriberAddress[0].country = event.target.value;
    } else if (event.target.name === "patientPriInsCountry") {
      inputPatientData.insurance[0].primary[0].country = event.target.value;
    } else if (event.target.id === "patientPriInsSubscriberEmployer") {
      inputPatientData.insurance[0].primary[0].subscriberEmployee = event.target.value;
    } else if (event.target.name === "patientPriInsGender") {
      inputPatientData.insurance[0].primary[0].gender = event.target.value;
    } else if (event.target.id === "patientPriInsSEAddress") {
      inputPatientData.insurance[0].primary[0].seaddress = event.target.value;
    } else if (event.target.name === "patientPriInsRelationship") {
      inputPatientData.insurance[0].primary[0].relationship = event.target.value;
    } else if (event.target.id === "patientPriInsPolicyNumber") {
      inputPatientData.insurance[0].primary[0].policyNumber = event.target.value;
    } else if (event.target.id === "patientPriInsGroupNumber") {
      inputPatientData.insurance[0].primary[0].groupNumber = event.target.value;
    } else if (event.target.id === "patientPriInsSsn") {
      inputPatientData.insurance[0].primary[0].ss = Constants.formatSSNumber(event.target.value);
    } else if (event.target.id === "patientPriInsAddressLine1") {
      inputPatientData.insurance[0].primary[0].subscriberAddress[0].addressLine1 = event.target.value;
    } else if (event.target.id === "patientPriInsAddressLine2") {
      inputPatientData.insurance[0].primary[0].subscriberAddress[0].addressLine2 = event.target.value;
    } else if (event.target.id === "patientPriInsSubscriberPhone") {
      inputPatientData.insurance[0].primary[0].subscriberPhone = Constants.formatPhoneNumber(event.target.value);
    } else if (event.target.id === "patientPriInsCoPay") {
      inputPatientData.insurance[0].primary[0].co_pay = event.target.value;
    } else if (event.target.id === "patientPriInsSECity") {
      inputPatientData.insurance[0].primary[0].subscriberAddress[0].city = event.target.value;
    } else if (event.target.id === "patientPriInsCity") {
      inputPatientData.insurance[0].primary[0].city = event.target.value;
    } else if (event.target.name === "patientPriInsSEState") {
      inputPatientData.insurance[0].primary[0].subscriberAddress[0].state = event.target.value;
    } else if (event.target.name === "patientPriInsState") {
      inputPatientData.insurance[0].primary[0].state = event.target.value;
    } else if (event.target.name === "patientPriInsAcceptAssignment") {
      inputPatientData.insurance[0].primary[0].acceptAssignment = event.target.value;
    } else if (event.target.id === "patientPriInsPlanName") {
      inputPatientData.insurance[0].primary[0].planName = event.target.value;
    } else if (event.target.id === "patientPriInsSubscriber") {
      inputPatientData.insurance[0].primary[0].subscriber = event.target.value;
    } else if (event.target.name === "patientPriInsTitle") {
      inputPatientData.insurance[0].primary[0].title = event.target.value;
    } else if (event.target.id === "patientSecInsSEZipCode") {
      inputPatientData.insurance[0].secondary[0].insuranceDetails.subscriberAddress[0].zipCode = event.target.value;
    } else if (event.target.id === "patientSecInsZipCode") {
      inputPatientData.insurance[0].secondary[0].insuranceDetails.zipCode = event.target.value;
    } else if (event.target.name === "patientSecInsSECountry") {
      inputPatientData.insurance[0].secondary[0].insuranceDetails.subscriberAddress[0].country = event.target.value;
    } else if (event.target.name === "patientSecInsCountry") {
      inputPatientData.insurance[0].secondary[0].insuranceDetails.country = event.target.value;
    } else if (event.target.id === "patientSecInsSubscriberEmployer") {
      inputPatientData.insurance[0].secondary[0].insuranceDetails.subscriberEmployee = event.target.value;
    } else if (event.target.name === "patientSecInsGender") {
      inputPatientData.insurance[0].secondary[0].insuranceDetails.gender = event.target.value;
    } else if (event.target.id === "patientSecInsSEAddress") {
      inputPatientData.insurance[0].secondary[0].insuranceDetails.seaddress = event.target.value;
    } else if (event.target.name === "patientSecInsRelationship") {
      inputPatientData.insurance[0].secondary[0].insuranceDetails.relationship = event.target.value;
    } else if (event.target.id === "patientSecInsPolicyNumber") {
      inputPatientData.insurance[0].secondary[0].insuranceDetails.policyNumber = event.target.value;
    } else if (event.target.id === "patientSecInsGroupNumber") {
      inputPatientData.insurance[0].secondary[0].insuranceDetails.groupNumber = event.target.value;
    } else if (event.target.id === "patientSecInsSsn") {
      inputPatientData.insurance[0].secondary[0].insuranceDetails.ss = Constants.formatSSNumber(event.target.value);
    } else if (event.target.id === "patientSecInsAddressLine1") {
      inputPatientData.insurance[0].secondary[0].insuranceDetails.subscriberAddress[0].addressLine1 = event.target.value;
    } else if (event.target.id === "patientSecInsAddressLine2") {
      inputPatientData.insurance[0].secondary[0].insuranceDetails.subscriberAddress[0].addressLine2 = event.target.value;
    } else if (event.target.id === "patientSecInsSubscriberPhone") {
      inputPatientData.insurance[0].secondary[0].insuranceDetails.subscriberPhone = Constants.formatPhoneNumber(event.target.value);
    } else if (event.target.id === "patientSecInsCoPay") {
      inputPatientData.insurance[0].secondary[0].insuranceDetails.co_pay = event.target.value;
    } else if (event.target.id === "patientSecInsSECity") {
      inputPatientData.insurance[0].secondary[0].insuranceDetails.subscriberAddress[0].city = event.target.value;
    } else if (event.target.id === "patientSecInsCity") {
      inputPatientData.insurance[0].secondary[0].insuranceDetails.city = event.target.value;
    } else if (event.target.name === "patientSecInsSEState") {
      inputPatientData.insurance[0].secondary[0].insuranceDetails.subscriberAddress[0].state = event.target.value;
    } else if (event.target.name === "patientSecInsState") {
      inputPatientData.insurance[0].secondary[0].insuranceDetails.state = event.target.value;
    } else if (event.target.name === "patientSecInsAcceptAssignment") {
      inputPatientData.insurance[0].secondary[0].insuranceDetails.acceptAssignment = event.target.value;
    } else if (event.target.id === "patientSecInsPlanName") {
      inputPatientData.insurance[0].secondary[0].insuranceDetails.planName = event.target.value;
    } else if (event.target.id === "patientSecInsSubscriber") {
      inputPatientData.insurance[0].secondary[0].insuranceDetails.subscriber = event.target.value;
    } else if (event.target.name === "patientSecInsTitle") {
      inputPatientData.insurance[0].secondary[0].insuranceDetails.title = event.target.value;
    } else if (event.target.name === "patientSocHisNoOfChild") {
      inputPatientData.socialHistory[0].noOfChild = event.target.value;
    } else if (event.target.id === "patientSocHisChildAge1") {
      inputPatientData.socialHistory[0].childAge[0] = event.target.value;
    } else if (event.target.id === "patientSocHisChildAge2") {
      inputPatientData.socialHistory[0].childAge[1] = event.target.value;
    } else if (event.target.id === "patientSocHisSmokePerDay") {
      inputPatientData.socialHistory[0].smokePerDay = event.target.value;
    } else if (event.target.id === "patientSocHisSmokeYears") {
      inputPatientData.socialHistory[0].smokeYears = event.target.value;
    } else if (event.target.id === "patientSocHisUsePerDay") {
      inputPatientData.socialHistory[0].usePerDay = event.target.value;
    } else if (event.target.id === "patientSocHisUsingTime") {
      inputPatientData.socialHistory[0].usingTime = event.target.value;
    } else if (event.target.id === "patientSocHisQuitYear") {
      inputPatientData.socialHistory[0].quitYear = event.target.value;
    } else if (event.target.name === "patientQuitInterest") {
      inputPatientData.socialHistory[0].quitIntrest = event.target.value;
    } else if (event.target.name === "patientCaffine") {
      inputPatientData.socialHistory[0].caffine = event.target.value;
    } else if (event.target.id === "patientSocHisMigrantSeasonal") {
      inputPatientData.socialHistory[0].migrantOrSeasonal = event.target.value;
    } else if (event.target.id === "patientSocHisTabaccoUse") {
      inputPatientData.socialHistory[0].tabaccoUse = event.target.value;
    } else if (event.target.name === "patientSocHisDrinkAlcohol") {
      inputPatientData.socialHistory[0].drinkAlcohal = event.target.value;
    } else if (event.target.name === "patientSocHisPastAlcohal") {
      inputPatientData.socialHistory[0].pastAlcohal = event.target.value;
    } else if (event.target.id === "patientSocHisRecreationalDrug") {
      inputPatientData.socialHistory[0].recreationalDrugs = event.target.value;
    } else if (event.target.id === "patientSocHisOccupation") {
      inputPatientData.socialHistory[0].occupation = event.target.value;
    } else if (event.target.name === "patientSocHisHaveChild") {
      inputPatientData.socialHistory[0].child = event.target.value;
    } else if (event.target.id === "patientSocHisSexInfection") {
      inputPatientData.socialHistory[0].sexInfection = event.target.value;
    } else if (event.target.name === "patientSocHisSmoker") {
      inputPatientData.socialHistory[0].smoker = event.target.value;
    } else if (event.target.name === "patientSocHisEverSmoked") {
      inputPatientData.socialHistory[0].everSmoked = event.target.value;
    } else if (event.target.name === "patientSocHisSexActive") {
      inputPatientData.socialHistory[0].sexActive = event.target.value;
    } else if (event.target.name === "patientSocHisPartner") {
      inputPatientData.socialHistory[0].partner = event.target.value;
    } else if (event.target.id === "checkboxlanguage") {
      setAgreements(event.target.checked);
      inputPatientData.stats[0].language = "";
    } else if (event.target.id === "checkboxEthnicity") {
      setEthnicity(event.target.checked);
      inputPatientData.stats[0].ethnicity = "";
    } else if (event.target.id === "checkboxRace") {
      setRace(event.target.checked);
      inputPatientData.stats[0].race = "";
    } else if (event.target.id === "checkboxsexualorientation") {
      setSexualOrientation(event.target.checked);
      inputPatientData.basicDetails[0].sexualOrientation = "";
    } else if (event.target.id === "checkboxgenderselection") {
      setGendercreatepation(event.target.checked);
      inputPatientData.basicDetails[0].gender = "";
    } else if (event.target.id === "checkboxgardiangender") {
      setGendergardian(event.target.checked);
      inputPatientData.guardian[0].gender = "";
    } else if (event.target.id === "checkgenderinsurance") {
      setgenderinsurance(event.target.checked);
      inputPatientData.insurance[0].primary[0].gender = "";
    } else if (event.target.id === "checkboxsecondaryinsugender") {
      setSecondarygenderinsu(event.target.checked);
      inputPatientData.insurance[0].secondary[0].insuranceDetails.gender = "";
    }
    setInputPatientData({ ...inputPatientData });
    
  }

  const [selectedTab, setSelectedTab] = React.useState("0");
  const [newSelectedTab, setNewSelectedTab] = React.useState("0");

  const [tabs, setTabs] = useState([]);
  const [panels, setPanels] = useState([]);
  const [tabIndex, setTabIndex] = useState(1);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleNewTabChange = (event, newValue) => {
    setNewSelectedTab(newValue);
  };


  const createNewTab = () => {
    const newTab = {
      value: `${tabIndex}`,
      label: `Secondary ${tabIndex + 1}`
    }

    setTabs([...tabs, newTab])
    setPanels([
      ...panels,
      {
        value: `${tabIndex}`,
        newId: tabIndex
      }
    ])    
    inputPatientData.insurance[0].secondary[tabIndex] = patientRegisteredData.insurance[0].secondary[tabIndex];
    setInputPatientData({...inputPatientData});
    setSelectedTab(`${tabIndex}`);
    setTabIndex(tabIndex + 1);
   
  }


  let [isCreatePatientDataLoaded, setCreatePatientDataLoaded] = useState(false);

  if (!isCreatePatientDataLoaded && !createPatientData.isLoading) {
    createPatientData.items.data.birthDate = (createPatientData.items.data.birthDate!==null && createPatientData.items.data.birthDate!=="") ?moment(createPatientData.items.data.birthDate).format('YYYYMMDD'):"";
    createPatientData.items.data.startDate = (createPatientData.items.data.startDate && createPatientData.items.data.startDate!=="") ?moment(createPatientData.items.data.startDate).format('YYYYMMDD'):"";
    createPatientData.items.data.endDate = (createPatientData.items.data.endDate !==null && createPatientData.items.data.endDate !=="") ?moment(createPatientData.items.data.endDate).format('YYYYMMDD'):"";
    createPatientData.items.data.dateDeceased  = (createPatientData.items.data.dateDeceased!==null && createPatientData.items.data.dateDeceased!=="")?moment(createPatientData.items.data.dateDeceased).format('YYYYMMDD'):"";
    createPatientData.items.data.financialReviewDate = (createPatientData.items.data.financialReviewDate!==null && createPatientData.items.data.financialReviewDate!=="") ?moment(createPatientData.items.data.financialReviewDate).format('YYYYMMDD'):"";        
    createPatientData.items.data.effectivedate =(createPatientData.items.data.effectivedate!==null && createPatientData.items.data.effectivedate!=="") ?moment(createPatientData.items.data.effectivedate).format('YYYYMMDD'):"";
    createPatientData.items.data.birthDate = moment(createPatientData.items.data.birthDate).format('YYYYMMDD');
    if(createPatientData.items.data.insurance[0].secondary.length>0){

      for(var i=0;i<createPatientData.items.data.insurance[0].secondary.length;i++){
        createPatientData.items.data.insurance[0].secondary[i].insuranceDetails.effectivedate = (createPatientData.items.data.insurance[0].secondary[i].insuranceDetails.effectivedate!==null && createPatientData.items.data.insurance[0].secondary[i].insuranceDetails.effectivedate!=="") ?moment(createPatientData.items.data.insurance[0].secondary[i].insuranceDetails.effectivedate).format('YYYYMMDD'):"";
        createPatientData.items.data.insurance[0].secondary[i].insuranceDetails.birthDate = (createPatientData.items.data.insurance[0].secondary[i].insuranceDetails.birthDate!==null && createPatientData.items.data.insurance[0].secondary[i].insuranceDetails.birthDate!=="") ?moment(createPatientData.items.data.insurance[0].secondary[i].insuranceDetails.birthDate).format('YYYYMMDD'):"";      
  }
 
  } 
  console.log(JSON.stringify(createPatientData.items));  
    setInputPatientData(createPatientData.items.data); 
    if (createPatientData.items.message.code === "MHC - 0200") {    
        alert(createPatientData.items.message.description);   
    
       
        setTimeout(() => {  
          window.location.href = "/MettlerPatientDetails";
          setSpinner(false);
        }, (1000)); 
        setCreatePatientDataLoaded(true); 
       
    } else {
  
      alert(createPatientData.items.message.description);     
      setTimeout(() => {
        setCreatePatientDataLoaded(false);
        setSpinner(false);
      }, (1000));    
    }  
  
  }
  
  if (!createPatientData && createPatientData.isFormSubmit) {
    setTimeout(() => {
      setCreatePatientDataLoaded(false);
      setSpinner(false);
    }, (1000));
  }
  


  const [isUpdateCreatepatientLoaded, setUpdateCreatepatientLoaded] = useState(false);

  if (!isUpdateCreatepatientLoaded && !updatePatientData.isLoading) { 
    updatePatientData.items.data.birthDate = (updatePatientData.items.data.birthDate!==null && updatePatientData.items.data.birthDate!=="") ?moment(updatePatientData.items.data.birthDate).format('YYYYMMDD'):"";
    updatePatientData.items.data.startDate = (updatePatientData.items.data.startDate && updatePatientData.items.data.startDate!=="") ?moment(updatePatientData.items.data.startDate).format('YYYYMMDD'):"";
    updatePatientData.items.data.endDate = (updatePatientData.items.data.endDate !==null && updatePatientData.items.data.endDate !=="") ?moment(updatePatientData.items.data.endDate).format('YYYYMMDD'):"";
    updatePatientData.items.data.dateDeceased = (updatePatientData.items.data.dateDeceased!==null && updatePatientData.items.data.dateDeceased!=="")?moment(updatePatientData.items.data.dateDeceased).format('YYYYMMDD'):"";
    updatePatientData.items.data.financialReviewDate = ( updatePatientData.items.data.financialReviewDate!==null &&  updatePatientData.items.data.financialReviewDate!=="") ?moment( updatePatientData.items.data.financialReviewDate).format('YYYYMMDD'):"";        
    updatePatientData.items.data.effectivedate =(updatePatientData.items.data.effectivedate!==null && updatePatientData.items.data.effectivedate!=="") ?moment(updatePatientData.items.data.effectivedate).format('YYYYMMDD'):"";
    updatePatientData.items.data.birthDate = moment(updatePatientData.items.data.birthDate).format('YYYYMMDD'); 
    if(updatePatientData.items.data.insurance[0].secondary.length>0){

      for(var i=0;i<updatePatientData.items.data.insurance[0].secondary.length;i++){
        updatePatientData.items.data.insurance[0].secondary[i].effectivedate = (updatePatientData.items.data.insurance[0].secondary[i].effectivedate!==null && updatePatientData.items.data.insurance[0].secondary[i].effectivedate!=="") ?moment(updatePatientData.items.data.insurance[0].secondary[i].effectivedate).format('YYYYMMDD'):"";
        updatePatientData.items.data.insurance[0].secondary[i].birthDate = (updatePatientData.items.data.insurance[0].secondary[i].birthDate!==null && updatePatientData.items.data.insurance[0].secondary[i].birthDate!=="") ?moment(updatePatientData.items.data.insurance[0].secondary[i].birthDate).format('YYYYMMDD'):"";      
  }
 
  }
    setInputPatientData(updatePatientData.items.data);    
    if (updatePatientData.items.message.code === "MHC - 0200") {
      alert(updatePatientData.items.message.description);  
      setTimeout(() => {
        window.location.href = "/MettlerPatientDetails";
        setSpinner(false);
      }, (1000));   
      setUpdateCreatepatientLoaded(true);  
     
    } else {
      alert(updatePatientData.items.message.description);   
      setTimeout(() => {
        setUpdateCreatepatientLoaded(false);
        setSpinner(false);
      }, (1000));
    }
  
}
if (!updatePatientData && updatePatientData.isFormSubmit) {

    setTimeout(() => {
      setUpdateCreatepatientLoaded(false);
      setSpinner(false);
    }, (1000));
}



  const [isValid, setValid] = useState(false);


  const handleImageChange = (e) =>{    
    const reader = new FileReader();
    reader.onloadend = () =>{
      inputPatientData.basicDetails[0].profile = reader.result.toString()
      setInputPatientData({...inputPatientData});
      
    }
    reader.readAsDataURL(e.target.files[0]);
  }
  
//  console.log(inputPatientData.basicDetails[0].profile);

  function handlePageSave() {
   
    inputPatientData.basicDetails[0].ssn =  inputPatientData.basicDetails[0].ssn.replace(/[^\w\s]/gi, '');       
    inputPatientData.userType = "Patient";
    inputPatientData.basicDetails[0].birthDate = (inputPatientData.basicDetails[0].birthDate!==null && inputPatientData.basicDetails[0].birthDate!=="") ?moment(inputPatientData.basicDetails[0].birthDate).format('YYYYMMDD'):"";
        inputPatientData.contact[0].additionalAddress[0].startDate = (inputPatientData.contact[0].additionalAddress[0].startDate && inputPatientData.contact[0].additionalAddress[0].startDate!=="") ?moment(inputPatientData.contact[0].additionalAddress[0].startDate).format('YYYYMMDD'):"";
        inputPatientData.contact[0].additionalAddress[0].endDate = (inputPatientData.contact[0].additionalAddress[0].endDate !==null && inputPatientData.contact[0].additionalAddress[0].endDate !=="") ?moment(inputPatientData.contact[0].additionalAddress[0].endDate).format('YYYYMMDD'):"";
        inputPatientData.misc[0].dateDeceased = (inputPatientData.misc[0].dateDeceased!==null && inputPatientData.misc[0].dateDeceased!=="")?moment(inputPatientData.misc[0].dateDeceased).format('YYYYMMDD'):"";
        inputPatientData.stats[0].financialReviewDate = (inputPatientData.stats[0].financialReviewDate!==null && inputPatientData.stats[0].financialReviewDate!=="") ?moment(inputPatientData.stats[0].financialReviewDate).format('YYYYMMDD'):"";        
        inputPatientData.insurance[0].primary[0].effectivedate =(inputPatientData.insurance[0].primary[0].effectivedate!==null && inputPatientData.insurance[0].primary[0].effectivedate!=="") ?moment(inputPatientData.insurance[0].primary[0].effectivedate).format('YYYYMMDD'):"";
        inputPatientData.insurance[0].primary[0].birthDate = moment(inputPatientData.insurance[0].primary[0].birthDate).format('YYYYMMDD');
       
        if(inputPatientData.insurance[0].secondary.length>0){

          for(var i=0;i<inputPatientData.insurance[0].secondary.length;i++){
        inputPatientData.insurance[0].secondary[i].insuranceDetails.effectivedate = (inputPatientData.insurance[0].secondary[i].insuranceDetails.effectivedate!==null && inputPatientData.insurance[0].secondary[i].insuranceDetails.effectivedate!=="") ?moment(inputPatientData.insurance[0].secondary[i].insuranceDetails.effectivedate).format('YYYYMMDD'):"";
        inputPatientData.insurance[0].secondary[i].insuranceDetails.birthDate = (inputPatientData.insurance[0].secondary[i].insuranceDetails.birthDate!==null && inputPatientData.insurance[0].secondary[i].insuranceDetails.birthDate!=="") ?moment(inputPatientData.insurance[0].secondary[i].insuranceDetails.birthDate).format('YYYYMMDD'):"";      
      }
     
      }

      //console.log(JSON.stringify(inputPatientData));
    
    if(inputPatientData.basicDetails[0].name[0].given === "" || inputPatientData.basicDetails[0].name[0].family === "" || inputPatientData.email === "" || inputPatientData.basicDetails[0].ssn === "" || inputPatientData.basicDetails[0].birthDate === "" || inputPatientData.basicDetails[0].birthDate === null || inputPatientData.userType === ""){
      alert("Please Enter required data");
    }
    else if (inputPatientData.id !== "") {
      dispatch(updatePatientById(inputPatientData));       
    } else {
      inputPatientData.organization = organizationId; 
      
      dispatch(createPatient(inputPatientData));    
    }


  }

  const [isVisible, setIsVisible] = useState(false);
  const containerStyle = {
    left: isVisible ? '486px' : '',
  };
  const toggleVisibility = () => {
    setIsVisible(true);
    if (isVisible) {
      setIsVisible(false);
    }

  }
  const [
    selectOutlinedDateTimePickerValue,
    setSelectOutlinedDateTimePickerValue,
  ] = useState<string | null>(null);
  
  return (
    <div style={{ display: 'flex', position: 'relative', left: '-56px', top: '-60px', background: 'var(--color-gray-100)', marginRight: '-56px' }}>
         {spinner &&
                (<div className='overlay-content'>
                    <div className='wrapper'>
                        <img alt="" src={loaddingFile} style={{ position: 'absolute', width: '100%', height:'-webkit-fill-available', zIndex: 2, opacity: '0.5' }} />
                    </div>
                </div>
                )}
      
      <a onClick={toggleVisibility} style={{ position: "fixed", left: "62px", top: "88px" }}> <img style={{ height: '36px', width: "38px" }} alt="" src={plusImage} /></a>
      {isVisible && (
        <div style={{ position: "fixed", top: "132px", left: "76px", display: "flex", flexDirection: "column", gap: "31px", fontWeight: "bold" }}>

          <div>Create Patient</div>
          <div>Add Patients</div>
          <div>Admit Patient</div>
          <div>Discharge Patients</div>
          <div>Activate Patient</div>

        </div>
      )}

      <div style={{ position: 'fixed', top: '85px', left: isVisible ? "248px" : "120px" }}>
        <div className="newLine-border" />
        <a style={{ cursor: 'pointer' }} onClick={() => handleChangeEvent(1)}>
          <div><img style={{ width: '24px', height: '24px' }} src={(patientSelectId > 1 && patientSelectId < 10) ? leftClick : patientSelectId === 1 ? DarkVectorImage : RoundVectorImage}></img>
            {(patientSelectId > 1 && patientSelectId < 10) ? <span></span> : <span style={{ fontSize: '12px', position: 'relative', left: '-14px', top: '0.75px', color: patientSelectId === 1 ? 'white' : 'var(--default, #3F3F46)' }} className="createPatient-stepLabel">1</span>}
            <span style={{ position: 'relative', left: '7.75px', top: '1px' }} className="createPatient-stepLabel">Basic Details</span>
            {(patientSelectId === 1 ? <img style={{ width: '5px', height: '26px', position: 'relative',left:isVisible?'74px':"74px" }} src={selectorImage}></img>
              : <span></span>)}
          </div>
        </a>
        <a style={{ cursor: 'pointer' }} onClick={() => handleChangeEvent(2)}>
          <div style={{ position: 'relative', top: '20px' }}>
            <img style={{ width: '24px', height: '24px' }} src={(patientSelectId > 2 && patientSelectId < 10) ? leftClick : patientSelectId === 2 ? DarkVectorImage : RoundVectorImage}></img>
            {(patientSelectId > 2 && patientSelectId < 10) ? <span></span> : <span style={{ fontSize: '12px', position: 'relative', left: '-15px', top: '0.5px', color: patientSelectId === 2 ? 'white' : 'var(--default, #3F3F46)' }} className="createPatient-stepLabel">2</span>}
            <span style={{ position: 'relative', left: '5.25px', top: '1px' }} className="createPatient-stepLabel">Contact</span>
            {(patientSelectId === 2 ? <img style={{ width: '5px', height: '26px', position: 'relative', left:isVisible?'107px':"107px" }} src={selectorImage}></img>
              : <span></span>)}
          </div>
        </a>
        <a style={{ cursor: 'pointer' }} onClick={() => handleChangeEvent(3)}>
          <div style={{ position: 'relative', top: '40px' }}>
            <img style={{ width: '24px', height: '24px' }} src={(patientSelectId > 3 && patientSelectId < 10) ? leftClick : patientSelectId === 3 ? DarkVectorImage : RoundVectorImage}></img>
            {(patientSelectId > 3 && patientSelectId < 10) ? <span></span> : <span style={{ fontSize: '12px', position: 'relative', left: '-15.2px', top: '0.75px', color: patientSelectId === 3 ? 'white' : 'var(--default, #3F3F46)' }} className="createPatient-stepLabel">3</span>}
            <span style={{ position: 'relative', left: '5.25px', top: '1px' }} className="createPatient-stepLabel">Employer</span>
            {(patientSelectId === 3 ? <img style={{ width: '5px', height: '26px', position: 'relative', left:isVisible?'96px':"96px"  }} src={selectorImage}></img>
              : <span></span>)}
          </div>
        </a>
        <a style={{ cursor: 'pointer' }} onClick={() => handleChangeEvent(4)}>
          <div style={{ position: 'relative', top: '60px' }}>
            <img style={{ width: '24px', height: '24px' }} src={(patientSelectId > 4 && patientSelectId < 10) ? leftClick : patientSelectId === 4 ? DarkVectorImage : RoundVectorImage}></img>
            {(patientSelectId > 4 && patientSelectId < 10) ? <span></span> : <span style={{ fontSize: '12px', position: 'relative', left: '-16px', top: '0.75px', color: patientSelectId === 4 ? 'white' : 'var(--default, #3F3F46)' }} className="createPatient-stepLabel">4</span>}
            <span style={{ position: 'relative', left: '5.25px', top: '1px' }} className="createPatient-stepLabel">Guardian</span>
            <img style={{ width: '16px', height: '16px', position: 'relative', left: '10px' }} src={wifiImage}></img>
            {(patientSelectId === 4 ? <img style={{ width: '5px', height: '26px', position: 'relative',  left:isVisible?'80px':"80px"  }} src={selectorImage}></img>
              : <span></span>)}
          </div>
        </a>
        <a style={{ cursor: 'pointer' }} onClick={() => handleChangeEvent(5)}>
          <div style={{ position: 'relative', top: '80px' }}>
            <img style={{ width: '24px', height: '24px' }} src={(patientSelectId > 5 && patientSelectId < 10) ? leftClick : patientSelectId === 5 ? DarkVectorImage : RoundVectorImage}></img>
            {(patientSelectId > 5 && patientSelectId < 10) ? <span></span> : <span style={{ fontSize: '12px', position: 'relative', left: '-16px', top: '0.75px', color: patientSelectId === 5 ? 'white' : 'var(--default, #3F3F46)' }} className="createPatient-stepLabel">5</span>}
            <span style={{ position: 'relative', left: '5.25px', top: '1px' }} className="createPatient-stepLabel">Misc</span>
            {(patientSelectId === 5 ? <img style={{ width: '5px', height: '26px', position: 'relative', left:isVisible?'69.4px':"69.4px" }} src={selectorImage}></img>
              : <span></span>)}
          </div>
        </a>
        <a style={{ cursor: 'pointer' }} onClick={() => handleChangeEvent(6)}>
          <div style={{ position: 'relative', top: '100px' }}>
            <img style={{ width: '24px', height: '24px' }} src={(patientSelectId > 6 && patientSelectId < 10) ? leftClick : patientSelectId === 6 ? DarkVectorImage : RoundVectorImage}></img>
            {(patientSelectId > 6 && patientSelectId < 10) ? <span></span> : <span style={{ fontSize: '12px', position: 'relative', left: '-16px', top: '0.75px', color: patientSelectId === 6 ? 'white' : 'var(--default, #3F3F46)' }} className="createPatient-stepLabel">6</span>}
            <span style={{ position: 'relative', left: '5.25px', top: '1px' }} className="createPatient-stepLabel">Stats</span>
            {(patientSelectId === 6 ? <img style={{ width: '5px', height: '26px', position: 'relative', left:isVisible?"123.5px":"123.5px" }} src={selectorImage}></img>
              : <span></span>)}
          </div>
        </a>
        <a style={{ cursor: 'pointer' }} onClick={() => handleChangeEvent(7)}>
          <div style={{ position: 'relative', top: '120px' }}>
            <img style={{ width: '24px', height: '24px' }} src={(patientSelectId > 7 && patientSelectId < 10) ? leftClick : patientSelectId === 7 ? DarkVectorImage : RoundVectorImage}></img>
            {(patientSelectId > 7 && patientSelectId < 10) ? <span></span> : <span style={{ fontSize: '12px', position: 'relative', left: '-14.8px', top: '0.75px', color: patientSelectId === 7 ? 'white' : 'var(--default, #3F3F46)' }} className="createPatient-stepLabel">7</span>}
            <span style={{ position: 'relative', left: '5.25px', top: '1px' }} className="createPatient-stepLabel">Insurance</span>
            {(patientSelectId === 7 ? <img style={{ width: '5px', height: '26px', position: 'relative', left: isVisible ? "89.2px" : '89.2px' }} src={selectorImage}></img>
              : <span ></span>)}
          </div>
        </a>
        <a style={{ cursor: 'pointer' }} onClick={() => handleChangeEvent(8)}>
          <div style={{ position: 'relative', top: '140px' }}>
            <img style={{ width: '24px', height: '24px' }} src={(patientSelectId > 8 && patientSelectId < 10) ? leftClick : patientSelectId === 8 ? DarkVectorImage : RoundVectorImage}></img>
            {(patientSelectId > 8 && patientSelectId < 10) ? <span></span> : <span style={{ fontSize: '12px', position: 'relative', left: '-16px', top: '0.75px', color: patientSelectId === 8 ? 'white' : 'var(--default, #3F3F46)' }} className="createPatient-stepLabel">8</span>}
            <span style={{ position: 'relative', left: isVisible ? "0.25px" : '5.25px', top: '1px' }} className="createPatient-stepLabel">Family Health History </span>
            {(patientSelectId === 8 ? <img style={{ width: '5px', height: '26px', position: 'relative', left: isVisible ? "4px" : '11px' }} src={selectorImage}></img>
              : <span></span>)}
          </div>
        </a>
        <a style={{ cursor: 'pointer' }} onClick={() => handleChangeEvent(9)}>
          <div style={{ position: 'relative', top: '160px' }}>
            <img style={{ width: '24px', height: '24px' }} src={patientSelectId === 9 ? DarkVectorImage : RoundVectorImage}></img>
            <span style={{ fontSize: '12px', position: 'relative', left: '-16px', top: '0.75px', color: patientSelectId === 9 ? 'white' : 'var(--default, #3F3F46)' }} className="createPatient-stepLabel">9</span>
            <span style={{ position: 'relative', left: '5.25px', top: '1px' }} className="createPatient-stepLabel">Social History</span>
            {(patientSelectId === 9 ? <img style={{ width: '5px', height: '26px', position: 'relative', left: isVisible ? '61px' : "59px" }} src={selectorImage}></img>
              : <span></span>)}
          </div>
        </a>
      </div>
      {(patientSelectId === 1 || patientSelectId === 0 ?
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div className="add-patient-basic-details1">
       
            <div style={{ left: isVisible ? "452px" : "337px", }} className="add-patient-basic-details-child7"  />
            <div style={{ left: isVisible ? "487px" : "385px" }} className="basicDetailsForm-fields38">
              <TextField
                id="patientSsn" value={inputPatientData.basicDetails[0].ssn} onChange={handleInputChange}
                className="destination-name-input43"
                color="primary"
                variant="outlined"
                type="text"
                label="SSN"
                placeholder="Placeholder"
                size="medium"
                margin="none"
              />
              <TextField
                id="patientLicense" value={inputPatientData.basicDetails[0].licenseId} onChange={handleInputChange}
                className="destination-name-input43"
                color="primary"
                variant="outlined"
                type="text"
                label="License/ID"
                placeholder="Placeholder"
                size="medium"
                margin="none"
              />
              <FormControl className="name-input36" variant="outlined">
                <InputLabel color="primary">Marital Status</InputLabel>
                <Select color="primary" size="medium" label="Marital Status" name="patientMaritalStatus" value={inputPatientData.basicDetails[0].maritalStatus} onChange={handleInputChange}>
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Married">Married</MenuItem>
                  <MenuItem value="Divorced">Divorced</MenuItem>
                  <MenuItem value="Widowed">Widowed</MenuItem>
                </Select>
                <FormHelperText />
              </FormControl>
            </div>
            <div style={{ left: isVisible ? "451.5px" : "337.5px" }} className="add-patient-basic-details-child9" />
            <div style={{ left: isVisible ? "466px" : "358px" }} className="basic-details1">Basic Details</div>
            <div style={{ left: isVisible ? "487px" : "384px" }} className="basicDetailsForm-fields39">
              <div className="name-input37">
                <TextField
                  id="patientEmail" value={inputPatientData.email} onChange={handleInputChange}
                  className="input1"
                  color="primary"
                  variant="outlined"
                  type="text"
                  label="Email address"
                  placeholder="Placeholder"
                  size="medium"
                  margin="none"
                />
              </div>
              <div className="selectoutlined">
                <DatePicker
                  label="D.O.B."
                  value={inputPatientData.basicDetails[0].birthDate}
                  onChange={(newValue: any) => {
                    inputPatientData.basicDetails[0].birthDate = newValue;
                    setInputPatientData({ ...inputPatientData });
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
            </div>
            <FormControl style={{ left: isVisible ? "485px" : "381px" }}
              className="basicDetailsForm-fields40"
              sx={{ width: 487 }}
              variant="outlined"
            >
              <InputLabel color="primary">Title</InputLabel>
              <Select color="primary" size="medium" label="Type" name="patientType" value={inputPatientData.basicDetails[0].coding[0].code} onChange={handleInputChange}>
                <MenuItem value="Financial Resources">Financial Resources</MenuItem>
                <MenuItem value="Health Resources">Health Resources</MenuItem>
              </Select>
              <FormHelperText />
            </FormControl>
            <div className="add-patient-basic-details-inner3">
              <div className="cancel-parent1">
                <SecondaryButton label="Cancel" secondaryButtonCursor="unset" />
                <div className="previous1">
                  <img className="bg-icon3" alt="" src={previousImage} />
                  <div className="label12">Previous</div>
                </div>
                <PrimaryButton
                  label="Next"
                  primaryButtonCursor="pointer"
                  onNextContainerClick={() => {
                    setPatientSelectId(patientSelectId = 2);
                    window.scrollTo(0, 0)
                  }}
                />
              </div>
            </div>

            <div style={{ left: isVisible ? "487px" : "380px" }} className="basicDetailsForm-fields41">
              <TextField
                id="patientFirstName" value={inputPatientData.basicDetails[0].name[0].given} onChange={handleInputChange}
                className="destination-name-input43"
                color="primary"
                variant="outlined"
                type="text"
                label={
                  <span>

                    First Name<span style={{ color: 'red' }}>*</span>

                  </span>

                }
                placeholder="Placeholder"
                size="medium"
                margin="none"

              />
              <TextField
                id="patientMiddleName" value={inputPatientData.basicDetails[0].name[0].use} onChange={handleInputChange}
                className="destination-name-input43"
                color="primary"
                variant="outlined"
                type="text"
                label="Middle Name"
                placeholder="Placeholder"
                size="medium"
                margin="none"
              />
              <TextField
                id="patientFamilyName" value={inputPatientData.basicDetails[0].name[0].family} onChange={handleInputChange}
                className="destination-name-input43"
                color="primary"
                variant="outlined"
                type="text"
                label={
                  <span>

                    Last Name<span style={{ color: 'red' }} >*</span>

                  </span>

                }
                placeholder="Placeholder"
                size="medium"
                margin="none"

              />
            </div>
            <div  onClick={handleProfileChange} hidden={inputPatientData.basicDetails[0].profile !== null && inputPatientData.basicDetails[0].profile !== "" && inputPatientData.basicDetails[0].profile !== "string"} style={{ left: isVisible ? "unset" : "unset",width:isVisible ?"182px":"287px",top:isVisible?"228px":"226px" }} className="vector-group">
               <img className="frame-child4" alt="" src={uploadImage} />          
              <Button style={{whiteSpace:'nowrap'}}
                className="upload-profile-pic1"
                variant="text" 
                color="primary"
                startIcon={<Icon>attachment_sharp</Icon>}
              >
                Upload Profile Pic 
              </Button> 

            </div>
            <div  hidden={inputPatientData.basicDetails[0].profile === null || inputPatientData.basicDetails[0].profile === "" || inputPatientData.basicDetails[0].profile === "string"}  style={{ left: isVisible ? "unset" : "unset",width:isVisible ?"182px":"287px",top:isVisible?"196px":"226px" }} className="vector-group">
            <div style={{position:'absolute',left:"18px",top:isVisible ?"-14px":"-46px"}}><img style={{height:'120px',width:'120px',borderRadius:"60px"}} src={inputPatientData.basicDetails[0].profile} onClick={handleProfileChange} /><input className="vector-group" style={{position:'absolute',top:'12px',display:'none'}} type="file"  ref={hiddenFileInput} onChange={handleImageChange} /></div>

            </div>
            <div style={{ left: isVisible ? "487px" : "385px" }} className="basicDetailsForm-fields42">

              <div className="frame-parent28">

                <div className="check-boxgary-frame">
                  <FormControlLabel

                    label="Declined to Specify"
                    labelPlacement="end"
                    control={<Checkbox color="primary" size="medium" value={Gendercreatepation} id="checkboxgenderselection" />}
                    onChange={handleInputChange}
                  />
                  <CheckBoxgary
                    checkBoxgaryWidth="unset"
                    checkBoxgaryHeight="unset"
                  />
                </div>

                <FormControl className="name-input41" variant="outlined">
                  <InputLabel color="primary">Gender</InputLabel>
                  <Select style={{ background: Gendercreatepation ? 'lightgrey' : '' }} color="primary" size="medium" label="Gender" name="patientGender" disabled={Gendercreatepation} value={inputPatientData.basicDetails[0].gender} onChange={handleInputChange}>
                    <MenuItem value="">Select</MenuItem>
                    {newGenderDropDown}
                  </Select>
                  <FormHelperText />
                </FormControl>
              </div>
              <div className="frame-parent28">
                <div className="check-boxgary-frame">
                  <FormControlLabel

                    label="Declined to Specify"
                    labelPlacement="end"
                    control={<Checkbox color="primary" size="medium" value={SexualOrientation} id="checkboxsexualorientation" />}
                    onChange={handleInputChange}
                  />
                  <CheckBoxgary
                    checkBoxgaryWidth="unset"
                    checkBoxgaryHeight="unset"
                  />
                </div>
                <FormControl className="name-input41" variant="outlined">
                  <InputLabel color="primary">Sexual Orientation</InputLabel>
                  <Select
                    style={{ background: SexualOrientation ? 'lightgrey' : '' }}
                    disabled={SexualOrientation}
                    color="primary"
                    size="medium"
                    label="Sexual Orientation"
                    name="patientSexual" value={inputPatientData.basicDetails[0].sexualOrientation} onChange={handleInputChange}>
                    <MenuItem value="Heterosexual">Heterosexual</MenuItem>
                    <MenuItem value="Bisexual">Bisexual</MenuItem>
                    <MenuItem value="Homosexual">Homosexual</MenuItem>
                    <MenuItem value="Pansexual">Pansexual</MenuItem>
                    <MenuItem value="Asexual">Asexual</MenuItem>
                  </Select>
                  <FormHelperText />
                </FormControl>
              </div>
            </div>

          </div>
          <div style={{ left: isVisible ? "216.5px" : "" }} className="add-patient-basic-details-child10" />
        </LocalizationProvider> : patientSelectId === 2 ?
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="add-patient-contact">
              <div className="add-patient-contact-child1"style={{left:isVisible?'457px':"" }} />
              <div className="contactForm-fields32"style={{ left:isVisible? '495.5px':"" }}>
                <FormControl className="frame-formcontrollabel" variant="outlined">
                  <InputLabel color="primary">Country</InputLabel>
                  <Select color="primary" size="medium" label="Country" name="patientCountry" value={inputPatientData.contact[0].address[0].country} onChange={handleInputChange}>
                    <MenuItem value="">Select</MenuItem>
                    {newCountryDropDown}
                  </Select>
                  <FormHelperText />
                </FormControl>
                <TextField
                  id="patientMotherName" value={inputPatientData.contact[0].motherName} onChange={handleInputChange}
                  className="name-input30"
                  color="primary"
                  variant="outlined"
                  type="text"
                  label="Mother’s Name"
                  placeholder="Placeholder"
                  size="medium"
                  margin="none"
                />
              </div>
              <div className="contactForm-fields33"style={{ left:isVisible? '495.5px':"" }}>
                <TextField
                  id="patientCity" value={inputPatientData.contact[0].address[0].city} onChange={handleInputChange}
                  className="name-input30"
                  color="primary"
                  variant="outlined"
                  type="text"
                  label="City"
                  placeholder="Placeholder"
                  size="medium"
                  margin="none"
                />
                <TextField
                  id="patientState" value={inputPatientData.contact[0].address[0].state} onChange={handleInputChange}
                  className="name-input30"
                  color="primary"
                  variant="outlined"
                  type="text"
                  label="State/Provide"
                  placeholder="Placeholder"
                  size="medium"
                  margin="none"
                />
                <TextField
                  id="patientPostalCode" value={inputPatientData.contact[0].address[0].postalCode} onChange={handleInputChange}
                  className="name-input30"
                  color="primary"
                  variant="outlined"
                  type="text"
                  label="Zip/Postal Code"
                  placeholder="Placeholder"
                  size="medium"
                  margin="none"
                />
              </div>
              <div className="contactForm-fields34"style={{ left:isVisible? '495px':"" }}>
                <TextField
                  id="patientAddressLine1" value={inputPatientData.contact[0].address[0].addressLine1} onChange={handleInputChange}
                  className="name-input30"
                  color="primary"
                  variant="outlined"
                  type="text"
                  label="Address Line 1"
                  placeholder="Placeholder"
                  size="medium"
                  margin="none"
                />
                <TextField
                  id="patientAddressLine2" value={inputPatientData.contact[0].address[0].addressLine2} onChange={handleInputChange}
                  className="name-input30"
                  color="primary"
                  variant="outlined"
                  type="text"
                  label="Address Line 2"
                  placeholder="Placeholder"
                  size="medium"
                  margin="none"
                />
              </div>
              <div className="add-patient-contact-child3" style={{ left:isVisible? '456.5px':"" }}/>
              <div className="contact" style={{ left:isVisible?'475px':"414px" }}>Contact</div>
              <div className="add-patient-contact-child4" style={{ left:isVisible? '222.5px':"" }}/>
              <div className="contactForm-fields35"style={{ left:isVisible? '495.5px':"" }}>
                <TextField
                  id="patientContactFirstName" value={inputPatientData.contact[0].firstName} onChange={handleInputChange}
                  className="name-input30"
                  color="primary"
                  variant="outlined"
                  type="text"
                  label={
                    <span>

                      First Name<span style={{ color: 'red' }}>*</span>

                    </span>

                  }
                  placeholder="Placeholder"
                  size="medium"
                  margin="none"

                />
                <TextField
                  id="patientContactMiddleName" value={inputPatientData.contact[0].lastName} onChange={handleInputChange}
                  className="name-input30"
                  color="primary"
                  variant="outlined"
                  type="text"
                  label="Middle Name"
                  placeholder="Placeholder"
                  size="medium"
                  margin="none"
                />
              </div>
              <div className="contactForm-fields36"style={{ left:isVisible? '495.5px':"" }}>
                <TextField
                  id="patientContactEmail" value={inputPatientData.contact[0].contactEmail} onChange={handleInputChange}
                  className="name-input30"
                  color="primary"
                  variant="outlined"
                  type="email"
                  label={
                    <span>

                      Contact Email ID<span style={{ color: 'red' }}>*</span>

                    </span>

                  }
                  placeholder="Placeholder"
                  size="medium"
                  margin="none"

                />
                <TextField
                  id="patientTrustedEmail" value={inputPatientData.contact[0].trustedEmail} onChange={handleInputChange}
                  className="name-input30"
                  color="primary"
                  variant="outlined"
                  type="email"
                  label="Trusted Email ID"
                  placeholder="Placeholder"
                  size="medium"
                  margin="none"
                />
              </div>
              <div className="address-type" style={{ left:isVisible? '495.5px':"" }}>Address Type</div>
              <RadioGroup name="patientAddressType" value={inputPatientData.contact[0].additionalAddress[0].addressType} onChange={handleInputChange}
                row>
                <div className="frame-parent26"style={{ left:isVisible? '495.5px':"" }}>
                  <FormControlLabel
                    className="frame-formcontrollabel"
                    label="Postal" value="Postal"
                    labelPlacement="end"
                    control={<Radio color="primary" size="medium" />}
                  />
                  <FormControlLabel
                    className="frame-formcontrollabel"
                    label="Physical" value="Physical"
                    labelPlacement="end"
                    control={<Radio color="primary" size="medium" />}
                  />
                  <FormControlLabel
                    className="frame-formcontrollabel"
                    label={`Postal & Physical`}
                    labelPlacement="end" value="Both"
                    control={<Radio color="primary" size="medium" />}
                  />
                </div>
              </RadioGroup>
              <div className="contactForm-fields37"style={{ left:isVisible? '495.5px':"" }}>
                <div className="selectoutlined3">
                  <DatePicker
                    label="Start Date"
                    value={inputPatientData.contact[0].additionalAddress[0].startDate}
                    onChange={(newValue) => {
                      inputPatientData.contact[0].additionalAddress[0].startDate = newValue;
                      setInputPatientData({ ...inputPatientData });
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
                <div className="selectoutlined3">
                  <DatePicker
                    label="End Date"
                    value={inputPatientData.contact[0].additionalAddress[0].endDate}
                    onChange={(newValue) => {
                      inputPatientData.contact[0].additionalAddress[0].endDate = newValue;
                      setInputPatientData({ ...inputPatientData });
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
              <FooterSection
                propHeight="6.67%"
                propTop="93.44%"
                onPreviousContainerClick={() => { setPatientSelectId(patientSelectId = 1); window.scrollTo(0, 0) }}

                onNextContainerClick={() => { setPatientSelectId(patientSelectId = 3); window.scrollTo(0, 0) }}
              />
            </div>
          </LocalizationProvider> : patientSelectId === 3 ?
            <div className="add-patient-employer">
              <div className="add-patient-employer-child1" style={{left:isVisible?'459px':""  }} />
              <div className="employerForm-fields28" style={{left:isVisible?'493px':""  }}>
                <TextField
                  id="patientUnassignedUSA" value={inputPatientData.employer[0].unassignedUSA} onChange={handleInputChange}
                  className="destination-name-input35"
                  color="primary"
                  variant="outlined"
                  type="text"
                  label="Assigned USA"
                  placeholder="Placeholder"
                  size="medium"
                  margin="none"
                />
                <FormControl className="name-input26" variant="outlined">
                  <InputLabel color="primary">Industry</InputLabel>
                  <Select color="primary" size="medium" label="Industry" name="patientIndustry" value={inputPatientData.employer[0].industry} onChange={handleInputChange}>
                    <MenuItem>select</MenuItem>
                    {newIndustryDropDown}


                  </Select>
                  <FormHelperText />
                </FormControl>
              </div>
              <div className="employerForm-fields29"  style={{left:isVisible?'493px':""  }}>
                <TextField
                  id="patientEmployerAddressLine1" value={inputPatientData.employer[0].addressLine1} onChange={handleInputChange}
                  className="destination-name-input35"
                  color="primary"
                  variant="outlined"
                  type="text"
                  label="Employer Address Line 1"
                  placeholder="Placeholder"
                  size="medium"
                  margin="none"
                />
                <TextField
                  id="patientEmployerAddressLine2" value={inputPatientData.employer[0].addressLine2} onChange={handleInputChange}
                  className="destination-name-input35"
                  color="primary"
                  variant="outlined"
                  type="text"
                  label="Employer Address Line 2"
                  placeholder="Placeholder"
                  size="medium"
                  margin="none"
                />
              </div>
              <div className="employerForm-fields30" style={{left:isVisible?'493px':""  }}>
                <TextField
                  id="patientEmployerCity" value={inputPatientData.employer[0].city} onChange={handleInputChange}
                  className="destination-name-input35"
                  color="primary"
                  variant="outlined"
                  type="text"
                  label="City"
                  placeholder="Placeholder"
                  size="medium"
                  margin="none"
                />
                <TextField
                  id="patientEmployerState" value={inputPatientData.employer[0].state} onChange={handleInputChange}
                  className="destination-name-input35"
                  color="primary"
                  variant="outlined"
                  type="text"
                  label="State/Provide"
                  placeholder="Placeholder"
                  size="medium"
                  margin="none"
                />
                <TextField
                  id="patientEmployerPostalCode" value={inputPatientData.employer[0].postalCode} onChange={handleInputChange}
                  className="destination-name-input35"
                  color="primary"
                  variant="outlined"
                  type="text"
                  label="Zip/Postal Code"
                  placeholder="Placeholder"
                  size="medium"
                  margin="none"
                />
              </div>
              <FormControl
                className="employerForm-fields31"
                style={{left:isVisible?'494px':""  }}
                sx={{ width: 735 }}
                variant="outlined"
              >
                <InputLabel color="primary">Occupation</InputLabel>
                <Select color="primary" size="medium" label="Occupation" name="patientOccupation" value={inputPatientData.employer[0].occupation} onChange={handleInputChange}>
                  <MenuItem value="">select</MenuItem>
                  {newOccupationDropDown}

                </Select>
                <FormHelperText />
              </FormControl>
              <div className="add-patient-employer-child3"style={{left:isVisible?'459.5px':""  }} />
              <div className="employer" style={{left:isVisible?'476px':""  }}>Employer</div>
              <div className="add-patient-employer-child4"style={{left:isVisible?'226.5px':""  }} />
              <FooterSection
                propHeight="6.67%"
                propTop="93.44%"
                onPreviousContainerClick={() => { setPatientSelectId(patientSelectId = 2); window.scrollTo(0, 0) }}
                onNextContainerClick={() => { setPatientSelectId(patientSelectId = 4); window.scrollTo(0, 0) }}
              />
            </div> : patientSelectId === 4 ?
              <div className="add-patient-guardian">
                <div className="add-patient-guardian-child1"  style={{left:isVisible?"453px":""}}/>
                <div className="guardianForm-fields25"style={{left:isVisible?"490px":""}}>
                  <TextField
                    id="patientGuardianWorkPhone" value={inputPatientData.guardian[0].workPhone} onChange={handleInputChange}
                    className="destination-name-input32"
                    color="primary"
                    variant="outlined"
                    type="text"
                    label="Work Phone"
                    placeholder="Placeholder"
                    size="medium"
                  />
                  <TextField
                    id="patientGuardianEmail" value={inputPatientData.guardian[0].email} onChange={handleInputChange}
                    className="destination-name-input32"
                    color="primary"
                    variant="outlined"
                    type="email"
                    label="Trusted Email"
                    placeholder="Placeholder"
                    size="medium"
                    margin="none"
                  />
                </div>
                <div className="guardianForm-fields26"style={{left:isVisible?"490px":""}}>
                  <div className="guardianForm-fields-26">
                    <FormControlLabel

                      label="Declined to Specify"
                      labelPlacement="end"
                      control={<Checkbox color="primary" size="medium" value={Gendergardian} id="checkboxgardiangender" />}
                      onChange={handleInputChange}
                    />
                    <FormControl className="destination-name-input33" variant="outlined">
                      <InputLabel color="primary">Gender</InputLabel>
                      <Select style={{ background: Gendergardian ? 'lightgrey' : '' }} color="primary" size="medium" label="Gender" disabled={Gendergardian} name="patientGuardianGender" value={inputPatientData.guardian[0].gender} onChange={handleInputChange}>
                        <MenuItem value="">select</MenuItem>
                        {newGenderDropDown}
                      </Select>
                      <FormHelperText />
                    </FormControl>
                  </div>
                  <div className="guardianForm-fields-26">
                    <TextField
                      id="patientGuardianAddressLine1" value={inputPatientData.guardian[0].address[0].addressLine1} onChange={handleInputChange}

                      color="primary"
                      variant="outlined"
                      type="text"
                      label="Address"
                      placeholder="Placeholder"
                      size="medium"
                      margin="none"
                    />
                  </div>
                </div>
                <div className="guardianForm-fields27" style={{left:isVisible?"490px":""}}>
                  <TextField
                    id="patientGuardianName" value={inputPatientData.guardian[0].name} onChange={handleInputChange}
                    className="destination-name-input32"
                    color="primary"
                    variant="outlined"
                    type="text"
                    label="Name"
                    placeholder="Placeholder"
                    size="medium"
                    margin="none"
                  />
                  <FormControl className="destination-name-input33" variant="outlined">
                    <InputLabel color="primary">Relationship</InputLabel>
                    <Select color="primary" size="medium" label="Relationship" name="patientGuardianRelationship" value={inputPatientData.guardian[0].relationship} onChange={handleInputChange}>
                      <MenuItem value="">select</MenuItem>
                      {newRelationshipDropDown}
                    </Select>
                    <FormHelperText />
                  </FormControl>
                </div>
                <div className="formContainer2-fields78"style={{left:isVisible?"490px":""}}>
                  <TextField
                    id="patientGuardianCity" value={inputPatientData.guardian[0].address[0].city} onChange={handleInputChange}
                    className="destination-formContainer2Name-input75"
                    color="primary"
                    variant="outlined"
                    type="text"
                    label="City"
                    placeholder="Placeholder"
                    size="medium"
                    margin="none"
                  />
                  <FormControl className="formContainer2Name-input86" variant="outlined">
                    <InputLabel color="primary">State</InputLabel>
                    <Select color="primary" size="medium" label="State" name="patientGuardianState" value={inputPatientData.guardian[0].address[0].state} onChange={handleInputChange}>
                      <MenuItem value="">select</MenuItem>
                      {newStateDropDown}
                    </Select>
                    <FormHelperText />
                  </FormControl>
                  <FormControl className="formContainer2Name-input86" variant="outlined">
                    <InputLabel color="primary">Country</InputLabel>
                    <Select color="primary" size="medium" label="Country" name="patientGuardianCountry" value={inputPatientData.guardian[0].address[0].country} onChange={handleInputChange}>
                      <MenuItem value="">Select</MenuItem>
                      {newCountryDropDown}
                    </Select>
                    <FormHelperText />
                  </FormControl>
                </div>
                <div className="add-patient-guardian-child3"  style={{left:isVisible?"453.5px":""}} />
                <div className="guardian" style={{left:isVisible?"472px":""}}>Guardian</div>
                <div className="add-patient-guardian-child4" style={{left:isVisible?"223.5px":""}}/>
                <img className="union-icon6" alt="" src="/union.svg" />
                <FooterSection
                  propHeight="6.67%"
                  propTop="93.44%"
                  onPreviousContainerClick={() => { setPatientSelectId(patientSelectId = 3); window.scrollTo(0, 0) }}
                  onNextContainerClick={() => { setPatientSelectId(patientSelectId = 5); window.scrollTo(0, 0) }}
                />
              </div>
              : patientSelectId === 5 ?
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <>
                    <div className="add-patient-misc">
                      <div className="add-patient-misc-child1" />
                      <div className="add-patient-misc-child3" />
                      <div className="misc">Misc</div>
                      <div className="add-patient-misc-child4" style={{left:isVisible?"225.5px":""}} />
                      <div className="miscForm-fields24">
                        <div className="selectoutlined2">
                          <DatePicker
                            label="Date Deceased"
                            value={inputPatientData.misc[0].dateDeceased}
                            onChange={(newValue) => {
                              inputPatientData.misc[0].dateDeceased = newValue;
                              setInputPatientData({ ...inputPatientData });
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
                        <TextField
                          id="patientMiscReason" value={inputPatientData.misc[0].reason} onChange={handleInputChange}
                          className="name-input22"
                          color="primary"
                          variant="outlined"
                          type="text"
                          label="Reason Deceased"
                          placeholder="Placeholder"
                          size="medium"
                          margin="none"
                        />
                      </div>
                      <FooterSection
                        propHeight="6.67%"
                        propTop="93.44%"
                        onPreviousContainerClick={() => { setPatientSelectId(patientSelectId = 4); window.scrollTo(0, 0) }}
                        onNextContainerClick={() => { setPatientSelectId(patientSelectId = 6); window.scrollTo(0, 0) }}
                      />
                    </div>

                  </>
                </LocalizationProvider>
                : patientSelectId === 6 ?
                  <div className="add-patient-state">
                    <div className="add-patient-state-child2" style={{ left: isVisible ? "220.5px" : "" }} />
                    <div className="add-patient-state-child3" style={{ left: isVisible ? "451px" : "" }} />
                    <div className="statsForm-fields20"style={{left:isVisible?"486px":""}}>
                      <TextField
                        id="patientStatsMigrant" value={inputPatientData.stats[0].migrant} onChange={handleInputChange}
                        className="destination-name-input29"
                        color="primary"
                        variant="outlined"
                        type="text"
                        label="Migrant/Seasonal"
                        placeholder="Placeholder"
                        size="medium"
                        margin="none"
                      />
                      <FormControl className="name-input16" variant="outlined">
                        <InputLabel color="primary">Referral Source</InputLabel>
                        <Select color="primary" size="medium" label="Referral Source" name="patientStatsReferralSource" value={inputPatientData.stats[0].referralSource} onChange={handleInputChange}>
                          <MenuItem value="">Select</MenuItem>
                          {newReferralProviderProviderDropDown}
                        </Select>
                        <FormHelperText />
                      </FormControl>
                    </div>
                    <div className="statsForm-fields21"style={{left:isVisible?"486px":""}}>
                      <FormControl className="name-input16" variant="outlined">
                        <InputLabel color="primary">Religion</InputLabel>
                        <Select color="primary" size="medium" label="Religion" name="patientStatsReligion" value={inputPatientData.stats[0].religion} onChange={handleInputChange}>
                          <MenuItem value="">Select</MenuItem>
                          {newReligionProviderDropDown}
                        </Select>
                        <FormHelperText />
                      </FormControl>
                      <TextField
                        id="patientStatsVfc" value={inputPatientData.stats[0].vfc} onChange={handleInputChange}
                        className="destination-name-input29"
                        color="primary"
                        variant="outlined"
                        type="text"
                        label="VFC"
                        placeholder="Placeholder"
                        size="medium"
                        margin="none"
                      />
                    </div>
                    <div className="statsForm-fields22"style={{left:isVisible?"486px":""}}>
                      <TextField
                        id="patientStatsHomeless" value={inputPatientData.stats[0].homeless} onChange={handleInputChange}
                        className="destination-name-input29"
                        color="primary"
                        variant="outlined"
                        type="text"
                        label={<span>  Homeless, ect <span style={{ color: "red" }}>*</span></span>}
                        placeholder="Placeholder"
                        size="medium"
                        margin="none"

                      />
                      <TextField
                        id="patientStatsInterpreter" value={inputPatientData.stats[0].interpreter} onChange={handleInputChange}
                        className="destination-name-input29"
                        color="primary"
                        variant="outlined"
                        type="email"
                        label="Interpreter"
                        placeholder="Placeholder"
                        size="medium"
                        margin="none"
                      />
                    </div>
                    <div className="add-patient-state-child4" style={{ left: isVisible ? "450px" : "" }} />
                    <div className="stats" style={{ left: isVisible ? "471px" : "" }}>Stats</div>
                    {/* <div style={{position:"absolute",width:"width: calc(100% - 545px)",top:"321px;",right: "114px",left: "431px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems:"flex-start",
                    justifyContent:" flex-start",
                    gap:" var(--gap-3xs)"
                  }}>*/}
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="ContainerForm1-fields77" style={{left:isVisible?"486px":""}}>
        <TextField
          className="destination-ContainerForm1-input74"
          color="primary"
          variant="outlined"
          type="number"
          label="Family Size"
          id="patientStatsFamilySize"
          value={inputPatientData.stats[0].familySize} onChange={handleInputChange}
          placeholder="Placeholder"
          size="medium"
          margin="none"
          required
        />
        <div className="selectoutlined11">
          <DatePicker
            label="Financial Review Date"
            value={inputPatientData.stats[0].financialReviewDate}
            onChange={(newValue: any) => {
              inputPatientData.stats[0].financialReviewDate = newValue;
              setInputPatientData({ ...inputPatientData });
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
        <TextField
          className="destination-ContainerForm1-input74"
          color="primary"
          variant="outlined"
          type="text"
          id="patientStatsMonthlyIncome"
          value={inputPatientData.stats[0].monthlyIncome} onChange={handleInputChange}
          label="Monthly Income"
          placeholder="Placeholder"
          size="medium"
          margin="none"
          required
        />
      </div>
    </LocalizationProvider>
                  
                   
                  
                    <div className="statsForm-fields23" style={{ left: isVisible ? "486px" : "" }} >
                      <div className="frame-parent19">
                        <FormControlLabel
                          label="Declined to Specify"
                          labelPlacement="end"
                          control={
                            <Checkbox color="primary" size="medium" id="checkboxlanguage" value={Language} />
                          }
                          onChange={handleInputChange}
                        />
                        <FormControl className="name-input19" variant="outlined">
                          <InputLabel color="primary">Language</InputLabel>
                          <Select style={{ background: Language ? 'lightgrey' : '' }} color="primary" size="medium" label="Language" name="patientStatsLanguage" disabled={Language} value={inputPatientData.stats[0].language} onChange={handleInputChange}>
                            <MenuItem value="">select</MenuItem>
                            {newLanguageDropDown}
                          </Select>
                          <FormHelperText />
                        </FormControl>
                      </div>
                      <div className="frame-parent19">
                        <FormControlLabel
                          label="Declined to Specify"
                          labelPlacement="end"
                          control={<Checkbox color="primary" size="medium" id="checkboxEthnicity" value={ethnicity} />}
                          onChange={handleInputChange}
                        />
                        <FormControl className="name-input19" variant="outlined">
                          <InputLabel color="primary">Ethnicity</InputLabel>
                          <Select style={{ background: ethnicity ? 'lightgrey' : '' }} color="primary" size="medium" label="Ethnicity" name="patientStatsEthnicity" disabled={ethnicity} value={inputPatientData.stats[0].ethnicity} onChange={handleInputChange}>
                            <MenuItem value="">select</MenuItem>
                            {newEthnicityDropDown}
                          </Select>
                          <FormHelperText />
                        </FormControl>
                      </div>
                      <div className="frame-parent19">
                        <FormControlLabel
                          label="Declined to Specify"
                          labelPlacement="end"
                          control={<Checkbox color="primary" size="medium" id="checkboxRace" value={race} />}
                          onChange={handleInputChange}
                        />
                        <FormControl className="name-input19" variant="outlined">
                          <InputLabel color="primary">Race</InputLabel>
                          <Select style={{ background: race ? 'lightgrey' : '' }} color="primary" size="medium" label="Race" name="patientStatsRace" value={inputPatientData.stats[0].race} disabled={race} onChange={handleInputChange}>
                            <MenuItem value="">Select</MenuItem>
                            {newRaceDropDown}
                          </Select>
                          <FormHelperText />
                        </FormControl>
                      </div>
                    </div>
                    <FooterSection
                      propHeight="6.67%"
                      propTop="93.44%"
                      onPreviousContainerClick={() => { setPatientSelectId(patientSelectId = 5); window.scrollTo(0, 0) }}
                      onNextContainerClick={() => { setPatientSelectId(patientSelectId = 7); window.scrollTo(0, 0) }}
                    />
                  </div>
                  : patientSelectId === 7 ?
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <>
      <div className="add-patient-insurance">
        <div className="add-patient-insurance-child" />
        <div className="add-patient-insurance-inner" />
        <div className="add-patient-insurance-inner2">
          <div className="cancel-container">
            <SecondaryButton label="Cancel" secondaryButtonCursor="unset" />
            <SecondaryButton
              label="Previous"
              secondaryButtonCursor="pointer"
              onCancelContainerClick={() => { setPatientSelectId(patientSelectId = 6); window.scrollTo(0, 0) }}
            />
            <PrimaryButton
              label="Next"
              primaryButtonCursor="pointer"
              onNextContainerClick={() => { setPatientSelectId(patientSelectId = 8); window.scrollTo(0, 0) }}
            />
          </div>
        </div>
        <div className="add-patient-insurance-child2" style={{ left: isVisible ? "223.5px" : "" }} />
        <div className="add-patient-insurance-child3" style={{ left: isVisible ? "452px" : "" }} />
        <TabContext value={newSelectedTab}>
          <TabList onChange={handleNewTabChange} style={{ left: isVisible ? "486px" : "" }} className="add-patient-insurance-additional-tab" aria-label="lab API tabs example">
            <Tab label="Primary" value="0" />
            <Tab label="Secondary" value="1" />
          </TabList>
          <TabPanel value="0">
            <div style={{ position: 'relative', top: '1px' }} >

              <div className="insuranceForm-fields9" style={{ left: isVisible ? "464px" : "" }}>
                <TextField
                  id="patientPriInsSEZipCode" value={inputPatientData.insurance[0].primary[0].subscriberAddress[0].zipCode} onChange={handleInputChange}
                  className="destination-name-input15"
                  color="primary"
                  variant="outlined"
                  type="text"
                  label="SE Zip Code"
                  placeholder="Placeholder"
                  size="medium"
                  margin="none"
                />
                <TextField
                  id="patientPriInsZipCode" value={inputPatientData.insurance[0].primary[0].zipCode} onChange={handleInputChange}
                  className="destination-name-input15"
                  color="primary"
                  variant="outlined"
                  type="text"
                  label="Zip Code"
                  placeholder="Placeholder"
                  size="medium"
                  margin="none"
                />
                <FormControl className="name-input8" variant="outlined">
                  <InputLabel color="primary">SE Country</InputLabel>
                  <Select color="primary" size="medium" label="State" name="patientPriInsSECountry" value={inputPatientData.insurance[0].primary[0].subscriberAddress[0].country} onChange={handleInputChange}>
                    <MenuItem value="">Select</MenuItem>
                    {newCountryDropDown}
                  </Select>
                  <FormHelperText />
                </FormControl>
                <FormControl className="name-input8" variant="outlined">
                  <InputLabel color="primary">Country</InputLabel>
                  <Select color="primary" size="medium" label="Country" name="patientPriInsCountry" value={inputPatientData.insurance[0].primary[0].country} onChange={handleInputChange}>
                    <MenuItem value="">Select</MenuItem>
                    {newCountryDropDown}
                  </Select>
                  <FormHelperText />
                </FormControl>
              </div>
              <div className="insuranceForm-field-s10" style={{ left: isVisible ? "464px" : "" }}>
                <div className="fields100">
                  <TextField
                    id="patientPriInsSubscriberEmployer" value={inputPatientData.insurance[0].primary[0].subscriberEmployee} onChange={handleInputChange}
                    className="destination-name-input15"
                    color="primary"
                    variant="outlined"
                    type="text"
                    label="Subscriber Employer (SE)"
                    placeholder="Placeholder"
                    size="medium"
                    margin="none"
                  />
                </div>
                <div className="fields100">

                  <FormControl className="name-input8" variant="outlined">
                    <InputLabel color="primary">Gender</InputLabel>
                    <Select style={{ background: Genderinsurance ? 'lightgrey' : '' }} disabled={Genderinsurance} color="primary" size="medium" label="Gender" name="patientPriInsGender" value={inputPatientData.insurance[0].primary[0].gender} onChange={handleInputChange}>
                      <MenuItem value="">Select</MenuItem>
                      {newGenderDropDown}
                    </Select>
                    <FormHelperText />
                  </FormControl>
                </div>
              </div>
              <div className="insuranceForm-fields11" style={{ left: isVisible ? "464px" : "" }}>
                <TextField
                  id="patientPriInsSEAddress" value={inputPatientData.insurance[0].primary[0].seaddress} onChange={handleInputChange}
                  className="destination-name-input15"
                  color="primary"
                  variant="outlined"
                  type="text"
                  label="SE Address"
                  placeholder="Placeholder"
                  size="medium"
                  margin="none"
                />
              </div>
              <div className="insuranceForm-fields12" style={{ left: isVisible ? "464px" : "" }}>
                <div className="selectoutlined">
                  <DatePicker
                    label="Effective Date"
                    value={inputPatientData.insurance[0].primary[0].effectivedate}
                    onChange={(newValue: any) => {
                      inputPatientData.insurance[0].primary[0].effectivedate = newValue;
                      setInputPatientData({ ...inputPatientData });
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
                <FormControl className="name-input8" variant="outlined">
                  <InputLabel color="primary">Relationship</InputLabel>
                  <Select color="primary" size="medium" label="Relationship" name="patientPriInsRelationship" value={inputPatientData.insurance[0].primary[0].relationship} onChange={handleInputChange}>
                    <MenuItem value="">Select</MenuItem>
                    {newRelationshipDropDown}
                  </Select>
                  <FormHelperText />
                </FormControl>
              </div>
              <div className="insuranceForm-fields13" style={{ left: isVisible ? "464px" : "" }}>
                <TextField
                  id="patientPriInsPolicyNumber" value={inputPatientData.insurance[0].primary[0].policyNumber} onChange={handleInputChange}
                  className="destination-name-input15"
                  color="primary"
                  variant="outlined"
                  type="number"
                  label="Policy Number"
                  placeholder="Placeholder"
                  size="medium"
                  margin="none"
                />
                <div className="selectoutlined">
                  <DatePicker
                    label="D.O.B."
                    value={inputPatientData.insurance[0].primary[0].birthDate}
                    onChange={(newValue: any) => {
                      inputPatientData.insurance[0].primary[0].birthDate = newValue;
                      setInputPatientData({ ...inputPatientData });
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
              </div>
              <div className="insuranceForm-field-s14" style={{ left: isVisible ? "464px" : "" }}>
                <div className="fields100">
                  <TextField
                    id="patientPriInsGroupNumber" value={inputPatientData.insurance[0].primary[0].groupNumber} onChange={handleInputChange}
                    className="destination-name-input15"
                    color="primary"
                    variant="outlined"
                    type="number"
                    label="Group Number"
                    placeholder="Placeholder"
                    size="medium"
                    margin="none"
                  />
                </div>
                <div className="fields100">
                  <FormControlLabel

                    label="Declined to Specify"
                    labelPlacement="end"
                    control={<Checkbox color="primary" size="medium" value={Genderinsurance} id="checkgenderinsurance" />}
                    onChange={handleInputChange}
                  />
                  <TextField
                    id="patientPriInsSsn" value={inputPatientData.insurance[0].primary[0].ss} onChange={handleInputChange}
                    className="destination-name-input15"
                    color="primary"
                    variant="outlined"
                    type="text"
                    label="S.S.N"
                    placeholder="Placeholder"
                    size="medium"
                    margin="none"
                  />
                </div>
              </div>
              <div className="insuranceForm-fields15" style={{ left: isVisible ? "464px" : "" }}>
                <TextField
                  id="patientPriInsAddressLine1" value={inputPatientData.insurance[0].primary[0].subscriberAddress[0].addressLine1} onChange={handleInputChange}
                  className="destination-name-input15"
                  color="primary"
                  variant="outlined"
                  type="text"
                  label="Subscriber Address Line 1"
                  placeholder="Placeholder"
                  size="medium"
                  margin="none"
                />
                <TextField
                  id="patientPriInsAddressLine2" value={inputPatientData.insurance[0].primary[0].subscriberAddress[0].addressLine2} onChange={handleInputChange}
                  className="destination-name-input15"
                  color="primary"
                  variant="outlined"
                  type="text"
                  label="Subscriber Address Line 2"
                  placeholder="Placeholder"
                  size="medium"
                  margin="none"
                />
              </div>
              <div className="insuranceForm-fields16" style={{ left: isVisible ? "464px" : "" }}>
                <TextField
                  id="patientPriInsSubscriberPhone" value={inputPatientData.insurance[0].primary[0].subscriberPhone} onChange={handleInputChange}
                  className="destination-name-input15"
                  color="primary"
                  variant="outlined"
                  type="text"
                  label="Subscriber Phone"
                  placeholder="Placeholder"
                  size="medium"
                  margin="none"
                />
                <TextField
                  id="patientPriInsCoPay" value={inputPatientData.insurance[0].primary[0].co_pay} onChange={handleInputChange}
                  className="destination-name-input15"
                  color="primary"
                  variant="outlined"
                  type="text"
                  label="Co-Pay"
                  placeholder="Placeholder"
                  size="medium"
                  margin="none"
                />

                <FormControl className="name-input8" variant="outlined">
                  <InputLabel color="primary">Accept Assignment</InputLabel>
                  <Select color="primary" size="medium" label="Accept Assignment" name="patientPriInsAcceptAssignment" value={inputPatientData.insurance[0].primary[0].acceptAssignment} onChange={handleInputChange}>
                    <MenuItem value="Option 1">Option 1</MenuItem>
                    <MenuItem value="Option 2">Option 2</MenuItem>
                  </Select>
                  <FormHelperText />
                </FormControl>
                {/*
          
         {(dialogSecondaryInsuarnce &&
         <div>
           <FormContainer />
           </div>)}   
         */}
              </div>

              <div className="insuranceForm-fields17" style={{ left: isVisible ? "464px" : "" }}>
                <TextField
                  id="patientPriInsSECity" value={inputPatientData.insurance[0].primary[0].subscriberAddress[0].city} onChange={handleInputChange}
                  className="destination-name-input15"
                  color="primary"
                  variant="outlined"
                  type="text"
                  label="SE City"
                  placeholder="Placeholder"
                  size="medium"
                  margin="none"
                />
                <TextField
                  id="patientPriInsCity" value={inputPatientData.insurance[0].primary[0].city} onChange={handleInputChange}
                  className="destination-name-input15"
                  color="primary"
                  variant="outlined"
                  type="text"
                  label="City"
                  placeholder="Placeholder"
                  size="medium"
                  margin="none"
                />
                <FormControl className="name-input8" variant="outlined">
                  <InputLabel color="primary">SE State</InputLabel>
                  <Select color="primary" size="medium" label="SE State" name="patientPriInsSEState" value={inputPatientData.insurance[0].primary[0].subscriberAddress[0].state} onChange={handleInputChange}>
                    <MenuItem value="">Select</MenuItem>
                    {newStateDropDown}

                  </Select>
                  <FormHelperText />
                </FormControl>
                <FormControl className="name-input8" variant="outlined">
                  <InputLabel color="primary">State</InputLabel>
                  <Select color="primary" size="medium" label="State" name="patientPriInsState" value={inputPatientData.insurance[0].primary[0].state} onChange={handleInputChange}>
                    <MenuItem value="">select</MenuItem>
                    {newStateDropDown}
                  </Select>
                  <FormHelperText />
                </FormControl>
              </div>
              <div className="insuranceForm-fields18" style={{ position: "absolute", left: isVisible ? "464px" : "" }}>
                <TextField
                  id="patientPriInsPlanName" value={inputPatientData.insurance[0].primary[0].planName} onChange={handleInputChange}
                  className="destination-name-input15"
                  color="primary"
                  variant="outlined"
                  type="text"
                  label="Plan Name"
                  placeholder="Placeholder"
                  size="medium"
                  margin="none"
                />
                <TextField
                  id="patientPriInsSubscriber" value={inputPatientData.insurance[0].primary[0].subscriber} onChange={handleInputChange}
                  className="destination-name-input15"
                  color="primary"
                  variant="outlined"
                  type="text"
                  label="Subscriber"
                  placeholder="Placeholder"
                  size="medium"
                  margin="none"
                />
              </div>


              <FormControl
                className="insuranceForm-fields19"
                style={{ left: isVisible ? "464px" : "", position: "absolute" }}
                sx={{ width: 735 }}
                variant="outlined"
              >
                <InputLabel color="primary">Primary Insurance provider</InputLabel>
                <Select
                  color="primary"
                  size="medium"
                  label="Primary Insurance provider" name="patientPriInsTitle" value={inputPatientData.insurance[0].primary[0].title} onChange={handleInputChange}
                >
                  <MenuItem value="">Select</MenuItem>
                  {newInsuranceProviderDropDown}
                </Select>
                <FormHelperText />
              </FormControl>
            </div>
          </TabPanel>
          <TabPanel value="1">
            <TabContext value={selectedTab}>
              <TabList onChange={handleTabChange} variant="scrollable" selectionFollowsFocus={true} scrollButtons={true} className="add-patient-insurance-additional-newTab" style={{ left: isVisible ? "440px" : "" }} aria-label="lab API tabs example">
                <Tab label="Secondary 1" value="0" />
                {tabs.map(tab => (
                  <Tab key={tab.value} label={tab.label} value={tab.value} />
                ))}
              </TabList>
              <TabPanel value="0">
                <div className="secondary-analytics-parent">
                  <div className="secondary-analytics11"></div>
                  <div className="secondary-form-fields66" style={{ left: isVisible ? "50px" : "" }}>
                    <TextField
                      id="patientSecInsSEZipCode" value={inputPatientData.insurance[0].secondary[0].insuranceDetails.subscriberAddress[0].zipCode} onChange={handleInputChange}
                      className="secondary-destination-name-input60"
                      color="primary"
                      variant="outlined"
                      type="text"
                      label="SE Zip Code"
                      placeholder="Placeholder"
                      size="medium"
                      margin="none"
                    />
                    <TextField
                      id="patientSecInsZipCode" value={inputPatientData.insurance[0].secondary[0].insuranceDetails.zipCode} onChange={handleInputChange}
                      className="secondary-destination-name-input60"
                      color="primary"
                      variant="outlined"
                      type="text"
                      label="Zip Code"
                      placeholder="Placeholder"
                      size="medium"
                      margin="none"
                    />
                    <FormControl className="secondary-name-input77" variant="outlined">
                      <InputLabel color="primary">SE Country</InputLabel>
                      <Select color="primary" size="medium" label="State" name="patientSecInsSECountry" value={inputPatientData.insurance[0].secondary[0].insuranceDetails.subscriberAddress[0].country} onChange={handleInputChange}>
                        <MenuItem value="">Select</MenuItem>
                        {newCountryDropDown}
                      </Select>
                      <FormHelperText />
                    </FormControl>
                    <FormControl className="secondary-name-input77" variant="outlined">
                      <InputLabel color="primary">Country</InputLabel>
                      <Select color="primary" size="medium" label="Country" name="patientSecInsCountry" value={inputPatientData.insurance[0].secondary[0].insuranceDetails.country} onChange={handleInputChange}>
                        <MenuItem value="">Select</MenuItem>
                        {newCountryDropDown}
                      </Select>
                      <FormHelperText />
                    </FormControl>
                  </div>
                  <div className="secondary-form-fields67" style={{ left: isVisible ? "50px" : "" }}>
                    <TextField
                      id="patientSecInsSubscriberEmployer" value={inputPatientData.insurance[0].secondary[0].insuranceDetails.subscriberEmployee} onChange={handleInputChange}
                      className="secondary-destination-name-input60"
                      color="primary"
                      variant="outlined"
                      type="text"
                      label="Subscriber Employer (SE)"
                      placeholder="Placeholder"
                      size="medium"
                      margin="none"
                    />
                    <FormControl className="secondary-name-input77" variant="outlined">
                      <InputLabel color="primary">Gender</InputLabel>
                      <Select style={{ background: Secondarygenderinsu ? 'lightgrey' : '' }} disabled={Secondarygenderinsu} color="primary" size="medium" label="Gender" name="patientSecInsGender" value={inputPatientData.insurance[0].secondary[0].insuranceDetails.gender} onChange={handleInputChange}>
                        <MenuItem value="">Select</MenuItem>
                        {newGenderDropDown}
                      </Select>
                      <FormHelperText />
                    </FormControl>
                  </div>
                  <div className="secondary-form-fields68" style={{ left: isVisible ? "50px" : "" }}>
                    <TextField
                      id="patientSecInsSEAddress" value={inputPatientData.insurance[0].secondary[0].insuranceDetails.seaddress} onChange={handleInputChange}
                      className="secondary-destination-name-input60"
                      color="primary"
                      variant="outlined"
                      type="text"
                      label="SE Address"
                      placeholder="Placeholder"
                      size="medium"
                      margin="none"
                    />
                  </div>
                  <div className="secondary-form-fields69" style={{ left: isVisible ? "50px" : "" }}>
                    <div className="secondary-form-selectoutlined9">
                      <DatePicker
                        label="Effective Date"
                        value={inputPatientData.insurance[0].secondary[0].insuranceDetails.effectivedate}
                        onChange={(newValue: any) => {
                          inputPatientData.insurance[0].secondary[0].insuranceDetails.effectivedate = newValue;
                          setInputPatientData({ ...inputPatientData });
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
                    <FormControl className="secondary-name-input77" variant="outlined">
                      <InputLabel color="primary">Relationship</InputLabel>
                      <Select color="primary" size="medium" label="Relationship" name="patientSecInsRelationship" value={inputPatientData.insurance[0].secondary[0].insuranceDetails.relationship} onChange={handleInputChange}>
                        <MenuItem value="">Select</MenuItem>
                        {newRelationshipDropDown}
                      </Select>
                      <FormHelperText />
                    </FormControl>
                  </div>
                  <div className="secondary-form-fields70" style={{ left: isVisible ? "50px" : "" }}>
                    <TextField
                      id="patientSecInsPolicyNumber" value={inputPatientData.insurance[0].secondary[0].insuranceDetails.policyNumber} onChange={handleInputChange}
                      className="secondary-destination-name-input60"
                      color="primary"
                      variant="outlined"
                      type="number"
                      label="Policy Number"
                      placeholder="Placeholder"
                      size="medium"
                      margin="none"
                    />
                    <div className="secondary-form-selectoutlined9">
                      <DatePicker
                        label="D.O.B."
                        value={inputPatientData.insurance[0].secondary[0].insuranceDetails.birthDate}
                        onChange={(newValue: any) => {
                          inputPatientData.insurance[0].secondary[0].insuranceDetails.birthDate = newValue;
                          setInputPatientData({ ...inputPatientData });
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
                  </div>
                  <div className="secondary-form-field-s71" style={{ left: isVisible ? "50px" : "" }}>
                    <div className="secondary-form-field-s710">
                      <TextField
                        id="patientSecInsGroupNumber" value={inputPatientData.insurance[0].secondary[0].insuranceDetails.groupNumber} onChange={handleInputChange}
                        className="secondary-destination-name-input60"
                        color="primary"
                        variant="outlined"
                        type="number"
                        label="Group Number"
                        placeholder="Placeholder"
                        size="medium"
                        margin="none"
                      />
                    </div>
                    <div className="secondary-form-field-s710">
                      <FormControlLabel

                        label="Declined to Specify"
                        labelPlacement="end"
                        control={<Checkbox color="primary" size="medium" value={Secondarygenderinsu} id="checkboxsecondaryinsugender" />}
                        onChange={handleInputChange}
                      />
                      <TextField
                        id="patientSecInsSsn" value={inputPatientData.insurance[0].secondary[0].insuranceDetails.ss} onChange={handleInputChange}
                        className="secondary-destination-name-input60"
                        color="primary"
                        variant="outlined"
                        type="text"
                        label="S.S.N"
                        placeholder="Placeholder"
                        size="medium"
                        margin="none"
                      />
                    </div>
                  </div>
                  <div className="secondary-form-fields72" style={{ left: isVisible ? "50px" : "" }}>
                    <TextField
                      id="patientSecInsAddressLine1" value={inputPatientData.insurance[0].secondary[0].insuranceDetails.subscriberAddress[0].addressLine1} onChange={handleInputChange}
                      className="secondary-destination-name-input60"
                      color="primary"
                      variant="outlined"
                      type="text"
                      label="Subscriber Address Line 1"
                      placeholder="Placeholder"
                      size="medium"
                      margin="none"
                    />
                    <TextField
                      id="patientSecInsAddressLine2" value={inputPatientData.insurance[0].secondary[0].insuranceDetails.subscriberAddress[0].addressLine2} onChange={handleInputChange}
                      className="secondary-destination-name-input60"
                      color="primary"
                      variant="outlined"
                      type="text"
                      label="Subscriber Address Line 2"
                      placeholder="Placeholder"
                      size="medium"
                      margin="none"
                    />
                  </div>
                  <div className="secondary-form-fields73" style={{ left: isVisible ? "50px" : "" }}>
                    <TextField
                      id="patientSecInsSubscriberPhone" value={inputPatientData.insurance[0].secondary[0].insuranceDetails.subscriberPhone} onChange={handleInputChange}
                      className="secondary-destination-name-input60"
                      color="primary"
                      variant="outlined"
                      type="text"
                      label="Subscriber Phone"
                      placeholder="Placeholder"
                      size="medium"
                      margin="none"
                    />
                    <TextField
                      id="patientSecInsCoPay" value={inputPatientData.insurance[0].secondary[0].insuranceDetails.co_pay} onChange={handleInputChange}
                      className="secondary-destination-name-input60"
                      color="primary"
                      variant="outlined"
                      type="text"
                      label="Co-Pay"
                      placeholder="Placeholder"
                      size="medium"
                      margin="none"
                    />
                    <FormControl className="secondary-name-input77" variant="outlined">
                      <InputLabel color="primary">Accept Assignment</InputLabel>
                      <Select color="primary" size="medium" label="Accept Assignment" name="patientSecInsAcceptAssignment" value={inputPatientData.insurance[0].secondary[0].insuranceDetails.acceptAssignment} onChange={handleInputChange}>
                        <MenuItem value="Option 1">Option 1</MenuItem>
                        <MenuItem value="Option 2">Option 2</MenuItem>
                      </Select>
                      <FormHelperText />
                    </FormControl>
                  </div>
                  <div className="secondary-form-fields74" style={{ left: isVisible ? "50px" : "" }}>
                    <TextField
                      id="patientSecInsSECity" value={inputPatientData.insurance[0].secondary[0].insuranceDetails.subscriberAddress[0].city} onChange={handleInputChange}
                      className="secondary-destination-name-input60"
                      color="primary"
                      variant="outlined"
                      type="text"
                      label="SE City"
                      placeholder="Placeholder"
                      size="medium"
                      margin="none"
                    />
                    <TextField
                      id="patientSecInsCity" value={inputPatientData.insurance[0].secondary[0].insuranceDetails.city} onChange={handleInputChange}
                      className="secondary-destination-name-input60"
                      color="primary"
                      variant="outlined"
                      type="text"
                      label="City"
                      placeholder="Placeholder"
                      size="medium"
                      margin="none"
                    />
                    <FormControl className="secondary-name-input77" variant="outlined">
                      <InputLabel color="primary">SE State</InputLabel>
                      <Select color="primary" size="medium" label="SE State" name="patientSecInsSEState" value={inputPatientData.insurance[0].secondary[0].insuranceDetails.subscriberAddress[0].state} onChange={handleInputChange}>
                        <MenuItem value="">Select</MenuItem>
                        {newStateDropDown}
                      </Select>
                      <FormHelperText />
                    </FormControl>
                    <FormControl className="secondary-name-input77" variant="outlined">
                      <InputLabel color="primary">State</InputLabel>
                      <Select color="primary" size="medium" label="State" name="patientSecInsState" value={inputPatientData.insurance[0].secondary[0].insuranceDetails.state} onChange={handleInputChange}>
                        <MenuItem value="">Select</MenuItem>
                        {newStateDropDown}
                      </Select>
                      <FormHelperText />
                    </FormControl>
                  </div>
                  <div className="secondary-form-fields75" style={{ left: isVisible ? "50px" : "" }}>
                    <TextField
                      id="patientSecInsPlanName" value={inputPatientData.insurance[0].secondary[0].insuranceDetails.planName} onChange={handleInputChange}
                      className="secondary-destination-name-input60"
                      color="primary"
                      variant="outlined"
                      type="text"
                      label="Plan Name"
                      placeholder="Placeholder"
                      size="medium"
                      margin="none"
                    />
                    <TextField
                      id="patientSecInsSubscriber" value={inputPatientData.insurance[0].secondary[0].insuranceDetails.subscriber} onChange={handleInputChange}
                      className="secondary-destination-name-input60"
                      color="primary"
                      variant="outlined"
                      type="text"
                      label="Subscriber"
                      placeholder="Placeholder"
                      size="medium"
                      margin="none"
                    />
                  </div>
                  <FormControl
                    className="secondary-form-fields76"
                    style={{ left: isVisible ? "50px" : "" }}
                    sx={{ width: 735 }}
                    variant="outlined"
                  >
                    <InputLabel color="primary">Secondary Insurance provider</InputLabel>
                    <Select
                      color="primary"
                      size="medium"
                      label="Secondary Insurance provider"
                      name="patientSecInsTitle" value={inputPatientData.insurance[0].secondary[0].insuranceDetails.title} onChange={handleInputChange}>
                      <MenuItem value="">Select</MenuItem>
                      {newInsuranceProviderDropDown}
                    </Select>
                    <FormHelperText />
                  </FormControl>
                  <div style={{ width: '300px', height: '36px', position: 'absolute', left:isVisible?"302px":"253px", top: '946px' }}>
                    {tabIndex < 10 && <Button className="Patient-datatable-name" style={{ fontFamily: 'Poppins', fontSize: '14px', backgroundColor: '#C9D1E2', borderRadius: '5px', border: '0px', color: '#293241', WebkitTextStroke: 'thin' }} variant="outlined" onClick={createNewTab}>+  Add New Secondary Insurance</Button>}
                  </div>
                </div>
              </TabPanel>
              {panels.map(panel => (
                <TabPanel key={panel.value} value={panel.value}>
                  <div className="secondary-analytics-parent">
                    <div className="secondary-analytics11"></div>
                    <div className="secondary-form-fields66"style={{left:isVisible?"50px":""}}>
                      <TextField
                        id={"patientSecInsSEZipCode" + panel.value} value={inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].zipCode !== undefined?inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].zipCode:patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].zipCode}
                        onChange={(e) => {
                          if(inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].zipCode !== null){
                            inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].zipCode = e.target.value;
                          }else{
                            inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].zipCode = e.target.value;
                            patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].zipCode = e.target.value;
                          }
                          setInputPatientData({ ...inputPatientData })
                        }}
                        className="secondary-destination-name-input60"
                        color="primary"
                        variant="outlined"
                        type="text"
                        label="SE Zip Code"
                        placeholder="Placeholder"
                        size="medium"
                        margin="none"
                      />
                      <TextField
                        id={"patientSecInsZipCode" + panel.value} value={inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.zipCode !== undefined?inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.zipCode:patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.zipCode}
                        onChange={(e) => {
                          if(inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.zipCode !== null){
                            inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.zipCode = e.target.value;
                          }else{
                            inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.zipCode = e.target.value;
                            patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.zipCode = e.target.value;
                          }
                          setInputPatientData({ ...inputPatientData })                        
                        }}
                        className="secondary-destination-name-input60"
                        color="primary"
                        variant="outlined"
                        type="text"
                        label="Zip Code"
                        placeholder="Placeholder"
                        size="medium"
                        margin="none"
                      />
                      <FormControl className="secondary-name-input77" variant="outlined">
                        <InputLabel color="primary">SE Country</InputLabel>
                        <Select color="primary" size="medium" label="State" name={"patientSecInsSECountry" + panel.value} value={inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].country !== undefined?inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].country:patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].country}
                          onChange={(e) => {
                            if(inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].country !== null){
                              inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].country = e.target.value;
                            }else{
                              inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].country = e.target.value;
                              patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].country = e.target.value;
                            }
                            setInputPatientData({ ...inputPatientData })                                
                          }}>
                          <MenuItem value="">Select</MenuItem>
                          {newCountryDropDown}
                        </Select>
                        <FormHelperText />
                      </FormControl>
                      <FormControl className="secondary-name-input77" variant="outlined">
                        <InputLabel color="primary">Country</InputLabel>
                        <Select color="primary" size="medium" label="Country" name={"patientSecInsCountry" + panel.value} value={inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.country !== undefined?inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.country:patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.country}
                          onChange={(e) => {
                            if(inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.country !== null){
                              inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.country = e.target.value;
                            }else{
                              inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.country = e.target.value;
                              patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.country = e.target.value;
                            }
                            setInputPatientData({ ...inputPatientData })                              
                          }}>
                          <MenuItem value="">Select</MenuItem>
                          {newCountryDropDown}
                        </Select>
                        <FormHelperText />
                      </FormControl>
                    </div>
                    <div className="secondary-form-fields67" style={{ left: isVisible ? "50px" : "" }}>
                      <TextField
                        id={"patientSecInsSubscriberEmployer" + panel.value} value={inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberEmployee !== undefined?inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberEmployee:patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.subscriberEmployee}
                        onChange={(e) => {
                          if(inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberEmployee !== null){
                            inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberEmployee = e.target.value;
                          }else{
                            inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberEmployee = e.target.value;
                            patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.subscriberEmployee = e.target.value;
                          }
                          setInputPatientData({ ...inputPatientData })                               
                        }}
                        className="secondary-destination-name-input60"
                        color="primary"
                        variant="outlined"
                        type="text"
                        label="Subscriber Employer (SE)"
                        placeholder="Placeholder"
                        size="medium"
                        margin="none"
                      />
                      {/* <FormControlLabel

                                          label="Declined to Specify"
                                          labelPlacement="end"
                                          control={<Checkbox color="primary" size="medium" value={Secondarygenderinsu} id="checkboxsecondaryinsugender" />}
                                          onChange={handleInputChange}
                                        /> */}
                      <FormControl className="secondary-name-input77" variant="outlined">
                        <InputLabel color="primary">Gender</InputLabel>
                        <Select style={{ background: Secondarygenderinsu ? 'lightgrey' : '' }} disabled={Secondarygenderinsu} color="primary" size="medium" label="Gender" name={"patientSecInsGender" + panel.value} value={inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.gender !== undefined?inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.gender:patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.gender}
                          onChange={(e) => {
                            if(inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.gender !== null){
                              inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.gender = e.target.value;
                            }else{
                              inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.gender = e.target.value;
                              patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.gender = e.target.value;
                            }      
                            setInputPatientData({ ...inputPatientData })                          
                          }}>
                          <MenuItem value="">Select</MenuItem>
                          {newGenderDropDown}
                        </Select>
                        <FormHelperText />
                      </FormControl>
                    </div>
                    <div className="secondary-form-fields68" style={{ left: isVisible ? "50px" : "" }}>
                      <TextField
                        id={"patientSecInsSEAddress" + panel.value} value={inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.seaddress !== undefined?inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.seaddress:patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.seaddress}
                        onChange={(e) => {
                          if(inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.seaddress !== null){
                            inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.seaddress = e.target.value;
                          }else{
                            inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.seaddress = e.target.value;
                            patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.seaddress = e.target.value;
                          }      
                          setInputPatientData({ ...inputPatientData })                          
                        }}
                        className="secondary-destination-name-input60"
                        color="primary"
                        variant="outlined"
                        type="text"
                        label="SE Address"
                        placeholder="Placeholder"
                        size="medium"
                        margin="none"
                      />
                    </div>
                    <div className="secondary-form-fields69" style={{left:isVisible?"50px":""}}>
                      <div className="secondary-form-selectoutlined9">
                        <DatePicker
                          label={"Effective Date" + panel.value}
                          value={inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.effectivedate !== undefined?inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.effectivedate:patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.effectivedate}
                          onChange={(newValue: any) => {
                            if(inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.effectivedate !== null){
                              inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.effectivedate = newValue;
                            }else{
                              inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.effectivedate = newValue;
                              patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.seaddress = newValue;
                            }      
                            setInputPatientData({ ...inputPatientData })                           
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
                      <FormControl className="secondary-name-input77" variant="outlined">
                        <InputLabel color="primary">Relationship</InputLabel>
                        <Select color="primary" size="medium" label="Relationship" name={"patientSecInsRelationship" + panel.value} value={inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.relationship !== undefined?inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.relationship:patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.relationship}
                          onChange={(e) => {
                            if(inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.relationship !== null){
                              inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.relationship = e.target.value;
                            }else{
                              inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.relationship = e.target.value;
                              patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.relationship = e.target.value;
                            }                                
                            setInputPatientData({ ...inputPatientData })
                          }}>
                          <MenuItem value="">Select</MenuItem>
                          {newRelationshipDropDown}
                        </Select>
                        <FormHelperText />
                      </FormControl>
                    </div>
                    <div className="secondary-form-fields70" style={{left:isVisible?"50px":""}}>
                      <TextField
                        id={"patientSecInsPolicyNumber" + panel.value} value={inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.policyNumber !== undefined?inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.policyNumber:patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.policyNumber}
                        onChange={(e) => {
                          if(inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.policyNumber !== null){
                            inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.policyNumber = e.target.value;
                          }else{
                            inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.policyNumber = e.target.value;
                            patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.policyNumber = e.target.value;
                          }                                
                          setInputPatientData({ ...inputPatientData })
                        }}
                        className="secondary-destination-name-input60"
                        color="primary"
                        variant="outlined"
                        type="number"
                        label="Policy Number"
                        placeholder="Placeholder"
                        size="medium"
                        margin="none"
                      />
                      <div className="secondary-form-selectoutlined9">
                        <DatePicker
                          label={"D.O.B." + panel.value}
                          value={inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.birthDate !== undefined?inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.birthDate:patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.birthDate}
                          onChange={(newValue: any) => {
                            if(inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.birthDate !== null){
                              inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.birthDate = newValue;
                            }else{
                              inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.birthDate = newValue;
                              patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.birthDate = newValue;
                            }              
                            setInputPatientData({ ...inputPatientData });
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
                    </div>
                    <div className="secondary-form-field-s71" style={{left:isVisible?"50px":""}}>
                      <div className="secondary-form-field-s710">
                        <TextField
                          id={"patientSecInsGroupNumber" + panel.value} value={inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.groupNumber !== undefined?inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.groupNumber:patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.groupNumber}
                          onChange={(e) => {
                            if(inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.groupNumber !== null){
                              inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.groupNumber = e.target.value;
                            }else{
                              inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.groupNumber = e.target.value;
                              patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.groupNumber = e.target.value;
                            }                             
                            setInputPatientData({ ...inputPatientData })
                          }}
                          className="secondary-destination-name-input60"
                          color="primary"
                          variant="outlined"
                          type="number"
                          label="Group Number"
                          placeholder="Placeholder"
                          size="medium"
                          margin="none"
                        />
                      </div>
                      <div className="secondary-form-field-s710">
                        <FormControlLabel

                          label="Declined to Specify"
                          labelPlacement="end"
                          control={<Checkbox color="primary" size="medium" value={Secondarygenderinsu} id="checkboxsecondaryinsugender" />}
                          onChange={handleInputChange}
                        />
                        <TextField
                          id={"patientSecInsSsn" + panel.value} value={inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.ss !== undefined?inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.ss:patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.ss}
                          onChange={(e) => {
                            if(inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.ss !== null){
                              inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.ss = Constants.formatSSNumber(e.target.value);
                            }else{
                              inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.ss = Constants.formatSSNumber(e.target.value);
                              patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.ss = Constants.formatSSNumber(e.target.value);
                            }                            
                            setInputPatientData({ ...inputPatientData })
                          }}
                          className="secondary-destination-name-input60"
                          color="primary"
                          variant="outlined"
                          type="text"
                          label="S.S.N"
                          placeholder="Placeholder"
                          size="medium"
                          margin="none"
                        />
                      </div>
                    </div>
                    <div className="secondary-form-fields72" style={{ left: isVisible ? "50px" : "" }}>
                      <TextField
                        id={"patientSecInsAddressLine1" + panel.value} value={inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].addressLine1 !== undefined?inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].addressLine1:patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].addressLine1}
                        onChange={(e) => {
                          if(inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].addressLine1 !== null){
                            inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].addressLine1 = e.target.value;
                          }else{
                            inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].addressLine1 = e.target.value;
                            patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].addressLine1 = e.target.value;
                          }    
                         
                          setInputPatientData({ ...inputPatientData })
                        }}
                        className="secondary-destination-name-input60"
                        color="primary"
                        variant="outlined"
                        type="text"
                        label="Subscriber Address Line 1"
                        placeholder="Placeholder"
                        size="medium"
                        margin="none"
                      />
                      <TextField
                        id={"patientSecInsAddressLine2" + panel.value} value={inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].addressLine2 !== undefined?inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].addressLine2:patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].addressLine2}
                        onChange={(e) => {
                          if(inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].addressLine2 !== null){
                            inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].addressLine2 = e.target.value;
                          }else{
                            inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].addressLine2 = e.target.value;
                            patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].addressLine2 = e.target.value;
                          }                              
                          setInputPatientData({ ...inputPatientData })
                        }}
                        className="secondary-destination-name-input60"
                        color="primary"
                        variant="outlined"
                        type="text"
                        label="Subscriber Address Line 2"
                        placeholder="Placeholder"
                        size="medium"
                        margin="none"
                      />
                    </div>
                    <div className="secondary-form-fields73"style={{left:isVisible?"50px":""}}>
                      <TextField
                        id={"patientSecInsSubscriberPhone" + panel.value} value={inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberPhone !== undefined?Constants.formatPhoneNumber(inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberPhone):Constants.formatPhoneNumber(patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.subscriberPhone)}
                        onChange={(e) => {
                          if(inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberPhone !== null){
                            inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberPhone = (e.target.value);
                          }else{
                            inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberPhone= (e.target.value);
                            patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.subscriberPhone = (e.target.value);
                          }                              
                          setInputPatientData({ ...inputPatientData })
                        }}
                        className="secondary-destination-name-input60"
                        color="primary"
                        variant="outlined"
                        type="text"
                        label="Subscriber Phone"
                        placeholder="Placeholder"
                        size="medium"
                        margin="none"
                      />
                      <TextField
                        id={"patientSecInsCoPay" + panel.value} value={inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.co_pay !== undefined?inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.co_pay:patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.co_pay}
                        onChange={(e) => {
                          if(inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.co_pay !== null){
                            inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.co_pay = e.target.value;
                          }else{
                            inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.co_pay = e.target.value;
                            patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.co_pay = e.target.value;
                          }                            
                          setInputPatientData({ ...inputPatientData })
                        }}
                        className="secondary-destination-name-input60"
                        color="primary"
                        variant="outlined"
                        type="text"
                        label="Co-Pay"
                        placeholder="Placeholder"
                        size="medium"
                        margin="none"
                      />
                      <FormControl className="secondary-name-input77" variant="outlined">
                        <InputLabel color="primary">Accept Assignment</InputLabel>
                        <Select color="primary" size="medium" label="Accept Assignment" name={"patientSecInsAcceptAssignment" + panel.value} value={inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.acceptAssignment !== undefined?inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.acceptAssignment:patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.acceptAssignment}
                          onChange={(e) => {
                            if(inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.acceptAssignment !== null){
                              inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.acceptAssignment = e.target.value;
                            }else{
                              inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.acceptAssignment = e.target.value;
                              patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.acceptAssignment = e.target.value;
                            }                             
                            setInputPatientData({ ...inputPatientData })
                          }}>
                          <MenuItem value="Option 1">Option 1</MenuItem>
                          <MenuItem value="Option 2">Option 2</MenuItem>
                        </Select>
                        <FormHelperText />
                      </FormControl>
                    </div>
                    <div className="secondary-form-fields74" style={{ left: isVisible ? "50px" : "" }}>
                      <TextField
                        id={"patientSecInsSECity" + panel.value} value={inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].city !== undefined?inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].city:patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].city}
                        onChange={(e) => {
                          if(inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].city !== null){
                            inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].city = e.target.value;
                          }else{
                            inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].city = e.target.value;
                            patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].city = e.target.value;
                          }                         
                          setInputPatientData({ ...inputPatientData })
                        }}
                        className="secondary-destination-name-input60"
                        color="primary"
                        variant="outlined"
                        type="text"
                        label="SE City"
                        placeholder="Placeholder"
                        size="medium"
                        margin="none"
                      />
                      <TextField
                        id={"patientSecInsCity" + panel.value} value={inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.city !== undefined?inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.city:patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.city}
                        onChange={(e) => {
                          if(inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.city !== null){
                            inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.city = e.target.value;
                          }else{
                            inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.city = e.target.value;
                            patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.city = e.target.value;
                          }                             
                          setInputPatientData({ ...inputPatientData })
                        }}
                        className="secondary-destination-name-input60"
                        color="primary"
                        variant="outlined"
                        type="text"
                        label="City"
                        placeholder="Placeholder"
                        size="medium"
                        margin="none"
                      />
                      <FormControl className="secondary-name-input77" variant="outlined">
                        <InputLabel color="primary">SE State</InputLabel>
                        <Select color="primary" size="medium" label="SE State" name={"patientSecInsSEState" + panel.value} value={inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].state !== undefined?inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].state:patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].state}
                          onChange={(e) => {
                            if(inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].state !== null){
                              inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].state = e.target.value;
                            }else{
                              inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].state = e.target.value;
                              patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.subscriberAddress[0].state = e.target.value;
                            }                              
                            setInputPatientData({ ...inputPatientData })
                          }}>
                          <MenuItem value="">Select</MenuItem>
                          {newStateDropDown}
                        </Select>
                        <FormHelperText />
                      </FormControl>
                      <FormControl className="secondary-name-input77" variant="outlined">
                        <InputLabel color="primary">State</InputLabel>
                        <Select color="primary" size="medium" label="State" name={"patientSecInsState" + panel.value} value={inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.state !== undefined?inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.state:patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.state}
                          onChange={(e) => {
                            if(inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.state !== null){
                              inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.state = e.target.value;
                            }else{
                              inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.state = e.target.value;
                              patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.state = e.target.value;
                            }                            
                            setInputPatientData({ ...inputPatientData })
                          }}>
                          <MenuItem value="">Select</MenuItem>
                          {newStateDropDown}
                        </Select>
                        <FormHelperText />
                      </FormControl>
                    </div>
                    <div className="secondary-form-fields75" style={{ left: isVisible ? "50px" : "" }}>
                      <TextField
                        id={"patientSecInsPlanName" + panel.value} value={inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.planName !== undefined?inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.planName:patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.planName}
                        onChange={(e) => {
                          if(inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.planName !== null){
                            inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.planName = e.target.value;
                          }else{
                            inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.planName = e.target.value;
                            patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.planName = e.target.value;
                          }                  
                          setInputPatientData({ ...inputPatientData })
                        }}
                        className="secondary-destination-name-input60"
                        color="primary"
                        variant="outlined"
                        type="text"
                        label="Plan Name"
                        placeholder="Placeholder"
                        size="medium"
                        margin="none"
                      />
                      <TextField
                        id={"patientSecInsSubscriber" + panel.value} value={inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriber !== undefined?inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriber:patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.subscriber}
                        onChange={(e) => {
                          if(inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriber !== null){
                            inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriber = e.target.value;
                          }else{
                            inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.subscriber = e.target.value;
                            patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.subscriber = e.target.value;
                          }                        
                          setInputPatientData({ ...inputPatientData })
                        }}
                        className="secondary-destination-name-input60"
                        color="primary"
                        variant="outlined"
                        type="text"
                        label="Subscriber"
                        placeholder="Placeholder"
                        size="medium"
                        margin="none"
                      />
                    </div>
                    <FormControl
                      className="secondary-form-fields76"
                      style={{ left: isVisible ? "50px" : "" }}
                      sx={{ width: 735 }}
                      variant="outlined"
                    >
                      <InputLabel color="primary">Secondary Insurance provider</InputLabel>
                      <Select
                        color="primary"
                        size="medium"
                        label="Secondary Insurance provider"
                        name={"patientSecInsTitle" + panel.value} value={inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.title !== undefined?inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.title:patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.title}
                        onChange={(e) => {
                          if(inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.title !== null){
                            inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.title = e.target.value;
                          }else{
                            inputPatientData.insurance[0].secondary[panel.value].insuranceDetails.title = e.target.value;
                            patientRegisteredData.insurance[0].secondary[panel.value].insuranceDetails.title = e.target.value;
                          }                         
                          setInputPatientData({ ...inputPatientData })
                        }}>
                        <MenuItem value="">Select</MenuItem>
                        {newInsuranceProviderDropDown}
                      </Select>
                      <FormHelperText />
                    </FormControl>
                    <div style={{ width: '300px', height: '36px', position: 'absolute', left:isVisible?"302px":"253px", top: '946px' }}>
                      {tabIndex < 10 && <Button className="Patient-datatable-name" style={{ fontFamily: 'Poppins', fontSize: '14px', backgroundColor: '#C9D1E2', borderRadius: '5px', border: '0px', color: '#293241', WebkitTextStroke: 'thin' }} variant="outlined" onClick={createNewTab}>+  Add New Secondary Insurance</Button>}
                    </div>
                  </div>
                </TabPanel>
              ))}
            </TabContext>
          </TabPanel>
        </TabContext>
        <div className="add-patient-insurance-child4" style={{ left: isVisible ? "452.5px" : "" }} />
        <div className="insurance-provider" style={{ left: isVisible ? "476px" : "" }}>Insurance Provider</div>
      </div>
    </>
  </LocalizationProvider>
  : patientSelectId === 8 ?
    <div className="add-patient-family-health-his">

      <div className="add-patient-family-health-his-datatable" style={{ width: isVisible ? "calc(100% - 441px)" : "", left: isVisible ? "441px" : "" }}>
        <DataTable
          value={inputPatientData.familyHealth}
          selectionMode="single" onRowSelect={null}
          rows={50} scrollable={true} style={{ border: '0px' }}
          responsive={true} selection={null}
          onSelectionChange={null}
          emptyMessage="No records found">

          <Column className="cretePatient-GenderOrient" headerStyle={{ background: 'var(--color-gray-100)', width: 'calc(100% - 57%)', fontSize: 'var(--font-size-xs)', paddingTop: '11px', paddingBottom: '11px', lineHeight: '16px', textAlign: 'start', verticalAlign: 'bottom', color: 'darkgrey', fontWeight: 500 }}
            style={{ width: 'calc(100% - 80%)' }} field="name" header="Name" />
          <Column className="cretePatient-GenderOrient" style={{ width: 'calc(100% - 89%)' }} headerStyle={{ background: 'var(--color-gray-100)', width: 'calc(100% - 76%)', fontSize: 'var(--font-size-xs)', paddingTop: '11px', paddingBottom: '11px', lineHeight: '16px', textAlign: 'start', verticalAlign: 'bottom', color: 'darkgrey', fontWeight: 500 }} field="deceadsed" header="Deceased (D)" />
          <Column className="cretePatient-GenderOrient" style={{ width: 'calc(100% - 86%)' }} headerStyle={{ background: 'var(--color-gray-100)', width: 'calc(100% - 79%)', fontSize: 'var(--font-size-xs)', paddingTop: '11px', paddingBottom: '11px', lineHeight: '16px', paddingLeft: '7px', textAlign: 'start', verticalAlign: 'bottom', color: 'darkgrey', fontWeight: 500 }} field="diabetes" header="Diabetes Hypertension Heart" />
          <Column className="cretePatient-GenderOrient" headerStyle={{ background: 'var(--color-gray-100)', width: 'calc(100% - 79%)', fontSize: 'var(--font-size-xs)', paddingTop: '11px', paddingBottom: '11px', lineHeight: '16px', paddingLeft: '37px', textAlign: 'start', verticalAlign: 'bottom', color: 'darkgrey', fontWeight: 500 }} field="disease" header="Disease" />
          <Column className="cretePatient-GenderOrient" headerStyle={{ background: 'var(--color-gray-100)', width: 'calc(100% - 79%)', fontSize: 'var(--font-size-xs)', paddingTop: '11px', paddingBottom: '11px', lineHeight: '16px', paddingLeft: '34px', textAlign: 'start', verticalAlign: 'bottom', color: 'darkgrey', fontWeight: 500 }} field="stroke" header="Stroke" />
          <Column className="cretePatient-GenderOrient" headerStyle={{ background: 'var(--color-gray-100)', width: 'calc(100% - 79%)', fontSize: 'var(--font-size-xs)', paddingTop: '11px', paddingBottom: '11px', lineHeight: '16px', paddingLeft: '30px', textAlign: 'start', verticalAlign: 'bottom', color: 'darkgrey', fontWeight: 500 }} field="mentalIllness" header="Mental Illness (Type?)" />
          <Column className="cretePatient-GenderOrient" headerStyle={{ background: 'var(--color-gray-100)', width: 'calc(100% - 79%)', fontSize: 'var(--font-size-xs)', paddingTop: '11px', paddingBottom: '11px', lineHeight: '16px', paddingLeft: '30px', textAlign: 'start', verticalAlign: 'bottom', color: 'darkgrey', fontWeight: 500 }} field="cancer" header="Cancer (Type?)" />
          <Column className="cretePatient-GenderOrient" headerStyle={{ background: 'var(--color-gray-100)', width: 'calc(100% - 79%)', fontSize: 'var(--font-size-xs)', paddingTop: '11px', paddingBottom: '11px', lineHeight: '16px', paddingLeft: '24px', textAlign: 'start', verticalAlign: 'bottom', color: 'darkgrey', fontWeight: 500 }} field="unknown" header="Unknown" />
          <Column className="cretePatient-GenderOrient" headerStyle={{ background: 'var(--color-gray-100)', width: 'calc(100% - 79%)', fontSize: 'var(--font-size-xs)', paddingTop: '11px', paddingBottom: '11px', lineHeight: '16px', paddingLeft: '24px', textAlign: 'start', verticalAlign: 'bottom', color: 'darkgrey', fontWeight: 500 }} field="other" header="Other" />

        </DataTable>
      </div>
      <FooterSection
        onPreviousContainerClick={() => { setPatientSelectId(patientSelectId = 7); window.scrollTo(0, 0) }}
        onNextContainerClick={() => { setPatientSelectId(patientSelectId = 9); window.scrollTo(0, 0) }}
      />
      <div className="add-patient-familyHealthHis-additional-child3" style={{ width: isVisible ? "calc(100% - 441px)" : "", left: isVisible ? "441px" : "" }} />
      <div className="familyHealthHis" style={{ left: isVisible ? "441px" : "" }} >Family Health History</div>
      <div className="add-patient-familyHealthHis-additional-child4" style={{ left: isVisible ? "218.5px" : "" }} />
    </div>
    : patientSelectId === 9 ?
      <div className="add-patient-social-history">
        <div className="add-patient-social-history-inner" />
        <div className="add-patient-social-history-inner2">
          <div className="cancel-group">
            <SecondaryButton  label="Cancel" secondaryButtonCursor="Create" />
            <SecondaryButton
              label="Previous"
              secondaryButtonCursor="pointer"
              onCancelContainerClick={() => { setPatientSelectId(patientSelectId = 8); window.scrollTo(0, 0) }}
            />
            <PrimaryButton label="Create" onNextContainerClick={handlePageSave} primaryButtonCursor="unset" />
          </div>
        </div>
        <div className="add-patient-social-history-child2" style={{ left: isVisible ? "224.5px" : "" }} />
        <div className="add-patient-social-history-child3" style={{ left: isVisible ? "453px" : "" }} />
        <div className="socialHistoryForm-fields5" style={{ left: isVisible ? "491px" : "" }}>
          <FormControl className="name-input7" variant="outlined">
            <InputLabel color="primary">How many Children?</InputLabel>
            <Select color="primary" size="medium" label="How many Children?" name="patientSocHisNoOfChild" value={inputPatientData.socialHistory[0].noOfChild} onChange={handleInputChange}>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
            </Select>
            <FormHelperText />
          </FormControl>
          <TextField
            id="patientSocHisChildAge1" value={inputPatientData.socialHistory[0].childAge[0]} onChange={handleInputChange}
            className="destination-name-input3"
            color="primary"
            variant="outlined"
            type="text"
            label="Age of Child 1"
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
          <TextField
            id="patientSocHisChildAge2" value={inputPatientData.socialHistory[0].childAge[1]} onChange={handleInputChange}
            className="destination-name-input3"
            color="primary"
            variant="outlined"
            type="text"
            label="Age of Child 2"
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
        </div>
        <div className="socialHistoryForm-fields6" style={{ left: isVisible ? "485px" : "434px" }}>
          <TextField
            id="patientSocHisSmokePerDay" value={inputPatientData.socialHistory[0].smokePerDay} onChange={handleInputChange}
            className="destination-name-input3"
            color="primary"
            variant="outlined"
            type="text"
            label="How many per day?"
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
          <TextField
            id="patientSocHisSmokeYears" value={inputPatientData.socialHistory[0].smokeYears} onChange={handleInputChange}
            className="destination-name-input3"
            color="primary"
            variant="outlined"
            type="text"
            label="For how many years?"
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
        </div>
        <div className="socialHistoryForm-fields7" style={{ left: isVisible ? "487px" : "", position: "absolute" }}>
          <TextField
            id="patientSocHisUsePerDay" value={inputPatientData.socialHistory[0].usePerDay} onChange={handleInputChange}
            className="destination-name-input3"
            color="primary"
            variant="outlined"
            type="text"
            label="How many drinks per day?"
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
          <TextField
            id="patientSocHisUsingTime" value={inputPatientData.socialHistory[0].usingTime} onChange={handleInputChange}
            className="destination-name-input3"
            color="primary"
            variant="outlined"
            type="text"
            label="How many times a week?"
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
        </div>
        <TextField
          id="patientSocHisQuitYear" value={inputPatientData.socialHistory[0].quitYear} onChange={handleInputChange}
          className="destination-name-input9"
          style={{ left: isVisible ? "486px" : "" }}
          sx={{ width: 362.5 }}
          color="primary"
          variant="outlined"
          type="text"
          label="What year did you quit?"
          placeholder="Placeholder"
          size="medium"
          margin="none"
        />
        <div className="label-parent" style={{ left: isVisible ? "866.5px" : "" }}>
          <div className="label3">Are you interested in quitting?</div>
          <RadioGroup name="patientQuitInterest" value={inputPatientData.socialHistory[0].quitIntrest} onChange={handleInputChange}
            row>
            <div className="frame-parent7" style={{ color: 'darkslategray' }}>
              <FormControlLabel
                className="frame-formcontrollabel"
                label="Yes" value="Yes"
                labelPlacement="end"
                control={<Radio color="primary" size="medium" />}
              />
              <FormControlLabel
                className="frame-formcontrollabel"
                label="No" value="No"
                labelPlacement="end"
                control={<Radio color="primary" size="medium" />}
              />
            </div>
          </RadioGroup>
        </div>
        <div className="label-group" style={{ left: isVisible ? "498px" : "" }}>
          <div className="label3">Do you drink caffeine?</div>
          <RadioGroup name="patientCaffine" value={inputPatientData.socialHistory[0].caffine} onChange={handleInputChange}
            row>
            <div className="frame-parent7" style={{ color: 'darkslategray' }}>
              <FormControlLabel
                className="radio-buttongray-icon2"
                label="Yes" value="Yes"
                labelPlacement="end"
                control={<Radio color="primary" size="medium" />}
              />
              <FormControlLabel
                className="radio-buttongray-icon3"
                label="No" value="No"
                labelPlacement="end"
                control={<Radio color="primary" size="medium" />}
              />
            </div>
          </RadioGroup>
        </div>
        <TextField
          id="patientSocHisMigrantSeasonal" value={inputPatientData.socialHistory[0].migrantOrSeasonal} onChange={handleInputChange}
          className="destination-name-input10"
          style={{ left: isVisible ? "863.5px" : "" }}
          sx={{ width: 362.5 }}
          color="primary"
          variant="outlined"
          type="text"
          label="Migrant/Seasonal"
          placeholder="Placeholder"
          size="medium"
          margin="none"
        />
        <TextField
          id="patientSocHisTabaccoUse" value={inputPatientData.socialHistory[0].tabaccoUse} onChange={handleInputChange}
          className="destination-formName-input11"
          style={{ left: isVisible ? "487px" : "" }}
          sx={{ width: 362.5 }}
          color="primary"
          variant="outlined"
          type="text"
          label="Do you use other tobacco products, and if so, what?"
          placeholder="Placeholder"
          size="medium"
          margin="none"
        />
        <div className="label-container" style={{ left: isVisible ? "867.5px" : "" }}>
          <div className="label3">Do you drink alcohol?</div>
          <RadioGroup name="patientSocHisDrinkAlcohol" value={inputPatientData.socialHistory[0].drinkAlcohal} onChange={handleInputChange}
            row>
            <div className="frame-parent7" style={{ color: 'darkslategray' }}>
              <FormControlLabel
                className="radio-buttongray-icon2"
                label="Yes" value="Postal"
                labelPlacement="end"
                control={<Radio color="primary" size="medium" />}
              />
              <FormControlLabel
                className="radio-buttongray-icon3"
                label="No" value="Physical"
                labelPlacement="end"
                control={<Radio color="primary" size="medium" />}
              />
            </div>
          </RadioGroup>
        </div>
        <TextField
          id="patientSocHisRecreationalDrug" value={inputPatientData.socialHistory[0].recreationalDrugs} onChange={handleInputChange}
          className="destination-name-input12"
          style={{ left: isVisible ? "488px" : "" }}
          sx={{ width: 362.5 }}
          color="primary"
          variant="outlined"
          type="text"
          label="Do you use any recreational drugs, and if so, what?"
          placeholder="Placeholder"
          size="medium"
          margin="none"
        />
        <div className="label-parent1" style={{ left: isVisible ? "870.5px" : "" }}>
          <div className="socialHistorylabel6">
            Have you ever had an alcohol or drug problem in the past?
          </div>
          <RadioGroup name="patientSocHisPastAlcohal" value={inputPatientData.socialHistory[0].pastAlcohal} onChange={handleInputChange}
            row>
            <div className="frame-parent7" style={{ color: 'darkslategray' }}>
              <FormControlLabel style={{ top: '10px' }}
                className="radio-buttongray-icon2"
                label="Yes" value="Postal"
                labelPlacement="end"
                control={<Radio color="primary" size="medium" />}
              />
              <FormControlLabel style={{ top: '10px' }}
                className="radio-buttongray-icon3"
                label="No" value="Physical"
                labelPlacement="end"
                control={<Radio color="primary" size="medium" />}
              />
            </div>
          </RadioGroup>
        </div>
        <TextField
          id="patientSocHisOccupation" value={inputPatientData.socialHistory[0].occupation} onChange={handleInputChange}
          className="destination-name-input13"
          style={{ left: isVisible ? "490px" : "" }}
          sx={{ width: 362.5 }}
          color="primary"
          variant="outlined"
          type="text"
          label="Occupation"
          placeholder="Placeholder"
          size="medium"
          margin="none"
        />
        <div className="label-parent2" style={{ left: isVisible ? "871.5px" : "" }}>
          <div className="socialHistorylabel6">Do you have children?</div>
          <RadioGroup name="patientSocHisHaveChild" value={inputPatientData.socialHistory[0].child} onChange={handleInputChange}
            row>
            <div className="frame-parent7" style={{ color: 'darkslategray' }}>
              <FormControlLabel style={{ top: '10px' }}
                className="radio-buttongray-icon2"
                label="Yes" value="Yes"
                labelPlacement="end"
                control={<Radio color="primary" size="medium" />}
              />
              <FormControlLabel style={{ top: '10px' }}
                className="radio-buttongray-icon3"
                label="No" value="No"
                labelPlacement="end"
                control={<Radio color="primary" size="medium" />}
              />
            </div>
          </RadioGroup>
        </div>
        <div className="socialHistoryForm-fields8">
          <TextField
            id="patientSocHisSexInfection" value={inputPatientData.socialHistory[0].sexInfection} onChange={handleInputChange}
            className="destination-name-input3"
            style={{ position: "relative", left: isVisible ? "60px" : "" }}
            color="primary"
            variant="outlined"
            type="text"
            label="Any history of sexually transmitted infections, and if so, what?"
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
        </div>
        <div className="label-parent3" style={{ left: isVisible ? "493px" : "", position: "absolute" }}>
          <div className="socialHistorylabel6">Are you a current smoker?</div>
          <RadioGroup name="patientSocHisSmoker" value={inputPatientData.socialHistory[0].smoker} onChange={handleInputChange}
            row>
            <div className="frame-parent7" style={{ color: 'darkslategray' }}>
              <FormControlLabel
                className="radio-buttongray-icon2"
                label="Yes" value="Postal"
                labelPlacement="end"
                control={<Radio color="primary" size="medium" />}
              />
              <FormControlLabel
                className="radio-buttongray-icon3"
                label="No" value="Physical"
                labelPlacement="end"
                control={<Radio color="primary" size="medium" />}
              />
            </div>
          </RadioGroup>
        </div>
        <div className="label-parent4">
          <div className="socialHistorylabel6"> If no, then have you ever smoked?</div>
          <RadioGroup name="patientSocHisEverSmoked" value={inputPatientData.socialHistory[0].everSmoked} onChange={handleInputChange}
            row>
            <div className="frame-parent7" style={{ color: 'darkslategray' }}>
              <FormControlLabel
                className="radio-buttongray-icon2"
                label="Yes" value="Postal"
                labelPlacement="end"
                control={<Radio color="primary" size="medium" />}
              />
              <FormControlLabel
                className="radio-buttongray-icon3"
                label="No" value="Physical"
                labelPlacement="end"
                control={<Radio color="primary" size="medium" />}
              />
            </div>
          </RadioGroup>
        </div>
        <div className="label-parent5 " style={{ left: isVisible ? "498px" : "439px" }}>
          <div className="socialHistorylabel6">Are you sexually active?</div>
          <RadioGroup name="patientSocHisSexActive" value={inputPatientData.socialHistory[0].sexActive} onChange={handleInputChange}
            row>
            <div className="frame-parent7" style={{ color: 'darkslategray' }}>
              <FormControlLabel
                className="radio-buttongray-icon2"
                label="Yes" value="Postal"
                labelPlacement="end"
                control={<Radio color="primary" size="medium" />}
              />
              <FormControlLabel
                className="radio-buttongray-icon3"
                label="No" value="Physical"
                labelPlacement="end"
                control={<Radio color="primary" size="medium" />}
              />
            </div>
          </RadioGroup>
        </div>
        <div className="label-parent6">
          <div className="socialHistorylabel6">Partner</div>
          <RadioGroup name="patientSocHisPartner" value={inputPatientData.socialHistory[0].partner} onChange={handleInputChange}
            row>
            <div className="frame-parent15" style={{ color: 'darkslategray' }}>
              <FormControlLabel
                className="radio-buttongray-parent22"
                label="Single Partner" value="Postal"
                labelPlacement="end"
                control={<Radio color="primary" size="medium" />}
              />
              <FormControlLabel
                className="radio-buttongray-parent23"
                label="Multiple Partners" value="Physical"
                labelPlacement="end"
                control={<Radio color="primary" size="medium" />}
              />
            </div>
          </RadioGroup>
        </div>
        <div className="add-patient-social-history-child4" style={{ left: isVisible ? "453.5px" : "395.5px" }} />
        <div className="social-history" style={{ left: isVisible ? "462px" : "" }}>Social History</div>
      </div> : <span></span>)}
    </div >

  );


};
const mapStateToProps = (state: any) => {
  const { deviceFormData, getAllPatientData,createPatientData,updatePatientData } = state;
  return {
    deviceFormData, getAllPatientData,createPatientData,updatePatientData
  };
};
export default connect(mapStateToProps)(CreatePatient)