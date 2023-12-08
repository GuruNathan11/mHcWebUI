import React, { useState, Dispatch, useEffect } from "react";
import { connect } from "react-redux";
import arrowRise from './../../../assets/images/mettler_images/ArrowRise-s.svg';
import switchVertical from './../../../assets/images/mettler_images/switch-vertical.svg';
import filterList from './../../../assets/images/mettler_images/filter_list.svg';
import addSymbol from './../../../assets/images/mettler_images/addSymbol.svg';
import searchImage from './../../../assets/images/mettler_images/Search.svg';
import speedometerEdit from './../../../assets/images/mettler_images/speedometerImage.svg';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { deletePatientById, getAllPatient } from "../../../store/actions/Patient";
import moment from "moment";
import { Dialog, DialogContentText } from "@mui/material";
import { HttpLogin } from "../../../utils/Http";
import loaddingFile from '../../../../src/assets/images/tenor.gif';
interface IPatientDetails {
  dispatch: Dispatch<any>;
  match: any;
  getAllPatientData: any;

}

const PatientDetails: React.FC<IPatientDetails> = ({
  dispatch, match, getAllPatientData
}) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedRow, setSelectedRow] = useState(0);
  const [tableData, setTableData] = useState([]);
  let [getValidCount, setVaildCount] = useState(1);
  const [newDialog, setNewDialog] = useState(false);
  const [rowDataValue, setRowDataValue] = useState(null);
  let [inputOrgData, setInputOrgData] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [imgData, setImgData] = useState('data:image/jpeg;base64,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');
  const [globalFilter, setGlobalFilter] = useState('');
  const [searchText , SetsearchText] = useState("");
  useEffect(() => {
    setSpinner(true);
    var orgData = JSON.parse(window.localStorage.getItem("LOGINDATA"));
    orgData = orgData.loginInput.organization;
    HttpLogin.axios().get("api/org/getById/" + orgData)
      .then((res) => {
        if (res.data.message.code === "MHC - 0200") {
          setInputOrgData(res.data.data.id);
        } else {
          setInputOrgData("");
        }
      })    
    dispatch(getAllPatient());
  }, []);

  const onSelectionChangedData = (rowData) => {
    const value = rowData.value;
    setSelectedValues(value);
    setSelectedRow(rowData.value.length);
  }

  const patientEditChange = (rowData) => {
    setNewDialog(true);
    setRowDataValue(rowData);
  }

  const handleOrder = (event) => {
    setVaildCount(getValidCount + 1);
    if (getValidCount % 2 === 0) {
      //  console.log(JSON.stringify(tableData.sort((a, b) => a.patientId > b.patientId ? 1:-1)));
    } else {
      //  console.log(JSON.stringify(tableData.sort((a, b) => a.patientId < b.patientId ? 1:-1)));
    }
  }

  const onRowSelectData = (rowData) => {
    var CryptoJS = require("crypto-js");
    var encryptPatientId = CryptoJS.AES.encrypt(rowData.id, 'secret key 123');
    var setEncryptPatientId = encodeURIComponent(encryptPatientId.toString());
    window.location.href = "/MettlerCreatePatient/" + setEncryptPatientId;
  }

  const onPatientVisitData = (rowData) => {
    var CryptoJS = require("crypto-js");
    var encryptPatientId = CryptoJS.AES.encrypt(rowData.id, 'secret key 123');
    var setEncryptPatientId = encodeURIComponent(encryptPatientId.toString());
    window.location.href = "/MettlerVisitPatientDetails/" + setEncryptPatientId;
  }

  const deletePatient = (rowData) => {
    dispatch(deletePatientById(rowData.username));
    alert("Patient deleted")
    window.location.reload();
  }
  const onPatientEditChange = (event) => {

    HttpLogin.axios().get("/api/visit/ByPid/" + event.data.id)
    .then((response) => {
      console.log(JSON.stringify(event.data));   
      var CryptoJS = require("crypto-js");
      var encryptId = CryptoJS.AES.encrypt(event.data.id, 'secret key 123');
      var setEncryptId = encodeURIComponent(encryptId.toString());
      console.log(JSON.stringify(response.data.data));         
      if (response.data.message.code === "MHC - 0200") {
        var elementNew = response.data.data[response.data.data.length - 1];
        if (elementNew.lastVisit !== "") {
          var encryptVisitId = CryptoJS.AES.encrypt(elementNew.lastVisit, 'secret key 123');
          var setEncryptVisitId = encodeURIComponent(encryptVisitId.toString());
        }else{
          var encryptVisitId = CryptoJS.AES.encrypt(elementNew.id, 'secret key 123');
          var setEncryptVisitId = encodeURIComponent(encryptVisitId.toString());
        }
        window.location.href = "/MettlerVisitPatientdata/"+setEncryptId+"/"+setEncryptVisitId;
      }else{
        window.location.href = "/MettlerAdmitPatientupdated/"+setEncryptId;        
      }
    })
    // return <a style={{cursor:'pointer'}} onClick={()=>patientEditChange(event.data)}>{event.data.id != "" ? <><img style={{width:'20px',height:'20px',opacity:0.8}} src={dotImage}></img>
    // </>:<span><img style={{width:'20px',height:'20px',opacity:0.8}} src={dotImage}></img></span>}</a>;
    //   var CryptoJS = require("crypto-js"); 
    // var encryptPatientId = CryptoJS.AES.encrypt(rowData.id, 'secret key 123');
    //  var setEncryptPatientId = encodeURIComponent(encryptPatientId.toString()); 
    //  window.location.href = "/MettlerPatientInfo/"+setEncryptPatientId;
  }
  const dataPatientName = (rowData) => {
    //  console.log(JSON.stringify(rowData))
    return rowData.basicDetails[0].name[0].given !== null && rowData.basicDetails[0].name[0].given !== "" && rowData.basicDetails[0].profile !== "" && rowData.basicDetails[0].profile !== null && rowData.basicDetails[0].profile !== "string" ? <span><img style={{ width: '32px', height: '32px', position: 'relative', borderRadius: '32px', right: '7px' }} src={rowData.basicDetails[0].profile}></img>{rowData.basicDetails[0].name[0].given}</span> : <span><img style={{ width: '32px', height: '32px', position: 'relative', borderRadius: '32px', right: '7px' }} src={imgData}></img>{rowData.basicDetails[0].name[0].given}</span>
  }

  const dataSSN = (rowData) => {
    return <a style={{ cursor: 'pointer' }}>{rowData != null ? <span> {rowData.basicDetails[0].ssn}</span> : <span></span>}</a>
  }


  const dataPatienEdit = (rowData) => {
    // return <a style={{cursor:'pointer'}} onClick={()=>patientEditChange(rowData)}>{rowData.id != "" ? <><img style={{width:'20px',height:'20px',opacity:0.8}} src={dotImage}></img>
    // </>:<span><img style={{width:'20px',height:'20px',opacity:0.8}} src={dotImage}></img></span>}</a>;
  }
  const dataphone = (rowData) => {

    return <a style={{ cursor: 'pointer' }}><span> {rowData.contact[0].mobilePhone != "" ? rowData.contact[0].mobilePhone : "--"}</span></a>
  }

  const dataGender = (rowData) => {
    return <a style={{ cursor: 'pointer' }}><span>Active</span></a>
  }

  const datainsurence = (rowData) => {

    return <a style={{ cursor: 'pointer' }} ><span> {rowData.id != "" ? rowData.insurance[0].primary[0].subscriber : ""}</span></a>
  }
  const dataEmail = (rowData) => {

    return <a style={{ cursor: 'pointer' }}><span> {rowData.email}</span></a>
  }
  const handleAddPatient = () => {
    window.location.href = "/MettlerCreatePatient";
  }
  const [isPageGetpatLoaded, setPageGetpatLoaded] = useState(false);
  //
  if (!isPageGetpatLoaded && !getAllPatientData.isLoading) {
    if (getAllPatientData.items.message.code === "MHC - 0200") {      
      setTableData(getAllPatientData.items.data.filter(t => t.organization === inputOrgData));
      setSpinner(false);
    } else {
      setTableData([]);
      alert(getAllPatientData.items.message.description);
    }
    setPageGetpatLoaded(true);
  }

  const dataAdmitDate = (rowData) => {
    return <a style={{ cursor: 'pointer' }} onClick={() => onPatientEditChange(rowData)}>{rowData.basicDetails[0].birthDate != "string" ? moment(rowData.basicDetails[0].birthDate, "YYYYMMDD").format("MMM DD,YYYY") : <span>{rowData.basicDetails[0].birthDate}</span>}</a>
  }
  const filteredTableData = tableData ? tableData.filter((item) => {
    const formattedBirthDate  = moment(item.basicDetails[0].birthDate, 'YYYYMMDD').format('MMM DD, YYYY');
    const gender = item.basicDetails[0]?.gender || '';
    const birthYear = moment(item.basicDetails[0].birthDate, 'YYYYMMDD').format('YYYY');
    return (
      item.basicDetails[0].ssn.includes(searchText) ||
      item.basicDetails[0].name[0].given.toLowerCase().includes(searchText.toLowerCase()) ||
      formattedBirthDate.toLowerCase().includes(searchText.toLowerCase()) ||
      birthYear.includes(searchText) || 
      item.email.toLowerCase().includes(searchText.toLowerCase()) ||
      item.contact[0].mobilePhone.includes(searchText.toString()) ||
      item.insurance[0].primary[0].subscriber.toLowerCase().includes(searchText.toLowerCase()) ||
      gender.toLowerCase().includes(searchText.toLowerCase())
      
    );
  }) : [];
  return (
    <>
    {spinner &&
                (<div className='overlay-content'>
                    <div className='wrapper'>
                        <img alt="" src={loaddingFile} style={{ position: 'absolute', width: '100%', height:'-webkit-fill-available', zIndex: 2, opacity: '0.5' }} />
                    </div>
                </div>
                )}
    <>
      <div style={{backgroundColor:"#ffffff"}}>

        <div style={{ display: "flex",justifyContent:"space-around",position:"relative",top:"50px", }}>
          
          {/* <div id="removePadding" style={{width:'24.08px'}}></div>   */}
          <div id="removePadding" className="patientDashboard" style={{ width: '214.297px', height: '160.121px', flexShrink: 0, background: '#F1FCF0' }}>
            <div><span style={{ position: 'relative', top: '14px', left: '14px' }} className="dashboard-1-text">My Patients</span></div>
            <div><span style={{ position: 'relative', top: '35.81px', left: '15.87px', fontSize: '24px' }} className="dashboard-1-count">872</span></div>
            <div style={{ position: 'relative', left: '15px', top: '35px' }} className="dashboard-1-percent-change">+11.07%<img src={arrowRise} style={{ width: '11.667px', height: '11.667px' }}></img></div>
          </div>
          {/* <div id="removePadding" style={{width:'24.08px'}}></div>   */}
          <div id="removePadding" className="patientDashboard" style={{ width: '214.297px', height: '160.121px', flexShrink: 0, background: '#E9F4F8' }}>
            <div><span style={{ position: 'relative', top: '14px', left: '14px' }} className="dashboard-1-text">Current Patients</span></div>
            <div><span style={{ position: 'relative', top: '35.81px', left: '15.87px', fontSize: '24px' }} className="dashboard-1-count">750</span></div>
            <div style={{ position: 'relative', left: '15px', top: '35px' }} className="dashboard-1-percent-change">+11.07%<img src={arrowRise} style={{ width: '11.667px', height: '11.667px' }}></img></div>
          </div>
          {/* <div id="removePadding" style={{width:'24.08px'}}></div>   */}
          <div id="removePadding" className="patientDashboard" style={{ width: '214.297px', height: '160.121px', flexShrink: 0, background: '#FCF0E3' }}>
            <div><span style={{ position: 'relative', top: '14px', left: '14px' }} className="dashboard-1-text">Today Admitted</span></div>
            <div><span style={{ position: 'relative', top: '35.81px', left: '15.87px', fontSize: '24px' }} className="dashboard-1-count">65</span></div>
            <div style={{ position: 'relative', left: '15px', top: '35px' }} className="dashboard-1-percent-change">+11.07%<img src={arrowRise} style={{ width: '11.667px', height: '11.667px' }}></img></div>
          </div>
          {/* <div id="removePadding" style={{width:'24.08px'}}></div>   */}
          <div id="removePadding" className="patientDashboard" style={{ width: '214.297px', height: '160.121px', flexShrink: 0, background: '#F4F6FA' }}>
            <div><span style={{ position: 'relative', top: '14px', left: '14px' }} className="dashboard-1-text">Today Discharged</span></div>
            <div><span style={{ position: 'relative', top: '35.81px', left: '15.87px', fontSize: '24px' }} className="dashboard-1-count">72</span></div>
            <div style={{ position: 'relative', left: '15px', top: '35px' }} className="dashboard-1-percent-change">+11.07%<img src={arrowRise} style={{ width: '11.667px', height: '11.667px' }}></img></div>
          </div>
          <div id="removePadding" className="patientDashboard" style={{ width: '214.297px', height: '160.121px', flexShrink: 0 }}>
            <div className="patient-1-dashboardText">
              Bed Availability
            </div>
            <img className="patient-1-dashboardImage" src={speedometerEdit}></img>
            <div><span style={{ position: 'relative', top: '7.65px', left: '32px' }} className="dashboard-1-count">1272</span><span style={{ position: 'relative', top: '7.65px', left: '98px' }} className="dashboard-1-count">345</span></div>
            <div><span style={{ position: 'relative', left: '8px', top: '-2px' }} className="patient-1-dashboardSpeedoText">Total No. Of Beds</span><span style={{ position: 'relative', left: '28px', top: '-2px' }} className="patient-1-dashboardSpeedoText">Available Beds</span></div>
          </div>
        </div>
      </div>
    </><div className="p-grid p-fluid dashboard" style={{ background: 'white', padding: '93px 16px 16px 25px' }}>

        {/* <div id="removePadding" className="p-col-12 p-md-12"></div>   */}
        {/* <div id="removePadding" style={{width:'24.08px'}}></div>      */}
        <div id="removePadding" className="p-col-12 p-md-12 dashboard-Title">
          <span style={{ position: 'relative', left: '10px' }} className="dashboard-Title-insideText">Patients List</span>
          {/*<span className="patient-dashboard-deleteText">Delete</span>*/}<span className="patient-dashboard-count-deleteText">{selectedRow} Selected</span>
          <span style={{ width: '1px', height: '20px', color: '#BBC5CE', position: 'relative', left: '557px', top: '6px', borderLeftStyle: 'groove' }}></span>
          <a style={{ cursor: 'pointer' }} onClick={(e) => handleOrder(e)}><img src={switchVertical} style={{ width: '24px', height: '24px', position: 'relative', left: '570px', top: '4px' }}></img></a>
          <img src={filterList} style={{ width: '24px', height: '24px', position: 'relative', left: '588px', top: '3px' }}></img>
          <a style={{ cursor: 'pointer' }} onClick={handleAddPatient}><img src={addSymbol} style={{ width: '24px', height: '24px', position: 'relative', left: '604px', top: '3px' }}></img></a>
          <input type="text" className="dashboard-search-text" id="new" name="new" value={searchText} onChange={(e) => SetsearchText(e.target.value)} placeholder="Search" style={{ paddingLeft: '36px', fontFamily: 'system-ui', position: 'relative', width: '199px', left: '609px' }} />
          <img src={searchImage} style={{ width: '20x', height: '20px', position: 'relative', left: '415px', top: '5px', opacity: 0.3 }}></img>
        </div>
        {/* <div id="removePadding" className="p-col-12 p-md-12"></div>    */}
        <div id="removePadding" className="p-col-12 p-md-12">
       
          <DataTable style={{ border: '0px' }}
            value={filteredTableData}
            globalFilter={globalFilter}
            selectionMode="multiple" onRowSelect={onPatientEditChange}
            rows={50} scrollable={true}
            responsive={true} selection={selectedValues} onSelectionChange={onSelectionChangedData}
            emptyMessage="No records found">
            <Column selectionMode="multiple" headerStyle={{ width: '3%' }} style={{ borderLeft: '0px', borderRight: '0px', width: '3%' }}></Column>
            <Column field="basicDetails[0].ssn" header="SSN" headerStyle={{ width: '10%' }} style={{ borderLeft: '0px', borderRight: '0px', width: '10%' }} body={dataSSN}></Column>
            <Column field="basicDetails[0].name[0].given" header="Patient Name" headerStyle={{ width: '15%' }} style={{ borderLeft: '0px', borderRight: '0px', width: '15%' }} body={dataPatientName} />
            <Column field="basicDetails[0].birthDate" header="Date of Birth" headerStyle={{ width: '10%' }} style={{ borderLeft: '0px', borderRight: '0px', width: '10%' }} body={dataAdmitDate} />
            <Column field="email" header="Email" headerStyle={{ width: '25%' }} style={{ borderLeft: '0px', borderRight: '0px', width: '25%' }} body={dataEmail} />
            <Column field="contact[0].mobilePhone" header="Phone" headerStyle={{ width: '10%' }} style={{ borderLeft: '0px', borderRight: '0px', width: '10%' }} body={dataphone} />
            <Column field="insurance[0].primary[0].subscriber" header="Insurance" headerStyle={{ width: '10%' }} style={{ borderLeft: '0px', borderRight: '0px', width: '10%' }} body={datainsurence} />
            <Column field="basicDetails[0].gender" header="Status" headerStyle={{ width: '10%' }} style={{ borderLeft: '0px', borderRight: '0px', width: '10%' }} body={dataGender} />
            {/*<Column field="" header="Status" headerStyle={{width:'10%'}} style={{borderLeft:'0px',borderRight:'0px',width:'10%'}}/>*/}
            <Column field="" header="" headerStyle={{ width: '7%' }} style={{ borderLeft: '0px', borderRight: '0px', width: '7%' }} body={dataPatienEdit} />
          </DataTable>
        </div>
        <Dialog maxWidth={'md'} PaperProps={{ sx: { overflow: 'hidden', height: '120px', width: '150px' } }}
          open={newDialog}
          onClose={() => setNewDialog(false)}
        >
          <DialogContentText>
            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', left: '18px', top: '18px' }}>
              <a style={{ cursor: 'pointer' }} onClick={() => onPatientVisitData(rowDataValue)}><div style={{ fontSize: '14px' }} className="AppTopBar-profileName">View Visit</div></a>
              <a style={{ cursor: 'pointer' }} onClick={() => onRowSelectData(rowDataValue)}><div style={{ position: 'relative', top: '15px', fontSize: '14px' }} className="AppTopBar-profileName">Edit</div>    </a>
              <a style={{ cursor: 'pointer' }} onClick={() => deletePatient(rowDataValue)}><div style={{ position: 'relative', top: '30px', fontSize: '14px' }} className="AppTopBar-profileName">Delete</div></a>
            </div>

          </DialogContentText></Dialog>
      </div></>

  );
};

const mapStateToProps = (state: any) => {
  const { deviceFormData, visaCareCaseData, getAllPatientData } = state;
  const { items } = state;
  return {
    deviceFormData, visaCareCaseData, getAllPatientData, items
  };
};
export default connect(mapStateToProps)(PatientDetails);
