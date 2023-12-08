
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
    Checkbox
} from "@mui/material";
import "./../Bed/BedMasterConfiguration.css";
import React from "react";
import { connect } from "react-redux";
import bottomImage from './../../../assets/images/mettler_images/bg.svg';
import PatientImagingProcedureOrderData from "./../../../assets/data/PatientImagingProcedureOrderData.json";
import { createPatientImaging, getPatientImagingInput, updatePatientImagingById } from "../../../store/actions/PatientImagingOrder";
import SecondaryButton from "../../../components/SecondaryButton";
import PrimaryButton from "../../../components/PrimaryButton";
import "../../../components/BottomFooter.css";
import { HttpLogin } from "../../../utils/Http";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CheckBoxgary from "../../../components/CheckBoxgary";
import bloodBag from './../../../assets/images/mettler_images/blood_bag.svg';
import bloodDrop from './../../../assets/images/mettler_images/blood_drop.svg';
import bloodDropNew from './../../../assets/images/mettler_images/blood_dropNew.svg';
import bloodDropNewOne from './../../../assets/images/mettler_images/blood_dropNewOne.svg';
import AvatarDoctorImage from './../../../assets/images/mettler_images/AvatarDoctor.png';
import AvatarBigImage from './../../../assets/images/mettler_images/AvatarBigImage.png';
import { getAllStaff } from "../../../store/actions/Staff";
import loaddingFile from '../../../../src/assets/images/tenor.gif';
import moment from "moment";
interface IAddImagingProcedure { }
interface IAddImagingProcedure {
    StaticPage: any;
    dispatch: Dispatch<any>;
    getPatientImagingInputData: any;
    createPatientImagingData: any;
    updatePatientImagingData: any;
    errorMessage: any;
    match: any;
    state: {
        nodes: [],
        checked: [],
        expanded: []
    }
}
const AddImagingProcedure: React.FC<IAddImagingProcedure> = ({
    dispatch, getPatientImagingInputData, errorMessage, match, updatePatientImagingData, createPatientImagingData


}) => {


    let [inputFormData, setInputFormData] = useState(PatientImagingProcedureOrderData);
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
    let [ImagingType, setImagingType] = useState(null);
    let [Modifier, setModifier] = useState(null);
    let [Transport, setTrasport] = useState(null);
    let [Category, setCategory] = useState(null);
    let [submitTo ,setSubmitTo] = useState(null);
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

        var orgData = JSON.parse(window.localStorage.getItem("LOGINDATA"));
        inputFormData.enteredBy = orgData.items.data.userDetail.name[0].given + " " + orgData.items.data.userDetail.name[0].family;
        setInputFormData({ ...inputFormData });
        setLoginEnteredBy(orgData.items.data.userDetail.name[0].given + " " + orgData.items.data.userDetail.name[0].family);
        orgData = orgData.loginInput.organization;
        HttpLogin.axios().get("api/org/getById/" + orgData)
            .then((res) => {
                if (res.data.message.code === "MHC - 0200") {

                    setInputOrgId(res.data.data.id);
                    setInputOrgData(res.data.data.organizationdetails[0].name);
                    setSpinner(false);
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
                let ImagingType = response.data.data.filter(k => k.dropdown === "ImagingType").map((i) => { return i.list })
                setImagingType(ImagingType[0]);
                let Modifier = response.data.data.filter(k => k.dropdown === "Modifiers").map((i) => { return i.list })
                setModifier(Modifier[0]);
                let Transport = response.data.data.filter(k => k.dropdown === "Transport").map((i) => { return i.list })
                setTrasport(Transport[0]);
                let Category = response.data.data.filter(k => k.dropdown === "Category").map((i) => { return i.list })
                setCategory(Category[0]);
                let SubmitTo = response.data.data.filter(k => k.dropdown === "submitTo").map((i) => { return i.list })
                setSubmitTo(SubmitTo[0]);
            })
        HttpLogin.axios().get("api/patient/getPatient/" + decodeFinalPatientid)
            .then((response) => {
                //     console.log(JSON.stringify(response.data.data))     
                setInputPatientInfo(response.data.data.basicDetails[0].name[0].given + " " + response.data.data.basicDetails[0].name[0].family);
                if (response.data.message.code === "MHC - 0200") {
                    setInputPatientInfo(response.data.data.basicDetails[0].name[0].given + " " + response.data.data.basicDetails[0].name[0].family);
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
                } else {
                    alert(response.data.message.description);
                }

            })
        if (decodeFinalId !== "") {
            dispatch(getPatientImagingInput(decodeFinalId));
        }
        dispatch(getAllStaff());

    }, []);
    let newUrgencyData = Urgency != null && Urgency.length > 0 && Urgency.map((item, i) => {
        return (
            <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
        )
    })   
    let newImagingTypeData = ImagingType != null && ImagingType.length > 0 && ImagingType.map((item, i) => {
        return (
            <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
        )
    })
    let newModifierData = Modifier != null && Modifier.length > 0 && Modifier.map((item, i) => {
        return (
            <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
        )
    })
    let newTrasportData = Transport != null && Transport.length > 0 && Transport.map((item, i) => {
        return (
            <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
        )
    })
    let newCategoryData = Category != null && Category.length > 0 && Category.map((item, i) => {
        return (
            <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
        )
    })
    let newSubmitToData = submitTo != null && submitTo.length > 0 && submitTo.map((item, i) => {
        return (
            <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
        )
    })


    const [organizationred, setorganizationred] = useState(false);
    const handleInputChange = (event: any) => {
        const {
            target: { value },
        } = event;
        if (event.target.id === "clinicalHistory") {
            inputFormData.clinicalHistory = event.target.value;
        } else if (event.target.name === "modifiers") {
            inputFormData.modifiers = typeof value === 'string' ? value.split(',') : value;
        } else if (event.target.name === "transport") {
            inputFormData.transport = event.target.value;
        } else if (event.target.name === "urgency") {
            inputFormData.urgency = event.target.value;
        } else if (event.target.name === "submitTo") {
            inputFormData.submitTo = event.target.value;
        } else if (event.target.name === "category") {
            inputFormData.category = event.target.value;
        } else if (event.target.id === "examsOver") {
            inputFormData.examsOver = event.target.value;
        } else if (event.target.name === "orderedBy") {
            inputFormData.orderedBy = event.target.value;
        } else if (event.target.id === "enteredBy") {
            inputFormData.enteredBy = event.target.value;
        } else if (event.target.id === "isolation") {
            inputFormData.isolation = event.target.checked;
        } else if (event.target.name === "pragnant") {
            inputFormData.pragnant = event.target.value;
        } else if (event.target.id === "reasonForStudy") {
            inputFormData.reasonForStudy = event.target.value;
        } else if (event.target.name === "imagingType") {
            inputFormData.imagingType = event.target.value;
        }
        setInputFormData({ ...inputFormData });
    }

    const [isPageLoaded, setPageLoaded] = useState(false);

    if (!isPageLoaded && !getPatientImagingInputData.isLoading) {
        if (getPatientImagingInputData.items !== undefined) {
            if (getPatientImagingInputData.items.message.code === "MHC - 0200") {
                getPatientImagingInputData.items.data.dateDesired = new Date(moment(getPatientImagingInputData.items.data.dateDesired, "YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z"));
                getPatientImagingInputData.items.data.preOpScheduled = new Date(moment(getPatientImagingInputData.items.data.preOpScheduled, "YYYYMMDDHHmm").format("YYYY-MM-DDThh:mm:ss.000Z"));
                getPatientImagingInputData.items.data.enteredBy = loginEnteredBy;
                setInputFormData(getPatientImagingInputData.items.data);
            } else {
                setInputFormData({ ...inputFormData });
                alert(getPatientImagingInputData.items.message.description);
            }
        } else {
            setInputFormData({ ...PatientImagingProcedureOrderData })
        }

        setPageLoaded(true);
    }
    if (!getPatientImagingInputData && getPatientImagingInputData.isFormSubmit) {

        setTimeout(() => {
            setPageLoaded(false);

        }, (1000));
    }

    let [isupdatePatientImagingPageLoaded, setupdatePatientImagingPageLoaded] = useState(false);

    if (!isupdatePatientImagingPageLoaded && !updatePatientImagingData.isLoading) {
        setInputFormData(updatePatientImagingData.items.data)
        if (updatePatientImagingData.items.message.code === "MHC - 0200") {
            alert(updatePatientImagingData.items.message.description);

            console.log(JSON.stringify(updatePatientImagingData.items));
            setTimeout(() => {
                window.location.href = "/MettlerVisitPatientdata/" + encryptPatientId + "/" + encryptVisitId;
                setSpinner(false);
            }, (1000));
            setupdatePatientImagingPageLoaded(true);
        } else {

            alert(updatePatientImagingData.items.message.description);
            setTimeout(() => {
                setupdatePatientImagingPageLoaded(false);
                setSpinner(false);
            }, (1000));
        }
    }

    if (!updatePatientImagingData && updatePatientImagingData.isFormSubmit) {
        setTimeout(() => {
            setupdatePatientImagingPageLoaded(false);

        }, (1000));
    }

    let [iscreatePatientImagingPageLoaded, setcreatePatientImagingPageLoaded] = useState(false);

    if (!iscreatePatientImagingPageLoaded && !createPatientImagingData.isLoading) {
        setInputOrgData(createPatientImagingData.items.data);
        if (createPatientImagingData.items.message.code === "MHC - 0200") {
            alert(createPatientImagingData.items.message.description);
            setTimeout(() => {
                window.location.href = "/MettlerVisitPatientdata/" + encryptPatientId + "/" + encryptVisitId;
                setSpinner(false);
            }, (1000));
            setcreatePatientImagingPageLoaded(true);
        } else {
            alert(createPatientImagingData.items.message.description);
            setTimeout(() => {
                setcreatePatientImagingPageLoaded(false);
                setSpinner(false);
            }, (1000));
        }

    }
    if (!createPatientImagingData && createPatientImagingData.isFormSubmit) {

        setTimeout(() => {
            setcreatePatientImagingPageLoaded(false);
            setSpinner(false);
        }, (1000));
    }

    const handleClickChange = () => {
        inputFormData.lastVisit = decryptVisitId;
        inputFormData.pid = decryptPatientId;
        inputFormData.organization = inputOrgId;
        inputFormData.dateDesired = moment(inputFormData.dateDesired).format('YYYYMMDD');
        inputFormData.preOpScheduled = moment(inputFormData.preOpScheduled).format('YYYYMMDD');
        console.log(JSON.stringify(inputFormData));
        setSpinner(true);
        setInputFormData({ ...inputFormData });
        if (inputFormData.dateDesired === null || inputFormData.preOpScheduled === "" || inputFormData.clinicalHistory === "" || inputFormData.modifiers.length === 0 || inputFormData.urgency === "" || inputFormData.examsOver === "") {
            inputFormData.dateDesired = null;
            inputFormData.preOpScheduled = null;
            alert("Please Enter required data");
        } else if (inputFormData.id !== "") {
            dispatch(updatePatientImagingById(inputFormData));
        } else {
            dispatch(createPatientImaging(inputFormData));
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
                        <img alt="" src={loaddingFile} style={{ position: 'absolute', width: '100%', height: '-webkit-fill-available', zIndex: 2, opacity: '0.5' }} />
                    </div>
                </div>
                )}
            <div className="bed-details" style={{ height: "1168px" }}>
                <div className="bed-details-child" />
                <div className="bed-details-child1" style={{ height: "1106px" }} />
                <div className="bedline-div" style={{ top: "168.5px" }} />
                <div className="bedexpand-more-24px-parent" style={{ top: "114px" }}>
                    <img
                        className="bedexpand-more-24px-icon"
                        alt=""
                        src="/expand-more-24px.svg"
                    />
                    <div className="beddetails"> <i onClick={handleBackclick} style={{ position: "relative", top: "6px", left: "-7px", cursor: "pointer" }} className="large material-icons">arrow_back</i>Add Imaging Procedure</div>
                </div>
                <div style={{ top: "6px", background: '#2D56AD', height: decryptPatientId != "" ? '98px' : '0px', display: 'flex', width: 'calc(100% - 0px)', position: 'absolute', left: "0px" }} >
                    <div id="mettlerEmptyPadding" className="p-col-12 p-md-1">

                        <div id="mettlerEmptyPadding" className="p-col-12 p-md-1">
                            <img style={{ width: '60px', height: '60px', position: 'relative', left: '21px', top: '23px', borderRadius: patientImage !== "" ? "30px" : "" }} src={patientImage !== "" ? patientImage : AvatarBigImage}></img>
                        </div>
                        <div id="mettlerEmptyPadding" style={{ display: 'flex', flexDirection: 'column' }} className="p-col-12 p-md-6">
                            <div style={{ display: 'flex', flexDirection: 'row', position: "absolute", top: "7px", left: "97px" }}>
                                <div style={{ position: 'relative', top: '19px', minWidth: 'max-content', fontSize: '18px' }} className="App-TopBar-PatientName">{inputPatientInfo}</div>
                                <div style={{ position: 'relative', top: '23px', left: '6px', minWidth: 'max-content', fontSize: '14px' }} className="App-TopBar-PatientAge">{patientAge} Years</div>

                                <div className="admit-patient-ss" style={{ width: '110px', height: '24px', background: '#5574B7', border: '1px solid #5574B7', position: 'relative', top: '19px', left: '23px' }}>
                                    <div style={{ fontWeight: 400, fontSize: '12px', opacity: 0.6, color: '#FFF' }} className="admit-patient-profileName">SS#:</div>
                                    <div style={{ fontWeight: 400, fontSize: '12px', color: '#FFF', whiteSpace: "nowrap" }} className="admit-patient-profileName">SS-{patientSSN}</div>
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

                    <div className="bedorgForm-fields" style={{ top: "289px", display: "flex", flexDirection: "row-reverse" }}>
                        <DatePicker
                            className="name-input13"
                            label="Date Desired"
                            slotProps={{
                                textField: {
                                    variant: "outlined",
                                    size: "medium",
                                    color: "primary",
                                },
                            }}
                            value={inputFormData.dateDesired}
                            onChange={(newValue: any) => {
                                inputFormData.dateDesired = newValue;
                                setInputFormData({ ...inputFormData });
                            }}
                        />


                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span >Modifiers
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Modifiers" multiple={true} id="modifiers" name="modifiers" value={inputFormData.modifiers} onChange={handleInputChange}>
                                {newModifierData}
                            </Select>
                            <FormHelperText />
                        </FormControl>
                    </div>

                    <div className="bedorgForm-fields2" style={{ top: "380px" }}>
                        <TextField
                            id="clinicalHistory"
                            className="name-input13"
                            color="primary"
                            variant="outlined"
                            type="text"
                            label="Clinical History"
                            placeholder="Placeholder"
                            size="medium"
                            margin="none"
                            value={inputFormData.clinicalHistory}
                            onChange={handleInputChange}
                        />



                    </div>
                    <div className="bedorgForm-fields3" style={{ position: "absolute", display: "flex", flexDirection: "row-reverse", top: "472px" }}>
                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span>Transport
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Transport" id="transport" name="transport" value={inputFormData.transport} onChange={handleInputChange}>
                               {newTrasportData}
                            </Select>
                            <FormHelperText />
                        </FormControl>
                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span>Urgency
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Urgency" id="urgency" name="urgency" value={inputFormData.urgency} onChange={handleInputChange}>
                                {newUrgencyData}
                            </Select>
                            <FormHelperText />
                        </FormControl>
                    </div>
                    <div className="bedorgForm-fields3" style={{ position: "absolute", display: "flex", flexDirection: "row-reverse", top: "564px" }}>
                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span>Submit to
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Submit to" id="submitTo" name="submitTo" value={inputFormData.submitTo} onChange={handleInputChange}>
                               {newSubmitToData}
                            </Select>
                            <FormHelperText />
                        </FormControl>

                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span>Category
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Category" id="category" name="category" value={inputFormData.category} onChange={handleInputChange}>
                                {newCategoryData}
                            </Select>
                            <FormHelperText />
                        </FormControl>
                    </div>
                    <div className="bedorgForm-fields3" style={{ position: "absolute", display: "flex", top: "664px" }}>
                        <DatePicker
                            className="name-input13"
                            label="Pre OP Scheduled"
                            slotProps={{
                                textField: {
                                    variant: "outlined",
                                    size: "medium",
                                    color: "primary",
                                },
                            }}
                            value={inputFormData.preOpScheduled}
                            onChange={(newValue: any) => {
                                inputFormData.preOpScheduled = newValue;
                                setInputFormData({ ...inputFormData });
                            }}
                        />

                        <TextField
                            id="examsOver"
                            className="name-input13"
                            color="primary"
                            variant="outlined"
                            type="text"
                            label="Exams Over the last 7 Days"
                            placeholder="Placeholder"
                            size="medium"
                            margin="none"
                            value={inputFormData.examsOver}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="bedorgForm-fields3" style={{ position: "absolute", display: "flex", top: "762px" }}>
                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span>Ordered by
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Ordered by" id="orderedBy" name="orderedBy" value={inputFormData.orderedBy} onChange={handleInputChange}>
                                <MenuItem value="1">Vital Unit1</MenuItem>
                                <MenuItem value="2">Vital Unit2</MenuItem>
                                <MenuItem value="3">Vital Unit3</MenuItem>
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

                    <div className="bedorgForm-fields3" style={{ display: "flex", top: "890px" }}>
                        <Checkbox className="frame-parent7" style={{ position: "absolute", top: "-47px", left: "-5px", color: inputFormData.isolation === false ? "rgba(0, 0, 0, 0.6)" : "" }} id="isolation" checked={inputFormData.isolation} onChange={handleInputChange} inputProps={{ 'aria-label': 'controlled' }} />
                        <div style={{ position: "relative", top: "-39px", left: "40px", color: 'rgb(0, 0, 0)', fontSize: '16px' }}>Isolation</div>

                        <div style={{ position: "absolute", top: "8px", left: "11px", color: "#000000", fontSize: "16px" }}>Pregnant</div>
                        <RadioGroup name="pragnant" value={inputFormData.pragnant} onChange={handleInputChange}
                            style={{ position: "absolute", top: "57px", left: "-6px" }}
                            row>
                            <div className="frame-parent7" style={{ color: 'darkslategray' }}>
                                <FormControlLabel
                                    className="radio-buttongray-icon2"
                                    label="Yes" value="Yes"
                                    labelPlacement="end"
                                    control={<Radio color="primary" size="medium" />}
                                />
                                <FormControlLabel
                                    style={{ left: "129px" }}
                                    className="radio-buttongray-icon3"
                                    label="No" value="No"
                                    labelPlacement="end"
                                    control={<Radio color="primary" size="medium" />}
                                />
                                <FormControlLabel
                                    style={{ left: "249px", top: "-20px", position: "absolute" }}

                                    label="Unknown" value="Unknown"
                                    labelPlacement="end"
                                    control={<Radio color="primary" size="medium" />}
                                />
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="bedorgForm-fields8" style={{ flexDirection: "row-reverse" }}>

                        <TextField
                            id="reasonForStudy"
                            className="name-input13"
                            color="primary"
                            variant="outlined"
                            type="text"
                            label="Reason for Study"
                            placeholder="Placeholder"
                            size="medium"
                            margin="none"
                            value={inputFormData.reasonForStudy}
                            onChange={handleInputChange}
                        />

                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span >Imaging Type
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Imaging Type" id="imagingType" name="imagingType" value={inputFormData.imagingType} onChange={handleInputChange}>
                                {newImagingTypeData}
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
    const { deviceFormData, getPatientImagingInputData, createPatientImagingData, updatePatientImagingData } = state;
    return {
        deviceFormData, getPatientImagingInputData, updatePatientImagingData, createPatientImagingData
    };
};

export default connect(mapStateToProps)(AddImagingProcedure)




