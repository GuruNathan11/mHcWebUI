
import { useState, Dispatch, useEffect } from "react";
import {
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    FormHelperText,
    Select,
    FormControlLabel,
    Checkbox
} from "@mui/material";
import CheckBoxgary from "../../../components/CheckBoxgary";
import "./../Bed/BedMasterConfiguration.css";
import React from "react";
import { connect } from "react-redux";
import bottomImage from './../../../assets/images/mettler_images/bg.svg';
import PatientImmunizationData from "./../../../assets/data/PatientImmunizationData.json";
import { createBedAssignment, getAllBedAssignment } from "../../../store/actions/BedAssignment";
import SecondaryButton from "../../../components/SecondaryButton";
import PrimaryButton from "../../../components/PrimaryButton";
import "../../../components/BottomFooter.css";
import { HttpLogin } from "../../../utils/Http";
import { MobileDateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { getAllStaff } from "../../../store/actions/Staff";
import { createPatientImmunization, getImmunizationByPatientInputId, updatePatientImmunizationById } from "../../../store/actions/PatientImmunization";
import moment from "moment";
import AvatarBigImage from './../../../assets/images/mettler_images/AvatarBigImage.png';
import bloodBag from './../../../assets/images/mettler_images/blood_bag.svg';
import bloodDrop from './../../../assets/images/mettler_images/blood_drop.svg';
import bloodDropNew from './../../../assets/images/mettler_images/blood_dropNew.svg';
import bloodDropNewOne from './../../../assets/images/mettler_images/blood_dropNewOne.svg';
import AvatarDoctorImage from './../../../assets/images/mettler_images/AvatarDoctor.png';
import loaddingFile from '../../../../src/assets/images/tenor.gif';
interface IAddPatientImmunization { }
interface IAddPatientImmunization {
    StaticPage: any;
    dispatch: Dispatch<any>;
    match: any;
    getImmunizationByPatientInputIdData: any;
    createPatientImmunizationData:any;
    updatePatientImmunizationData:any;
    getAllStaffData: any;
    state: {
        nodes: [],
        checked: [],
        expanded: []
    }
}
const AddPatientImmunization: React.FC<IAddPatientImmunization> = ({
    dispatch, getImmunizationByPatientInputIdData, getAllStaffData, match,createPatientImmunizationData,updatePatientImmunizationData


}) => {


    let [inputFormData, setInputFormData] = useState(PatientImmunizationData);
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
    let [AnatomicLocationData, setAnatomicLocationData] = useState(null);
    let [ImmunizationsData, setImmunizationsData] = useState(null);
    let [Routess, setRoutes] = useState(null);
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
        //  console.log(JSON.stringify(decodeFinalId));
        var orgData = JSON.parse(window.localStorage.getItem("LOGINDATA"));
        orgData = orgData.loginInput.organization;
        HttpLogin.axios().get("api/dropdowns/get-all")
            .then((response) => {
                let AnatomicLocation = response.data.data.filter(k => k.dropdown === "anatomicLocation").map((i) => { return i.list })
                setAnatomicLocationData(AnatomicLocation[0]);
                let Immunizations = response.data.data.filter(k => k.dropdown === "Immunization").map((i) => { return i.list })
                setImmunizationsData(Immunizations[0]);
                let Routes = response.data.data.filter(k => k.dropdown === "Route").map((i) => { return i.list })
                setRoutes(Routes[0]);

            })
        //  console.log(JSON.stringify(decodeFinalId))     

        HttpLogin.axios().get("api/patient/getPatient/" + decodeFinalPatientid)
            .then((res) => {
                //  console.log(JSON.stringify(res.data.data))     
                setInputPatientInfo(res.data.data.basicDetails[0].name[0].given+" "+res.data.data.basicDetails[0].name[0].family);
                if (res.data.message.code === "MHC - 0200") {
                    setInputPatientInfo(res.data.data.basicDetails[0].name[0].given+" "+res.data.data.basicDetails[0].name[0].family);
          setPatientImage(res.data.data.basicDetails[0].profile !== ""? res.data.data.basicDetails[0].profile:"");
                    setPatientDateOfBirth(moment(res.data.data.basicDetails[0].birthDate).format('MMM DD,YYYY'));
                    var genderChanges = res.data.data.basicDetails[0].gender === "M" ? "Male" : res.data.data.basicDetails[0].gender === "fm" ? "Female" : "Not Specify";
                    setPatientGender(genderChanges);
                    var ssnValue = res.data.data.basicDetails[0].ssn != undefined ? res.data.data.basicDetails[0].ssn.slice(6, 9) : ""
                    setPatientSSN(ssnValue);
                    var today = new Date();
                    var birthDate = new Date(res.data.data.basicDetails[0].birthDate);
                    // create a date object directly from `dob1` argument
                    var age_now = today.getFullYear() - birthDate.getFullYear();
                    var m = today.getMonth() - birthDate.getMonth();
                    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                        age_now--;
                    }
                    setPatientAge(age_now);
                    //setSpinner(true); 
                } else {
                    alert(res.data.message.description);
                }
            })
        if (decodeFinalId !== "") {
            dispatch(getImmunizationByPatientInputId(decodeFinalPatientid, decodeFinalId));
        }
        dispatch(getAllStaff());
    }, []);
    let newAnatomicLocationInputData = AnatomicLocationData != null && AnatomicLocationData.length > 0 && AnatomicLocationData.map((item, i) => {
        return (
            <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
        )
    })
    let newImmunizationData = ImmunizationsData != null && ImmunizationsData.length > 0 && ImmunizationsData.map((item, i) => {
        return (
            <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
        )
    })
    let newRoutessData = Routess != null && Routess.length > 0 && Routess.map((item, i) => {
        return (
            <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
        )
    })

    const handleInputChange = (event: any) => {
        if (event.target.name === "immunization") {
            inputFormData.immunization = event.target.value;
        } else if (event.target.name === "administeredBy") {
            inputFormData.administeredBy = event.target.value;
        } else if (event.target.name === "route") {
            inputFormData.route = event.target.value;
        } else if (event.target.name === "anatomicLocation") {
            inputFormData.anatomicLocation = event.target.value;
        } else if (event.target.id === "lotNo") {
            inputFormData.lotNo = event.target.value;
        } else if (event.target.name === "series") {
            inputFormData.series = event.target.value;
        } else if (event.target.id === "dosage") {
            inputFormData.dosage = event.target.value;
        } else if (event.target.name === "orderedBy") {
            inputFormData.orderedBy = event.target.value;
        } else if (event.target.id === "administeringByPolicy") {
            inputFormData.administeringByPolicy = event.target.checked;
        } else if (event.target.id === "includeNonVAProviders") {
            inputFormData.includeNonVAProviders = event.target.checked;
        } else if (event.target.id === "comments") {
            inputFormData.comments = event.target.value;
        }

        setInputFormData({ ...inputFormData });
    }
    const [isPatientPageLoaded, setPatientPageLoaded] = useState(false);

    if (!isPatientPageLoaded && !getImmunizationByPatientInputIdData.isLoading) {
          console.log(JSON.stringify(getImmunizationByPatientInputIdData.items.data))

        if (getImmunizationByPatientInputIdData.items.message.code === "MHC - 0200") {
            getImmunizationByPatientInputIdData.items.data.doneDate = getImmunizationByPatientInputIdData.items.data.doneDate !== null ? new Date(moment(getImmunizationByPatientInputIdData.items.data.doneDate, "YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z")):null;
            getImmunizationByPatientInputIdData.items.data.dueDate = getImmunizationByPatientInputIdData.items.data.dueDate !== null ? new Date(moment(getImmunizationByPatientInputIdData.items.data.dueDate, "YYYYMMDDHHmm").format("YYYY-MM-DDThh:mm:ss.000Z")):null;
            getImmunizationByPatientInputIdData.items.data.administrationDate = getImmunizationByPatientInputIdData.items.data.administrationDate !== null ? new Date(moment(getImmunizationByPatientInputIdData.items.data.administrationDate, "YYYYMMDDHHmm").format("YYYY-MM-DDThh:mm:ss.000Z")):null;

            setInputFormData(getImmunizationByPatientInputIdData.items.data);
            setSpinner(false);
        } else {
            setInputFormData({ ...PatientImmunizationData });
            alert(getImmunizationByPatientInputIdData.items.message.description);
        }
        setPatientPageLoaded(true);
    }
    if (!getImmunizationByPatientInputIdData && getImmunizationByPatientInputIdData.isFormSubmit) {

        setTimeout(() => {
            setPatientPageLoaded(false);

        }, (1000));
    }

    const [isPageLoaded, setPageLoaded] = useState(false);

    if (!isPageLoaded && !getAllStaffData.isLoading) {

        if (getAllStaffData.items.message.code === "MHC - 0200") {
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

    const [isPatientImmunizationLoaded, setPatientImmunizationupdateLoaded] = useState(false);

    if (!isPatientImmunizationLoaded && !createPatientImmunizationData.isLoading) { 
        createPatientImmunizationData.items.data.doneDate = createPatientImmunizationData.items.data.doneDate !== null && createPatientImmunizationData.items.data.doneDate !== undefined ? new Date(moment(createPatientImmunizationData.items.data.doneDate, "YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z")):null;
        createPatientImmunizationData.items.data.dueDate = createPatientImmunizationData.items.data.dueDate !== null && createPatientImmunizationData.items.data.dueDate !== undefined ? new Date(moment(createPatientImmunizationData.items.data.dueDate, "YYYYMMDDHHmm").format("YYYY-MM-DDThh:mm:ss.000Z")):null;
        createPatientImmunizationData.items.data.administrationDate = createPatientImmunizationData.items.data.administrationDate !== null && createPatientImmunizationData.items.data.administrationDate !== undefined? new Date(moment(createPatientImmunizationData.items.data.administrationDate, "YYYYMMDDHHmm").format("YYYY-MM-DDThh:mm:ss.000Z")):null;
          setInputFormData(createPatientImmunizationData.items.data);    
      if (createPatientImmunizationData.items.message.code === "MHC - 0200") {
        alert(createPatientImmunizationData.items.message.description);  
        setTimeout(() => {
            window.location.href = "/MettlerVisitPatientdata/"+encryptPatientId+"/"+encryptVisitId; 
          setSpinner(false);
        }, (1000));   
        setPatientImmunizationupdateLoaded(true);    
      } else {
        alert(createPatientImmunizationData.items.message.description);   
        setTimeout(() => {
            setPatientImmunizationupdateLoaded(false);
          setSpinner(false);
        }, (1000));
      }
    
  }
  if (!createPatientImmunizationData && createPatientImmunizationData.isFormSubmit) {
  
      setTimeout(() => {
        setPatientImmunizationupdateLoaded(false);
        setSpinner(false);
      }, (1000));
  }
  
  
  let [ispatientImminizationLoaded, setpatientImminizationLoaded] = useState(false);
  
  if (!ispatientImminizationLoaded && !updatePatientImmunizationData.isLoading) {
    updatePatientImmunizationData.items.data.doneDate = updatePatientImmunizationData.items.data.doneDate !== null && updatePatientImmunizationData.items.data.doneDate !== undefined ? new Date(moment(updatePatientImmunizationData.items.data.doneDate, "YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z")):null;
    updatePatientImmunizationData.items.data.dueDate = updatePatientImmunizationData.items.data.dueDate !== null && updatePatientImmunizationData.items.data.doneDate !== undefined? new Date(moment(updatePatientImmunizationData.items.data.dueDate, "YYYYMMDDHHmm").format("YYYY-MM-DDThh:mm:ss.000Z")):null;
    updatePatientImmunizationData.items.data.administrationDate = updatePatientImmunizationData.items.data.administrationDate !== null && updatePatientImmunizationData.items.data.doneDate !== undefined ? new Date(moment(updatePatientImmunizationData.items.data.administrationDate, "YYYYMMDDHHmm").format("YYYY-MM-DDThh:mm:ss.000Z")):null;
  
    setInputFormData(updatePatientImmunizationData.items.data); 
    if (updatePatientImmunizationData.items.message.code === "MHC - 0200") {    
        alert(updatePatientImmunizationData.items.message.description);   
    
        console.log(JSON.stringify(updatePatientImmunizationData.items));  
        setTimeout(() => {
            window.location.href = "/MettlerVisitPatientdata/"+encryptPatientId+"/"+encryptVisitId; 
          setSpinner(false);
        }, (1000)); 
        setpatientImminizationLoaded(true);  
    } else {
  
      alert(updatePatientImmunizationData.items.message.description);     
      setTimeout(() => {
        setpatientImminizationLoaded(false);
        setSpinner(false);
      }, (1000));    
    }  
  
  }
  
  if (!updatePatientImmunizationData && updatePatientImmunizationData.isFormSubmit) {
    setTimeout(() => {
        setpatientImminizationLoaded(false);
  
    }, (1000));
  }
    const [isValid, setValid] = useState(true);
    const handleClickChange = () => {
        inputFormData.patientId = decryptPatientId;
        inputFormData.lastVisit = decryptVisitId;
        inputFormData.doneDate = inputFormData.doneDate !== null ? (moment(inputFormData.doneDate, "YYYY-MM-DDTHH:mm:ss.000Z").format("YYYYMMDD")) : null;
        inputFormData.dueDate = inputFormData.dueDate !== null ? (moment(inputFormData.dueDate, "YYYY-MM-DDTHH:mm:ss.000Z").format("YYYYMMDDHHmm")) : null;
        inputFormData.administrationDate = inputFormData.administrationDate !== null ? (moment(inputFormData.administrationDate, "YYYY-MM-DDTHH:mm:ss.000Z").format("YYYYMMDDHHmm")) : null;
        if (inputFormData.administrationDate === null || inputFormData.doneDate === null ||
            inputFormData.dueDate === null || inputFormData.administeredBy === "" || inputFormData.immunization === "" || inputFormData.route === "" ||
            inputFormData.lotNo === "" || inputFormData.anatomicLocation === "" || inputFormData.orderedBy === "") {
            inputFormData.dueDate = null;
            inputFormData.administrationDate = null;
            inputFormData.doneDate = null;
            
            alert("Please Enter required data");
        }else if (inputFormData.id === "") {
            setInputFormData({ ...inputFormData });
            setSpinner(true);
            dispatch(createPatientImmunization(inputFormData));              
        } else {
            setInputFormData({ ...inputFormData });
            dispatch(updatePatientImmunizationById(inputFormData));                      
        }

    }
    const handleBackclick = () => {
        window.location.href = "/MettlerVisitPatientdata/" + encryptPatientId + "/" + encryptVisitId;
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
            <div className="bed-details" style={{ height: "1344px" }}>
                <div className="bed-details-child" />
                <div className="bed-details-child1" style={{ height: "1273px" }} />
                <div className="bedline-div" style={{ top: "176px", left: "270px", width: "calc(100% - 477px)" }} />
                <div className="bedexpand-more-24px-parent">
                    <img
                        className="bedexpand-more-24px-icon"
                        alt=""
                        src="/expand-more-24px.svg"
                    />
                    <div className="beddetails" style={{ top: "89px", left: "239px" }}> <i onClick={handleBackclick} style={{ position: "relative", top: "7px", left: "-7px", cursor: "pointer" }} className="large material-icons">arrow_back</i>Add Patient Immunization</div>
                </div>
                <div style={{ top: "6px", background: decryptPatientId != "" ? '#2D56AD' : "#FFF", height: decryptPatientId != "" ? '98px' : '0px', display: 'flex', width: 'calc(100% - 0px)', position: 'absolute', left: "0px" }} >

                    <div id="mettlerEmptyPadding" className="p-col-12 p-md-1">

                        <img style={{width:'60px',height:'60px',position:'relative',left:'21px',top:'23px',borderRadius:patientImage !== ""?"30px":""}} src={patientImage !== ""?patientImage:AvatarBigImage}></img>
                    </div>
                    <div id="mettlerEmptyPadding" style={{ display: 'flex', flexDirection: 'column' }} className="p-col-12 p-md-6">
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ position: 'relative', top: '19px', minWidth: 'max-content', fontSize: '18px' }} className="App-TopBar-PatientName">{inputPatientInfo}</div>
                            <div style={{ position: 'relative', top: '23px', left: '6px', minWidth: 'max-content', fontSize: '14px' }} className="App-TopBar-PatientAge">{patientAge}Years</div>

                            <div className="admit-patient-ss" style={{ width: '110px', height: '24px', background: '#5574B7', border: '1px solid #5574B7', position: 'relative', top: '19px', left: '23px' }}>
                                <div style={{ fontWeight: 400, fontSize: '12px', opacity: 0.6, color: '#FFF' }} className="admit-patient-profileName">SS#:</div>
                                <div style={{ fontWeight: 400, fontSize: '12px', color: '#FFF' }} className="admit-patient-profileName">SS-{patientSSN}</div>
                            </div>
                            <div className="admit-patient-ss" style={{ width: '110px', height: '24px', position: 'relative', left: '40px', top: '19px', background: '#5574B7', border: '1px solid #5574B7' }}>
                                <div style={{ fontWeight: 400, fontSize: '12px', opacity: 0.6, color: '#FFF' }} className="admit-patient-profileName">MR:</div>
                                <div style={{ fontWeight: 400, fontSize: '12px', color: '#FFF' }} className="admit-patient-profileName">MR-345</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                    <div id="mettlerEmptyPadding" className="p-col-12 p-md-5">  </div>

                </div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>

                    <div className="bedorgForm-fields" style={{ top: "289px", display: "flex" }}>
                        <MobileDateTimePicker
                            className="name-input13"
                            label=" Due Date"
                            slotProps={{
                                textField: {
                                    variant: "outlined",
                                    size: "medium",
                                    color: "primary",
                                },
                            }}
                            value={inputFormData.dueDate}
                            onChange={(newValue: any) => {
                                inputFormData.dueDate = newValue;
                                setInputFormData({ ...inputFormData });
                            }}
                        />


                        <MobileDateTimePicker
                            className="name-input13"
                            label="Done Date"
                            slotProps={{
                                textField: {
                                    variant: "outlined",
                                    size: "medium",
                                    color: "primary",
                                },
                            }}
                            value={inputFormData.doneDate}
                            onChange={(newValue: any) => {
                                inputFormData.doneDate = newValue;
                                setInputFormData({ ...inputFormData });
                            }}
                        />

                    </div>

                    <div className="bedorgForm-fields2" style={{ top: "380px", position: "absolute", flexDirection: "row-reverse" }}>
                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span> Administered By
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Administered By" name="administeredBy" value={inputFormData.administeredBy} onChange={handleInputChange}>
                                <MenuItem value="Vital Unit1">Vital Unit1</MenuItem>
                                <MenuItem value="Vital Unit2">Vital Unit2</MenuItem>
                                <MenuItem value="Vital Unit3">Vital Unit3</MenuItem>
                            </Select>
                            <FormHelperText />
                        </FormControl>

                        <MobileDateTimePicker
                            className="name-input13"
                            label="Administration Date"
                            slotProps={{
                                textField: {
                                    variant: "outlined",
                                    size: "medium",

                                    color: "primary",
                                },
                            }}
                            value={inputFormData.administrationDate}
                            onChange={(newValue: any) => {
                                inputFormData.administrationDate = newValue;
                                setInputFormData({ ...inputFormData });
                            }}
                        />

                    </div>
                    <div className="bedorgForm-fields3" style={{ position: "absolute", display: "flex", top: "472px" }}>
                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span>Route
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Route" name="route" value={inputFormData.route} onChange={handleInputChange}>
                                {newRoutessData}
                            </Select>
                            <FormHelperText />
                        </FormControl>
                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span>Anatomic Location
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Anatomic Location" name="anatomicLocation" value={inputFormData.anatomicLocation} onChange={handleInputChange}>
                                {newAnatomicLocationInputData}
                            </Select>
                            <FormHelperText />
                        </FormControl>
                    </div>



                    <div className="bedorgForm-fields8" style={{ flexDirection: "row-reverse" }}>

                        <TextField
                            id="lotNo" value={inputFormData.lotNo} onChange={handleInputChange}
                            className="name-input13"
                            color="primary"
                            variant="outlined"
                            type="number"
                            label="Lot Number"
                            placeholder="Placeholder"
                            size="medium"
                            margin="none"
                        />

                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span >Immunization
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Immunization" name="immunization" value={inputFormData.immunization} onChange={handleInputChange}>
                               {newImmunizationData}
                            </Select>
                            <FormHelperText />
                        </FormControl>
                    </div>
                    <div className="bedorgForm-fields3" style={{ position: "absolute", display: "flex", top: "572px" }}>
                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span>Series
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Series" name="series" value={inputFormData.series} onChange={handleInputChange}>
                                <MenuItem value="Series1">Series 1</MenuItem>
                                <MenuItem value="Series2">Series2</MenuItem>
                                <MenuItem value="Series3">Series 3</MenuItem>
                            </Select>
                            <FormHelperText />
                        </FormControl>
                        <TextField
                            id="dosage" value={inputFormData.dosage} onChange={handleInputChange}
                            className="name-input13"
                            color="primary"
                            variant="outlined"
                            type="text"
                            label="Dosage"
                            placeholder="Placeholder"
                            size="medium"
                            margin="none"
                        />
                    </div>
                    <div className="bedorgForm-fields3" style={{ position: "absolute", display: "flex", top: "672px", gap: "59px" }}>
                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span>Ordered By
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Ordered By" name="orderedBy" value={inputFormData.orderedBy} onChange={handleInputChange}>
                                <MenuItem value="Ordered By1">Ordered By 1</MenuItem>
                                <MenuItem value="Ordered By2">Ordered By 2</MenuItem>
                                <MenuItem value="Ordered By3">Ordered By 3</MenuItem>
                            </Select>
                            <FormHelperText />
                        </FormControl>
                        <FormControlLabel
                            style={{ position: "relative", top: "6px", left: "9px" }}
                            label={<span style={{ color: "#000000" }}>Administering by Policy</span>}
                            labelPlacement="end"
                            control={<Checkbox size="medium" value={inputFormData.administeringByPolicy} id="administeringByPolicy" />}
                            onChange={handleInputChange}
                        />
                        <CheckBoxgary
                            checkBoxgaryWidth="unset"
                            checkBoxgaryHeight="unset"
                        />
                    </div>
                    <div className="bedorgForm-fields3" style={{ position: "absolute", display: "flex", top: "700px", gap: "49px" }}>

                        <FormControlLabel
                            style={{ position: "relative", top: "38px", left: "9px" }}
                            label={<span style={{ color: "#000000" }}>Indude Non-VA Providers</span>}
                            labelPlacement="end"
                            control={<Checkbox size="medium" value={inputFormData.includeNonVAProviders} id="includeNonVAProviders" />}
                            onChange={handleInputChange}
                        />
                        <CheckBoxgary
                            checkBoxgaryWidth="unset"
                            checkBoxgaryHeight="unset"
                        />
                    </div>


                    <div className="bedorgForm-fields3" style={{ position: "absolute", display: "flex", flexDirection: "column", top: "815px" }}>
                        <div style={{ fontWeight: "bold", fontSize: "16px", lineHeight: "24px", letterSpacing: "0.15px", color: "#000000" }}>Comments</div>
                        <div style={{ font: "poppins", fontWeight: "bold", fontSize: "15px", lineHeight: "22.5px", color: "#3F3F46" }}>Robert<span style={{ left: "12px", position: "relative", font: "poppins", fontWeight: "lighter", fontSize: "15px", lineHeight: "22.5px", color: "#9DA1C3" }}>Jun-25, 2021 at 17:13</span></div>
                        <div style={{ position: "relative", font: "poppins", fontWeight: "lighter", fontSize: "14px", lineHeight: "21px", color: "#172B4D" }}>The objective of genuine health care reform must be premium</div>
                        <div style={{ top: "52px", position: "relative", font: "poppins", fontWeight: "lighter", fontSize: "15px", lineHeight: "22.5px", color: "#3F3F46" }}>Add Comment</div>

                    </div>
                    <div className="bedorgForm-fields3" style={{ display: "flex", top: "1006px" }}>
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
                </LocalizationProvider >
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


            </div >
        </>
    );

};
const mapStateToProps = (state: any) => {
    const { deviceFormData, getImmunizationByPatientInputIdData, getAllStaffData,createPatientImmunizationData,updatePatientImmunizationData } = state;
    return {
        deviceFormData, getImmunizationByPatientInputIdData, getAllStaffData,createPatientImmunizationData,updatePatientImmunizationData
    };
};

export default connect(mapStateToProps)(AddPatientImmunization)




