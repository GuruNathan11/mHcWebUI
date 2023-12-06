
import React, { Dispatch, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { createBrowserHistory } from "history";
import FieldCreateData from '../../../assets/data/FieldCreateData.json';
import { Dialog } from "primereact/dialog";
import { ListBox } from 'primereact/listbox';
import '../../../../src/css/style.css';
import { getAllFields, getAllForms, createFields } from "../../../store/actions/TreatmentPlan";
import {
  TextField,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@mui/material";
import { HttpLogin } from "../../../utils/Http";
interface IAddFields {
  match:any;
  dispatch: Dispatch<any>;
  getAllFieldsData:any;
  getAllFormsData:any;
}
const AddFields: React.FC<IAddFields> = ({
  match, dispatch, getAllFieldsData, getAllFormsData
}) => {
  const history = createBrowserHistory();
  let [inputFormData, setInputFormData] = useState(FieldCreateData);
  let [encryptPatientid, setEncryptPatientid] = useState(null);
  let [decryptPatientid, setDecryptPatientid] = useState(null);
  let [allFormName, setAllFormName] = useState([]);
  let [inputOrgData, setInputOrgData] = useState("");
  let [decryptName, setEncryptName] = useState(null);
  let [encryptName, setDecryptName] = useState(null);
  let [encryptVisitid, setEncryptVisitid] = useState(null);
  let [decryptVisitid, setDecryptVisitid] = useState(null);
  const [addFieldOptions, setFieldOptions] = useState(inputFormData.fieldOptions);
  useEffect(() => {

    var encryptInitial = match.params.patientid;
    setEncryptPatientid(encryptInitial);
    var CryptoJS = require("crypto-js");
    let decodePatientid = decodeURIComponent(encryptInitial);
    let decodeFinalPatientid = CryptoJS.AES.decrypt(decodePatientid.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
    setDecryptPatientid(decodeFinalPatientid);
  
    if(match.params.name !== ""){
      var encryptName = match.params.name;
      setEncryptName(encryptName);    
      let decodeNameid = decodeURIComponent(encryptName);
      let decodeFinalNameid = CryptoJS.AES.decrypt(decodeNameid.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
      setDecryptName(decodeFinalNameid);
      inputFormData.formName = decodeFinalNameid;
      setInputFormData({...inputFormData});
    }   
    var encryptVisit = match.params.visitId;
    setEncryptVisitid(encryptVisit);    
    let decodeVisitid = decodeURIComponent(encryptVisit);
    let decodeFinalVisitid = CryptoJS.AES.decrypt(decodeVisitid.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
    setDecryptVisitid(decodeFinalVisitid);
    var orgData = JSON.parse(window.localStorage.getItem("LOGINDATA"));
    orgData = orgData.loginInput.organization;
    HttpLogin.axios().get("api/org/getById/" + orgData)
        .then((res) => {
          if (res.data.message.code === "MHC - 0200") {
            setInputOrgData(res.data.data.id);
            console.log(JSON.stringify(res.data.data));
            inputFormData.organization = res.data.data.id;
            setInputFormData({ ...inputFormData });
            HttpLogin.axios().get("/api/forms/get")
            .then((resp) => {
              setAllFormName(resp.data.data.filter(t =>t.name !== "" && t.organization === res.data.data.id));       
            })
          } else {
              alert(res.data.message.description); 
              setInputOrgData("");               
          }
        })

      dispatch(getAllFields());   
      dispatch(getAllForms()); 
  }, [])

  const [isPageLoaded, setPageLoaded] = useState(false);

  if (!isPageLoaded && !getAllFieldsData.isLoading) {

      if (getAllFieldsData.items.length > 0) {
      //   if (visaCareCaseData.items.vendorDetails.id !== 0 && visaCareCaseData.items.vendorDetails.length > 0) {
      //     setFieldOptions(visaCareCaseData.items.vendorDetails);
      // }
      // if(visaCareCaseData.items.vendorDetails!==null && visaCareCaseData.items.vendorDetails!=="" && visaCareCaseData.items.vendorDetails!==undefined && visaCareCaseData.items.vendorDetails.length>0){
      //   for(var i=0;i++;i<visaCareCaseData.items.vendorDetails.length){
      //       switch(i){
      //           case 1:
      //               inputLetterTemplateData.vendorName1=visaCareCaseData.items.vendorDetails[i].vendorName;
      //               break;
      //           case 2:
      //               inputLetterTemplateData.vendorName2=visaCareCaseData.items.vendorDetails[i].vendorName;
      //               break;
      //           case 3:
      //               inputLetterTemplateData.vendorName3=visaCareCaseData.items.vendorDetails[i].vendorName;
      //               break;
      //           case 4:
      //               inputLetterTemplateData.vendorName4=visaCareCaseData.items.vendorDetails[i].vendorName;
      //               break;
      //           case 5:
      //               inputLetterTemplateData.vendorName5=visaCareCaseData.items.vendorDetails[i].vendorName;
      //               break;
      //       }
      //   }
      //  }
      //  setAllFormName(getAllFieldsData.items.filter(t => t.organization === inputOrgData));     
 
      }
      setPageLoaded(true);
     
  }
  if (!getAllFieldsData && getAllFieldsData.isFormSubmit) {

      setTimeout(() => {
          setPageLoaded(false);

      }, (1000));
  }

  
  const [islistDisplay, setlistDisplay] = useState(false);
  const fieldList = [
    { value: '', label: 'select' },
    { value: 'gender', label: 'gender' },
    { value: 'states', label: 'states' },
    { value: 'patient type', label: 'patient type' }

  ]
  let [newFieldList, setNewFieldList] = useState(fieldList);
  const addfieldList = [
    { value: 'op', label: 'op' },
    { value: 'patient', label: 'patient' },
    { value: 'checkup', label: 'checkup' }

  ] 
  let newFormName = allFormName != null && allFormName.length > 0 && allFormName.map((item, i) => {
    return (
      <MenuItem key={i} value={item.name}>{item.name}</MenuItem>
    )
  })
  // const handleGenderChange = (event: any) => {
  //   setNewGender([...newGender, {
  //     label: InputData.addNewFields,
  //     value: InputData.addNewFields
  //   }])
  // }

  // const handleSaveChanges = (event: any) => {
  //   setNewFieldList([...newFieldList, {
  //     label: InputData.addFields,
  //     value: InputData.addFields
  //   }])
  // }

  // const handleCheckForm = (event: any) => {
  //   allFormName.map((x) => {
  //     if (x.shortName === InputData.selectFormName) {
  //       return x.urlName ? window.location.href = x.urlName : alert("Form not created");
  //     }
  //   })
  // }


  const [addfieldDialog, setaddfieldDialog] = useState(false);

  const handleInputChange = (event: any) => {
    const {
      target: { value },
  } = event;
    if(event.target.name === "organization"){
      inputFormData.organization = event.target.value;
    }else if(event.target.name === "formName"){
      inputFormData.formName = event.target.value;
    }else if(event.target.id === "fieldLabel"){
      inputFormData.fieldLabel = event.target.value;
    }else if(event.target.id === "fieldPlaceholder"){
      inputFormData.fieldPlaceholder = event.target.value;
    }else if(event.target.name === "fieldSelect"){
      inputFormData.fieldSelect = event.target.value;
    }else if(event.target.name === "fieldSize"){
      inputFormData.fieldSize = event.target.value;
    }else if(event.target.id === "fieldType"){
      if (inputFormData.fieldType.indexOf(event.target.value) > -1) {
        inputFormData.fieldType = inputFormData.fieldType.replace(event.target.value, '');       
    } else {
        inputFormData.fieldType = inputFormData.fieldType = event.target.value;
    }
    inputFormData.fieldLabel = '';
    inputFormData.fieldSize = '';
    inputFormData.fieldPlaceholder = '';
    inputFormData.fieldSelect = '';
    inputFormData.fieldKeyLabel = '';
    inputFormData.fieldValue = '';
    inputFormData.fieldValue1 = [];
    inputFormData.mandatory = false;
    inputFormData.fieldType.indexOf(event.target.value);
    }else if(event.target.name === "fieldKeyLabel"){
      inputFormData.fieldKeyLabel = event.target.value;
    }
    //else if(event.target.id === "fieldValue"){
    //  inputFormData.fieldValue = event.target.value;
    //}
    else if(event.target.name === "fieldValue1"){
      inputFormData.fieldValue1 = typeof value === 'string' ? value.split(',') : value;
    } else if (event.target.name === "mandatory") {
      inputFormData.mandatory = event.target.checked;
      if(inputFormData.mandatory !== null && inputFormData.mandatory !== false){
        inputFormData.mandatory = true;
      }else{
        inputFormData.mandatory = false;
      }
    } else if (event.target.name === "fieldValue2") {
      inputFormData.fieldValue2 = event.target.checked;
      if(inputFormData.fieldValue2 !== null && inputFormData.fieldValue2 !== false){
        inputFormData.fieldValue2 = true;
      }else{
        inputFormData.fieldValue2 = false;
      }
    }
    
    setInputFormData({ ...inputFormData });
  }
  const showfieldDialog = () => {
    /*
    if(InputData.standardValue === ""){
      InputData.addFields = "";
      InputData.addNewFields = "";  
      setNewGender([]);
    }             
    */
    setaddfieldDialog(true);
  }

  const handleFieldChange = (index, event) => {
    let data = [...addFieldOptions];
    data[index][event.target.name] = event.target.value;

    setFieldOptions(data);
};

const handleFieldRemove = (index) => {
    const list = [...addFieldOptions];
    list.splice(index, 1);
    setFieldOptions(list);
};

const handleFieldAdd = () => {

    setFieldOptions([...addFieldOptions,
    {
        optionLabel: "",
        optionValue: false,       
        optionSize: ""
    }]);
};



const handleCheckForm = (event: any) => { 
  setInputFormData({ ...inputFormData });   
  if(inputFormData.formName === ""){
    alert("Please Select a form");
   }else{
    allFormName.map((x) => {
      if (x.name === inputFormData.formName) {
        var CryptoJS = require("crypto-js");
        var encryptId = CryptoJS.AES.encrypt(x.name, 'secret key 123');
        var setEncryptId = encodeURIComponent(encryptId.toString());
        return true ? (decryptPatientid !== "" && decryptPatientid !== undefined?window.location.href = "/MettlerAIMS/"+encryptPatientid+"/"+setEncryptId+"/"+encryptVisitid  : window.location.href = "/MettlerAIMS/"+setEncryptId ): alert("Form not created");
      }
    })    
   }  
}

  const handlePageSave =()=>{    
     setInputFormData({...inputFormData});
    var phrase=inputFormData.fieldLabel;
    for (var i=0; i<phrase.length; i++) {
        if(phrase.substring(i,i+1).includes(" ")) {
          console.log(JSON.stringify(phrase.substring(i+1,i+2)))             
            phrase = phrase.replace(phrase.substring(i,i+2),phrase.substring(i,i+2).toUpperCase());
        }
    }
    inputFormData.fieldId = phrase.replaceAll(" ", "_");
     setFieldOptions(addFieldOptions);    
     if(inputFormData.fieldType === "listbox"){
      inputFormData.fieldOptions = addFieldOptions;
      inputFormData.fieldOptions1 = inputFormData.fieldOptions.map(k=>{return k.optionLabel}); 
      inputFormData.fieldOptions = [
        {
          "optionLabel": "",
          "optionValue": true,
          "optionSize": ""
        }
      ]
     }
     else if(inputFormData.fieldType === "multiselect" || inputFormData.fieldType === "select" || inputFormData.fieldType === "radio"){
      inputFormData.fieldOptions1 = [""]; 
      setFieldOptions(addFieldOptions);    
      inputFormData.fieldOptions = addFieldOptions;  
     }
     console.log(JSON.stringify(addFieldOptions));
     console.log(JSON.stringify(inputFormData));
     if(inputFormData.formName !== ""){
      dispatch(createFields(inputFormData));
      alert("Field Created");
      setTimeout(() => {
        window.location.reload();
     }, 3000);
     }else if(inputFormData.formName === ""){
      alert("Please Select a form");
     }
     
  }
  return (
    <div style={{ backgroundColor: "white" }} className="p-grid p-fluid ">

      <div style={{ border: "1px solid #DEE5ED", position: 'relative', height: '1px', top: '52px', width: "calc(100% - 76px)", left: "34px" }} />


      <div className="p-col-3" style={{position:"relative",left:"26px"}}>
        <div className="p-grid" >
          <h3 style={{ left: "500px", position: 'relative', top: '-26px',marginTop:'40px',whiteSpace:"nowrap" }}> Add/edit Form fields</h3>
          <div className="p-col-12 p-md-12" style={{fontFamily:"poppins"}}>
            Select the Form Name
          </div>
          <div className="p-col-12 p-md-12">
            <FormControl className="name-input13" variant="outlined" style={{ width: '-webkit-fill-available' }}>      
              <Select id="formName" name="formName" disabled={decryptPatientid !== ""} value={inputFormData.formName} required onChange={handleInputChange}>            
              <MenuItem  value="">Select</MenuItem>
                {newFormName}
              </Select>
              <FormHelperText />
            </FormControl>
            {/* <select id="selectFormName" name="selectFormName" style={{ width: '95%', height: '34px' }} onChange={handleInputChange} value={InputData.selectFormName} required >
              <option value="">Select</option>
              {listFormName}
            </select> */}
          </div>
          <div className="p-col-12 p-md-12">
            <Button style={{ backgroundColor: "#133C93", borderColor: "#133C93" }} type="button" label=" Customize Form" onClick={null}></Button>
          </div>

          <div className="p-col-12 p-md-12">
            <Button style={{ backgroundColor: "#133C93", borderColor: "#133C93" }} type="button" label="Preview Form" onClick={handleCheckForm}></Button>
          </div>
          <div className="p-col-12 p-md-12"> </div>
          <div className="p-col-12 p-md-12">
            <Button style={{ backgroundColor: "#133C93", borderColor: "#133C93" }} type="button" label="Delete Form" onClick={null}></Button>
          </div>
          <div className="p-col-12 p-md-12">
            <Button style={{ backgroundColor: "#133C93", borderColor: "#133C93" }} type="button" label="Show Default Form" onClick={null}></Button>
          </div>
        </div>
      </div>
      <div className="p-col-1"></div>

      <div className="p-col-8" >
        <div className="p-grid" style={{ position: "relative", top: "99px" }}>
          <div className="p-col-3 p-md-3">
            <Button style={{ backgroundColor: "#133C93", borderColor: "#133C93",whiteSpace:"nowrap",width:"auto" }} type="button" label="Add New Field/Question" onClick={null}></Button>
          </div>
          <div className="p-col-9 p-md-9"> </div>
          <div className="p-col-3 p-md-3"  style={{fontFamily:"poppins"}}>
            Field Type:
          </div>
        <div className="p-col-9 p-md-9">
            <Checkbox id="fieldType" name="fieldType" checked={inputFormData.fieldType === "text"} value={"text"} onChange={handleInputChange} />   Plain text &nbsp;            
            <Checkbox id="fieldType" name="fieldType" checked={inputFormData.fieldType === "date"} value={"date"} onChange={handleInputChange} />   DatePicker&nbsp;            
            <Checkbox id="fieldType" name="fieldType" checked={inputFormData.fieldType === "label"} value={"label"} onChange={handleInputChange} />   Label&nbsp;
            <Checkbox id="fieldType" name="fieldType" checked={inputFormData.fieldType === "select"} value={"select"} onChange={handleInputChange} />   Drop Down  &nbsp;
            <Checkbox id="fieldType" name="fieldType" checked={inputFormData.fieldType === "checkbox"} value={"checkbox"} onChange={handleInputChange} />   Check Box&nbsp;
            <Checkbox id="fieldType" name="fieldType" checked={inputFormData.fieldType === "empty"} value={"empty"} onChange={handleInputChange} />   Empty&nbsp;
            <Checkbox id="fieldType" name="fieldType" checked={inputFormData.fieldType === "multiselect"} value={"multiselect"} onChange={handleInputChange} />   MultiSelect  &nbsp;
            <div className="p-col-12 p-md-12"> </div>
            {/*<Checkbox id="fieldType" name="fieldType" checked={inputFormData.fieldType === "listbox"} value={"listbox"} onChange={handleInputChange} />   List Box&nbsp;*/}
            <Checkbox id="fieldType" name="fieldType" checked={inputFormData.fieldType === "radio"} value={"radio"} onChange={handleInputChange} />   Radio&nbsp;
            {/*<Checkbox id="fieldType" name="fieldType" checked={inputFormData.fieldType === "B"} value={"B"} onChange={handleInputChange} />   TextArea&nbsp;
            <Checkbox id="fieldType" name="fieldType" checked={inputFormData.fieldType === "I"} value={"I"} onChange={handleInputChange} />   Notes&nbsp;
            <Checkbox id="fieldType" name="fieldType" checked={inputFormData.fieldType === "M"} value={"M"} onChange={handleInputChange} />   Editable ListValues&nbsp;
            <Checkbox id="fieldType" name="fieldType" checked={inputFormData.fieldType === "N"} value={"N"} onChange={handleInputChange} />   SingleSelectListBox&nbsp;*/}
             {/* <div className="p-col-12 p-md-12"> </div>
          <Checkbox id="fieldType" name="fieldType" checked={inputFormData.fieldType === "O"} value={"O"} onChange={handleInputChange} />   Signature&nbsp;
            <Checkbox id="fieldType" name="fieldType" checked={inputFormData.fieldType === "P"} value={"P"} onChange={handleInputChange} />   Standard Field&nbsp;*/}
          </div>
          {islistDisplay &&

            <div className="p-col-12 p-md-12">
              <div className="p-grid">

                <div className="p-col-3 p-md-3">
                  Fields
                </div>
                <div id="removePadding" className="p-col-6 p-md-5">

                  <Dropdown options={newFieldList} id="addFields" onChange={handleInputChange} value={null} required />
                </div>
                <div id="removePadding" className="p-col-2 p-md-2">
                  <Button style={{ float: "left", width: "inherit" }} icon="pi pi-plus" onClick={showfieldDialog} />

                </div>
                <div className="p-col-2 p-md-2">

                </div>
              </div>

            </div>
          }
          {inputFormData.fieldType !== "empty" && (<>
          <div className="p-col-3 p-md-3" style={{fontFamily:"poppins"}}>
            Insert a Field Label :
          </div>
          <div className="p-col-5 p-md-5">
          <TextField
              style={{ width: "354px" }}
              id="fieldLabel" value={inputFormData.fieldLabel} onChange={handleInputChange}
              className="name-input13"
              color="primary"
              variant="outlined"
              type="text"            
              size="medium"
              margin="none"
              required
            />
           {/* <FormControl className="name-input13" variant="outlined" style={{ width: '354px' }}>     
              <Select id="selectFormName" name="selectFormName" value={inputFormData.selectFormName} required onChange={handleInputChange}>
              <MenuItem  value="">Select</MenuItem>
                {newFormName}
              </Select>
              <FormHelperText />
          </FormControl>*/}
          </div>
          <div className="p-col-4 p-md-4"> </div>
         
          
           <div className="p-col-3 p-md-3" style={{fontFamily:"poppins"}}>
            Field Placeholder :
          </div>
          <div className="p-col-9 p-md-9">
          <TextField
              style={{ width: "354px" }}
              id="fieldPlaceholder" value={inputFormData.fieldPlaceholder} onChange={handleInputChange}
              className="name-input13"
              color="primary"
              variant="outlined"
              type="text"
            
              size="medium"
              margin="none"
              required
            />
            {/* <InputTextarea id="field" onChange={handleInputChange} value={InputData.field} required autoWidth={false} /> */}
          </div>
          {(inputFormData.fieldType === "multiselect") &&(<>
          <div className="p-col-3 p-md-3"  style={{fontFamily:"poppins"}}>
            Field Select
          </div>
          <div className="p-col-9 p-md-9">
          <FormControl className="name-input13" variant="outlined" style={{ width: '354px' }}>         
              <Select name="fieldSelect" value={inputFormData.fieldSelect} required onChange={handleInputChange}>
              <MenuItem  value="">Select</MenuItem>   
              <MenuItem  value="one">Any One</MenuItem>         
              <MenuItem  value="many">More than One</MenuItem>   
              </Select>
              <FormHelperText />
            </FormControl>
          </div></>)}
                     
                                            {(inputFormData.fieldType === "multiselect" || inputFormData.fieldType === "select" || inputFormData.fieldType === "listbox" || inputFormData.fieldType === "radio") && ((addFieldOptions.map((addField, index) => (
                                <div key={index} style={{display:'flex'}} className="p-col-12 p-md-12">
                                    <div style={{fontFamily:"poppins",position:'relative',left:'-16px'}} className="p-col-12 p-md-3">
                                        Option Label:
                                    </div>
                                    <div id="removePadding"  className="p-col-12 p-md-5">
                                    <TextField
              style={{ width: "354px"}}
              id="optionLabel" name="optionLabel" value={addField.optionLabel} onChange={(event) => handleFieldChange(index, event)}
              className="name-input13"
              color="primary"
              variant="outlined"
              type="text"            
              size="medium"
              margin="none"
              required
            />                                     
                                    </div>
                                    <div style={{alignSelf:'center'}} className="p-col-4 p-md-2"> {addFieldOptions.map((addField, index) => (
                                                addFieldOptions.length - 1 === index &&
                                                <Button icon="pi pi-plus" iconPos="right" label="Add Option" onClick={handleFieldAdd} style={{ width: "max-content",float: "right", backgroundColor: "#133C93", borderColor: "#133C93",position:"relative",left:"25px"  }}></Button>
                                            ))}</div>
                                    <div style={{alignSelf:'center',position:'relative',left:'-45px'}} className="p-col-12 p-md-2">
                                        {addFieldOptions.length !== 1 && (
                                            <Button icon="pi pi-plus" iconPos="right" label="Remove" onClick={() => handleFieldRemove(index)} style={{float: "right", width: 'max-content', backgroundColor: "#133C93", borderColor: "#133C93",position:"relative",left:"50px" }}></Button>
                                        )}
                                    </div>
                                    
                                </div>
                            ))))}                                     
                            {/*inputFormData.fieldType ==="listbox" ?(<>
          <div className="p-col-3 p-md-3" style={{fontFamily:"poppins"}}>
            Field Value :
          </div>
          <div className="p-col-9 p-md-9">
          <FormControl className="name-input13" variant="outlined" style={{ width: '354px' }}>      
              <Select id="fieldValue1" name="fieldValue1" multiple={true} value={inputFormData.fieldValue1} required onChange={handleInputChange}>                          
                {addFieldOptions.map((item, i) => {
    return (
      <MenuItem key={i} value={item.optionLabel}>{item.optionLabel}</MenuItem>
    )
  })}
              </Select>
              <FormHelperText />
            </FormControl>        
       
          </div></>):inputFormData.fieldType ==="checkbox"?<>
          <div className="p-col-3 p-md-3" style={{fontFamily:"poppins"}}>
            Field Value :
          </div>
          <div className="p-col-9 p-md-9">
          <Checkbox id="fieldValue2" name="fieldValue2" checked={inputFormData.fieldValue2 === true} value={inputFormData.fieldValue2} onChange={handleInputChange} /> {inputFormData.fieldValue2 === true?"True":"False"}
          </div>
          </>:<>
          <div className="p-col-3 p-md-3" style={{fontFamily:"poppins"}}>
            Field Value :
          </div>
          <div className="p-col-9 p-md-9">
          <TextField
              style={{ width: "354px" }}
              id="fieldValue" value={inputFormData.fieldValue} onChange={handleInputChange}
              className="name-input13"
              color="primary"
              variant="outlined"
              type="text"
            
              size="medium"
              margin="none"
              required
            />           
</div></>*/}
          </>)}
          <div className="p-col-3 p-md-1"  style={{fontFamily:"poppins"}}>
          <Checkbox id="mandatory" name="mandatory" checked={inputFormData.mandatory === true} value={inputFormData.mandatory} onChange={handleInputChange} />  
          {/*<RadioGroup name="mandatory" value={inputFormData.mandatory} onChange={handleInputChange}                       
                        row>
                        <div className="frame-parent7" style={{ color: 'darkslategray', flexWrap: "nowrap", gap: "30px" }}>
                            <FormControlLabel                                
                                label="If you select, whether this field is mandatory ? " value={inputFormData.mandatory}
                                labelPlacement="end"
                                control={<Radio color="primary" size="medium" />}

                            />   
          </div>          
          </RadioGroup>*/}
          </div>
          <div className="p-col-3 p-md-11"  style={{fontFamily:"poppins"}}>
          If you select, whether this field is mandatory ? 
          </div>
          <div className="p-col-3 p-md-3"  style={{fontFamily:"poppins"}}>
            Field Size :
          </div>
          <div className="p-col-5 p-md-5">
          <FormControl className="name-input13" variant="outlined" style={{ width: '354px' }}>  
          {(inputFormData.fieldType ==="listbox" || inputFormData.fieldType ==="radio") ?(      
            <Select name="fieldSize" value={inputFormData.fieldSize} required onChange={handleInputChange}>
            <MenuItem  value="Large">Large</MenuItem>
            </Select>  
            ):(inputFormData.fieldType ==="date") ?(      
              <Select name="fieldSize" value={inputFormData.fieldSize} required onChange={handleInputChange}>
              <MenuItem  value="Medium">Medium</MenuItem>     
              <MenuItem  value="Large">Large</MenuItem>
              </Select>  
              ):  <Select name="fieldSize" value={inputFormData.fieldSize} required onChange={handleInputChange}>
              
              <MenuItem  value="">Select</MenuItem>   
              <MenuItem  value="Small">Small</MenuItem>   
              <MenuItem  value="Medium">Medium</MenuItem>         
              <MenuItem  value="Large">Large</MenuItem>   
              
              </Select>}
              <FormHelperText />
            </FormControl>
            {/* <InputText id="indentation" onChange={handleInputChange} value={InputData.indentation} required /> */}
          </div>
          <div className="p-col-4 p-md-4"> </div> 
        </div>
      </div>
      <div className="p-col-12 p-md-12">  </div>
      <div className="p-col-6 p-md-6">  </div>

      <div className="p-col-3 p-md-3" style={{ position: "relative", top: "120px" }}>
        <Button style={{ float: "left", width: "inherit", backgroundColor: "#133C93", borderColor: "#133C93" }} icon="pi pi-save" label="Save" onClick={handlePageSave} />
      </div>
      <div className="p-col-3 p-md-3">  </div>

      <div className="p-col-8 p-md-8">  </div>
      <div className="p-col-4 p-md-4" style={{ position: "relative", top: "74px" }}>
        <Button icon="pi pi-step-backward" style={{ float: "right", width: 'fit-content', backgroundColor: "#133C93", borderColor: "#133C93" }} label="Back" onClick={() => history.goBack()} />

      </div>
      {/*
      <Dialog header="Add fields" visible={addfieldDialog} style={{ width: '50vw', overflow: 'scroll' }} modal={true} onHide={() => setaddfieldDialog(false)}>
        {
          addfieldDialog &&
          (
            <div className="p-grid">

              <div className="p-col-3 p-md-3">
                Add Fields
              </div>
              <div className="p-col-5 p-md-5">
                <InputText id="addFields" onChange={handleInputChange} value={InputData.addFields} required />
              </div>
              <div className="p-col-4 p-md-4">  </div>


              <div className="p-col-2 p-md-3">
                Add list
              </div>
              <div className="p-col-4 p-md-5">
                <InputText id="addNewFields" onChange={handleInputChange} value={InputData.addNewFields} required />
              </div>
              <div className="p-col-2 p-md-2">
                <Button style={{ float: "left" }} icon="pi pi-plus" onClick={null} />
              </div>
              <div className="p-col-4 p-md-2">  </div>
              <div className="p-col-3 p-md-3">  </div>

              <div className="p-col-6 p-md-6">
                <ListBox id="addFields" onChange={handleInputChange} options={newGender} value={InputData.addFields} style={{ height: "100px" }} />

              </div>
              <div className="p-col-3 p-md-3">  </div>
              <div className="p-col-4 p-md-4">  </div>
              <div className="p-col-4 p-md-4" > <Button style={{ width: 'fit-content' }} icon="pi pi-plus" label="Save" onClick={null} /> </div>
              <div className="p-col-4 p-md-4">  </div>
              <div className="p-col-12 p-md-12">  </div>



            </div>
          )
        }

      </Dialog>
      */}
    </div>






  );
};

const mapStateToProps = (state: any) => {
  const { deviceFormData, getAllFieldsData, getAllFormsData } = state;
  return {
    deviceFormData, getAllFieldsData, getAllFormsData
  };
};
export default connect(mapStateToProps)(AddFields)