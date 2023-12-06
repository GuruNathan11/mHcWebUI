

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
    Container,
    Grid,
    Paper,
    colors,
} from "@mui/material";
import "./PatientBedAssignment.css";
import { connect } from "react-redux";
import bottomImage from './../../../assets/images/mettler_images/bg.svg';
import BedAssignData from '../../../assets/data/BedAssignData.json';
import SecondaryButton from "../../../components/SecondaryButton";
import PrimaryButton from "../../../components/PrimaryButton";
import "../../../components/BottomFooter.css";
import { getBedAssignmentByOrgId } from "../../../store/actions/BedAssignment";
import { DialogTitle, DialogContent, DialogContentText } from "@mui/material";
import Dialog, { DialogProps } from '@mui/material/Dialog';
import ArrowForwardImage from './../../../assets/images/mettler_images/IoArrowForward.svg';
import { getAllStaff } from "../../../store/actions/Staff";
import { getAllPatient } from "../../../store/actions/Patient";
import { DateCalendar, DatePicker, LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { HttpLogin } from "../../../utils/Http";
import { createNewBedAssign} from "../../../store/actions/DynamicBedAssign";
import moment from "moment";
import loaddingFile from '../../../../src/assets/images/tenor.gif';

interface IDynamicBedAssignment { }
interface IDynamicBedAssignment {
    StaticPage: any;
    dispatch: Dispatch<any>;
    getBedAssignmentByOrgIdData: any;
    getAllStaffData:any;
    getAllPatientData: any;
    createDynamicBedAssignData: any;
    errorMessage: any;
    state: {
        nodes: [],
        checked: [],
        expanded: []
    }
}
const DynamicBedAssignment: React.FC<IDynamicBedAssignment> = ({
    dispatch, getBedAssignmentByOrgIdData, errorMessage, getAllStaffData, getAllPatientData, createDynamicBedAssignData


}) => {
    const [containerColors, setContainerColors] = useState({});
    let [displayBedAssignData, setDisplayBedAssignData] = useState([]);
    let [getStaffDataItems, setGetStaffDataItems] = useState(new Array<any>());  
    let [getPatientDataItems, setGetPatientDataItems] = useState(new Array<any>());   
    let [allGetPatientDataItems, setAllGetPatientDataItems] = useState(new Array<any>());    
    let [inputOrgData,setInputOrgData] = useState("");
    let [inputOrgId, setInputOrgId] = useState("");
    let [inputFormData, setInputFormData] = useState(BedAssignData);
    let [inputBedAllAssignData, setInputBedAllAssignData] = useState(new Array<any>());  
    let [patientOccupiedName, setPatientOccupiedName] = useState(null);
    let [assignedOccupiedName, setAssignedOccupiedName] = useState(null);
    let [admitOccupiedName, setAdmitOccupiedName] = useState(null);
    let [bedNumber, setBedNumber] = useState("");
    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
        setSpinner(true);
        var orgData = JSON.parse(window.localStorage.getItem("LOGINDATA"));
        orgData = orgData.loginInput.organization;   
       HttpLogin.axios().get("api/org/getById/"+orgData)
       .then((res) => {  
        if(res.data.message.code === "MHC - 0200"){      
            dispatch(getBedAssignmentByOrgId(res.data.data.id));
            setInputOrgId(res.data.data.id); 
          setInputOrgData(res.data.data.organizationdetails[0].name);
        }else{
          setInputOrgData("");
          setInputOrgId("");
        }       
    })
    HttpLogin.axios().get("/api/ByOccupiedBed")
    .then((res) => {  
     if(res.data.message.code === "MHC - 0200"){   
      
        setInputBedAllAssignData(res.data.data);
        setSpinner(false);
     }else{
        setInputBedAllAssignData([]);
     }
    })

     
        dispatch(getAllStaff());
        dispatch(getAllPatient());
    }, []);
   
    const [isPatientPageLoaded, setPatientPageLoaded] = useState(false);

if (!isPatientPageLoaded && !getAllPatientData.isLoading) { 
  if(getAllPatientData.items.message.code === "MHC - 0200"){
    var newPatientInputData = getAllPatientData.items.data.filter(t=>t.organization === inputOrgData);  
    setAllGetPatientDataItems(newPatientInputData);
    newPatientInputData = newPatientInputData.filter(val => !(inputBedAllAssignData.map(k=>{return k.pid})).includes(val.id))
    // console.log(JSON.stringify(newPatientInputData.filter(val => !(inputBedAllAssignData.map(k=>{return k.pid})).includes(val.id)))) 
    // console.log(JSON.stringify(newPatientInputData))
    setGetPatientDataItems(newPatientInputData);   
  }else{
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

    const [isStaffPageLoaded, setStaffPageLoaded] = useState(false);

    if (!isStaffPageLoaded && !getAllStaffData.isLoading) {   
     //  console.log(JSON.stringify(getAllStaffData.items))
      if(getAllStaffData.items.message.code === "MHC - 0200"){
        setGetStaffDataItems(getAllStaffData.items.data.filter(t=>t.organization === inputOrgData));
      }else{
        setGetStaffDataItems([]);
        alert(getAllStaffData.items.message.description);
      } 
      setStaffPageLoaded(true)
    }
    if (!getAllStaffData && getAllStaffData.isFormSubmit) {
    
      setTimeout(() => {
        setStaffPageLoaded(false);
    
      }, (1000));
    }
    
    let [inputBedId, setInputBedId] = useState("");
    const [isPageLoaded, setPageLoaded] = useState(false);

    if (!isPageLoaded && !getBedAssignmentByOrgIdData.isLoading) {
        //console.log(JSON.stringify(getBedAssignmentByOrgIdData.items));
        if (getBedAssignmentByOrgIdData.items.data != undefined) {
          //  console.log(JSON.stringify(getBedAssignmentByOrgIdData.items.data.filter(t=>t.organization === inputOrgId)));
            setDisplayBedAssignData(getBedAssignmentByOrgIdData.items.data.filter(t=>t.organization === inputOrgId));
            setSpinner(false);
        }
        setPageLoaded(true)
    }
    if (!getBedAssignmentByOrgIdData && getBedAssignmentByOrgIdData.isFormSubmit) {

        setTimeout(() => {
            setPageLoaded(false);

        }, (1000));
    }

    const [bedAllocateDialog,setBedAllocateDialog] = useState(false);
    const [bedOccupiedDialog,setBedOccupiedDialog] = useState(false);
    
    const handleContainerClick = (containerId,bedId,newString) => {
        if(newString === "Yes"){
            console.log(JSON.stringify(containerId));
            setBedOccupiedDialog(true);
            var newOccupiedData = inputBedAllAssignData !== undefined && inputBedAllAssignData !== null && inputBedAllAssignData.length>0 ? inputBedAllAssignData.filter(i=>i.bedId === bedId).map(k=>{return k}) : [];        
            let newOccupiedData1 = allGetPatientDataItems.filter(object1 => {
                return newOccupiedData.some(object2 => {
                  return object1.id === object2.pid;
                });
              });
              newOccupiedData1 = newOccupiedData1.map(newData=>{return newData.basicDetails[0].name[0].given+" "+newData.basicDetails[0].name[0].family})
              setPatientOccupiedName(newOccupiedData1[0]);
              let newOccupiedData2 = getStaffDataItems.filter(object1 => {
                return newOccupiedData.some(object2 => {
                  return object1.id === object2.assignedBy;
                });
              });
              newOccupiedData2 = newOccupiedData2.map(newData=>{return newData.name[0].given+" "+newData.name[0].family});
              setAssignedOccupiedName(newOccupiedData2);
              var newAdmitDate = moment(newOccupiedData[0].admitDate).format("MMM DD,YYYY");
              setAdmitOccupiedName(newAdmitDate);
              setBedNumber(containerId);
               //console.log(JSON.stringify(newOccupiedData1.map(newData=>{return newData.basicDetails[0].name[0].given+" "+newData.basicDetails[0].name[0].family})));
           // console.log(JSON.stringify(allGetPatientDataItems.filter(i=>i.id === alterOccupiedData)));
        }else{
            setContainerColors((prevColors) => {
              //  console.log(JSON.stringify(newString));
                const newColors = { ...prevColors };
                if (newColors[containerId] === '#01CDFF') {
                    delete newColors[containerId];
                } else {
                    newColors[containerId] = '#01CDFF';
                }
                setInputBedId(bedId);
                setBedAllocateDialog(true);
                return newColors;
            });
        }        
    };

    let patientList = getPatientDataItems !== null && getPatientDataItems.length>0 && getPatientDataItems.map((newData,i) =>{
        return (
          <MenuItem key={i} value={newData.id}>{newData.basicDetails[0].name[0].given+" "+newData.basicDetails[0].name[0].family}</MenuItem>
        )
      }) 


    let staffList = getStaffDataItems !== null && getStaffDataItems.length>0 && getStaffDataItems.map((newData,i) =>{
        return (
          <MenuItem key={i} value={newData.id}>{newData.name[0].given+" "+newData.name[0].family}</MenuItem>
        )
      })


      const handleInputChange = (event) =>{
        if(event.target.name === "pid"){
            inputFormData.pid = event.target.value;
        }  if(event.target.name === "assignedBy"){
            inputFormData.assignedBy = event.target.value;
        }
        setInputFormData({...inputFormData});
      }

      
      const handleCancelChange = () =>{
        inputFormData.admitDate = null;
        inputFormData.assignedBy = "";
        inputFormData.pid = "";
        setInputFormData({...inputFormData});
        setBedAllocateDialog(false);
      }

      const [isBedAssignPageLoaded, setBedAssignPageLoaded] = useState(false);

      if(!isBedAssignPageLoaded && !createDynamicBedAssignData.isLoading){
        createDynamicBedAssignData.items.data.admitDate = createDynamicBedAssignData.items.data.admitDate !== "Invalid date" && createDynamicBedAssignData.items.data.admitDate !== null && createDynamicBedAssignData.items.data.admitDate !== "" ? new Date(moment(createDynamicBedAssignData.items.data.admitDate,("YYYY-MM-DD"?"YYYY-MM-DD":"YYYYMMDD")).format("YYYY-MM-DDTHH:mm:ss.000Z")): null;
        setInputFormData(createDynamicBedAssignData.items.data);
        if (createDynamicBedAssignData.items.message.code === "MHC - 0200") {
            alert(createDynamicBedAssignData.items.message.description);  
            setTimeout(() => {  
                window.location.reload();
              setSpinner(false);
            }, (1000));   
            setBedAssignPageLoaded(true);    
          } else {
            alert(createDynamicBedAssignData.items.message.description);   
            setTimeout(() => {
                 
                setBedAssignPageLoaded(false);
              setSpinner(false);
            }, (1000));
          }
        
      }
      if (!createDynamicBedAssignData && createDynamicBedAssignData.isFormSubmit) {
      
          setTimeout(() => {
                
            setBedAssignPageLoaded(false);
            setSpinner(false);
          }, (1000));
      }


      const handlePageSave = () =>{
        inputFormData.bedId = inputBedId;
        inputFormData.admitDate = inputFormData.admitDate !== null && inputFormData.admitDate !== "" ? moment(inputFormData.admitDate).format('YYYYMMDD'): null;
        setInputFormData({...inputFormData});  
        setSpinner(true);    
       // console.log(JSON.stringify(inputFormData));
        if(inputFormData.admitDate === null || inputFormData.admitDate === "" || inputFormData.assignedBy === "" || inputFormData.pid === ""){
            alert("Please Fill All the Data");
        }else if(inputBedId === ""){
            alert("Bed was not created properly");
        }else{         
            dispatch(createNewBedAssign(inputFormData));  
            setBedAllocateDialog(false);         
        }        
      }
      
    const handleBedMasterLink = () => {
        window.location.href = "/MettlerBedMasterConfiguration";
    }

    const handleClose = () => {       
        setBedAllocateDialog(false);
      }

      const handleOccupiedClose = () => {
        setBedOccupiedDialog(false);
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
        <div className="bed-details" style={{ height: "1089px" }}>
            <div className="bed-details-child" />

            <div className="bedline-div" />
            <div className="bedexpand-more-24px-parent">
                <img
                    className="bedexpand-more-24px-icon"
                    alt=""
                    src="/expand-more-24px.svg"
                />
                <div className="beddetails">Select Bed</div>
                <div className="beddetailsAvaliables">
                    <div className="Available">
                        <Container className="bed" style={{ backgroundColor: "white", border: '1px solid #C4C5D3' }}>
                            <span style={{ width:"5px", borderRadius: "20px", backgroundColor: "white", border:"1px solid #C4C5D3", marginLeft: "-20px", marginTop: "2px", marginBottom: "2px" }}></span>
                        </Container>
                        <div className="bed">Available</div>
                    </div>
                    <div className="Selected">
                        <Container className="bed-1" style={{ backgroundColor: "#01CDFF" }}>
                            <span style={{  borderRadius: "20px", backgroundColor: "white", border: "1px solid white", marginLeft: "-20px", marginTop: "3px", marginBottom: "3px" }}></span>
                        </Container>
                        <div className="bed-1">Selected</div>
                    </div>
                    <div className="Unavaliable">
                        <Container className="bed-0" style={{ backgroundColor: "#DCDFEB", border: "1px solid #B4B5D1" }}>
                            <span style={{  width:"5px",borderRadius: "20px", backgroundColor: "#FFFFFF", border: "1px solid #B4B5D1", marginLeft: "-20px", marginTop: "3px", marginBottom: "3px" }} ></span>
                        </Container>
                        <div className="bed-0">Unavaliable</div>
                    </div>
                    <div className="LadyPatient">
                        <Container className="bed-3" style={{ backgroundColor: "#F5E7F5", border: "1px solid #CDB3CD" }}>
                            <span style={{  width:"5px",borderRadius: "20px", backgroundColor: "#FFFFFF", border: "1px solid #CDB3CD", marginLeft: "-20px", marginTop: "3px", marginBottom: "3px" }} ></span>
                        </Container>
                        <div className="bed-3">Lady Patient</div>
                    </div>
                    <div className="ForLadies">
                        <Container className="bed-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #CEA5CE" }}>
                            <span style={{  width:"5px",borderRadius: "20px", backgroundColor: "#FFFFFF", border: "1px solid #CEA5CE", marginLeft: "-20px", marginTop: "3px", marginBottom: "3px" }}></span>
                        </Container>
                        <div className="bed-4">For Ladies</div>
                    </div>
                    <div className="ForLadies-1">
                        <Container className="bed-5" style={{ backgroundColor: "#FFFFFF", border: "1px solid #6293DB" }}>
                            <span style={{  width:"5px",borderRadius: "20px", backgroundColor: "#FFFFFF", border: "1px solid #6293DB", marginLeft: "-20px", marginTop: "3px", marginBottom: "3px" }}></span>
                        </Container>
                        <div className="bed-5">For Ladies</div>
                    </div>
                </div>
            </div>
            <div className="container" style={{position:'relative',left:'45px'}}>
                <div className="container-1">
                <div className="generalpart-1">
                        {displayBedAssignData.filter(i => i.side === "5" && i.position === "1" && ((i.bedType === "1" || i.bedType === "3") || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "5" && i.position === "1" && ((i.bedType === "1" || i.bedType === "3") || i.bedType === "3")).map(k => (
                            <div style={{ borderRadius: '7px', width: '48px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="general-1">
                                <div className="generalBed-1" style={{ position: "relative", left: "-10px" }}>
                                    <Container
                                        onClick={() => handleContainerClick(k.roomNo + '-01',k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                        style={{ transform: "rotate(-90deg)", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>)) : displayBedAssignData.filter(i => (i.side === "5") && i.position === "1" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "5") && i.position === "1" && i.bedType === "2").map(k => (
                                <div className="general-1">
                                    <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ transform: "rotate(-90deg)", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                        <span style={{ background: "#fff", position: "absolute", top: "16px", width: "2px", height: "85px", left: "58px", color: "#fff" }}><span>a</span></span>
                                    </div>
                                </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="general-1">
                            <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                <Container
                                    style={{ transform: "rotate(-90deg)", borderRadius: "4px", width: "90px", marginTop: "40px", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                    <span>
                                        <div className="No401-01">
                                            <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                            </div>
                                        </div>
                                    </span></Container>
                            </div>
                        </div>}
                        {displayBedAssignData.filter(i => i.side === "6" && i.position === "1" && ((i.bedType === "1" || i.bedType === "3") || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "6" && i.position === "1" && ((i.bedType === "1" || i.bedType === "3") || i.bedType === "3")).map(k => (
                            <div style={{ borderRadius: '7px', width: '48px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="general-10">
                                <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                    <Container
                                        onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                        style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-12px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No401-02">{k.roomNo+" - "+k.bedNo}
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>)) : displayBedAssignData.filter(i => (i.side === "6") && i.position === "1" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "6") && i.position === "1" && i.bedType === "2").map(k => (
                                <div className="general-10">
                                    <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No401-02">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="general-10">
                            <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                <Container
                                    style={{ transform: "rotate(-90deg)", borderRadius: "4px", width: "90px", marginTop: "40px", marginLeft: "-12px", marginRight: "", height: "35px" }}>
                                    <span>
                                        <div className="No401-02">
                                            <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                            </div>
                                        </div>
                                    </span></Container>
                            </div>
                        </div>}
                        {displayBedAssignData.filter(i => i.side === "5" && i.position === "2" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "5" && i.position === "2" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                            <div style={{ borderRadius: '7px', width: '48px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="general-2">
                                <div className="generalBed-1" style={{ position: "relative", left: "-10px" }}>
                                    <Container
                                        onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                        style={{ transform: "rotate(-90deg)", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>)) : displayBedAssignData.filter(i => (i.side === "5") && i.position === "2" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "5") && i.position === "2" && i.bedType === "2").map(k => (
                                <div className="general-2">
                                    <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ transform: "rotate(-90deg)", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                    <span style={{ background: "#fff", position: "absolute", top: "16px", width: "2px", height: "85px", left: "49px", color: "#fff" }}><span>a</span></span>

                                </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="general-2">
                            <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                <Container
                                    style={{ transform: "rotate(-90deg)", borderRadius: "4px", width: "90px", marginTop: "40px", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                    <span>
                                        <div className="No401-01">
                                            <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                            </div>
                                        </div>
                                    </span></Container>
                            </div>

                        </div>}
                        {displayBedAssignData.filter(i => i.side === "6" && i.position === "2" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "6" && i.position === "2" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                            <div style={{ borderRadius: '7px', width: '48px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="general-20">
                                <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                    <Container
                                        onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                        style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>

                            </div>)) : displayBedAssignData.filter(i => (i.side === "6") && i.position === "2" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "6") && i.position === "2" && i.bedType === "2").map(k => (
                                <div className="general-20">
                                    <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>

                                </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="general-20">
                            <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                <Container                                     
                                    style={{ transform: "rotate(-90deg)", borderRadius: "4px", width: "90px", marginTop: "40px", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                    <span>
                                        <div className="No401-01">
                                            <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                            </div>
                                        </div>
                                    </span></Container>
                            </div>

                        </div>}
                        {displayBedAssignData.filter(i => i.side === "5" && i.position === "3" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "5" && i.position === "3" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                            <div style={{ borderRadius: '7px', width: '48px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="general-3">
                                <div className="generalBed-1" style={{ position: "relative", left: "-10px" }}>
                                    <Container
                                        onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                        style={{ transform: "rotate(-90deg)", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>

                            </div>)) : displayBedAssignData.filter(i => (i.side === "5") && i.position === "3" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "5") && i.position === "3" && i.bedType === "2").map(k => (
                                <div className="general-3">
                                    <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ transform: "rotate(-90deg)", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                    <span style={{ background: "#fff", position: "absolute", top: "16px", width: "2px", height: "85px", left: "49px", color: "#fff" }}><span>a</span></span>

                                </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="general-3">
                            <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                <Container
                                    style={{ transform: "rotate(-90deg)", borderRadius: "4px", width: "90px", marginTop: "40px", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                    <span>
                                        <div className="No401-01">
                                            <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                            </div>
                                        </div>
                                    </span></Container>
                            </div>
                        </div>}
                        {displayBedAssignData.filter(i => i.side === "6" && i.position === "3" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "6" && i.position === "3" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                            <div style={{ borderRadius: '7px', width: '48px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="general-30">
                                <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                    <Container
                                        onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                        style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>)) : displayBedAssignData.filter(i => (i.side === "6") && i.position === "3" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "6") && i.position === "3" && i.bedType === "2").map(k => (
                                <div className="general-30">
                                    <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="general-30">
                            <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                <Container
                                    style={{ transform: "rotate(-90deg)", borderRadius: "4px", width: "90px", marginTop: "40px", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                    <span>
                                        <div className="No401-01">
                                            <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                            </div>
                                        </div>
                                    </span></Container>
                            </div>
                        </div>}
                        {displayBedAssignData.filter(i => i.side === "5" && i.position === "4" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "5" && i.position === "4" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                            <div style={{ borderRadius: '7px', width: '48px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="general-4">
                                <div className="generalBed-1" style={{ position: "relative", left: "-10px" }}>
                                    <Container
                                        onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                        style={{ transform: "rotate(-90deg)", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>)) : displayBedAssignData.filter(i => (i.side === "5") && i.position === "4" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "5") && i.position === "4" && i.bedType === "2").map(k => (
                                <div className="general-4">
                                    <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ transform: "rotate(-90deg)", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                    <span style={{ background: "#fff", position: "absolute", top: "16px", width: "2px", height: "85px", left: "49px", color: "#fff" }}><span>a</span></span>

                                </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="general-4">
                            <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                <Container
                                    style={{ transform: "rotate(-90deg)", borderRadius: "4px", width: "90px", marginTop: "40px", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                    <span>
                                        <div className="No401-01">
                                            <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                            </div>
                                        </div>
                                    </span></Container>
                            </div>

                        </div>}
                        {displayBedAssignData.filter(i => i.side === "6" && i.position === "4" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "6" && i.position === "4" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                            <div style={{ borderRadius: '7px', width: '48px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="general-40">
                                <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                    <Container
                                        onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                        style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-12px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>)) : displayBedAssignData.filter(i => (i.side === "6") && i.position === "4" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "6") && i.position === "4" && i.bedType === "2").map(k => (
                                <div className="general-40">
                                    <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="general-40">
                            <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                <Container
                                    style={{ transform: "rotate(-90deg)", borderRadius: "4px", width: "90px", marginTop: "40px", marginLeft: "-12px", marginRight: "", height: "35px" }}>
                                    <span>
                                        <div className="No401-01">
                                            <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                            </div>
                                        </div>
                                    </span></Container>
                            </div>
                        </div>}
                        {displayBedAssignData.filter(i => i.side === "5" && i.position === "5" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "5" && i.position === "5" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                            <div style={{ borderRadius: '7px', width: '48px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="general-5">
                                <div className="generalBed-1" style={{ position: "relative", left: "-10px" }}>
                                    <Container
                                        onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                        style={{ transform: "rotate(-90deg)", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>)) : displayBedAssignData.filter(i => (i.side === "5") && i.position === "5" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "5") && i.position === "5" && i.bedType === "2").map(k => (
                                <div className="general-5">
                                    <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ transform: "rotate(-90deg)", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                    <span style={{ background: "#fff", position: "absolute", top: "16px", width: "2px", height: "85px", left: "49px", color: "#fff" }}><span>a</span></span>
                                </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="general-5">
                            <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                <Container
                                    style={{ transform: "rotate(-90deg)", borderRadius: "4px", width: "90px", marginTop: "40px", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                    <span>
                                        <div className="No401-01">
                                            <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                            </div>
                                        </div>
                                    </span></Container>
                            </div>
                        </div>}
                        {displayBedAssignData.filter(i => i.side === "6" && i.position === "5" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "6" && i.position === "5" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                            <div style={{ borderRadius: '7px', width: '48px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="general-50">
                                <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                    <Container
                                        onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                        style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>

                            </div>)) : displayBedAssignData.filter(i => (i.side === "6") && i.position === "5" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "6") && i.position === "5" && i.bedType === "2").map(k => (
                                <div className="general-50">
                                    <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>

                                </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="general-50">
                            <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                <Container
                                    style={{ transform: "rotate(-90deg)", borderRadius: "4px", width: "90px", marginTop: "40px", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                    <span>
                                        <div className="No401-01">
                                            <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                            </div>
                                        </div>
                                    </span></Container>
                            </div>

                        </div>}
                        {displayBedAssignData.filter(i => i.side === "5" && i.position === "6" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "5" && i.position === "6" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                     <div style={{ borderRadius: '7px', width: '48px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="general-6" >
                                     <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                         <Container
                                        onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                             style={{ transform: "rotate(-90deg)", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                             <span>
                                                 <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                     <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                     </div>
                                                 </div>
                                             </span></Container>
                                     </div>                                        

                                 </div>)) : displayBedAssignData.filter(i => (i.side === "5") && i.position === "6" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "5") && i.position === "6" && i.bedType === "2").map(k => (
                                         <div className="general-6" >
                                         <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                             <Container
                                               onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                 style={{ transform: "rotate(-90deg)", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                                 <span>
                                                     <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                         <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                         </div>
                                                     </div>
                                                 </span></Container>
                                         </div>
                                         <span style={{ background: "#fff", position: "absolute", top: "16px", width: "2px", height: "85px", left: "49px", color: "#fff" }}><span>a</span></span>
 
                                     </div>)) :  <div style={{ background: 'var(--color-gray-100)' }} className="general-6" >
                                    <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                        <Container                                    
                                            style={{ transform: "rotate(-90deg)", width: "90px", marginTop: "40px", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No401-01">
                                                    <div style={{  marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>                                      

                                </div>}       
                                {displayBedAssignData.filter(i => i.side === "6" && i.position === "6" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "6" && i.position === "6" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                   <div style={{ borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="general-60">
                                   <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                       <Container
                                          onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                           style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                           <span>
                                               <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                   <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                   </div>
                                               </div>
                                           </span></Container>
                                   </div>

                               </div>)) : displayBedAssignData.filter(i => (i.side === "6") && i.position === "6" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "6") && i.position === "6" && i.bedType === "2").map(k => (
                                        <div className="general-60">
                                        <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>

                                    </div>)) :  <div style={{ background: 'var(--color-gray-100)' }} className="general-60">
                                    <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                        <Container                                               
                                            style={{ transform: "rotate(-90deg)" ,borderRadius: "4px", width: "90px", marginTop: "40px", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No401-01">
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>

                                </div>}     
                                {displayBedAssignData.filter(i => i.side === "5" && i.position === "7" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "5" && i.position === "7" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                <div className="general-7" style={{ borderRadius: '7px', width: '48px', border: k.bedType === "3" ? "1px solid palevioletred" : "" ,top:'908px'}}>
                                <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                    <Container
                                          onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                        style={{ transform: "rotate(-90deg)", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>                                    

                            </div>)) : displayBedAssignData.filter(i => (i.side === "5") && i.position === "7" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "5") && i.position === "7" && i.bedType === "2").map(k => (
                                         <div className="general-7" style={{ top: "908px" }}>
                                         <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                             <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                 style={{ transform: "rotate(-90deg)", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                                 <span>
                                                     <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                         <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                         </div>
                                                     </div>
                                                 </span></Container>
                                         </div>
                                         <span style={{ background: "#fff", position: "absolute", top: "16px", width: "2px", height: "85px", left: "49px", color: "#fff" }}><span>a</span></span>
 
                                     </div>)) :   <div className="general-7" style={{ top: "908px",background: 'var(--color-gray-100)' }}>
                                    <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                        <Container                                             
                                            style={{ transform: "rotate(-90deg)", width: "90px", marginTop: "40px", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No401-01">
                                                    <div style={{ marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>                                    

                                </div>}  
                                {displayBedAssignData.filter(i => i.side === "6" && i.position === "7" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "6" && i.position === "7" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                  <div className="general-70" style={{ borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "",top: "" }}>
                                  <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                      <Container
                                               onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                          style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                          <span>
                                              <div className="No401-01">{k.roomNO}-01
                                                  <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                  </div>
                                              </div>
                                          </span></Container>
                                  </div>

                              </div>)) : displayBedAssignData.filter(i => (i.side === "6") && i.position === "7" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "6") && i.position === "7" && i.bedType === "2").map(k => (
                                      <div className="general-70" style={{ top: "" }}>
                                      <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                          <Container
                                              onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                              style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                              <span>
                                                  <div className="No401-01">{k.roomNO}-02
                                                      <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                      </div>
                                                  </div>
                                              </span></Container>
                                      </div>

                                  </div>)) :   <div className="general-70" style={{ top: "", background: 'var(--color-gray-100)' }}>
                                    <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                        <Container                                                
                                            style={{ transform: "rotate(-90deg)", width: "90px", marginTop: "40px", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No401-01">
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>

                                </div>}       
                    </div>
                    <div className="semiprivatecontainer">
                    <div className="semiPrivate">
                            {displayBedAssignData.filter(i => i.side === "1" && i.position === "1" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "1" && i.position === "1" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                <div style={{ height: '73px', borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="semiPrivatecontaine0-1">
                                    <div className="semiPrivatebed-1">
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}

                                            style={{ width: "110px", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-01'] || '#FFFFFF', marginLeft: "15px", marginRight: "15px", height: "35px" }}>
                                            <span>
                                                <div className="No101-01">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-12px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>)) : displayBedAssignData.filter(i => (i.side === "1") && i.position === "1" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "1") && i.position === "1" && i.bedType === "2").map(k => (
                                    <div className="semiPrivatecontaine0-1">
                                        <div className="semiPrivatebed-1">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}

                                                style={{ width: "110px", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "15px", marginRight: "15px", height: "35px" }}>
                                                <span>
                                                    <div className="No101-01">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-12px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                        <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", marginLeft: "14px", marginRight: "14px", marginTop: "3px", marginBottom: "0px", height: "5px" }}>
                                            <span></span></span>
                                    </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatecontaine0-1">
                                <div className="semiPrivatebed-1">
                                    <Container
                                        style={{ width: "110px", borderRadius: "4px", marginTop: "18px", marginLeft: "15px", marginRight: "15px", height: "35px" }}>
                                        <span>
                                            <div className="No101-01">
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-12px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>}
                            {displayBedAssignData.filter(i => i.side === "2" && i.position === "1" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "2" && i.position === "1" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                <div style={{ borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="semiPrivatecontaine0-10">
                                    <div className="semiPrivatebed-1">
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "15px", marginRight: "15px", height: "35px" }}>
                                            <span>
                                                <div className="No101-02">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>)) : displayBedAssignData.filter(i => (i.side === "2") && i.position === "1" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "2") && i.position === "1" && i.bedType === "2").map(k => (
                                    <div className="semiPrivatecontaine0-10">
                                        <div className="semiPrivatebed-1">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", marginTop: "22px", backgroundColor: containerColors['101-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "15px", marginRight: "15px", height: "35px" }}>
                                                <span>
                                                    <div className="No101-02">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-12px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                    </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatecontaine0-10">
                                <div className="semiPrivatebed-1">
                                    <Container
                                        style={{ borderRadius: "4px", marginTop: "22px", marginLeft: "15px", marginRight: "15px", height: "35px" }}>
                                        <span>
                                            <div className="No101-02">
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>}
                            {displayBedAssignData.filter(i => i.side === "1" && i.position === "2" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "1" && i.position === "2" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                <div style={{ height: '73px', borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="semiPrivatecontaine0-2">
                                    <div className="semiPrivatebed-2">
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-01">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>)) : displayBedAssignData.filter(i => (i.side === "1") && i.position === "2" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "1") && i.position === "2" && i.bedType === "2").map(k => (
                                    <div className="semiPrivatecontaine0-2">
                                        <div className="semiPrivatebed-2">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "17px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No101-01">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                        <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", marginLeft: "14px", marginRight: "14px", marginTop: "24px", marginBottom: "0px", height: "5px" }}>
                                            <span></span></span>
                                    </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatecontaine0-2">
                                <div className="semiPrivatebed-2">
                                    <Container
                                        style={{ borderRadius: "4px", width: "90px", marginTop: "17px", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No101-01">
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>}
                            {displayBedAssignData.filter(i => i.side === "2" && i.position === "2" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "2" && i.position === "2" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                <div style={{ borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="semiPrivatecontaine0-20">

                                    <div className="semiPrivatebed-2">
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "21px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-02">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>)) : displayBedAssignData.filter(i => (i.side === "2") && i.position === "2" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "2") && i.position === "2" && i.bedType === "2").map(k => (
                                    <div className="semiPrivatecontaine0-20">

                                        <div className="semiPrivatebed-2">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "21px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No101-02">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-12px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                    </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatecontaine0-20">

                                <div className="semiPrivatebed-2">
                                    <Container
                                        style={{ borderRadius: "4px", width: "90px", marginTop: "21px", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No101-02">
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>}
                            {displayBedAssignData.filter(i => i.side === "1" && i.position === "3" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "1" && i.position === "3" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                <div style={{ height: '73px', borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="semiPrivatecontaine0-3">
                                    <div className="semiPrivatebed-3">
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ border: "1px solid #CEA5CE", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-01">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>)) : displayBedAssignData.filter(i => (i.side === "1") && i.position === "3" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "1") && i.position === "3" && i.bedType === "2").map(k => (
                                    <div className="semiPrivatecontaine0-3">
                                        <div className="semiPrivatebed-3">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ border: "1px solid #CEA5CE", borderRadius: "4px", width: "90px", marginTop: "17px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No101-01">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                        <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", marginLeft: "14px", marginRight: "14px", marginTop: "24px", marginBottom: "0px", height: "5px" }}>
                                            <span></span></span>
                                    </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatecontaine0-3">
                                <div className="semiPrivatebed-3">
                                    <Container
                                        style={{ borderRadius: "4px", width: "90px", marginTop: "17px", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No101-01">
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>}
                            {displayBedAssignData.filter(i => i.side === "2" && i.position === "3" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "2" && i.position === "3" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                <div style={{ borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="semiPrivatecontaine0-30">
                                    <div className="semiPrivatebed-3">
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ border: "1px solid #CDB3CD", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-02">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>)) : displayBedAssignData.filter(i => (i.side === "2") && i.position === "3" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "2") && i.position === "3" && i.bedType === "2").map(k => (
                                    <div className="semiPrivatecontaine0-30">
                                        <div className="semiPrivatebed-3">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ border: "1px solid #CDB3CD", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No101-02">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-12px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                    </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatecontaine0-30">
                                <div className="semiPrivatebed-3">
                                    <Container
                                        style={{ borderRadius: "4px", width: "90px", marginTop: "18px", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No101-02">
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>}
                            {displayBedAssignData.filter(i => i.side === "1" && i.position === "4" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "1" && i.position === "4" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                <div style={{ height: '73px', borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="semiPrivatecontaine0-4">
                                    <div className="semiPrivatebed-4">
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-01">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>)) : displayBedAssignData.filter(i => (i.side === "1") && i.position === "4" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "1") && i.position === "4" && i.bedType === "2").map(k => (
                                    <div className="semiPrivatecontaine0-4">
                                        <div className="semiPrivatebed-4">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "17px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No101-01">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                        <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", marginLeft: "14px", marginRight: "14px", marginTop: "24px", marginBottom: "0px", height: "5px" }}>
                                            <span></span></span>
                                    </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatecontaine0-4">
                                <div className="semiPrivatebed-4">
                                    <Container
                                        style={{ borderRadius: "4px", width: "90px", marginTop: "17px", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No101-01">
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>}
                            {displayBedAssignData.filter(i => i.side === "2" && i.position === "4" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "2" && i.position === "4" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                <div style={{ borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="semiPrivatecontaine0-40">
                                    <div className="semiPrivatebed-4">
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-02">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>)) : displayBedAssignData.filter(i => (i.side === "2") && i.position === "4" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "2") && i.position === "4" && i.bedType === "2").map(k => (
                                    <div className="semiPrivatecontaine0-40">
                                        <div className="semiPrivatebed-4">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No101-02">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-12px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                    </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatecontaine0-40">
                                <div className="semiPrivatebed-4">
                                    <Container
                                        style={{ borderRadius: "4px", width: "90px", marginTop: "18px", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No101-02">
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>}
                            {displayBedAssignData.filter(i => i.side === "1" && i.position === "5" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "1" && i.position === "5" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                <div style={{ height: '73px', borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="semiPrivatecontaine0-5">
                                    <div className="semiPrivatebed-5">
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-01">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>)) : displayBedAssignData.filter(i => (i.side === "1") && i.position === "5" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "1") && i.position === "5" && i.bedType === "2").map(k => (
                                    <div className="semiPrivatecontaine0-5">
                                        <div className="semiPrivatebed-5">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "17px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No101-01">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                        <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", marginLeft: "14px", marginRight: "14px", marginTop: "24px", marginBottom: "0px", height: "5px" }}>
                                            <span></span></span>
                                    </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatecontaine0-5">
                                <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatebed-5">
                                    <Container
                                        style={{ borderRadius: "4px", width: "90px", marginTop: "17px", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No101-01">
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>}
                            {displayBedAssignData.filter(i => i.side === "2" && i.position === "5" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "2" && i.position === "5" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                <div style={{ borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="semiPrivatecontaine0-50">
                                    <div className="semiPrivatebed-5">
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-02">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>)) : displayBedAssignData.filter(i => (i.side === "2") && i.position === "5" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "2") && i.position === "5" && i.bedType === "2").map(k => (
                                    <div className="semiPrivatecontaine0-50">
                                        <div className="semiPrivatebed-5">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No101-02">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-12px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                    </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatecontaine0-50">
                                <div className="semiPrivatebed-5">
                                    <Container
                                        style={{ borderRadius: "4px", width: "90px", marginTop: "18px", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No101-02">
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>}
                            {displayBedAssignData.filter(i => i.side === "1" && i.position === "6" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "1" && i.position === "6" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                <div style={{ height: '73px', borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="semiPrivatecontaine0-6">
                                    <div className="semiPrivatebed-6">
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ border: "1px solid #CDB3CD", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-01">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>)) : displayBedAssignData.filter(i => (i.side === "1") && i.position === "6" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "1") && i.position === "6" && i.bedType === "2").map(k => (
                                    <div className="semiPrivatecontaine0-6">
                                        <div className="semiPrivatebed-6">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ border: "1px solid #CDB3CD", borderRadius: "4px", width: "90px", marginTop: "17px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No101-01">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                        <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", marginLeft: "14px", marginRight: "14px", marginTop: "24px", marginBottom: "0px", height: "5px" }}>
                                            <span></span></span>
                                    </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatecontaine0-6">
                                <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatebed-6">
                                    <Container
                                        style={{ borderRadius: "4px", width: "90px", marginTop: "17px", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No101-01">
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>}
                            {displayBedAssignData.filter(i => i.side === "2" && i.position === "6" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "2" && i.position === "6" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                <div style={{ borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="semiPrivatecontaine0-60">
                                    <div className="semiPrivatebed-6">
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-02">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>)) : displayBedAssignData.filter(i => (i.side === "2") && i.position === "6" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "2") && i.position === "6" && i.bedType === "2").map(k => (
                                    <div className="semiPrivatecontaine0-60">
                                        <div className="semiPrivatebed-6">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No101-02">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-12px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                    </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatecontaine0-60">
                                <div className="semiPrivatebed-6">
                                    <Container                                            
                                        style={{ borderRadius: "4px", width: "90px", marginTop: "18px", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No101-02">
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>}
                            {displayBedAssignData.filter(i => i.side === "1" && i.position === "7" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "1" && i.position === "7" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                <div style={{ height: '73px', borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="semiPrivatecontaine0-7">
                                    <div className="semiPrivatebed-7">
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-01">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>)) : displayBedAssignData.filter(i => (i.side === "1") && i.position === "7" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "1") && i.position === "7" && i.bedType === "2").map(k => (
                                    <div className="semiPrivatecontaine0-7">
                                        <div className="semiPrivatebed-7">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "17px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No101-01">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                        <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", marginLeft: "14px", marginRight: "14px", marginTop: "24px", marginBottom: "0px", height: "5px" }}>
                                            <span></span></span>
                                    </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatecontaine0-7">
                                <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatebed-7">
                                    <Container
                                        style={{ borderRadius: "4px", width: "90px", marginTop: "17px", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No101-01">
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>

                                        </span></Container>
                                </div>
                            </div>}
                            {displayBedAssignData.filter(i => i.side === "2" && i.position === "7" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "2" && i.position === "7" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                <div style={{ borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="semiPrivatecontaine0-70">
                                    <div className="semiPrivatebed-7">
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-02">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>)) : displayBedAssignData.filter(i => (i.side === "2") && i.position === "7" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "2") && i.position === "7" && i.bedType === "2").map(k => (
                                    <div className="semiPrivatecontaine0-70">
                                        <div className="semiPrivatebed-7">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No101-02">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-12px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                    </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatecontaine0-70">
                                <div className="semiPrivatebed-7">
                                    <Container
                                        style={{ borderRadius: "4px", width: "90px", marginTop: "18px", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No101-02">
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>}
                            <div className="general">
                                {displayBedAssignData.filter(i => i.side === "8" && i.position === "1" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "8" && i.position === "1" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                    <div style={{ borderRadius: '7px', width: '48px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="general-1">
                                        <div className="generalBed-3">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ transform: "rotate(-90deg)", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-21px", marginRight: "", height: "35px" }}>
                                                <span> <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div></span></Container>
                                        </div>

                                    </div>)) : displayBedAssignData.filter(i => (i.side === "8") && i.position === "1" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "8") && i.position === "1" && i.bedType === "2").map(k => (
                                        <div className="general-1">
                                            <div className="generalBed-3">
                                                <Container
                                                    onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                    style={{ transform: "rotate(-90deg)", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                                    <span> <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div></span></Container>
                                            </div>
                                            <span style={{ background: "#fff", position: "absolute", top: "16px", width: "2px", height: "85px", left: "49px", color: "#fff" }}><span>a</span></span>

                                        </div>)) : <div className="general-1">
                                    <div style={{ background: 'var(--color-gray-100)' }} className="generalBed-3">
                                        <Container
                                            style={{ transform: "rotate(-90deg)", borderRadius: "4px", width: "90px", marginTop: "40px", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                            <span> <div className="No401-01">
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div></span></Container>
                                    </div>
                                </div>}
                                {displayBedAssignData.filter(i => i.side === "7" && i.position === "1" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "7" && i.position === "1" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                    <div style={{ borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="general-10">
                                        <div className="generalBed-4">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                                <span> <div className="No401-02">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div></span></Container>
                                        </div>
                                    </div>)) : displayBedAssignData.filter(i => (i.side === "7") && i.position === "1" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "7") && i.position === "1" && i.bedType === "2").map(k => (
                                        <div className="general-10">
                                            <div className="generalBed-4">
                                                <Container
                                                    onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                    style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                                    <span> <div className="No401-02">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div></span></Container>
                                            </div>
                                        </div>)) : <div className="general-10">
                                    <div style={{ background: 'var(--color-gray-100)' }} className="generalBed-4">
                                        <Container
                                            style={{ transform: "rotate(-90deg)", borderRadius: "4px", width: "90px", marginTop: "40px", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                            <span> <div className="No401-02">
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div></span></Container>
                                    </div>
                                </div>}
                                {displayBedAssignData.filter(i => i.side === "8" && i.position === "2" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "8" && i.position === "2" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                    <div style={{ borderRadius: '7px', width: '48px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="general-2">
                                        <div className="generalBed-3">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ transform: "rotate(-90deg)", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-21px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>

                                    </div>)) : displayBedAssignData.filter(i => (i.side === "8") && i.position === "2" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "8") && i.position === "2" && i.bedType === "2").map(k => (
                                        <div className="general-2">

                                            <div className="generalBed-3">
                                                <Container
                                                    onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                    style={{ transform: "rotate(-90deg)", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                                    <span>
                                                        <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                            <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                            </div>
                                                        </div>
                                                    </span></Container>
                                            </div>
                                            <span style={{ background: "#fff", position: "absolute", top: "16px", width: "2px", height: "85px", left: "49px", color: "#fff" }}><span>a</span></span>

                                        </div>)) : <div className="general-2">

                                    <div style={{ background: 'var(--color-gray-100)' }} className="generalBed-3">
                                        <Container
                                            style={{ transform: "rotate(-90deg)", borderRadius: "4px", width: "90px", marginTop: "40px", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No401-01">
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>

                                </div>}
                                {displayBedAssignData.filter(i => i.side === "7" && i.position === "2" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "7" && i.position === "2" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                    <div style={{ borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="general-20">
                                        <div className="generalBed-4">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                    </div>)) : displayBedAssignData.filter(i => (i.side === "7") && i.position === "2" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "7") && i.position === "2" && i.bedType === "2").map(k => (
                                        <div className="general-20">
                                            <div className="generalBed-4">
                                                <Container
                                                    onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                    style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                                    <span>
                                                        <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                            <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                            </div>
                                                        </div>
                                                    </span></Container>
                                            </div>
                                        </div>)) :
                                    <div style={{ background: 'var(--color-gray-100)' }} className="general-20">
                                        <div className="generalBed-4">
                                            <Container
                                                style={{ transform: "rotate(-90deg)", borderRadius: "4px", width: "90px", marginTop: "40px", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No401-01">
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                    </div>}
                                {displayBedAssignData.filter(i => i.side === "8" && i.position === "3" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "8" && i.position === "3" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                    <div style={{ borderRadius: '7px', width: '48px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="general-3">
                                        <div className="generalBed-3">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ transform: "rotate(-90deg)", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-21px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                    </div>)) :
                                    displayBedAssignData.filter(i => (i.side === "8") && i.position === "3" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "8") && i.position === "3" && i.bedType === "2").map(k => (
                                        <div className="general-3">

                                            <div className="generalBed-3">
                                                <Container
                                                    onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                    style={{ transform: "rotate(-90deg)", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                                    <span>
                                                        <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                            <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                            </div>
                                                        </div>
                                                    </span></Container>
                                            </div>
                                            <span style={{ background: "#fff", position: "absolute", top: "16px", width: "2px", height: "85px", left: "49px", color: "#fff" }}><span>a</span></span>

                                        </div>)) :
                                        <div style={{ background: 'var(--color-gray-100)' }} className="general-3">

                                            <div className="generalBed-3">
                                                <Container
                                                    style={{ transform: "rotate(-90deg)", borderRadius: "4px", width: "90px", marginTop: "40px", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                                    <span>
                                                        <div className="No401-01">
                                                            <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                            </div>
                                                        </div>
                                                    </span></Container>
                                            </div>
                                        </div>}
                                {displayBedAssignData.filter(i => i.side === "7" && i.position === "3" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "7" && i.position === "3" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                    <div style={{ borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="general-30">
                                        <div className="generalBed-4">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                    </div>)) : displayBedAssignData.filter(i => (i.side === "7") && i.position === "3" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "7") && i.position === "3" && i.bedType === "2").map(k => (
                                        <div className="general-30">
                                            <div className="generalBed-4">
                                                <Container
                                                    onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                    style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                                    <span>
                                                        <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                            <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                            </div>
                                                        </div>
                                                    </span></Container>
                                            </div>
                                        </div>)) :
                                    <div style={{ background: 'var(--color-gray-100)' }} className="general-30">
                                        <div className="generalBed-4">
                                            <Container
                                                style={{ transform: "rotate(-90deg)", borderRadius: "4px", width: "90px", marginTop: "40px", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No401-01">
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                    </div>}
                                {displayBedAssignData.filter(i => i.side === "8" && i.position === "4" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "8" && i.position === "4" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                    <div style={{ borderRadius: '7px', width: '48px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="general-4">

                                        <div className="generalBed-3">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ transform: "rotate(-90deg)", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-21px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                    </div>)) : displayBedAssignData.filter(i => (i.side === "8") && i.position === "4" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "8") && i.position === "4" && i.bedType === "2").map(k => (
                                        <div className="general-4">

                                            <div className="generalBed-3">
                                                <Container
                                                    onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                    style={{ transform: "rotate(-90deg)", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                                    <span>
                                                        <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                            <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                            </div>
                                                        </div>
                                                    </span></Container>
                                            </div>
                                            <span style={{ background: "#fff", position: "absolute", top: "16px", width: "2px", height: "85px", left: "49px", color: "#fff" }}><span>a</span></span>

                                        </div>)) : <div className="general-4">

                                    <div style={{ background: 'var(--color-gray-100)' }} className="generalBed-3">
                                        <Container
                                            style={{ transform: "rotate(-90deg)", borderRadius: "4px", width: "90px", marginTop: "40px", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No401-01">
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>}
                                {displayBedAssignData.filter(i => i.side === "7" && i.position === "4" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "7" && i.position === "4" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                    <div style={{ borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="general-40">
                                        <div className="generalBed-4">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                    </div>)) : displayBedAssignData.filter(i => (i.side === "7") && i.position === "4" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "7") && i.position === "4" && i.bedType === "2").map(k => (
                                        <div className="general-40">
                                            <div className="generalBed-4">
                                                <Container
                                                    onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                    style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                                    <span>
                                                        <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                            <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                            </div>
                                                        </div>
                                                    </span></Container>
                                            </div>
                                        </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="general-40">
                                    <div className="generalBed-4">
                                        <Container
                                            style={{ transform: "rotate(-90deg)", borderRadius: "4px", width: "90px", marginTop: "40px", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No401-01">
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>}
                                {displayBedAssignData.filter(i => i.side === "8" && i.position === "5" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "8" && i.position === "5" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                    <div style={{ borderRadius: '7px', width: '48px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="general-5">

                                        <div className="generalBed-3">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ transform: "rotate(-90deg)", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-21px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                    </div>)) : displayBedAssignData.filter(i => (i.side === "8") && i.position === "5" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "8") && i.position === "5" && i.bedType === "2").map(k => (
                                        <div className="general-5">

                                            <div className="generalBed-3">
                                                <Container
                                                    onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                    style={{ transform: "rotate(-90deg)", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                                    <span>
                                                        <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                            <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                            </div>
                                                        </div>
                                                    </span></Container>
                                            </div>
                                            <span style={{ background: "#fff", position: "absolute", top: "16px", width: "2px", height: "85px", left: "49px", color: "#fff" }}><span>a</span></span>

                                        </div>)) : <div className="general-5">

                                    <div style={{ background: 'var(--color-gray-100)' }} className="generalBed-3">
                                        <Container
                                            style={{ transform: "rotate(-90deg)", borderRadius: "4px", width: "90px", marginTop: "40px", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No401-01">
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>

                                </div>}
                                {displayBedAssignData.filter(i => i.side === "7" && i.position === "5" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "7" && i.position === "5" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                    <div style={{ borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="general-50">
                                        <div className="generalBed-4">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                    </div>)) : displayBedAssignData.filter(i => (i.side === "7") && i.position === "5" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "7") && i.position === "5" && i.bedType === "2").map(k => (
                                        <div className="general-50">
                                            <div className="generalBed-4">
                                                <Container
                                                    onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                    style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                                    <span>
                                                        <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                            <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                            </div>
                                                        </div>
                                                    </span></Container>
                                            </div>
                                        </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="general-50">
                                    <div className="generalBed-4">
                                        <Container
                                            style={{ transform: "rotate(-90deg)", borderRadius: "4px", width: "90px", marginTop: "40px", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No401-01">
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>}
                                {displayBedAssignData.filter(i => i.side === "8" && i.position === "6" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "8" && i.position === "6" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                     <div style={{ borderRadius: '7px', width: '48px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="general-6" >
                                     <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                         <Container
                                        onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                             style={{ transform: "rotate(-90deg)", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                             <span>
                                                 <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                     <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                     </div>
                                                 </div>
                                             </span></Container>
                                     </div>                                        

                                 </div>)) : displayBedAssignData.filter(i => (i.side === "8") && i.position === "6" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "8") && i.position === "6" && i.bedType === "2").map(k => (
                                         <div className="general-6" >
                                         <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                             <Container
                                               onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                 style={{ transform: "rotate(-90deg)", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                                 <span>
                                                     <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                         <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                         </div>
                                                     </div>
                                                 </span></Container>
                                         </div>
                                         <span style={{ background: "#fff", position: "absolute", top: "16px", width: "2px", height: "85px", left: "49px", color: "#fff" }}><span>a</span></span>
 
                                     </div>)) :  <div style={{ background: 'var(--color-gray-100)' }} className="general-6" >
                                    <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                        <Container                                    
                                            style={{ transform: "rotate(-90deg)", width: "90px", marginTop: "40px", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No401-01">
                                                    <div style={{  marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>                                      

                                </div>}       
                                {displayBedAssignData.filter(i => i.side === "7" && i.position === "6" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "7" && i.position === "6" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                   <div style={{ borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="general-60">
                                   <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                       <Container
                                          onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                           style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                           <span>
                                               <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                   <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                   </div>
                                               </div>
                                           </span></Container>
                                   </div>

                               </div>)) : displayBedAssignData.filter(i => (i.side === "7") && i.position === "6" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "7") && i.position === "6" && i.bedType === "2").map(k => (
                                        <div className="general-60">
                                        <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>

                                    </div>)) :  <div style={{ background: 'var(--color-gray-100)' }} className="general-60">
                                    <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                        <Container                                               
                                            style={{ transform: "rotate(-90deg)" ,borderRadius: "4px", width: "90px", marginTop: "40px", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No401-01">
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>

                                </div>}     
                                {displayBedAssignData.filter(i => i.side === "8" && i.position === "7" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "8" && i.position === "7" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                <div className="general-7" style={{ borderRadius: '7px', width: '48px', border: k.bedType === "3" ? "1px solid palevioletred" : "" ,top:'908px'}}>
                                <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                    <Container
                                          onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                        style={{ transform: "rotate(-90deg)", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>                                    

                            </div>)) : displayBedAssignData.filter(i => (i.side === "8") && i.position === "7" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "8") && i.position === "7" && i.bedType === "2").map(k => (
                                         <div className="general-7" style={{ top: "908px" }}>
                                         <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                             <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                 style={{ transform: "rotate(-90deg)", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                                 <span>
                                                     <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                         <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                         </div>
                                                     </div>
                                                 </span></Container>
                                         </div>
                                         <span style={{ background: "#fff", position: "absolute", top: "16px", width: "2px", height: "85px", left: "49px", color: "#fff" }}><span>a</span></span>
 
                                     </div>)) :   <div className="general-7" style={{ top: "908px",background: 'var(--color-gray-100)' }}>
                                    <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                        <Container                                             
                                            style={{ transform: "rotate(-90deg)", width: "90px", marginTop: "40px", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No401-01">
                                                    <div style={{ marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>                                    

                                </div>}  
                                {displayBedAssignData.filter(i => i.side === "7" && i.position === "7" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "7" && i.position === "7" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                  <div className="general-70" style={{ borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "",top: "" }}>
                                  <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                      <Container
                                               onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                          style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                          <span>
                                              <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                  <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                  </div>
                                              </div>
                                          </span></Container>
                                  </div>

                              </div>)) : displayBedAssignData.filter(i => (i.side === "7") && i.position === "7" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "7") && i.position === "7" && i.bedType === "2").map(k => (
                                      <div className="general-70" style={{ top: "" }}>
                                      <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                          <Container
                                              onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                              style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                              <span>
                                                  <div className="No401-01">{k.roomNo+" - "+k.bedNo}
                                                      <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                      </div>
                                                  </div>
                                              </span></Container>
                                      </div>

                                  </div>)) :   <div className="general-70" style={{ top: "", background: 'var(--color-gray-100)' }}>
                                    <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                        <Container                                                
                                            style={{ transform: "rotate(-90deg)", width: "90px", marginTop: "40px", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No401-01">
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>

                                </div>}                                                                                               
                       

                            </div>
                        </div>
                    </div>

                    <div className="Pri">
                    <div className="semiPrivates" style={{ top: "702px" }}>
                            {displayBedAssignData.filter(i => i.side === "4" && i.position === "7" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "4" && i.position === "7" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                <div style={{ height: '73px', borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="semiPrivatecontaine0-1">
                                    <div className="semiPrivatebed-1">
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ width: "110px", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-01'] || '#FFFFFF', marginLeft: "15px", marginRight: "15px", height: "35px" }}>
                                            <span>
                                                <div className="No101-01">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-12px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>)) : displayBedAssignData.filter(i => (i.side === "4") && i.position === "7" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "4") && i.position === "7" && i.bedType === "2").map(k => (
                                    <div className="semiPrivatecontaine0-1">
                                        <div className="semiPrivatebed-1">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ width: "110px", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-01'] || '#FFFFFF', marginLeft: "15px", marginRight: "15px", height: "35px" }}>
                                                <span>
                                                    <div className="No101-01">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-12px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                        <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", marginLeft: "14px", marginRight: "14px", marginTop: "3px", marginBottom: "0px", height: "5px" }}>
                                            <span></span></span>
                                    </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatecontaine0-1">
                                <div className="semiPrivatebed-1">
                                    <Container
                                        style={{ width: "110px", borderRadius: "4px", marginTop: "18px", marginLeft: "15px", marginRight: "15px", height: "35px" }}>
                                        <span>
                                            <div className="No101-01">
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-12px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>}
                            {displayBedAssignData.filter(i => i.side === "3" && i.position === "7" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "3" && i.position === "7" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                <div style={{ borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="semiPrivatecontaine0-10">
                                    <div className="semiPrivatebed-1">
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", marginTop: "22px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "15px", marginRight: "15px", height: "35px" }}>
                                            <span>
                                                <div className="No101-02">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>)) : displayBedAssignData.filter(i => (i.side === "3") && i.position === "7" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "3") && i.position === "7" && i.bedType === "2").map(k => (
                                    <div className="semiPrivatecontaine0-10">
                                        <div className="semiPrivatebed-1">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", marginTop: "22px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "15px", marginRight: "15px", height: "35px" }}>
                                                <span>
                                                    <div className="No101-02">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                    </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatecontaine0-10">
                                <div className="semiPrivatebed-1">
                                    <Container
                                        style={{ borderRadius: "4px", marginTop: "22px", marginLeft: "15px", marginRight: "15px", height: "35px" }}>
                                        <span>
                                            <div className="No101-02">
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>}
                            {displayBedAssignData.filter(i => i.side === "4" && i.position === "6" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "4" && i.position === "6" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                <div style={{ height: '73px', borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="semiPrivatecontaine0-2">
                                    <div className="semiPrivatebed-2">
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-01">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>)) : displayBedAssignData.filter(i => (i.side === "4") && i.position === "6" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "4") && i.position === "6" && i.bedType === "2").map(k => (
                                    <div className="semiPrivatecontaine0-2">
                                        <div className="semiPrivatebed-2">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "17px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No101-01">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                        <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", marginLeft: "14px", marginRight: "14px", marginTop: "24px", marginBottom: "0px", height: "5px" }}>
                                            <span></span></span>
                                    </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatecontaine0-2">
                                <div className="semiPrivatebed-2">
                                    <Container
                                        style={{ borderRadius: "4px", width: "90px", marginTop: "17px", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No101-01">
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>}
                            {displayBedAssignData.filter(i => i.side === "3" && i.position === "6" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "3" && i.position === "6" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                <div style={{ borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="semiPrivatecontaine0-20">

                                    <div className="semiPrivatebed-2">
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "21px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-02">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>)) : displayBedAssignData.filter(i => (i.side === "3") && i.position === "6" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "3") && i.position === "6" && i.bedType === "2").map(k => (
                                    <div className="semiPrivatecontaine0-20">

                                        <div className="semiPrivatebed-2">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "21px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No101-02">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                    </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatecontaine0-20">

                                <div className="semiPrivatebed-2">
                                    <Container
                                        style={{ borderRadius: "4px", width: "90px", marginTop: "21px", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No101-02">
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>}
                            {displayBedAssignData.filter(i => i.side === "4" && i.position === "5" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "4" && i.position === "5" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                <div style={{ height: '73px', borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="semiPrivatecontaine0-3">
                                    <div className="semiPrivatebed-3">
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ border: "1px solid #CEA5CE", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-01">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>)) : displayBedAssignData.filter(i => (i.side === "4") && i.position === "5" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "4") && i.position === "5" && i.bedType === "2").map(k => (
                                    <div className="semiPrivatecontaine0-3">
                                        <div className="semiPrivatebed-3">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ border: "1px solid #CEA5CE", borderRadius: "4px", width: "90px", marginTop: "17px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No101-01">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                        <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", marginLeft: "14px", marginRight: "14px", marginTop: "24px", marginBottom: "0px", height: "5px" }}>
                                            <span></span></span>
                                    </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatecontaine0-3">
                                <div className="semiPrivatebed-3">
                                    <Container
                                        style={{ borderRadius: "4px", width: "90px", marginTop: "17px", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No101-01">
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>}
                            {displayBedAssignData.filter(i => i.side === "3" && i.position === "5" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "3" && i.position === "5" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                <div style={{ borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="semiPrivatecontaine0-30">
                                    <div className="semiPrivatebed-3">
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ border: "1px solid #CDB3CD", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-02">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>)) : displayBedAssignData.filter(i => (i.side === "3") && i.position === "5" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "3") && i.position === "5" && i.bedType === "2").map(k => (
                                    <div className="semiPrivatecontaine0-30">
                                        <div className="semiPrivatebed-3">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ border: "1px solid #CDB3CD", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No101-02">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                    </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatecontaine0-30">
                                <div className="semiPrivatebed-3">
                                    <Container
                                        style={{ borderRadius: "4px", width: "90px", marginTop: "18px", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No101-02">
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>}
                            {displayBedAssignData.filter(i => i.side === "4" && i.position === "4" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "4" && i.position === "4" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                <div style={{ height: '73px', borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="semiPrivatecontaine0-4">
                                    <div className="semiPrivatebed-4">
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "17px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-01">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>

                                </div>)) : displayBedAssignData.filter(i => (i.side === "4") && i.position === "4" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "4") && i.position === "4" && i.bedType === "2").map(k => (
                                    <div className="semiPrivatecontaine0-4">
                                        <div className="semiPrivatebed-4">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "17px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No101-01">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                        <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", marginLeft: "14px", marginRight: "14px", marginTop: "24px", marginBottom: "0px", height: "5px" }}>
                                            <span></span></span>
                                    </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatecontaine0-4">
                                <div className="semiPrivatebed-4">
                                    <Container
                                        style={{ borderRadius: "4px", width: "90px", marginTop: "17px", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No101-01">
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>

                            </div>}
                            {displayBedAssignData.filter(i => i.side === "3" && i.position === "4" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "3" && i.position === "4" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                <div style={{ borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="semiPrivatecontaine0-40">
                                    <div className="semiPrivatebed-4">
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-02">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>)) : displayBedAssignData.filter(i => (i.side === "3") && i.position === "4" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "3") && i.position === "4" && i.bedType === "2").map(k => (
                                    <div className="semiPrivatecontaine0-40">
                                        <div className="semiPrivatebed-4">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No101-02">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                    </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatecontaine0-40">
                                <div className="semiPrivatebed-4">
                                    <Container
                                        style={{ borderRadius: "4px", width: "90px", marginTop: "18px", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No101-02">
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>}
                            {displayBedAssignData.filter(i => i.side === "4" && i.position === "3" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "4" && i.position === "3" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                <div style={{ height: '73px', borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="semiPrivatecontaine0-5">
                                    <div className="semiPrivatebed-5">
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "17px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-01">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>)) : displayBedAssignData.filter(i => (i.side === "4") && i.position === "3" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "4") && i.position === "3" && i.bedType === "2").map(k => (
                                    <div className="semiPrivatecontaine0-5">
                                        <div className="semiPrivatebed-5">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "17px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No101-01">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                        <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", marginLeft: "14px", marginRight: "14px", marginTop: "24px", marginBottom: "0px", height: "5px" }}>
                                            <span></span></span>
                                    </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatecontaine0-5">
                                <div className="semiPrivatebed-5">
                                    <Container
                                        style={{ borderRadius: "4px", width: "90px", marginTop: "17px", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No101-01">
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>}
                            {displayBedAssignData.filter(i => i.side === "3" && i.position === "3" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "3" && i.position === "3" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                <div style={{ borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="semiPrivatecontaine0-50">
                                    <div className="semiPrivatebed-5">
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-02">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>)) : displayBedAssignData.filter(i => (i.side === "3") && i.position === "3" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "3") && i.position === "3" && i.bedType === "2").map(k => (
                                    <div className="semiPrivatecontaine0-50">
                                        <div className="semiPrivatebed-5">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No101-02">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                    </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatecontaine0-50">
                                <div className="semiPrivatebed-5">
                                    <Container
                                        style={{ borderRadius: "4px", width: "90px", marginTop: "18px", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No101-02">
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>}
                            {displayBedAssignData.filter(i => i.side === "4" && i.position === "2" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "4" && i.position === "2" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                <div style={{ height: '73px', borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="semiPrivatecontaine0-6">
                                    <div className="semiPrivatebed-6">
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ border: "1px solid #CDB3CD", borderRadius: "4px", width: "90px", marginTop: "17px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-01">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>)) : displayBedAssignData.filter(i => (i.side === "4") && i.position === "2" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "4") && i.position === "2" && i.bedType === "2").map(k => (
                                    <div className="semiPrivatecontaine0-6">
                                        <div className="semiPrivatebed-6">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ border: "1px solid #CDB3CD", borderRadius: "4px", width: "90px", marginTop: "17px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No101-01">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                        <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", marginLeft: "14px", marginRight: "14px", marginTop: "24px", marginBottom: "0px", height: "5px" }}>
                                            <span></span></span>
                                    </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatecontaine0-6">
                                <div className="semiPrivatebed-6">
                                    <Container
                                        style={{ borderRadius: "4px", width: "90px", marginTop: "17px", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No101-01">
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>}
                            {displayBedAssignData.filter(i => i.side === "3" && i.position === "2" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "3" && i.position === "2" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                <div style={{ borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="semiPrivatecontaine0-60">
                                    <div className="semiPrivatebed-6">
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-02">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>)) : displayBedAssignData.filter(i => (i.side === "3") && i.position === "2" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "3") && i.position === "2" && i.bedType === "2").map(k => (
                                    <div className="semiPrivatecontaine0-60">
                                        <div className="semiPrivatebed-6">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No101-02">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                    </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatecontaine0-60">
                                <div className="semiPrivatebed-6">
                                    <Container
                                        style={{ borderRadius: "4px", width: "90px", marginTop: "18px", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No101-02">
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>}
                            {displayBedAssignData.filter(i => i.side === "4" && i.position === "1" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "4" && i.position === "1" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                <div style={{ height: '73px', borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="semiPrivatecontaine0-7">
                                    <div className="semiPrivatebed-7">
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "17px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-01">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>

                                            </span></Container>
                                    </div>
                                </div>)) : displayBedAssignData.filter(i => (i.side === "4") && i.position === "1" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "4") && i.position === "1" && i.bedType === "2").map(k => (
                                    <div className="semiPrivatecontaine0-7">
                                        <div className="semiPrivatebed-7">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "17px", backgroundColor: containerColors[k.roomNo + '-01'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No101-01">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>

                                                </span></Container>
                                        </div>
                                        <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", marginLeft: "14px", marginRight: "14px", marginTop: "24px", marginBottom: "0px", height: "5px" }}>
                                            <span></span></span>
                                    </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatecontaine0-7">
                                <div className="semiPrivatebed-7">
                                    <Container
                                        style={{ borderRadius: "4px", width: "90px", marginTop: "17px", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No101-01">
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>

                                        </span></Container>
                                </div>
                            </div>}
                            {displayBedAssignData.filter(i => i.side === "3" && i.position === "1" && (i.bedType === "1" || i.bedType === "3")).map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => i.side === "3" && i.position === "1" && (i.bedType === "1" || i.bedType === "3")).map(k => (
                                <div style={{ borderRadius: '7px', border: k.bedType === "3" ? "1px solid palevioletred" : "" }} className="semiPrivatecontaine0-70">
                                    <div className="semiPrivatebed-7">
                                        <Container
                                            onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                            style={{ border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-02">{k.roomNo+" - "+k.bedNo}
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>

                                </div>)) : displayBedAssignData.filter(i => (i.side === "3") && i.position === "1" && i.bedType === "2").map((k) => { return k; }).length > 0 ? displayBedAssignData.filter(i => (i.side === "3") && i.position === "1" && i.bedType === "2").map(k => (
                                    <div className="semiPrivatecontaine0-70">
                                        <div className="semiPrivatebed-7">
                                            <Container
                                                onClick={() => handleContainerClick(k.roomNo+" - "+k.bedNo,k.id,inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0?"Yes":"No")}
                                                style={{ border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors[k.roomNo + '-02'] || inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "rgb(220, 223, 235)" : "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No101-02">{k.roomNo+" - "+k.bedNo}
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: inputBedAllAssignData.filter(l=>l.bedId === k.id).length > 0? "1px solid rgb(180, 181, 209)" : "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>

                                    </div>)) : <div style={{ background: 'var(--color-gray-100)' }} className="semiPrivatecontaine0-70">
                                <div className="semiPrivatebed-7">
                                    <Container
                                        style={{ borderRadius: "4px", width: "90px", marginTop: "18px", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No101-02">
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>

                            </div>}
                        </div>
                    </div>

                </div>

            </div>
        </div>




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

                    label="continue"
                    primaryButtonCursor="pointer"

                />
            </div>
        </div>
        <Dialog maxWidth={'md'} PaperProps={{ sx: { width: '450px', position: 'absolute', height: '500px' } }}
          open={bedAllocateDialog}
          onClose={handleClose}
        >
          <DialogTitle style={{ overflowX: 'hidden', marginBottom: '-35px' }}> <a style={{ cursor: 'pointer' }} onClick={() => { setBedAllocateDialog(false) }}><img style={{ width: '24px', height: '24px' }} src={ArrowForwardImage}></img></a>
            <div style={{ position: 'relative', left: '31px', top: '-27px' }} className="patient-Q15-dialogTitle">Patient Bed Assign</div></DialogTitle>
          <DialogContent style={{ padding: '0px', overflowX: 'hidden', background: '#F8FAFB' }}>

            <DialogContentText >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div style={{ position: 'relative', left: '22px', top: '20px' }}>
            <div>
            <div style={{ fontSize: '16px' }} className="patient-Q15-dialogTitle">Patient Name</div>   
              
            <FormControl className="name-input13" variant="outlined" style={{ width: '354px', position: 'relative', top: '12px', height: '48px' }}>
              <InputLabel color="primary" >Select<span>
              </span></InputLabel>
              <Select  size="medium" label="Select" name="pid" value={inputFormData.pid} required onChange={handleInputChange}>
                {patientList}
              </Select>
              <FormHelperText />
            </FormControl>
            </div>
            <div style={{ position: 'relative', top: '38px' }}>
            <div style={{ fontSize: '16px' }} className="patient-Q15-dialogTitle">Assigned Staff</div>   
               
            <FormControl className="name-input13" variant="outlined" style={{ width: '354px', position: 'relative', top: '12px', height: '48px' }}>
              <InputLabel color="primary" >Select<span>
              </span></InputLabel>
              <Select  size="medium" label="Select" name="assignedBy" value={inputFormData.assignedBy} required onChange={handleInputChange}>
                {staffList}
              </Select>
              <FormHelperText />
            </FormControl>
            </div>
            <div style={{ fontSize: '16px',position: 'relative', top: '75px'  }} className="patient-Q15-dialogTitle">Bed Assign Time</div>                  
                  <div style={{ width: '354px', position: 'relative', top: '87px', height: '48px' }}>
                    <MobileDateTimePicker 
                      label="Date"
                      value={inputFormData.admitDate}
                      onChange={(newValue) => {
                        inputFormData.admitDate = newValue;
                        setInputFormData({ ...inputFormData });
                      }}
                      slotProps={{
                        textField: {
                          variant: "outlined",
                          size: "medium",
                          fullWidth: true,
                          color: "primary",
                        },
                      }}
                    />
                  </div>
                  <div style={{top:'374px',left:'-23px'}} className="component-5011">
                  <div  style ={{position: 'relative', top: '17px', left:'-145px'}} className="cancel-group">
                <SecondaryButton
                    label="Cancel"
                    secondaryButtonCursor="pointer"
                    onCancelContainerClick={handleCancelChange}
                />
                <div className="previous1">
                    <img className="bg-icon3" alt="" src={bottomImage} />
                    <div className="label5">Previous</div>
                </div>
                <PrimaryButton
                    label="Save"
                    primaryButtonCursor="pointer"
                    onNextContainerClick={handlePageSave}
                />
            </div>
                    </div>
                </div>
            </LocalizationProvider>
            </DialogContentText>
          </DialogContent>

        </Dialog>
        <Dialog maxWidth={'md'} PaperProps={{ sx: { width: '570px', position: 'absolute', top:'27px', height: '290px' } }}
          open={bedOccupiedDialog}
          onClose={handleOccupiedClose}
        >
          <DialogTitle style={{ overflowX: 'hidden'}}> 
            <div style={{ position: 'relative',  top: '12px', textAlign:'center' }} className="patient-Q15-dialogTitle">Bed Occupied Information</div>
            </DialogTitle>
          <DialogContent style={{ padding: '0px', overflowX: 'hidden', background: '#F8FAFB' }}>
            <div style={{fontSize:'17px',position: 'relative',  top: '25px', textAlign:'center'}} className="patient-Q15-dialogTitle">Given below the bed allocated details are shown:</div>
            <div style={{borderBottomStyle:'dashed',position:'relative',left:'73px',top:'22px',width:'424px'}}></div>
            <div style={{fontSize:'16px',position: 'relative',  top: '55px', textAlign:'center'}} className="patient-Q15-dialogTitle"><span style={{WebkitTextStroke:'lightcyan'}}>Patient Name: </span>
            <span>{patientOccupiedName}</span></div>
            <div style={{fontSize:'16px',position: 'relative',  top: '65px', textAlign:'center'}} className="patient-Q15-dialogTitle"><span style={{WebkitTextStroke:'lightcyan'}}>Assigned By: </span><span>{assignedOccupiedName}</span></div>
            <div style={{fontSize:'16px',position: 'relative',  top: '75px', textAlign:'center'}} className="patient-Q15-dialogTitle"><span style={{WebkitTextStroke:'lightcyan'}}>Admission Date: </span><span>{admitOccupiedName}</span></div>
            <div style={{fontSize:'16px',position: 'relative',  top: '85px', textAlign:'center'}} className="patient-Q15-dialogTitle"><span style={{WebkitTextStroke:'lightcyan'}}>Bed No: </span><span>{bedNumber}</span></div>
            <DialogContentText >

            </DialogContentText>
          </DialogContent>

        </Dialog>
    </>
    );

};
const mapStateToProps = (state: any) => {
    const { deviceFormData, getBedAssignmentByOrgIdData, getAllStaffData, getAllPatientData, createDynamicBedAssignData } = state;
    return {
        deviceFormData, getBedAssignmentByOrgIdData, getAllStaffData, getAllPatientData, createDynamicBedAssignData
    };
};

export default connect(mapStateToProps)(DynamicBedAssignment)




