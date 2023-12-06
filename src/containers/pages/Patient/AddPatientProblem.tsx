
import { useState, Dispatch, useEffect } from "react";
import {
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    FormHelperText,
    Select,
} from "@mui/material";
import "./../Bed/BedMasterConfiguration.css";
import React from "react";
import { connect } from "react-redux";
import bottomImage from './../../../assets/images/mettler_images/bg.svg';
import PatientProblemsData from "./../../../assets/data/PatientProblemData.json";
import SecondaryButton from "../../../components/SecondaryButton";
import PrimaryButton from "../../../components/PrimaryButton";
import "../../../components/BottomFooter.css";
import { HttpLogin } from "../../../utils/Http";
import { MobileDateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { createPatientProblems, getProblemsByPatientInputId, updatePatientProblemsById } from "../../../store/actions/PatientProblem";
import moment from "moment";
import { getAllStaff } from "../../../store/actions/Staff";
import AvatarBigImage from './../../../assets/images/mettler_images/AvatarBigImage.png';
import bloodBag from './../../../assets/images/mettler_images/blood_bag.svg';
import bloodDrop from './../../../assets/images/mettler_images/blood_drop.svg';
import bloodDropNew from './../../../assets/images/mettler_images/blood_dropNew.svg';
import bloodDropNewOne from './../../../assets/images/mettler_images/blood_dropNewOne.svg';
import AvatarDoctorImage from './../../../assets/images/mettler_images/AvatarDoctor.png';
import loaddingFile from '../../../../src/assets/images/tenor.gif';
interface IAddPatientProblem { }
interface IAddPatientProblem {
    StaticPage: any;
    dispatch: Dispatch<any>;
    getProblemsByPatientInputIdData: any;
    createPatientProblemsData:any;
    updatePatientProblemsData:any;
    match: any;
    getAllStaffData: any;
    state: {
        nodes: [],
        checked: [],
        expanded: []
    }
}
const AddPatientProblem: React.FC<IAddPatientProblem> = ({
    dispatch, getProblemsByPatientInputIdData, getAllStaffData, match,createPatientProblemsData,updatePatientProblemsData


}) => {


    let [inputFormData, setInputFormData] = useState(PatientProblemsData);
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
    let [ProblemCategoryData, setProblemCategoryData] = useState(null);
    let [patientAge, setPatientAge] = useState(null);
    let [StatusData, setStatusData] = useState(null);
    let [ImmediacyData, setImmediacyData] = useState(null);
    let [ProblemDescription, setProblemDescription] = useState(null);
    let [TreatmentFactors, setTreatmentFactors] = useState(null);
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
                let ProblemCategoryInputData = response.data.data.filter(k => k.dropdown === "problemCategory").map((i) => { return i.list })
                setProblemCategoryData(ProblemCategoryInputData[0]);
                let StatusData = response.data.data.filter(k => k.dropdown === "status").map((i) => { return i.list })
                setStatusData(StatusData[0]);
                let Immediacy = response.data.data.filter(k => k.dropdown === "immediacy").map((i) => { return i.list })
                setImmediacyData(Immediacy[0]);
                let ProblemDescriptiondrop = response.data.data.filter(k => k.dropdown === "ProblemDescription").map((i) => { return i.list })
                setProblemDescription(ProblemDescriptiondrop[0]);
                let TreatmentFactorsdrop = response.data.data.filter(k => k.dropdown === "TreatmentFactors").map((i) => { return i.list })
                setTreatmentFactors(TreatmentFactorsdrop[0]);
            })

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
            dispatch(getProblemsByPatientInputId(decodeFinalPatientid, decodeFinalId));
        }

        dispatch(getAllStaff());
    }, []);

    let newProblemCategoryData = ProblemCategoryData != null && ProblemCategoryData.length > 0 && ProblemCategoryData.map((item, i) => {
        return (
          <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
        )
      })
      let newStatusDataData = StatusData != null && StatusData.length > 0 && StatusData.map((item, i) => {
        return (
          <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
        )
      })
      let newImmediacyData = ImmediacyData != null && ImmediacyData.length > 0 && ImmediacyData.map((item, i) => {
        return (
          <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
        )
      })
      let newProblemDescription = ProblemDescription != null && ProblemDescription.length > 0 && ProblemDescription.map((item, i) => {
        return (
          <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
        )
      })
      let newTreatmentFactors = TreatmentFactors != null && TreatmentFactors.length > 0 && TreatmentFactors.map((item, i) => {
        return (
          <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
        )
      })

    const [organizationred, setorganizationred] = useState(false);
    const handleInputChange = (event: any) => {
        const {
            target: { value },
        } = event;
        if (event.target.id === "locationOfProblem") {
            inputFormData.locationOfProblem = event.target.value;
        } else if (event.target.name === "respProvider") {
            inputFormData.respProvider = event.target.value;
        } else if (event.target.id === "service") {
            inputFormData.service = event.target.value;
        } else if (event.target.name === "problemStatus") {
            inputFormData.problemStatus = event.target.value;
        } else if (event.target.name === "immediacy") {
            inputFormData.immediacy = event.target.value;
        } else if (event.target.name === "clinic") {
            inputFormData.clinic = event.target.value;
        } else if (event.target.name === "treatmentFactors") {
            inputFormData.treatmentFactors = typeof value === 'string' ? value.split(',') : value;
        } else if (event.target.name === "severityOfProblem") {
            inputFormData.severityOfProblem = event.target.value;
        } else if (event.target.name === "problemDescription") {
            inputFormData.problemDescription = event.target.value;
        } else if (event.target.id === "comments") {
            inputFormData.comments = event.target.value;
        }
        setInputFormData({ ...inputFormData });
    }
    const [isPatientPageLoaded, setPatientPageLoaded] = useState(false);

    if (!isPatientPageLoaded && !getProblemsByPatientInputIdData.isLoading) {
        if (getProblemsByPatientInputIdData.items !== undefined) {
            if (getProblemsByPatientInputIdData.items.message.code === "MHC - 0200") {
                getProblemsByPatientInputIdData.items.data.dateOfOnset = getProblemsByPatientInputIdData.items.data.dateOfOnset !== null ? new Date(moment(getProblemsByPatientInputIdData.items.data.dateOfOnset, "YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z")):null;
                getProblemsByPatientInputIdData.items.data.lastUpdate = getProblemsByPatientInputIdData.items.data.lastUpdate !== null ? new Date(moment(getProblemsByPatientInputIdData.items.data.lastUpdate, "YYYYMMDD").format("YYYY-MM-DDThh:mm:ss.000Z")):null;
                setInputFormData(getProblemsByPatientInputIdData.items.data);
                setSpinner(false);
            } else {
                setInputFormData({ ...inputFormData });
             
                alert(getProblemsByPatientInputIdData.items.message.description);
            }
        } else {
            setInputFormData({ ...PatientProblemsData })
        }
        setPatientPageLoaded(true);
    }
    if (!getProblemsByPatientInputIdData && getProblemsByPatientInputIdData.isFormSubmit) {

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
    const [isPatientProblemupdateLoaded, setPatientProblemupdateLoaded] = useState(false);

    if (!isPatientProblemupdateLoaded && !createPatientProblemsData.isLoading) { 
        createPatientProblemsData.items.data.dateOfOnset = createPatientProblemsData.items.data.dateOfOnset !== null ? new Date(moment(createPatientProblemsData.items.data.dateOfOnset, "YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z")):null;
        createPatientProblemsData.items.data.lastUpdate = createPatientProblemsData.items.data.lastUpdate !== null ? new Date(moment(createPatientProblemsData.items.data.lastUpdate, "YYYYMMDD").format("YYYY-MM-DDThh:mm:ss.000Z")):null;
          setInputFormData(createPatientProblemsData.items.data);    
      if (createPatientProblemsData.items.message.code === "MHC - 0200") {
        alert(createPatientProblemsData.items.message.description);  
        setTimeout(() => {
            window.location.href = "/MettlerVisitPatientdata/"+encryptPatientId+"/"+encryptVisitId; 
          setSpinner(false);
        }, (1000));   
        setPatientProblemupdateLoaded(true);    
      } else {
        alert(createPatientProblemsData.items.message.description);   
        setTimeout(() => {
            setPatientProblemupdateLoaded(false);
          setSpinner(false);
        }, (1000));
      }
    
  }
  if (!createPatientProblemsData && createPatientProblemsData.isFormSubmit) {
  
      setTimeout(() => {
        setPatientProblemupdateLoaded(false);
        setSpinner(false);
      }, (1000));
  }
  
  
  let [isPatientProblempatientLoaded, setPatientProblempatientLoaded] = useState(false);
  
  if (!isPatientProblempatientLoaded && !updatePatientProblemsData.isLoading) {
    updatePatientProblemsData.items.data.dateOfOnset = updatePatientProblemsData.items.data.dateOfOnset !== null ? new Date(moment(updatePatientProblemsData.items.data.dateOfOnset, "YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z")):null;
    updatePatientProblemsData.items.data.lastUpdate = updatePatientProblemsData.items.data.lastUpdate !== null ? new Date(moment(updatePatientProblemsData.items.data.lastUpdate, "YYYYMMDD").format("YYYY-MM-DDThh:mm:ss.000Z")):null;
  
    setInputFormData(updatePatientProblemsData.items.data); 
    if (updatePatientProblemsData.items.message.code === "MHC - 0200") {    
        alert(updatePatientProblemsData.items.message.description);   
    
        console.log(JSON.stringify(updatePatientProblemsData.items));  
        setTimeout(() => {
            window.location.href = "/MettlerVisitPatientdata/"+encryptPatientId+"/"+encryptVisitId; 
          setSpinner(false);
        }, (1000)); 
        setPatientProblempatientLoaded(true);  
    } else {
  
      alert(updatePatientProblemsData.items.message.description);     
      setTimeout(() => {
        setPatientProblempatientLoaded(false);
        setSpinner(false);
      }, (1000));    
    }  
  
  }
  const handleBackclick = () => {
    window.location.href = "/MettlerVisitPatientdata/"+encryptPatientId+"/"+encryptVisitId;
  }

    const handleClickChange = () => {
        inputFormData.patientId = decryptPatientId;
        inputFormData.lastVisit = decryptVisitId;
        inputFormData.dateOfOnset = inputFormData.dateOfOnset !== null ? (moment(inputFormData.dateOfOnset, "YYYY-MM-DDTHH:mm:ss.000Z").format("YYYYMMDD")) : null;
        inputFormData.lastUpdate = inputFormData.lastUpdate !== null ? (moment(inputFormData.lastUpdate, "YYYY-MM-DDTHH:mm:ss.000Z").format("YYYYMMDD")) : null;
        console.log(JSON.stringify(inputFormData));
        setSpinner(true);
        if (inputFormData.dateOfOnset === null || inputFormData.lastUpdate === null || inputFormData.respProvider === "" || inputFormData.locationOfProblem === "" || inputFormData.service === "" || inputFormData.immediacy === ""
            || inputFormData.severityOfProblem === "" || inputFormData.problemDescription === "") {
            inputFormData.dateOfOnset = null;
            inputFormData.lastUpdate = null;
            alert("Please Enter required data");
        } else if (inputFormData.id === "") {
            setInputFormData({ ...inputFormData });    
            dispatch(createPatientProblems(inputFormData));          
        } else {
            setInputFormData({ ...inputFormData });          
            dispatch(updatePatientProblemsById(inputFormData));            
        }
    }

    return (
        <>
 
            {/* style={{ fontFamily:" var(--font-poppins)",textAlign:"left",fontSize:"var(--font-size-sm)",color:"var(--color-tomato)",position:"relative",backgroundColor:"var(--color-gray-100)",width:"100%", heigth:"895px",overflow:"hidden",}} */}
            <div className="bed-details" style={{ height: "1219px" }} >
                <div className="bed-details-child" />
                <div style={{ position: "absolute", width: "calc(100% - 9px)", top: "15px", right: "208px", left: "7px", height: "800px" }} />
                <div className="bedline-div" style={{ top: "176px", left: "270px", width: "calc(100% - 477px)" }} />
                <div className="bedexpand-more-24px-parent">
                    <img
                        className="bedexpand-more-24px-icon"
                        alt=""
                        src="/expand-more-24px.svg"
                    />
                    <div className="beddetails" style={{ top: "88px", left: "239px" }}> <i onClick={handleBackclick} style={{ position: "relative", top: "7px", left: "-7px", cursor: "pointer" }} className="large material-icons">arrow_back</i>Add Patient Problem</div>
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
                {spinner &&
                (<div className='overlay-content'>
                    <div className='wrapper'>
                        <img alt="" src={loaddingFile} style={{ position: 'absolute', width: '100%', height:'-webkit-fill-available', zIndex: 2, opacity: '0.5' }} />
                    </div>
                </div>
                )}
                    <div className="bedorgForm-fields" style={{ top: "311px" }}>
                        <MobileDateTimePicker
                            className="name-input13"
                            label="Date of Onset"
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

                        <MobileDateTimePicker
                            className="name-input13"
                            label="Last Update"
                            slotProps={{
                                textField: {
                                    variant: "outlined",
                                    size: "medium",
                                    color: "primary",
                                },
                            }}
                            value={inputFormData.lastUpdate}
                            onChange={(newValue: any) => {
                                inputFormData.lastUpdate = newValue;
                                setInputFormData({ ...inputFormData });
                            }}
                        />
                    </div>
                    <div className="bedorgForm-fields2" style={{ top: "403px" }}>
                        <TextField
                            id="locationOfProblem" value={inputFormData.locationOfProblem} onChange={handleInputChange}
                            className="name-input13"
                            color="primary"
                            variant="outlined"
                            type="text"
                            label="Location"
                            placeholder="Placeholder"
                            size="medium"
                            margin="none"
                        />
                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span>Resp Provider</span></InputLabel>
                            <Select color="primary" size="medium" name="respProvider" value={inputFormData.respProvider} onChange={handleInputChange} label="Resp Provider">
                                <MenuItem value="Problem status1">Problem status1</MenuItem>
                                <MenuItem value="Problem status2">Problem status2</MenuItem>
                                <MenuItem value="Problem status3">Problem status3</MenuItem>
                            </Select>
                            <FormHelperText />
                        </FormControl>
                    </div>
                    <div className="bedorgForm-fields3" style={{ position: "absolute", display: "flex", top: "493px" }}>
                        <TextField
                            id="service" value={inputFormData.service} onChange={handleInputChange}
                            className="destination-name-input"
                            color="primary"
                            variant="outlined"
                            type="text"
                            label="Service"
                            placeholder="Placeholder"
                            size="medium"
                            margin="none"
                        />
                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary">Status</InputLabel>
                            <Select color="primary" size="medium" name="problemStatus" value={inputFormData.problemStatus} onChange={handleInputChange} label="Status">
                               {newStatusDataData}
                            </Select>
                            <FormHelperText />
                        </FormControl>
                    </div>
                    <div className="bedorgForm-fields3" style={{ position: "absolute", display: "flex", top: "584px" }}>
                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span>Immediacy</span></InputLabel>
                            <Select color="primary" size="medium" name="immediacy" value={inputFormData.immediacy} onChange={handleInputChange} label="Immediacy">
                               {newImmediacyData}
                            </Select>
                            <FormHelperText />
                        </FormControl>

                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span>Clinic</span></InputLabel>
                            <Select color="primary" size="medium" name="clinic" value={inputFormData.clinic} onChange={handleInputChange} label="Clinic">
                                <MenuItem value="Problem status1">Problem status1</MenuItem>
                                <MenuItem value="Problem status2">Problem status2</MenuItem>
                                <MenuItem value="Problem status3">Problem status3</MenuItem>
                            </Select>
                            <FormHelperText />
                        </FormControl>
                    </div>
                    <div className="bedorgForm-fields3" style={{ position: "absolute", display: "flex", flexDirection: "row-reverse", top: "682px" }}>


                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span>Treatment Factors</span></InputLabel>
                            <Select color="primary" size="medium" name="treatmentFactors" value={inputFormData.treatmentFactors} multiple={true} onChange={handleInputChange} label="Treatment Factors">
                                {newTreatmentFactors}
                            </Select>
                            <FormHelperText />
                        </FormControl>
                    </div>


                    <div className="bedorgForm-fields8" style={{ top: "217px" }} >
                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary">Problem category</InputLabel>
                            <Select color="primary" size="medium" name="severityOfProblem" value={inputFormData.severityOfProblem} onChange={handleInputChange} label="Problem category">
                               {newProblemCategoryData}
                            </Select>
                            <FormHelperText />
                        </FormControl>
                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary">Problem Description</InputLabel>
                            <Select color="primary" size="medium" name="problemDescription" value={inputFormData.problemDescription} onChange={handleInputChange} label="Supervision Level">
                             {newProblemDescription}
                            </Select>
                            <FormHelperText />
                        </FormControl>
                    </div>
                    <div className="bedorgForm-fields3" style={{ position: "absolute", display: "flex", flexDirection: "column", top: "776px" }}>
                        <div style={{ fontWeight: "bold", fontSize: "16px", lineHeight: "24px", letterSpacing: "0.15px", color: "#000000" }}>Comments</div>
                        <div style={{ font: "poppins", fontWeight: "bold", fontSize: "15px", lineHeight: "22.5px", color: "#3F3F46" }}>Robert<span style={{ left: "12px", position: "relative", font: "poppins", fontWeight: "lighter", fontSize: "15px", lineHeight: "22.5px", color: "#9DA1C3" }}>Jun-25, 2021 at 17:13</span></div>
                        <div style={{ position: "relative", font: "poppins", fontWeight: "lighter", fontSize: "14px", lineHeight: "21px", color: "#172B4D" }}>The objective of genuine health care reform must be premium</div>
                        <div style={{ top: "52px", position: "relative", font: "poppins", fontWeight: "lighter", fontSize: "15px", lineHeight: "22.5px", color: "#3F3F46" }}>Add Comment</div>

                    </div>
                    <div className="bedorgForm-fields3" style={{ display: "flex", top: "1011px" }}>
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
                            <div style={{ borderRadius: "4px", width: "40px", height: "40px", backgroundColor: "#E4EAF0", color: "#0000008A" }}><i className="large material-icons" style={{ position: "absolute", top: "9px", left: "7px" }} >close</i></div>
                            <div style={{ borderRadius: "4px", width: "40px", height: "40px", backgroundColor: "#133C93", color: "#FFFFFF", cursor: "pointer" }}><i className="large material-icons" style={{ position: "absolute", top: "9px", left: "68px" }}>check</i></div>
                        </div>*/}
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
    const { deviceFormData, getProblemsByPatientInputIdData, getAllStaffData,createPatientProblemsData,updatePatientProblemsData } = state;
    return {
        deviceFormData, getProblemsByPatientInputIdData, getAllStaffData,createPatientProblemsData,updatePatientProblemsData
    };
};

export default connect(mapStateToProps)(AddPatientProblem)




