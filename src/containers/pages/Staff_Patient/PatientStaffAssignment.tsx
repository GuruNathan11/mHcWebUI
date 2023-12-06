import { FunctionComponent, useState, useCallback, Dispatch, useEffect } from "react";
import { TextField, Autocomplete, FormControl, FormHelperText, MenuItem, Select, InputLabel } from "@mui/material";
import PortalPopup from "./../../../components/PortalPopup";
import Component321 from "./../../../components/Component321";
import SecondaryButton from "./../../../components/SecondaryButton";
import PrimaryButton from "./../../../components/PrimaryButton";
import Component1 from "./../../../components/Component1";
import Remove from "./../../../components/Remove";
import Add from "./../../../components/Add";
import "./PatientStaffAssignment.css";
import React from "react";
import { connect } from "react-redux";
import group507Image from "./../../../assets/images/mettler_images/group-507.svg";
import bgImage from "./../../../assets/images/mettler_images/bg.svg";
import rectangle6605 from "./../../../assets/images/mettler_images/rectangle-6605.svg";
import iconssearchImage from "./../../../assets/images/mettler_images/iconssearch.svg";
import avatar2Image from "./../../../assets/images/mettler_images/avatar22.svg";
import avatar3Image from "./../../../assets/images/mettler_images/avatar3.svg";
import { getallpatientstaff } from "../../../store/actions/PatientStaffAssignController";
import { HttpLogin } from "../../../utils/Http";
import PatientStaffAssignmentData from './../../../assets/data/PatientStaffAssignmentData.json'
import StaffPatientAssignmentData from './../../../assets/data/StaffPatientAssignmentData.json'
import { assignpatientstaff } from "../../../store/actions/PatientStaffAssignController";
import { assignstaffPatient } from "../../../store/actions/PatientStaffAssignController";
import { getAllStaff } from "../../../store/actions/Staff";
import { getAllPatient } from "../../../store/actions/Patient";
import loaddingFile from '../../../../src/assets/images/tenor.gif';

interface IPatientStaffAssignment { }
interface IPatientStaffAssignment {
  StaticPage: any;
  dispatch: Dispatch<any>;
  getAllStaffData: any;
  getAllPatientData: any;
  getallpatientstaffData: any;
  assignpatientstaffData:any;
  assignstaffpatientData:any;
  state: {
    nodes: [],
    checked: [],
    expanded: []
  }
}
const PatientStaffAssignment: React.FC<IPatientStaffAssignment> = ({
  dispatch, getAllStaffData, getAllPatientData, getallpatientstaffData,assignpatientstaffData,assignstaffpatientData
}) => {
  let [getStaffDataItems, setGetStaffDataItems] = useState(new Array<any>());
  let [getPatientDataItems, setGetPatientDataItems] = useState(new Array<any>());
  let [getpatientstaffDataItems, setGetpatientstaffDataItems] = useState(new Array<any>());
  let [inputOrgData, setInputOrgData] = useState("");
  let [StaffPatientData, setStaffPatientData] = useState(StaffPatientAssignmentData);
  let [PatientStaffinputData, setPatientStaffInputData] = useState(PatientStaffAssignmentData);
  const [vendorList, setVendorList] = useState(StaffPatientAssignmentData.pid);
  const [spinner, setSpinner] = useState(false);
  useEffect(() => {
    setSpinner(true);
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
    dispatch(getAllStaff());
    dispatch(getAllPatient());
    dispatch(getallpatientstaff());

  }, []);


  let [patientStaffTab, setPatientStaffTab] = useState(Number);
  const handleChangeEvent = (event) => {
    patientStaffTab = event;
    setPatientStaffTab(event);
  };

  const [isPatientPageLoaded, setPatientPageLoaded] = useState(false);

  if (!isPatientPageLoaded && !getAllPatientData.isLoading) {
    if (getAllPatientData.items.message.code === "MHC - 0200") {
      setGetPatientDataItems(getAllPatientData.items.data.filter(t => t.organization === inputOrgData));
      setSpinner(false);
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
  const [ispatientstaffLoaded, setispatientstaffLoaded] = useState(false);

  if (!ispatientstaffLoaded && !getallpatientstaffData.isLoading) {
    //  console.log(JSON.stringify(getallpatientstaffData.items));
    if (getallpatientstaffData.items.message.code === "MHC - 0179") {
      setGetpatientstaffDataItems(getallpatientstaffData.items.data);
      setSpinner(false);
    } else {
      setGetpatientstaffDataItems([]);
     // alert(getallpatientstaffData.items.message.description);
    }
    setispatientstaffLoaded(true)
  }
  if (!getallpatientstaffData && getallpatientstaffData.isFormSubmit) {

    setTimeout(() => {
      setispatientstaffLoaded(false);

    }, (1000));
  }

  const [isPageLoaded, setPageLoaded] = useState(false);

  if (!isPageLoaded && !getAllStaffData.isLoading) {
    //  console.log(JSON.stringify(getAllStaffData.items))
    if (getAllStaffData.items.message.code === "MHC - 0200") {
      setGetStaffDataItems(getAllStaffData.items.data.filter(t => t.organization === inputOrgData));
      setSpinner(false);
    } else {
      setGetStaffDataItems([]);
    //  alert(getAllStaffData.items.message.description);
    }
    setPageLoaded(true)
  }
  if (!getAllStaffData && getAllStaffData.isFormSubmit) {

    setTimeout(() => {
      setPageLoaded(false);

    }, (1000));
  }

  function clean(obj) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj
  }
 

  const handleInputChange = (event: any) => {
    if (event.target.name === "psychiatrists1") {
      PatientStaffinputData.psychiatrists[0] = event.target.value;
    } else if (event.target.name === "psychiatrists2") {
      PatientStaffinputData.psychiatrists[1] = event.target.value;
    } else if (event.target.name === "psychiatrists3") {
      PatientStaffinputData.psychiatrists[2] = event.target.value;
    } else if (event.target.name === "psychiatrists4") {
      PatientStaffinputData.psychiatrists[3] = event.target.value;
    } else if (event.target.name === "medicalDoctor1") {
      PatientStaffinputData.medicalDoctor[0] = event.target.value;
    } else if (event.target.name === "medicalDoctor2") {
      PatientStaffinputData.medicalDoctor[1] = event.target.value;
    } else if (event.target.name === "medicalDoctor3") {
      PatientStaffinputData.medicalDoctor[2] = event.target.value;
    } else if (event.target.name === "medicalDoctor4") {
      PatientStaffinputData.medicalDoctor[3] = event.target.value;
    } else if (event.target.name === "nursePractitioner1") {
      PatientStaffinputData.nursePractitioner[0] = event.target.value;
    } else if (event.target.name === "nursePractitioner2") {
      PatientStaffinputData.nursePractitioner[1] = event.target.value;
    } else if (event.target.name === "nursePractitioner3") {
      PatientStaffinputData.nursePractitioner[2] = event.target.value;
    } else if (event.target.name === "nursePractitioner4") {
      PatientStaffinputData.nursePractitioner[3] = event.target.value;
    } else if (event.target.name === "physicianAssistant1") {
      PatientStaffinputData.physicianAssistant[0] = event.target.value;
    } else if (event.target.name === "physicianAssistant2") {
      PatientStaffinputData.physicianAssistant[1] = event.target.value;
    } else if (event.target.name === "physicianAssistant3") {
      PatientStaffinputData.physicianAssistant[2] = event.target.value;
    } else if (event.target.name === "physicianAssistant4") {
      PatientStaffinputData.physicianAssistant[3] = event.target.value;
    } else if (event.target.name === "psychologist1") {
      PatientStaffinputData.psychologist[0] = event.target.value;
    } else if (event.target.name === "psychologist2") {
      PatientStaffinputData.psychologist[1] = event.target.value;
    } else if (event.target.name === "psychologist3") {
      PatientStaffinputData.psychologist[2] = event.target.value;
    } else if (event.target.name === "psychologist4") {
      PatientStaffinputData.psychologist[3] = event.target.value;
    } else if (event.target.name === "registeredNurses1") {
      PatientStaffinputData.registeredNurses[0] = event.target.value;
    } else if (event.target.name === "registeredNurses2") {
      PatientStaffinputData.registeredNurses[1] = event.target.value;
    } else if (event.target.name === "registeredNurses3") {
      PatientStaffinputData.registeredNurses[2] = event.target.value;
    } else if (event.target.name === "registeredNurses4") {
      PatientStaffinputData.registeredNurses[3] = event.target.value;
    } else if (event.target.name === "socialWorkers1") {
      PatientStaffinputData.socialWorkers[0] = event.target.value;
    } else if (event.target.name === "socialWorkers2") {
      PatientStaffinputData.socialWorkers[1] = event.target.value;
    } else if (event.target.name === "socialWorkers3") {
      PatientStaffinputData.socialWorkers[2] = event.target.value;
    } else if (event.target.name === "socialWorkers4") {
      PatientStaffinputData.socialWorkers[3] = event.target.value;
    } else if (event.target.name === "activityTherapist1") {
      PatientStaffinputData.activityTherapist[0] = event.target.value;
    } else if (event.target.name === "activityTherapist2") {
      PatientStaffinputData.activityTherapist[1] = event.target.value;
    } else if (event.target.name === "activityTherapist3") {
      PatientStaffinputData.activityTherapist[2] = event.target.value;
    } else if (event.target.name === "activityTherapist4") {
      PatientStaffinputData.activityTherapist[3] = event.target.value;
    } else if (event.target.name === "yogaTherapist1") {
      PatientStaffinputData.yogaTherapist[0] = event.target.value;
    } else if (event.target.name === "yogaTherapist2") {
      PatientStaffinputData.yogaTherapist[1] = event.target.value;
    } else if (event.target.name === "yogaTherapist3") {
      PatientStaffinputData.yogaTherapist[2] = event.target.value;
    } else if (event.target.name === "yogaTherapist4") {
      PatientStaffinputData.yogaTherapist[3] = event.target.value;
    } else if (event.target.name === "mentalHealthWorkers1") {
      PatientStaffinputData.mentalHealthWorkers[0] = event.target.value;
    } else if (event.target.name === "mentalHealthWorkers2") {
      PatientStaffinputData.mentalHealthWorkers[1] = event.target.value;
    } else if (event.target.name === "mentalHealthWorkers3") {
      PatientStaffinputData.mentalHealthWorkers[2] = event.target.value;
    } else if (event.target.name === "mentalHealthWorkers4") {
      PatientStaffinputData.mentalHealthWorkers[3] = event.target.value;
    } else if (event.target.name === "rROfficer1") {
      PatientStaffinputData.rROfficer[0] = event.target.value;
    } else if (event.target.name === "rROfficer2") {
      PatientStaffinputData.rROfficer[1] = event.target.value;
    } else if (event.target.name === "rROfficer3") {
      PatientStaffinputData.rROfficer[2] = event.target.value;
    } else if (event.target.name === "rROfficer4") {
      PatientStaffinputData.rROfficer[3] = event.target.value;
    } else if (event.target.name === "nurseManagers1") {
      PatientStaffinputData.nurseManagers[0] = event.target.value;
    } else if (event.target.name === "nurseManagers2") {
      PatientStaffinputData.nurseManagers[1] = event.target.value;
    } else if (event.target.name === "nurseManagers3") {
      PatientStaffinputData.nurseManagers[2] = event.target.value;
    } else if (event.target.name === "nurseManagers4") {
      PatientStaffinputData.nurseManagers[3] = event.target.value;
    } else if (event.target.name === "dirOfNursing1") {
      PatientStaffinputData.dirOfNursing[0] = event.target.value;
    } else if (event.target.name === "dirOfNursing2") {
      PatientStaffinputData.dirOfNursing[1] = event.target.value;
    } else if (event.target.name === "dirOfNursing3") {
      PatientStaffinputData.dirOfNursing[2] = event.target.value;
    } else if (event.target.name === "dirOfNursing4") {
      PatientStaffinputData.dirOfNursing[3] = event.target.value;
    } else if (event.target.name === "executives1") {
      PatientStaffinputData.executives[0] = event.target.value;
    } else if (event.target.name === "executives2") {
      PatientStaffinputData.executives[1] = event.target.value;
    } else if (event.target.name === "executives3") {
      PatientStaffinputData.executives[2] = event.target.value;
    } else if (event.target.name === "executives4") {
      PatientStaffinputData.executives[3] = event.target.value;
    } else if (event.target.name === "dirOfHIM1") {
      PatientStaffinputData.dirOfHIM[0] = event.target.value;
    } else if (event.target.name === "dirOfHIM2") {
      PatientStaffinputData.dirOfHIM[1] = event.target.value;
    } else if (event.target.name === "dirOfHIM3") {
      PatientStaffinputData.dirOfHIM[2] = event.target.value;
    } else if (event.target.name === "dirOfHIM4") {
      PatientStaffinputData.dirOfHIM[3] = event.target.value;
    } else if (event.target.name === "regDietitian1") {
      PatientStaffinputData.regDietitian[0] = event.target.value;
    } else if (event.target.name === "regDietitian2") {
      PatientStaffinputData.regDietitian[1] = event.target.value;
    } else if (event.target.name === "regDietitian3") {
      PatientStaffinputData.regDietitian[2] = event.target.value;
    } else if (event.target.name === "regDietitian4") {
      PatientStaffinputData.regDietitian[3] = event.target.value;
    } else if (event.target.name === "hr1") {
      PatientStaffinputData.hr[0] = event.target.value;
    } else if (event.target.name === "hr2") {
      PatientStaffinputData.hr[1] = event.target.value;
    } else if (event.target.name === "hr3") {
      PatientStaffinputData.hr[2] = event.target.value;
    } else if (event.target.name === "hr4") {
      PatientStaffinputData.hr[3] = event.target.value;
    } else if (event.target.name === "qrdirector4") {
      PatientStaffinputData.qrdirector[3] = event.target.value;
    } else if (event.target.name === "qrdirector3") {
      PatientStaffinputData.qrdirector[2] = event.target.value;
    } else if (event.target.name === "qrdirector2") {
      PatientStaffinputData.qrdirector[1] = event.target.value;
    } else if (event.target.name === "qrdirector1") {
      PatientStaffinputData.qrdirector[0] = event.target.value;
    } else if (event.target.name === "patientId") {
      HttpLogin.axios().get("api/patient_staff/get/" + event.target.value)
        .then((res) => {
          //  console.log(JSON.stringify(res.data));
          PatientStaffinputData.pid[0] = event.target.value;
          var inputNewData = res.data.data;
          if (inputNewData != undefined) {
            PatientStaffinputData.psychiatrists = inputNewData.psychiatrists != undefined ? inputNewData.psychiatrists : [];
            PatientStaffinputData.medicalDoctor = inputNewData.medicalDoctor != undefined ? inputNewData.medicalDoctor : [];
            PatientStaffinputData.nursePractitioner = inputNewData.nursePractitioner != undefined ? inputNewData.nursePractitioner : [];
            PatientStaffinputData.physicianAssistant = inputNewData.physicianAssistant != undefined ? inputNewData.physicianAssistant : [];
            PatientStaffinputData.psychologist = inputNewData.psychologist != undefined ? inputNewData.psychologist : [];
            PatientStaffinputData.registeredNurses = inputNewData.registeredNurses != undefined ? inputNewData.registeredNurses : [];
            PatientStaffinputData.socialWorkers = inputNewData.socialWorkers != undefined ? inputNewData.socialWorkers : [];
            PatientStaffinputData.activityTherapist = inputNewData.activityTherapist != undefined ? inputNewData.activityTherapist : [];
            PatientStaffinputData.yogaTherapist = inputNewData.yogaTherapist != undefined ? inputNewData.yogaTherapist : [];
            PatientStaffinputData.mentalHealthWorkers = inputNewData.mentalHealthWorkers != undefined ? inputNewData.mentalHealthWorkers : [];
            PatientStaffinputData.rROfficer = inputNewData.rROfficer != undefined ? inputNewData.rROfficer : [];
            PatientStaffinputData.nurseManagers = inputNewData.nurseManagers != undefined ? inputNewData.nurseManagers : [];
            PatientStaffinputData.dirOfNursing = inputNewData.dirOfNursing != undefined ? inputNewData.dirOfNursing : [];
            PatientStaffinputData.executives = inputNewData.executives != undefined ? inputNewData.executives : [];
            PatientStaffinputData.dirOfHIM = inputNewData.dirOfHIM != undefined ? inputNewData.dirOfHIM : [];
            PatientStaffinputData.regDietitian = inputNewData.regDietitian != undefined ? inputNewData.regDietitian : [];
            PatientStaffinputData.qrdirector = inputNewData.qrdirector != undefined ? inputNewData.qrdirector : [];
            PatientStaffinputData.hr = inputNewData.hr != undefined ? inputNewData.hr : [];
            setPatientStaffInputData({ ...PatientStaffinputData });

          } else {
            PatientStaffinputData.psychiatrists = [];
            PatientStaffinputData.medicalDoctor = [];
            PatientStaffinputData.nursePractitioner = [];
            PatientStaffinputData.physicianAssistant = [];
            PatientStaffinputData.psychologist = [];
            PatientStaffinputData.registeredNurses = [];
            PatientStaffinputData.socialWorkers = [];
            PatientStaffinputData.activityTherapist = [];
            PatientStaffinputData.yogaTherapist = [];
            PatientStaffinputData.mentalHealthWorkers = [];
            PatientStaffinputData.rROfficer = [];
            PatientStaffinputData.nurseManagers = [];
            PatientStaffinputData.dirOfNursing = [];
            PatientStaffinputData.executives = [];
            PatientStaffinputData.dirOfHIM = [];
            PatientStaffinputData.regDietitian = [];
            PatientStaffinputData.qrdirector = [];
            PatientStaffinputData.hr = [];
            setPatientStaffInputData({ ...PatientStaffinputData });
            setSpinner(false);
          }
        })
      //  if(event.target.value === getallpatientstaffData.items)
    }
    setPatientStaffInputData({ ...PatientStaffinputData });
  }

  const handleStaffInputChange = (event: any) => {
    if (event.target.name === "id") {
      StaffPatientData.id = event.target.value;
    } else if (event.target.name === "Staffpid") {
      StaffPatientData.pid[0] = event.target.value;
    } else if (event.target.name === "Staffpid1") {
      StaffPatientData.pid[1] = event.target.value;
    } else if (event.target.name === "Staffpid2") {
      StaffPatientData.pid[2] = event.target.value;
    } else if (event.target.name === "Staffpid3") {
      StaffPatientData.pid[3] = event.target.value;
    } else if (event.target.name === "Staffpid4") {
      StaffPatientData.pid[4] = event.target.value;
    } else if (event.target.name === "Staffpid5") {
      StaffPatientData.pid[5] = event.target.value;
    } else if (event.target.name === "Staffpid6") {
      StaffPatientData.pid[6] = event.target.value;
    } else if (event.target.name === "sid") {
      StaffPatientData.sid[0] = event.target.value;
      HttpLogin.axios().get("api/patient_staff/getByStaffId/" + event.target.value)
        .then((res) => {
          StaffPatientData.sid[0] = event.target.value;
          console.log(JSON.stringify(event.target.value));
          if (res.data.data !== undefined && res.data.data.length > 0) {
            setVendorList(res.data.data);
        }
          if (res.data.data != undefined) {
            StaffPatientData.pid = res.data.data != undefined ? res.data.data : [];
            setStaffPatientData({ ...StaffPatientData });
          } else {
            StaffPatientData.pid = [];
            setStaffPatientData({ ...StaffPatientData });
            setSpinner(false);
          }
        })
    }
    setStaffPatientData({ ...StaffPatientData });
  }


  const handleClickChange = () => {
    PatientStaffinputData.psychiatrists = PatientStaffinputData.psychiatrists.filter(i => i != "").length > 0 ? PatientStaffinputData.psychiatrists.filter(i => i != "").map((k) => { if (k.length > 0) { return k } }) : [];
    PatientStaffinputData.medicalDoctor = PatientStaffinputData.medicalDoctor.filter(i => i != "").length > 0 ? PatientStaffinputData.medicalDoctor.filter(i => i != "").map((k) => { if (k.length > 0) { return k } }) : [];
    PatientStaffinputData.nursePractitioner = PatientStaffinputData.nursePractitioner.filter(i => i != "").length > 0 ? PatientStaffinputData.nursePractitioner.filter(i => i != "").map((k) => { if (k.length > 0) { return k } }) : [];
    PatientStaffinputData.physicianAssistant = PatientStaffinputData.physicianAssistant.filter(i => i != "").length > 0 ? PatientStaffinputData.physicianAssistant.filter(i => i != "").map((k) => { if (k.length > 0) { return k } }) : [];
    PatientStaffinputData.psychologist = PatientStaffinputData.psychologist.filter(i => i != "").length > 0 ? PatientStaffinputData.psychologist.filter(i => i != "").map((k) => { if (k.length > 0) { return k } }) : [];
    PatientStaffinputData.registeredNurses = PatientStaffinputData.registeredNurses.filter(i => i != "").length > 0 ? PatientStaffinputData.registeredNurses.filter(i => i != "").map((k) => { if (k.length > 0) { return k } }) : [];
    PatientStaffinputData.socialWorkers = PatientStaffinputData.socialWorkers.filter(i => i != "").length > 0 ? PatientStaffinputData.socialWorkers.filter(i => i != "").map((k) => { if (k.length > 0) { return k } }) : [];
    PatientStaffinputData.activityTherapist = PatientStaffinputData.activityTherapist.filter(i => i != "").length > 0 ? PatientStaffinputData.activityTherapist.filter(i => i != "").map((k) => { if (k.length > 0) { return k } }) : [];
    PatientStaffinputData.yogaTherapist = PatientStaffinputData.yogaTherapist.filter(i => i != "").length > 0 ? PatientStaffinputData.yogaTherapist.filter(i => i != "").map((k) => { if (k.length > 0) { return k } }) : [];
    PatientStaffinputData.mentalHealthWorkers = PatientStaffinputData.mentalHealthWorkers.filter(i => i != "").length > 0 ? PatientStaffinputData.mentalHealthWorkers.filter(i => i != "").map((k) => { if (k.length > 0) { return k } }) : [];
    PatientStaffinputData.rROfficer = PatientStaffinputData.rROfficer.filter(i => i != "").length > 0 ? PatientStaffinputData.rROfficer.filter(i => i != "").map((k) => { if (k.length > 0) { return k } }) : [];
    PatientStaffinputData.nurseManagers = PatientStaffinputData.nurseManagers.filter(i => i != "").length > 0 ? PatientStaffinputData.nurseManagers.filter(i => i != "").map((k) => { if (k.length > 0) { return k } }) : [];
    PatientStaffinputData.dirOfNursing = PatientStaffinputData.dirOfNursing.filter(i => i != "").length > 0 ? PatientStaffinputData.dirOfNursing.filter(i => i != "").map((k) => { if (k.length > 0) { return k } }) : [];
    PatientStaffinputData.executives = PatientStaffinputData.executives.filter(i => i != "").length > 0 ? PatientStaffinputData.executives.filter(i => i != "").map((k) => { if (k.length > 0) { return k } }) : [];
    PatientStaffinputData.dirOfHIM = PatientStaffinputData.dirOfHIM.filter(i => i != "").length > 0 ? PatientStaffinputData.dirOfHIM.filter(i => i != "").map((k) => { if (k.length > 0) { return k } }) : [];
    PatientStaffinputData.regDietitian = PatientStaffinputData.regDietitian.filter(i => i != "").length > 0 ? PatientStaffinputData.regDietitian.filter(i => i != "").map((k) => { if (k.length > 0) { return k } }) : [];
    PatientStaffinputData.qrdirector = PatientStaffinputData.qrdirector.filter(i => i != "").length > 0 ? PatientStaffinputData.qrdirector.filter(i => i != "").map((k) => { if (k.length > 0) { return k } }) : [];
    PatientStaffinputData.hr = PatientStaffinputData.hr.filter(i => i != "").length > 0 ? PatientStaffinputData.hr.filter(i => i != "").map((k) => { if (k.length > 0) { return k } }) : [];
    setPatientStaffInputData({ ...PatientStaffinputData });
    setSpinner(true);
    if (PatientStaffinputData.pid.length === 0) {
      alert("Please Select any one of the Patient");
    } 
    else if ((PatientStaffinputData.pid.length !== 0) && (PatientStaffinputData.psychiatrists.length === 0 &&
      PatientStaffinputData.medicalDoctor.length === 0 && PatientStaffinputData.nursePractitioner.length === 0 && PatientStaffinputData.physicianAssistant.length === 0 &&
      PatientStaffinputData.psychologist.length === 0 && PatientStaffinputData.registeredNurses.length === 0 && PatientStaffinputData.socialWorkers.length === 0 &&
      PatientStaffinputData.activityTherapist.length === 0 && PatientStaffinputData.yogaTherapist.length === 0 && PatientStaffinputData.mentalHealthWorkers.length === 0 &&
      PatientStaffinputData.rROfficer.length === 0 && PatientStaffinputData.nurseManagers.length === 0 && PatientStaffinputData.dirOfNursing.length === 0 &&
      PatientStaffinputData.executives.length === 0 && PatientStaffinputData.dirOfHIM.length === 0 && PatientStaffinputData.regDietitian.length === 0
      && PatientStaffinputData.qrdirector.length === 0 && PatientStaffinputData.hr.length === 0)) {
      alert("Staff are not Empty, Please Select any of the Staff");
    }
     else {
      dispatch(assignpatientstaff(PatientStaffinputData));
      setTimeout(() => {             
        setSpinner(false);
      }, (1000));
    }

  }
  const handleStaffClickChange = () => {
    // var newInputData = StaffPatientData.pid.filter(i => {
    //   if (i !== null) {
    //     return i;
    //   }
    // })
    setVendorList(vendorList);
    StaffPatientData.pid = vendorList;
   // StaffPatientData.pid = newInputData;
    setStaffPatientData({ ...StaffPatientData });
    console.log(JSON.stringify(StaffPatientData));
    setSpinner(true);
    if ((StaffPatientData.sid.length === 0 || StaffPatientData.sid[0] === "") && (StaffPatientData.pid.length !== 0 || StaffPatientData.pid.length === 0 || StaffPatientData.pid.length > 0)) {
      alert("Please Select any of the Staff")
    } else if (StaffPatientData.pid.length === 0 && StaffPatientData.sid.length !== 0) {
      alert("Please Select any one patient")
    } else {

      dispatch(assignstaffPatient(StaffPatientData));
      setTimeout(() => {             
              setSpinner(false);
            }, (1000));
    }
  }

  const handleVendorChange = (index, event) => {
    console.log(JSON.stringify(event.target.value));
    console.log(JSON.stringify(!StaffPatientData.pid.find(selected=> event.target.value === selected)));
    var flag = StaffPatientData.pid.length>0 && StaffPatientData !== undefined ? !StaffPatientData.pid.find(selected=> event.target.value === selected):true;
    if(flag === true){
      let data = [...vendorList];
      data[index] = event.target.value;   
      setVendorList(data);
    }else{
      alert("Already this patient has been placed");
    }   
};

const handleVendorRemove = (index) => {  
    const list = [...vendorList];
    list.splice(index ,1);
    setVendorList(list);
   
};

const handleVendorAdd = () => {
    setVendorList([...vendorList,""]);
};
  const onCancelContainerClick = () => {

  }

//   const [isPatientStaffAssignmentLoaded, setPatientStaffAssignmentLoaded] = useState(false);

//   if (!isPatientStaffAssignmentLoaded && !assignpatientstaffData.isLoading) {     
   
   
//     console.log( JSON.stringify(assignpatientstaffData.items));  
//     if (assignpatientstaffData.items !== undefined) {
//        setPatientStaffInputData(assignpatientstaffData.items.data);
//       console.log( JSON.stringify(assignpatientstaffData.items));    
//       //alert(assignpatientstaffData.items.message.description);       
//       setTimeout(() => {   
//         setSpinner(false);
//       }, (1000));   
//       setPatientStaffAssignmentLoaded(true); 
 
//     } else {
//       //alert(assignpatientstaffData.items.message.description);   
//       setTimeout(() => {
//         setPatientStaffAssignmentLoaded(false);
//         setSpinner(false);
//       }, (1000));
//     }
// }
// if (!assignpatientstaffData && assignpatientstaffData.isFormSubmit) {

//     setTimeout(() => {
//       setPatientStaffAssignmentLoaded(false);
//       setSpinner(false);
//     }, (1000));
// }
// const [isStaffPatientAssignmentLoaded, settStaffPatienAssignmentLoaded] = useState(false);

// if (!isStaffPatientAssignmentLoaded && !assignstaffpatientData.isLoading) { 
//   console.log( JSON.stringify(assignstaffpatientData.items));   
//   if (assignstaffpatientData.items !== undefined) {
//     setStaffPatientData(assignstaffpatientData.items.data);   
   
//    // alert(assignstaffpatientData.items.message.description);  
//     setTimeout(() => {   
//       setSpinner(false);
//     }, (1000));   
//     settStaffPatienAssignmentLoaded(true);    
//   } else {
//     alert(assignstaffpatientData.items.message.description);   
//     setTimeout(() => {
//       settStaffPatienAssignmentLoaded(false);
//       setSpinner(false);
//     }, (1000));
//   }

// }
// if (!assignstaffpatientData && assignstaffpatientData.isFormSubmit) {

//   setTimeout(() => {
//     settStaffPatienAssignmentLoaded(false);
//     setSpinner(false);
//   }, (1000));
// }

  return (

    <div className="spAssignment-details4" style={{ height: patientStaffTab === 1 || patientStaffTab === 0 ? '1700px' : vendorList.length <= 8 ? '708px': `${708+(vendorList.length <= 8 ? 0 :(vendorList.length - 8 + (vendorList.length %2 === 0 ? 0 : 1)) * 45)}px` }}>
      {spinner &&
        (<div className='overlay-content'>
          <div className='wrapper'>
            <img alt="" src={loaddingFile} style={{ position: 'absolute', width: '100%', height: '-webkit-fill-available', zIndex: 2, opacity: '0.5' }} />
          </div>
        </div>
        )}
      <div className="spAssignment-details-child" style={{ height: patientStaffTab === 1 || patientStaffTab === 0 ? '1561px' : vendorList.length <= 8 ? '578px': `${578+(vendorList.length <= 8 ? 0 :(vendorList.length - 8 + (vendorList.length %2 === 0 ? 0 : 1)) * 40)}px` }} />
      <div className="spAssignment-details-child2" />
      <div className="patientStaff-contact">
        <a style={{ cursor: 'pointer', color: patientStaffTab === 1 || patientStaffTab === 0 ? 'darkslateblue' : 'rgba(0, 0, 0, 0.87)' }} onClick={() => handleChangeEvent(1)}><div className="psDetails">Patient- Staff(s)</div></a>
        <a style={{ cursor: 'pointer', color: patientStaffTab === 2 ? 'darkslateblue' : 'rgba(0, 0, 0, 0.87)' }} onClick={() => handleChangeEvent(2)}><div className="spDetails">Staff- Patient(s)</div></a>
      </div>

      {((patientStaffTab === 1 || patientStaffTab === 0) && <div className="patientStaff-child3" />)}
      {(patientStaffTab === 2 && <div className="staffPatient-child3" />)}
      {((patientStaffTab === 0 || patientStaffTab === 1) &&
        <>
          <div className="staffPatientForm-inputs-row">
            <div className="staffPatient-inputs-row">
              <FormControl className="staffPatient-departure-field" variant="outlined">
                <InputLabel color="primary">Select Patient(s)</InputLabel>
                <Select color="primary" size="medium" label="Select Patient (s)" name="patientId" value={PatientStaffinputData.pid[0]} defaultValue=" " onChange={handleInputChange}>
                  {getPatientDataItems.map((newData, i) => {
                    return (
                      <MenuItem key={i} value={newData.id}>{newData.basicDetails[0].name[0].given + " " + newData.basicDetails[0].name[0].family}</MenuItem>
                    )
                  })}
                </Select>
                <FormHelperText />
              </FormControl>
            </div>
          </div>
          {/* <Component1
          avatar={avatar3Image}
          avatar2={avatar2Image}
          avatar2Icon={false}
          component1Position="absolute"
          component1Top="208px"
          component1Left="199px"
            />*/}
          <div className="patientStaff-Title">
            <span className="patientStaff-Title1">Role</span>
            <span className="patientStaff-Title2">Staff 1</span>
            <span className="patientStaff-Title3">Staff 2</span>
            <span className="patientStaff-Title4">Staff 3</span>
            <span className="patientStaff-Title5">Staff 4</span>
          </div>
          <div className="spAssignment-primary-class">
            <div className="spAssignment-cancel-parent1">
              <SecondaryButton
                label="Cancel"
                secondaryButtonCursor="pointer"
                onCancelContainerClick={onCancelContainerClick}
              />

              <PrimaryButton label="Save" primaryButtonCursor="pointer" onNextContainerClick={handleClickChange} />
            </div>
          </div>
          <div className="patientStaff-additional-input-row1">
            <TextField
              className="staffPatient-destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="Psychiatrists"
              value=""
              onChange={null}
              placeholder="Placeholder"
              size="medium"
              margin="none"

            />
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 1</InputLabel>
              <Select color="primary" size="medium" label="Staff 1" name="psychiatrists1" value={PatientStaffinputData.psychiatrists[0]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Psychiatrists" && i.id !== PatientStaffinputData.psychiatrists[1] && i.id !== PatientStaffinputData.psychiatrists[2] && i.id !== PatientStaffinputData.psychiatrists[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 2</InputLabel>
              <Select color="primary" size="medium" label="Staff 2" name="psychiatrists2" value={PatientStaffinputData.psychiatrists[1]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Psychiatrists" && i.id !== PatientStaffinputData.psychiatrists[0] && i.id !== PatientStaffinputData.psychiatrists[2] && i.id !== PatientStaffinputData.psychiatrists[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 3</InputLabel>
              <Select color="primary" size="medium" label="Staff 3" name="psychiatrists3" value={PatientStaffinputData.psychiatrists[2]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Psychiatrists" && i.id !== PatientStaffinputData.psychiatrists[0] && i.id !== PatientStaffinputData.psychiatrists[1] && i.id !== PatientStaffinputData.psychiatrists[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 4</InputLabel>
              <Select color="primary" size="medium" label="Staff 4" name="psychiatrists4" value={PatientStaffinputData.psychiatrists[3]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Psychiatrists" && i.id !== PatientStaffinputData.psychiatrists[0] && i.id !== PatientStaffinputData.psychiatrists[1] && i.id !== PatientStaffinputData.psychiatrists[2]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
          </div>
          <div className="patientStaff-additional-input-row2">
            <TextField
              className="staffPatient-destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="Medical Doctor"
              value=""
              onChange={null}
              placeholder="Placeholder"
              size="medium"
              margin="none"

            />
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 1</InputLabel>
              <Select color="primary" size="medium" label="Staff 1" name="medicalDoctor1" value={PatientStaffinputData.medicalDoctor[0]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Medical Doctor" && i.id !== PatientStaffinputData.medicalDoctor[1] && i.id !== PatientStaffinputData.medicalDoctor[2] && i.id !== PatientStaffinputData.medicalDoctor[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 2</InputLabel>
              <Select color="primary" size="medium" label="Staff 2" name="medicalDoctor2" value={PatientStaffinputData.medicalDoctor[1]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Medical Doctor" && i.id !== PatientStaffinputData.medicalDoctor[0] && i.id !== PatientStaffinputData.medicalDoctor[2] && i.id !== PatientStaffinputData.medicalDoctor[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 3</InputLabel>
              <Select color="primary" size="medium" label="Staff 3" name="medicalDoctor3" value={PatientStaffinputData.medicalDoctor[2]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Medical Doctor" && i.id !== PatientStaffinputData.medicalDoctor[0] && i.id !== PatientStaffinputData.medicalDoctor[1] && i.id !== PatientStaffinputData.medicalDoctor[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 4</InputLabel>
              <Select color="primary" size="medium" label="Staff 4" name="medicalDoctor4" value={PatientStaffinputData.medicalDoctor[3]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Medical Doctor" && i.id !== PatientStaffinputData.medicalDoctor[0] && i.id !== PatientStaffinputData.medicalDoctor[1] && i.id !== PatientStaffinputData.medicalDoctor[2]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
          </div>
          <div className="patientStaff-additional-input-row3">
            <TextField
              className="staffPatient-destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="Nurse Practitioner"
              value=""
              onChange={null}
              placeholder="Placeholder"
              size="medium"
              margin="none"

            />
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 1</InputLabel>
              <Select color="primary" size="medium" label="Staff 1" name="nursePractitioner1" value={PatientStaffinputData.nursePractitioner[0]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Nurse Practitioner" && i.id !== PatientStaffinputData.nursePractitioner[1] && i.id !== PatientStaffinputData.nursePractitioner[2] && i.id !== PatientStaffinputData.nursePractitioner[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 2</InputLabel>
              <Select color="primary" size="medium" label="Staff 2" name="nursePractitioner2" value={PatientStaffinputData.nursePractitioner[1]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Nurse Practitioner" && i.id !== PatientStaffinputData.nursePractitioner[0] && i.id !== PatientStaffinputData.nursePractitioner[2] && i.id !== PatientStaffinputData.nursePractitioner[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 3</InputLabel>
              <Select color="primary" size="medium" label="Staff 3" name="nursePractitioner3" value={PatientStaffinputData.nursePractitioner[2]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Nurse Practitioner" && i.id !== PatientStaffinputData.nursePractitioner[0] && i.id !== PatientStaffinputData.nursePractitioner[1] && i.id !== PatientStaffinputData.nursePractitioner[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 4</InputLabel>
              <Select color="primary" size="medium" label="Staff 4" name="nursePractitioner4" value={PatientStaffinputData.nursePractitioner[3]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Nurse Practitioner" && i.id !== PatientStaffinputData.nursePractitioner[0] && i.id !== PatientStaffinputData.nursePractitioner[1] && i.id !== PatientStaffinputData.nursePractitioner[2]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
          </div>
          <div className="patientStaff-additional-input-row4">
            <TextField
              className="staffPatient-destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="Physician Assistant"
              value=""
              onChange={null}
              placeholder="Placeholder"
              size="medium"
              margin="none"

            />
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 1</InputLabel>
              <Select color="primary" size="medium" label="Staff 1" name="physicianAssistant1" value={PatientStaffinputData.physicianAssistant[0]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Physician Assistant" && i.id !== PatientStaffinputData.physicianAssistant[1] && i.id !== PatientStaffinputData.physicianAssistant[2] && i.id !== PatientStaffinputData.physicianAssistant[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 2</InputLabel>
              <Select color="primary" size="medium" label="Staff 2" name="physicianAssistant2" value={PatientStaffinputData.physicianAssistant[1]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Physician Assistant" && i.id !== PatientStaffinputData.physicianAssistant[0] && i.id !== PatientStaffinputData.physicianAssistant[2] && i.id !== PatientStaffinputData.physicianAssistant[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 3</InputLabel>
              <Select color="primary" size="medium" label="Staff 3" name="physicianAssistant3" value={PatientStaffinputData.physicianAssistant[2]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Physician Assistant" && i.id !== PatientStaffinputData.physicianAssistant[0] && i.id !== PatientStaffinputData.physicianAssistant[1] && i.id !== PatientStaffinputData.physicianAssistant[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 4</InputLabel>
              <Select color="primary" size="medium" label="Staff 4" name="physicianAssistant4" value={PatientStaffinputData.physicianAssistant[3]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Physician Assistant" && i.id !== PatientStaffinputData.physicianAssistant[0] && i.id !== PatientStaffinputData.physicianAssistant[1] && i.id !== PatientStaffinputData.physicianAssistant[2]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
          </div>
          <div className="patientStaff-additional-input-row5">
            <TextField
              className="staffPatient-destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="Psychologists"
              value=""
              onChange={null}
              placeholder="Placeholder"
              size="medium"
              margin="none"

            />
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 1</InputLabel>
              <Select color="primary" size="medium" label="Staff 1" name="psychologist1" value={PatientStaffinputData.psychologist[0]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Psychologist" && i.id !== PatientStaffinputData.psychologist[1] && i.id !== PatientStaffinputData.psychologist[2] && i.id !== PatientStaffinputData.psychologist[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 2</InputLabel>
              <Select color="primary" size="medium" label="Staff 2" name="psychologist2" value={PatientStaffinputData.psychologist[1]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Psychologist" && i.id !== PatientStaffinputData.psychologist[0] && i.id !== PatientStaffinputData.psychologist[2] && i.id !== PatientStaffinputData.psychologist[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 3</InputLabel>
              <Select color="primary" size="medium" label="Staff 3" name="psychologist3" value={PatientStaffinputData.psychologist[2]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Psychologist" && i.id !== PatientStaffinputData.psychologist[0] && i.id !== PatientStaffinputData.psychologist[1] && i.id !== PatientStaffinputData.psychologist[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 4</InputLabel>
              <Select color="primary" size="medium" label="Staff 4" name="psychologist4" value={PatientStaffinputData.psychologist[3]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Psychologist" && i.id !== PatientStaffinputData.psychologist[0] && i.id !== PatientStaffinputData.psychologist[1] && i.id !== PatientStaffinputData.psychologist[2]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
          </div>
          <div className="patientStaff-additional-input-row6">
            <TextField
              className="staffPatient-destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="Registered Nurses"
              value=""
              onChange={null}
              placeholder="Placeholder"
              size="medium"
              margin="none"

            />
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 1</InputLabel>
              <Select color="primary" size="medium" label="Staff 1" name="registeredNurses1" value={PatientStaffinputData.registeredNurses[0]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Registered Nurses" && i.id !== PatientStaffinputData.registeredNurses[1] && i.id !== PatientStaffinputData.registeredNurses[2] && i.id !== PatientStaffinputData.registeredNurses[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 2</InputLabel>
              <Select color="primary" size="medium" label="Staff 2" name="registeredNurses2" value={PatientStaffinputData.registeredNurses[1]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Registered Nurses" && i.id !== PatientStaffinputData.registeredNurses[0] && i.id !== PatientStaffinputData.registeredNurses[2] && i.id !== PatientStaffinputData.registeredNurses[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 3</InputLabel>
              <Select color="primary" size="medium" label="Staff 3" name="registeredNurses3" value={PatientStaffinputData.registeredNurses[2]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Registered Nurses" && i.id !== PatientStaffinputData.registeredNurses[0] && i.id !== PatientStaffinputData.registeredNurses[1] && i.id !== PatientStaffinputData.registeredNurses[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 4</InputLabel>
              <Select color="primary" size="medium" label="Staff 4" name="registeredNurses4" value={PatientStaffinputData.registeredNurses[3]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Registered Nurses" && i.id !== PatientStaffinputData.registeredNurses[0] && i.id !== PatientStaffinputData.registeredNurses[1] && i.id !== PatientStaffinputData.registeredNurses[2]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
          </div>
          <div className="patientStaff-additional-input-row7">
            <TextField
              className="staffPatient-destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="Social Workers"
              value=""
              onChange={null}
              placeholder="Placeholder"
              size="medium"
              margin="none"

            />
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 1</InputLabel>
              <Select color="primary" size="medium" label="Staff 1" name="socialWorkers1" value={PatientStaffinputData.socialWorkers[0]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Social Workers" && i.id !== PatientStaffinputData.socialWorkers[1] && i.id !== PatientStaffinputData.socialWorkers[2] && i.id !== PatientStaffinputData.socialWorkers[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 2</InputLabel>
              <Select color="primary" size="medium" label="Staff 2" name="socialWorkers2" value={PatientStaffinputData.socialWorkers[1]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Social Workers" && i.id !== PatientStaffinputData.socialWorkers[0] && i.id !== PatientStaffinputData.socialWorkers[2] && i.id !== PatientStaffinputData.socialWorkers[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 3</InputLabel>
              <Select color="primary" size="medium" label="Staff 3" name="socialWorkers3" value={PatientStaffinputData.socialWorkers[2]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Social Workers" && i.id !== PatientStaffinputData.socialWorkers[0] && i.id !== PatientStaffinputData.socialWorkers[1] && i.id !== PatientStaffinputData.socialWorkers[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 4</InputLabel>
              <Select color="primary" size="medium" label="Staff 4" name="socialWorkers4" value={PatientStaffinputData.socialWorkers[3]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Social Workers" && i.id !== PatientStaffinputData.socialWorkers[0] && i.id !== PatientStaffinputData.socialWorkers[1] && i.id !== PatientStaffinputData.socialWorkers[2]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
          </div>
          <div className="patientStaff-additional-input-row8">
            <TextField
              className="staffPatient-destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="Activity Therapist"
              value=""
              onChange={null}
              placeholder="Placeholder"
              size="medium"
              margin="none"

            />
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 1</InputLabel>
              <Select color="primary" size="medium" label="Staff 1" name="activityTherapist1" value={PatientStaffinputData.activityTherapist[0]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Activity Therapist" && i.id !== PatientStaffinputData.activityTherapist[1] && i.id !== PatientStaffinputData.activityTherapist[2] && i.id !== PatientStaffinputData.activityTherapist[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 2</InputLabel>
              <Select color="primary" size="medium" label="Staff 2" name="activityTherapist2" value={PatientStaffinputData.activityTherapist[1]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Activity Therapist" && i.id !== PatientStaffinputData.activityTherapist[0] && i.id !== PatientStaffinputData.activityTherapist[2] && i.id !== PatientStaffinputData.activityTherapist[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 3</InputLabel>
              <Select color="primary" size="medium" label="Staff 3" name="activityTherapist3" value={PatientStaffinputData.activityTherapist[2]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Activity Therapist" && i.id !== PatientStaffinputData.activityTherapist[0] && i.id !== PatientStaffinputData.activityTherapist[1] && i.id !== PatientStaffinputData.activityTherapist[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 4</InputLabel>
              <Select color="primary" size="medium" label="Staff 4" name="activityTherapist4" value={PatientStaffinputData.activityTherapist[3]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Activity Therapist" && i.id !== PatientStaffinputData.activityTherapist[0] && i.id !== PatientStaffinputData.activityTherapist[1] && i.id !== PatientStaffinputData.activityTherapist[2]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
          </div>
          <div className="patientStaff-additional-input-row9">
            <TextField
              className="staffPatient-destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="Yoga Therapist"
              value=""
              onChange={null}
              placeholder="Placeholder"
              size="medium"
              margin="none"

            />
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 1</InputLabel>
              <Select color="primary" size="medium" label="Staff 1" name="yogaTherapist1" value={PatientStaffinputData.yogaTherapist[0]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Yoga Therapist" && i.id !== PatientStaffinputData.yogaTherapist[1] && i.id !== PatientStaffinputData.yogaTherapist[2] && i.id !== PatientStaffinputData.yogaTherapist[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 2</InputLabel>
              <Select color="primary" size="medium" label="Staff 2" name="yogaTherapist2" value={PatientStaffinputData.yogaTherapist[1]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Yoga Therapist" && i.id !== PatientStaffinputData.yogaTherapist[0] && i.id !== PatientStaffinputData.yogaTherapist[2] && i.id !== PatientStaffinputData.yogaTherapist[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 3</InputLabel>
              <Select color="primary" size="medium" label="Staff 3" name="yogaTherapist3" value={PatientStaffinputData.yogaTherapist[2]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Yoga Therapist" && i.id !== PatientStaffinputData.yogaTherapist[0] && i.id !== PatientStaffinputData.yogaTherapist[1] && i.id !== PatientStaffinputData.yogaTherapist[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 4</InputLabel>
              <Select color="primary" size="medium" label="Staff 4" name="yogaTherapist4" value={PatientStaffinputData.yogaTherapist[3]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Yoga Therapist" && i.id !== PatientStaffinputData.yogaTherapist[0] && i.id !== PatientStaffinputData.yogaTherapist[1] && i.id !== PatientStaffinputData.yogaTherapist[2]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
          </div>
          <div className="patientStaff-additional-input-row10">
            <TextField
              className="staffPatient-destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="Mental Health Workers"
              value=""
              onChange={null}
              placeholder="Placeholder"
              size="medium"
              margin="none"

            />
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 1</InputLabel>
              <Select color="primary" size="medium" label="Staff 1" name="mentalHealthWorkers1" value={PatientStaffinputData.mentalHealthWorkers[0]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Mental Health Workers" && i.id !== PatientStaffinputData.mentalHealthWorkers[1] && i.id !== PatientStaffinputData.mentalHealthWorkers[2] && i.id !== PatientStaffinputData.mentalHealthWorkers[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 2</InputLabel>
              <Select color="primary" size="medium" label="Staff 2" name="mentalHealthWorkers2" value={PatientStaffinputData.mentalHealthWorkers[1]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Mental Health Workers" && i.id !== PatientStaffinputData.mentalHealthWorkers[0] && i.id !== PatientStaffinputData.mentalHealthWorkers[2] && i.id !== PatientStaffinputData.mentalHealthWorkers[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 3</InputLabel>
              <Select color="primary" size="medium" label="Staff 3" name="mentalHealthWorkers3" value={PatientStaffinputData.mentalHealthWorkers[2]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Mental Health Workers" && i.id !== PatientStaffinputData.mentalHealthWorkers[0] && i.id !== PatientStaffinputData.mentalHealthWorkers[1] && i.id !== PatientStaffinputData.mentalHealthWorkers[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 4</InputLabel>
              <Select color="primary" size="medium" label="Staff 4" name="mentalHealthWorkers4" value={PatientStaffinputData.mentalHealthWorkers[3]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Mental Health Workers" && i.id !== PatientStaffinputData.mentalHealthWorkers[0] && i.id !== PatientStaffinputData.mentalHealthWorkers[1] && i.id !== PatientStaffinputData.mentalHealthWorkers[2]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
          </div>
          <div className="patientStaff-additional-input-row11">
            <TextField
              className="staffPatient-destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="Recipient Rights Officer"
              value=""
              onChange={null}
              placeholder="Placeholder"
              size="medium"
              margin="none"

            />
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 1</InputLabel>
              <Select color="primary" size="medium" label="Staff 1" name="rROfficer1" value={PatientStaffinputData.rROfficer[0]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Recipient Rights Officer" && i.id !== PatientStaffinputData.rROfficer[1] && i.id !== PatientStaffinputData.rROfficer[2] && i.id !== PatientStaffinputData.rROfficer[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 2</InputLabel>
              <Select color="primary" size="medium" label="Staff 2" name="rROfficer2" value={PatientStaffinputData.rROfficer[1]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Recipient Rights Officer" && i.id !== PatientStaffinputData.rROfficer[0] && i.id !== PatientStaffinputData.rROfficer[2] && i.id !== PatientStaffinputData.rROfficer[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 3</InputLabel>
              <Select color="primary" size="medium" label="Staff 3" name="rROfficer3" value={PatientStaffinputData.rROfficer[2]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Recipient Rights Officer" && i.id !== PatientStaffinputData.rROfficer[0] && i.id !== PatientStaffinputData.rROfficer[1] && i.id !== PatientStaffinputData.rROfficer[2]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 4</InputLabel>
              <Select color="primary" size="medium" label="Staff 4" name="rROfficer4" value={PatientStaffinputData.rROfficer[3]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Recipient Rights Officer" && i.id !== PatientStaffinputData.rROfficer[0] && i.id !== PatientStaffinputData.rROfficer[1] && i.id !== PatientStaffinputData.rROfficer[2]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
          </div>
          <div className="patientStaff-additional-input-row12">
            <TextField
              className="staffPatient-destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="Nurse Managers"
              value=""
              onChange={null}
              placeholder="Placeholder"
              size="medium"
              margin="none"

            />
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 1</InputLabel>
              <Select color="primary" size="medium" label="Staff 1" name="nurseManagers1" value={PatientStaffinputData.nurseManagers[0]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Nurse Managers" && i.id !== PatientStaffinputData.nurseManagers[1] && i.id !== PatientStaffinputData.nurseManagers[2] && i.id !== PatientStaffinputData.nurseManagers[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 2</InputLabel>
              <Select color="primary" size="medium" label="Staff 2" name="nurseManagers2" value={PatientStaffinputData.nurseManagers[1]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Nurse Managers" && i.id !== PatientStaffinputData.nurseManagers[0] && i.id !== PatientStaffinputData.nurseManagers[2] && i.id !== PatientStaffinputData.nurseManagers[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 3</InputLabel>
              <Select color="primary" size="medium" label="Staff 3" name="nurseManagers3" value={PatientStaffinputData.nurseManagers[2]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Nurse Managers" && i.id !== PatientStaffinputData.nurseManagers[0] && i.id !== PatientStaffinputData.nurseManagers[1] && i.id !== PatientStaffinputData.nurseManagers[2]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 4</InputLabel>
              <Select color="primary" size="medium" label="Staff 4" name="nurseManagers4" value={PatientStaffinputData.nurseManagers[3]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Nurse Managers" && i.id !== PatientStaffinputData.nurseManagers[0] && i.id !== PatientStaffinputData.nurseManagers[1] && i.id !== PatientStaffinputData.nurseManagers[2]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
          </div>
          <div className="patientStaff-additional-input-row13">
            <TextField
              className="staffPatient-destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="Director of Nursing"
              value=""
              onChange={null}
              placeholder="Placeholder"
              size="medium"
              margin="none"

            />
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 1</InputLabel>
              <Select color="primary" size="medium" label="Staff 1" name="dirOfNursing1" value={PatientStaffinputData.dirOfNursing[0]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Director of Nursing" && i.id !== PatientStaffinputData.dirOfNursing[1] && i.id !== PatientStaffinputData.dirOfNursing[2] && i.id !== PatientStaffinputData.dirOfNursing[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 2</InputLabel>
              <Select color="primary" size="medium" label="Staff 2" name="dirOfNursing2" value={PatientStaffinputData.dirOfNursing[1]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Director of Nursing" && i.id !== PatientStaffinputData.dirOfNursing[0] && i.id !== PatientStaffinputData.dirOfNursing[2] && i.id !== PatientStaffinputData.dirOfNursing[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 3</InputLabel>
              <Select color="primary" size="medium" label="Staff 3" name="dirOfNursing3" value={PatientStaffinputData.dirOfNursing[2]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Director of Nursing" && i.id !== PatientStaffinputData.dirOfNursing[0] && i.id !== PatientStaffinputData.dirOfNursing[1] && i.id !== PatientStaffinputData.dirOfNursing[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 4</InputLabel>
              <Select color="primary" size="medium" label="Staff 4" name="dirOfNursing4" value={PatientStaffinputData.dirOfNursing[3]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Director of Nursing" && i.id !== PatientStaffinputData.dirOfNursing[0] && i.id !== PatientStaffinputData.dirOfNursing[1] && i.id !== PatientStaffinputData.dirOfNursing[2]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
          </div>
          <div className="patientStaff-additional-input-row14">
            <TextField
              className="staffPatient-destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="Executives - such as CEO, Chief Nursing Officer"
              value=""
              onChange={null}
              placeholder="Placeholder"
              size="medium"
              margin="none"

            />
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 1</InputLabel>
              <Select color="primary" size="medium" label="Staff 1" name="executives1" value={PatientStaffinputData.executives[0]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Executives" && i.id !== PatientStaffinputData.executives[1] && i.id !== PatientStaffinputData.executives[2] && i.id !== PatientStaffinputData.executives[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 2</InputLabel>
              <Select color="primary" size="medium" label="Staff 2" name="executives2" value={PatientStaffinputData.executives[1]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Executives" && i.id !== PatientStaffinputData.executives[0] && i.id !== PatientStaffinputData.executives[2] && i.id !== PatientStaffinputData.executives[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 3</InputLabel>
              <Select color="primary" size="medium" label="Staff 3" name="executives3" value={PatientStaffinputData.executives[2]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Executives" && i.id !== PatientStaffinputData.executives[0] && i.id !== PatientStaffinputData.executives[1] && i.id !== PatientStaffinputData.executives[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 4</InputLabel>
              <Select color="primary" size="medium" label="Staff 4" name="executives4" value={PatientStaffinputData.executives[3]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Executives" && i.id !== PatientStaffinputData.executives[0] && i.id !== PatientStaffinputData.executives[1] && i.id !== PatientStaffinputData.executives[2]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
          </div>
          <div className="patientStaff-additional-input-row15">
            <TextField
              className="staffPatient-destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="Human Resources"
              value=""
              onChange={null}
              placeholder="Placeholder"
              size="medium"
              margin="none"

            />
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 1</InputLabel>
              <Select color="primary" size="medium" label="Staff 1" name="hr1" value={PatientStaffinputData.hr[0]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Human Resources" && i.id !== PatientStaffinputData.hr[1] && i.id !== PatientStaffinputData.hr[2] && i.id !== PatientStaffinputData.hr[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 2</InputLabel>
              <Select color="primary" size="medium" label="Staff 2" name="hr2" value={PatientStaffinputData.hr[1]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Human Resources" && i.id !== PatientStaffinputData.hr[0] && i.id !== PatientStaffinputData.hr[2] && i.id !== PatientStaffinputData.hr[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 3</InputLabel>
              <Select color="primary" size="medium" label="Staff 3" name="hr3" value={PatientStaffinputData.hr[2]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Human Resources" && i.id !== PatientStaffinputData.hr[0] && i.id !== PatientStaffinputData.hr[1] && i.id !== PatientStaffinputData.hr[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 4</InputLabel>
              <Select color="primary" size="medium" label="Staff 4" name="hr4" value={PatientStaffinputData.hr[3]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Human Resources" && i.id !== PatientStaffinputData.hr[0] && i.id !== PatientStaffinputData.hr[1] && i.id !== PatientStaffinputData.hr[2]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
          </div>
          <div className="patientStaff-additional-input-row16">
            <TextField
              className="staffPatient-destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="Quality and Risk Director"
              value=""
              onChange={null}
              placeholder="Placeholder"
              size="medium"
              margin="none"

            />
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 1</InputLabel>
              <Select color="primary" size="medium" label="Staff 1" name="qrdirector1" value={PatientStaffinputData.qrdirector[0]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Quality and Risk Director" && i.id !== PatientStaffinputData.qrdirector[1] && i.id !== PatientStaffinputData.qrdirector[2] && i.id !== PatientStaffinputData.qrdirector[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 2</InputLabel>
              <Select color="primary" size="medium" label="Staff 2" name="qrdirector2" value={PatientStaffinputData.qrdirector[1]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Quality and Risk Director" && i.id !== PatientStaffinputData.qrdirector[0] && i.id !== PatientStaffinputData.qrdirector[2] && i.id !== PatientStaffinputData.qrdirector[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 3</InputLabel>
              <Select color="primary" size="medium" label="Staff 3" name="qrdirector3" value={PatientStaffinputData.qrdirector[2]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Quality and Risk Director" && i.id !== PatientStaffinputData.qrdirector[0] && i.id !== PatientStaffinputData.qrdirector[1] && i.id !== PatientStaffinputData.qrdirector[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 4</InputLabel>
              <Select color="primary" size="medium" label="Staff 4" name="qrdirector4" value={PatientStaffinputData.qrdirector[3]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Quality and Risk Director" && i.id !== PatientStaffinputData.qrdirector[0] && i.id !== PatientStaffinputData.qrdirector[1] && i.id !== PatientStaffinputData.qrdirector[2]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
          </div>
          <div className="patientStaff-additional-input-row17">
            <TextField
              className="staffPatient-destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="Director of Health Information Management"
              value=""
              onChange={null}
              placeholder="Placeholder"
              size="medium"
              margin="none"

            />
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 1</InputLabel>
              <Select color="primary" size="medium" label="Staff 1" name="dirOfHIM1" value={PatientStaffinputData.dirOfHIM[0]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Director of Health Information Management" && i.id !== PatientStaffinputData.dirOfHIM[1] && i.id !== PatientStaffinputData.dirOfHIM[2] && i.id !== PatientStaffinputData.dirOfHIM[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 2</InputLabel>
              <Select color="primary" size="medium" label="Staff 2" name="dirOfHIM2" value={PatientStaffinputData.dirOfHIM[1]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Director of Health Information Management" && i.id !== PatientStaffinputData.dirOfHIM[0] && i.id !== PatientStaffinputData.dirOfHIM[2] && i.id !== PatientStaffinputData.dirOfHIM[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 3</InputLabel>
              <Select color="primary" size="medium" label="Staff 3" name="dirOfHIM3" value={PatientStaffinputData.dirOfHIM[2]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Director of Health Information Management" && i.id !== PatientStaffinputData.dirOfHIM[0] && i.id !== PatientStaffinputData.dirOfHIM[1] && i.id !== PatientStaffinputData.dirOfHIM[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 4</InputLabel>
              <Select color="primary" size="medium" label="Staff 4" name="dirOfHIM4" value={PatientStaffinputData.dirOfHIM[3]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Director of Health Information Management" && i.id !== PatientStaffinputData.dirOfHIM[0] && i.id !== PatientStaffinputData.dirOfHIM[1] && i.id !== PatientStaffinputData.dirOfHIM[2]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
          </div>
          <div className="patientStaff-additional-input-row18">
            <TextField
              className="staffPatient-destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label="Registered Dietitian"
              value=""
              onChange={null}
              placeholder="Placeholder"
              size="medium"
              margin="none"

            />
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 1</InputLabel>
              <Select color="primary" size="medium" label="Staff 1" name="regDietitian1" value={PatientStaffinputData.regDietitian[0]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Registered Dietitian" && i.id !== PatientStaffinputData.regDietitian[1] && i.id !== PatientStaffinputData.regDietitian[2] && i.id !== PatientStaffinputData.regDietitian[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 2</InputLabel>
              <Select color="primary" size="medium" label="Staff 2" name="regDietitian2" value={PatientStaffinputData.regDietitian[1]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Registered Dietitian" && i.id !== PatientStaffinputData.regDietitian[0] && i.id !== PatientStaffinputData.regDietitian[2] && i.id !== PatientStaffinputData.regDietitian[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 3</InputLabel>
              <Select color="primary" size="medium" label="Staff 3" name="regDietitian3" value={PatientStaffinputData.regDietitian[2]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Registered Dietitian" && i.id !== PatientStaffinputData.regDietitian[0] && i.id !== PatientStaffinputData.regDietitian[1] && i.id !== PatientStaffinputData.regDietitian[3]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="patientStaffName-input36" variant="outlined">
              <InputLabel color="primary">Staff 4</InputLabel>
              <Select color="primary" size="medium" label="Staff 4" name="regDietitian4" value={PatientStaffinputData.regDietitian[3]} onChange={handleInputChange}>
                <MenuItem value="">Select</MenuItem>
                {getStaffDataItems.filter(i => i.role === "Registered Dietitian" && i.id !== PatientStaffinputData.regDietitian[0] && i.id !== PatientStaffinputData.regDietitian[1] && i.id !== PatientStaffinputData.regDietitian[2]).map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
          </div>
          {/*
        <div className="patientStaff-additional-input-row18">
        <TextField       
              className="staffPatient-destination-name-input2"
              color="primary"
              variant="outlined"
              type="text"
              label=""
              value=""
              onChange={null}
              placeholder="Placeholder"
              size="medium"
              margin="none"
              
            />      
        <FormControl className="patientStaffName-input36" variant="outlined">
            <InputLabel color="primary">Staff 1</InputLabel>
            <Select color="primary" size="medium" label="Staff 1" name="regDietitian1" value={PatientStaffinputData.regDietitian1} onChange={handleInputChange}>
            <MenuItem value="Staff 1">Staff 1</MenuItem>
            </Select>
            <FormHelperText />
          </FormControl>
          <FormControl className="patientStaffName-input36" variant="outlined">
            <InputLabel color="primary">Staff 2</InputLabel>
            <Select color="primary" size="medium" label="Staff 2" name="regDietitian2" value={PatientStaffinputData.regDietitian2} onChange={handleInputChange}>
            <MenuItem value="Staff 1">Staff 2</MenuItem>
            </Select>
            <FormHelperText />
          </FormControl>
          <FormControl className="patientStaffName-input36" variant="outlined">
            <InputLabel color="primary">Staff 3</InputLabel>
            <Select color="primary" size="medium" label="Staff 3" name="regDietitian3" value={PatientStaffinputData.regDietitian3} onChange={handleInputChange}>
            <MenuItem value="Staff 1">Staff 3</MenuItem>
            </Select>
            <FormHelperText />
          </FormControl>
          <FormControl className="patientStaffName-input36" variant="outlined">
            <InputLabel color="primary">Staff 4</InputLabel>
            <Select color="primary" size="medium" label="Staff 4" name="regDietitian4" value={PatientStaffinputData.regDietitian4} onChange={handleInputChange}>
            <MenuItem value="Staff 1">Staff 4</MenuItem>
            </Select>
            <FormHelperText />
          </FormControl>
        </div>
            */}

        </>)}
      {(patientStaffTab === 2 && <div>
        <div className="staffPatientForm-inputs-row" style={{position:'absolute',top:'180px'}}>
          <div className="staffPatient-inputs-row">
            <FormControl className="staffPatient-departure-field" variant="outlined">
              <InputLabel color="primary">Select Staff(s)</InputLabel>
              <Select color="primary" size="medium" label="Select Staff(s)" name="sid" value={StaffPatientData.sid[0]} onChange={handleStaffInputChange}>
                {getStaffDataItems.map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.name[0].given + " " + newData.name[0].family}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
          </div>
        </div>
        {/* <Component1
          avatar={avatar3Image}
          avatar2={avatar2Image}
          avatar2Icon={false}
          component1Position="absolute"
          component1Top="208px"
          component1Left="199px"
        /> */}
  <div id="removePaddingBottom" >
{(vendorList.map((addVendor, index) => (
                                index % 2 === 0 ? (<div key={index} className="staffPatient-fields11">
                                   <div id="inputMediumFormPadding" >
                                 <FormControl  style={{ width: "490px",left:"-10px",top:`${71 + (60 * index)-index * 20}px`}} className="staffPatient-destination-name-input2" variant="outlined">
            <InputLabel color="primary">Patient {index+1}</InputLabel>
            <Select color="primary" size="medium" label="Patient 7" name="Staffpid1" value={addVendor} onChange={(event) => handleVendorChange(index, event)}>
              <MenuItem value="">Select</MenuItem>
              {getPatientDataItems.map((newData, i) => {
                return (
                  <MenuItem key={i} value={newData.id}>{newData.basicDetails[0].name[0].given + " " + newData.basicDetails[0].name[0].family}</MenuItem>
                )
              })}
            </Select>
            <FormHelperText />
          </FormControl>
                </div >                                                                   
                <div className="staffPatient-destination-name-input2"></div>
          <div id="inputMediumFormPadding" >
          {vendorList.length !== 1 && index % 2 === 0 &&  (
            <a onClick={() => vendorList.length <=2 ?alert("Not to be reduced"):handleVendorRemove(index)} style={{ width: "fit-content",top:`${102 + (60 * index)-index * 20}px`,left:'550px' }}><Remove
            removePosition="absolute"
            removeTop={`${102 + (60 * index)-index * 20}px`}
            removeLeft="539px"
          /></a>                                            
          )}           
          </div>     
          <div id="inputMediumFormPadding">                         
          {vendorList.map((addVendor, index) => (    index % 2 === 0 &&                                           
                                                <a onClick={handleVendorAdd} style={{ width: "fit-content" }}><Add addPosition="absolute" addTop={`${102 + (60 * index)-index * 20}px`} addLeft="502px" /></a>
                                            ))}   
                                                </div>
        
          </div>
          ):  (<div key={index} className="staffPatient-fields11">
          <div id="inputMediumFormPadding" >
        <FormControl  style={{ width: "490px",left:'596px',top:`${71 + (60 * (index-1))-((index-1) * 20)}px`}} className="staffPatient-destination-name-input2" variant="outlined">
<InputLabel color="primary">Patient {index+1}</InputLabel>
<Select color="primary" size="medium" label="Patient 7" name="addVendor" value={addVendor} onChange={(event) => handleVendorChange(index, event)}>
<MenuItem value="">Select</MenuItem>
{getPatientDataItems.map((newData, i) => {
return (
<MenuItem key={i} value={newData.id}>{newData.basicDetails[0].name[0].given + " " + newData.basicDetails[0].name[0].family}</MenuItem>
)
})}
</Select>
<FormHelperText />
</FormControl>
</div >  <div className="staffPatient-destination-name-input2"></div>
          <div id="inputMediumFormPadding" >
          {vendorList.length !== 1 &&  index % 2 !== 0 && (
            <a onClick={() => vendorList.length <=2 ?alert("Not to be reduced"):handleVendorRemove(index)} style={{ width: "fit-content",top:`${71 + (60 * index)-index * 20}px`,left:'1146px' }}><Remove
            removePosition="absolute"
            removeTop={`${62 + (60 * index)-index * 20}px`}
            removeLeft="1146px"
          /></a>                                            
          )}           
          </div>     
          <div id="inputMediumFormPadding">                         
          {vendorList.map((addVendor, index) => (     index % 2 !== 0 &&                                       
                                                <a onClick={handleVendorAdd} style={{ width: "fit-content" }}><Add addPosition="absolute" addTop={`${62 + (60 * index)-index * 20}px`} addLeft="1109px" /></a>
                                            ))}   
                                                </div></div>))))} 
                                                
                                </div>
                              <div className="iconssearch-group" style={{position:'absolute',top:'120px',right:'190px'}}>
            <img className="iconssearch1" alt="" src={iconssearchImage} />
            <input className="search-products1" style={{lineHeight:'30px',width:'calc(100% - 0px)'}} type="text" placeholder="Search" />
          </div> 
        <div className="spAssignment1-primary-class">
          <div className="spAssignment1-cancel-parent1">
            <SecondaryButton
              label="Cancel"
              secondaryButtonCursor="pointer"
              onCancelContainerClick={onCancelContainerClick}
            />

            <PrimaryButton label="Save" primaryButtonCursor="pointer" onNextContainerClick={handleStaffClickChange} />
          </div>
        </div>
      </div>)}
    </div>

  );
};

const mapStateToProps = (state: any) => {
  const { getAllStaffData, getAllPatientData, getallpatientstaffData,assignpatientstaffData,assignstaffpatientData } = state;
  const { items } = state;
  return {
    getAllStaffData, items, getAllPatientData, getallpatientstaffData,assignpatientstaffData,assignstaffpatientData
  };
};
export default connect(mapStateToProps)(PatientStaffAssignment)
