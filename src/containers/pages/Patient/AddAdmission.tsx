
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

interface IAddAdmission { }
interface IAddAdmission {
    StaticPage: any;
    dispatch: Dispatch<any>;
    match: any;
    getAllergyByPatientInputIdData: any;
    getAllStaffData: any;
    state: {
        nodes: [],
        checked: [],
        expanded: []
    }
}
const AddAdmission: React.FC<IAddAdmission> = ({
    dispatch, match, getAllergyByPatientInputIdData, getAllStaffData


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
    useEffect(() => {
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
        orgData = orgData.loginInput.organization;
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
            })
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
            setGetStaffDataItems(getAllStaffData.items.data.filter(t => t.organization === inputOrgData));
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
            alert("Patient Allergy Created");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            setInputFormData({ ...inputFormData });
            dispatch(updatePatientAllergyById(inputFormData));
            alert("Patient Allergy Updated");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }

    }

    return (
        <>
            <div className="bed-details" style={{ height: "1140px" }}>
                <div className="bed-details-child" />
                <div className="bed-details-child1" style={{ height: "1298px" }} />
                <div className="bedline-div" style={{ top: "204.5px", left: "32px", width: "calc(100% - 68px)" }} />
                <div className="bedexpand-more-24px-parent">
                    <img
                        className="bedexpand-more-24px-icon"
                        alt=""
                        src="/expand-more-24px.svg"
                    />
                    <div className="beddetails" style={{ top: "-9px", left: "0px" }}> <i style={{ position: "relative", top: "6px", left: "-7px", cursor: "pointer" }} className="large material-icons" >arrow_back</i>Add Admission</div>
                </div>
                <div style={{ top: "74px", background: "#FFF", height: '0px', display: 'flex', width: 'calc(100% - 0px)', position: 'absolute', left: "43px" }} >
                    <div id="mettlerEmptyPadding" className="p-col-12 p-md-1">

                        <div id="mettlerEmptyPadding" className="p-col-12 p-md-1">
                            <img style={{ width: '60px', height: '60px', position: 'relative', left: '13px', top: '34px' }} src={AvatarBigImage}></img>
                        </div>
                        <div id="mettlerEmptyPadding" style={{ display: 'flex', flexDirection: 'column' }} className="p-col-12 p-md-6">
                            <div style={{ display: 'flex', flexDirection: 'row', position: "absolute", top: "7px", left: "97px" }}>
                                <div style={{ position: 'relative', top: '19px', minWidth: 'max-content', fontSize: '18px', color: "#3F3F46" }} className="App-TopBar-PatientName">Kory Okumus</div>
                                <div style={{ position: 'relative', top: '23px', left: '6px', minWidth: 'max-content', fontSize: '14px' }} className="App-TopBar-PatientAge">{patientAge} Years</div>

                                <div className="admit-patient-ss" style={{ width: '105px', height: '24px', background: '#ECF1FF', border: '1px solid #E2E7F4', position: 'relative', top: '71px', left: '-168px' }}>
                                    <div style={{ fontWeight: 400, fontSize: '12px', opacity: 0.6, color: '#3F3F46' }} className="admit-patient-profileName">SS#:</div>
                                    <div style={{ fontWeight: 400, fontSize: '12px', color: '#3F3F46' }} className="admit-patient-profileName">SS-{patientSSN}</div>
                                </div>
                                <div className="admit-patient-ss" style={{ width: '110px', height: '24px', position: 'relative', top: '71px', left: "-140px", background: '#ECF1FF', border: '1px solid #E2E7F4' }}>
                                    <div style={{ fontWeight: 400, fontSize: '12px', opacity: 0.6, color: '#3F3F46' }} className="admit-patient-profileName">MR:</div>
                                    <div style={{ fontWeight: 400, fontSize: '12px', color: '#3F3F46' }} className="admit-patient-profileName">MR-345</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', position: "absolute", top: "23px", left: "241px" }}>
                                <div style={{ position: 'relative', display: 'flex' }} >
                                    <span style={{ opacity: 0.6000000238418579, position: 'relative', left: '7px', top: '9px', fontSize: '13px', color: "black" }} className="App-TopBar-BloodName">DOB:</span>
                                    <span style={{ position: 'relative', top: '8px', left: '14px', fontSize: '13px', width: '75px', color: "black", whiteSpace: "nowrap" }} className="App-TopBar-PatientValue">May 24,1989</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', position: "absolute", top: "22px", left: "254px" }}>
                                <div style={{ position: 'relative', display: 'flex', left: "123px" }} >
                                    <span style={{ opacity: 0.6000000238418579, position: 'relative', left: '7px', top: '9px', fontSize: '13px', color: "black" }} className="App-TopBar-BloodName">Gender:</span>
                                    <span style={{ position: 'relative', top: '8px', left: '14px', fontSize: '13px', width: '75px', color: "black" }} className="App-TopBar-PatientValue">Male</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div id="mettlerEmptyPadding" className="p-col-12 p-md-5">  </div>
                </div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>

                    <div className="bedorgForm-fields" style={{ top: "277px", display: "flex", flexDirection: "row-reverse" }}>
                        <MobileDateTimePicker
                            className="name-input13"
                            label="Admission Date & Time"
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
                            <InputLabel color="primary" ><span >Patient ID
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Allergy Name" name="causativeAgentName" value={inputFormData.causativeAgentName} onChange={handleInputChange}>
                                {newAllergyInputData}
                            </Select>
                            <FormHelperText />
                        </FormControl>
                    </div>

                    <div className="bedorgForm-fields2" style={{ top: "364px" }}>
                    <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span >Admission Type
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Nature of Reaction" name="natureOfReaction" >
                                {newNatureOfReactionInputData}
                            </Select>
                            <FormHelperText />
                        </FormControl>


                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span >Attending Physician
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Nature of Reaction" name="natureOfReaction" >
                                {newNatureOfReactionInputData}
                            </Select>
                            <FormHelperText />
                        </FormControl>
                    </div>
                    <div className="bedorgForm-fields3" style={{ position: "absolute", display: "flex", top: "452px" }}>
                        <TextField
                            id="comments"
                            className="name-input13"
                            color="primary"
                            variant="outlined"
                            type="text"
                            label="Facility Treating Speciality"
                            size="medium"
                            margin="none"
                        />
                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span>Ward Location
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Ward Location" multiple={true} name="symptoms">

                            </Select>
                            <FormHelperText />
                        </FormControl>
                    </div>
                    <div className="bedorgForm-fields8" style={{ top: "545px" }}>
                        <TextField
                            id="comments"
                            className="name-input13"
                            color="primary"
                            variant="outlined"
                            type="text"
                            label="Brief Description"

                            size="medium"
                            margin="none"
                        />
                    </div>
                    <div className="bedorgForm-fields8" style={{ top: "638px" }}>
                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span >Source of admission
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Source of admission" id="physicianName" name="physicianName" >

                            </Select>
                            <FormHelperText />
                        </FormControl>
                        <TextField
                            id="comments"
                            className="name-input13"
                            color="primary"
                            variant="outlined"
                            type="text"
                            label="Primary Physician"
                            size="medium"
                            margin="none"
                        />
                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span >Room Bed
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Room Bed" id="physicianName" name="physicianName" >

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
    const { deviceFormData, getAllergyByPatientInputIdData, getAllStaffData } = state;
    return {
        deviceFormData, getAllergyByPatientInputIdData, getAllStaffData
    };
};

export default connect(mapStateToProps)(AddAdmission)




