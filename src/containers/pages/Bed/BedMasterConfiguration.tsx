
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
import HIPAAComplianceContainer from "./../../../components/HIPAAComplianceContainer";
import "./BedMasterConfiguration.css";
import React from "react";
import { connect } from "react-redux";
import bottomImage from './../../../assets/images/mettler_images/bg.svg';
import newImage from './../../../assets/images/mettler_images/rectangle-5999.svg';
import BedMasterConfigurationData from "./../../../assets/data/BedMasterConfigurationData.json";
import { createBedAssignment,getAllBedAssignment} from "../../../store/actions/BedAssignment";
import * as Constants from "./../Constants/ConstantValues";
import SecondaryButton from "../../../components/SecondaryButton";
import PrimaryButton from "../../../components/PrimaryButton";
import "../../../components/BottomFooter.css";
import { HttpLogin } from "../../../utils/Http";
import loaddingFile from '../../../../src/assets/images/tenor.gif';


interface IBedMasterConfiguration { }
interface IBedMasterConfiguration {
  StaticPage: any;
  dispatch: Dispatch<any>;
  createBedAssignmentData: any;
  errorMessage: any;
  state: {
    nodes: [],
    checked: [],
    expanded: []
  }
}
const BedMasterConfiguration: React.FC<IBedMasterConfiguration> = ({
  dispatch, createBedAssignmentData, errorMessage


}) => {


  let [inputFormData, setInputFormData] = useState(BedMasterConfigurationData);
  let [organizationId, setOrganizationId] = useState("");
  let [floorNumber, setFloorNumber] = useState(null);
  let [wingData, setWingData] = useState(null);
  let [wardNumber, setWardNumber] = useState(null);
  let [sideData, setSideData] = useState(null);
  let [roomNumber, setRoomNumber] = useState(null);
  let [bedTypeData, setBedTypeData] = useState(null);
  let [bedNumber, setBedNumber] = useState(null);
  let [supervisionLevelData, setSupervisionLevelData] = useState(null);
  let [positionData, setPositionData] = useState(null);
  let [positionIndex, setPositionIndex] = useState(null);
  let [getBedAssign, setBedAssign] = useState(null);
  const [spinner, setSpinner] = useState(false);


  useEffect(() => {
    setSpinner(true);
    var orgData = JSON.parse(window.localStorage.getItem("LOGINDATA"));
    orgData = orgData.loginInput.organization;
    setOrganizationId(orgData);   

    //dispatch(getAllBedAssignment);
    HttpLogin.axios().get("/api/dropdowns/get-all")
    .then((response) => {
     HttpLogin.axios().get("/api/bedConfig/getAll")
      .then((resp) => {     
        
      let  wingInputData = response.data.data.filter(k=>k.dropdown === "wing").map((i) => { return i.list })        
      setWingData(wingInputData[0]);
      let floorInputData = response.data.data.filter(k=>k.dropdown === "floorNo").map((i) => { return i.list })      
      setFloorNumber(floorInputData[0]);
      let wardInputData = response.data.data.filter(k=>k.dropdown === "wardName").map((i) => { return i.list })             
      setWardNumber(wardInputData[0]);
      let sideInputData = response.data.data.filter(k=>k.dropdown === "side").map((i) => { return i.list })                   
      setSideData(sideInputData[0]);     
      let roomInputData = response.data.data.filter(k=>k.dropdown === "roomNo").map((i) => { return i.list })             
     if(resp.data.data.length===0){    
        setRoomNumber(roomInputData[0]);
      }else{       
          roomInputData = roomInputData[0].filter(col => {        
            return !resp.data.data.filter(t=>t.organization === orgData).find(selected=> col.value === selected.roomNo)
          })
           
          setRoomNumber(roomInputData);
      }     
      let bedTypeInputData = response.data.data.filter(k=>k.dropdown === "bedType").map((i) => { return i.list })            
      setBedTypeData(bedTypeInputData[0]);
      let bedNoInputData = response.data.data.filter(k=>k.dropdown === "bedNo").map((i) => { return i.list })      
      setBedNumber(bedNoInputData[0]);
      let supervisionLevelInputData = response.data.data.filter(k=>k.dropdown === "supervisionLevel").map((i) => { return i.list })                   
      setSupervisionLevelData(supervisionLevelInputData[0]);
      let positionInputData = response.data.data.filter(k=>k.dropdown === "position").map((i) => { return i.list })                 
      setPositionData(positionInputData[0]);   
      setBedAssign(resp.data.data);
      setSpinner(false);
    })
  })  
    let arrayIndex = [];
    for(var a = 1;a<=20;a++){          
      
      arrayIndex.push(a);     
    }
    setPositionIndex(arrayIndex);

      
  }, []);
 

  let newFloorInputData = floorNumber != null && floorNumber.length > 0 && floorNumber.map((item, i) => {
    return (
      <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
    )
  })

  let newWingInputData = wingData != null && wingData.length > 0 && wingData.map((item, i) => {
    return (
      <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
    )
  })

  let newWardInputData = wardNumber != null && wardNumber.length > 0 && wardNumber.map((item, i) => {
    return (
      <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
    )
  })

  let newSideInputData = sideData != null && sideData.length > 0 && sideData.map((item, i) => {
    return (
      <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
    )
  })


  let newBedTypeInputData = bedTypeData != null && bedTypeData.length > 0 && bedTypeData.map((item, i) => {
    return (
      <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
    )
  })

  let newBedNoInputData = bedNumber != null && bedNumber.length > 0 && bedNumber.map((item, i) => {
    return (
      <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
    )
  })

  let newSupervisionLevelInputData = supervisionLevelData != null && supervisionLevelData.length > 0 && supervisionLevelData.map((item, i) => {
    return (
      <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
    )
  })
  
  let newPositionInputData = positionIndex != null && positionIndex.length > 0 && positionIndex.map((item, i) => {   
    return (
      <MenuItem key={i} value={item.toString()}>{item.toString()}</MenuItem>
    )
  })

  const [organizationred, setorganizationred] = useState(false);
  const handleInputChange = (event: any) => {
    if (event.target.name === "floorNo") {
      inputFormData.floorNo = event.target.value;
    } else if (event.target.name === "WardunitName") {
      inputFormData.wardName = event.target.value;
    } else if (event.target.name === "wing") {
      inputFormData.wing = event.target.value;
    } else if (event.target.name === "side") {
      inputFormData.side = event.target.value;    
    } else if (event.target.name === "roomNo") {
      inputFormData.roomNo = event.target.value;
    } else if (event.target.name === "bedType") {
      inputFormData.bedType = event.target.value;
    } else if (event.target.name === "bedNo") {
      inputFormData.bedNo = event.target.value;
    } else if (event.target.name === "bedFeatures") {
      inputFormData.bedFeatures = event.target.value;
    } else if (event.target.name === "supervisionLevel") {
      inputFormData.supervisionLevel = event.target.value;
    } else if (event.target.id === "securityMeasures") {
      inputFormData.securityMeasures = (event.target.value);
    } else if (event.target.name === "Positions") {
      inputFormData.position = (event.target.value);
    } else if (event.target.id === "colorred") {
      setorganizationred(event.target.checked);
    }

    setInputFormData({ ...inputFormData });
  }
 


  const [isPageLoaded, setPageLoaded] = useState(false);

  if (!isPageLoaded && !createBedAssignmentData.isLoading) {

    if (createBedAssignmentData.items !== null && createBedAssignmentData.items !== "") {      
      if(inputFormData.bedType === "2"){
        if (createBedAssignmentData.items[0].message.code === "MHC - 0200") {
          alert(createBedAssignmentData.items[0].message.description);
          window.location.href = "/MettlerDynamicBedAssign";         
        } else {
          alert(createBedAssignmentData.items[0].message.description);
        }
      }else{
        if (createBedAssignmentData.items.message.code === "MHC - 0200") {
          alert(createBedAssignmentData.items.message.description);
          window.location.href = "/MettlerDynamicBedAssign";  
        } else {
          alert(createBedAssignmentData.items.message.description);
        }
      }
     setSpinner(false);
    }
    setPageLoaded(true)
  }
  if (!createBedAssignmentData && createBedAssignmentData.isFormSubmit) {

    setTimeout(() => {
      setPageLoaded(false);

    }, (1000));
  }  

  const [isValid, setValid] = useState(true);
  const checkValidation = () => {
    errorMessage = "";
    setValid(true);
    var email = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/i;
    var phoneno = /^\(\d{3}\) \d{3}-\d{4}$/;
    if ((inputFormData.floorNo == null || inputFormData.floorNo == "" || inputFormData.floorNo.length == 0)) {
      setValid(false);
      document.getElementById("floorNo").focus();
      errorMessage = "select the floor no";
      return false;
    } else if ((inputFormData.wing == null || inputFormData.wing == "" || inputFormData.wing!.length == 0)) {
      setValid(false);
      document.getElementById("wing").focus();
      errorMessage = "Select Wing";
      return false;
    } else if ((inputFormData.wardName == null || inputFormData.wardName == "" || inputFormData.wardName.length == 0)) {
      setValid(false);
      document.getElementById("WardunitName").focus();
      errorMessage = "Ward/Unit Name is Not a Valid";
      return false;
    } else if ((inputFormData.side == null || inputFormData.side == "" || inputFormData.side!.length == 0)) {
      setValid(false);
      document.getElementById("side").focus();
      errorMessage = "Select side";
      return false;
    } else if ((inputFormData.roomNo == null || inputFormData.roomNo == "" || inputFormData.roomNo!.length == 0)) {
      setValid(false);
      document.getElementById("roomNo").focus();
      errorMessage = "select roomNo";
      return false;
    } else if ((inputFormData.bedType == null || inputFormData.bedType == "" || inputFormData.bedType!.length == 0)) {
      setValid(false);
      document.getElementById("bedtypes").focus();
      errorMessage = "select bedType";
      return false;
    } else if ((inputFormData.bedNo == null || inputFormData.bedNo == "" || inputFormData.bedNo!.length == 0 || phoneno.test(inputFormData.bedNo))) {
      setValid(false);
      document.getElementById("bedNo").focus();
      errorMessage = "enter valid bed number";
      return false;
    } else if ((inputFormData.bedFeatures == null || inputFormData.bedFeatures == "" || inputFormData.bedFeatures!.length == 0)) {
      setValid(false);
      document.getElementById("bedFeatures").focus();
      errorMessage = "select bedFeatures ";
      return false;
    } else if ((inputFormData.supervisionLevel == null || inputFormData.supervisionLevel == "" || inputFormData.supervisionLevel!.length == 0)) {
      setValid(false);
      document.getElementById("supervisionLevel").focus();
      errorMessage = "select supervision level ";
      return false;
    } else if ((inputFormData.securityMeasures == null || inputFormData.securityMeasures == "" || inputFormData.securityMeasures!.length == 0)) {
      setValid(false);
      document.getElementById("securityMeasures").focus();
      errorMessage = "enter valid securityMeasures ";
      return false;
    } else if ((inputFormData.position == null || inputFormData.position == "" || inputFormData.position!.length == 0)) {
      setValid(false);
      document.getElementById("Positions").focus();
      errorMessage = "enter the positions ";
      return false;
    }
    else {
      setValid(true);
      return true;
    }

  }

  const handleBedMasterView = ()=>{
    window.location.href = "/MettlerDynamicBedAssign";  
  }

  const handleEraseBedData = () =>{
    inputFormData.floorNo = "";
    inputFormData.wardName = "";
    inputFormData.wing = "";
    inputFormData.side = "";
    inputFormData.roomNo = "";
    inputFormData.bedType = "";
    inputFormData.bedNo = "";
    inputFormData.bedFeatures = "";
    inputFormData.supervisionLevel = "";
    inputFormData.securityMeasures = "";
    inputFormData.position = "";
  }
  
  const handleClickChange = () => {    
    let flag;    
    let newFlag;
    inputFormData.organization = organizationId;
     flag = getBedAssign != null && getBedAssign.map((i)=>{
      if((i.position === inputFormData.position && i.side === "1" && inputFormData.side === "2" && (i.bedType === "1" || i.bedType === "3") && inputFormData.bedType === "2") ||
       (i.position === inputFormData.position && i.side === "2" && inputFormData.side === "1" && (i.bedType === "1" || i.bedType === "3") && inputFormData.bedType === "2") ||
       (i.position === inputFormData.position && i.side === "3" && inputFormData.side === "4" && (i.bedType === "1" || i.bedType === "3") && inputFormData.bedType === "2") ||
       (i.position === inputFormData.position && i.side === "4" && inputFormData.side === "3" && (i.bedType === "1" || i.bedType === "3") && inputFormData.bedType === "2") ||
       (i.position === inputFormData.position && i.side === "5" && inputFormData.side === "6" && (i.bedType === "1" || i.bedType === "3") && inputFormData.bedType === "2") ||
       (i.position === inputFormData.position && i.side === "6" && inputFormData.side === "5" && (i.bedType === "1" || i.bedType === "3") && inputFormData.bedType === "2") ||
       (i.position === inputFormData.position && i.side === "7" && inputFormData.side === "8" && (i.bedType === "1" || i.bedType === "3") && inputFormData.bedType === "2") ||
       (i.position === inputFormData.position && i.side === "8" && inputFormData.side === "7" && (i.bedType === "1" || i.bedType === "3") && inputFormData.bedType === "2")){      
        alert("In this place not support to create Semi-Private");
        newFlag = false;
      }else{
        newFlag = true;
        return i;
      }
     })   
  //  console.log(JSON.stringify(newFlag));

     if((newFlag === true || newFlag === undefined) && inputFormData.bedNo !== "" && inputFormData.roomNo !== "" && inputFormData.bedType !== "" && inputFormData.position !== "" && inputFormData.side !== ""){
     setInputFormData({ ...inputFormData });
    dispatch(createBedAssignment(inputFormData));
    setSpinner(true);      
     }else{
      alert("Some data was missing to be entered");
     }
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
    <div className="bed-details">
      <div className="bed-details-child" />
      <div className="bed-details-child1" />
      <div className="bedline-div" />
      <div className="bedexpand-more-24px-parent">
        <img
          className="bedexpand-more-24px-icon"
          alt=""
          src="/expand-more-24px.svg"
        />
        <div className="beddetails">Bed Master Configuration</div>
      </div>
      <div className="bedorgForm-fields">
        <FormControl className="name-input13" variant="outlined">
          <InputLabel color="primary" ><span >Side<span style={{ color: 'red' }}>*</span>
          </span></InputLabel>
          <Select color="primary" size="medium" label="Side" id="side" name="side" value={inputFormData.side} onChange={handleInputChange}>
            {newSideInputData}
          </Select>
          <FormHelperText />
        </FormControl>

        <FormControl className="name-input13" variant="outlined">
          <InputLabel color="primary" ><span >Room<span style={{ color: 'red' }}>*</span>
          </span></InputLabel>
          <Select color="primary" size="medium" label="Room" id="roomNo" name="roomNo" value={inputFormData.roomNo} onChange={handleInputChange}>
          {roomNumber != null && roomNumber.length > 0 && roomNumber.map((item, i) => {
    return (
      <MenuItem key={i} value={item.id}>{item.value}</MenuItem>
    )
  })}
          </Select>
          <FormHelperText />
        </FormControl>
        <FormControl className="name-input13" variant="outlined">
          <InputLabel color="primary" ><span >Bed Type<span style={{ color: 'red' }}>*</span>
          </span></InputLabel>
          <Select color="primary" size="medium" label="Bed Type" id="bedType" name="bedType" value={inputFormData.bedType} onChange={handleInputChange}>
            {newBedTypeInputData}
          </Select>
          <FormHelperText />
        </FormControl>
      </div>

      <div className="bedorgForm-fields2">       
        <FormControl className="name-input13" variant="outlined">
          <InputLabel color="primary" ><span >Bed Number<span style={{ color: 'red' }}>*</span>
          </span></InputLabel>
          <Select color="primary" size="medium" label="Bed Type" id="bedNo" name="bedNo" value={inputFormData.bedNo} onChange={handleInputChange}>
            {newBedNoInputData}
          </Select>
          <FormHelperText />
        </FormControl>
        <FormControl className="name-input13" variant="outlined">
          <InputLabel color="primary" ><span >Bed Features<span style={{ color: 'red' }}>*</span>
          </span></InputLabel>
          <Select color="primary" size="medium" label="Bed Features" id="bedFeatures" name="bedFeatures" value={inputFormData.bedFeatures} onChange={handleInputChange}>
            <MenuItem value="1">Bed Feature 1</MenuItem>
            <MenuItem value="2">Bed Feature 2</MenuItem>
            <MenuItem value="3">Bed Feature 3</MenuItem>
            <MenuItem value="5">Bed Feature 4</MenuItem>
            <MenuItem value="6">Bed Feature 5</MenuItem>
          </Select>
          <FormHelperText />
        </FormControl>
        <FormControl className="name-input13" variant="outlined">
          <InputLabel color="primary" ><span >Supervision Level<span style={{ color: 'red' }}>*</span>
          </span></InputLabel>
          <Select color="primary" size="medium" label="Supervision Level" id="supervisionLevel" name="supervisionLevel" value={inputFormData.supervisionLevel} onChange={handleInputChange}>
          <MenuItem value="1">Administrative</MenuItem>
          <MenuItem value="2">Clinical</MenuItem>
          <MenuItem value="3">Educational</MenuItem>
          </Select>
          <FormHelperText />
        </FormControl>
      </div>
      <div className="bedorgForm-fields3">
        <TextField
          id="securityMeasures"
          className="destination-name-input"
          color="primary"
          variant="outlined"
          type="text"
          label={
            <span>
              Security Measures(for high-risk patients) <span style={{ color: 'red' }}>*</span>
            </span>
          }
          value={inputFormData.securityMeasures}
          onChange={handleInputChange}
          placeholder="Placeholder"
          size="medium"
          margin="none"
        />       
         <FormControl className="name-input13" variant="outlined">
          <InputLabel color="primary" ><span >Position<span style={{ color: 'red' }}>*</span>
          </span></InputLabel>
          <Select color="primary" size="medium" label="Position" id="Positions" name="Positions" value={inputFormData.position} onChange={handleInputChange}>           
          {newPositionInputData}
          </Select>
          <FormHelperText />
        </FormControl>
      </div>
      <div className="bedorgForm-fields8">
          
          <FormControl className="name-input13" variant="outlined">
            <InputLabel color="primary" ><span >Floor No<span style={{ color: 'red' }}>*</span>
            </span></InputLabel>
            <Select color="primary" size="medium" label="floorNo" id="floorNo" name="floorNo" value={inputFormData.floorNo} onChange={handleInputChange}>
            {newFloorInputData}
            </Select>
            <FormHelperText />
          </FormControl>
          <FormControl className="name-input13" variant="outlined">
            <InputLabel color="primary" ><span >Wing<span style={{ color: 'red' }}>*</span>
            </span></InputLabel>
            <Select color="primary" size="medium" label="Wing" id="wing" name="wing" value={inputFormData.wing} onChange={handleInputChange}>
            {newWingInputData}
            </Select>
            <FormHelperText />
          </FormControl>
          <FormControl className="name-input13" variant="outlined">
            <InputLabel color="primary" ><span >Ward/UnitName<span style={{ color: 'red' }}>*</span>
            </span></InputLabel>
            <Select color="primary" size="medium" label="WardunitName" id="WardunitName" name="WardunitName" value={inputFormData.wardName} onChange={handleInputChange}>
              {newWardInputData}
            </Select>
            <FormHelperText />
          </FormControl>
        </div>
      <div className="component-5011">
        <div className="cancel-group">
        <SecondaryButton
            label="View"
            secondaryButtonCursor="pointer"
            onCancelContainerClick={handleBedMasterView}
          />
          <div className="previous1">
            <img className="bg-icon3" alt="" src={bottomImage} />
            <div className="label5">Previous</div>
          </div>
          <SecondaryButton
            label="Cancel"
            secondaryButtonCursor="pointer"
            onCancelContainerClick={handleEraseBedData}
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
      <HIPAAComplianceContainer complianceDocumentation="Business Associate Agreement (BAA) with Covered Entities" />
      <div className="vector-parent">
        <img className="frame-child1" alt="" src={newImage} />
        <Button
          className="orgButtoncontainedtruefalse1"
          variant="outlined"
          color="primary"
          startIcon={<Icon>attachment_sharp</Icon>}
        >
          Attach Document
        </Button>
        <div className="orgLabel2">Risk AssessmentDocumentation</div>
      </div>
      <HIPAAComplianceContainer
        complianceDocumentation="HIPAA Compliance Policies and Procedures Documentation "
        propTop="1174px"
      />
    </div>
  </>
  );

};
const mapStateToProps = (state: any) => {
  const { deviceFormData, createBedAssignmentData } = state;
  return {
    deviceFormData, createBedAssignmentData
  };
};

export default connect(mapStateToProps)(BedMasterConfiguration)




