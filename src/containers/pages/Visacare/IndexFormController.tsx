
import React, { useState, useCallback, Dispatch, useEffect } from "react";
import {FormControl, FormHelperText, FormLabel, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import "./../Bed/BedMasterConfiguration.css";

import { connect } from "react-redux";
import bottomImage from './../../../assets/images/mettler_images/bg.svg';
import IndexFormData from "./../../../assets/data/IndexFormData.json";
import SecondaryButton from "../../../components/SecondaryButton";
import PrimaryButton from "../../../components/PrimaryButton";
import "../../../components/BottomFooter.css";
import {  DialogContent, DialogContentText} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import { DatePicker, DateTimePicker, LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DataTable } from "primereact/components/datatable/DataTable";
import { Column } from "primereact/components/column/Column";
import moment from "moment";
import { createIndexForm, getAllIndexForm, createIndexByFormId, createSubIndexFormId, createContentIndexFormId } from "../../../store/actions/IndexFormController";

interface IIndexFormController { }
interface IIndexFormController {
    StaticPage: any;
    dispatch: Dispatch<any>;
    match: any;
    getAllIndexFormData: any;
}
const IndexFormController: React.FC<IIndexFormController> = ({
    dispatch, match, getAllIndexFormData


}) => {

    let [inputIndexData, setInputIndexData] = useState(IndexFormData);
    let [inputHeadingData, setHeadingData] = useState(IndexFormData.content[0]);
    let [inputSubHeadingData, setSubHeadingData] = useState(IndexFormData.content[0].subHeading[0]);
    let [inputContentHeadingData, setContentHeadingData] = useState(IndexFormData.content[0].subHeading[0].indexContent1[0]);
    let [indexHeadingId, setIndexHeadingId] = useState(null);
    let [indexSubHeadingId, setIndexSubHeadingId] = useState(null);
    let [indexContentHeadingId, setIndexContentHeadingId] = useState(null);

    let [tableInputData, setTableInputData] = useState(null);
    let [tableInputHeadingData, setTableInputHeadingtData] = useState(null);
    let [tableInputSubHeadingData, setTableInputSubHeadingtData] = useState(null);
    let [tableInputContentHeadingData, setTableInputContentHeadingtData] = useState(null);
    let [selectTitleData, setSelectTitleData] = useState("");
    let [selectHeadingData, setSelectHeadingData] = useState("");
    let [selectSubHeadingData, setSelectSubHeadingData] = useState("");

    const [listDialog, setListDialog] = useState(false);
    
    const[isIndexDialog, setIndexDialog] = useState(false);
    const[isHeadingDialog, setHeadingDialog] = useState(false);
    const[isSubHeadingDialog, setSubHeadingDialog] = useState(false);
    const[isContentHeadingDialog, setContentHeadingDialog] = useState(false);

    useEffect(() => {


        dispatch(getAllIndexForm());
    }, []);

    const handleHeadingInputChange = (event:any)=>{
        if(event.target.id === "institutionName"){
            inputHeadingData.institutionName = event.target.value;
        }else if(event.target.id === "policyNumber"){
            inputHeadingData.policyNumber = event.target.value;
        }else if(event.target.id === "department"){
            inputHeadingData.department = event.target.value;
        }else if(event.target.id === "heading"){
            inputHeadingData.heading = event.target.value;
        }else if(event.target.id === "policyTitle"){
            inputHeadingData.policyTitle = event.target.value;
        }

        setHeadingData({...inputHeadingData});
    }
    const [selectedValues, setSelectedValues] = useState([]);
    const [selectedHeadingRow, setSelectedHeadingRow] = useState(0);
    const onSelectionChangedHeadingData = (rowData) => {
        const value = rowData.value;
        setSelectedHeadingRow(value);     
    }
    const [selectedRow, setSelectedRow] = useState(0);
    const onSelectionChangedData = (rowData) => {
        const value = rowData.value;
        setSelectedValues(value);     
    }

    const [isPageLoaded, setPageLoaded] = useState(false);

  if (!isPageLoaded && !getAllIndexFormData.isLoading) {
      console.log(JSON.stringify(getAllIndexFormData.items))
    if (getAllIndexFormData.items.message.code === "MHC - 0200") {
      
        setTableInputData(getAllIndexFormData.items.data);   
        var inputHeadingNewData = getAllIndexFormData.items.data.map(k=>{return k.content});

        console.log(JSON.stringify(getAllIndexFormData.items.data));
        if(selectTitleData !== ""){
            var inputHeadingNewData = getAllIndexFormData.items.data.filter(l=>l.id === selectTitleData).map(k=>{ return k.content});                      
            console.log(JSON.stringify(inputHeadingNewData));
            setTableInputHeadingtData(inputHeadingNewData);   
        }else if(selectTitleData === ""){
            var inputHeadingNewData = getAllIndexFormData.items.data.map(k=>{return k.content});
            console.log(JSON.stringify(inputHeadingNewData.map(r=>{return r.head})));
         //   inputHeadingNewData = [...inputHeadingNewData];          
            setTableInputHeadingtData([]);   
        }       
    } else {
        setTableInputData([]);
    //  alert(getAllIndexFormData.items.message.description);
    }
    setPageLoaded(true)
  }
  if (!getAllIndexFormData && getAllIndexFormData.isFormSubmit) {

    setTimeout(() => {
      setPageLoaded(false);

    }, (1000));
  }

    let [indexIncrement, setIndexIncrement] = useState(1);

    function addIndexIncrement (){
        return indexIncrement++;
    }

    let [headingIncrement, setHeadingIncrement] = useState(1);

    function addHeadingIncrement (){
        return headingIncrement++;
    }

    let [increment, setIncrement] = useState(1);

    function addIncrement (){
        return increment++;
    }

    let [newIncrement, setNewIncrement] = useState(1);

    function addNewIncrement (){
        return newIncrement++;
    }

    const handleIndexPageSave = () =>{
        setInputIndexData({...inputIndexData});
        //inputHeadingData.effectiveDate = moment(inputHeadingData.effectiveDate).format("YYYYMMDDHHmm");
        var newObj = {
            "id": "",
            "title": inputIndexData.title,
            "content":[]
        }
        dispatch(createIndexForm(newObj));        
        console.log(JSON.stringify(newObj));
    }

    const dataHeadingEdit = (rowData:any) =>{   
        rowData.effectiveDate = moment(rowData.effectiveDate).format("YYYY-MM-DDTHH:mm:ss.000Z");     
        setIndexHeadingId(rowData);
        return rowData.id !== "" ? <a style={{cursor:'pointer'}} onClick={handleHeadingDialog} ><span>Edit</span></a>:<span></span>
    }

    const datasubHeadingEdit = (rowData:any) =>{        
        // setIndexHeadingId(rowData);
         return rowData.id !== "" ? <a style={{cursor:'pointer'}} onClick={handleSubHeadingDialog} ><span>Edit</span></a>:<span></span>
     }

     const dataContentHeadingEdit = (rowData:any) =>{        
        // setIndexHeadingId(rowData);
         return rowData.id !== "" ? <a style={{cursor:'pointer'}} onClick={handleContentHeadingDialog} ><span>Edit</span></a>:<span></span>
     }

     const dataEffectiveDate = (rowData:any) => {
        return rowData.effectiveDate !== "" && rowData.effectiveDate !== undefined && rowData.effectiveDate !== null ? <span>{moment(rowData.effectiveDate).format("MMMM DD, YYYY")}</span>:<span></span>
     }

     const handlePageChange =(event)=>{
        var CryptoJS = require("crypto-js");
        var encryptId = CryptoJS.AES.encrypt(event, 'secret key 123');
        var setEncryptId = encodeURIComponent(encryptId.toString());
        window.location.href = "/MettlerTestingDynamicIndexform/"+setEncryptId;      
     }

    const handleHeadingPageSave = () =>{
        setHeadingData({...inputHeadingData});
        inputHeadingData.effectiveDate = moment(inputHeadingData.effectiveDate).format("YYYYMMDD");
        var newObj = {
            "id": inputHeadingData.id,
            "heading": inputHeadingData.heading,
            "institutionName": inputHeadingData.institutionName,
            "policyTitle": inputHeadingData.policyTitle,
            "policyNumber": inputHeadingData.policyNumber,
            "effectiveDate": inputHeadingData.effectiveDate,
            "department": inputHeadingData.department,
            "subHeading": []
          }
        dispatch(createIndexByFormId(selectTitleData,newObj));
       console.log(JSON.stringify(selectTitleData));
        console.log(JSON.stringify(indexHeadingId));
    }

    const handleHeadingDialog = () =>{  
         console.log(JSON.stringify(indexHeadingId));
        if(indexHeadingId !== null){
            inputHeadingData.id = indexHeadingId.id;
            inputHeadingData.heading = indexHeadingId.heading;
            inputHeadingData.institutionName = indexHeadingId.institutionName;
            inputHeadingData.policyTitle = indexHeadingId.policyTitle;
            inputHeadingData.policyNumber = indexHeadingId.policyNumber;         
            inputHeadingData.department = indexHeadingId.department;
            inputHeadingData.effectiveDate = moment(inputHeadingData.effectiveDate).format("YYYY-MM-DDThh:mm:ss.000Z");  
            setHeadingData(indexHeadingId);
        }else{
            inputHeadingData.id = "";
            inputHeadingData.heading = "";
            inputHeadingData.institutionName = "";
            inputHeadingData.policyTitle = "";
            inputHeadingData.policyNumber = "";
            inputHeadingData.effectiveDate = "";
            inputHeadingData.department = "";
            setHeadingData({...inputHeadingData});
        }    
        if(selectTitleData === ""){
            alert("Please select a title, when you want to add");   
        }else{
            setHeadingDialog(true);
        }
     
    }

    const handleSubHeadingDialog = () => {
        if(selectTitleData === ""){
            alert("Please select a title, when you want to add");
        }else if(selectHeadingData === ""){
            alert("Please select a heading, when you want to add");
        }else if(selectTitleData !== "" && selectHeadingData !== ""){
            setSubHeadingDialog(true);
        }
        console.log(JSON.stringify(selectTitleData));
        console.log(JSON.stringify(selectHeadingData));
      
    }

    const handleSubHeadingPageSave = () =>{   
        setSubHeadingData({...inputSubHeadingData})
        var newObj = {
        "id": inputSubHeadingData.id,
        "indexContent": inputSubHeadingData.indexContent,
        "content": inputSubHeadingData.content,
        "indexContent1": []
      }
      dispatch(createSubIndexFormId(selectTitleData,selectHeadingData,newObj));
    }

    const handleIndexDialog = () =>{
        setIndexDialog(true);
    }

    const handleContentHeadingDialog = () => {
        if(selectTitleData === ""){
            alert("Please select a title, when you want to add");
        }else if(selectHeadingData === ""){
            alert("Please select a heading, when you want to add");
        }else if(selectSubHeadingData === ""){
            alert("Please select a sub-heading, when you want to add");
        }else if(selectTitleData !== "" && selectHeadingData !== "" && selectSubHeadingData !== ""){
            setContentHeadingDialog(true);
        }        
    }

    const handleContentHeadingPageSave = () =>{   
        setSubHeadingData({...inputSubHeadingData})
        var newObj = {
        "id": inputContentHeadingData.id,
        "indexContent": inputContentHeadingData.indexContent,
        "content": inputContentHeadingData.content        
      }
      dispatch(createContentIndexFormId(selectTitleData,selectHeadingData,selectSubHeadingData,newObj));
    }

    const dataAddHeading = (rowData:any) =>{
        //return setHeadingDialog(true);
    }

    return (
        <>

            <div className="bed-details" style={{ height: "1750px" }}>
                <div className="bed-details-child" />
                <div className="bed-details-child1" style={{ height: "1700px" }} />
                <div className="bedline-div" style={{ top: "83px", left: "616px", width: "calc(50% - 505px)" }} />
                <div className="bedexpand-more-24px-parent">
                    <img
                        className="bedexpand-more-24px-icon"
                        alt=""
                        src="/expand-more-24px.svg"
                    />
                    <div style={{ top: "7px", left: "-102px", position: "absolute", textAlign: "center", width: "-webkit-fill-available" }}> <i style={{ position: "relative", top: "6px", left: "-534px", cursor: "pointer" }} className="large material-icons" >arrow_back</i>Create Profile Summary</div>
                    <div style={{position:'relative',left:'1217px'}}>
                    <PrimaryButton 
label="View"
primaryButtonCursor="pointer"
onNextContainerClick={tableInputData !== null && tableInputData.length>0 ? ()=>{setListDialog(true)}:()=>{alert("No View")}}
/></div>
                </div>  
                <div className="bedorgForm-fields8" style={{ top: "142px",left:"400px" }}>
                        <div style={{ color: "#000000", fontWeight: 600 }}>All Index Records</div>

                    </div>
                 
                <DataTable style={{ border: '0px',width:'45%',top:'200px',left:'400px' }}
                        value={tableInputData} 
                        selectionMode="single" 
                        rows={50} scrollable={true}
                        responsive={true} selection={selectedHeadingRow} onSelectionChange={onSelectionChangedHeadingData}
                        emptyMessage="No records found">                       
                         <Column header="S.No." headerStyle={{background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500, width:'10%'}} style={{width:'10%', textAlign:'center'}} body={addIndexIncrement}/>
                        <Column field="title" header="Title" headerStyle={{background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500, width:'90%'}} style={{width:'90%', textAlign:'center'}}/>                                               

                    </DataTable>
                    <div style={{ display: "flex", position: "absolute", top: "148px", left: "867px", width: "calc(100% - 1151px)", justifyContent: "space-around" }}>
                <a style={{cursor:'pointer'}} onClick={handleIndexDialog}><div style={{ border: "1px groove ", cursor: "pointer", height: "31px", width: "70px", backgroundColor: "#1f489f", borderRadius: "4px", textAlign: "center" }}>
                        <span style={{ position: "relative", top: "5px", color: "#ffffff" }}>Add</span>
                    </div></a>
                    {/*
                    <div style={{ border: "1px groove ", cursor: "pointer", height: "31px", width: "70px", backgroundColor: "#C9D1E2", borderRadius: "4px", textAlign: "center" }}>
                        <span style={{ position: "relative", top: "5px", color: "black" }}>Remove</span>
                        </div>*/}
                </div>   
                <div>
                    <div className="bedorgForm-fields8" style={{ top: "560px" }}>
                        <div style={{ color: "#000000", fontWeight: 600 }}>Heading Records</div>
                        <div>
                        <FormControl className="name-input13" variant="outlined" style={{ width: '354px', position:'relative', left:'490px', top:'-17px' }}>
              <InputLabel color="primary" >Title<span>
              </span></InputLabel>
              <Select  size="medium" label="Title" name="selectTitleData" value={selectTitleData} required onChange={(newValue: any) => {
                           selectTitleData = newValue.target.value;
                           setSelectTitleData(selectTitleData);
                           var inputHeadingNewData = getAllIndexFormData.items.data.filter(l=>l.id === newValue.target.value).map(k=>{ return k.content});                             
                           setTableInputHeadingtData(inputHeadingNewData[0]);                     
                        }}>
                {tableInputData != null && tableInputData.length > 0 && tableInputData.map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.title}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            </div>
                    </div>
                 
                <DataTable style={{ border: '0px',width:'95%',left:'2.5%',top:'480px' }}
                        value={tableInputHeadingData}
                        selectionMode="multiple"
                        rows={50} scrollable={true}
                        responsive={true} selection={selectedValues} onSelectionChange={onSelectionChangedData}
                        emptyMessage="No records found">                       
                         <Column header="S.No." headerStyle={{background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500, width:'10%'}} style={{width:'6%', textAlign: "center"}} body={addHeadingIncrement}/>
                        <Column field="heading" header="Heading"  headerStyle={{background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500}} style={{textAlign: "center"}}/>
                        <Column field="institutionName" header="Institution Name" headerStyle={{background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500}}style={{textAlign: "center"}}/>
                        <Column field="policyTitle" header="Policy Title" headerStyle={{background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500}}style={{textAlign: "center"}}/>
                        <Column field="policyNumber" header="Polciy Number" headerStyle={{background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500}}style={{textAlign: "center"}}/>
                        <Column field="effectiveDate" header="Effective Date" headerStyle={{background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500}}style={{textAlign: "center"}} body={dataEffectiveDate}/>
                        <Column field="department" header="Department" headerStyle={{background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500}}style={{textAlign: "center"}}/>
                        <Column field="" header="Edit" headerStyle={{background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500,width:'6%'}} style={{width:'6%', textAlign: "center"}} body={dataHeadingEdit}/>                       

                    </DataTable>
                    <div style={{ display: "flex", position: "absolute", top: "564px", left: "1207px", width: "calc(100% - 1151px)", justifyContent: "space-around" }}>
                <a style={{cursor:'pointer'}} onClick={handleHeadingDialog}><div style={{ border: "1px groove ", cursor: "pointer", height: "31px", width: "70px", backgroundColor: "#1f489f", borderRadius: "4px", textAlign: "center" }}>
                        <span style={{ position: "relative", top: "5px", color: "#ffffff" }}>Add</span>
                    </div></a>
                    {/*
                    <div style={{ border: "1px groove ", cursor: "pointer", height: "31px", width: "70px", backgroundColor: "#C9D1E2", borderRadius: "4px", textAlign: "center" }}>
                        <span style={{ position: "relative", top: "5px", color: "black" }}>Remove</span>
                        </div>*/}
                </div>
                </div>     

                <div style={{position:'relative',top:`${0}px`}}>
                <div className="bedorgForm-fields8" style={{ top: "735px",width:'45%' }}>
                    <div style={{ color: "#000000", fontWeight: 600 }}>SubHeading Records</div>
                    <FormControl className="name-input13" variant="outlined" style={{ width: '320px', position:'relative', left:'142px', top:'-17px' }}>
              <InputLabel color="primary" >Title<span>
              </span></InputLabel>
              <Select  size="medium" label="Title" name="selectTitleData" value={selectTitleData} required onChange={(newValue: any) => {
                           selectTitleData = newValue.target.value;
                           setSelectTitleData(selectTitleData);
                           setSelectHeadingData("");
                           setSelectSubHeadingData("");
                           var inputHeadingNewData = getAllIndexFormData.items.data.filter(l=>l.id === newValue.target.value).map(k=>{ return k.content});                             
                           setTableInputHeadingtData(inputHeadingNewData[0]);                     
                        }}>
                {tableInputData != null && tableInputData.length > 0 && tableInputData.map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.title}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="name-input13" variant="outlined" style={{ width: '320px', position:'relative', left:'157px', top:'-17px' }}>
              <InputLabel color="primary" >Heading<span>
              </span></InputLabel>
              <Select disabled={selectTitleData ===""} onClick={selectTitleData ==="" ? ()=>alert("please select a title"):()=>{}} value={selectHeadingData} size="medium" label="Heading" name="selectHeadingData"  required onChange={(newValue: any) => {
                           selectHeadingData = newValue.target.value;
                           setSelectHeadingData(selectHeadingData);                        
                           setSelectSubHeadingData("");
                           console.log(JSON.stringify(newValue.target.value));
                           var inputHeadingNewData = getAllIndexFormData.items.data.filter(l=>l.id === selectTitleData).map(k=>{return k.content});
                           inputHeadingNewData = inputHeadingNewData[0].filter(m=>(m.id === newValue.target.value)).map(n=>{return n.subHeading})
                           setTableInputSubHeadingtData(inputHeadingNewData[0]);                           
                        }}>
                { tableInputHeadingData != null && tableInputHeadingData.length > 0 && tableInputHeadingData.map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.heading}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
                </div>

                <DataTable style={{ border: '0px',width:'95%',left:'2.5%',top:'792px' }}
                        value={tableInputSubHeadingData}
                        selectionMode="multiple"
                        rows={50} scrollable={true}
                        responsive={true} selection={selectedValues} onSelectionChange={onSelectionChangedData}
                        emptyMessage="No records found">                       
                        <Column header="S.No." headerStyle={{background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500, width:'10%'}} style={{width:'10%', textAlign: "center"}} body={addIncrement}/>
                        <Column field="indexContent" header="Title" headerStyle={{background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500, width:'30%'}} style={{width:'30%', textAlign: "center"}}/>
                        <Column field="content" header="Content" headerStyle={{background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500, width:'50%'}} style={{width:'50%', textAlign: "center"}}/>                       
                        <Column field="" header="Edit" headerStyle={{background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500,width:'10%'}} style={{width:'10%', textAlign: "center"}} body={datasubHeadingEdit}/>                       

                    </DataTable>
                <div style={{ display: "flex", position: "absolute", top: "742px", left: "1210px", width: "calc(100% - 1151px)", justifyContent: "space-around" }}>
                <a style={{cursor:'pointer'}} onClick={handleSubHeadingDialog}><div style={{ border: "1px groove ", cursor: "pointer", height: "31px", width: "70px", backgroundColor: "#1f489f", borderRadius: "4px", textAlign: "center" }}>
                        <span style={{ position: "relative", top: "5px", color: "#ffffff" }}>Add</span>
                    </div></a>
                    {/* <div style={{ border: "1px groove ", cursor: "pointer", height: "31px", width: "70px", backgroundColor: "#C9D1E2", borderRadius: "4px", textAlign: "center" }}>
                        <span style={{ position: "relative", top: "5px", color: "black" }}>Remove</span>
                    </div> */}
                </div>
                </div>
                <div style={{position:'relative',top:`${0}px`}}>
                <div className="bedorgForm-fields8" style={{ top: "1027px",width:'55%' }}>
                    <div style={{ color: "#000000", fontWeight: 600 }}>Content Records</div>
                    <FormControl className="name-input13" variant="outlined" style={{ width: '320px', position:'relative', left:'142px', top:'-17px' }}>
              <InputLabel color="primary" >Title<span>
              </span></InputLabel>
              <Select  size="medium" label="Title" name="selectTitleData" value={selectTitleData} required onChange={(newValue: any) => {
                           selectTitleData = newValue.target.value;
                           setSelectTitleData(selectTitleData);
                            setSelectHeadingData("");
                            setSelectSubHeadingData("");
                           var inputHeadingNewData = getAllIndexFormData.items.data.filter(l=>l.id === newValue.target.value).map(k=>{ return k.content});                             
                           setTableInputHeadingtData(inputHeadingNewData[0]);                     
                        }}>
                {tableInputData != null && tableInputData.length > 0 && tableInputData.map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.title}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="name-input13" variant="outlined" style={{ width: '320px', position:'relative', left:'157px', top:'-17px' }}>
              <InputLabel color="primary" >Heading<span>
              </span></InputLabel>
              <Select disabled={selectTitleData ===""} onClick={selectTitleData ==="" ? ()=>alert("please select a title"):()=>{}} size="medium" label="Heading" name="selectHeadingData" value={selectHeadingData} required onChange={(newValue: any) => {
                           selectHeadingData = newValue.target.value;
                           setSelectHeadingData(selectHeadingData);
                           setSelectSubHeadingData("");
                           var inputHeadingNewData = getAllIndexFormData.items.data.filter(l=>l.id === selectTitleData).map(k=>{return k.content});
                           inputHeadingNewData = inputHeadingNewData[0].filter(m=>(m.id === newValue.target.value)).map(n=>{return n.subHeading})
                           setTableInputSubHeadingtData(inputHeadingNewData[0]);                           
                        }}>
                {tableInputHeadingData != null && tableInputHeadingData.length > 0 && tableInputHeadingData.map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.heading}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl className="name-input13" variant="outlined" style={{ width: '320px', position:'relative', left:'172px', top:'-17px' }}>
              <InputLabel color="primary" >Sub-heading<span>
              </span></InputLabel>
              <Select disabled={selectTitleData ==="" || selectHeadingData === ""} onClick={selectTitleData ==="" ? ()=>alert("please select a title"):selectHeadingData === ""? ()=>alert("please select a heading"):()=>{}} size="medium" label="Sub-heading" name="selectSubHeadingData" value={selectSubHeadingData} required onChange={(newValue: any) => {                
                           selectSubHeadingData = newValue.target.value;
                           setSelectSubHeadingData(selectSubHeadingData);
                           console.log(JSON.stringify(selectHeadingData));
                           console.log(JSON.stringify(selectTitleData));
                           var inputHeadingNewData = getAllIndexFormData.items.data.filter(l=>l.id === selectTitleData).map(k=>{return k.content});
                           inputHeadingNewData = inputHeadingNewData[0].filter(m=>(m.id === selectHeadingData)).map(n=>{return n.subHeading}); 
                           inputHeadingNewData = inputHeadingNewData[0].filter(r=>(r.id === newValue.target.value)).map(s=>{return s.indexContent1});
                           setTableInputContentHeadingtData(inputHeadingNewData[0]);
                           console.log(JSON.stringify(inputHeadingNewData[0]));                                       
                        }}>
                {tableInputSubHeadingData != null && tableInputSubHeadingData.length > 0 && tableInputSubHeadingData.map((newData, i) => {
                  return (
                    <MenuItem key={i} value={newData.id}>{newData.indexContent}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText />
            </FormControl>
                </div>

                <DataTable style={{ border: '0px',width:'95%',left:'2.5%',top:'1092px' }}
                        value={tableInputContentHeadingData}
                        selectionMode="multiple"
                        rows={50} scrollable={true}
                        responsive={true} selection={selectedValues} onSelectionChange={onSelectionChangedData}
                        emptyMessage="No records found">                       
                        <Column header="S.No." headerStyle={{background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500, width:'10%'}} style={{width:'10%', textAlign: "center"}} body={addNewIncrement}/>
                        <Column field="indexContent" header="Title" headerStyle={{background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500, width:'30%'}} style={{width:'30%', textAlign: "center"}}/>
                        <Column field="content" header="Content" headerStyle={{background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500, width:'50%'}} style={{width:'50%', textAlign: "center"}}/>                       
                        <Column field="" header="Edit" headerStyle={{background: '#F2F4F9', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500,width:'10%'}} style={{width:'10%', textAlign: "center"}} body={dataContentHeadingEdit}/>                       

                    </DataTable>
                <div style={{ display: "flex", position: "absolute", top: "1032px", left: "1210px", width: "calc(100% - 1151px)", justifyContent: "space-around" }}>
                <a style={{cursor:'pointer'}} onClick={handleContentHeadingDialog}><div style={{ border: "1px groove ", cursor: "pointer", height: "31px", width: "70px", backgroundColor: "#1f489f", borderRadius: "4px", textAlign: "center" }}>
                        <span style={{ position: "relative", top: "5px", color: "#ffffff" }}>Add</span>
                    </div></a>
                    {/* <div style={{ border: "1px groove ", cursor: "pointer", height: "31px", width: "70px", backgroundColor: "#C9D1E2", borderRadius: "4px", textAlign: "center" }}>
                        <span style={{ position: "relative", top: "5px", color: "black" }}>Remove</span>
                    </div> */}
                </div>
             
                </div>

            </div>
            {/* <div className="component-5011">
                    <div className="cancel-group">
                        <SecondaryButton
                            label="Add"
                            secondaryButtonCursor="pointer"
                            onCancelContainerClick={null}
                        />
                        <div className="previous1">
                            <img className="bg-icon3" alt="" src={bottomImage} />
                            <div className="label5">Previous</div>
                        </div>
                        <PrimaryButton

                            label="View"
                            primaryButtonCursor="pointer"
                            onNextContainerClick={tableInputData !== null && tableInputData.length>0 ? ()=>{setListDialog(true)}:()=>{alert("No View")}}
                        />
                    </div>
                </div> */}
                <Dialog maxWidth={'md'} PaperProps={{ sx: { height: '300px',width:'100%',maxWidth:'500px' } }} 
          open={isIndexDialog}
          onClose={()=>{setIndexDialog(false)}}
        >
          <DialogContent style={{ padding: '0px', overflow: 'hidden' }}>
            <DialogContentText>
            <div className="bedorgForm-fields8" style={{ top: "30px", left:'55px', fontSize:'20px',width:'88%' }}>
    <div style={{ color: "#000000", fontWeight: 600 }}>Index Title</div>
</div>           
                <div className="bedorgForm-fields8" style={{ top: "115px", display: "flex", left:'55px', width:'calc(100% - 102px)'  }}>
                    <TextField
                        id="title" value={inputIndexData.title} onChange={(newValue: any) => {
                            inputIndexData.title = newValue.target.value;
                            setInputIndexData({...inputIndexData});
                        }}
                        className="name-input13"
                        color="primary"
                        variant="outlined"
                        type="text"
                        placeholder="Placeholder"
                        label="Title"
                        size="medium"
                        margin="none"
                    />                 

                </div>
                <div style={{ display: "flex", position: "absolute", top: "223px", left: "250px", width: "calc(100% - 1151px)", justifyContent: "space-around" }}>
                <a style={{cursor:'pointer'}} onClick={handleIndexPageSave}><div style={{ border: "1px groove ", cursor: "pointer", height: "31px", width: "70px", backgroundColor: "#1f489f", borderRadius: "4px", textAlign: "center" }}>
                        <span style={{ position: "relative", top: "3px", color: "#ffffff" }}>Add</span>
                    </div></a>
                    {/*
                    <div style={{ border: "1px groove ", cursor: "pointer", height: "31px", width: "70px", backgroundColor: "#C9D1E2", borderRadius: "4px", textAlign: "center" }}>
                        <span style={{ position: "relative", top: "5px", color: "black" }}>Remove</span>
                        </div>*/}
                </div>
            </DialogContentText>
          </DialogContent>
        </Dialog>
            <Dialog maxWidth={'md'} PaperProps={{ sx: { height: '500px',width:'100%' } }} 
          open={isHeadingDialog}
          onClose={()=>{setHeadingDialog(false);setHeadingData({...inputHeadingData});}}
        >
          <DialogContent style={{ padding: '0px', overflow: 'hidden' }}>
            <DialogContentText>
            <LocalizationProvider dateAdapter={AdapterDateFns}>

<div className="bedorgForm-fields8" style={{ top: "30px", left:'55px', fontSize:'20px' }}>
    <div style={{ color: "#000000", fontWeight: 600 }}>Heading </div>
</div>
<div className="bedorgForm-fields" style={{ top: "115px", display: "flex", flexDirection: "row-reverse", left:'55px', width:'calc(100% - 102px)'  }}>
    <TextField
        id="institutionName" value={inputHeadingData.institutionName} onChange={handleHeadingInputChange}
        className="name-input13"
        color="primary"
        variant="outlined"
        type="text"
        placeholder="Placeholder"
        label="InstitutionName"
        size="medium"
        margin="none"
    />
    <TextField
        id="heading" value={inputHeadingData.heading} onChange={handleHeadingInputChange}
        className="name-input13"
        color="primary"
        variant="outlined"
        type="text"
        label="Heading"
        placeholder="Placeholder"
        size="medium"
        margin="none"
    />
</div>

<div className="bedorgForm-fields2" style={{ top: "195px", display: "flex", flexDirection: "row-reverse", left:'55px', width:'calc(100% - 102px)'  }}>
    <TextField
        id="policyTitle" value={inputHeadingData.policyTitle} onChange={handleHeadingInputChange}
        className="name-input13"
        color="primary"
        variant="outlined"
        type="text"
        label="policyTitle"
        placeholder="Placeholder"
        size="medium"
        margin="none"
    />


    <TextField
        id="policyNumber" value={inputHeadingData.policyNumber} onChange={handleHeadingInputChange}
        className="name-input13"
        color="primary"
        variant="outlined"
        type="text"
        placeholder="Placeholder"
        label="PolicyNumber"
        size="medium"
        margin="none"
    />
</div>
<div className="bedorgForm-fields3" style={{ position: "absolute", top: "275px", display: "flex", left:'55px', width:'calc(100% - 102px)' }}>
    <DatePicker
        className="name-input13"
        label="EffectiveDate"      
        slotProps={{
            textField: {
                variant: "outlined",
                size: "medium",
                fullWidth: true,
                color: "primary",
            },
        }}
        value={inputHeadingData.effectiveDate}
        onChange={(newValue: any) => {
            inputHeadingData.effectiveDate = newValue;
            setHeadingData({...inputHeadingData});
        }}
    />
    <TextField
        id="department" value={inputHeadingData.department} onChange={handleHeadingInputChange}
        className="name-input13"
        color="primary"
        variant="outlined"
        type="text"
        placeholder="Placeholder"
        label="Department"
        size="medium"
        margin="none"
    />
</div>

</LocalizationProvider>
<div style={{ display: "flex", position: "absolute", top: "400px", left: "460px", width: "calc(100% - 1151px)", justifyContent: "space-around" }}>
                <a style={{cursor:'pointer'}} onClick={handleHeadingPageSave}><div style={{ border: "1px groove ", cursor: "pointer", height: "31px", width: "70px", backgroundColor: "#1f489f", borderRadius: "4px", textAlign: "center" }}>
                        <span style={{ position: "relative", top: "5px", color: "#ffffff" }}>Add</span>
                    </div></a>
                    {/*
                    <div style={{ border: "1px groove ", cursor: "pointer", height: "31px", width: "70px", backgroundColor: "#C9D1E2", borderRadius: "4px", textAlign: "center" }}>
                        <span style={{ position: "relative", top: "5px", color: "black" }}>Remove</span>
                        </div>*/}
                </div>
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <Dialog maxWidth={'md'} PaperProps={{ sx: { height: '300px',width:'100%' } }} 
          open={isSubHeadingDialog}
          onClose={()=>{setSubHeadingDialog(false)}}
        >
          <DialogContent style={{ padding: '0px', overflow: 'hidden' }}>
            <DialogContentText>
            <div className="bedorgForm-fields8" style={{ top: "30px", left:'55px', fontSize:'20px' }}>
    <div style={{ color: "#000000", fontWeight: 600 }}>SubHeading Records</div>
</div>           
                <div className="bedorgForm-fields8" style={{ top: "115px", display: "flex", left:'55px', width:'calc(100% - 102px)'  }}>
                    <TextField
                        id="sindexContent" value={inputSubHeadingData.indexContent} onChange={(newValue: any) => {
                            inputSubHeadingData.indexContent = newValue.target.value;
                            setSubHeadingData({...inputSubHeadingData});                                         
                         }}
                        className="name-input13"
                        color="primary"
                        variant="outlined"
                        type="text"
                        placeholder="Placeholder"
                        label="IndexContent"
                        size="medium"
                        margin="none"
                    />
                    <textarea
                       value={inputSubHeadingData.content} onChange={(newValue: any) => {
                        inputSubHeadingData.content = newValue.target.value;
                        setSubHeadingData({...inputSubHeadingData});                                         
                     }}
                        style={{ width: " 50%", height: "55px", borderColor: "#c4c4c4", borderRadius: "3px" }}
                        rows={3}
                        cols={30}
                    />

                </div>
                <div style={{ display: "flex", position: "absolute", top: "250px", left: "460px", width: "calc(100% - 1151px)", justifyContent: "space-around" }}>
                <a style={{cursor:'pointer'}} onClick={handleSubHeadingPageSave}><div style={{ border: "1px groove ", cursor: "pointer", height: "31px", width: "70px", backgroundColor: "#1f489f", borderRadius: "4px", textAlign: "center" }}>
                        <span style={{ position: "relative", top: "5px", color: "#ffffff" }}>Add</span>
                    </div></a>
                    {/*
                    <div style={{ border: "1px groove ", cursor: "pointer", height: "31px", width: "70px", backgroundColor: "#C9D1E2", borderRadius: "4px", textAlign: "center" }}>
                        <span style={{ position: "relative", top: "5px", color: "black" }}>Remove</span>
                        </div>*/}
                </div>
            </DialogContentText>
          </DialogContent>
        </Dialog>

        <Dialog maxWidth={'md'} PaperProps={{ sx: { height: '300px',width:'100%' } }} 
          open={isContentHeadingDialog}
          onClose={()=>{setContentHeadingDialog(false)}}
        >
          <DialogContent style={{ padding: '0px', overflow: 'hidden' }}>
            <DialogContentText>
            <div className="bedorgForm-fields8" style={{ top: "30px", left:'55px', fontSize:'20px' }}>
    <div style={{ color: "#000000", fontWeight: 600 }}>Content Records</div>
</div>           
                <div className="bedorgForm-fields8" style={{ top: "115px", display: "flex", left:'55px', width:'calc(100% - 102px)'  }}>
                    <TextField
                        id="cindexContent" value={inputContentHeadingData.indexContent} onChange={(newValue: any) => {
                            inputContentHeadingData.indexContent = newValue.target.value;
                            setContentHeadingData({...inputContentHeadingData});                                         
                         }}
                        className="name-input13"
                        color="primary"
                        variant="outlined"
                        type="text"
                        placeholder="Placeholder"
                        label="IndexContent"
                        size="medium"
                        margin="none"
                    />           
                    <textarea
                     value={inputContentHeadingData.content} onChange={(newValue: any) => {
                        inputContentHeadingData.content = newValue.target.value;
                        setContentHeadingData({...inputContentHeadingData});                                         
                     }}
                        placeholder="Placeholder"
                        style={{ width: " 50%", height: "55px", borderColor: "#c4c4c4", borderRadius: "3px" }}
                        rows={3}
                        cols={30}
                    />

                </div>
                <div style={{ display: "flex", position: "absolute", top: "250px", left: "460px", width: "calc(100% - 1151px)", justifyContent: "space-around" }}>
                <a style={{cursor:'pointer'}} onClick={handleContentHeadingPageSave}><div style={{ border: "1px groove ", cursor: "pointer", height: "31px", width: "70px", backgroundColor: "#1f489f", borderRadius: "4px", textAlign: "center" }}>
                        <span style={{ position: "relative", top: "5px", color: "#ffffff" }}>Add</span>
                    </div></a>
                    {/*
                    <div style={{ border: "1px groove ", cursor: "pointer", height: "31px", width: "70px", backgroundColor: "#C9D1E2", borderRadius: "4px", textAlign: "center" }}>
                        <span style={{ position: "relative", top: "5px", color: "black" }}>Remove</span>
                        </div>*/}
                </div>
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <Dialog maxWidth={'md'} PaperProps={{ sx: { height: '300px',width:'20%' } }} 
          open={listDialog}
          onClose={()=>{setListDialog(false)}}
        >
          <DialogContent style={{ padding: '0px', overflow: 'hidden' }}>
            <DialogContentText>
                <div className="patient-Q15-dialogTitle" style={{display:'flex', flexDirection:'column', textAlign:'center', position:'relative', top:'30px', gap:'18px'}}>
                {tableInputData !== null && tableInputData.length>0 && tableInputData.map((k,l)=>
                (<a key={l} style={{cursor:'pointer'}} onClick={()=>{handlePageChange(k.id)}}>{k.title}</a> ))}
                </div>
                
            </DialogContentText>
          </DialogContent>
        </Dialog>
        </>
    );

};
const mapStateToProps = (state: any) => {
    const { deviceFormData, getAllIndexFormData } = state;
    return {
        deviceFormData, getAllIndexFormData
    };
};

export default connect(mapStateToProps)(IndexFormController)




