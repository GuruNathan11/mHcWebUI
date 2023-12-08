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
import speedometerEdit from './../../../assets/images/mettler_images/speedometerImage.svg';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getAllPatient } from "../../../store/actions/Patient";
import moment from "moment";
import { HttpLogin } from "../../../utils/Http";

interface IAllPatientBedAssignList {
  dispatch: Dispatch<any>;
  match: any;
  getAllPatientData: any;
  arrayObject:any;
}

const AllPatientBedAssignList: React.FC<IAllPatientBedAssignList> = ({
  dispatch, match ,getAllPatientData,arrayObject
  

}) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedRow, setSelectedRow] = useState(0); 
  const [tableData,setTableData] = useState(null);
  let [getValidCount,setVaildCount] = useState(1);
  let [inputOrgData,setInputOrgData] = useState("");
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
    dispatch(getAllPatient());
  }, []);

  const onSelectionChangedData = (rowData)=>{
    const value = rowData.value;       
    setSelectedValues(value); 
    setSelectedRow(rowData.value.length);
  }

  const handleOrder =(event)=>{
    setVaildCount(getValidCount+1);
    if(getValidCount%2 === 0){
      //  console.log(JSON.stringify(tableData.sort((a, b) => a.patientId > b.patientId ? 1:-1)));
    }else{
      //  console.log(JSON.stringify(tableData.sort((a, b) => a.patientId < b.patientId ? 1:-1)));
    }
  }

  const dataPatientName = (rowData)=>{
     return rowData != null ? <span><img style={{width:'32px',height:'32px',position:'relative',borderRadius:'32px',right:'7px'}} src={Avatar}></img>{rowData.basicDetails[0].name[0].given +" "+rowData.basicDetails[0].name[0].family}</span>:<span></span>
   }

  const dataDateOfBirth = (rowData) =>{
    var today = new Date();
    var birthDate = new Date(moment(rowData.basicDetails[0].birthDate,"YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z")); 
    //  console.log(age_now);   // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age_now--;
    }
  
    return age_now != 0 && rowData.basicDetails[0].birthDate != null && rowData.basicDetails[0].birthDate != "string" ? <span>{age_now}</span>:<span>{rowData.basicDetails[0].birthDate}</span>
  }

  const dataGender = (rowData) =>{
    return rowData.basicDetails[0].gender != "" ? <span>{rowData.basicDetails[0].gender}</span>:<span></span>
  }

  const dataVerticalImage = (rowData) =>{
    return <a style={{cursor:'pointer'}} onClick={null}><img style={{width:'22px',height:'22px',position:'relative',borderRadius:'12px',right:'20px'}} src={dotVerticalImage}></img></a>
  }

  const dataSSNNumber = (rowData) =>{
    return rowData.basicDetails[0].ssn != "" ? <span>{rowData.basicDetails[0].ssn}</span>:<span></span>
  }

  const handleAddStaff = () =>{
    window.location.href = "/MettlerStaffInfoPage";
  }

  
  const [isPageGetpatLoaded, setPageGetpatLoaded] = useState(false);
  //
  if (!isPageGetpatLoaded && !getAllPatientData.isLoading  ){
    if(getAllPatientData.items.message.code === "MHC - 0200"){
      setTableData(getAllPatientData.items.data.filter(t=>t.organization === inputOrgData));            
     HttpLogin.axios().get("api/ptVisit/get_all")
     .then((resp) => {
      // var tempdata=res.data;   
      //       var newData = getAllPatientData.items;
      //       const replace = {
      //         patientid:'newId'
      //       }
      //       let newResult = tempdata.map((object) => {
      //        for (const key in replace) {
      //          if (object[key]) {
      //            object[replace[key]] = object[key];
      //            delete object[key];
      //          }
      //        }
      //        return object;
      //      });
      //      arrayObject = newResult;          
      
      const mergedMap = new Map();

      resp.data.data.forEach((item) => mergedMap.set(item.patientid, { ...item }));
      getAllPatientData.items.forEach((item) => mergedMap.set(item.id, { ...mergedMap.get(item.id), ...item }));
      
      const mergedArray = Array.from(mergedMap.values());
    
     })
    }     
     else{
      setTableData([]);
      alert(getAllPatientData.items.message.description);
    }
    setPageGetpatLoaded(true); 
    }
  

  const onRowSelectData = (event) =>{
    
  }

  return (

    <div className="p-grid p-fluid dashboard" style={{background:'#F2F4F9',padding:'25px 16px 16px 25px'}}>   
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
                  selectionMode="multiple" 
                  rows={50} scrollable={true} onRowSelect={onRowSelectData}
                  responsive={true} selection={selectedValues} onSelectionChange={onSelectionChangedData}
                  emptyMessage="No records found">
                  <Column selectionMode="multiple" headerStyle={{width:'4%',background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500,borderBottom:'0px'}} style={{width:'4%',background:'#FFF',borderBottomWidth:'8px',borderBottomColor:'#F2F4F9',height:'52px'}}></Column>
                  <Column field="id" header="Patient ID" headerStyle={{background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500,borderBottom:'0px',width:'15%'}} style={{background:'#FFF',borderBottomWidth:'8px',borderBottomColor:'#F2F4F9',height:'52px',width:'15%'}}/>
                  <Column field="basicDetails[0].name[0].given" header="Patient Name"  headerStyle={{background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500,borderBottom:'0px',width:'20%'}} style={{width:'20%',background:'#FFF',borderBottomWidth:'8px',borderBottomColor:'#F2F4F9',height:'52px'}} body={dataPatientName} />
                  <Column field="basicDetails[0].gender" header="Gender" headerStyle={{background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500,borderBottom:'0px',width:'12%'}} style={{width:'12%',background:'#FFF',borderBottomWidth:'8px',borderBottomColor:'#F2F4F9',height:'52px'}} body={dataGender}/>
                  <Column field="basicDetails[0].birthDate" header="Age" headerStyle={{background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500,borderBottom:'0px',width:'12%'}} style={{width:'12%',background:'#FFF',borderBottomWidth:'8px',borderBottomColor:'#F2F4F9',height:'52px'}} body={dataDateOfBirth}/>
                  <Column field="basicDetails[0].ssn" header="SSN No" headerStyle={{background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500,borderBottom:'0px',width:'15%'}} style={{width:'15%',background:'#FFF',borderBottomWidth:'8px',borderBottomColor:'#F2F4F9',height:'52px'}} body={dataSSNNumber}/>
                  <Column field="basicDetails[0].birthDate" header="Admit Date" headerStyle={{background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500,borderBottom:'0px',width:'17%'}} style={{width:'17%',background:'#FFF',borderBottomWidth:'8px',borderBottomColor:'#F2F4F9',height:'52px'}} body={dataDateOfBirth}/>                  
                  <Column field="basicDetails[0]licenseId" header="Ward & Bed Info" headerStyle={{background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500,borderBottom:'0px',width:'18%'}} style={{width:'18%',background:'#FFF',borderBottomWidth:'8px',borderBottomColor:'#F2F4F9',height:'52px'}}/>
                  <Column field="" header="" headerStyle={{background:'#F2F4F9',color:'#9DA1C3',fontFamily:'Poppins',fontSize:'14px',fontWeight:500,borderBottom:'0px',width:'3%'}} style={{width:'3%',background:'#FFF',borderBottomWidth:'8px',borderBottomColor:'#F2F4F9',height:'52px'}} body={dataVerticalImage}/>
                </DataTable>
                </div>    
    </div> 

  );
};

const mapStateToProps = (state: any) => {
  const { deviceFormData,getAllPatientData } = state;
  const {items} = state;
  return {
    deviceFormData,getAllPatientData,items
  };
};
export default connect(mapStateToProps)(AllPatientBedAssignList);
