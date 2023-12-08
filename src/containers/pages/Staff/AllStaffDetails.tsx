import React, { useState, Dispatch, useEffect } from "react";
import { connect } from "react-redux";
import { getCurrentUser } from "../../../store/selectors/Accounts";
import { Panel } from 'primereact/panel';
import * as Constants from "../Constants/ConstantValues";
import { Card } from 'primereact/card';
import userEdit from './../../../assets/images/mettler_images/user.svg';
import userOrange from './../../../assets/images/mettler_images/user-orange.svg'
import arrowRise from './../../../assets/images/mettler_images/ArrowRise-s.svg';
import dotVerticalImage from './../../../assets/images/mettler_images/dots-vertical.svg';
import switchVertical from './../../../assets/images/mettler_images/switch-vertical.svg';
import filterList from './../../../assets/images/mettler_images/filter_list.svg';
import addSymbol from './../../../assets/images/mettler_images/addSymbol.svg';
import searchImage from './../../../assets/images/mettler_images/Search.svg';
import Avatar from './../../../assets/images/mettler_images/Avatar.svg';
import { Dialog, DialogContentText } from "@mui/material";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getAllStaff,deleteStaffById } from "../../../store/actions/Staff";
import moment from "moment";
import { HttpLogin } from "../../../utils/Http";

interface IAllStaffDetails {
  dispatch: Dispatch<any>;
  match: any;
  getAllStaffData: any;

}

const AllStaffDetails: React.FC<IAllStaffDetails> = ({
  dispatch, match ,getAllStaffData
  

}) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedRow, setSelectedRow] = useState(0); 
  const [tableData,setTableData] = useState(null);
  let [getValidCount,setVaildCount] = useState(1);
  let [inputOrgData,setInputOrgData] = useState("");
  const [newDialog,setNewDialog] = useState(false);
  const [rowDataValue,setRowDataValue] = useState(null);

  useEffect(() => {  
    var orgData = JSON.parse(window.localStorage.getItem("LOGINDATA"));
    orgData = orgData.loginInput.organization;   
   HttpLogin.axios().get("api/org/getById/"+orgData)
   .then((res) => {
    if(res.data.message.code === "MHC - 0200"){      
      setInputOrgData(res.data.data.id);
    }else{ 
      alert(res.data.message.description);      
      setInputOrgData("");
    }


   })
    dispatch(getAllStaff());
  }, []);

  const onSelectionChangedData = (rowData)=>{
    const value = rowData.value;       
    setSelectedValues(value); 
    setSelectedRow(rowData.value.length);
  }

  const handleOrder =(event)=>{
    setVaildCount(getValidCount+1);
    if(getValidCount%2 === 0){
     // console.log(JSON.stringify(tableData.sort((a, b) => a.patientId > b.patientId ? 1:-1)));
    }else{
    //  console.log(JSON.stringify(tableData.sort((a, b) => a.patientId < b.patientId ? 1:-1)));
    }
  }
  const dataStaffName = (rowData)=>{ 
    return rowData != null ? <span><img style={{width:'32px',height:'32px',position:'relative',borderRadius:'32px',right:'7px'}} src={Avatar}></img>{rowData.name[0].given}</span>:<span></span>
  }

  const dataStaffDOB = (rowData) =>{
    return rowData.dateofBirth != "string" ? <span>{moment(rowData.dateofBirth,"YYYYMMDD").format("MMM DD,YYYY")}</span>:<span>{rowData.dateofBirth}</span>
  }

  const dataVerticalImage = (rowData) =>{
    return <a style={{cursor:'pointer'}} onClick={()=>staffEditChange(rowData)}>{rowData.id != "" ? <><img style={{width:'20px',height:'20px',opacity:0.8}} src={dotVerticalImage}></img>
    </>:<span><img style={{width:'20px',height:'20px',opacity:0.8}} src={dotVerticalImage}></img></span>}</a>;
  }

  const dataStaffStartDate= (rowData) =>{
    return rowData.employeeDetails[0].startDate !== "string" && rowData.employeeDetails[0].startDate !== "" && rowData.employeeDetails[0].startDate !== null ? <span>{moment(rowData.employeeDetails[0].startDate,"YYYYMMDD").format("MMM DD,YYYY")}</span>:<span>{rowData.employeeDetails[0].startDate}</span>
  }

  const dataStaffMobile = (rowData) =>{
    return rowData.contact[0].mobilePhone !== "string" && rowData.contact[0].mobilePhone !== "" && rowData.contact[0].mobilePhone !== null ? <span>{rowData.contact[0].mobilePhone}</span>:<span>--</span>
  }

  const handleAddStaff = () =>{
    window.location.href = "/MettlerStaffInfoPage";
  }

  const staffEditChange = (rowData)=>{
    setNewDialog(true);
    setRowDataValue(rowData);  
  }

  const [isPageGetpatLoaded, setPageGetpatLoaded] = useState(false);
  if (!isPageGetpatLoaded && !getAllStaffData.isLoading  ){         
   if(getAllStaffData.items.message.code === "MHC - 0200"){
    console.log(JSON.stringify(getAllStaffData.items.data.map(t=>{return t.organization})));
      console.log(JSON.stringify(inputOrgData));
    setTableData(getAllStaffData.items.data.filter(t=>t.organization === inputOrgData));
    // console.log(JSON.stringify(getAllStaffData.items.data.filter(t=>t.organization === inputOrgData)));
   }else{
    alert(getAllStaffData.items.message.description);
   }    
      setPageGetpatLoaded(true);

  }

  const onRowSelectData = (event) =>{
    console.log(JSON.stringify(event.data));
    var CryptoJS = require("crypto-js"); 
  var encryptStaffId = CryptoJS.AES.encrypt(event.data.id, 'secret key 123');
   var setEncryptStaffId = encodeURIComponent(encryptStaffId.toString()); 
   window.location.href = "/MettlerStaffInfoPage/"+setEncryptStaffId;
  }

  const deleteStaff = (rowData)=>{
    console.log(JSON.stringify(rowData.username));
    dispatch(deleteStaffById(rowData.username));
    alert("Staff deleted")
    window.location.reload();
  }

  return (

    <div className="p-grid p-fluid dashboard" style={{background:'#F2F4F9',padding:'25px 16px 16px 25px',width:'100%'}}>   
    <div id="removePadding" className="p-col-12 p-md-12"></div>     
            <div id="removePadding" style={{width:'24.08px'}}></div>          
            <div id="removePadding" className="p-col-12 p-md-12 dashboard-Title">         
              <span style={{position:'relative',left:'10px'}}  className="dashboard-Title-insideText">All Staff List</span>
              {selectedRow != 0 ?<><span className="patient-dashboard-deleteText">Delete</span><span className="patient-dashboard-count-deleteText">{selectedRow} Selected</span></>:<span style={{width:'162px'}}></span>}
              <span style={{width:'1px',height:'20px', color:'#BBC5CE',position:'relative',left:'557px',top:'6px',borderLeftStyle:'groove'}}></span>
              <a style={{cursor:'pointer'}} onClick={(e)=>handleOrder(e)}><img src={switchVertical} style={{width:'24px',height:'24px',position:'relative',left:'570px',top:'4px'}}></img></a>
              <img src={filterList} style={{width:'24px',height:'24px',position:'relative',left:'588px',top:'3px'}}></img>
              <a style={{cursor:'pointer'}} onClick={handleAddStaff}><img src={addSymbol} style={{width:'24px',height:'24px',position:'relative',left:'604px',top:'3px'}}></img></a>
              <input type="text" className="dashboard-search-text" id="new" name="new" value={null} onChange={null} placeholder="Search" style={{paddingLeft:'36px',fontFamily: 'system-ui',position:'relative', width:'199px',left:'609px'}} />
              <img src={searchImage} style={{width:'20x',height:'20px',position:'relative',left:'415px',top:'5px',opacity:0.3}}></img>
            </div>                
            <div id="removePadding" className="p-col-12 p-md-12"></div>   
            <div id="removePadding" className="p-col-12 p-md-12">               
            <DataTable style={{border:'0px'}}
                  value={tableData} 
                  selectionMode="multiple" onRowSelect={onRowSelectData}
                  rows={100} scrollable={true} 
                  responsive={true} selection={selectedValues} onSelectionChange={onSelectionChangedData}
                  emptyMessage="No records found">
                  <Column selectionMode="multiple" headerStyle={{width:'3%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500,borderBottom:'0px'}} style={{width:'3%',background:'#FFF',borderBottomWidth:'8px',borderBottomColor:'#F2F4F9',height:'52px'}}></Column>
                  <Column field="id" header="Staff ID" headerStyle={{background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500,borderBottom:'0px',width:'12%'}} style={{background:'#FFF',borderBottomWidth:'8px',borderBottomColor:'#F2F4F9',height:'52px'}}/>
                  <Column field="name[0].given" header="Staff Name"  headerStyle={{background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500,borderBottom:'0px',width:'14%'}} style={{width:'14%',background:'#FFF',borderBottomWidth:'8px',borderBottomColor:'#F2F4F9',height:'52px'}} body={dataStaffName} />
                  <Column field="dateofBirth" header="Date of Birth" headerStyle={{background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500,borderBottom:'0px',width:'14%'}} style={{width:'14%',background:'#FFF',borderBottomWidth:'8px',borderBottomColor:'#F2F4F9',height:'52px'}} body={dataStaffDOB}/>
                  <Column field="ssn" header="SSN" headerStyle={{background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500,borderBottom:'0px',width:'14%'}} style={{width:'14%',background:'#FFF',borderBottomWidth:'8px',borderBottomColor:'#F2F4F9',height:'52px'}}/>
                  <Column field="contact[0].mobilePhone" header="Mobile" headerStyle={{background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500,borderBottom:'0px',width:'14%'}} style={{width:'14%',background:'#FFF',borderBottomWidth:'8px',borderBottomColor:'#F2F4F9',height:'52px'}} body={dataStaffMobile}/>
                  <Column field="role" header="Role" headerStyle={{background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500,borderBottom:'0px',width:'14%'}} style={{width:'14%',background:'#FFF',borderBottomWidth:'8px',borderBottomColor:'#F2F4F9',height:'52px'}} />                  
                  <Column field="employeeDetails[0].startDate" header="Start Date" headerStyle={{background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500,borderBottom:'0px',width:'13%'}} style={{width:'13%',background:'#FFF',borderBottomWidth:'8px',borderBottomColor:'#F2F4F9',height:'52px'}} body={dataStaffStartDate}/>
                  {/* <Column field="" header="" headerStyle={{background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500,borderBottom:'0px'}} style={{background:'#FFF',borderBottomWidth:'8px',borderBottomColor:'#F2F4F9',height:'52px'}} body={dataVerticalImage}/> */}
                </DataTable>
                </div>   
                <Dialog maxWidth={'md'} PaperProps={{sx: {overflow:'hidden',height:'120px',width:'150px'} }}  
        open={newDialog}
        onClose={()=>setNewDialog(false)}
      >
<DialogContentText >
  <div style={{display:'flex',flexDirection:'column',position:'relative',left:'18px',top:'18px'}}>  
    <a style={{cursor:'pointer'}} onClick={()=>onRowSelectData(rowDataValue)}><div style={{position:'relative',top:'15px',fontSize:'14px'}} className="AppTopBar-profileName">Edit</div>    </a>
    <a style={{cursor:'pointer'}} onClick={()=>deleteStaff(rowDataValue)}><div style={{position:'relative',top:'30px',fontSize:'14px'}} className="AppTopBar-profileName">Delete</div></a>
  </div>
                              
</DialogContentText></Dialog> 
    </div> 

  );
};

const mapStateToProps = (state: any) => {
  const { deviceFormData,getAllStaffData } = state;
  const {items} = state;
  return {
    deviceFormData,getAllStaffData,items
  };
};
export default connect(mapStateToProps)(AllStaffDetails);
