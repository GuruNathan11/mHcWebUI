
import React, { Dispatch, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { createBrowserHistory } from "history";
import formNameDataJSON from '../../../assets/data/Forms_JSON/formNameData.json';
import FormCreateData from '../../../assets/data/FormCreateData.json';
import { InputText } from "primereact/inputtext";
import {
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  TextField,
  MenuItem
} from "@mui/material";
import "././../Bed/BedMasterConfiguration.css";
import { HttpLogin } from "../../../utils/Http";
import { createForms,getAllForms,deleteSelectedFields } from "../../../store/actions/TreatmentPlan";

interface IViewFields {
  match:any;
  dispatch: Dispatch<any>;
}
const ViewFields: React.FC<IViewFields> = ({
  dispatch,match
}) => {
  const history = createBrowserHistory();
  let [allFormName, setAllFormName] = useState([]);
  let [inputOrgData, setInputOrgData] = useState("");
  let [inputFormName, setInputFormName] = useState("");
  let [encryptPatientid, setEncryptPatientid] = useState(null);
  let [decryptPatientid, setDecryptPatientid] = useState(null);
  let [encryptVisitid, setEncryptVisitid] = useState(null);
  let [decryptVisitid, setDecryptVisitid] = useState(null);
  let [encryptNameid, setEncryptNameid] = useState(null);
  let [decryptNameid, setDecryptNameid] = useState("");
  let [tableData, setTableData] = useState(new Array<any>());

  useEffect(() => {

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
    if(match.params.name !== ""){
      var encryptName = match.params.name;
      setEncryptNameid(encryptName);    
      let decodeNameid = decodeURIComponent(encryptName);
      let decodeFinalNameid = CryptoJS.AES.decrypt(decodeNameid.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
      setDecryptNameid(decodeFinalNameid);
      inputFormName = decodeFinalNameid;
      setInputFormName(inputFormName);
      HttpLogin.axios().get("/api/forms/getByName/"+decodeFinalNameid)
      .then((response) => {
        if (response.data.message.code === "MHC - 0200") {
          setTableData(response.data.data.fields);
          }else{
            setTableData([]);
          }            
      })
    }
    console.log(JSON.stringify(decodeFinalVisitid));
    //console.log(JSON.stringify(decodeFinalPatientid));
    var orgData = JSON.parse(window.localStorage.getItem("LOGINDATA"));
    orgData = orgData.loginInput.organization;
    HttpLogin.axios().get("api/org/getById/" + orgData)
        .then((res) => {
            if (res.data.message.code === "MHC - 0200") {
            
              inputOrgData = res.data.data.id;
              setInputOrgData(res.data.data.id);             
              inputFormData.organization = res.data.data.id;
              setInputFormData({ ...inputFormData });
              HttpLogin.axios().get("/api/forms/get")
              .then((resp) => {
                if (resp.data.message.code === "MHC - 0200") {

                setAllFormName(resp.data.data.filter(t =>t.name !== "" && t.organization === res.data.data.id));       
                }else{
                  setAllFormName([]);
                }
              })
            } else {
                alert(res.data.message.description);                
            }
        })             
  }, [])
 
  
  let [inputFormData, setInputFormData] = useState(FormCreateData);

  const handleInputChange = (event: any) => {
    if (event.target.id === "inputFormName") {
      inputFormData.name = event.target.value;
    
    }else if(event.target.name === "selectFormName") {
      inputFormName = event.target.value;
      setInputFormName(inputFormName);
      console.log(JSON.stringify(inputFormName));
      HttpLogin.axios().get("/api/forms/getByName/"+inputFormName)
      .then((response) => {       
        if (response.data.message.code === "MHC - 0200") {
          console.log(JSON.stringify(response.data));
          setTableData(response.data.data.fields);
          }else{
            setTableData([]);
          }            
      })
    }
    setInputFormData({ ...inputFormData });
  }


  const handleAddForm = (event: any) => { 
    setInputFormData({ ...inputFormData });  
    if(inputFormName === ""){
      alert("Please Select a form");
     }else{ 
    allFormName.map((x) => {
      if (x.name === inputFormName) {
        var CryptoJS = require("crypto-js");
        var encryptId = CryptoJS.AES.encrypt(x.name, 'secret key 123');
        var setEncryptId = encodeURIComponent(encryptId.toString());
        return true ? (decryptPatientid !== "" && decryptPatientid !== undefined?window.location.href = "/mettlerAddFields/"+encryptPatientid+"/"+setEncryptId+"/"+encryptVisitid : window.location.href = "/mettlerAddFields/"+setEncryptId ): alert("Form not created");
      }
    })   
  }
  }

 
  
  const handleCheckForm = (event: any) => {
    // allFormName.map((x) => {
    //   if (x.shortName === inputFormData.selectFormName) {
    //     return x.urlName ? window.location.href = x.urlName : alert("Form not created");
    //   }
    // })
    setInputFormData({ ...inputFormData });   
    if(inputFormName === ""){
      alert("Please Select a form");
     }else{
    allFormName.map((x) => {
      if (x.name === inputFormName) {
        var CryptoJS = require("crypto-js");
        var encryptId = CryptoJS.AES.encrypt(x.name, 'secret key 123');
        var setEncryptId = encodeURIComponent(encryptId.toString());
        return true ? (decryptPatientid !== "" && decryptPatientid !== undefined?window.location.href = "/MettlerAIMS/"+encryptPatientid+"/"+encryptNameid+"/"+encryptVisitid  : window.location.href = "/MettlerAIMS/"+setEncryptId ): alert("Form not created");
      }
    }) 
  }   
  }
 
  let newFormName = allFormName != null && allFormName.length > 0 && allFormName.map((item, i) => {
    return (
      <MenuItem key={i} value={item.name}>{item.name}</MenuItem>
    )
  })

  const handleCreateAddForm = (event: any) => {
    setInputFormData({ ...inputFormData });
    if(inputFormData.name !== ""){
      dispatch(createForms(inputFormData));
      alert("New Form Created");
      setTimeout(() => {
        window.location.reload();
     }, 3000);
    }else{
      alert("Enter form Name");
    }
   
  }

  let[serial, setSerial] = useState(1);
  function getSerial(){
    return serial++;
  }


  const dataDisplayType = (rowData:any)=>{

    return rowData.fieldType !== ""? <span>{rowData.fieldType.toUpperCase()}</span>:<span>--</span>;
  }

  const dataDisplayValue = (rowData:any)=>{
    return rowData.fieldValue !== "" && rowData.fieldValue !== null?<span>{rowData.fieldValue}</span>:<span>--</span>;
  }

  const dataDelete = (rowData:any) => {
    return rowData.id !== null && rowData.id !== undefined ? <a onClick={()=>{deleteNewField(rowData)}}><span style={{color:'orangered',border:'1px solid orangered',padding:'2px 12px 2px 12px'}}>Delete</span></a>:<span></span>;
  }

  const deleteNewField = (rowData) => {    
    dispatch(deleteSelectedFields(rowData.id));
  }

  const handleCreateNewForm = (event: any) => {
    window.location.href = "/MettlerCreateNewForm";
  }

  return (
    <div id="removePaddingTop" style={{ backgroundColor: "white", width:'calc(100% - 20px)'}}  className="p-grid p-fluid ">
      <div id="removePadding" className="p-col-12 p-md-12">

        <h3 style={{ fontWeight: 600, position: 'relative', marginTop:'30px', top:'-10px', left: '599px', width: 'fit-content', color: "#292F52", fontFamily: "poppins" }}> Add/edit Field Details</h3>

      </div>
      <div></div>
      <div style={{ border: "1px solid #DEE5ED", position: 'relative', height: '1px', top: '-17px', width: "calc(100% - 10px)" }} />
      <div id="removePadding" className="p-col-2 p-md-2" style={{left:"496px",position:"relative"}}>
        {/*<Button style={{ backgroundColor: "#133C93", borderColor: "#133C93",whiteSpace:"nowrap",width:"auto" }} type="button" label="Create New Form Fields" onClick={handleCreateNewForm}></Button>*/}
      </div>

      <div id="removePadding" className="p-col-2 p-md-2"style={{left:"530px",position:"relative"}}>
        {/*<Button style={{ backgroundColor: "#133C93", borderColor: "#133C93",whiteSpace:"nowrap",width:"auto" }} type="button" label="View/Update Form Fields" onClick={null}></Button>*/}
      </div>
      <div id="removePadding" className="p-col-8 p-md-8">
      </div>
      <div id="removePadding" className="p-col-12 p-md-12"></div>
      {decryptPatientid === "" &&<>
      <div id="removePadding" className="p-col-12 p-md-1">
        Form Name:
      </div>
      <div id="removePadding" className="p-col-12 p-md-4">
      <TextField
              style={{ width: "354px" }}
              id="inputFormName" value={inputFormData.name} onChange={handleInputChange}
              className="name-input13"
              color="primary"
              variant="outlined"
              type="text"            
              size="medium"
              margin="none"
              required
            />
        {/* <InputText id="addFormName" onChange={handleInputChange} value={inputFormData.addFormName} required /> */}
      </div>
      <div id="removePadding" className="p-col-12 p-md-7">

      </div>
    
      <div id="removePadding" className="p-col-12 p-md-2">
      </div>
      <div id="removePadding" className="p-col-12 p-md-4">
        <Button label="Create New Form" style={{ width: 'fit-content', backgroundColor: "#133C93", borderColor: "#133C93" }} onClick={handleCreateAddForm}></Button>
      </div>
      <div id="removePadding" className="p-col-12 p-md-6">
      </div>
      </>}
      <div className="p-col-3">
        <div className="p-grid">

          <div id="removePadding" className="p-col-12 p-md-12" style={{ fontFamily: "poppins", fontWeight: 400, }}>
            Select the Form Name
          </div>
          <div id="removePadding" className="p-col-12 p-md-12">
            <FormControl className="name-input13" variant="outlined" style={{ width: '354px' }}>
              <InputLabel color="primary" >Select<span>
              </span></InputLabel>
              <Select  size="medium" label="Select" name="selectFormName" disabled={decryptPatientid !== ""} value={inputFormName} required onChange={handleInputChange}>
                {newFormName}
              </Select>
              <FormHelperText />
            </FormControl>
            {/* <select  name="selectFormName" style={{ width: '95%' }} onChange={handleInputChange} value={inputFormData.selectFormName} required >
              <option value="">Select</option>
              
            </select> */}
          </div>
          {/*
          <div id="removePadding" className="p-col-12 p-md-12">
            <Button style={{ backgroundColor: "#133C93", borderColor: "#133C93" }} type="button" label="Customize Form" onClick={null}></Button>
          </div>
          */}
          <div id="removePadding" className="p-col-12 p-md-12">
            <Button style={{ backgroundColor: "#133C93", borderColor: "#133C93",top:'9px',position:"relative" }} type="button" label="Preview Form" onClick={handleCheckForm}></Button>
          </div>
          <div id="removePadding" className="p-col-12 p-md-12"> </div>
          <div id="removePadding" className="p-col-12 p-md-12">
            <Button style={{ backgroundColor: "#133C93", borderColor: "#133C93" }} type="button" label="Delete Form" onClick={null}></Button>
          </div>

        </div>
      </div>
      <div className="p-col-1"></div>

      <div className="p-col-8" >
        <div className="p-grid">
          <div id="removePadding" className="p-col-12 p-md-12"> </div>

          <div id="removePadding" className="p-col-5 p-md-5">
            <Button style={{ position: "relative", top: "22px", backgroundColor: "#133C93", borderColor: "#133C93" }} type="button" label="Add New Fields/Question " onClick={handleAddForm}></Button>
          </div>
          <div id="removePadding" className="p-col-7 p-md-7"> </div>


        </div>
      </div>
      <DataTable style={{ border: '0px', top: "6px", left: "10px" }}
        value={tableData}
        selectionMode="multiple"
        rows={50} scrollable={true}
        responsive={true} 
        emptyMessage="No records found">
        <Column selectionMode="multiple" headerStyle={{ width: '10%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '15px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '8%', background: '#FFF' }}></Column>
        <Column field="" header="S.No" body={getSerial} headerStyle={{ position: "relative",/* left: "-12px",  */whiteSpace: "nowrap", width: '12%', textAlign: 'start', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '15px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '16%', background: '#FFF' }} />
        <Column field="fieldType" header="Display Type" headerStyle={{ position: "relative", /*left: "-100px", */whiteSpace: "nowrap", width: '26%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '15px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '31%', background: '#FFF' }} body={dataDisplayType}  />
        <Column field="fieldLabel" header="Label" headerStyle={{ position: "relative",/* left: "-105px",*/ whiteSpace: "nowrap", width: '22%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '15px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '22%', background: '#FFF' }} body={""} />
        <Column field="fieldValue" header="Display Value"  headerStyle={{ position: "relative",/* left: "24px",*/ whiteSpace: "nowrap", width: '102%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '15px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '105%', background: '#FFF',textAlign:'center' }} body={dataDisplayValue} />
        <Column field="fieldSize" header="Field Size" headerStyle={{ position: "relative",/* left: "94px",*/ whiteSpace: "nowrap", width: '17%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '15px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '22%', background: '#FFF' }} body={""} />
        <Column field="mandatory" header="Delete" headerStyle={{ position: "relative",/* left: "35px",*/ whiteSpace: "nowrap", width: '55%', background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '15px', fontWeight: 500 }} style={{ borderLeft: '0px',textAlign:'center', borderRight: '0px', width: '33%', background: '#FFF' }} body={dataDelete} />

      </DataTable>
      {/* <DataTable paginatorPosition="bottom" selectionMode="single"
        value={null}
        paginator={true} rows={10}
        alwaysShowPaginator={false}
        scrollable={true} scrollHeight="200px"
        header={""}
        emptyMessage="No Record Found">
        <Column field="" style={{ width: "5%" }} header="s.no" />
        <Column field="" body={""} style={{ width: "10%" }} header="Select" />
        <Column field="" body={""} style={{ width: "10%" }} header="Delete" />
        <Column field="" body={""} header="Display text" />
        <Column field="" body={""} style={{ width: "12%" }} header="Default value" />
        <Column field="" body={""} style={{ width: "12%" }} header="Position" />
      </DataTable> */}

      <div className="p-col-12 p-md-12">  </div>
      <div id="removePadding" className="p-col-8 p-md-8">  </div>
      <div className="p-col-4 p-md-4">
        <Button  icon="pi pi-step-backward" style={{ float: "right", width: 'fit-content', backgroundColor: "#133C93", borderColor: "#133C93" }} label="Back" onClick={() => history.goBack()} />

      </div>
    </div>

  );
};

const mapStateToProps = (state: any) => {
  const { deviceFormData } = state;
  return {
    deviceFormData
  };
};
export default connect(mapStateToProps)(ViewFields)