
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
import { getAllStaff } from "../../../store/actions/Staff";
import "./../Bed/BedMasterConfiguration.css";
import React from "react";
import { connect } from "react-redux";
import bottomImage from './../../../assets/images/mettler_images/bg.svg';
import { createPatientVitals, getVitalsByPatientInputId, updatePatientVitalsById } from "../../../store/actions/PatientVitals";
import PatentVitalsData from "./../../../assets/data/PatentVitalsData.json";
import * as Constants from "./../Constants/ConstantValues";
import SecondaryButton from "../../../components/SecondaryButton";
import PrimaryButton from "../../../components/PrimaryButton";
import "../../../components/BottomFooter.css";
import { HttpLogin } from "../../../utils/Http";
import { MobileDateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment from "moment";
import bloodDrop from './../../../assets/images/mettler_images/blood_drop.svg';
import bloodDropNew from './../../../assets/images/mettler_images/blood_dropNew.svg';
import bloodDropNewOne from './../../../assets/images/mettler_images/blood_dropNewOne.svg';
import dotImage from './../../../assets/images/mettler_images/dots-vertical.svg';
import AvatarDoctorImage from './../../../assets/images/mettler_images/AvatarDoctor.png';
import AvatarBigImage from './../../../assets/images/mettler_images/AvatarBigImage.png';
import bloodBag from './../../../assets/images/mettler_images/blood_bag.svg';
import loaddingFile from '../../../../src/assets/images/tenor.gif';


interface IAddPatientVitals { }
interface IAddPatientVitals {
    StaticPage: any;
    dispatch: Dispatch<any>;
    getVitalsByPatientInputIdData: any;
    createPatientVitalsData: any;
    updatePatientVitalsData: any;
    getAllStaffData: any;
    match: any;
    state: {
        nodes: [],
        checked: [],
        expanded: []
    }
}
const AddPatientVitals: React.FC<IAddPatientVitals> = ({
    dispatch, getVitalsByPatientInputIdData, match, getAllStaffData, createPatientVitalsData, updatePatientVitalsData


}) => {

    let [inputFormData, setInputFormData] = useState(PatentVitalsData);
    let [encryptPatientId, setEncryptPatientId] = useState(null);
    let [decryptPatientId, setDecryptPatientId] = useState(null);
    let [encryptVisitId, setEncryptVisitId] = useState(null);
    let [decryptVisitId, setDecryptVisitId] = useState(null);
    let [encryptId, setEncryptId] = useState(null);
    let [decryptId, setDecryptId] = useState(null);
    
    let [inputOrgData, setInputOrgData] = useState("");
    let [patientSSN, setPatientSSN] = useState(null);
    let [patientImage, setPatientImage] = useState("");
    let [patientGender, setPatientGender] = useState(null);
    let [patientDateOfBirth, setPatientDateOfBirth] = useState(null);
    let [inputPatientInfo, setInputPatientInfo] = useState(null);
    let [patientAge, setPatientAge] = useState(null);
    let [cuffSizeData, setCuffSizeData] = useState(null);
    let [positionData, setPositionData] = useState(null);
    let [locationData, setLocationData] = useState(null);
    let [methodData, setMethodData] = useState(null);
    let [qualityData, setQualityData] = useState(null);
    let [siteData, setSiteData] = useState(null);
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
                let cuffsizeValue = response.data.data.filter(k => k.dropdown === "cuffsize").map((i) => { return i.list })
                setCuffSizeData(cuffsizeValue[0]);
                let positionValue = response.data.data.filter(k => k.dropdown === "patientPosition").map((i) => { return i.list })
                setPositionData(positionValue[0]);
                let locationValue = response.data.data.filter(k => k.dropdown === "location").map((i) => { return i.list })
                setLocationData(locationValue[0]);
                let methodValue = response.data.data.filter(k => k.dropdown === "method").map((i) => { return i.list })
                setMethodData(methodValue[0]);
                let qualityValue = response.data.data.filter(k => k.dropdown === "quality").map((i) => { return i.list })
                setQualityData(qualityValue[0]);
                let siteValue = response.data.data.filter(k => k.dropdown === "site").map((i) => { return i.list })
                setSiteData(siteValue[0]);
            })
        //  console.log(JSON.stringify(decodeFinalPatientid))
        HttpLogin.axios().get("api/patient/getPatient/" + decodeFinalPatientid)
            .then((res) => {

                
                if (res.data.message.code === "MHC - 0200") {
                    setInputPatientInfo(res.data.data.basicDetails[0].name[0].given+" "+res.data.data.basicDetails[0].name[0].family);
                    setPatientImage(res.data.data.basicDetails[0].profile !== "" ? res.data.data.basicDetails[0].profile : "");
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
                    setSpinner(false);
                } else {
                    alert(res.data.message.description);
                }
            })
        if (decodeFinalId !== "") {
            HttpLogin.axios().get("/api/vital/getLatestVital/" + decodeFinalPatientid)
                .then((res) => {
                    //  console.log(JSON.stringify(res.data.data));
                    newInputData.enteredDate = res.data.data.enteredDate !== null && res.data.data.enteredDate !== undefined && res.data.data.enteredDate !== "" ? new Date(moment(res.data.data.enteredDate, "YYYYMMDDHHmm").format("YYYY-MM-DDTHH:mm:ss.000Z")) : null;
                    if (decodeFinalId === "Temperature") {
                        newInputData.value = res.data.data.bodyTemperature !== null && res.data.data.bodyTemperature !== "" ? res.data.data.bodyTemperature.value : "";
                        newInputData.vitalType = res.data.data.bodyTemperature !== null && res.data.data.bodyTemperature !== "" ? res.data.data.bodyTemperature.vitalMeasurementName : "";
                        newInputData.unit = res.data.data.bodyTemperature !== null && res.data.data.bodyTemperature !== "" ? res.data.data.bodyTemperature.unit : "";
                        newInputData.dropDown1 = res.data.data.bodyTemperature.btQualifiers.location;
                    } else if (decodeFinalId === "Pulse Rate") {
                        newInputData.vitalType = res.data.data.pulseRate !== null && res.data.data.pulseRate !== "" ? res.data.data.pulseRate.vitalMeasurementName : "";
                        newInputData.value = res.data.data.pulseRate !== null && res.data.data.pulseRate !== "" ? res.data.data.pulseRate.value : "";
                        newInputData.unit = res.data.data.pulseRate !== null && res.data.data.pulseRate !== "" ? res.data.data.pulseRate.unit : "";
                        newInputData.dropDown1 = res.data.data.pulseRate.prQualifiers.location !== "" ? res.data.data.pulseRate.prQualifiers.location : "";
                        newInputData.dropDown2 = res.data.data.pulseRate.prQualifiers.position !== "" ? res.data.data.pulseRate.prQualifiers.position : "";
                        newInputData.dropDown3 = res.data.data.pulseRate.prQualifiers.method !== "" ? res.data.data.pulseRate.prQualifiers.method : "";
                        newInputData.dropDown4 = res.data.data.pulseRate.prQualifiers.site !== "" ? res.data.data.pulseRate.prQualifiers.site : "";
                    } else if (decodeFinalId === "Heart Rate") {
                        newInputData.vitalType = res.data.data.heartRate !== null && res.data.data.heartRate !== "" ? res.data.data.heartRate.vitalMeasurementName : "";
                        newInputData.value = res.data.data.heartRate !== null && res.data.data.heartRate !== "" ? res.data.data.heartRate.value : "";
                        newInputData.unit = res.data.data.heartRate !== null && res.data.data.heartRate !== "" ? res.data.data.heartRate.unit : "";
                        newInputData.dropDown1 = res.data.data.heartRate.hrQualifiers.location;
                    } else if (decodeFinalId === "Respiration") {
                        newInputData.vitalType = res.data.data.respirationRate !== null && res.data.data.respirationRate !== "" ? res.data.data.respirationRate.vitalMeasurementName : "";
                        newInputData.value = res.data.data.respirationRate !== null && res.data.data.respirationRate !== "" ? res.data.data.respirationRate.value : "";
                        newInputData.unit = res.data.data.respirationRate !== null && res.data.data.respirationRate !== "" ? res.data.data.respirationRate.unit : "";
                        newInputData.dropDown1 = res.data.data.respirationRate.rrQualifiers.method !== "" ? res.data.data.respirationRate.rrQualifiers.method : "";
                        newInputData.dropDown2 = res.data.data.respirationRate.rrQualifiers.position !== "" ? res.data.data.respirationRate.rrQualifiers.position : "";
                    } else if (decodeFinalId === "Blood Pressure") {
                        newInputData.vitalType = res.data.data.bloodPressure !== null && res.data.data.bloodPressure !== "" ? res.data.data.bloodPressure.vitalMeasurementName : "";
                        newInputData.systolicValue = res.data.data.bloodPressure !== null && res.data.data.bloodPressure !== "" ? res.data.data.bloodPressure.systolicValue : "";
                        newInputData.diastolicValue = res.data.data.bloodPressure !== null && res.data.data.bloodPressure !== "" ? res.data.data.bloodPressure.diastolicValue : "";
                        newInputData.unit = res.data.data.bloodPressure !== null && res.data.data.bloodPressure !== "" ? res.data.data.bloodPressure.unit : "";
                        newInputData.dropDown1 = res.data.data.bloodPressure !== null && res.data.data.bloodPressure !== "" ? res.data.data.bloodPressure.method : "";
                        newInputData.dropDown2 = res.data.data.bloodPressure !== null && res.data.data.bloodPressure !== "" ? res.data.data.bloodPressure.position : "";
                        newInputData.dropDown3 = res.data.data.bloodPressure !== null && res.data.data.bloodPressure !== "" ? res.data.data.bloodPressure.cuffSize : "";
                    } else if (decodeFinalId === "Pain") {
                        newInputData.vitalType = res.data.data.pain !== null && res.data.data.pain !== "" ? res.data.data.pain.vitalMeasurementName : "";
                        newInputData.value = res.data.data.pain !== null && res.data.data.pain !== "" ? res.data.data.pain.value : "";
                        newInputData.unit = res.data.data.pain !== null && res.data.data.pain !== "" ? res.data.data.pain.unit : "";
                    } else if (decodeFinalId === "Pulse Oximetry") {
                        newInputData.vitalType = res.data.data.pulseOximetry !== null && res.data.data.pulseOximetry !== "" ? res.data.data.pulseOximetry.vitalMeasurementName : "";
                        newInputData.value = res.data.data.pulseOximetry !== null && res.data.data.pulseOximetry !== "" ? res.data.data.pulseOximetry.value : "";
                        newInputData.unit = res.data.data.pulseOximetry !== null && res.data.data.pulseOximetry !== "" ? res.data.data.pulseOximetry.unit : "";
                        newInputData.dropDown1 = res.data.data.pulseOximetry.poQualifiers.method !== "" ? res.data.data.pulseOximetry.poQualifiers.method : "";
                        newInputData.dropDown2 = res.data.data.pulseOximetry.poQualifiers.supplimentalOxygen !== "" ? res.data.data.pulseOximetry.poQualifiers.supplimentalOxygen : "";
                        newInputData.dropDown3 = res.data.data.pulseOximetry.poQualifiers.flowRate !== "" ? res.data.data.pulseOximetry.poQualifiers.flowRate : "";
                        newInputData.dropDown4 = res.data.data.pulseOximetry.poQualifiers.o2concentration !== "" ? res.data.data.pulseOximetry.poQualifiers.o2concentration : "";
                    } else if (decodeFinalId === "Blood Oxygen") {
                        newInputData.vitalType = res.data.data.bloodOxygen !== null && res.data.data.bloodOxygen !== "" ? res.data.data.bloodOxygen.vitalMeasurementName : "";
                        newInputData.value = res.data.data.bloodOxygen !== null && res.data.data.bloodOxygen !== "" ? res.data.data.bloodOxygen.value : "";
                        newInputData.unit = res.data.data.bloodOxygen !== null && res.data.data.bloodOxygen !== "" ? res.data.data.bloodOxygen.unit : "";
                        newInputData.dropDown1 = res.data.data.bloodOxygen.boQualifiers.method;
                    } else if (decodeFinalId === "Height") {
                        newInputData.vitalType = res.data.data.height !== null && res.data.data.height !== "" ? res.data.data.height.vitalMeasurementName : "";
                        newInputData.value = res.data.data.height !== null && res.data.data.height !== "" ? res.data.data.height.value : "";
                        newInputData.unit = res.data.data.height !== null && res.data.data.height !== "" ? res.data.data.height.unit : "";
                        newInputData.dropDown1 = res.data.data.height.hqualifiers.quality;
                    } else if (decodeFinalId === "Weight") {
                        newInputData.vitalType = res.data.data.weight !== null && res.data.data.weight !== "" ? res.data.data.weight.vitalMeasurementName : "";
                        newInputData.value = res.data.data.weight !== null && res.data.data.weight !== "" ? res.data.data.weight.value : "";
                        newInputData.unit = res.data.data.weight !== null && res.data.data.weight !== "" ? res.data.data.weight.unit : "";
                        newInputData.dropDown1 = res.data.data.weight.wqualifiers.method;
                        newInputData.dropDown2 = res.data.data.weight.wqualifiers.quality;
                    } else if (decodeFinalId === "Blood Glucose") {
                        newInputData.vitalType = res.data.data.bloodGlucoseLevel !== null && res.data.data.bloodGlucoseLevel !== "" ? res.data.data.bloodGlucoseLevel.vitalMeasurementName : "";
                        newInputData.value = res.data.data.bloodGlucoseLevel !== null && res.data.data.bloodGlucoseLevel !== "" ? res.data.data.bloodGlucoseLevel.value : "";
                        newInputData.unit = res.data.data.bloodGlucoseLevel !== null && res.data.data.bloodGlucoseLevel !== "" ? res.data.data.bloodGlucoseLevel.unit : "";
                        newInputData.dropDown1 = res.data.data.bloodGlucoseLevel.bgQualifiers.location;
                        newInputData.dropDown2 = res.data.data.bloodGlucoseLevel.bgQualifiers.position;
                        newInputData.dropDown3 = res.data.data.bloodGlucoseLevel.bgQualifiers.quality;
                    } else if (decodeFinalId === "Circumference/Girth") {
                        newInputData.vitalType = res.data.data.circumferenceOrGirth !== null && res.data.data.circumferenceOrGirth !== "" ? res.data.data.circumferenceOrGirth.vitalMeasurementName : "";
                        newInputData.value = res.data.data.circumferenceOrGirth !== null && res.data.data.circumferenceOrGirth !== "" ? res.data.data.circumferenceOrGirth.value : "";
                        newInputData.unit = res.data.data.circumferenceOrGirth !== null && res.data.data.circumferenceOrGirth !== "" ? res.data.data.circumferenceOrGirth.unit : "";
                        newInputData.dropDown1 = res.data.data.circumferenceOrGirth.cgQualifiers.location;
                        newInputData.dropDown2 = res.data.data.circumferenceOrGirth.cgQualifiers.site;
                    }
                    newInputData.comments = res.data.data.comments;
                    newInputData.id = res.data.data.id;
                    setInputFormData(res.data.data);
                    setNewInputData({ ...newInputData });
                })
        }
    }, []);

    let inputData = {
        id: "",
        vitalType: "",
        enteredDate: null,
        value: "",
        systolicValue: "",
        diastolicValue: "",
        unit: "",
        dropDown1: "",
        dropDown2: "",
        dropDown3: "",
        dropDown4: "",
        comments: ""
    }

    const [isAddPatientvitalsupdateLoaded, setAddPatientvitalsupdateLoaded] = useState(false);

    if (!isAddPatientvitalsupdateLoaded && !createPatientVitalsData.isLoading) {
        createPatientVitalsData.items.data.enteredDate =  createPatientVitalsData.items.data.enteredDate !== null &&  createPatientVitalsData.items.data.enteredDate !== undefined &&  createPatientVitalsData.items.data.enteredDate !== "" ? new Date(moment( createPatientVitalsData.items.data.enteredDate, "YYYYMMDDHHmm").format("YYYY-MM-DDTHH:mm:ss.000Z")) : null;
        setInputFormData(createPatientVitalsData.items.data);
        if (createPatientVitalsData.items.message.code === "MHC - 0200") {
            alert(createPatientVitalsData.items.message.description);
            setTimeout(() => {
                window.location.href = "/MettlerVisitPatientdata/"+encryptPatientId+"/"+encryptVisitId; 
                setSpinner(false);
            }, (1000));
            setAddPatientvitalsupdateLoaded(true);
        } else {
            alert(createPatientVitalsData.items.message.description);
            setTimeout(() => {
                setAddPatientvitalsupdateLoaded(false);
                setSpinner(false);
            }, (1000));
        }

    }
    if (!createPatientVitalsData && createPatientVitalsData.isFormSubmit) {

        setTimeout(() => {
            setAddPatientvitalsupdateLoaded(false);
            setSpinner(false);
        }, (1000));
    }

    let [isAddPatientvitalsLoaded, setAddPatientvitalsLoaded] = useState(false);

    if (!isAddPatientvitalsLoaded && !updatePatientVitalsData.isLoading) {
        updatePatientVitalsData.items.data.enteredDate =  updatePatientVitalsData.items.data.enteredDate !== null &&  updatePatientVitalsData.items.data.enteredDate !== undefined &&  updatePatientVitalsData.items.data.enteredDate !== "" ? new Date(moment( updatePatientVitalsData.items.data.enteredDate, "YYYYMMDDHHmm").format("YYYY-MM-DDTHH:mm:ss.000Z")) : null;


        setInputFormData(updatePatientVitalsData.items.data);
        if (updatePatientVitalsData.items.message.code === "MHC - 0200") {
            alert(updatePatientVitalsData.items.message.description);

            console.log(JSON.stringify(updatePatientVitalsData.items));
            setTimeout(() => {
                window.location.href = "/MettlerVisitPatientdata/"+encryptPatientId+"/"+encryptVisitId; 
                setSpinner(false);
            }, (1000));
            setAddPatientvitalsLoaded(true);
        } else {

            alert(updatePatientVitalsData.items.message.description);
            setTimeout(() => {
                setAddPatientvitalsLoaded(false);
                setSpinner(false);
            }, (1000));
        }

    }

    if (!updatePatientVitalsData && updatePatientVitalsData.isFormSubmit) {
        setTimeout(() => {
            setAddPatientvitalsLoaded(false);

        }, (1000));
    }


    let [newInputData, setNewInputData] = useState(inputData);

    let newCuffSizeDropDown = cuffSizeData != null && cuffSizeData.length > 0 && cuffSizeData.map((item, i) => {
        return (
            <MenuItem key={i} value={item.value}>{item.value}</MenuItem>
        )
    })

    let newPositionDropDown = positionData != null && positionData.length > 0 && positionData.map((item, i) => {
        return (
            <MenuItem key={i} value={item.value}>{item.value}</MenuItem>
        )
    })
    let newLocationDropDown = locationData != null && locationData.length > 0 && locationData.map((item, i) => {
        return (
            <MenuItem key={i} value={item.value}>{item.value}</MenuItem>
        )
    })
    let newMethodDropDown = methodData != null && methodData.length > 0 && methodData.map((item, i) => {
        return (
            <MenuItem key={i} value={item.value}>{item.value}</MenuItem>
        )
    })
    let newQualityDropDown = qualityData != null && qualityData.length > 0 && qualityData.map((item, i) => {
        return (
            <MenuItem key={i} value={item.value}>{item.value}</MenuItem>
        )
    })
    let newSiteDropDown = siteData != null && siteData.length > 0 && siteData.map((item, i) => {
        return (
            <MenuItem key={i} value={item.value}>{item.value}</MenuItem>
        )
    })

    const handleInputChange = (event: any) => {
        if (event.target.id === "value") {
            newInputData.value = event.target.value;
        } else if (event.target.name === "vitalType") {
            newInputData.vitalType = event.target.value;
        } else if (event.target.id === "systolicValue") {
            newInputData.systolicValue = event.target.value;
        } else if (event.target.id === "diastolicValue") {
            newInputData.diastolicValue = event.target.value;
        } else if (event.target.name === "unit") {
            newInputData.unit = event.target.value;
        } else if (event.target.name === "dropDown1") {
            newInputData.dropDown1 = event.target.value;
        } else if (event.target.name === "dropDown2") {
            newInputData.dropDown2 = event.target.value;
        } else if (event.target.name === "dropDown3") {
            newInputData.dropDown3 = event.target.value;
        } else if (event.target.name === "dropDown4") {
            newInputData.dropDown4 = event.target.value;
        } else if (event.target.id === "comments") {
            newInputData.comments = event.target.value;
        }
        setNewInputData({ ...newInputData });
    }


    const handleClickChange = () => {
        inputFormData.patientId = decryptPatientId;
        inputFormData.lastVisit = decryptVisitId;
        inputFormData.enteredDate = newInputData.enteredDate !== null && newInputData.enteredDate !== undefined && newInputData.enteredDate !== "" ? (moment(newInputData.enteredDate, "YYYY-MM-DDTHH:mm:ss.000Z").format("YYYYMMDDHHmm")) : null;
        inputFormData.comments = newInputData.comments;
        inputFormData.bodyTemperature.vitalMeasurementName = "Temperature";
        inputFormData.pulseRate.vitalMeasurementName = "Pulse Rate";
        inputFormData.heartRate.vitalMeasurementName = "Heart Rate";
        inputFormData.respirationRate.vitalMeasurementName = "Respiration";
        inputFormData.bloodPressure.vitalMeasurementName = "Blood Pressure";
        inputFormData.bloodOxygen.vitalMeasurementName = "Blood Oxygen";
        inputFormData.weight.vitalMeasurementName = "Weight";
        inputFormData.height.vitalMeasurementName = "Height";
        inputFormData.bloodGlucoseLevel.vitalMeasurementName = "Blood Glucose";
        inputFormData.circumferenceOrGirth.vitalMeasurementName = "Circumference/Girth";
        inputFormData.pain.vitalMeasurementName = "Pain";
        inputFormData.pulseOximetry.vitalMeasurementName = "Pulse Oximetry";
        if (newInputData.vitalType === "Temperature") {
            inputFormData.bodyTemperature.value = newInputData.value;
            inputFormData.bodyTemperature.unit = newInputData.unit;
            inputFormData.bodyTemperature.btQualifiers.location = newInputData.dropDown1;
        } else if (newInputData.vitalType === "Pulse Rate") {
            inputFormData.pulseRate.value = newInputData.value;
            inputFormData.pulseRate.unit = newInputData.unit;
            inputFormData.pulseRate.prQualifiers.location = newInputData.dropDown1;
            inputFormData.pulseRate.prQualifiers.position = newInputData.dropDown2;
            inputFormData.pulseRate.prQualifiers.method = newInputData.dropDown3;
            inputFormData.pulseRate.prQualifiers.site = newInputData.dropDown4;
        } else if (newInputData.vitalType === "Heart Rate") {
            inputFormData.heartRate.value = newInputData.value;
            inputFormData.heartRate.unit = newInputData.unit;
            inputFormData.heartRate.hrQualifiers.location = newInputData.dropDown1;
        } else if (newInputData.vitalType === "Respiration") {
            inputFormData.respirationRate.value = newInputData.value;
            inputFormData.respirationRate.unit = newInputData.unit;
            inputFormData.respirationRate.rrQualifiers.method = newInputData.dropDown1;
            inputFormData.respirationRate.rrQualifiers.position = newInputData.dropDown2;
        } else if (newInputData.vitalType === "Blood Pressure") {
            inputFormData.bloodPressure.systolicValue = newInputData.systolicValue;
            inputFormData.bloodPressure.diastolicValue = newInputData.diastolicValue;
            inputFormData.bloodPressure.unit = newInputData.unit;
            inputFormData.bloodPressure.bpQualifiers.method = newInputData.dropDown1;
            inputFormData.bloodPressure.bpQualifiers.position = newInputData.dropDown2;
            inputFormData.bloodPressure.bpQualifiers.cuffSize = newInputData.dropDown3;
        } else if (newInputData.vitalType === "Blood Oxygen") {
            inputFormData.bloodOxygen.value = newInputData.value;
            inputFormData.bloodOxygen.unit = newInputData.unit;
            inputFormData.bloodOxygen.boQualifiers.method = newInputData.dropDown1;
        } else if (newInputData.vitalType === "Weight") {
            inputFormData.weight.value = newInputData.value;
            inputFormData.weight.unit = newInputData.unit;
            inputFormData.weight.wqualifiers.method = newInputData.dropDown1;
            inputFormData.weight.wqualifiers.quality = newInputData.dropDown2;
        } else if (newInputData.vitalType === "Height") {
            inputFormData.height.value = newInputData.value;
            inputFormData.height.unit = newInputData.unit;
            inputFormData.height.hqualifiers.quality = newInputData.dropDown1;
        } else if (newInputData.vitalType === "Blood Glucose") {
            inputFormData.bloodGlucoseLevel.value = newInputData.value;
            inputFormData.bloodGlucoseLevel.unit = newInputData.unit;
            inputFormData.bloodGlucoseLevel.bgQualifiers.location = newInputData.dropDown1;
            inputFormData.bloodGlucoseLevel.bgQualifiers.position = newInputData.dropDown2;
            inputFormData.bloodGlucoseLevel.bgQualifiers.quality = newInputData.dropDown3;
        } else if (newInputData.vitalType === "Circumference/Girth") {
            inputFormData.circumferenceOrGirth.value = newInputData.value;
            inputFormData.circumferenceOrGirth.unit = newInputData.unit;
            inputFormData.circumferenceOrGirth.cgQualifiers.location = newInputData.dropDown1;
            inputFormData.circumferenceOrGirth.cgQualifiers.site = newInputData.dropDown2;
        } else if (newInputData.vitalType === "Pain") {
            inputFormData.pain.value = newInputData.value;
            inputFormData.pain.unit = newInputData.unit;
        } else if (newInputData.vitalType === "Pulse Oximetry") {
            inputFormData.pulseOximetry.value = newInputData.value;
            inputFormData.pulseOximetry.unit = newInputData.unit;
            inputFormData.pulseOximetry.poQualifiers.method = newInputData.dropDown1;
            inputFormData.pulseOximetry.poQualifiers.supplimentalOxygen = newInputData.dropDown2;
            inputFormData.pulseOximetry.poQualifiers.flowRate = newInputData.dropDown3;
            inputFormData.pulseOximetry.poQualifiers.o2concentration = newInputData.dropDown4;
        }
        inputFormData.comments = newInputData.comments;
        inputFormData.id = newInputData.id;
        setNewInputData({ ...newInputData });
        //  console.log(JSON.stringify(inputFormData));
        setInputFormData({ ...inputFormData });
        setSpinner(true);
        if (inputFormData.id !== "") {
            dispatch(updatePatientVitalsById(inputFormData));            
        } else {
            dispatch(createPatientVitals(inputFormData));
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
            <div className="bed-details" style={{ height: newInputData.vitalType !== "Pain" ? "981px" : "800px" }}>
                <div className="bed-details-child" />
                <div className="bed-details-child1" style={{ height: "928px" }} />
                <div className="bedline-div" style={{ top: "166.5px", left: "265px", width: "calc(100% - 483px)" }} />
                <div className="bedexpand-more-24px-parent">
                    <img
                        className="bedexpand-more-24px-icon"
                        alt=""
                        src="/expand-more-24px.svg"
                    />
                    <div className="beddetails" style={{ position: "relative", top: "79px", left: "268px" }}> <i onClick={handleBackclick} style={{ position: "relative", top: "6px", left: "-7px",cursor:"pointer" }} className="large material-icons">arrow_back</i>Add Patient Vital</div>
                </div>
                <div style={{ top: "6px", background: decryptPatientId != "" ? '#2D56AD' : "#FFF", height: decryptPatientId != "" ? '98px' : '0px', display: 'flex', width: 'calc(100% - 0px)', position: 'absolute', left: "0px" }} >
                    {decryptPatientId && <>
                        <div id="mettlerEmptyPadding" className="p-col-12 p-md-1">
                            <img style={{ width: '60px', height: '60px', position: 'relative', left: '21px', top: '23px', borderRadius: patientImage !== "" ? "30px" : "" }} src={patientImage !== "" ? patientImage : AvatarBigImage}></img>
                        </div>
                        <div id="mettlerEmptyPadding" style={{ display: 'flex', flexDirection: 'column' }} className="p-col-12 p-md-6">
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div style={{ position: 'relative', top: '19px', minWidth: 'max-content', fontSize: '18px' }} className="App-TopBar-PatientName">{inputPatientInfo}</div>
                                <div style={{ position: 'relative', top: '23px', left: '6px', minWidth: 'max-content', fontSize: '14px' }} className="App-TopBar-PatientAge">{patientAge} Years</div>

                                <div className="admit-patient-ss" style={{ width: '110px', height: '24px', background: '#5574B7', border: '1px solid #5574B7', position: 'relative', top: '19px', left: '23px' }}>
                                    <div style={{ fontWeight: 400, fontSize: '12px', opacity: 0.6, color: '#FFF' }} className="admit-patient-profileName">SS#:</div>
                                    <div style={{ fontWeight: 400, fontSize: '12px', color: '#FFF' }} className="admit-patient-profileName">SS-</div>
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
                    </>}
                </div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div className="bedorgForm-fields">
                        {newInputData.vitalType === "Blood Pressure" ? <>
                            <TextField
                                id="systolicValue"
                                className="name-input13"
                                color="primary"
                                variant="outlined"
                                type="text"
                                label="Systolic Value"
                                placeholder="Placeholder"
                                size="medium"
                                margin="none"
                                value={newInputData.systolicValue}
                                onChange={handleInputChange}
                            />
                            <TextField
                                id="diastolicValue"
                                className="name-input13"
                                color="primary"
                                variant="outlined"
                                type="text"
                                label="Diastolic Value"
                                placeholder="Placeholder"
                                size="medium"
                                margin="none"
                                value={newInputData.diastolicValue}
                                onChange={handleInputChange}
                            /></> :
                            <TextField
                                id="value"
                                className="name-input13"
                                color="primary"
                                variant="outlined"
                                type="text"
                                label="Value"
                                placeholder="Placeholder"
                                size="medium"
                                margin="none"
                                value={newInputData.value} onChange={handleInputChange}
                            />}
                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span >Unit
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Unit" id="unit" name="unit" value={newInputData.unit} onChange={handleInputChange}>
                                <MenuItem value="1">Vital Unit1</MenuItem>
                                <MenuItem value="2">Vital Unit2</MenuItem>
                                <MenuItem value="3">Vital Unit3</MenuItem>
                            </Select>
                            <FormHelperText />
                        </FormControl>
                    </div>

                    <div style={newInputData.vitalType !== "Pain" ? { fontSize: "16px", position: "absolute", top: newInputData.vitalType !== "Pain" ? "371px" : "0px", left: "303px", color: "black", fontWeight: "bold" } : {}}>Qualifiers</div>
                    <div className="bedorgForm-fields2" style={newInputData.vitalType !== "Pain" ? { top: "436px" } : {}}>
                        {newInputData.vitalType !== "Pain" ? <>
                            <FormControl className="name-input13" variant="outlined">
                                <InputLabel color="primary" ><span >{newInputData.vitalType === "Temperature" || newInputData.vitalType === "" || newInputData.vitalType === "Pulse Rate" || newInputData.vitalType === "Heart Rate" || newInputData.vitalType === "Blood Glucose" || newInputData.vitalType === "Circumference/Girth" ? "Location" :
                                    newInputData.vitalType === "Respiration" || newInputData.vitalType === "Weight" || newInputData.vitalType === "Blood Oxygen" || newInputData.vitalType === "Pulse Oximetry" || newInputData.vitalType === "Blood Pressure" ? "Method" :
                                        newInputData.vitalType === "Height" ? "Quality" : ""}
                                </span></InputLabel>
                                <Select style={newInputData.vitalType === "Temperature" || newInputData.vitalType === "Heart Rate" || newInputData.vitalType === "Blood Oxygen" || newInputData.vitalType === "Height" ? { width: '50%' } : {}} color="primary" size="medium"
                                    label={newInputData.vitalType === "Temperature" || newInputData.vitalType === "" || newInputData.vitalType === "Pulse Rate" || newInputData.vitalType === "Heart Rate" || newInputData.vitalType === "Blood Glucose" || newInputData.vitalType === "Circumference/Girth" ? "Location" :
                                        newInputData.vitalType === "Respiration" || newInputData.vitalType === "Weight" || newInputData.vitalType === "Blood Oxygen" || newInputData.vitalType === "Pulse Oximetry" || newInputData.vitalType === "Blood Pressure" ? "Method" :
                                            newInputData.vitalType === "Height" ? "Quality" : ""} id="dropDown1" name="dropDown1" value={newInputData.dropDown1} onChange={handleInputChange}>
                                    {newInputData.vitalType === "Temperature" || newInputData.vitalType === "" || newInputData.vitalType === "Pulse Rate" || newInputData.vitalType === "Heart Rate" || newInputData.vitalType === "Blood Glucose" || newInputData.vitalType === "Circumference/Girth" ? (newLocationDropDown) :
                                        newInputData.vitalType === "Respiration" || newInputData.vitalType === "Weight" || newInputData.vitalType === "Blood Oxygen" || newInputData.vitalType === "Pulse Oximetry" || newInputData.vitalType === "Blood Pressure" ? (newMethodDropDown) :
                                            newInputData.vitalType === "Height" ? (newQualityDropDown) :
                                                <><MenuItem value="1">Vital Unit1</MenuItem>
                                                    <MenuItem value="2">Vital Unit2</MenuItem>
                                                    <MenuItem value="3">Vital Unit3</MenuItem></>}
                                </Select>
                                <FormHelperText />
                            </FormControl></> : <></>}
                        {newInputData.vitalType !== "Pain" && newInputData.vitalType !== "Temperature" && newInputData.vitalType !== "Heart Rate" && newInputData.vitalType !== "Blood Oxygen" && newInputData.vitalType !== "Height" ?
                            <FormControl className="name-input13" variant="outlined">
                                <InputLabel color="primary" ><span >{newInputData.vitalType === "Pulse Rate" || newInputData.vitalType === "Respiration" || newInputData.vitalType === "Blood Pressure" || newInputData.vitalType === "Blood Glucose" ? "Position" :
                                    newInputData.vitalType === "Weight" ? "Quality" : newInputData.vitalType === "Circumference/Girth" ? "Site" : "Supplemental Oxygen"}
                                </span></InputLabel>
                                <Select color="primary" size="medium" label={newInputData.vitalType === "Pulse Rate" || newInputData.vitalType === "Respiration" || newInputData.vitalType === "Blood Pressure" || newInputData.vitalType === "Blood Glucose" ? "Position" :
                                    newInputData.vitalType === "Weight" ? "Quality" : newInputData.vitalType === "Circumference/Girth" ? "Site" : "Supplemental Oxygen"} id="dropDown2" name="dropDown2" value={newInputData.dropDown2} onChange={handleInputChange}>
                                    {newInputData.vitalType === "Pulse Rate" || newInputData.vitalType === "Respiration" || newInputData.vitalType === "Blood Pressure" || newInputData.vitalType === "Blood Glucose" ? (newPositionDropDown) :
                                        newInputData.vitalType === "Weight" ? (newQualityDropDown) : newInputData.vitalType === "Circumference/Girth" ? (newSiteDropDown) :
                                            <><MenuItem value="1">Vital Unit1</MenuItem>
                                                <MenuItem value="2">Vital Unit2</MenuItem>
                                                <MenuItem value="3">Vital Unit3</MenuItem></>}
                                </Select>
                                <FormHelperText />
                            </FormControl> : <></>}
                    </div>
                    <div className="bedorgForm-fields3" style={{ position: "absolute", display: "flex", flexDirection: "row-reverse", top: newInputData.vitalType !== "Pain" ? "508px" : "0px" }}>
                        {newInputData.vitalType !== "Pain" && newInputData.vitalType !== "Temperature" && newInputData.vitalType !== "Heart Rate" && newInputData.vitalType !== "Blood Oxygen" && newInputData.vitalType !== "Height" && newInputData.vitalType !== "Respiration"
                            && newInputData.vitalType !== "Weight" && newInputData.vitalType !== "Circumference/Girth" && newInputData.vitalType !== "Blood Pressure" && newInputData.vitalType !== "Blood Glucose" ?
                            <FormControl className="name-input13" variant="outlined">
                                <InputLabel color="primary" ><span >{newInputData.vitalType === "Pulse Rate" ? "Site" : newInputData.vitalType === "Pulse Oximetry" ? "Oxygen Concentration" : ""}
                                </span></InputLabel>
                                <Select color="primary" size="medium" label="Supervision Level" id="dropDown4" name="dropDown4" value={newInputData.dropDown4} onChange={handleInputChange}>
                                    {newInputData.vitalType === "Pulse Rate" ? (newSiteDropDown) :
                                        <><MenuItem value="1">Vital Unit1</MenuItem>
                                            <MenuItem value="2">Vital Unit2</MenuItem>
                                            <MenuItem value="3">Vital Unit3</MenuItem></>}
                                </Select>
                                <FormHelperText />
                            </FormControl> : <></>}
                        {newInputData.vitalType !== "Pain" && newInputData.vitalType !== "Temperature" && newInputData.vitalType !== "Heart Rate" && newInputData.vitalType !== "Blood Oxygen" && newInputData.vitalType !== "Height" && newInputData.vitalType !== "Respiration"
                            && newInputData.vitalType !== "Weight" && newInputData.vitalType !== "Circumference/Girth" ?
                            <FormControl className="name-input13" variant="outlined">
                                <InputLabel color="primary" ><span >{newInputData.vitalType === "Pulse Rate" ? "Method" : newInputData.vitalType === "Blood Pressure" ? "Cuff Size" : newInputData.vitalType === "Blood Glucose" ? "Quality" : newInputData.vitalType === "Pulse Oximetry" ? "Flow Rate" : ""}
                                </span></InputLabel>
                                <Select style={newInputData.vitalType === "Blood Pressure" || newInputData.vitalType === "Blood Glucose" ? { width: '49%' } : {}} color="primary" size="medium" label={newInputData.vitalType === "Pulse Rate" ? "Method" : newInputData.vitalType === "Blood Pressure" ? "Cuff Size" : newInputData.vitalType === "Blood Glucose" ? "Quality" : newInputData.vitalType === "Pulse Oximetry" ? "Flow Rate" : ""}
                                    id="dropDown3" name="dropDown3" value={newInputData.dropDown3} onChange={handleInputChange}>
                                    {newInputData.vitalType === "Pulse Rate" ? (newMethodDropDown) : newInputData.vitalType === "Blood Pressure" ? (newCuffSizeDropDown) : newInputData.vitalType === "Blood Glucose" ? (newQualityDropDown) :
                                        <><MenuItem value="1">Vital Unit1</MenuItem>
                                            <MenuItem value="2">Vital Unit2</MenuItem>
                                            <MenuItem value="3">Vital Unit3</MenuItem></>}
                                </Select>
                                <FormHelperText />
                            </FormControl> : <></>}
                    </div>


                    <div className="bedorgForm-fields8">

                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span >Vital Type
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Vital Type" id="vitalType" name="vitalType"
                                value={newInputData.vitalType} onChange={handleInputChange}>
                                <MenuItem value="Temperature">Temperature</MenuItem>
                                <MenuItem value="Pulse Rate">Pulse Rate</MenuItem>
                                <MenuItem value="Heart Rate">Heart Rate3</MenuItem>
                                <MenuItem value="Respiration">Respiration</MenuItem>
                                <MenuItem value="Blood Pressure">Blood Pressure</MenuItem>
                                <MenuItem value="Blood Oxygen">Blood Oxygen</MenuItem>
                                <MenuItem value="Weight">Weight</MenuItem>
                                <MenuItem value="Height">Height</MenuItem>
                                <MenuItem value="Blood Glucose">Blood Glucose</MenuItem>
                                <MenuItem value="Circumference/Girth">Circumference/Girth</MenuItem>
                                <MenuItem value="Pain">Pain</MenuItem>
                                <MenuItem value="Pulse Oximetry">Pulse Oximetry</MenuItem>
                            </Select>
                            <FormHelperText />
                        </FormControl>

                        <MobileDateTimePicker
                            className="name-input13"
                            label="Date of Entered"
                            slotProps={{
                                textField: {
                                    variant: "outlined",
                                    size: "medium",
                                    fullWidth: true,
                                    color: "primary",
                                },
                            }}
                            value={newInputData.enteredDate}
                            onChange={(newValue: any) => {
                                newInputData.enteredDate = newValue;
                                setNewInputData({ ...newInputData });
                            }}
                        />
                    </div>
                    <div className="bedorgForm-fields3" style={{ position: "absolute", display: "flex", flexDirection: "column", top: newInputData.vitalType !== "Pain" ? "586px" : "366px" }}>
                        <div style={{ fontWeight: "bold", fontSize: "16px", lineHeight: "24px", letterSpacing: "0.15px", color: "#000000" }}>Comments</div>
                        <div style={{ font: "poppins", fontWeight: "bold", fontSize: "15px", lineHeight: "22.5px", color: "#3F3F46" }}> <span style={{ left: "12px", position: "relative", font: "poppins", fontWeight: "lighter", fontSize: "15px", lineHeight: "22.5px", color: "#9DA1C3" }}>Jun-25, 2021 at 17:13</span></div>
                        <div style={{ position: "relative", font: "poppins", fontWeight: "lighter", fontSize: "14px", lineHeight: "21px", color: "#172B4D" }}>The objective of genuine health care reform must be premium</div>
                        <div style={{ top: "52px", position: "relative", font: "poppins", fontWeight: "lighter", fontSize: "15px", lineHeight: "22.5px", color: "#3F3F46" }}>Add Comment</div>

                    </div>
                    <div className="bedorgForm-fields3" style={{ display: "flex", top: newInputData.vitalType !== "Pain" ? "786px" : "553px" }}>
                        <TextField
                            id="comments"
                            className="name-input13"
                            color="primary"
                            variant="outlined"
                            type="text"
                            placeholder="Placeholder"
                            size="medium"
                            margin="none"
                            value={newInputData.comments} onChange={handleInputChange}
                        />
                        <div style={{ position: "absolute", left: "495px", top: "64px", gap: "23px", display: "flex" }} >
                            <div style={{ borderRadius: "4px", width: "40px", height: "40px", backgroundColor: "#E4EAF0", color: "#0000008A", cursor: "pointer" }}><i className="large material-icons" style={{ position: "absolute", top: "9px", left: "7px" }} >close</i></div>
                            <div style={{ borderRadius: "4px", width: "40px", height: "40px", backgroundColor: "#133C93", color: "#FFFFFF", cursor: "pointer" }}><i className="large material-icons" style={{ position: "absolute", top: "9px", left: "68px" }}>check</i></div>
                        </div>
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
    const { deviceFormData, getVitalsByPatientInputIdData, getAllStaffData, createPatientVitalsData, updatePatientVitalsData } = state;
    return {
        deviceFormData, getVitalsByPatientInputIdData, getAllStaffData, createPatientVitalsData, updatePatientVitalsData
    };
};

export default connect(mapStateToProps)(AddPatientVitals)




