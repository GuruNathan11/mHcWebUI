import { Checkbox } from "primereact/checkbox";
import React, { Dispatch, useState, useEffect } from "react";
import 'list-to-tree';
import 'array-to-tree';
import 'react-dropdown-tree-select/dist/styles.css'
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";
import '../../../../src/css/style.css';
import TimingScheduleData from "../../../../src/assets/data/TimingScheduleData.json";
import loaddingFile from '../../../../src/assets/images/tenor.gif';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ScrollPanel } from "primereact/scrollpanel";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

interface IQ15SafetyCheck { }
interface IQ15SafetyCheck {
  StaticPage: any;

  state: {
    nodes: [],
    checked: [],
    expanded: []
  }
}
const Q15SafetyCheck: React.FC<IQ15SafetyCheck> = ({



}) => {
  const history = createBrowserHistory();
  const [spinner, setSpinner] = useState(false);
  let [patientDetails, setPatientDetails] = useState(TimingScheduleData);
  let [tableFileData, setTableFileData] = useState(new Array<any>());
  const [displayFirstLocateActivity, setDisplayFirstLocateActivity] = useState(false);
  const [displaySecondLocateActivity, setDisplaySecondLocateActivity] = useState(false);
  const [displayThirdLocateActivity, setDisplayThirdLocateActivity] = useState(false);
  const [displayForthLocateActivity, setDisplayForthLocateActivity] = useState(false);
  const LocationList = [
    { label: 'Location 1', value: 'L1' },
    { label: 'Location 2', value: 'L2' },
    { label: 'Location 3', value: 'L3' },
    { label: 'Location 4', value: 'L4' },
    { label: 'Location 5', value: 'L5' },
    { label: 'Location 6', value: 'L6' },
    { label: 'Location 7', value: 'L7' },
    { label: 'Location 8', value: 'L8' },
    { label: 'Location 9', value: 'L9' },
    { label: 'Location 10', value: 'L10' },
    { label: 'Location 11', value: 'L12' },
    { label: 'Location 12', value: 'L13' }
  ]
  const dialogSafetyCheck = {
    timing: "",
    firstSlotLocation: "",
    firstSlotActivity: "",
    secondSlotLocation: "",
    secondSlotActivity: "",
    thirdSlotLocation: "",
    thirdSlotActivity: "",
    forthSlotLocation: "",
    forthSlotActivity: ""
  }

  const timingSchedule = [
    { label: "15 mins interval", value: "15" },
    { label: "30 mins interval", value: "30" },
    { label: "45 mins interval", value: "45" },
    { label: "60 mins interval", value: "60" }
  ]
  let [rowDataOfficial, setRowDataOfficial] = useState(dialogSafetyCheck);

  const ActivityList = [
    { label: 'Activity 1', value: 'A1' },
    { label: 'Activity 2', value: 'A2' },
    { label: 'Activity 3', value: 'A3' },
    { label: 'Activity 4', value: 'A4' },
    { label: 'Activity 5', value: 'A5' },
    { label: 'Activity 6', value: 'A6' },
    { label: 'Activity 7', value: 'A7' },
    { label: 'Activity 8', value: 'A8' },
    { label: 'Activity 9', value: 'A9' },
    { label: 'Activity 10', value: 'A10' },
    { label: 'Activity 11', value: 'A11' },
    { label: 'Activity 12', value: 'A12' }
  ]
  useEffect(() => {
    setTableFileData(TimingScheduleData.value);
  }, [])

  let listOfLocation = LocationList.map((item, k) => {
    return (
      <option key={k} value={item.value}>{item.label}</option>
    )
  }, this);

  let listOfActivity = ActivityList.map((item, k) => {
    return (
      <option key={k} value={item.value}>{item.label}</option>
    )
  }, this);

  let listOfTiming = timingSchedule.map((item, k) => {
    return (
      <option key={k} value={item.value}>{item.label}</option>
    )
  }, this);

  const handleNewInputChange = (event: any) => {
    if (event.target.id === "overallTiming") {
      patientDetails.overallTiming = event.target.value;
    }
    setPatientDetails({ ...patientDetails });
  }
  const handleInputChange = (event: any) => {
    if (event.target.id === "firstSlotLocation") {
      rowDataOfficial.firstSlotLocation = event.target.value;
    } else if (event.target.id === "firstSlotActivity") {
      rowDataOfficial.firstSlotActivity = event.target.value;
    } else if (event.target.id === "secondSlotLocation") {
      rowDataOfficial.secondSlotLocation = event.target.value;
    } else if (event.target.id === "secondSlotActivity") {
      rowDataOfficial.secondSlotActivity = event.target.value;
    } else if (event.target.id === "thirdSlotLocation") {
      rowDataOfficial.thirdSlotLocation = event.target.value;
    } else if (event.target.id === "thirdSlotActivity") {
      rowDataOfficial.thirdSlotActivity = event.target.value;
    } else if (event.target.id === "forthSlotLocation") {
      rowDataOfficial.forthSlotLocation = event.target.value;
    } else if (event.target.id === "forthSlotActivity") {
      rowDataOfficial.forthSlotActivity = event.target.value;
    }
    setRowDataOfficial({ ...rowDataOfficial });
  }

  const onCheckFirstSelected = (rowData: any) => {
    if (rowData.timing === "01.00" || rowData.timing.includes("02.00") || rowData.timing.includes("03.00") || rowData.timing.includes("04.00")
      || rowData.timing.includes("05.00") || rowData.timing.includes("06.00") || rowData.timing.includes("07.00") || rowData.timing.includes("08.00")
      || rowData.timing.includes("09.00") || rowData.timing.includes("10.00") || rowData.timing.includes("11.00") || rowData.timing.includes("12.00")
      || rowData.timing.includes("13.00") || rowData.timing.includes("14.00") || rowData.timing.includes("15.00") || rowData.timing.includes("16.00")
      || rowData.timing.includes("17.00") || rowData.timing.includes("18.00") || rowData.timing.includes("19.00") || rowData.timing.includes("20.00")
      || rowData.timing.includes("21.00") || rowData.timing.includes("22.00") || rowData.timing.includes("23.00") || rowData.timing.includes("00.00")) {
      setRowDataOfficial(rowData);
      setDisplayFirstLocateActivity(true);
    }
  }

  const onCheckSecondSelected = (rowData: any) => {
    if (rowData.timing === "01.00" || rowData.timing.includes("02.00") || rowData.timing.includes("03.00") || rowData.timing.includes("04.00")
      || rowData.timing.includes("05.00") || rowData.timing.includes("06.00") || rowData.timing.includes("07.00") || rowData.timing.includes("08.00")
      || rowData.timing.includes("09.00") || rowData.timing.includes("10.00") || rowData.timing.includes("11.00") || rowData.timing.includes("12.00")
      || rowData.timing.includes("13.00") || rowData.timing.includes("14.00") || rowData.timing.includes("15.00") || rowData.timing.includes("16.00")
      || rowData.timing.includes("17.00") || rowData.timing.includes("18.00") || rowData.timing.includes("19.00") || rowData.timing.includes("20.00")
      || rowData.timing.includes("21.00") || rowData.timing.includes("22.00") || rowData.timing.includes("23.00") || rowData.timing.includes("00.00")) {
      setRowDataOfficial(rowData);
      setDisplaySecondLocateActivity(true);
    }
  }
  const onCheckThirdSelected = (rowData: any) => {
    if (rowData.timing === "01.00" || rowData.timing.includes("02.00") || rowData.timing.includes("03.00") || rowData.timing.includes("04.00")
      || rowData.timing.includes("05.00") || rowData.timing.includes("06.00") || rowData.timing.includes("07.00") || rowData.timing.includes("08.00")
      || rowData.timing.includes("09.00") || rowData.timing.includes("10.00") || rowData.timing.includes("11.00") || rowData.timing.includes("12.00")
      || rowData.timing.includes("13.00") || rowData.timing.includes("14.00") || rowData.timing.includes("15.00") || rowData.timing.includes("16.00")
      || rowData.timing.includes("17.00") || rowData.timing.includes("18.00") || rowData.timing.includes("19.00") || rowData.timing.includes("20.00")
      || rowData.timing.includes("21.00") || rowData.timing.includes("22.00") || rowData.timing.includes("23.00") || rowData.timing.includes("00.00")) {
      setRowDataOfficial(rowData);
      setDisplayThirdLocateActivity(true);
    }
  }
  const onCheckForthSelected = (rowData: any) => {
    if (rowData.timing === "01.00" || rowData.timing.includes("02.00") || rowData.timing.includes("03.00") || rowData.timing.includes("04.00")
      || rowData.timing.includes("05.00") || rowData.timing.includes("06.00") || rowData.timing.includes("07.00") || rowData.timing.includes("08.00")
      || rowData.timing.includes("09.00") || rowData.timing.includes("10.00") || rowData.timing.includes("11.00") || rowData.timing.includes("12.00")
      || rowData.timing.includes("13.00") || rowData.timing.includes("14.00") || rowData.timing.includes("15.00") || rowData.timing.includes("16.00")
      || rowData.timing.includes("17.00") || rowData.timing.includes("18.00") || rowData.timing.includes("19.00") || rowData.timing.includes("20.00")
      || rowData.timing.includes("21.00") || rowData.timing.includes("22.00") || rowData.timing.includes("23.00") || rowData.timing.includes("00.00")) {
      setRowDataOfficial(rowData);
      setDisplayForthLocateActivity(true);
    }
  }
  const dataFirstRow = (rowData: any, column: any) => {
    if (patientDetails.overallTiming === "45") {
      return rowData.firstSlotLocation === "" && (rowData.timing.includes("02.00") || rowData.timing.includes("05.00")
        || rowData.timing.includes("08.00") || rowData.timing.includes("11.00") || rowData.timing.includes("14.00") || rowData.timing.includes("17.00")
        || rowData.timing.includes("20.00") || rowData.timing.includes("23.00")) ? <span>
        <span> <a className="pi pi-pencil" onClick={() => { onCheckFirstSelected(rowData) }}></a></span>
      </span> : <span>
        <span><a onClick={() => { onCheckFirstSelected(rowData) }}>{rowData.firstSlotLocation !== "" ? rowData.firstSlotLocation + "." + rowData.firstSlotActivity : ""}</a></span>
      </span>;
    } else {
      return rowData.firstSlotLocation === "" ? <span>
        <span> <a className="pi pi-pencil" onClick={() => { onCheckFirstSelected(rowData) }}></a></span>
      </span> : <span>
        <span><a onClick={() => { onCheckFirstSelected(rowData) }}>{rowData.firstSlotLocation !== "" ? rowData.firstSlotLocation + "." + rowData.firstSlotActivity : ""}</a></span>
      </span>;
    }
  }

  const dataSecondRow = (rowData: any, column: any) => {
    if (patientDetails.overallTiming === "45") {
      return rowData.secondSlotLocation === "" && (rowData.timing.includes("01.00") || rowData.timing.includes("04.00")
        || rowData.timing.includes("07.00") || rowData.timing.includes("10.00") || rowData.timing.includes("13.00") || rowData.timing.includes("16.00")
        || rowData.timing.includes("19.00") || rowData.timing.includes("22.00")) ? <span>
        <span> <a className="pi pi-pencil" onClick={() => { onCheckSecondSelected(rowData) }}></a></span>
      </span> : <span>
        <span><a onClick={() => { onCheckSecondSelected(rowData) }}>{rowData.secondSlotLocation !== "" ? rowData.secondSlotLocation + "." + rowData.secondSlotActivity : ""}</a></span>
      </span>;
    } else {
      return rowData.secondSlotLocation === "" ? <span>
        <span> <a className="pi pi-pencil" onClick={() => { onCheckSecondSelected(rowData) }}></a></span>
      </span> : <span>
        <span><a onClick={() => { onCheckSecondSelected(rowData) }}>{rowData.secondSlotLocation !== "" ? rowData.secondSlotLocation + "." + rowData.secondSlotActivity : ""}</a></span>
      </span>;
    }
  }

  const dataThirdRow = (rowData: any, column: any) => {
    if (patientDetails.overallTiming === "45") {
      return rowData.thirdSlotLocation === "" && (rowData.timing.includes("03.00") || rowData.timing.includes("06.00")
        || rowData.timing.includes("09.00") || rowData.timing.includes("12.00") || rowData.timing.includes("15.00") || rowData.timing.includes("18.00")
        || rowData.timing.includes("21.00") || rowData.timing.includes("00.00")) ? <span>
        <span> <a className="pi pi-pencil" onClick={() => { onCheckThirdSelected(rowData) }}></a></span>
      </span> : <span>
        <span><a onClick={() => { onCheckThirdSelected(rowData) }}>{rowData.thirdSlotLocation !== "" ? rowData.thirdSlotLocation + "." + rowData.thirdSlotActivity : ""}</a></span>
      </span>;
    } else {
      return rowData.thirdSlotLocation === "" ? <span>
        <span> <a className="pi pi-pencil" onClick={() => { onCheckThirdSelected(rowData) }}></a></span>
      </span> : <span>
        <span><a onClick={() => { onCheckThirdSelected(rowData) }}>{rowData.thirdSlotLocation !== "" ? rowData.thirdSlotLocation + "." + rowData.thirdSlotActivity : ""}</a></span>
      </span>;
    }
  }

  const dataForthRow = (rowData: any, column: any) => {
    if (patientDetails.overallTiming === "45") {
      return rowData.forthSlotLocation === "" && (rowData.timing.includes("02.00") || rowData.timing.includes("05.00")
        || rowData.timing.includes("08.00") || rowData.timing.includes("11.00") || rowData.timing.includes("14.00") || rowData.timing.includes("17.00")
        || rowData.timing.includes("20.00") || rowData.timing.includes("23.00")) ? <span>
        <span> <a className="pi pi-pencil" onClick={() => { onCheckForthSelected(rowData) }}></a></span>
      </span> : <span>
        <span><a onClick={() => { onCheckForthSelected(rowData) }}>{rowData.forthSlotLocation !== "" ? rowData.forthSlotLocation + "." + rowData.forthSlotActivity : ""}</a></span>
      </span>;
    } else {
      return rowData.forthSlotLocation === "" ? <span>
        <span> <a className="pi pi-pencil" onClick={() => { onCheckForthSelected(rowData) }}></a></span>
      </span> : <span>
        <span><a onClick={() => { onCheckForthSelected(rowData) }}>{rowData.forthSlotLocation !== "" ? rowData.forthSlotLocation + "." + rowData.forthSlotActivity : ""}</a></span>
      </span>;
    }
  }

  const handleRowDataSave = () => {
    let index = tableFileData.findIndex(x => x["timing"] === rowDataOfficial.timing);
    if (index === -1) {
      tableFileData.push(rowDataOfficial);
      setTableFileData(tableFileData);   
    } else {
      tableFileData[index] = rowDataOfficial;
      setTableFileData(tableFileData);    
    }
    setDisplayFirstLocateActivity(false);
    setDisplaySecondLocateActivity(false);
    setDisplayThirdLocateActivity(false);
    setDisplayForthLocateActivity(false);
  }

  const handleSaveChange =()=>{
   // console.log(JSON.stringify(tableFileData));
  }


  return (
    <div id="removePaddingTop" className="p-grid p-fluid ">
      {spinner &&
        (<div className='overlay-content'>
          <div className='wrapper'>
            <img src={loaddingFile} style={{ position: 'absolute', width: '100%', zIndex: 2, opacity: '0.5' }} />
          </div>
        </div>
        )}
      <div className="p-col-12 p-md-12">
        <h2 className="dashboard-title"><b>Q15 Safety Check</b> </h2>
      </div>
      <div id="removePaddingTop" style={{ fontFamily: "Times New Roman" }} className="p-col-12">
        <div style={{ border: '0px' }} className="card card-w-title">
          <div className="p-grid">
            <div id="removePadding" style={{ fontSize: '20px' }} className="p-col-12 p-md-2">
              Timing Interval
            </div>
            <div id="removePadding" style={{ fontSize: '20px' }} className="p-col-12 p-md-3">
              <select id="overallTiming" name="overallTiming" style={{ width: '95%', height: '34px' }} onChange={handleNewInputChange} value={patientDetails.overallTiming} required >
                <option value="">Select</option>
                {listOfTiming}
              </select>
            </div>
            <div id="removePadding" className="p-col-12 p-md-2">
            </div>
            <div id="removePadding" style={{ textAlign: 'end' }} className="p-col-12 p-md-4">
              <span style={{ fontSize: '22px' }}><b>Patient Label:&nbsp;&nbsp;</b></span> <span style={{ fontSize: '20px' }}>{patientDetails.patientName + " - " + patientDetails.age}</span>
            </div>
            <div id="removePadding" className="p-col-12 p-md-6">
              {(
                (patientDetails.overallTiming === "15" || patientDetails.overallTiming === "") &&
                <DataTable id="Q15 Safety Check"
                  value={tableFileData}
                  selectionMode="single"
                  rows={50} scrollable={true}
                  responsive={true}
                  emptyMessage="No records found">
                  <Column field="timing" style={{ width: '12%', textAlign: 'right', fontSize: '21px' }} header="" />
                  <Column field="firstSlotLocation" style={{ textAlign: 'center' }} body={dataFirstRow} header="15 mins" />
                  <Column field="secondSlotLocation" style={{ textAlign: 'center' }} body={dataSecondRow} header="30 mins" />
                  <Column field="thirdSlotLocation" style={{ textAlign: 'center' }} body={dataThirdRow} header="45 mins" />
                  <Column field="forthSlotLocation" style={{ textAlign: 'center' }} body={dataForthRow} header="60 mins" />
                </DataTable>
              )}
              {(
                patientDetails.overallTiming === "30" &&
                <DataTable id="Q15 Safety Check"
                  value={tableFileData}
                  selectionMode="single"
                  rows={50} scrollable={true}
                  responsive={true}
                  emptyMessage="No records found">
                  <Column field="timing" style={{ width: '12%', textAlign: 'right', fontSize: '21px' }} header="" />
                  <Column field="firstSlotLocation" style={{ textAlign: 'center' }} header="15 mins" />
                  <Column field="secondSlotLocation" style={{ textAlign: 'center' }} body={dataSecondRow} header="30 mins" />
                  <Column field="thirdSlotLocation" style={{ textAlign: 'center' }} header="45 mins" />
                  <Column field="forthSlotLocation" style={{ textAlign: 'center' }} body={dataForthRow} header="60 mins" />
                </DataTable>

              )}
              {(
                patientDetails.overallTiming === "45" &&
                <DataTable id="Q15 Safety Check"
                  value={tableFileData}
                  selectionMode="single"
                  rows={50} scrollable={true}
                  responsive={true}
                  emptyMessage="No records found">
                  <Column field="timing" style={{ width: '12%', textAlign: 'right', fontSize: '21px' }} header="" />
                  <Column field="firstSlotLocation" style={{ textAlign: 'center' }} body={dataFirstRow} header="15 mins" />
                  <Column field="secondSlotLocation" style={{ textAlign: 'center' }} body={dataSecondRow} header="30 mins" />
                  <Column field="thirdSlotLocation" style={{ textAlign: 'center' }} body={dataThirdRow} header="45 mins" />
                  <Column field="forthSlotLocation" style={{ textAlign: 'center' }} body={dataForthRow} header="60 mins" />
                </DataTable>
              )}
              {(
                patientDetails.overallTiming === "60" &&
                <DataTable id="Q15 Safety Check"
                  value={tableFileData}
                  selectionMode="single"
                  rows={50} scrollable={true}
                  responsive={true}
                  emptyMessage="No records found">
                  <Column field="timing" style={{ width: '12%', textAlign: 'right', fontSize: '21px' }} header="" />
                  <Column field="firstSlotLocation" style={{ textAlign: 'center' }} header="15 mins" />
                  <Column field="secondSlotLocation" style={{ textAlign: 'center' }} header="30 mins" />
                  <Column field="thirdSlotLocation" style={{ textAlign: 'center' }} header="45 mins" />
                  <Column field="forthSlotLocation" style={{ textAlign: 'center' }} body={dataForthRow} header="60 mins" />
                </DataTable>

              )}
            </div>
            <div id="removePadding" className="p-col-12 p-md-6">
            </div>
            <div id="removePadding" className="p-col-12 p-md-4">
            </div>
            <div id="removePadding" className="p-col-12 p-md-2">
            <Button icon="pi pi-plus" style={{ width: 'fit-content' }} label="Save" onClick={handleSaveChange}></Button>&nbsp;&nbsp;&nbsp;  
            </div>
            <div id="removePadding" className="p-col-12 p-md-4">
            </div>
            <div id="removePadding" className="p-col-12 p-md-2">
            <Button icon="pi pi-step-backward" style={{ float: "right", width: 'fit-content' }} label="Back" onClick={() => history.goBack()} />
            </div>
          </div>
        </div>
        <Dialog
          header="Add Location"
          visible={displayFirstLocateActivity}
          modal={true}
          style={{ width: "55vw" }}
          onHide={() => setDisplayFirstLocateActivity(false)}
        >
          {displayFirstLocateActivity && (

            <div className="p-grid">
              <div id="removePadding" className="p-col-12 p-md-2">
                Location
              </div>
              <div id="removePadding" className="p-col-12 p-md-4">
                <select id="firstSlotLocation" name="firstSlotLocation" style={{ width: '95%', height: '34px' }} onChange={handleInputChange} value={rowDataOfficial.firstSlotLocation} required >
                  <option value="">Select</option>
                  {listOfLocation}
                </select>
              </div>
              <div id="removePadding" className="p-col-12 p-md-2">
                Activity
              </div>
              <div id="removePadding" className="p-col-12 p-md-4">
                <select id="firstSlotActivity" name="firstSlotActivity" style={{ width: '95%', height: '34px' }} onChange={handleInputChange} value={rowDataOfficial.firstSlotActivity} required >
                  <option value="">Select</option>
                  {listOfActivity}
                </select>
              </div>
              <div id="removePadding" className="p-col-12 p-md-4">
              </div>
              <div id="removePadding" className="p-col-12 p-md-4">
                <Button icon="pi pi-plus" label="Save" style={{ width: 'fit-content' }} onClick={handleRowDataSave}></Button>
              </div>
              <div id="removePadding" className="p-col-12 p-md-4">
              </div>
            </div>

          )}
        </Dialog>
        <Dialog
          header="Add Location"
          visible={displaySecondLocateActivity}
          modal={true}
          style={{ width: "55vw" }}
          onHide={() => setDisplaySecondLocateActivity(false)}
        >
          {displaySecondLocateActivity && (

            <div className="p-grid">
              <div id="removePadding" className="p-col-12 p-md-2">
                Location
              </div>
              <div id="removePadding" className="p-col-12 p-md-4">
                <select id="secondSlotLocation" name="secondSlotLocation" style={{ width: '95%', height: '34px' }} onChange={handleInputChange} value={rowDataOfficial.secondSlotLocation} required >
                  <option value="">Select</option>
                  {listOfLocation}
                </select>
              </div>
              <div id="removePadding" className="p-col-12 p-md-2">
                Activity
              </div>
              <div id="removePadding" className="p-col-12 p-md-4">
                <select id="secondSlotActivity" name="secondSlotActivity" style={{ width: '95%', height: '34px' }} onChange={handleInputChange} value={rowDataOfficial.secondSlotActivity} required >
                  <option value="">Select</option>
                  {listOfActivity}
                </select>
              </div>
              <div id="removePadding" className="p-col-12 p-md-4">
              </div>
              <div id="removePadding" className="p-col-12 p-md-4">
                <Button icon="pi pi-plus" label="Save" style={{ width: 'fit-content' }} onClick={handleRowDataSave}></Button>
              </div>
              <div id="removePadding" className="p-col-12 p-md-4">
              </div>
            </div>

          )}
        </Dialog>
        <Dialog
          header="Add Location"
          visible={displayThirdLocateActivity}
          modal={true}
          style={{ width: "55vw" }}
          onHide={() => setDisplayThirdLocateActivity(false)}
        >
          {displayThirdLocateActivity && (

            <div className="p-grid">
              <div id="removePadding" className="p-col-12 p-md-2">
                Location
              </div>
              <div id="removePadding" className="p-col-12 p-md-4">
                <select id="thirdSlotLocation" name="thirdSlotLocation" style={{ width: '95%', height: '34px' }} onChange={handleInputChange} value={rowDataOfficial.thirdSlotLocation} required >
                  <option value="">Select</option>
                  {listOfLocation}
                </select>
              </div>
              <div id="removePadding" className="p-col-12 p-md-2">
                Activity
              </div>
              <div id="removePadding" className="p-col-12 p-md-4">
                <select id="thirdSlotActivity" name="thirdSlotActivity" style={{ width: '95%', height: '34px' }} onChange={handleInputChange} value={rowDataOfficial.thirdSlotActivity} required >
                  <option value="">Select</option>
                  {listOfActivity}
                </select>
              </div>
              <div id="removePadding" className="p-col-12 p-md-4">
              </div>
              <div id="removePadding" className="p-col-12 p-md-4">
                <Button icon="pi pi-plus" label="Save" style={{ width: 'fit-content' }} onClick={handleRowDataSave}></Button>
              </div>
              <div id="removePadding" className="p-col-12 p-md-4">
              </div>
            </div>

          )}
        </Dialog>
        <Dialog
          header="Add Location"
          visible={displayForthLocateActivity}
          modal={true}
          style={{ width: "55vw" }}
          onHide={() => setDisplayForthLocateActivity(false)}
        >
          {displayForthLocateActivity && (

            <div className="p-grid">
              <div id="removePadding" className="p-col-12 p-md-2">
                Location
              </div>
              <div id="removePadding" className="p-col-12 p-md-4">
                <select id="forthSlotLocation" name="forthSlotLocation" style={{ width: '95%', height: '34px' }} onChange={handleInputChange} value={rowDataOfficial.forthSlotLocation} required >
                  <option value="">Select</option>
                  {listOfLocation}
                </select>
              </div>
              <div id="removePadding" className="p-col-12 p-md-2">
                Activity
              </div>
              <div id="removePadding" className="p-col-12 p-md-4">
                <select id="forthSlotActivity" name="forthSlotActivity" style={{ width: '95%', height: '34px' }} onChange={handleInputChange} value={rowDataOfficial.forthSlotActivity} required >
                  <option value="">Select</option>
                  {listOfActivity}
                </select>
              </div>
              <div id="removePadding" className="p-col-12 p-md-4">
              </div>
              <div id="removePadding" className="p-col-12 p-md-4">
                <Button icon="pi pi-plus" label="Save" style={{ width: 'fit-content' }} onClick={handleRowDataSave}></Button>
              </div>
              <div id="removePadding" className="p-col-12 p-md-4">
              </div>
            </div>

          )}
        </Dialog>
      </div>
    </div>
  );


};
const mapStateToProps = (state: any) => {
  const { deviceFormData, I907FormData } = state;
  return {
    deviceFormData, I907FormData
  };
};
export default connect(mapStateToProps)(Q15SafetyCheck)