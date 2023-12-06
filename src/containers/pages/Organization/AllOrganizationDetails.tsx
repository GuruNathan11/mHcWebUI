import React, { useState, Dispatch, useEffect } from "react";
import { connect } from "react-redux";
import dotVerticalImage from './../../../assets/images/mettler_images/dots-vertical.svg';
import switchVertical from './../../../assets/images/mettler_images/switch-vertical.svg';
import filterList from './../../../assets/images/mettler_images/filter_list.svg';
import addSymbol from './../../../assets/images/mettler_images/addSymbol.svg';
import searchImage from './../../../assets/images/mettler_images/Search.svg';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getAllOrganization } from "../../../store/actions/Organization";
interface IAllOrganizationDetails {
  dispatch: Dispatch<any>;
  match: any;
  allOrganizationData: any;

}

const AllOrganizationDetails: React.FC<IAllOrganizationDetails> = ({
  dispatch, match ,allOrganizationData
  

}) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedRow, setSelectedRow] = useState(0); 
  const [tableData,setTableData] = useState(null);
  let [getValidCount,setVaildCount] = useState(1);
  let [inputOrgData,setInputOrgData] = useState("");
  useEffect(() => {      
    dispatch(getAllOrganization());
  }, []);

  const onSelectionChangedData = (rowData)=>{
    const value = rowData.value;       
    setSelectedValues(value); 
    setSelectedRow(rowData.value.length);
  }

  const dataOrgType = (rowData) =>{
    return rowData != null ? <span>{rowData.organizationdetails[0].type}</span>:<span></span>
  }

  const dataOrgName = (rowData) =>{
    return rowData != null ? <span>{rowData.organizationdetails[0].name}</span>:<span></span>
  }

  const dataVerticalImage = (rowData) =>{
    return <a style={{cursor:'pointer'}} onClick={null}><img style={{width:'22px',height:'22px',position:'relative',borderRadius:'12px',right:'23px'}} src={dotVerticalImage}></img></a>
  }

  const handleOrder =(event)=>{
    setVaildCount(getValidCount+1);
    if(getValidCount%2 === 0){
     // console.log(JSON.stringify(tableData.sort((a, b) => a.patientId > b.patientId ? 1:-1)));
    }else{
    //  console.log(JSON.stringify(tableData.sort((a, b) => a.patientId < b.patientId ? 1:-1)));
    }
  } 

  const handleAddStaff = () =>{
    window.location.href = "/MettlerAddOrganization";
  }

  
  const [isPageGetpatLoaded, setPageGetpatLoaded] = useState(false);
  if (!isPageGetpatLoaded && !allOrganizationData.isLoading  ){         
   if(allOrganizationData.items.message.code === "MHC - 0200"){
    console.log(JSON.stringify(allOrganizationData.items.data));
    setTableData(allOrganizationData.items.data.filter(t=>t.userType === "Admin" || t.userType === "Super Admin"));
   
    // console.log(JSON.stringify(allOrganizationData.items.data.filter(t=>t.organization === inputOrgData)));
   }else{
    alert(allOrganizationData.items.message.description);
   }    
      setPageGetpatLoaded(true);

  }

  const onRowSelectData = (event) =>{
    var CryptoJS = require("crypto-js"); 
  var encryptStaffId = CryptoJS.AES.encrypt(event.data.id, 'secret key 123');
   var setEncryptStaffId = encodeURIComponent(encryptStaffId.toString()); 
   window.location.href = "/MettlerOrganizationDetails/"+setEncryptStaffId;
  }

  return (

    <div className="p-grid p-fluid dashboard" style={{background:'#F2F4F9',padding:'25px 16px 16px 25px',width:'100%'}}>   
    <div id="removePadding" className="p-col-12 p-md-12"></div>     
            <div id="removePadding" style={{width:'24.08px'}}></div>          
            <div id="removePadding" className="p-col-12 p-md-12 dashboard-Title">         
              <span style={{position:'relative',left:'10px'}}  className="dashboard-Title-insideText">All Organization List</span>
              {selectedRow != 0 ?<><span className="patient-dashboard-deleteText">Delete</span><span className="patient-dashboard-count-deleteText">{selectedRow} Selected</span></>:<span style={{width:'40px'}}></span>}
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
                  selectionMode="multiple" 
                  rows={100} scrollable={true} onRowSelect={onRowSelectData}
                  responsive={true} selection={selectedValues} onSelectionChange={onSelectionChangedData}
                  emptyMessage="No records found">
                  <Column selectionMode="multiple" headerStyle={{width:'5%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500,borderBottom:'0px'}} style={{width:'8%',background:'#FFF',borderBottomWidth:'8px',borderBottomColor:'#F2F4F9',height:'52px'}}></Column>                  
                  <Column field="organizationdetails[0].type" header="Organization Type"  headerStyle={{background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500,borderBottom:'0px',width:'13%'}} style={{width:'20%',background:'#FFF',borderBottomWidth:'8px',borderBottomColor:'#F2F4F9',height:'52px'}} body={dataOrgType} />
                  <Column field="organizationdetails[0].name" header="Organization Name" headerStyle={{background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500,borderBottom:'0px',width:'33%'}} style={{width:'28%',background:'#FFF',borderBottomWidth:'8px',borderBottomColor:'#F2F4F9',height:'52px'}} body={dataOrgName}/>
                  <Column field="email" header="Email" headerStyle={{background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500,borderBottom:'0px',width:'15%',position:"relative",left:"-123px"}} style={{width:'48%',background:'#FFF',borderBottomWidth:'8px',borderBottomColor:'#F2F4F9',height:'52px'}}/>
                  <Column field="mobileNumber" header="Moble Number" headerStyle={{background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500,borderBottom:'0px',width:'27%'}} style={{width:'20%',background:'#FFF',borderBottomWidth:'8px',borderBottomColor:'#F2F4F9',height:'52px'}}/>
                  <Column field="websiteUrl" header="Website URL" headerStyle={{background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500,borderBottom:'0px',width:'14%',position:"relative",left:"-88px"}} style={{width:'45%',background:'#FFF',borderBottomWidth:'8px',borderBottomColor:'#F2F4F9',height:'52px'}}/>                  
                  <Column field="userType" header="Role" headerStyle={{ position:"relative",left:"35px",background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500,borderBottom:'0px',width:'13%'}} style={{width:'5%',background:'#FFF',borderBottomWidth:'8px',borderBottomColor:'#F2F4F9',height:'52px'}}/>
                  <Column field="" header="" headerStyle={{background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500,borderBottom:'0px'}} style={{width:'2%',background:'#FFF',borderBottomWidth:'8px',borderBottomColor:'#F2F4F9',height:'52px'}} body={dataVerticalImage} />
                </DataTable>
                </div>    
    </div> 

  );
};

const mapStateToProps = (state: any) => {
  const { deviceFormData,allOrganizationData } = state;
  const {items} = state;
  return {
    deviceFormData,allOrganizationData,items
  };
};
export default connect(mapStateToProps)(AllOrganizationDetails);
