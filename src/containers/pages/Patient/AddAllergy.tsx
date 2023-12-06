
import React, { useState, useCallback, Dispatch, useEffect } from "react";
import {
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    FormHelperText,
    Select,
    Button,
    Icon,
    RadioGroup,
    FormControlLabel,
    Radio,
    Checkbox,
    colors,
} from "@mui/material";
import "./../Bed/BedMasterConfiguration.css";

import { connect } from "react-redux";
import bottomImage from './../../../assets/images/mettler_images/bg.svg';
import PatientAllergyData from "./../../../assets/data/PatientAllergyData.json";
import SecondaryButton from "../../../components/SecondaryButton";
import PrimaryButton from "../../../components/PrimaryButton";
import "../../../components/BottomFooter.css";
import { HttpLogin } from "../../../utils/Http";
import { DatePicker, LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { createPatientAllergy, getAllergyByPatientInputId, updatePatientAllergyById } from "../../../store/actions/PatientAllergy";
import moment from "moment";
import { getAllStaff } from "../../../store/actions/Staff";
import AvatarBigImage from './../../../assets/images/mettler_images/AvatarBigImage.png';
import bloodBag from './../../../assets/images/mettler_images/blood_bag.svg';
import bloodDrop from './../../../assets/images/mettler_images/blood_drop.svg';
import bloodDropNew from './../../../assets/images/mettler_images/blood_dropNew.svg';
import bloodDropNewOne from './../../../assets/images/mettler_images/blood_dropNewOne.svg';
import AvatarDoctorImage from './../../../assets/images/mettler_images/AvatarDoctor.png';
import loaddingFile from '../../../../src/assets/images/tenor.gif';

interface IAddAllergy { }
interface IAddAllergy {
    StaticPage: any;
    dispatch: Dispatch<any>;
    match: any;
    getAllergyByPatientInputIdData: any;
    createPatientAllergyData:any;
    updatePatientAllergyData:any;
    getAllStaffData: any;
    state: {
        nodes: [],
        checked: [],
        expanded: []
    }
}
const AddAllergy: React.FC<IAddAllergy> = ({
    dispatch, match, getAllergyByPatientInputIdData, getAllStaffData,createPatientAllergyData,updatePatientAllergyData


}) => {


    let [inputFormData, setInputFormData] = useState(PatientAllergyData);
    let [encryptPatientId, setEncryptPatientId] = useState(null);
    let [decryptPatientId, setDecryptPatientId] = useState(null);
    let [encryptVisitId, setEncryptVisitId] = useState(null);
    let [decryptVisitId, setDecryptVisitId] = useState(null);
    let [encryptId, setEncryptId] = useState(null);
    let [decryptId, setDecryptId] = useState(null);
    
    let [getStaffDataItems, setGetStaffDataItems] = useState(new Array<any>());
    let [inputOrgData, setInputOrgData] = useState("");
     let [patientSSN, setPatientSSN] = useState(null);
  let [patientImage, setPatientImage] = useState("");
    let [patientGender, setPatientGender] = useState(null);
    let [patientDateOfBirth, setPatientDateOfBirth] = useState(null);
    let [inputPatientInfo, setInputPatientInfo] = useState(null);
    let [patientAge, setPatientAge] = useState(null);
    let [AllergyData, setAllergyData] = useState(null);
    let [NatureOfReactionData, setNatureOfReactionData] = useState(null);
    let [SymptomsData, setSymptomsData] = useState(null);
    let [severitys, setseverity] = useState(null);
    const [spinner, setSpinner] = useState(false);
    
    useEffect(() => {
        setSpinner(true); 
        var encryptInitial = match.params.patientid;
        setEncryptPatientId(encryptInitial);
        var CryptoJS = require("crypto-js");
        let decodePatientid = decodeURIComponent(encryptInitial);
        let decodeFinalPatientid = CryptoJS.AES.decrypt(decodePatientid.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
        setDecryptPatientId(decodeFinalPatientid);
        var encryptVisitInitial = match.params.visitId;
        setEncryptVisitId(encryptVisitInitial);
        let decodeVisitid = decodeURIComponent(encryptVisitInitial);
        let decodeFinalVisitid = CryptoJS.AES.decrypt(decodeVisitid.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
        setDecryptVisitId(decodeFinalVisitid);
        var encryptIdInitial = match.params.id;
        setEncryptId(encryptIdInitial);
        let decodeId = decodeURIComponent(encryptIdInitial);
        let decodeFinalId = CryptoJS.AES.decrypt(decodeId.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
        setDecryptId(decodeFinalId);
        console.log(JSON.stringify(decodeFinalPatientid));
        console.log(JSON.stringify(decodeFinalVisitid));
        var orgData = JSON.parse(window.localStorage.getItem("LOGINDATA"));        
        orgData = orgData.loginInput.organization;
        HttpLogin.axios().get("api/org/getById/" + orgData)
            .then((res) => {
                if (res.data.message.code === "MHC - 0200") {
                    setInputOrgData(res.data.data.organizationdetails[0].name);
                } else {
                    setInputOrgData("");
                }
            })       
        HttpLogin.axios().get("api/dropdowns/get-all")
        .then((response) => {
            let  AllergyInputData = response.data.data.filter(k=>k.dropdown === "allergyName").map((i) => { return i.list })        
            setAllergyData(AllergyInputData[0]);
            let  NatureOfReaction = response.data.data.filter(k=>k.dropdown === "natureOfReaction").map((i) => { return i.list })        
            setNatureOfReactionData(NatureOfReaction[0]);
            let  Symptoms = response.data.data.filter(k=>k.dropdown === "symptoms").map((i) => { return i.list })        
            setSymptomsData(Symptoms[0]);
            let  severity = response.data.data.filter(k=>k.dropdown === "Severity").map((i) => { return i.list })        
            setseverity(severity[0]);
        })
        HttpLogin.axios().get("api/patient/getPatient/" + decodeFinalPatientid)
            .then((response) => {
                //     console.log(JSON.stringify(response.data.data))     
                setInputPatientInfo(response.data.data.basicDetails[0].name[0].given+" "+response.data.data.basicDetails[0].name[0].family);
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
    
        if (decodeFinalId !== "") {
            dispatch(getAllergyByPatientInputId(decodeFinalPatientid, decodeFinalId));
        }
        dispatch(getAllStaff());
    }, []);

    let newAllergyInputData = AllergyData != null && AllergyData.length > 0 && AllergyData.map((item, i) => {
        return (
          <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
        )
      })
      let newNatureOfReactionInputData = NatureOfReactionData != null && NatureOfReactionData.length > 0 && NatureOfReactionData.map((item, i) => {
        return (
          <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
        )
      })
      let newSymptomsInputData = SymptomsData != null && SymptomsData.length > 0 && SymptomsData.map((item, i) => {
        return (
          <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
        )
      })
      let newSeverityInputData = severitys != null && severitys.length > 0 && severitys.map((item, i) => {
        return (
          <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
        )
      })

    const handleInputChange = (event: any) => {
        const {
            target: { value },
        } = event;
        if (event.target.name === "allergyType") {
            inputFormData.allergyType = event.target.value;
        } else if (event.target.name === "causativeAgentName") {
            inputFormData.causativeAgentName = event.target.value;
        } else if (event.target.name === "natureOfReaction") {
            inputFormData.natureOfReaction = event.target.value;
        } else if (event.target.name === "allergySeverity") {
            inputFormData.allergySeverity = event.target.value;
        } else if (event.target.name === "symptoms") {
            inputFormData.symptoms = typeof value === 'string' ? value.split(',') : value;
        } else if (event.target.id === "comments") {
            inputFormData.comments = event.target.value;
        } else if (event.target.name === "physicianName") {
            inputFormData.physicianName = event.target.value;
        } else if (event.target.name === "observedHistorical") {
            inputFormData.observed = event.target.value;
        } else if (event.target.id === "inactive") {
            inputFormData.inactive = event.target.checked;
        }

        setInputFormData({ ...inputFormData });
    }
    const [isPatientPageLoaded, setPatientPageLoaded] = useState(false);

    if (!isPatientPageLoaded && !getAllergyByPatientInputIdData.isLoading) {
        if (getAllergyByPatientInputIdData.items !== undefined) {
            if (getAllergyByPatientInputIdData.items.message.code === "MHC - 0200") {
                getAllergyByPatientInputIdData.items.data.dateOfOnset = new Date(moment(getAllergyByPatientInputIdData.items.data.dateOfOnset, "YYYYMMDDHHmm").format("YYYY-MM-DDTHH:mm:ss.000Z"));
                getAllergyByPatientInputIdData.items.data.observedDetails.reactionDateTime = new Date(moment(getAllergyByPatientInputIdData.items.data.observedDetails.reactionDateTime, "YYYYMMDDHHmm").format("YYYY-MM-DDThh:mm:ss.000Z"));
                setInputFormData(getAllergyByPatientInputIdData.items.data);
                setSpinner(false);
            } else {
                setInputFormData({ ...inputFormData });
                alert(getAllergyByPatientInputIdData.items.message.description);
            }
        } else {
            setInputFormData({ ...PatientAllergyData })
        }

        setPatientPageLoaded(true);
    }
    if (!getAllergyByPatientInputIdData && getAllergyByPatientInputIdData.isFormSubmit) {

        setTimeout(() => {
            setPatientPageLoaded(false);

        }, (1000));
    }

    const [isPageLoaded, setPageLoaded] = useState(false);

    if (!isPageLoaded && !getAllStaffData.isLoading) {
      
        if (getAllStaffData.items.message.code === "MHC - 0200") {
            console.log(JSON.stringify(getAllStaffData.items));
            setGetStaffDataItems(getAllStaffData.items.data.filter(t => t.organization === inputOrgData));
            setSpinner(false);
        } else {
            setGetStaffDataItems([]);
            alert(getAllStaffData.items.message.description);
        }
        setPageLoaded(true)
    }
    if (!getAllStaffData && getAllStaffData.isFormSubmit) {

        setTimeout(() => {
            setPageLoaded(false);

        }, (1000));
    }

    const [isAddAllergyupdateLoaded, setAddAllergyupdateLoaded] = useState(false);

    if (!isAddAllergyupdateLoaded && !createPatientAllergyData.isLoading) { 
        createPatientAllergyData.items.data.dateOfOnset = createPatientAllergyData.items.data.dateOfOnset !== null && createPatientAllergyData.items.data.dateOfOnset !== undefined ? new Date(moment(createPatientAllergyData.items.data.dateOfOnset, "YYYYMMDDHHmm").format("YYYY-MM-DDTHH:mm:ss.000Z")):null;
        createPatientAllergyData.items.data.observedDetails.reactionDateTime = createPatientAllergyData.items.data.observedDetails.reactionDateTime !== null && createPatientAllergyData.items.data.observedDetails.reactionDateTime !== undefined ? new Date(moment(createPatientAllergyData.items.data.observedDetails.reactionDateTime, "YYYYMMDDHHmm").format("YYYY-MM-DDThh:mm:ss.000Z")):null; 
          setInputFormData(createPatientAllergyData.items.data);    
      if (createPatientAllergyData.items.message.code === "MHC - 0200") {
        alert(createPatientAllergyData.items.message.description);  
        setTimeout(() => {
            window.location.href = "/MettlerVisitPatientdata/"+encryptPatientId+"/"+encryptVisitId; 
          setSpinner(false);
        }, (1000));   
        setAddAllergyupdateLoaded(true);    
      } else {
        alert(createPatientAllergyData.items.message.description);   
        setTimeout(() => {
            setAddAllergyupdateLoaded(false);
          setSpinner(false);
        }, (1000));
      }
    
  }
  if (!createPatientAllergyData && createPatientAllergyData.isFormSubmit) {
  
      setTimeout(() => {
        setAddAllergyupdateLoaded(false);
        setSpinner(false);
      }, (1000));
  }
  
  const handleBackclick = () => {
    window.location.href = "/MettlerVisitPatientdata/"+encryptPatientId+"/"+encryptVisitId;
  }
  let [isAddAllergypatientLoaded, setAddAllergypatientLoaded] = useState(false);
  
  if (!isAddAllergypatientLoaded && !updatePatientAllergyData.isLoading) {
    updatePatientAllergyData.items.data.dateOfOnset = updatePatientAllergyData.items.data.dateOfOnset !== null && updatePatientAllergyData.items.data.dateOfOnset !== undefined ? new Date(moment(updatePatientAllergyData.items.data.dateOfOnset, "YYYYMMDDHHmm").format("YYYY-MM-DDTHH:mm:ss.000Z")):null;
    updatePatientAllergyData.items.data.observedDetails.reactionDateTime = updatePatientAllergyData.items.data.observedDetails.reactionDateTime !== null && updatePatientAllergyData.items.data.observedDetails.reactionDateTime !== undefined ? new Date(moment(updatePatientAllergyData.items.data.observedDetails.reactionDateTime, "YYYYMMDDHHmm").format("YYYY-MM-DDThh:mm:ss.000Z")):null; 
  
    setInputFormData(updatePatientAllergyData.items.data); 
    if (updatePatientAllergyData.items.message.code === "MHC - 0200") {    
        alert(updatePatientAllergyData.items.message.description);   
    
        console.log(JSON.stringify(updatePatientAllergyData.items));  
        setTimeout(() => {
            window.location.href = "/MettlerVisitPatientdata/"+encryptPatientId+"/"+encryptVisitId;
          setSpinner(false);
        }, (1000)); 
        setAddAllergypatientLoaded(true);  
    } else {
  
      alert(updatePatientAllergyData.items.message.description);     
      setTimeout(() => {
        setAddAllergypatientLoaded(false);
        setSpinner(false);
      }, (1000));    
    }  
  
  }
  
  if (!updatePatientAllergyData && updatePatientAllergyData.isFormSubmit) {
    setTimeout(() => {
        setAddAllergypatientLoaded(false);
  
    }, (1000));
  }

  
    const [isValid, setValid] = useState(true);
    const handleClickChange = () => {
        inputFormData.patientId = decryptPatientId;
        inputFormData.lastVisit = decryptVisitId;
        inputFormData.dateOfOnset = inputFormData.dateOfOnset !== null ? (moment(inputFormData.dateOfOnset, "YYYY-MM-DDTHH:mm:ss.000Z").format("YYYYMMDDHHmm")) : null;
        inputFormData.observedDetails.reactionDateTime = inputFormData.observedDetails.reactionDateTime !== null ? (moment(inputFormData.observedDetails.reactionDateTime, "YYYY-MM-DDTHH:mm:ss.000Z").format("YYYYMMDDHHmm")) : null;
        console.log(JSON.stringify(inputFormData));
        if (inputFormData.causativeAgentName === "" || inputFormData.natureOfReaction === "" || inputFormData.allergySeverity === "" || inputFormData.observedDetails.reactionDateTime === null || inputFormData.dateOfOnset === null) {
            inputFormData.observedDetails.reactionDateTime = null;
            inputFormData.dateOfOnset = null
            alert("Please Enter required data");
        } else if (inputFormData.id === "") {
            setInputFormData({ ...inputFormData });
            dispatch(createPatientAllergy(inputFormData));                     
        } else {
            setInputFormData({ ...inputFormData });
            dispatch(updatePatientAllergyById(inputFormData));                      
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
            <div className="bed-details" style={{ height: "1140px" }}>
                <div className="bed-details-child" />
                <div className="bed-details-child1" style={{ height: "1298px" }} />
                <div className="bedline-div" style={{ top: "185.5px", left: "270px", width: "calc(100% - 477px)" }} />
                <div className="bedexpand-more-24px-parent">
                    <img
                        className="bedexpand-more-24px-icon"
                        alt=""
                        src="/expand-more-24px.svg"
                    />
                    <div className="beddetails" style={{ top: "89px", left: "239px" }}> <i onClick={handleBackclick} style={{ position: "relative", top: "6px", left: "-7px", cursor: "pointer" }} className="large material-icons" >arrow_back</i>Add Allergy</div>
                </div>
                <div style={{ top: "6px", background: decryptPatientId != "" ? '#2D56AD' : "#FFF", height: decryptPatientId != "" ? '98px' : '0px', display: 'flex', width: 'calc(100% - 0px)', position: 'absolute', left: "0px" }} >
                    <div id="mettlerEmptyPadding" className="p-col-12 p-md-1">

                        <div id="mettlerEmptyPadding" className="p-col-12 p-md-1">
                            <img style={{width:'60px',height:'60px',position:'relative',left:'21px',top:'23px',borderRadius:patientImage !== ""?"30px":""}} src={patientImage !== ""?patientImage:AvatarBigImage}></img>
                        </div>
                        <div id="mettlerEmptyPadding" style={{ display: 'flex', flexDirection: 'column' }} className="p-col-12 p-md-6">
                            <div style={{ display: 'flex', flexDirection: 'row', position: "absolute", top: "7px", left: "97px" }}>
                                <div style={{ position: 'relative', top: '19px', minWidth: 'max-content', fontSize: '18px' }} className="App-TopBar-PatientName">{inputPatientInfo}</div>
                                <div style={{ position: 'relative', top: '23px', left: '6px', minWidth: 'max-content', fontSize: '14px' }} className="App-TopBar-PatientAge">{patientAge} Years</div>

                                <div className="admit-patient-ss" style={{ width: '110px', height: '24px', background: '#5574B7', border: '1px solid #5574B7', position: 'relative', top: '19px', left: '23px' }}>
                                    <div style={{ fontWeight: 400, fontSize: '12px', opacity: 0.6, color: '#FFF' }} className="admit-patient-profileName">SS#:</div>
                                    <div style={{ fontWeight: 400, fontSize: '12px', color: '#FFF' }} className="admit-patient-profileName">SS-{patientSSN}</div>
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
                <LocalizationProvider dateAdapter={AdapterDateFns}>

                    <div className="bedorgForm-fields" style={{ top: "439px", display: "flex", flexDirection: "row-reverse" }}>
                        <MobileDateTimePicker
                            className="name-input13"
                            label="Origination Date"
                            slotProps={{
                                textField: {
                                    variant: "outlined",
                                    size: "medium",
                                    color: "primary",
                                },
                            }}
                            value={inputFormData.dateOfOnset}
                            onChange={(newValue: any) => {
                                inputFormData.dateOfOnset = newValue;
                                setInputFormData({ ...inputFormData });
                            }}
                        />


                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span >Allergy Name
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Allergy Name" name="causativeAgentName" value={inputFormData.causativeAgentName} onChange={handleInputChange}>
                               {newAllergyInputData}
                            </Select>
                            <FormHelperText />
                        </FormControl>
                    </div>

                    <div className="bedorgForm-fields2" style={{ top: "533px" }}>
                        <MobileDateTimePicker
                            className="name-input13"
                            label="Reaction Date/Time"
                            value={inputFormData.observedDetails.reactionDateTime}
                            onChange={(newValue: any) => {
                                inputFormData.observedDetails.reactionDateTime = newValue;
                                setInputFormData({ ...inputFormData });
                            }}
                            slotProps={{
                                textField: {
                                    variant: "outlined",
                                    size: "medium",

                                    color: "primary",
                                },
                            }}
                        />


                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span >Nature of Reaction
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Nature of Reaction" name="natureOfReaction" value={inputFormData.natureOfReaction} onChange={handleInputChange}>
                               {newNatureOfReactionInputData}
                            </Select>
                            <FormHelperText />
                        </FormControl>
                    </div>
                    <div className="bedorgForm-fields3" style={{ position: "absolute", display: "flex", top: "626px" }}>
                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span>Severity
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Severity" name="allergySeverity" value={inputFormData.allergySeverity} onChange={handleInputChange}>
                               {newSeverityInputData}
                            </Select>
                            <FormHelperText />
                        </FormControl>
                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span>Symptoms
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Symptoms" multiple={true} name="symptoms" value={inputFormData.symptoms} onChange={handleInputChange}>
                              {newSymptomsInputData}
                            </Select>
                            <FormHelperText />
                        </FormControl>
                    </div>

                    <div className="bedorgForm-fields3" style={{ position: "absolute", display: "flex", flexDirection: "column", top: "713px" }}>
                        <div style={{ fontWeight: "bold", fontSize: "16px", lineHeight: "24px", letterSpacing: "0.15px", color: "#000000" }}>Comments</div>
                        <div style={{ font: "poppins", fontWeight: "bold", fontSize: "15px", lineHeight: "22.5px", color: "#3F3F46" }}>{inputPatientInfo}<span style={{ left: "12px", position: "relative", font: "poppins", fontWeight: "lighter", fontSize: "15px", lineHeight: "22.5px", color: "#9DA1C3" }}>{inputFormData.enteredDate !== null && inputFormData.enteredDate !== undefined ? moment(inputFormData.enteredDate, "YYYYMMDDhhmmss").format("MMM-DD, YYYY") : null} at {inputFormData.enteredDate !== null && inputFormData.enteredDate !== undefined ? moment(inputFormData.enteredDate, "YYYYMMDDhhmm").format("hh:mm") : null}</span></div>
                        <div style={{ position: "relative", font: "poppins", fontWeight: "lighter", fontSize: "14px", lineHeight: "21px", color: "#172B4D" }}>The objective of genuine health care reform must be premium</div>
                        <div style={{ top: "52px", position: "relative", font: "poppins", fontWeight: "lighter", fontSize: "15px", lineHeight: "22.5px", color: "#3F3F46" }}>Add Comment</div>

                    </div>
                    <div className="bedorgForm-fields3" style={{ display: "flex", top: "913px" }}>
                        <TextField
                            id="comments" value={inputFormData.comments} onChange={handleInputChange}
                            className="name-input13"
                            color="primary"
                            variant="outlined"
                            type="text"
                            placeholder="Placeholder"
                            size="medium"
                            margin="none"
                        />
                        {/*
                        <div style={{ position: "absolute", left: "495px", top: "64px", gap: "23px", display: "flex" }} >
                            <div style={{ borderRadius: "4px", width: "40px", height: "40px", backgroundColor: "#E4EAF0", color: "#0000008A", cursor: "pointer" }}><i className="large material-icons" style={{ position: "absolute", top: "9px", left: "7px" }} >close</i></div>
                            <div style={{ borderRadius: "4px", width: "40px", height: "40px", backgroundColor: "#133C93", color: "#FFFFFF", cursor: "pointer" }}><i className="large material-icons" style={{ position: "absolute", top: "9px", left: "68px" }}>check</i></div>
                        </div>*/}
                    </div>
                    <Checkbox className="frame-parent7" style={{ position: "absolute", top: "260px", left: "290px", color: inputFormData.inactive === false ? "rgba(0, 0, 0, 0.6)" : "" }} id="inactive" checked={inputFormData.inactive} onChange={handleInputChange} inputProps={{ 'aria-label': 'controlled' }} />
                    <div style={{ position: "relative", top: "271px", left: "335px", color: 'darkslategray' }}>Inactive Allergy</div>
                    {/*  <RadioGroup name="inactive" value={inputFormData.inactive} onChange={handleInputChange}
                        style={{ position: "absolute", top: "272px", left: "290px" }}
                        row>
                        <div className="frame-parent7" style={{ color: 'darkslategray', flexWrap: "nowrap", gap: "30px" }}>
                            <FormControlLabel
                                style={{ position: "relative", top: "-14px", left: "9px" }}
                                label="Inactive Allergy" value={inputFormData.inactive}
                                labelPlacement="end"
                                control={<Checkbox color="primary" size="medium" />}

                            />   
                              </div>
                        </RadioGroup>   */}
                    <RadioGroup name="observedHistorical" value={inputFormData.observed} onChange={handleInputChange}
                        style={{ position: "absolute", top: "158px", left: "290px" }}
                        row>
                        <div className="frame-parent7" style={{ color: 'darkslategray', flexWrap: "nowrap", gap: "30px", position: 'relative', left: '226px', top: '123px' }}>
                            <FormControlLabel
                                style={{ left: "129px" }}
                                className="radio-buttongray-icon3"
                                label="Observed" value="Observed"
                                labelPlacement="end"
                                control={<Radio color="primary" size="medium" />}
                            />
                            <FormControlLabel
                                style={{ left: "229px" }}
                                className="radio-buttongray-icon3"
                                label="Historical" value="Historical"
                                labelPlacement="end"
                                control={<Radio color="primary" size="medium" />}
                            />
                        </div>
                    </RadioGroup>
                    <div className="bedorgForm-fields8" style={{ top: "341px" }}>
                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span >Originator
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Position" id="physicianName" name="physicianName" value={inputFormData.physicianName} onChange={handleInputChange}>
                                {getStaffDataItems.filter(i => i.role === "Physician Assistant").map((newData, i) => {
                                    return (
                                        <MenuItem key={i} value={newData.id}>{newData.name[0].given+" "+newData.name[0].family}</MenuItem>
                                    )
                                })}
                            </Select>
                            <FormHelperText />
                        </FormControl>
                    </div>
                </LocalizationProvider>
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

                            label="Add"
                            primaryButtonCursor="pointer"
                            onNextContainerClick={handleClickChange}
                        />
                    </div>
                </div>


            </div>
        </>
    );

};
const mapStateToProps = (state: any) => {
    const { deviceFormData, getAllergyByPatientInputIdData, getAllStaffData,createPatientAllergyData,updatePatientAllergyData } = state;
    return {
        deviceFormData, getAllergyByPatientInputIdData, getAllStaffData,createPatientAllergyData,updatePatientAllergyData
    };
};

export default connect(mapStateToProps)(AddAllergy)




