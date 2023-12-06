import React, { useEffect, useState, Dispatch } from "react";
import { connect } from "react-redux";
import "../Patient/AdmitPatient.css";
import { getAllPatient } from "../../../store/actions/Patient";
import AvatarBigImage from './../../../assets/images/mettler_images/AvatarBigImage.png';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getallPatientVisit } from './../../../store/actions/PatientVisitAdminController'
import moment from "moment";
import CheckBoxgary from "../../../components/CheckBoxgary";
import "././../Staff_Patient/PatientStaffAssignment";
import switchVertical from './../../../assets/images/mettler_images/switch-vertical.svg';
import filterList from './../../../assets/images/mettler_images/filter_list.svg';
import addSymbol from './../../../assets/images/mettler_images/addSymbol.svg';
import searchImage from './../../../assets/images/mettler_images/Search.svg';
import NewVisitData from './../../../assets/data/NewVisitData.json'
import { HttpLogin } from "../../../utils/Http";
import cardioGramImage from './../../../assets/images/mettler_images/cardiogram.svg';
import arrowUpRight from './../../../assets/images/mettler_images/arrowUpRight.svg';
import beatShadowImage from './../../../assets/images/mettler_images/beatShadowImage.svg';
import TemperaturImage from './../../../assets/images/mettler_images/TemperatureImage.svg';
import GrLikeImage from './../../../assets/images/mettler_images/GrLike.svg';
import BpImage from './../../../assets/images/mettler_images/BpImage.svg';
import downStrokeImage from './../../../assets/images/mettler_images/downStrokeImage.svg';
import GlucoseImage from './../../../assets/images/mettler_images/GlucoseImage.svg';
import TimerImage from './../../../assets/images/mettler_images/TimerImage.svg';
import yogaImage from './../../../assets/images/mettler_images/yogaImage.svg';
import doctorImage from './../../../assets/images/mettler_images/doctor.svg';
import breakFastImage from './../../../assets/images/mettler_images/BreakfastImage.svg';
import WineImage from './../../../assets/images/mettler_images/IoMdWine.svg';
import skinBondImage from './../../../assets/images/mettler_images/skinBondImage.svg';
import BoxOpenImage from './../../../assets/images/mettler_images/BoxOpen.svg';
import dailyProgressImage from './../../../assets/images/mettler_images/dailyProgress.svg';
import dailyProgressAdjustImage from './../../../assets/images/mettler_images/dailyProgressAdjust.svg';
import bloodBag from './../../../assets/images/mettler_images/blood_bag.svg';
import bloodDrop from './../../../assets/images/mettler_images/blood_drop.svg';
import bloodDropNew from './../../../assets/images/mettler_images/blood_dropNew.svg';
import bloodDropNewOne from './../../../assets/images/mettler_images/blood_dropNewOne.svg';
import dotImage from './../../../assets/images/mettler_images/dots-vertical.svg';
import AvatarDoctorImage from './../../../assets/images/mettler_images/AvatarDoctor.png';
import dotsvertical from './../../../assets/images/mettler_images/dots-vertical.svg';
import admitpatientGroup from "./../../../assets/images/mettler_images/admitpatientGroup.svg";
import OverviewGroup from "./../../../assets/images/mettler_images/OverviewGroup.svg";
import q15Group from "./../../../assets/images/mettler_images/q15Group.svg";
import Groupss from "../../../assets/images/mettler_images/Groupss.png";
import {
    Dialog, DialogContentText,
    FormControlLabel,
    Checkbox
} from "@mui/material";

interface IVpatientVisit { }
interface IVpatientVisit {
    StaticPage: any;
    getAllPatientData: any;
    dispatch: Dispatch<any>;
    getallPatientVisitData: any;
    match: any;
    state: {
        nodes: [],
        checked: [],
        expanded: []
    }
}

const VpatientVisit: React.FC<IVpatientVisit> = ({
    dispatch, getAllPatientData, getallPatientVisitData, match
}) => {
    let [getPatientDataItems, setGetPatientDataItems] = useState(new Array<any>());
    let [allergyTableData, setAllergyTableData] = useState(new Array<any>());
    let [problemTableData, setProblemTableData] = useState(new Array<any>());
    let [vitalsTableData, setVitalsTableData] = useState(null);
    let [immunizationTableData, setImmunizationTableData] = useState(new Array<any>());
    let [labOrderTableData, setLabOrderTableData] = useState(new Array<any>());
    const [selectedValues, setSelectedValues] = useState([]);
    const [selectedRow, setSelectedRow] = useState(0);
    
    let [encryptPatientid, setEncryptPatientid] = useState(null);
    let [decryptPatientid, setDecryptPatientid] = useState(null);
    let [encryptVisitid, setEncryptVisitid] = useState(null);
    let [decryptVisitid, setDecryptVisitid] = useState(null);
    let [inputOrgData, setInputOrgData] = useState("");
    let [inputVisitId, setInputVisitId] = useState("");
    let [patientAge, setPatientAge] = useState(null);
     let [patientSSN, setPatientSSN] = useState(null);
  let [patientImage, setPatientImage] = useState("");
    let [patientGender, setPatientGender] = useState(null);
    let [patientDateOfBirth, setPatientDateOfBirth] = useState(null);
    let [inputPatientInfo, setInputPatientInfo] = useState(null);
    let [vitalsEnteredDate, setVitalsEnteredDate] = useState("");

    useEffect(() => {
        dispatch(getallPatientVisit());
        dispatch(getAllPatient());
        var encryptInitial = match.params.patientid;
        setEncryptPatientid(encryptInitial);
        var CryptoJS = require("crypto-js");
        let decodePatientid = decodeURIComponent(encryptInitial);
        let decodeFinalPatientid = CryptoJS.AES.decrypt(decodePatientid.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
        setDecryptPatientid(decodeFinalPatientid);
        //  console.log(JSON.stringify(decodeFinalPatientid))

        var encryptInitial = match.params.visitId;
        setEncryptVisitid(encryptInitial);
        var CryptoJS = require("crypto-js");
        let decodeVisitid = decodeURIComponent(encryptInitial);
        let decodeFinalVisitid = CryptoJS.AES.decrypt(decodeVisitid.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
        setDecryptVisitid(decodeFinalVisitid);
        //  console.log(JSON.stringify(decodeFinalVisitid))

        var orgData = JSON.parse(window.localStorage.getItem("LOGINDATA"));
        orgData = orgData.loginInput.organization;
        HttpLogin.axios().get("api/org/getById/" + orgData)
            .then((res) => {
                if (res.data.message.code === "MHC - 0200") {
                    setInputOrgData(res.data.data.organizationdetails[0].name);
                } else {
                    alert(res.data.message.description);
                    setInputOrgData("");
                }
            })
        HttpLogin.axios().get("/api/Allergy/getAll")
            .then((resp) => {
                let newDataAccess = resp.data.data.filter(i => i.patientId === decodeFinalPatientid);
                if (newDataAccess.length > 0 && newDataAccess !== undefined) {
                    setAllergyTableData(newDataAccess);
                }
            })
        HttpLogin.axios().get("/api/Problem/getAll")
            .then((resp) => {
                let newDataAccess = resp.data.data.filter(i => i.patientId === decodeFinalPatientid);

                setProblemTableData(newDataAccess);
            })
        if (decodeFinalPatientid !== "") {
            HttpLogin.axios().get("/api/vital/getLatestVital/" + decodeFinalPatientid)
                .then((resp) => {
                    if (resp.data.message.code === "MHC - 0200") {
                        setVitalsEnteredDate(resp.data.data.enteredDate !== null && resp.data.data.enteredDate !== undefined && resp.data.data.enteredDate !== "" ? moment(resp.data.data.enteredDate, "YYYYMMDDHHmm").format("MMM DD, hh:mm A") : "");
                        //  console.log(JSON.stringify(resp.data.data))
                        setVitalsTableData(resp.data.data);
                    } else {
                        //    alert(resp.data.message.description);                            
                    }

                })
        }
        HttpLogin.axios().get("/api/Immunization/getAll")
            .then((resp) => {
                let newDataAccess = resp.data.data.filter(i => i.patientId === decodeFinalPatientid);

                setImmunizationTableData(newDataAccess);
            })

        HttpLogin.axios().get("/api/lab/get_all")
            .then((resp) => {
                let newDataAccess = resp.data.data.filter(i => i.patientId === decodeFinalPatientid);

                setLabOrderTableData(newDataAccess);
            })
        HttpLogin.axios().get("api/patient/getPatient/" + decodeFinalPatientid)
            .then((res) => {
                
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
                } else {
                    alert(res.data.message.description);
                }
            })

    }, []);

    let [vitalEvent, setVitalEVent] = useState(null);

    const [isPatientPageLoaded, setPatientPageLoaded] = useState(false);

    if (!isPatientPageLoaded && !getAllPatientData.isLoading) {
        if (getAllPatientData.items.message.code === "MHC - 0200") {
            setGetPatientDataItems(getAllPatientData.items.data.filter(t => t.organization === inputOrgData));

        } else {
            setGetPatientDataItems([]);
            alert(getAllPatientData.items.message.description);
        }
        setPatientPageLoaded(true);
    }
    if (!getAllPatientData && getAllPatientData.isFormSubmit) {

        setTimeout(() => {
            setPatientPageLoaded(false);

        }, (1000));
    }

    const onSelectionChangedData = (rowData) => {
        const value = rowData.value;
        setSelectedValues(value);
        setSelectedRow(rowData.value.length);
    }
    const onRowSelectAllergyData = (event) => {
        var CryptoJS = require("crypto-js");
        var encryptId = CryptoJS.AES.encrypt(event.data.id, 'secret key 123');
        var setEncryptId = encodeURIComponent(encryptId.toString());
        var encryptVisitId = CryptoJS.AES.encrypt(decryptVisitid, 'secret key 123');
        var setEncryptVisitId = encodeURIComponent(encryptVisitId.toString());
        var encryptPatientId = CryptoJS.AES.encrypt(event.data.patientId, 'secret key 123');
        var setEncryptPatientId = encodeURIComponent(encryptPatientId.toString());
        window.location.href = "/MettlerAddAllergy/" + setEncryptPatientId + "/" + setEncryptVisitId + "/" + setEncryptId;
    }
    let [calendarDate, setCalendarDate] = useState(new Date());
    const firstDay = moment((new Date(calendarDate.getFullYear(), calendarDate.getMonth(), calendarDate.getDate() - 3)), "DDD MMM DD YYYY HH:mm:ss").format("ddd");
    const secondDay = moment((new Date(calendarDate.getFullYear(), calendarDate.getMonth(), calendarDate.getDate() - 2)), "DDD MMM DD YYYY HH:mm:ss").format("ddd");
    const thirdDay = moment((new Date(calendarDate.getFullYear(), calendarDate.getMonth(), calendarDate.getDate() - 1)), "DDD MMM DD YYYY HH:mm:ss").format("ddd");
    const forthDay = moment((new Date(calendarDate.getFullYear(), calendarDate.getMonth(), calendarDate.getDate())), "DDD MMM DD YYYY HH:mm:ss").format("ddd");
    const firstDate = moment((new Date(calendarDate.getFullYear(), calendarDate.getMonth(), calendarDate.getDate() - 3)), "DDD MMM DD YYYY HH:mm:ss").format("DD");
    const secondDate = moment((new Date(calendarDate.getFullYear(), calendarDate.getMonth(), calendarDate.getDate() - 2)), "DDD MMM DD YYYY HH:mm:ss").format("DD");
    const thirdDate = moment((new Date(calendarDate.getFullYear(), calendarDate.getMonth(), calendarDate.getDate() - 1)), "DDD MMM DD YYYY HH:mm:ss").format("DD");
    const forthDate = moment((new Date(calendarDate.getFullYear(), calendarDate.getMonth(), calendarDate.getDate())), "DDD MMM DD YYYY HH:mm:ss").format("DD");
    const fifthDay = moment((new Date(calendarDate.getFullYear(), calendarDate.getMonth(), calendarDate.getDate() + 4)), "DDD MMM DD YYYY HH:mm:ss").format("ddd");
    const sixthDay = moment((new Date(calendarDate.getFullYear(), calendarDate.getMonth(), calendarDate.getDate() + 5)), "DDD MMM DD YYYY HH:mm:ss").format("ddd");
    const seventhDay = moment((new Date(calendarDate.getFullYear(), calendarDate.getMonth(), calendarDate.getDate() + 6)), "DDD MMM DD YYYY HH:mm:ss").format("ddd");


    const onRowSelectProblemData = (event) => {
        var CryptoJS = require("crypto-js");
        var encryptId = CryptoJS.AES.encrypt(event.data.id, 'secret key 123');
        var setEncryptId = encodeURIComponent(encryptId.toString());
        var encryptVisitId = CryptoJS.AES.encrypt(decryptVisitid, 'secret key 123');
        var setEncryptVisitId = encodeURIComponent(encryptVisitId.toString());
        var encryptPatientId = CryptoJS.AES.encrypt(event.data.patientId, 'secret key 123');
        var setEncryptPatientId = encodeURIComponent(encryptPatientId.toString());
        window.location.href = "/MettlerAddPatientProblem/" + setEncryptPatientId + "/" + setEncryptVisitId + "/" + setEncryptId;
    }

    const onRowSelectVitalData = (event) => {
        setIsVisibles(true);
        setVitalEVent(event);

    }

    const handleVitalEventChange = (event) => {
        var CryptoJS = require("crypto-js");
        var encryptId = CryptoJS.AES.encrypt(event, 'secret key 123');
        var setEncryptId = encodeURIComponent(encryptId.toString());
        window.location.href = "/MettlerAddPatientVitals/" + encryptPatientid + "/" + encryptVisitid + "/" + setEncryptId;
    }

    const onRowSelectLabOrderData = (event) => {
        var CryptoJS = require("crypto-js");
        var encryptId = CryptoJS.AES.encrypt(event.data.id, 'secret key 123');
        var setEncryptId = encodeURIComponent(encryptId.toString());
        var encryptVisitId = CryptoJS.AES.encrypt(decryptVisitid, 'secret key 123');
        var setEncryptVisitId = encodeURIComponent(encryptVisitId.toString());
        var encryptPatientId = CryptoJS.AES.encrypt(event.data.patientId, 'secret key 123');
        var setEncryptPatientId = encodeURIComponent(encryptPatientId.toString());
        window.location.href = "/MettlerAddPatientVitals/" + setEncryptPatientId + "/" + setEncryptVisitId + "/" + setEncryptId;
    }
    const onRowSelectData = (rowData) => {
        var CryptoJS = require("crypto-js");
        var encryptId = CryptoJS.AES.encrypt(rowData.id, 'secret key 123');
        var setEncryptId = encodeURIComponent(encryptId.toString());
        var encryptVisitId = CryptoJS.AES.encrypt(decryptVisitid, 'secret key 123');
        var setEncryptVisitId = encodeURIComponent(encryptVisitId.toString());
        var encryptPatientId = CryptoJS.AES.encrypt(rowData.patientId, 'secret key 123');
        var setEncryptPatientId = encodeURIComponent(encryptPatientId.toString());
        window.location.href = "/MettlerSkinAllergy/" + setEncryptPatientId + "/" + setEncryptVisitId + "/" + setEncryptId;
    }
    const onRowSelectDatas = (rowData) => {
        var CryptoJS = require("crypto-js");
        var encryptId = CryptoJS.AES.encrypt(rowData.id, 'secret key 123');
        var setEncryptId = encodeURIComponent(encryptId.toString());
        var encryptVisitId = CryptoJS.AES.encrypt(decryptVisitid, 'secret key 123');
        var setEncryptVisitId = encodeURIComponent(encryptVisitId.toString());
        var encryptPatientId = CryptoJS.AES.encrypt(rowData.patientId, 'secret key 123');
        var setEncryptPatientId = encodeURIComponent(encryptPatientId.toString());
        window.location.href = "/MettlerPatientProblem/" + setEncryptPatientId + "/" + setEncryptVisitId + "/" + setEncryptId;
    }

    const onRowSelectDatasimmu = (rowData) => {
        var CryptoJS = require("crypto-js");
        var encryptId = CryptoJS.AES.encrypt(rowData.id, 'secret key 123');
        var setEncryptId = encodeURIComponent(encryptId.toString());
        var encryptVisitId = CryptoJS.AES.encrypt(decryptVisitid, 'secret key 123');
        var setEncryptVisitId = encodeURIComponent(encryptVisitId.toString());
        var encryptPatientId = CryptoJS.AES.encrypt(rowData.patientId, 'secret key 123');
        var setEncryptPatientId = encodeURIComponent(encryptPatientId.toString());
        window.location.href = "/MettlerAddImmunizationView/" + setEncryptPatientId + "/" + setEncryptVisitId + "/" + setEncryptId;
    }
    
    const onRowSelectDataslab = (rowData) => {
        var CryptoJS = require("crypto-js");
        var encryptId = CryptoJS.AES.encrypt(rowData.id, 'secret key 123');
        var setEncryptId = encodeURIComponent(encryptId.toString());
        var encryptVisitId = CryptoJS.AES.encrypt(decryptVisitid, 'secret key 123');
        var setEncryptVisitId = encodeURIComponent(encryptVisitId.toString());
        var encryptPatientId = CryptoJS.AES.encrypt(rowData.patientId, 'secret key 123');
        var setEncryptPatientId = encodeURIComponent(encryptPatientId.toString());
        window.location.href = "/MettlerAddPatientLabTestview/"+ setEncryptPatientId + "/" + setEncryptVisitId + "/" + setEncryptId;
    }
    const onLabData = (rowData) => {
        var CryptoJS = require("crypto-js");
        var encryptId = CryptoJS.AES.encrypt(rowData.id, 'secret key 123');
        var setEncryptId = encodeURIComponent(encryptId.toString());
        var encryptVisitId = CryptoJS.AES.encrypt(decryptVisitid, 'secret key 123');
        var setEncryptVisitId = encodeURIComponent(encryptVisitId.toString());
        var encryptPatientId = CryptoJS.AES.encrypt(rowData.patientId, 'secret key 123');
        var setEncryptPatientId = encodeURIComponent(encryptPatientId.toString());
        window.location.href = "/MettlerAddPatientLabTest/"+ setEncryptPatientId + "/" + setEncryptVisitId + "/" + setEncryptId;
    }


    const onRowSelectImmunizationData = (event) => {
        var CryptoJS = require("crypto-js");
        var encryptId = CryptoJS.AES.encrypt(event.data.id, 'secret key 123');
        var setEncryptId = encodeURIComponent(encryptId.toString());
        var encryptVisitId = CryptoJS.AES.encrypt(decryptVisitid, 'secret key 123');
        var setEncryptVisitId = encodeURIComponent(encryptVisitId.toString());
        var encryptPatientId = CryptoJS.AES.encrypt(event.data.patientId, 'secret key 123');
        var setEncryptPatientId = encodeURIComponent(encryptPatientId.toString());
        window.location.href = "/MettlerAddPatientImmunization/" + setEncryptPatientId + "/" + setEncryptVisitId + "/" + setEncryptId;
    }

    const handleFixedChange = () => {

    }

    const enterDateAndTime = (rowData: any) => {
        return rowData.enteredDate !== "string" && rowData.enteredDate !== "" && rowData.enteredDate !== null ? <span style={{ whiteSpace: "nowrap", font: "popins", fontSize: "14px", position: "relative", left: "18px" }}> {moment(rowData.enteredDate, "YYYYMMDDHHmm").format('MMM DD, hh:mm A')}</span> : <span>{rowData.enteredDate}</span>
    }

    const dataSelectedPatientName = (rowData: any) => {
        return rowData.id != "" ? <span style={{ font: "popins", fontSize: "14px", position: "relative", left: "36px" }}>{inputPatientInfo}</span> : <span></span>
    }

    const dataOnsetDate = (rowData: any) => {
        return rowData.dateOfOnset !== "string" && rowData.dateOfOnset !== "" && rowData.dateOfOnset !== null ? <span style={{ whiteSpace: "nowrap", font: "popins", fontSize: "14px", position: "relative", left: "18px" }}> {moment(rowData.dateOfOnset, "YYYYMMDDHHmm").format("MMM DD, hh:mm A")}</span> : <span>{rowData.dateOfOnset}</span>
    }

    const dataDueDate = (rowData: any) => {
        return rowData.dueDate !== "string" && rowData.dueDate !== "" && rowData.dueDate !== null ? <span style={{ whiteSpace: "nowrap", font: "popins", fontSize: "14px", position: "relative", left: "18px" }}> {moment(rowData.dueDate, "YYYYMMDDHHmm").format("MMM DD, hh:mm A")}</span> : <span>{rowData.dueDate}</span>
    }

    const dataAdminDate = (rowData: any) => {
        return rowData.administrationDate !== "string" && rowData.administrationDate !== "" && rowData.administrationDate !== null ? <span style={{ whiteSpace: "nowrap", font: "popins", fontSize: "14px", position: "relative", left: "18px" }}> {moment(rowData.administrationDate, "YYYYMMDDHHmm").format("MMM DD, hh:mm A")}</span> : <span>{rowData.administrationDate}</span>
    }

    const dataCollectionDate = (rowData: any) => {
        return rowData.collectionDateTime !== "string" && rowData.collectionDateTime !== "" && rowData.collectionDateTime !== null ? <span style={{ whiteSpace: "nowrap", font: "popins", fontSize: "14px", position: "relative", left: "18px" }}> {moment(rowData.collectionDateTime, "YYYYMMDDHHmm").format("MMM DD, hh:mm A")}</span> : <span>{rowData.collectionDateTime}</span>
    }

    const allergyType = (rowData: any) => {
        return rowData.allergyType != "" ? <span>{rowData.allergyType}</span> : <span></span>
    }

    const Reaction = (rowData: any) => {
        return <span>{rowData.natureOfReaction !== undefined && rowData.natureOfReaction !== null ? <span>{rowData.natureOfReaction}</span> : <span>{rowData.natureOfReaction}</span>}</span>
    }

    const Status = (rowData: any) => {
        return rowData.status != "" ? <span style={{ borderRadius: "5px", marginLeft: "55px", marginTop: "-15px", textAlign: "center", position: "absolute", width: "71px", height: "29px", backgroundColor: "white", border: rowData.status === "Active" ? "1px solid #65A455" : "1px solid #9CA1BA", color: rowData.status === "Active" ? "#65A455" : "#9CA1BA" }}>{rowData.status}</span> : <span>
        </span>

    }

    const dataMeasurement = (rowData: any) => {


    }
    const dataTempValue = (rowData: any) => {


    }
    const dataUnit = (rowData: any) => {

    }


    const ReactionDateAndTime = (rowData: any) => {
        return rowData.observedDetails !== null ? (rowData.observedDetails.reactionDateTime !== "Invalid date" ? moment(rowData.observedDetails.reactionDateTime, "YYYYMMDDHHmm").format("MMM DD, hh:mm A") : "") : "";
    }



    const status = NewVisitData[0]?.status || "";


    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active":
                return "#65A455";
            case "Inactive":
                return "#9CA1BA";
            case "Due Now":
                return "#EA7362";
            default:
                return "#65A455";
        }
    };
    const statusColor = getStatusColor(status);

    let [calendarScheduleChange, setCalendarScheduleChange] = useState(4);
    const handleCalendarScheduleChange = (event) => {
        calendarScheduleChange = event;
        setCalendarScheduleChange(event);
    }

    let [patientVisitTab, setPatientVisitTab] = useState(1);
    const handleChangeEvent = (event) => {
        if (patientVisitTab === 3 && !isVisibles) {
            setIsVisibles(true);
        } else {
            setIsVisibles(false);
        }
        patientVisitTab = event;
        setPatientVisitTab(event);
    };
    let [patientMainChangeTab, setPatientMainChangeTab] = useState(1);
    const handleMainChangeEvent = (event) => {
        if (event === 3) {
            patientVisitTab = 5;
            setPatientVisitTab(5);
        } else {
            patientVisitTab = 1;
            setPatientVisitTab(1);
        }
        patientMainChangeTab = event;
        setPatientMainChangeTab(event);
    };
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(true);
        if (isVisible) {
            setIsVisible(false);
        }
    }
    const [isVisibles, setIsVisibles] = useState(false);
    const Visibility = () => {
        setIsVisibles(false);
        if (patientVisitTab === 3) {
            setIsVisibles(true);
        } else {
            setIsVisibles(false);
        }
        // if (isVisibles) {
        //     setIsVisibles(false);
        // } else if (patientVisitTab === 1) {
        //     setIsVisibles(false)
        // } else if (patientVisitTab === 2) {
        //     setIsVisibles(false)
        // } else if (patientVisitTab === 3) {
        //     setIsVisibles(true)
        // } else if (patientVisitTab === 4) {
        //     setIsVisibles(false)
        // }
    }
    const handleClickChange = () => {
        if (patientVisitTab === 1) {
            window.location.href = "/MettlerAddAllergy/" + encryptPatientid + "/" + encryptVisitid;
        } else if (patientVisitTab === 2) {
            window.location.href = "/MettlerAddPatientProblem/" + encryptPatientid + "/" + encryptVisitid;
        } else if (patientVisitTab === 4) {
            window.location.href = "/MettlerAddPatientImmunization/" + encryptPatientid + "/" + encryptVisitid;
        } else if (patientVisitTab === 7) {
            window.location.href = "/MettlerAddPatientLabTest/" + encryptPatientid + "/" + encryptVisitid;
        }
    }
    

 

  
   
    const [newDialogslab, setNewDialogslab] = useState(false);
    const [rowDataValueslab, setRowDataValueslab] = useState(null);
    const LabEditChange = (rowData) => {
        setNewDialogslab(true);
        setRowDataValueslab(rowData);
    }
    const datalabEdit = (rowData) => {
        return <a style={{ cursor: 'pointer' }} onClick={() => LabEditChange(rowData)}>{rowData.id != "" ? <><img style={{ width: '20px', height: '20px', opacity: 0.8, position: "relative", left: "26px" }} src={dotImage}></img>
        </> : <span><img style={{ width: '20px', height: '20px', opacity: 0.8, position: "relative", left: "40px" }} src={dotImage}></img></span>}</a>;
    }

    const dataLabTest = (rowData) => {
        return rowData.labTestName !== null && rowData.labTestName !== undefined && rowData.labTestName.length > 0 ? rowData.labTestName.map(function (item, index) { return <span key={`demo_snap_${index}`}>{(index ? ', ' : '') + item}</span>; }) : "--";
    }

    const dataSpecimen = (rowData) => {
        return rowData.specimen !== null && rowData.specimen !== undefined && rowData.specimen.length > 0 ? rowData.specimen.map(function (item, index) { return <span key={`demo_snap_${index}`}>{(index ? ', ' : '') + item}</span>; }) : "--";
    }

    const dataCollectionType = (rowData) => {
        return rowData.collectionType !== null && rowData.collectionType !== undefined && rowData.collectionType.length > 0 ? rowData.collectionType.map(function (item, index) { return <span key={`demo_snap_${index}`}>{(index ? ', ' : '') + item}</span>; }) : "--";
    }

    const dataCollectionSample = (rowData) => {
        return rowData.collectionSample !== null && rowData.collectionSample !== undefined && rowData.collectionSample.length > 0 ? rowData.collectionSample.map(function (item, index) { return <span key={`demo_snap_${index}`}>{(index ? ', ' : '') + item}</span>; }) : "--";
    }

    const dataUrgency = (rowData) => {
        return rowData.urgency !== null && rowData.urgency !== undefined && rowData.urgency.length > 0 ? rowData.urgency.map(function (item, index) { return <span key={`demo_snap_${index}`}>{(index ? ', ' : '') + item}</span>; }) : "--";
    }

    
   
    
    return (


        <div style={{ position: "relative", left: "-69px", width: "calc(100% - 8`px)" }}>

              
                <div className="spAssignment-details-child" style={{ top: "106px", position: 'absolute', left: '275px', height: patientVisitTab === 1 || patientVisitTab === 0 ? '1561px' : '-webkit-fill-available' }} />
                <div style={{ position: "absolute", top: "121.5px", left: "83px", fontWeight: "bold", fontSize: "18px" }}>#V-1801</div>

                <div className="psaAssignment-details-child2" style={{ position: "absolute", width: "calc(100% - 16px)", top: "155.5px", right: "210.5px", left: "83px", borderTop: "1px solid var(--color-gainsboro-100)", height: "1px" }} />
                <div className="psaAssignment-details-child2" style={{ position: "absolute", width: "calc(100% - 16px)", top: "194.5px", right: "210.5px", left: "83px", borderTop: "1px solid var(--color-gainsboro-100)", height: "1px" }} />
                <div style={{ position: "absolute", width: "calc(100% - 339px)", top: "171px", right: "925px", left: "83px", height: "24px" }}>
                    <a style={{ cursor: 'pointer', color: patientVisitTab === 5 ? 'darkslateblue' : 'rgba(0, 0, 0, 0.87)' }} onClick={() => handleChangeEvent(5)}><div style={{ position: "absolute", fontWeight: "bold" }}>Pre Admit Patient</div></a>
                    <a style={{ cursor: 'pointer', color: patientVisitTab === 6 ? 'darkslateblue' : 'rgba(0, 0, 0, 0.87)' }} onClick={() => handleChangeEvent(6)}><div style={{ position: "absolute", left: "151px", fontWeight: "bold" }}>Admit Patient</div></a>
                    <a style={{ cursor: 'pointer', color: patientVisitTab === 7 ? 'darkslateblue' : 'rgba(0, 0, 0, 0.87)' }} onClick={() => handleChangeEvent(7)}><div style={{ position: "absolute", left: "282px", fontWeight: "bold" }}>Transfer a Patient</div></a>
                    <a style={{ cursor: 'pointer', color: patientVisitTab === 8 ? 'darkslateblue' : 'rgba(0, 0, 0, 0.87)' }} onClick={() => handleChangeEvent(8)}><div style={{ position: "absolute", left: "444px", fontWeight: "bold" }}>Discharge a Patient</div></a>
                    <span style={{ width: '1px', height: '20px', color: '#BBC5CE', position: 'relative', left: '418px', top: '-24px', borderLeftStyle: 'groove' }}></span>
                    <a style={{ cursor: 'pointer' }}><img src={switchVertical} style={{ width: '24px', height: '24px', position: 'relative', left: '858px', top: '-49px' }}></img></a>
                    <img src={filterList} style={{ width: '24px', height: '24px', position: 'relative', left: '876px', top: '-49px' }}></img>
                    <a style={{ cursor: 'pointer' }} onClick={handleClickChange}><img src={addSymbol} style={{ width: '24px', height: '24px', position: 'relative', left: '891px', top: '-49px' }}></img></a>
                    <input type="text" className="dashboard-search-text" id="new" name="new" value={null} onChange={null} placeholder="Search" style={{ paddingLeft: '36px', top: "-49px", fontFamily: 'system-ui', position: 'relative', width: '165px', left: '903px' }} />
                    <img src={searchImage} style={{ width: '20x', height: '20px', position: 'relative', left: '745px', top: '-49px', opacity: 0.3 }}></img>
                </div>
                {(patientVisitTab === 5 && <div style={{ position: "absolute", top: "194px", left: "82px", backgroundColor: "var(--color-darkslateblue-200)", width: "129px", height: "2px" }} />)}
                {(patientVisitTab === 6 && <div style={{ position: "absolute", top: "194px", left: "233px", backgroundColor: "var(--color-darkslateblue-200)", width: "102px", height: "2px" }} />)}
                {(patientVisitTab === 7 && <div style={{ position: "absolute", top: "194px", left: "365px", backgroundColor: "var(--color-darkslateblue-200)", width: "129px", height: "2px" }} />)}
                {(patientVisitTab === 8 && <div style={{ position: "absolute", top: "194px", left: "527px", backgroundColor: "var(--color-darkslateblue-200)", width: "140px", height: "2px" }} />)}

                {((patientVisitTab === 5) && <div style={{ position: 'absolute', top: '325px', left: '80px', width: 'calc(100% - 18px)' }}>


                    <DataTable style={{ border: '0px', top: "-110px", }}
                        value={allergyTableData} onRowSelect={onRowSelectAllergyData}
                        selectionMode="multiple"
                        rows={50} scrollable={true}
                        responsive={true} selection={selectedValues} onSelectionChange={onSelectionChangedData}
                        emptyMessage="No records found">
                        <Column selectionMode="multiple" headerStyle={{ width: '4%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500, position: 'relative', left: '5px' }} style={{ borderLeft: '0px', borderRight: '0px', width: '4%', background: '#FFF' }}></Column>
                        <Column field="enteredDate" header="Procedure" headerStyle={{ width: '16%', textAlign: 'start', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500, }} style={{ borderLeft: '0px', borderRight: '0px', height: "52px", width: '22%', background: '#FFF' }} />
                        <Column field="historical" header="Urgency" headerStyle={{ width: '8%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500, position: "relative", left: "-3px" }} style={{ borderLeft: '0px', borderRight: '0px', width: '17%', background: '#FFF' }} />
                        <Column field="allergyType" header="Attention" headerStyle={{ left: "11px", position: "relative", width: '8%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '11%', background: '#FFF' }} />
                        <Column field="observedDetails.reactionDescription" header="Patient will be seen as" headerStyle={{ left: "20px", position: "relative", whiteSpace: "nowrap", width: '18%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '25%', background: '#FFF' }} />
                        <Column field="observedDetails.dateOfLastReaction" header="Earliest appropriate date" headerStyle={{ left: "12px", position: "relative", width: '21%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '26%', background: '#FFF' }} />
                        <Column field="allergySeverity" header="Place of Consult" headerStyle={{ width: '15%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500, position: 'relative', left: '-7px' }} style={{ borderLeft: '0px', borderRight: '0px', width: '15%', background: '#FFF' }} />
                    </DataTable>
                </div>)}
                {(patientVisitTab === 6 && <div style={{ position: 'absolute', top: '325px', left: '12px', width: 'calc(100% - 18px)' }}>
                    <div className="admit-patient-dropdown">

                    </div>
                    <DataTable style={{ border: '0px', top: "-110px", left: "69px" }}
                        value={problemTableData} onRowSelect={onRowSelectProblemData}
                        selectionMode="multiple"
                        rows={50} scrollable={true}
                        responsive={true} selection={selectedValues} onSelectionChange={onSelectionChangedData}
                        emptyMessage="No records found">
                        <Column selectionMode="multiple" headerStyle={{ width: '4%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500, position: 'relative', left: '4px' }} style={{ borderLeft: '0px', borderRight: '0px', width: '5%', background: '#FFF' }}></Column>
                        <Column field="Patient ID" header="Patient ID" headerStyle={{ position: "relative", left: "12px", whiteSpace: "nowrap", width: '10%', textAlign: 'start', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '33%', background: '#FFF' }} body={dataOnsetDate} />
                        <Column field="problemDescription" header="Admission Date" headerStyle={{ position: "relative", left: "-14px", whiteSpace: "nowrap", width: '14%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500 }} style={{ whiteSpace:"nowrap",borderLeft: '0px', borderRight: '0px', width: '26%', background: '#FFF' }} />
                        <Column field="" header="Admission Type" headerStyle={{ position: "relative", left: "-3px", whiteSpace: "nowrap", width: '8%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '24%', background: '#FFF' }} />
                        <Column field="id" header="Attending Physician" headerStyle={{ position: "relative", left: "34px", whiteSpace: "nowrap", width: '16%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '29%', background: '#FFF',position:"relative",left:"-22px" }} body={dataSelectedPatientName} />
                        <Column field="" header="Facility Treating Speciality" headerStyle={{ position: "relative", left: "30px", whiteSpace: "nowrap", width: '17%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '27%', background: '#FFF' }} />
                        <Column field="" header="Primary Physician " headerStyle={{ position: "relative", left: "33px", whiteSpace: "nowrap", width: '17%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '27%', background: '#FFF' }} />
                        <Column field="" header="Room Bed" headerStyle={{ width: '17%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '27%', background: '#FFF' }} />
                    </DataTable>
                </div>)}
                {(patientVisitTab === 7 && <div style={{ position: 'absolute', top: '325px', left: '12px', width: 'calc(100% - 18px)' }}>




                    <div className="admit-patient-dropdown">

                    </div>
                    <DataTable style={{ border: '0px', top: "-110px", left: "69px" }}
                        value={labOrderTableData} 
                        selectionMode="multiple"
                        rows={50} scrollable={true}
                        responsive={true} selection={selectedValues} onSelectionChange={onSelectionChangedData}
                        emptyMessage="No records found">
                        <Column selectionMode="multiple" headerStyle={{ width: '7%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '8%', background: '#FFF',position:"relative",left:"-4px" }}></Column>
                        <Column field="labTestName" header="Lab Test" headerStyle={{ width: '15%', textAlign: 'start', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '44%', background: '#FFF' }} body={dataLabTest}/>
                        <Column field="collectionType" header="Collection Type" headerStyle={{ position: "relative", left: "-5px", width: '33%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '46%', background: '#FFF', position: "relative", left: "-45px" }} body={dataCollectionType}/>
                        <Column field="collectionDateTime" header="Collection Date/Time" headerStyle={{ position: "relative", left: "-9px", width: '30%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '67%', background: '#FFF', position: "relative", left: "-80px" }} body={dataCollectionDate} />
                        <Column field="collectionSample" header="Collect Sample" headerStyle={{ position: "relative", left: "-18px", whiteSpace: "nowrap", width: '37%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '13%', background: '#FFF', position: "relative", left: "-107px" }} body={dataCollectionSample}/>
                        <Column field="specimen" header="Specimen" headerStyle={{ position: "relative", left: "-22px", whiteSpace: "nowrap", width: '16%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '19%', background: '#FFF',position:"relative",left:"-83px" }} body={dataSpecimen}/>
                        <Column field="urgency" header="Urgency" headerStyle={{ width: '10%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500,position:"relative",left:"-7px" }} style={{ borderLeft: '0px', borderRight: '0px', width: '16%', background: '#FFF',position:"relative",left:"-50px" }} body={dataUrgency}/>
                        <Column field="" header="" headerStyle={{ width: '25%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '11px', fontWeight: 500, position: "relative", left: "69px" }} style={{ borderLeft: '0px', borderRight: '0px', background: '#FFF', position: "relative",left:"-25px" }} body={datalabEdit} />

                    </DataTable>
                    <Dialog maxWidth={'md'} PaperProps={{ sx: { overflow: 'hidden', height: '100px', width: '190px' } }}
                        open={newDialogslab}
                        onClose={() => setNewDialogsimmu(false)}
                    >
                        <DialogContentText >
                            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', left: '18px', top: '18px' }}>
                                <a style={{ cursor: 'pointer' }} onClick={() => onLabData(rowDataValueslab)}><div style={{ fontSize: '14px' }} className="AppTopBar-profileName">Edit Lab Test</div></a>
                                <a style={{ cursor: 'pointer' }} onClick={() => onRowSelectDataslab(rowDataValueslab)}><div style={{ position: 'relative', top: '23px', fontSize: '14px' }} className="AppTopBar-profileName">View Lab Test</div></a>
                            </div>

                        </DialogContentText>
                    </Dialog>
                </div>)}

                {(patientVisitTab === 8 && <div style={{ position: 'absolute', top: '325px', left: '12px', width: 'calc(100% - 18px)' }}>

                    <div className="admit-patient-dropdown">

                    </div>
                    <DataTable style={{ border: '0px', top: "-110px", left: "69px" }}
                        value={allergyTableData}
                        selectionMode="multiple"
                        rows={50} scrollable={true}
                        responsive={true} selection={selectedValues} onSelectionChange={onSelectionChangedData}
                        emptyMessage="No records found">
                        <Column selectionMode="multiple" headerStyle={{ width: '4%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '5%', background: '#FFF' }}></Column>
                        <Column field="" header="Service/Speciality" headerStyle={{ position: "relative", left: "9px", whiteSpace: "nowrap", width: '10%', textAlign: 'start', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '20%', background: '#FFF' }} />
                        <Column field="" header="Urgency " headerStyle={{ position: "relative", left: "40px", whiteSpace: "nowrap", width: '14%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '23%', background: '#FFF' }} body={""} />
                        <Column field="" header="Attention" headerStyle={{ position: "relative", left: "3px", whiteSpace: "nowrap", width: '8%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '15%', background: '#FFF' }} body={""} />
                        <Column field="" header="Patient will be seen as" headerStyle={{ position: "relative", left: "13px", whiteSpace: "nowrap", width: '16%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '29%', background: '#FFF' }} body={""} />
                        <Column field="" header="Earliest appropriate date" headerStyle={{ position: "relative", left: "23px", whiteSpace: "nowrap", width: '17%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '27%', background: '#FFF' }} body={""} />
                        <Column field="" header="Place of Consult" headerStyle={{ position: "relative", left: "13px", whiteSpace: "nowrap", width: '17%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '27%', background: '#FFF' }} body={""} />

                    </DataTable>
                </div>)}
           
        </div>


    );


};
const mapStateToProps = (state: any) => {
    const { deviceFormData, getAllPatientData, getallPatientVisitData } = state;
    return {
        deviceFormData, getAllPatientData, getallPatientVisitData
    };
};
export default connect(mapStateToProps)(VpatientVisit)