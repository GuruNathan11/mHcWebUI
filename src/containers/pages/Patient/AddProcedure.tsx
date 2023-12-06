
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
    RadioGroup,
    FormControlLabel,
    Radio,
    colors,
} from "@mui/material";
import AvatarBigImage from './../../../assets/images/mettler_images/AvatarBigImage.png';
import HIPAAComplianceContainer from "./../../../components/HIPAAComplianceContainer";
import "./../Bed/BedMasterConfiguration.css";
import React from "react";
import { connect } from "react-redux";
import bottomImage from './../../../assets/images/mettler_images/bg.svg';
import newImage from './../../../assets/images/mettler_images/rectangle-5999.svg';
import PatientOrderProcedureData from "./../../../assets/data/PatientOrderProcedureData.json";
import { createOrderProcedureControl, getOrderProcedureByControlInput, updateOrderProcedureControlById } from "../../../store/actions/OrderProcedureControl";
import * as Constants from "./../Constants/ConstantValues";
import SecondaryButton from "../../../components/SecondaryButton";
import PrimaryButton from "../../../components/PrimaryButton";
import "../../../components/BottomFooter.css";
import { HttpLogin } from "../../../utils/Http";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import bloodBag from './../../../assets/images/mettler_images/blood_bag.svg';
import bloodDrop from './../../../assets/images/mettler_images/blood_drop.svg';
import bloodDropNew from './../../../assets/images/mettler_images/blood_dropNew.svg';
import bloodDropNewOne from './../../../assets/images/mettler_images/blood_dropNewOne.svg';
import { getAllStaff } from "../../../store/actions/Staff";
import AvatarDoctorImage from './../../../assets/images/mettler_images/AvatarDoctor.png';
import moment from "moment";
import loaddingFile from '../../../../src/assets/images/tenor.gif';

interface IAddProcedurey { }
interface IAddProcedure {
    StaticPage: any;
    dispatch: Dispatch<any>;
    getOrderProcedureByProblemsInputData: any;
    updateOrderProcedureControlData: any;
    createOrderProcedureProblemsData: any;
    match: any;
    state: {
        nodes: [],
        checked: [],
        expanded: []
    }
}
const AddProcedure: React.FC<IAddProcedure> = ({
    dispatch, getOrderProcedureByProblemsInputData, match, updateOrderProcedureControlData, createOrderProcedureProblemsData


}) => {


    let [inputFormData, setInputFormData] = useState(PatientOrderProcedureData);
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
    let [inputOrgId, setInputOrgId] = useState("");
    let [loginEnteredBy, setLoginEnteredBy] = useState("");
    let [Urgency, setUrgency] = useState(null);
    const [spinner, setSpinner] = useState(false);
    useEffect(() => {
        setSpinner(true); 
        var encryptInitial = match.params.patientid;
        setEncryptPatientId(encryptInitial);
        var CryptoJS = require("crypto-js");
        let decodePatientid = decodeURIComponent(encryptInitial);
        console.log(JSON.stringify(CryptoJS.AES.decrypt(decodePatientid.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8)));
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

        var orgData = JSON.parse(window.localStorage.getItem("LOGINDATA"));
        console.log(JSON.stringify(orgData));
        inputFormData.enteredBy = orgData.items.data.userDetail.name[0].given + " " + orgData.items.data.userDetail.name[0].family;
        setInputFormData({ ...inputFormData });
        setLoginEnteredBy(orgData.items.data.userDetail.name[0].given + " " + orgData.items.data.userDetail.name[0].family);
        orgData = orgData.loginInput.organization;
        HttpLogin.axios().get("api/org/getById/" + orgData)
            .then((res) => {
                if (res.data.message.code === "MHC - 0200") {

                    setInputOrgId(res.data.data.id);
                    setInputOrgData(res.data.data.organizationdetails[0].name);
                } else {
                    setInputOrgData("");
                }
            })
        HttpLogin.axios().get("api/dropdowns/get-all")
            .then((response) => {
                let AllergyInputData = response.data.data.filter(k => k.dropdown === "allergyName").map((i) => { return i.list })
                setAllergyData(AllergyInputData[0]);
                let NatureOfReaction = response.data.data.filter(k => k.dropdown === "natureOfReaction").map((i) => { return i.list })
                setNatureOfReactionData(NatureOfReaction[0]);
                let Symptoms = response.data.data.filter(k => k.dropdown === "symptoms").map((i) => { return i.list })
                setSymptomsData(Symptoms[0]);
                let severity = response.data.data.filter(k => k.dropdown === "Severity").map((i) => { return i.list })
                setseverity(severity[0]);
                let Urgency = response.data.data.filter(k => k.dropdown === "Urgency").map((i) => { return i.list })
                setUrgency(Urgency[0]);
            })

        HttpLogin.axios().get("api/patient/getPatient/" + decodeFinalPatientid)
            .then((response) => {
                console.log(JSON.stringify(response.data.data))
                
                if (response.data.message.code === "MHC - 0200") {
                    setInputPatientInfo(response.data.data.basicDetails[0].name[0].given+" "+response.data.data.basicDetails[0].name[0].family);
                    setPatientImage(response.data.data.basicDetails[0].profile !== "" ? response.data.data.basicDetails[0].profile : "");
                    setPatientDateOfBirth(moment(response.data.data.basicDetails[0].birthDate).format('MMM DD,YYYY'));
                    var genderChanges = response.data.data.basicDetails[0].gender === "M" ? "Male" : response.data.data.basicDetails[0].gender === "fm" ? "Female" : "Not Specify";
                    setPatientGender(genderChanges);
                    var ssnValue = response.data.data.basicDetails[0].ssn != undefined ? response.data.data.basicDetails[0].ssn.slice(6, 9) : ""
                    setPatientSSN(ssnValue);
                    var today = new Date();
                    var birthDate = new Date(moment(response.data.data.basicDetails[0].birthDate, "YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z"));
                    // create a date object directly from `dob1` argument
                    var age_now = today.getFullYear() - birthDate.getFullYear();
                    var m = today.getMonth() - birthDate.getMonth();
                    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                        age_now--;
                    }
                    setPatientAge(age_now);
                    setSpinner(false);
                } else {
                    alert(response.data.message.description);
                }

            })
        if (decodeFinalId !== "") {
            dispatch(getOrderProcedureByControlInput(decodeFinalId));
        }
        dispatch(getAllStaff());

    }, []);





    const [organizationred, setorganizationred] = useState(false);
    const handleInputChange = (event: any) => {
        if (event.target.name === "serviceProblem") {
            inputFormData.serviceProblem = event.target.value;
        } else if (event.target.name === "consultation") {
            inputFormData.consultation = event.target.value;
        } else if (event.target.name === "observed") {
            inputFormData.observed = event.target.value;
        } else if (event.target.id === "provisionalDiagnosis") {
            inputFormData.provisionalDiagnosis = event.target.value;
        } else if (event.target.name === "orderedBy") {
            inputFormData.orderedBy = event.target.value;
        } else if (event.target.id === "enteredBy") {
            inputFormData.enteredBy = event.target.value;
        } else if (event.target.id === "comments") {
            inputFormData.comments = event.target.value;
        } else if (event.target.name === "procedure") {
            inputFormData.procedure = event.target.value;
        } else if (event.target.name === "urgency") {
            inputFormData.urgency = event.target.value;
        }

        setInputFormData({ ...inputFormData });
    }
    const [isPageLoaded, setPageLoaded] = useState(false);

    if (!isPageLoaded && !getOrderProcedureByProblemsInputData.isLoading) {
        console.log(JSON.stringify(getOrderProcedureByProblemsInputData.items));
        if (getOrderProcedureByProblemsInputData.items !== undefined) {
            if (getOrderProcedureByProblemsInputData.items.message.code === "MHC - 0200") {
                getOrderProcedureByProblemsInputData.items.data.appropriateDate = new Date(moment(getOrderProcedureByProblemsInputData.items.data.appropriateDate, "YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z"));
                getOrderProcedureByProblemsInputData.items.data.enteredBy = loginEnteredBy;
                console.log(JSON.stringify(getOrderProcedureByProblemsInputData.items.data));
                setInputFormData(getOrderProcedureByProblemsInputData.items.data);
                setSpinner(false);
            } else {
                setInputFormData({ ...inputFormData });
                alert(getOrderProcedureByProblemsInputData.items.message.description);
            }
        } else {
            setInputFormData({ ...PatientOrderProcedureData })
        }

        setPageLoaded(true);
    }
    if (!getOrderProcedureByProblemsInputData && getOrderProcedureByProblemsInputData.isFormSubmit) {

        setTimeout(() => {
            setSpinner(false);
            setPageLoaded(false);

        }, (1000));
    }
    let newUrgencyData = Urgency != null && Urgency.length > 0 && Urgency.map((item, i) => {
        return (
            <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
        )
    })
    const [isOrdersProcedureLoaded, setOrdersProcedureLoaded] = useState(false);

    if (!isOrdersProcedureLoaded && !createOrderProcedureProblemsData.isLoading) { 
        createOrderProcedureProblemsData.items.data.doneDate = createOrderProcedureProblemsData.items.data.doneDate !== null ? new Date(moment(createOrderProcedureProblemsData.items.data.doneDate, "YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z")):null;
        createOrderProcedureProblemsData.items.data.dueDate = createOrderProcedureProblemsData.items.data.dueDate !== null ? new Date(moment(createOrderProcedureProblemsData.items.data.dueDate, "YYYYMMDDHHmm").format("YYYY-MM-DDThh:mm:ss.000Z")):null;
        createOrderProcedureProblemsData.items.data.administrationDate = createOrderProcedureProblemsData.items.data.administrationDate !== null ? new Date(moment(createOrderProcedureProblemsData.items.data.administrationDate, "YYYYMMDDHHmm").format("YYYY-MM-DDThh:mm:ss.000Z")):null;
          setInputFormData(createOrderProcedureProblemsData.items.data);    
      if (createOrderProcedureProblemsData.items.message.code === "MHC - 0200") {
        alert(createOrderProcedureProblemsData.items.message.description);  
        setTimeout(() => {
            window.location.href = "/MettlerVisitPatientdata/"+encryptPatientId+"/"+encryptVisitId; 
          setSpinner(false);
        }, (1000));   
        setOrdersProcedureLoaded(true);    
      } else {
        alert(createOrderProcedureProblemsData.items.message.description);   
        setTimeout(() => {
            setOrdersProcedureLoaded(false);
          setSpinner(false);
        }, (1000));
      }
    
  }
  if (!createOrderProcedureProblemsData && createOrderProcedureProblemsData.isFormSubmit) {
  
      setTimeout(() => {
        setOrdersProcedureLoaded(false);
        setSpinner(false);
      }, (1000));
  }
  
  
  let [isOrdersProcedureupdateLoaded, setOrdersProcedureupdateLoaded] = useState(false);
  
  if (!isOrdersProcedureupdateLoaded && !updateOrderProcedureControlData.isLoading) {
    updateOrderProcedureControlData.items.data.doneDate = updateOrderProcedureControlData.items.data.doneDate !== null ? new Date(moment(updateOrderProcedureControlData.items.data.doneDate, "YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z")):null;
    updateOrderProcedureControlData.items.data.dueDate = updateOrderProcedureControlData.items.data.dueDate !== null ? new Date(moment(updateOrderProcedureControlData.items.data.dueDate, "YYYYMMDDHHmm").format("YYYY-MM-DDThh:mm:ss.000Z")):null;
    updateOrderProcedureControlData.items.data.administrationDate = updateOrderProcedureControlData.items.data.administrationDate !== null ? new Date(moment(updateOrderProcedureControlData.items.data.administrationDate, "YYYYMMDDHHmm").format("YYYY-MM-DDThh:mm:ss.000Z")):null;
  
    setInputFormData(updateOrderProcedureControlData.items.data); 
    if (updateOrderProcedureControlData.items.message.code === "MHC - 0200") {    
        alert(updateOrderProcedureControlData.items.message.description);   
    
        console.log(JSON.stringify(updateOrderProcedureControlData.items));  
        setTimeout(() => {
            window.location.href = "/MettlerVisitPatientdata/"+encryptPatientId+"/"+encryptVisitId; 
          setSpinner(false);
        }, (1000)); 
        setOrdersProcedureupdateLoaded(true);  
    } else {
  
      alert(updateOrderProcedureControlData.items.message.description);     
      setTimeout(() => {
        setOrdersProcedureupdateLoaded(false);
        setSpinner(false);
      }, (1000));    
    }  
  
  }
  
  if (!updateOrderProcedureControlData && updateOrderProcedureControlData.isFormSubmit) {
    setTimeout(() => {
        setOrdersProcedureupdateLoaded(false);
  
    }, (1000));
  }
    const handleClickChange = () => {
        console.log(JSON.stringify(inputFormData));
        inputFormData.lastVisit = decryptVisitId;
        inputFormData.pid = decryptPatientId;
        inputFormData.organization = inputOrgId;
        inputFormData.appropriateDate = moment(inputFormData.appropriateDate).format('YYYYMMDD');
        setInputFormData({ ...inputFormData });
        setSpinner(true);
        if (inputFormData.appropriateDate === null || inputFormData.serviceProblem === "" || inputFormData.provisionalDiagnosis === "" || inputFormData.urgency === "") {
            inputFormData.appropriateDate = null;
            alert("Please Enter required data");
        } else if (inputFormData.id !== "") {
            dispatch(updateOrderProcedureControlById(inputFormData));       
        } else {
            dispatch(createOrderProcedureControl(inputFormData));
        }

    }
  
    const handleBackclick = () => {
        window.location.href = "/MettlerVisitPatientdata/"+encryptPatientId+"/"+encryptVisitId;
      }
    return (
        <>
            {spinner &&
                (<div className='overlay-content'>
                    <div className='wrapper'>
                        <img alt="" src={loaddingFile} style={{ position: 'absolute', width: '100%', height: '-webkit-fill-available', zIndex: 2, opacity: '0.5' }} />
                    </div>
                </div>
                )}
            <div className="bed-details" style={{ height: "1168px" }}>
                <div className="bed-details-child" />
                <div className="bed-details-child1" style={{ height: "1106px" }} />
                <div className="bedline-div" style={{ top: "155px" }} />
                <div className="bedexpand-more-24px-parent" style={{ top: "107px" }}>
                    <img
                        className="bedexpand-more-24px-icon"
                        alt=""
                        src="/expand-more-24px.svg"
                    />
                    <div className="beddetails"> <i onClick={handleBackclick} style={{ position: "relative", top: "6px", left: "-7px",cursor:"pointer" }} className="large material-icons">arrow_back</i>Add Procedure</div>
                </div>
                <div style={{ top: "6px", background: '#2D56AD', height: '98px', display: 'flex', width: 'calc(100% - 0px)', position: 'absolute', left: "0px" }} >

                    <div id="mettlerEmptyPadding" className="p-col-12 p-md-1">
                        <img style={{ width: '60px', height: '60px', position: 'relative', left: '21px', top: '23px', borderRadius: patientImage !== "" ? "30px" : "" }} src={patientImage !== "" ? patientImage : AvatarBigImage}></img>
                    </div>
                    <div id="mettlerEmptyPadding" style={{ display: 'flex', flexDirection: 'column' }} className="p-col-12 p-md-6">
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ position: 'relative', top: '19px', minWidth: 'max-content', fontSize: '18px' }} className="App-TopBar-PatientName">{inputPatientInfo}</div>
                            <div style={{ position: 'relative', top: '23px', left: '6px', minWidth: 'max-content', fontSize: '14px' }} className="App-TopBar-PatientAge">{patientAge}  Years</div>

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

                    <div className="bedorgForm-fields" style={{ top: "286px", display: "flex", flexDirection: "row-reverse" }}>
                        <DatePicker
                            className="name-input13"
                            label="Earliest appropriate date"
                            slotProps={{
                                textField: {
                                    variant: "outlined",
                                    size: "medium",
                                    color: "primary",
                                },
                            }}
                            value={inputFormData.appropriateDate}
                            onChange={(newValue: any) => {
                                inputFormData.appropriateDate = newValue;
                                setInputFormData({ ...inputFormData });
                            }}
                        />


                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span >Service to problem this procedure
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Service to problem this procedure" id="serviceProblem" name="serviceProblem" value={inputFormData.serviceProblem} onChange={handleInputChange}>
                                <MenuItem value="Vital Unit1">Vital Unit1</MenuItem>
                                <MenuItem value="Vital Unit2">Vital Unit2</MenuItem>
                                <MenuItem value="Vital Unit3">Vital Unit3</MenuItem>
                            </Select>
                            <FormHelperText />
                        </FormControl>
                    </div>

                    <div className="bedorgForm-fields2" style={{ top: "433px" }}>
                        <div style={{ fontSize: "16px", fontWeight: "lighter", color: "#000000", position: "absolute", top: "-73px", left: "7px" }}>Patient will be seen as an</div>

                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span >Place of Consultation
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Place of Consultation" id="consultation" name="consultation" value={inputFormData.consultation} onChange={handleInputChange}>
                                <MenuItem value="Vital Unit1">Vital Unit1</MenuItem>
                                <MenuItem value="Vital Unit2">Vital Unit2</MenuItem>
                                <MenuItem value="Vital Unit3">Vital Unit3</MenuItem>
                            </Select>
                            <FormHelperText />
                        </FormControl>

                        <RadioGroup name="observed" value={inputFormData.observed} onChange={handleInputChange}
                            style={{ position: "absolute", top: "-28px", left: "-6px" }}
                            row>
                            <div className="frame-parent7" style={{ color: 'darkslategray' }}>
                                <FormControlLabel
                                    className="radio-buttongray-icon2"
                                    label="Observed" value={true}
                                    labelPlacement="end"
                                    control={<Radio color="primary" size="medium" />}
                                />
                                <FormControlLabel
                                    style={{ left: "129px" }}
                                    className="radio-buttongray-icon3"
                                    label="Historical" value={false}
                                    labelPlacement="end"
                                    control={<Radio color="primary" size="medium" />}
                                />
                            </div>
                        </RadioGroup>
                        <TextField
                            id="provisionalDiagnosis"
                            className="name-input13"
                            color="primary"
                            variant="outlined"
                            type="text"
                            label="Provisional Diagnosis"
                            placeholder="Placeholder"
                            size="medium"
                            margin="none"
                            value={inputFormData.provisionalDiagnosis}
                            onChange={handleInputChange}
                        />

                    </div>
                    <div className="bedorgForm-fields2" style={{ top: "517px" }}>


                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span >Ordered by
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Ordered by" name="orderedBy" value={inputFormData.orderedBy} onChange={handleInputChange}>
                                <MenuItem value="Vital Unit1">Vital Unit1</MenuItem>
                                <MenuItem value="Vital Unit2">Vital Unit2</MenuItem>
                                <MenuItem value="Vital Unit3">Vital Unit3</MenuItem>
                            </Select>
                            <FormHelperText />
                        </FormControl>
                        <TextField
                            id="enteredBy"
                            className="name-input13"
                            color="primary"
                            variant="outlined"
                            type="text"
                            label="Entered by"
                            disabled={true}
                            placeholder="Placeholder"
                            size="medium"
                            margin="none"
                            value={inputFormData.enteredBy}
                            onChange={handleInputChange}
                        />

                    </div>


                    <div className="bedorgForm-fields3" style={{ position: "absolute", display: "flex", flexDirection: "column", top: "622px" }}>
                        <div style={{ fontWeight: "bold", fontSize: "16px", lineHeight: "24px", letterSpacing: "0.15px", color: "#000000" }}>Comments</div>
                        <div style={{ font: "poppins", fontWeight: "bold", fontSize: "15px", lineHeight: "22.5px", color: "#3F3F46" }}>Robert<span style={{ left: "12px", position: "relative", font: "poppins", fontWeight: "lighter", fontSize: "15px", lineHeight: "22.5px", color: "#9DA1C3" }}>Jun-25, 2021 at 17:13</span></div>
                        <div style={{ position: "relative", font: "poppins", fontWeight: "lighter", fontSize: "14px", lineHeight: "21px", color: "#172B4D" }}>The objective of genuine health care reform must be premium</div>
                        <div style={{ top: "52px", position: "relative", font: "poppins", fontWeight: "lighter", fontSize: "15px", lineHeight: "22.5px", color: "#3F3F46" }}>Add Comment</div>

                    </div>
                    <div className="bedorgForm-fields3" style={{ display: "flex", top: "813px" }}>
                        <TextField
                            id="comments"
                            className="name-input13"
                            color="primary"
                            variant="outlined"
                            type="text"
                            placeholder="Placeholder"
                            size="medium"
                            margin="none"
                            value={inputFormData.comments}
                            onChange={handleInputChange}
                        />
                        <div style={{ position: "absolute", left: "495px", top: "64px", gap: "23px", display: "flex" }} >
                            <div style={{ borderRadius: "4px", width: "40px", height: "40px", backgroundColor: "#E4EAF0", color: "#0000008A" }}><i className="large material-icons" style={{ position: "absolute", top: "9px", left: "7px" }} >close</i></div>
                            <div style={{ borderRadius: "4px", width: "40px", height: "40px", backgroundColor: "#133C93", color: "#FFFFFF", cursor: "pointer" }}><i className="large material-icons" style={{ position: "absolute", top: "9px", left: "68px" }}>check</i></div>
                        </div>
                    </div>

                    <div className="bedorgForm-fields8">

                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span >Procedure
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Procedure" id="procedure" name="procedure" value={inputFormData.procedure} onChange={handleInputChange}>
                                <MenuItem value="Vital Unit1">Vital Unit1</MenuItem>
                                <MenuItem value="Vital Unit2">Vital Unit2</MenuItem>
                                <MenuItem value="Vital Unit3">Vital Unit3</MenuItem>
                            </Select>
                            <FormHelperText />
                        </FormControl>

                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span >Urgency
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Urgency" id="Urgency" name="urgency" value={inputFormData.urgency} onChange={handleInputChange}>
                                {newUrgencyData}
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
                            onCancelContainerClick={() => { window.location.reload() }}
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


            </div>
        </>
    );

};
const mapStateToProps = (state: any) => {
    const { deviceFormData, getOrderProcedureByProblemsInputData, updateOrderProcedureControlData, createOrderProcedureProblemsData } = state;
    return {
        deviceFormData, getOrderProcedureByProblemsInputData, updateOrderProcedureControlData, createOrderProcedureProblemsData
    };
};

export default connect(mapStateToProps)(AddProcedure)




