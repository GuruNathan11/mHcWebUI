
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
import PatientLabOrderData from "./../../../assets/data/PatientLabOrderData.json";
import { getAllStaff } from "../../../store/actions/Staff";
import { createPatientLabOrder, getLabOrderByPatientInputId, updatePatientLabOrderById } from "../../../store/actions/PatientLabOrder";
import SecondaryButton from "../../../components/SecondaryButton";
import PrimaryButton from "../../../components/PrimaryButton";
import "../../../components/BottomFooter.css";
import { HttpLogin } from "../../../utils/Http";
import { MobileDateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import bloodBag from './../../../assets/images/mettler_images/blood_bag.svg';
import bloodDrop from './../../../assets/images/mettler_images/blood_drop.svg';
import bloodDropNew from './../../../assets/images/mettler_images/blood_dropNew.svg';
import bloodDropNewOne from './../../../assets/images/mettler_images/blood_dropNewOne.svg';
import AvatarDoctorImage from './../../../assets/images/mettler_images/AvatarDoctor.png';
import AvatarBigImage from './../../../assets/images/mettler_images/AvatarBigImage.png';
import moment from "moment";
import loaddingFile from '../../../../src/assets/images/tenor.gif';
interface IAddPatientLabTest { }
interface IAddPatientLabTest {
    StaticPage: any;
    dispatch: Dispatch<any>;
    match: any;
    getLabOrderByPatientInputIdData: any;
    createPatientLabOrderData: any;
    updatePatientLabOrderData: any;
    getAllStaffData: any;
    state: {
        nodes: [],
        checked: [],
        expanded: []
    }
}
const AddPatientLabTest: React.FC<IAddPatientLabTest> = ({
    dispatch, getLabOrderByPatientInputIdData, getAllStaffData, match, createPatientLabOrderData, updatePatientLabOrderData


}) => {


    let [inputFormData, setInputFormData] = useState(PatientLabOrderData);
    let [encryptPatientId, setEncryptPatientId] = useState(null);
    let [decryptPatientId, setDecryptPatientId] = useState(null);
    let [encryptVisitId, setEncryptVisitId] = useState(null);
    let [decryptVisitId, setDecryptVisitId] = useState(null);
    let [encryptId, setEncryptId] = useState(null);
    let [decryptId, setDecryptId] = useState(null);

    let [getStaffDataItems, setGetStaffDataItems] = useState(new Array<any>());
    let [inputOrgData, setInputOrgData] = useState("");
    let [inputLoginId, setInputLoginId] = useState("");
    let [patientSSN, setPatientSSN] = useState(null);
    let [patientImage, setPatientImage] = useState("");
    let [patientGender, setPatientGender] = useState(null);
    let [patientDateOfBirth, setPatientDateOfBirth] = useState(null);
    let [inputPatientInfo, setInputPatientInfo] = useState(null);
    let [patientAge, setPatientAge] = useState(null);
    let [LabTestDatas, setLabTestData] = useState(null);
    let [CollectionSampleDatas, setCollectionSampleData] = useState(null);
    let [Speicmens, setSpeicmen] = useState(null);
    let [Urgencydata, setUrgency] = useState(null);
    let [HowOftendatas, setHowOftendata] = useState(null);
    const [spinner, setSpinner] = useState(false);
    let [CollectionType, setCollectionType] = useState(null);
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
        inputFormData.enteredBy = orgData.items.data.userDetail.name[0].given + " " + orgData.items.data.userDetail.name[0].family;
        setInputFormData({ ...inputFormData });
        setInputLoginId(orgData.loginInput.username);
        orgData = orgData.loginInput.organization;

        HttpLogin.axios().get("api/dropdowns/get-all")
            .then((response) => {
                let LabTestdata = response.data.data.filter(k => k.dropdown === "LabTest").map((i) => { return i.list })
                setLabTestData(LabTestdata[0]);
                let CollectionSampledata = response.data.data.filter(k => k.dropdown === "CollectionSample").map((i) => { return i.list })
                setCollectionSampleData(CollectionSampledata[0]);
                let Speicmendata = response.data.data.filter(k => k.dropdown === "Speicmen").map((i) => { return i.list })
                setSpeicmen(Speicmendata[0]);
                let Urgencydata = response.data.data.filter(k => k.dropdown === "Urgency").map((i) => { return i.list })
                setUrgency(Urgencydata[0]);
                let HowOftendata = response.data.data.filter(k => k.dropdown === "HowOften").map((i) => { return i.list })
                setHowOftendata(HowOftendata[0]);
                let CollectioType = response.data.data.filter(k => k.dropdown === "collection type").map((i) => { return i.list })
                setCollectionType(CollectioType[0]);


            })
        //  console.log(JSON.stringify(decodeFinalId))     

        HttpLogin.axios().get("api/patient/getPatient/" + decodeFinalPatientid)
            .then((res) => {
                //  console.log(JSON.stringify(res.data.data))     
                setInputPatientInfo(res.data.data.basicDetails[0].name[0].given + " " + res.data.data.basicDetails[0].name[0].family);
                if (res.data.message.code === "MHC - 0200") {
                    setInputPatientInfo(res.data.data.basicDetails[0].name[0].given + " " + res.data.data.basicDetails[0].name[0].family);
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
            dispatch(getLabOrderByPatientInputId(decodeFinalId));
        }
        dispatch(getAllStaff());
    }, []);
    let newSpeicmensInputData = Speicmens != null && Speicmens.length > 0 && Speicmens.map((item, i) => {
        return (
            <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
        )
    })
    let newCollectionSampleDatasData = CollectionSampleDatas != null && CollectionSampleDatas.length > 0 && CollectionSampleDatas.map((item, i) => {
        return (
            <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
        )
    })
    let newLabTestDatasDatasData = LabTestDatas != null && LabTestDatas.length > 0 && LabTestDatas.map((item, i) => {
        return (
            <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
        )
    })
    let newLabUrgencydataDatasData = Urgencydata != null && Urgencydata.length > 0 && Urgencydata.map((item, i) => {
        return (
            <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
        )
    })
    let newHowOftendatasData = HowOftendatas != null && HowOftendatas.length > 0 && HowOftendatas.map((item, i) => {
        return (
            <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
        )
    })
    let newcollectiontupeData = CollectionType != null && CollectionType.length > 0 && CollectionType.map((item, i) => {
        return (
            <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
        )
    })
    const handleInputChange = (event: any) => {
        const {
            target: { value },
        } = event;
        if (event.target.name === "collectionSample") {
            inputFormData.collectionSample = event.target.value;
        } else if (event.target.name === "urgency") {
            inputFormData.urgency = event.target.value;
        } else if (event.target.name === "specimen") {
            inputFormData.specimen = event.target.value;
        } else if (event.target.id === "howlong") {
            inputFormData.howLong = event.target.value;
        } else if (event.target.name === "enteredBy") {
            inputFormData.enteredBy = event.target.value;
        } else if (event.target.name === "howoften") {
            inputFormData.howOften = event.target.value;
        } else if (event.target.name === "collectionType") {
            inputFormData.collectionType = event.target.value;
        } else if (event.target.name === "labTestName") {
            inputFormData.labTest = typeof value === 'string' ? value.split(',') : value;
        } else if (event.target.id === "comments") {
            inputFormData.comments = event.target.value;
        }

        setInputFormData({ ...inputFormData });
    }
    const [isPatientPageLoaded, setPatientPageLoaded] = useState(false);

    if (!isPatientPageLoaded && !getLabOrderByPatientInputIdData.isLoading) {
        console.log(JSON.stringify(getLabOrderByPatientInputIdData))
        if (getLabOrderByPatientInputIdData.items.message.code === "MHC - 0200") {
            getLabOrderByPatientInputIdData.items.data.collectionDateTime = new Date(moment(getLabOrderByPatientInputIdData.items.data.collectionDateTime, "YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z"));
            setInputFormData(getLabOrderByPatientInputIdData.items.data);
            setSpinner(false);
        } else {
            setInputFormData({ ...PatientLabOrderData });
            alert(getLabOrderByPatientInputIdData.items.message.description);
        }
        setPatientPageLoaded(true);
    }
    if (!getLabOrderByPatientInputIdData && getLabOrderByPatientInputIdData.isFormSubmit) {

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
    const [isAddPatientLabTestLoaded, setAddatientLabTestLoaded] = useState(false);

    if (!isAddPatientLabTestLoaded && !createPatientLabOrderData.isLoading) {
        createPatientLabOrderData.items.data.collectionDateTime = createPatientLabOrderData.items.data.collectionDateTime !== null && createPatientLabOrderData.items.data.collectionDateTime !== undefined ? new Date(moment(createPatientLabOrderData.items.data.collectionDateTime, "YYYYMMDDHHmm").format("YYYY-MM-DDTHH:mm:ss.000Z")) : null;
        setInputFormData(createPatientLabOrderData.items.data);
        if (createPatientLabOrderData.items.message.code === "MHC - 0200") {
            alert(createPatientLabOrderData.items.message.description);
            setTimeout(() => {
                window.location.href = "/MettlerVisitPatientdata/" + encryptPatientId + "/" + encryptVisitId;
                setSpinner(false);
            }, (1000));
            setAddatientLabTestLoaded(true);
        } else {
            alert(createPatientLabOrderData.items.message.description);
            setTimeout(() => {
                setAddatientLabTestLoaded(false);
                setSpinner(false);
            }, (1000));
        }

    }
    if (!createPatientLabOrderData && createPatientLabOrderData.isFormSubmit) {

        setTimeout(() => {
            setAddatientLabTestLoaded(false);
            setSpinner(false);
        }, (1000));
    }
    let [isAddlabtestupdateLoaded, setAddlabtestupdateLoaded] = useState(false);

    if (!isAddlabtestupdateLoaded && !updatePatientLabOrderData.isLoading) {
        updatePatientLabOrderData.items.data.collectionDateTime = updatePatientLabOrderData.items.data.collectionDateTime !== null && updatePatientLabOrderData.items.data.collectionDateTime !== undefined ? new Date(moment(updatePatientLabOrderData.items.data.collectionDateTime, "YYYYMMDDHHmm").format("YYYY-MM-DDTHH:mm:ss.000Z")) : null;
        setInputFormData(updatePatientLabOrderData.items.data);
        if (updatePatientLabOrderData.items.message.code === "MHC - 0200") {
            console.log(JSON.stringify(updatePatientLabOrderData.items));
            alert(updatePatientLabOrderData.items.message.description);
            setTimeout(() => {
                window.location.href = "/MettlerVisitPatientdata/" + encryptPatientId + "/" + encryptVisitId;
                setSpinner(false);
            }, (1000));
            setAddlabtestupdateLoaded(true);
        } else {

            alert(updatePatientLabOrderData.items.message.description);
            setTimeout(() => {
                setAddlabtestupdateLoaded(false);
                setSpinner(false);
            }, (1000));
        }

    }

    if (!updatePatientLabOrderData && updatePatientLabOrderData.isFormSubmit) {
        setTimeout(() => {
            setAddlabtestupdateLoaded(false);

        }, (1000));
    }

    const [isValid, setValid] = useState(true);
    const handleClickChange = () => {
        inputFormData.pid = decryptPatientId;
        inputFormData.lastVisit = decryptVisitId;
        inputFormData.orderedBy = inputLoginId;
        inputFormData.collectionDateTime = inputFormData.collectionDateTime !== null ? (moment(inputFormData.collectionDateTime, "YYYY-MM-DDTHH:mm:ss.000Z").format("YYYYMMDD")) : null;
        if (inputFormData.collectionDateTime === null || inputFormData.collectionSample.length === 0 ||
            inputFormData.collectionType.length === 0 || inputFormData.urgency.length === 0 || inputFormData.specimen.length === 0 || inputFormData.enteredBy === "") {
            inputFormData.collectionDateTime = null;
            alert("Please Enter required data");
        } else if (inputFormData.id === "") {
            setInputFormData({ ...inputFormData });
            setSpinner(true);
            dispatch(createPatientLabOrder(inputFormData));
        } else {
            setInputFormData({ ...inputFormData });
            dispatch(updatePatientLabOrderById(inputFormData));
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
            <div className="bed-details" style={{ height: "1035px" }}>
                <div className="bed-details-child" />
                <div className="bed-details-child1" style={{ height: "1106px" }} />
                <div className="bedline-div" style={{ top: "161.5px" }} />
                <div className="bedexpand-more-24px-parent" style={{ top: "113px" }}>
                    <img
                        className="bedexpand-more-24px-icon"
                        alt=""
                        src="/expand-more-24px.svg"
                    />
                    <div className="beddetails"> <i style={{ position: "relative", top: "6px", left: "-7px", cursor: "pointer" }} onClick={handleBackclick} className="large material-icons">arrow_back</i>Add Lab Test</div>
                </div>
                <div style={{ top: "6px", background: '#2D56AD', height: '98px', display: 'flex', width: 'calc(100% - 0px)', position: 'absolute', left: "0wpx" }} >

                    <div id="mettlerEmptyPadding" className="p-col-12 p-md-1">
                        <img style={{ width: '60px', height: '60px', position: 'relative', left: '21px', top: '23px', borderRadius: patientImage !== "" ? "30px" : "" }} src={patientImage !== "" ? patientImage : AvatarBigImage}></img>
                    </div>
                    <div id="mettlerEmptyPadding" style={{ display: 'flex', flexDirection: 'column' }} className="p-col-12 p-md-6">
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                            label="Collection Date/Time"
                            slotProps={{
                                textField: {
                                    variant: "outlined",
                                    size: "medium",
                                    color: "primary",
                                },
                            }}
                            value={inputFormData.collectionDateTime}
                            onChange={(newValue: any) => {
                                inputFormData.collectionDateTime = newValue;
                                setInputFormData({ ...inputFormData });
                            }}
                        />


                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span>Collection Sample
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Collection Sample" name="collectionSample" value={inputFormData.collectionSample} onChange={handleInputChange}>
                                {newCollectionSampleDatasData}
                            </Select>
                            <FormHelperText />
                        </FormControl>

                    </div>

                    <div className="bedorgForm-fields2" style={{ top: "380px", position: "absolute", flexDirection: "row-reverse" }}>
                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span>Urgency
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Urgency" name="urgency" value={inputFormData.urgency} onChange={handleInputChange}>
                                {newLabUrgencydataDatasData}
                            </Select>
                            <FormHelperText />
                        </FormControl>

                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span>Specimen
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Specimen" name="specimen" value={inputFormData.specimen} onChange={handleInputChange}>
                                {newSpeicmensInputData}
                            </Select>
                            <FormHelperText />
                        </FormControl>

                    </div>
                    <div className="bedorgForm-fields3" style={{ position: "absolute", display: "flex", top: "472px" }}>
                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span>How Often
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="How Often" name="howoften" value={inputFormData.howOften} onChange={handleInputChange}>
                                {newHowOftendatasData}
                            </Select>
                            <FormHelperText />
                        </FormControl>
                        <TextField
                            id="howlong" value={inputFormData.howLong} onChange={handleInputChange}
                            className="name-input13"
                            label="How Long"
                            color="primary"
                            variant="outlined"
                            type="text"
                            placeholder="Placeholder"
                            size="medium"
                            margin="none"
                        />
                    </div>



                    <div className="bedorgForm-fields8" style={{ flexDirection: "row-reverse" }}>
                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span>Collection Type
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Collection Type" name="collectionType" value={inputFormData.collectionType} onChange={handleInputChange}>
                                {newcollectiontupeData}
                            </Select>
                            <FormHelperText />
                        </FormControl>
                        <FormControl className="name-input13" variant="outlined">
                            <InputLabel color="primary" ><span >Lab Test
                            </span></InputLabel>
                            <Select color="primary" size="medium" label="Lab Test" name="labTestName" multiple={true} value={inputFormData.labTest} onChange={handleInputChange}>
                                {newLabTestDatasDatasData}
                            </Select>
                            <FormHelperText />
                        </FormControl>
                    </div>
                    <div className="bedorgForm-fields3" style={{ position: "absolute", display: "flex", top: "563px" }}>
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




                    <div className="bedorgForm-fields3" style={{ position: "absolute", display: "flex", flexDirection: "column", top: "652px" }}>
                        <div style={{ fontWeight: "bold", fontSize: "16px", lineHeight: "24px", letterSpacing: "0.15px", color: "#000000" }}>Comments</div>
                        <div style={{ font: "poppins", fontWeight: "bold", fontSize: "15px", lineHeight: "22.5px", color: "#3F3F46" }}>Robert<span style={{ left: "12px", position: "relative", font: "poppins", fontWeight: "lighter", fontSize: "15px", lineHeight: "22.5px", color: "#9DA1C3" }}>Jun-25, 2021 at 17:13</span></div>
                        <div style={{ position: "relative", font: "poppins", fontWeight: "lighter", fontSize: "14px", lineHeight: "21px", color: "#172B4D" }}>The objective of genuine health care reform must be premium</div>
                        <div style={{ top: "52px", position: "relative", font: "poppins", fontWeight: "lighter", fontSize: "15px", lineHeight: "22.5px", color: "#3F3F46" }}>Add Comment</div>

                    </div>
                    <div className="bedorgForm-fields3" style={{ display: "flex", top: "835px" }}>
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
                        </div>
            */}
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

                            label="Save"
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
    const { deviceFormData, getLabOrderByPatientInputIdData, getAllStaffData, createPatientLabOrderData, updatePatientLabOrderData } = state;
    return {
        deviceFormData, getLabOrderByPatientInputIdData, getAllStaffData, createPatientLabOrderData, updatePatientLabOrderData
    };
};

export default connect(mapStateToProps)(AddPatientLabTest)




