
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
import searchImage from './../../../assets/images/mettler_images/Search.svg';
import { connect } from "react-redux";
import bottomImage from './../../../assets/images/mettler_images/bg.svg';
import PatientAllergyData from "./../../../assets/data/PatientAllergyData.json";
import SecondaryButton from "../../../components/SecondaryButton";
import PrimaryButton from "../../../components/PrimaryButton";
import Groupss from "../../../assets/images/mettler_images/Groupss.png";
import "../../../components/BottomFooter.css";
import { HttpLogin } from "../../../utils/Http";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
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
import admitpatientGroup from "./../../../assets/images/mettler_images/admitpatientGroup.svg";
import OverviewGroup from "./../../../assets/images/mettler_images/OverviewGroup.svg";
import q15Group from "./../../../assets/images/mettler_images/q15Group.svg";

interface IAAbnormalForm { }
interface IAAbnormalForm {
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
const AAbnormalForm: React.FC<IAAbnormalForm> = ({
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
        HttpLogin.axios().get("api/org/getById/" + orgData)
            .then((res) => {
                if (res.data.message.code === "MHC - 0200") {
                    setInputOrgData(res.data.data.organizationdetails[0].name);
                } else {
                    setInputOrgData("");
                }
            })
        if (decodeFinalId !== "") {
            HttpLogin.axios().get("api/patient/getPatient/" + decodeFinalPatientid)
                .then((response) => {
                //    console.log(JSON.stringify(response.data.data))                 
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

            dispatch(getAllergyByPatientInputId(decodeFinalPatientid, decodeFinalId));
        }
        dispatch(getAllStaff());
    }, []);

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
        } else if (event.target.name === "inactive") {
            inputFormData.inactive = event.target.value;
        }

        setInputFormData({ ...inputFormData });
    }
    const [isPatientPageLoaded, setPatientPageLoaded] = useState(false);

    if (!isPatientPageLoaded && !getAllergyByPatientInputIdData.isLoading) {
        if (getAllergyByPatientInputIdData.items !== undefined) {
            if (getAllergyByPatientInputIdData.items.message.code === "MHC - 0200") {
                getAllergyByPatientInputIdData.items.data.dateOfOnset = new Date(moment(getAllergyByPatientInputIdData.items.data.dateOfOnset, "YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z"));
                getAllergyByPatientInputIdData.items.data.observedDetails.reactionDateTime = new Date(moment(getAllergyByPatientInputIdData.items.data.observedDetails.reactionDateTime, "YYYYMMDDhhmmA").format("YYYY-MM-DDThh:mm:ss.000Z"));
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
        inputFormData.dateOfOnset = (moment(inputFormData.dateOfOnset, "YYYY-MM-DDTHH:mm:ss.000Z").format("YYYYMMDD"));
        inputFormData.observedDetails.reactionDateTime = (moment(inputFormData.observedDetails.reactionDateTime, "YYYY-MM-DDTHH:mm:ss.000Z").format("YYYYMMDDhhmmA"));
        if (inputFormData.id === "") {
            setInputFormData({ ...inputFormData });
            dispatch(createPatientAllergy(inputFormData));
            alert("Patient Allergy Created");
        } else {
            setInputFormData({ ...inputFormData });
            dispatch(updatePatientAllergyById(inputFormData));
            alert("Patient Allergy Updated");
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

    return (
        <>
            <div className="bed-details" style={{ height: "1458px" }}>
                <div className="bed-details-child" />
                <div className="bed-details-child1" style={{ height: "1458px" }} />
                <div className="bedline-div" style={{ top: "174.5px", left: "339.5", width: "calc(100 - 339.5px)" }} />
                <div className="bedexpand-more-24px-parent">
                    <img
                        className="bedexpand-more-24px-icon"
                        alt=""
                        src="/expand-more-24px.svg"
                    />
                    <div className="beddetails" style={{ top: "88px", zIndex: 1, left:isVisible? "309px":"12px" }}> <i style={{ position: "relative", top: "6px", left: "-7px", cursor: "pointer", }} className="large material-icons" ></i>Abnormal Involuntary Movement Scale</div>
                    <div style={{ top: "68px", position: "absolute" }}>
                        <div style={{ border: ' 1px solid #D4D4D4', cursor: "pointer", display: "flex", gap: "9px", top: "20px", position: "absolute", left: "971px", width: "96px", height: "32px", backgroundColor: "#F8F9FB", borderRadius: "4px" }}>
                            <div>
                                <i style={{ position: "absolute", top: "5px", left: "5px" }} className="large material-icons">print</i>
                            </div>
                            <div style={{ position: "absolute", top: "6px", left: "39px", fontSize: "14px" }}>Print</div>
                        </div>
                        <div style={{ border: ' 1px solid #D4D4D4', cursor: "pointer", display: "flex", position: "absolute", left: "831px", top: "20px", gap: "9px", backgroundColor: "#F8F9FB", height: "32px", width: "127.93px", borderRadius: "4px" }}>
                            <div><i style={{ position: "relative", top: "5px", left: "7px" }} className="large material-icons">file_download</i></div>
                            <div style={{ position: "absolute", top: "6px", left: "39px", fontSize: "14px" }}>Download</div>
                        </div>


                    </div>
                </div>
                <div style={{ top: "6px", background: '#2D56AD', height: '98px', display: 'flex', width: 'calc(100% - 0px)', position: 'absolute', left: "0px" }} ><div id="mettlerEmptyPadding" className="p-col-12 p-md-1">

                    <div id="mettlerEmptyPadding" className="p-col-12 p-md-1">
                        <img onClick={toggleVisibility} style={{ width: '60px', height: '60px', position: 'relative', left: '13px', top: '23px',cursor:"pointer" }} src={AvatarBigImage}></img>
                    </div>
                    <div id="mettlerEmptyPadding" style={{ display: 'flex', flexDirection: 'column' }} className="p-col-12 p-md-6">
                        <div style={{ display: 'flex', flexDirection: 'row', position: "absolute", top: "7px", left: "97px" }}>
                            <div style={{ position: 'relative', top: '19px', minWidth: 'max-content', fontSize: '18px' }} className="App-TopBar-PatientName">{inputPatientInfo}</div>
                            <div style={{ position: 'relative', top: '23px', left: '6px', minWidth: 'max-content', fontSize: '14px' }} className="App-TopBar-PatientAge">{patientAge}Years</div>

                            <div className="admit-patient-ss" style={{ width: '105px', height: '24px', background: '#5574B7', border: '1px solid #5574B7', position: 'relative', top: '19px', left: '23px' }}>
                                <div style={{ fontWeight: 400, fontSize: '12px', opacity: 0.6, color: '#FFF' }} className="admit-patient-profileName">SS#:</div>
                                <div style={{ fontWeight: 400, fontSize: '12px', color: '#FFF' }} className="admit-patient-profileName">SS-</div>
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
                                <span style={{ position: 'relative', top: '22px', left: '-13px', fontSize: '12px', width: '75px' }} className="App-TopBar-PatientValue"></span>
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
                {isVisible && (
                <div style={{ borderRadius: "14px", backgroundColor: "#FAFCFF", position: "relative", top: "106px", width: "330px", height: "1298px", display: "flex" }}>
                    <div style={{}}>
                        <img style={{ width: '48px', height: '48px', position: 'relative', left: '32px', top: '34px' }} src={AvatarBigImage}></img>
                        <div style={{ display: "flex", flexDirection: "column", left: "108px", position: 'absolute', top: "38px", gap: "5px" }}>
                            <span style={{ color: "#000000", font: "Poppins", fontWeight: "bold" }}>#V-1801</span>
                            <span style={{ color: "#000000", fontWeight: "lighter" }}>July 24, 10:30 PM</span>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", backgroundColor: "#EFF4FF", position: "absolute", top: "131px", left: "26px", width: "270px", height: "52px", borderRadius: "6px" }}>
                            <div>
                                <img src={OverviewGroup} style={{ position: "absolute", top: "19px", left: "7px" }}></img>
                                <span style={{ position: "absolute", top: "15px", left: "38px", fontSize: "17px", color: "#3F3F46" }}>Overview</span>
                            </div>
                            <div>
                                <img src={q15Group} style={{ position: "absolute", top: "76px", left: "7px" }}></img>
                                <span style={{ top: "72px", position: "absolute", left: "40px", fontSize: "16px" ,color:"black"}}>Q-15 Form</span>
                            </div>
                            <div>
                                <img src={admitpatientGroup} style={{  position: "absolute", top: "126px", left: "7px" }}></img>
                                <span style={{ top: "124px", position: "absolute", left: "40px", fontSize: "16px" ,color:"black"}}>Admit Patient</span>
                            </div>
                            <div>
                                <span style={{ position: "absolute", top: "171px",color:"black" }}><i className="large material-icons">chevron_right</i></span>
                                <span style={{ top: "172px", position: "absolute", left: "40px", fontSize: "16px" ,color:"black"}}>Patient Data/Orders</span>
                            </div>

                            <div style={{ position: "absolute", top: "23px" }}>
                                <span style={{ top: "199px", position: "absolute", transform: "rotate(90deg)",color:"black" }}><i className="large material-icons">chevron_right</i></span>
                                <span style={{ top: "199px", position: "absolute", left: "41px", fontSize: "16px", whiteSpace: "nowrap",color:"black" }}>Treatment Plan</span>
                                <div style={{ position: "absolute", left: "20px", top: "304px" }}>
                                    <input type="text" className="dashboard-search-text" id="new" name="new" placeholder="Search" style={{ paddingLeft: '36px', top: "-54px", fontFamily: 'system-ui', position: 'relative', width: '165px', left: '17px' }} />
                                    <img src={searchImage} style={{ width: '20px', height: '20px', position: 'relative', left: '25px', top: '-79px', opacity: 0.3 }}></img>
                                </div>

                            </div>
                            <div style={{ position: "absolute", top: "311px", left: '36px', backgroundColor: "#EFF4FF", width: "257px", height: "52px", borderRadius: "6px" }}>
                                <img src={Groupss}  style={{ fontWeight: "bolder", color: "#000000", fontSize: "35px", position: "absolute", top: "19px", left: "7px" }}></img>
                                <span style={{ position: "absolute", top: "15px", left: "38px", fontSize: "17px", color: "#3F3F46" }}>Abnormal Involunta...</span>
                            </div>
                            <div style={{ position: "absolute", top: "355px", left: '36px', width: "257px", height: "52px", borderRadius: "6px" }}>
                                <img src={Groupss}  style={{ fontWeight: "bolder", color: "#000000", fontSize: "35px", position: "absolute", top: "19px", left: "7px" }}></img>
                                <span style={{ position: "absolute", top: "15px", left: "38px", fontSize: "17px", color: "#3F3F46" }}>Form 2</span>
                            </div>
                            <div style={{ position: "absolute", top: "398px", left: '36px', width: "257px", height: "52px", borderRadius: "6px" }}>
                                <img src={Groupss}  style={{ fontWeight: "bolder", color: "#000000", fontSize: "35px", position: "absolute", top: "19px", left: "7px" }}></img>
                                <span style={{ position: "absolute", top: "15px", left: "38px", fontSize: "17px", color: "#3F3F46" }}>Form 3</span>
                            </div>
                            <div style={{position:"absolute",top:"46px"}}>
                                <span style={{ top: "419px", position: "absolute",color:"black" }}><i className="large material-icons">chevron_right</i></span>
                                <span style={{ top: "420px", position: "absolute", left: "41px", fontSize: "16px",color:"black" }}>Reports</span>
                            </div>
                        </div>

                    </div>
                </div>
                )}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div className="bedorgForm-fields" style={{ left:isVisible? "421px":"241px", top: "261px", display: "flex" }}>
                        <div style={{ position: "absolute", left: "320px", color: "#8494B7" }}>Date</div>
                        <div style={{ color: "#8494B7" }}>Veteran's Name</div>
                    </div>
                    <div className="bedorgForm-fields" style={{ left:isVisible? "421px":"241px", top: "286px", display: "flex", flexDirection: "row-reverse" }}>
                        <DatePicker
                            className="name-input13"

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


                        <TextField
                            id="comments" value={inputFormData.comments} onChange={handleInputChange}
                            className="name-input13"
                            color="primary"
                            variant="outlined"
                            type="text"
                            placeholder="- -"
                            size="medium"
                            margin="none"
                        />
                    </div>
                    <div className="bedorgForm-fields" style={{ left:isVisible? "421px":"241px", top: "360px", display: "flex" }}>
                        <div style={{ position: "absolute", left: "320px", color: "#8494B7" }}>Last four digits of SSN</div>
                        <div style={{ color: "#8494B7" }}>Veteran's DOB</div>
                    </div>
                    <div className="bedorgForm-fields2" style={{ top: "386px",left:isVisible? "421px":"241px" }}>
                        <DatePicker
                            className="name-input13"

                            slotProps={{
                                textField: {
                                    variant: "outlined",
                                    size: "medium",
                                    color: "primary",
                                },
                            }}


                        />


                        <TextField
                            id="comments" value={inputFormData.comments} onChange={handleInputChange}
                            className="name-input13"
                            color="primary"
                            variant="outlined"
                            type="text"
                            placeholder="- -"
                            size="medium"
                            margin="none"
                        />
                    </div>
                    <div className="bedorgForm-fields" style={{ left:isVisible? "421px":"241px", top: "460px", display: "flex" }}>
                        <div style={{ position: "absolute", left: "320px", color: "#8494B7" }}>Location</div>
                        <div style={{ color: "#8494B7" }}>Staff</div>
                    </div>
                    <div className="bedorgForm-fields3" style={{ position: "absolute", display: "flex", top: "486px", left:isVisible? "421px":"241px"}}>
                        <TextField
                            id="comments" value={inputFormData.comments} onChange={handleInputChange}
                            className="name-input13"
                            color="primary"
                            variant="outlined"
                            type="text"
                            placeholder="- -"
                            size="medium"
                            margin="none"
                        />
                        <TextField
                            id="comments" value={inputFormData.comments} onChange={handleInputChange}
                            className="name-input13"
                            color="primary"
                            variant="outlined"
                            type="text"
                            placeholder="- -"
                            size="medium"
                            margin="none"
                        />
                    </div>

                    <div className="bedorgForm-fields3" style={{ left:isVisible? "421px":"241px", position: "absolute", display: "flex", flexDirection: "column", top: "586px" }}>
                        <div style={{ font: "poppins", fontWeight: "lighter", fontSize: "15px", lineHeight: "22.5px", color: "#3F3F46" }}>Complete Examination Procedure before making ratings. MOVEMENT RATINGS: Rate highest severity observed. Rate movements that occur upon activation one LESS than those observed spontaneously</div>
                        <div style={{ font: "poppins", fontWeight: "lighter", fontSize: "15px", lineHeight: "22.5px", color: "#3F3F46" }}><span style={{ position: "relative", font: "poppins", fontWeight: "lighter", fontSize: "15px", lineHeight: "22.5px" }}>1. Facial and Oral Movements Muscles of facial expression, e.g., movements of forehead, eyebrows, periorbital area, cheeks. Include frowning, blinking, grimacing of upper face.</span></div>
                        <RadioGroup name="inactive" value={inputFormData.inactive} onChange={handleInputChange}
                            style={{ position: "absolute" }}
                            row>
                            <div className="frame-parent7" style={{ color: 'darkslategray', flexWrap: "nowrap", gap: "30px", position: "absolute", top: "165px", whiteSpace: "nowrap" }}>
                                <FormControlLabel
                                    style={{ position: "relative", top: "-14px", left: "9px" }}
                                    label="0. None"
                                    labelPlacement="end"
                                    control={<Checkbox color="primary" size="medium" id="checkboxgenderselection" />}

                                />
                            </div>
                        </RadioGroup>
                        <RadioGroup name="inactive" value={inputFormData.inactive} onChange={handleInputChange}
                            style={{ position: "absolute" }}
                            row>
                            <div className="frame-parent7" style={{ color: 'darkslategray', flexWrap: "nowrap", gap: "30px", position: "absolute", top: "165px", whiteSpace: "nowrap" }}>
                                <FormControlLabel
                                    style={{ position: "relative", top: "17px", left: "9px" }}
                                    label=" 1. Minimal, may be extreme normal"
                                    labelPlacement="end"
                                    control={<Checkbox color="primary" size="medium" id="checkboxgenderselection" />}

                                />
                            </div>
                        </RadioGroup>
                        <RadioGroup name="inactive" value={inputFormData.inactive} onChange={handleInputChange}
                            style={{ position: "absolute" }}
                            row>
                            <div className="frame-parent7" style={{ color: 'darkslategray', flexWrap: "nowrap", gap: "30px", position: "absolute", top: "165px", whiteSpace: "nowrap" }}>
                                <FormControlLabel
                                    style={{ position: "relative", top: "48px", left: "9px" }}
                                    label="2. Mild "
                                    labelPlacement="end"
                                    control={<Checkbox color="primary" size="medium" id="checkboxgenderselection" />}

                                />
                            </div>
                        </RadioGroup>
                        <RadioGroup name="inactive" value={inputFormData.inactive} onChange={handleInputChange}
                            style={{ position: "absolute" }}
                            row>
                            <div className="frame-parent7" style={{ color: 'darkslategray', flexWrap: "nowrap", gap: "30px", position: "absolute", top: "165px", whiteSpace: "nowrap" }}>
                                <FormControlLabel
                                    style={{ position: "relative", top: "78px", left: "9px" }}
                                    label=" 3. Moderate"
                                    labelPlacement="end"
                                    control={<Checkbox color="primary" size="medium" id="checkboxgenderselection" />}

                                />
                            </div>
                        </RadioGroup>
                        <RadioGroup name="inactive" value={inputFormData.inactive} onChange={handleInputChange}
                            style={{ position: "absolute" }}
                            row>
                            <div className="frame-parent7" style={{ color: 'darkslategray', flexWrap: "nowrap", gap: "30px", position: "absolute", top: "165px", whiteSpace: "nowrap" }}>
                                <FormControlLabel
                                    style={{ position: "relative", top: "110px", left: "9px" }}
                                    label=" 4. Severe"
                                    labelPlacement="end"
                                    control={<Checkbox color="primary" size="medium" id="checkboxgenderselection" />}

                                />
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="bedorgForm-fields3" style={{ left:isVisible? "421px":"241px", position: "absolute", display: "flex", flexDirection: "column", top: "957px" }}>
                        <div style={{ font: "poppins", fontWeight: "lighter", fontSize: "15px", lineHeight: "22.5px", color: "#3F3F46" }}>Complete Examination Procedure before making ratings. MOVEMENT RATINGS: Rate highest severity observed. Rate movements that occur upon activation one LESS than those observed spontaneously</div>
                        <div style={{ font: "poppins", fontWeight: "lighter", fontSize: "15px", lineHeight: "22.5px", color: "#3F3F46" }}><span style={{ position: "relative", font: "poppins", fontWeight: "lighter", fontSize: "15px", lineHeight: "22.5px" }}>1. Facial and Oral Movements Muscles of facial expression, e.g., movements of forehead, eyebrows, periorbital area, cheeks. Include frowning, blinking, grimacing of upper face.</span></div>
                        <RadioGroup name="inactive" value={inputFormData.inactive} onChange={handleInputChange}
                            style={{ position: "absolute" }}
                            row>
                            <div className="frame-parent7" style={{ color: 'darkslategray', flexWrap: "nowrap", gap: "30px", position: "absolute", top: "165px", whiteSpace: "nowrap" }}>
                                <FormControlLabel
                                    style={{ position: "relative", top: "-14px", left: "9px" }}
                                    label="0. None"
                                    labelPlacement="end"
                                    control={<Checkbox color="primary" size="medium" id="checkboxgenderselection" />}

                                />
                            </div>
                        </RadioGroup>
                        <RadioGroup name="inactive" value={inputFormData.inactive} onChange={handleInputChange}
                            style={{ position: "absolute" }}
                            row>
                            <div className="frame-parent7" style={{ color: 'darkslategray', flexWrap: "nowrap", gap: "30px", position: "absolute", top: "165px", whiteSpace: "nowrap" }}>
                                <FormControlLabel
                                    style={{ position: "relative", top: "17px", left: "9px" }}
                                    label=" 1. Minimal, may be extreme normal"
                                    labelPlacement="end"
                                    control={<Checkbox color="primary" size="medium" id="checkboxgenderselection" />}

                                />
                            </div>
                        </RadioGroup>
                        <RadioGroup name="inactive" value={inputFormData.inactive} onChange={handleInputChange}
                            style={{ position: "absolute" }}
                            row>
                            <div className="frame-parent7" style={{ color: 'darkslategray', flexWrap: "nowrap", gap: "30px", position: "absolute", top: "165px", whiteSpace: "nowrap" }}>
                                <FormControlLabel
                                    style={{ position: "relative", top: "48px", left: "9px" }}
                                    label="2. Mild "
                                    labelPlacement="end"
                                    control={<Checkbox color="primary" size="medium" id="checkboxgenderselection" />}

                                />
                            </div>
                        </RadioGroup>
                        <RadioGroup name="inactive" value={inputFormData.inactive} onChange={handleInputChange}
                            style={{ position: "absolute" }}
                            row>
                            <div className="frame-parent7" style={{ color: 'darkslategray', flexWrap: "nowrap", gap: "30px", position: "absolute", top: "165px", whiteSpace: "nowrap" }}>
                                <FormControlLabel
                                    style={{ position: "relative", top: "78px", left: "9px" }}
                                    label=" 3. Moderate"
                                    labelPlacement="end"
                                    control={<Checkbox color="primary" size="medium" id="checkboxgenderselection" />}

                                />
                            </div>
                        </RadioGroup>
                        <RadioGroup name="inactive" value={inputFormData.inactive} onChange={handleInputChange}
                            style={{ position: "absolute" }}
                            row>
                            <div className="frame-parent7" style={{ color: 'darkslategray', flexWrap: "nowrap", gap: "30px", position: "absolute", top: "165px", whiteSpace: "nowrap" }}>
                                <FormControlLabel
                                    style={{ position: "relative", top: "110px", left: "9px" }}
                                    label=" 4. Severe"
                                    labelPlacement="end"
                                    control={<Checkbox color="primary" size="medium" id="checkboxgenderselection" />}

                                />
                            </div>
                        </RadioGroup>
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
    const { deviceFormData, getAllergyByPatientInputIdData, getAllStaffData } = state;
    return {
        deviceFormData, getAllergyByPatientInputIdData, getAllStaffData
    };
};

export default connect(mapStateToProps)(AAbnormalForm)




