import { Checkbox } from "primereact/checkbox";
import React, { Dispatch, useState, useEffect } from "react";

import { connect } from "react-redux";
import InputFormDataJSON from '../../../assets/data/Forms_JSON/AIMSData.json'
import { createBrowserHistory } from "history";
import { FormContext } from '../../../FormContext';
import loaddingFile from '../../../../src/assets/images/tenor.gif';
import Element from "./../Visacare/Element";
import { Button } from 'primereact/button';
import AvatarBigImage from './../../../assets/images/mettler_images/AvatarBigImage.png';
import bloodBag from './../../../assets/images/mettler_images/blood_bag.svg';
import bloodDrop from './../../../assets/images/mettler_images/blood_drop.svg';
import bloodDropNew from './../../../assets/images/mettler_images/blood_dropNew.svg';
import bloodDropNewOne from './../../../assets/images/mettler_images/blood_dropNewOne.svg';
import AvatarDoctorImage from './../../../assets/images/mettler_images/AvatarDoctor.png';
import admitpatientGroup from "./../../../assets/images/mettler_images/admitpatientGroup.svg";
import OverviewGroup from "./../../../assets/images/mettler_images/OverviewGroup.svg";
import q15Group from "./../../../assets/images/mettler_images/q15Group.svg";
import Groupss from "../../../assets/images/mettler_images/Groupss.png";
import searchImage from './../../../assets/images/mettler_images/Search.svg';
import { HttpLogin } from "../../../utils/Http";
import moment from "moment";
import { deleteFilledForm } from "../../../store/actions/TreatmentPlan";

interface IAIMS { }
interface IAIMS {
  StaticPage: any;
  dispatch: Dispatch<any>;
  match:any;
  state: {
    nodes: [],
    checked: [],
    expanded: []
  }
}
const AIMS: React.FC<IAIMS> = ({
  match,dispatch


}) => {
  const history = createBrowserHistory();
  const [spinner, setSpinner] = useState(false);
  const [elements, setElements] = useState(null);
  let [encryptPatientid, setEncryptPatientid] = useState(null);
  let [decryptPatientid, setDecryptPatientid] = useState(null);
  let [encryptVisitid, setEncryptVisitid] = useState(null);
  let [decryptVisitid, setDecryptVisitid] = useState(null);
  let [encryptName, setEncryptName] = useState(null);
  let [decryptName, setDecryptName] = useState(null);
   let [patientSSN, setPatientSSN] = useState(null);
  let [patientImage, setPatientImage] = useState("");
  let [patientGender, setPatientGender] = useState(null);
  let [patientDateOfBirth, setPatientDateOfBirth] = useState(null);
  let [inputPatientInfo, setInputPatientInfo] = useState(null);
  let [patientAge, setPatientAge] = useState(null); 
  let [newFormId, setNewFormId] = useState(""); 
  useEffect(() => {
     setSpinner(true);
    var encryptInitial = match.params.patientid;
    setEncryptPatientid(encryptInitial);
    var CryptoJS = require("crypto-js");
    let decodePatientid = decodeURIComponent(encryptInitial);
    let decodeFinalPatientid = CryptoJS.AES.decrypt(decodePatientid.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
    setDecryptPatientid(decodeFinalPatientid);
    var encryptVisit = match.params.visitId;
    setEncryptVisitid(encryptVisit);    
    let decodeVisitid = decodeURIComponent(encryptVisit);
    let decodeFinalVisitid = CryptoJS.AES.decrypt(decodeVisitid.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
    setDecryptVisitid(decodeFinalVisitid);
    var encryptNameInitial = match.params.name;
    setEncryptName(encryptNameInitial);    
    let decodeName = decodeURIComponent(encryptNameInitial);
    let decodeFinalName = CryptoJS.AES.decrypt(decodeName.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
    setDecryptName(decodeFinalName);
    console.log(JSON.stringify(decodeFinalName))  
    console.log(JSON.stringify(decodeFinalPatientid))  
    console.log(JSON.stringify(decodeFinalVisitid))  
   if(decodeFinalPatientid !== ""){
    HttpLogin.axios().get("api/patient/getPatient/" + decodeFinalPatientid)
    .then((response) => {
        //     console.log(JSON.stringify(response.data.data))          
        if (response.data.message.code === "MHC - 0200") {
            setInputPatientInfo(response.data.data.basicDetails[0].name[0].given);
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
            setSpinner(false);
        } else {
            alert(response.data.message.description);
        }

    })
  }
  // HttpLogin.axios().get("/api/forms/getByName/"+decodeFinalName)
  //               .then((resp) => {
  //                 if (resp.data.message.code === "MHC - 0200") {
  //                   setElements(resp.data.data);  
  //                   setSpinner(false);     
  //                 }else{
                    
  //                 }
  //               })
 
  if(decodeFinalPatientid !== ""){
    HttpLogin.axios().get("/api/filledForm/getByPid/{pid}?pid="+decodeFinalPatientid)
      .then((response) => {  
        
        var newElementData = response.data.data.filter(k=>k.pid === decodeFinalPatientid && k.form.name === decodeFinalName && decodeFinalVisitid === k.lastVisit).map(l=>{return l});
        console.log(JSON.stringify(newElementData))
      if(newElementData !== undefined && newElementData.length>0){
        if(newElementData[0].id !== ""){
          console.log(JSON.stringify(newElementData));
          setNewFormId(newElementData[0].id);
          setElements(newElementData[0].form);
          setSpinner(false);
        }
      
      }else{
        setNewFormId("");
        HttpLogin.axios().get("/api/forms/getByName/"+decodeFinalName)
                    .then((resp) => {
                      if (resp.data.message.code === "MHC - 0200") {
                        setElements(resp.data.data);  
                        setSpinner(false);     
                      }else{
                        setSpinner(false);    
                      }
                    })
                  }
       
      })
   }else{
    HttpLogin.axios().get("/api/forms/getByName/"+decodeFinalName)
                    .then((resp) => {
                      if (resp.data.message.code === "MHC - 0200") {
                        setElements(resp.data.data);  
                        setSpinner(false);     
                      }else{
                        
                      }
                    })
   }
   
  }, [])

  const [isPageLoaded, setPageLoaded] = useState(false);



  const { fields, page_label } = elements ?? {}
  const handleSubmit = (event) => {
    setElements(elements);

    var obj = {
      "id": newFormId !== "" && newFormId !== undefined ? newFormId: "",
      "pid": decryptPatientid !== "" ? decryptPatientid: "",
      "lastVisit": decryptVisitid !== "" ? decryptVisitid: "",
      "form": elements
    }
    var textCheck =  elements !== undefined && elements !== null && elements.fields.length>0 &&  elements.fields.filter(k=>k.mandatory === true && k.fieldType === 'text' && k.fieldValue === "");
    var selectCheck = elements !== undefined && elements !== null && elements.fields.length>0 &&  elements.fields.filter(k=>k.mandatory === true && k.fieldType === 'select' && k.fieldValue === "");
    var dateCheck = elements !== undefined && elements !== null && elements.fields.length>0 &&  elements.fields.filter(k=>k.mandatory === true && k.fieldType === 'date' && k.fieldValue === "");
    var checkboxCheck = elements !== undefined && elements !== null && elements.fields.length>0 &&  elements.fields.filter(k=>k.mandatory === true && k.fieldType === 'checkbox' && k.fieldValue2 === false);
    var multiSelectCheck = elements !== undefined && elements !== null && elements.fields.length>0 &&  elements.fields.filter(k=>k.mandatory === true && k.fieldType === 'multiselect').map(l=>{return l});
    //multiSelectCheck = multiSelectCheck !== undefined && multiSelectCheck !== null && multiSelectCheck.length>0 && multiSelectCheck[0].filter(k=>k.optionValue === true).length
    console.log(JSON.stringify(multiSelectCheck));
    if(textCheck.length>0 && textCheck !== undefined){
      alert("Enter the "+textCheck[0].fieldLabel+" because it is mandatory");
    }else if(selectCheck.length>0 && selectCheck !== undefined){
      alert("Enter the "+selectCheck[0].fieldLabel+" because it is mandatory");
    }else if(checkboxCheck.length>0 && checkboxCheck !== undefined){
      alert("Select the "+checkboxCheck[0].fieldLabel+" because it is mandatory");
    }else if(dateCheck.length>0 && dateCheck !== undefined){
      alert("Enter the "+dateCheck[0].fieldLabel+" because it is mandatory");
    }else{
      var url = "/api/filledForm/add";
  HttpLogin.axios().post(url,obj, {
      headers: { 
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*"
      }
    })
    .then(res => {                       
      alert(res.data.message.description);
        console.log("API Response in post " +JSON.stringify(res.data));
        setSpinner(false);
         return res;   
    })
    .catch((e: any) => {
      alert(e.data.message.description);
      //  console.log("Error in post " +JSON.stringify(e));
      return e;               
    });  
  //   console.log(JSON.stringify(elements));
  //   dispatch(updateFields(elements))
  //   setTimeout(() => {    
  //     alert("Form Updated Successfully");
  //     window.location.reload();
  //  }, 3000)
    }
  
    event.preventDefault();
  }
//  const { downl_oade } = elements ?? {}
  const handledownload = (event) => {
    event.preventDefault();


  }
 // const { pr_int } = elements ?? {}
  const handledownloads = (event) => {
    event.preventDefault();


  }

  const handleDeleteForm = ()=>{
    dispatch(deleteFilledForm(decryptPatientid,decryptName));
   // window.location.href = "/MettlerVisitPatientdata/"+encryptPatientid+"/"+encryptVisitid;
  }

  const handleChange = (id, event, i) => {
    const newElements = { ...elements }
    newElements.fields.forEach(field => {
      const { fieldType, fieldId } = field;
      if (id === fieldId) {
        switch (fieldType) {
          
            case 'select':
            field['fieldValue'] = event.target.value;
            break;
            case 'checkbox':
            field['fieldValue2'] = event.target.checked;
            break;
          default:
            field['fieldValue'] = event.target.value;
            break;
        }

      }
      if (fieldType === "multiselect") {
        if (i === field.fieldId) {
          field.fieldOptions.map((item, k) => {
            if (item.optionLabel === id && event.target.id === "many") {
              item['optionValue'] = event.target.checked;
            } else if (item.optionLabel === id && event.target.id === "one") {
              for (let i = 0; i < field.fieldOptions.length; i++) {
                if (field.fieldOptions[i].optionLabel === id) {
                  field.fieldOptions[i].optionValue = event.target.checked;
                } else {
                  field.fieldOptions[i].optionValue = false;
                }

              }
            }
          });
        }

      }
    
      if (fieldType === "radio") {
        if (i === field.fieldId) {
          field.fieldOptions.map((item, k) => {
            if (item.optionLabel === id) {
              for (let i = 0; i < field.fieldOptions.length; i++) {
                if (field.fieldOptions[i].optionLabel === id) {
                  field.fieldOptions[i].optionValue = event.target.checked;
                } else {
                  field.fieldOptions[i].optionValue = false;
                }
              }
            }
          });
        }

      }
      setElements(newElements)
    });

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
    <div><link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link><div className="p-col-12">
      {spinner &&
        (<div className='overlay-content'>
          <div className='wrapper'>
            <img src={loaddingFile} style={{ position: 'absolute', width: '100%', zIndex: 2, opacity: '0.5' }} />
          </div>
        </div>
        )}
        {decryptPatientid !== "" ?
      <div style={{ top: "6px", background: '#2D56AD', height: '98px', display: 'flex', width: 'calc(100% - 0px)', position: 'absolute', left: "0px" }}><div id="mettlerEmptyPadding" className="p-col-12 p-md-1">

        <div id="mettlerEmptyPadding" className="p-col-12 p-md-1">
          <img onClick={toggleVisibility} style={{ width: '60px', height: '60px', position: 'relative', left: '13px', top: '23px', cursor: "pointer" }} src={AvatarBigImage}></img>
        </div>
        <div id="mettlerEmptyPadding" style={{ display: 'flex', flexDirection: 'column' }} className="p-col-12 p-md-6">
          <div style={{ display: 'flex', flexDirection: 'row', position: "absolute", top: "7px", left: "97px" }}>
            <div style={{ position: 'relative', top: '19px', minWidth: 'max-content', fontSize: '18px' }} className="App-TopBar-PatientName">{inputPatientInfo}</div>
            <div style={{ position: 'relative', top: '23px', left: '6px', minWidth: 'max-content', fontSize: '14px' }} className="App-TopBar-PatientAge">{patientAge} Years</div>

            <div className="admit-patient-ss" style={{ width: '105px', height: '24px', background: '#5574B7', border: '1px solid #5574B7', position: 'relative', top: '19px', left: '23px' }}>
              <div style={{ fontWeight: 400, fontSize: '12px', opacity: 0.6, color: '#FFF' }} className="admit-patient-profileName">SS#:</div>
              <div style={{ fontWeight: 400, fontSize: '12px', color: '#FFF' }} className="admit-patient-profileName">SS-{patientSSN}</div>
            </div>
            <div className="admit-patient-ss" style={{ width: '110px', height: '24px', position: 'relative', left: '40px', top: '19px', background: '#5574B7', border: '1px solid #5574B7' }}>
              <div style={{ fontWeight: 400, fontSize: '12px', opacity: 0.6, color: '#FFF' }} className="admit-patient-profileName">MR:</div>
              <div style={{ fontWeight: 400, fontSize: '12px', color: '#FFF' }} className="admit-patient-profileName">MR-345</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', position: "absolute", top: "20px", left: "86px" }}>
            <div style={{ position: 'relative', top: '32px', display: 'flex' }}>
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
            <div style={{ position: 'relative', top: '30px', display: 'flex' }}>
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
      </div>:<></>}
      {isVisible && (
        <div style={{ borderRadius: "14px", backgroundColor: "#FAFCFF", position: "relative", top: "106px", width: "306px", height: "1298px", display: "flex", zIndex: isVisible ? 1 : 1 }}>
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
                <span style={{ top: "72px", position: "absolute", left: "40px", fontSize: "16px", color: "black" }}>Q-15 Form</span>
              </div>
              <div>
                <img src={admitpatientGroup} style={{ position: "absolute", top: "126px", left: "7px" }}></img>
                <span style={{ top: "124px", position: "absolute", left: "40px", fontSize: "16px", color: "black" }}>Admit Patient</span>
              </div>
              <div>
                <span style={{ position: "absolute", top: "171px", color: "black" }}><i className="large material-icons">chevron_right</i></span>
                <span style={{ top: "172px", position: "absolute", left: "40px", fontSize: "16px", color: "black" }}>Patient Data/Orders</span>
              </div>

              <div style={{ position: "absolute", top: "23px" }}>
                <span style={{ top: "199px", position: "absolute", transform: "rotate(90deg)", color: "black" }}><i className="large material-icons">chevron_right</i></span>
                <span style={{ top: "199px", position: "absolute", left: "41px", fontSize: "16px", whiteSpace: "nowrap", color: "black" }}>Treatment Plan</span>
                <div style={{ position: "absolute", left: "20px", top: "304px" }}>
                  <input type="text" className="dashboard-search-text" id="new" name="new" placeholder="Search" style={{ paddingLeft: '36px', top: "-54px", fontFamily: 'system-ui', position: 'relative', width: '165px', left: '17px' }} />
                  <img src={searchImage} style={{ width: '20px', height: '20px', position: 'relative', left: '25px', top: '-79px', opacity: 0.3 }}></img>
                </div>

              </div>
              <div style={{ position: "absolute", top: "311px", left: '36px', backgroundColor: "#EFF4FF", width: "234px", height: "52px", borderRadius: "6px" }}>
                <img src={Groupss} style={{ fontWeight: "bolder", color: "#000000", fontSize: "35px", position: "absolute", top: "19px", left: "7px" }}></img>
                <span style={{ position: "absolute", top: "15px", left: "38px", fontSize: "17px", color: "#3F3F46" }}>Abnormal Involunta...</span>
              </div>
              <div style={{ position: "absolute", top: "355px", left: '36px', width: "257px", height: "52px", borderRadius: "6px" }}>
                <img src={Groupss} style={{ fontWeight: "bolder", color: "#000000", fontSize: "35px", position: "absolute", top: "19px", left: "7px" }}></img>
                <span style={{ position: "absolute", top: "15px", left: "38px", fontSize: "17px", color: "#3F3F46" }}>Form 2</span>
              </div>
              <div style={{ position: "absolute", top: "398px", left: '36px', width: "257px", height: "52px", borderRadius: "6px" }}>
                <img src={Groupss} style={{ fontWeight: "bolder", color: "#000000", fontSize: "35px", position: "absolute", top: "19px", left: "7px" }}></img>
                <span style={{ position: "absolute", top: "15px", left: "38px", fontSize: "17px", color: "#3F3F46" }}>Form 3</span>
              </div>
              <div style={{ position: "absolute", top: "46px" }}>
                <span style={{ top: "419px", position: "absolute", color: "black" }}><i className="large material-icons">chevron_right</i></span>
                <span style={{ top: "420px", position: "absolute", left: "41px", fontSize: "16px", color: "black" }}>Reports</span>
              </div>
            </div>

          </div>
        </div>
      )}
      {/* // )}   <div style={{ position: "relative", left: isVisible ? "-54px" : "29px", display: "flex", width: "289px", fontSize: "15px", top: isVisible ? "" : "20px" }}>{page_label}</div> */}
      <div style={{ display: "flex", justifyContent: "space-between", textAlign: 'center', position: "relative", top: decryptPatientid === ""?"0px":isVisible ? "-1192px" : "100px", width: "calc(100% - -8px)", height: "82px" }} >

        <div style={{ position: "relative", left: isVisible ? "320px" : "29px", top: isVisible ? "20px" : "20px", display: "flex", width: "289px", fontSize: "15px",fontWeight:600,whiteSpace:"nowrap" }}>{page_label}</div>
        <div style={{ display: "flex", position: "relative", left: "-27px", top: "20px", gap: "24px" }}>
          <div style={{ border: ' 1px solid #D4D4D4', cursor: "pointer", display: "flex", left: "825px", top: "29px", gap: "9px", backgroundColor: "#F8F9FB", height: "32px", width: "127.93px", borderRadius: "4px" }}>
            <div><i style={{ position: "relative", top: "5px", left: "7px" }} className="large material-icons">file_download</i></div>
            <div style={{position:"relative",top:"6px"}}>{/*downl_oade*/}Download</div>
          </div>
          <div style={{ border: ' 1px solid #D4D4D4', cursor: "pointer", display: "flex", gap: "9px", top: "29px", left: "977px", width: "96px", height: "32px", backgroundColor: "#F8F9FB", borderRadius: "4px" }}>
            <div><i style={{ position: "absolute", top: "5px", left: "155px" }} className="large material-icons">print</i></div>
            <div style={{ position: "absolute", top: "6px", left: "190px", fontSize: "14px", color: "black" }}>{/*pr_int*/}Print</div>
          </div>
        </div>


      </div>
      <div className="dashboard-title" style={{ position: "relative", top: decryptPatientid === ""?"-29px":isVisible ? "-1218px" : "84px", width: isVisible ? "calc(100% - 288px)" : "", left: isVisible ? "302px" : "" }}></div>
      <div id="removePaddingTop" style={{ position: isVisible ? "absolute" : "absolute", top: isVisible ? "40px" : "", width:'-webkit-fill-available' }} className="p-col-12">
        <FormContext.Provider value={{ handleChange }}>
          <div style={{ border: '0px', position: "relative", top: decryptPatientid === ""?"0px":"200px", width: "calc(100% - 305px)", left: "unset", right: isVisible ? "-291px" : "-194px" }} className="p-fluid p-grid">

            {fields ? fields.map((field, i) => <Element key={i} field={field} />) : null}
            <div style={{ display: 'flex', position: "relative", left: "-89px" }} className="p-col-12 p-md-12">
              {/* <div className="p-col-12 p-md-4">     </div> */}
              <div style={{ textAlign: 'center', flexDirection: "row-reverse", display: "flex", position: "relative", left: '369px',top:'108px' }} className="p-col-12 p-md-4"><Button label="Save" onClick={(e) => handleSubmit(e)} style={{ width: "fit-content", backgroundColor: "#1F489F", color: "white", borderColor: "#1F489F" }} />
                &nbsp;&nbsp;&nbsp;
                <Button style={{ width: 'fit-content', backgroundColor: "#C9D1E2", color: "black", borderColor: "#C9D1E2" }} label="Delete" onClick={handleDeleteForm} />
                &nbsp;&nbsp;&nbsp;
                <Button style={{ width: 'fit-content', backgroundColor: "#C9D1E2", color: "black", borderColor: "#C9D1E2" }} label="Back" onClick={() => history.goBack()} /></div>
              {/* <div className="p-col-12 p-md-4"></div> */}
            </div>

          </div>
        </FormContext.Provider>

      </div>
    </div></div>
  );


};
const mapStateToProps = (state: any) => {
  const { deviceFormData, I907FormData } = state;
  return {
    deviceFormData, I907FormData
  };
};
export default connect(mapStateToProps)(AIMS)