import React, { useState, Dispatch, useEffect } from "react";
import { connect } from "react-redux";
import { getCurrentUser } from "../../../store/selectors/Accounts";
import { Panel } from 'primereact/panel';
import * as Constants from "../Constants/ConstantValues";

import { Card } from 'primereact/card';
import userEdit from './../../../assets/images/mettler_images/user.svg';
import userOrange from './../../../assets/images/mettler_images/user-orange.svg'
import arrowRise from './../../../assets/images/mettler_images/ArrowRise-s.svg';
import arrowFall from './../../../assets/images/mettler_images/ArrowFall-s.svg';
import switchVertical from './../../../assets/images/mettler_images/switch-vertical.svg';
import filterList from './../../../assets/images/mettler_images/filter_list.svg';
import addSymbol from './../../../assets/images/mettler_images/addSymbol.svg';
import searchImage from './../../../assets/images/mettler_images/Search.svg';
import Avatar from './../../../assets/images/mettler_images/Avatar.svg';
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import speedometerEdit from './../../../assets/images/mettler_images/speedometerImage.svg';
import patientLoginDashboardData from './../../../assets/data/PatientLogonDashboardData.json';
import verticalData from './../../../assets/images/mettler_images/dots-vertical.svg'
import { Checkbox } from "primereact/checkbox";

interface IPatientLoginDashboard {
  dispatch: Dispatch<any>;
  match: any;

}

const PatientLoginDashboard: React.FC<IPatientLoginDashboard> = ({
  dispatch, match 
  

}) => {  
  const [tableData,setTableData] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectAllCheckedValues, setSelectAllCheckValues] = useState([]);
  const [selectedRow, setSelectedRow] = useState(0);
  useEffect(() => {  
    setTableData(patientLoginDashboardData);
  }, []);

  const dataPatientName = (rowData)=>{
    return rowData != null ? <span><img style={{width:'32px',height:'32px',position:'relative',borderRadius:'32px',right:'7px'}} src={Avatar}></img>{rowData.patientName}</span>:<span></span>
  }

  const onSelectionChangedData = (rowData)=>{
    const value = rowData.value;   
    setSelectedRow(rowData.value.length);
    setSelectedValues(value); 
  }

  const onSelectionPrimaryChangedData = (rowData)=>{
    const value = rowData.value.map(i=>i.patientList);   
   // console.log(JSON.stringify(rowData.value.map(i=>i.patientList)))
    setSelectedValues(value);   
  }
   
  const dataeditData = (rowData)  =>{
    return rowData != null ? <a><img style={{width:'20px',height:'20px',position:'relative',left:'-20px'}} src={verticalData}></img></a>:<span></span>
  }
  let [getValidCount,setVaildCount] = useState(1);
  const [expandedRows, setExpandedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  
  const handleOrder =(event)=>{
    setVaildCount(getValidCount+1);
    if(getValidCount%2 === 0){
    //  console.log(JSON.stringify(tableData.sort((a, b) => a.patientId > b.patientId ? 1:-1)));
    }else{
    //  console.log(JSON.stringify(tableData.sort((a, b) => a.patientId < b.patientId ? 1:-1)));
    }
  }
 
const onRowToggleData = (row) =>{
 // console.log((row))
   setExpandedRows(row.data)
}

const allowExpansion = (rowData) => {
 // console.log(JSON.stringify(rowData));
  return rowData.value.length>0
  
};

const handleInputChange = (event:any)=>{
if(event.target.id === "PatientData"){
  const selectAll = event.checked;

  if (selectAll) {      
          setSelectAll(true);
          setSelectAllCheckValues([...tableData])
  } else {
      setSelectAll(false);
      setSelectAllCheckValues([]);
  }
}
}

let footer = <div className="content-section introduction">
<div className="p-clearfix" style={{ width: "100%", textAlign:'end',color:'#01CDFF' }} >See More
</div></div>;
const rowExpansionTemplate = (data) => { 
  return (    
 <div >
        
        <DataTable id="PatientData" dataKey="id" selection={selectedValues} onSelectionChange={onSelectionChangedData} footer={footer}
          selectionMode="multiple" style={{ marginLeft: '-40px' }} value={data.patientList} header="">
          <Column selectionMode="multiple" headerStyle={{ width: '2%', display: 'none' }} style={{ borderLeft: '0px', borderRight: '0px', textAlign: 'end', position: "relative", left: "-94px" }}></Column>
          <Column field="patientId" headerStyle={{ display: 'none' }} style={{ fontSize: '14px', WebkitTextStroke: 'thin', borderLeft: '0px', borderRight: '0px', width: '10%', paddingLeft: '0px', position: "relative", left: "-87px" }} />
          <Column field="patientName" headerStyle={{ display: 'none' }} style={{ fontSize: '14px', WebkitTextStroke: 'thin', borderLeft: '0px', borderRight: '0px', width: '16%', position: "relative", left: "-99px", whiteSpace: "norap" }} body={dataPatientName} />
          <Column field="admitDate" headerStyle={{ display: 'none' }} style={{ fontSize: '14px', WebkitTextStroke: 'thin', borderLeft: '0px', borderRight: '0px', width: '12%', position: "relative", left: "-33px" }} />
          <Column field="email" headerStyle={{ display: 'none' }} style={{ fontSize: '14px', WebkitTextStroke: 'thin', borderLeft: '0px', borderRight: '0px', width: '15%', position: "relative", left: "-25px" }} />
          <Column field="phone" headerStyle={{ display: 'none' }} style={{ fontSize: '14px', WebkitTextStroke: 'thin', borderLeft: '0px', borderRight: '0px', width: '15%', position: "relative", left: "36px" }} />
          <Column field="insurance" headerStyle={{ display: 'none' }} style={{ fontSize: '14px', WebkitTextStroke: 'thin', borderLeft: '0px', borderRight: '0px', width: '13%', position: "relative", left: "83px" }} />
          <Column field="status" headerStyle={{ display: 'none' }} style={{ fontSize: '14px', WebkitTextStroke: 'thin', borderLeft: '0px', borderRight: '0px', width: '10%', position: "relative", left: "112px" }} />
          <Column field="editData" headerStyle={{ display: 'none' }} body={dataeditData} style={{ fontSize: '14px', WebkitTextStroke: 'thin', borderLeft: '0px', borderRight: '0px', width: '2%', position: "relative", left: "87px" }} />
        </DataTable>
       
          </div>
  );
};

  return (

    <div className="p-grid p-fluid dashboard" style={{background:'white',padding:'25px 16px 16px 25px',width:'calc(100% - -7px)',justifyContent:"space-between"}}>   
    <div id="removePadding" className="p-col-12 p-md-12"></div>  
    <div id="removePadding" className="patientDashboard" style={{width: '214.297px',height: '160.121px',flexShrink: 0}}>
    <div className="patient-1-dashboardText">  
    Bed Availability 
    </div>       
    <img className="patient-1-dashboardImage" src={speedometerEdit} ></img>  
    <div><span style={{position:'relative',top:'7.65px',left:'32px'}} className="dashboard-1-count">1272</span><span style={{position:'relative',top:'7.65px',left:'98px'}} className="dashboard-1-count">345</span></div>
    <div><span style={{position:'relative',left:'8px',top:'-2px'}} className="patient-1-dashboardSpeedoText">Total No. Of Beds</span><span style={{position:'relative',left:'28px',top:'-2px'}} className="patient-1-dashboardSpeedoText">Available Beds</span></div>
            </div>    
            <div id="removePadding" style={{width:'24.08px'}}></div>  
            <div id="removePadding"  className="patientDashboard" style={{width: '214.297px',height: '160.121px',flexShrink: 0,background:'#F1FCF0'}}>
            <div><span style={{position:'relative',top:'14px',left:'14px'}} className="dashboard-1-text">Assigned by me</span></div>
            <div><span style={{position:'relative',top:'35.81px',left:'15.87px',fontSize:'24px'}} className="dashboard-1-count">872</span></div>
            <div style={{position:'relative',left:'15px',top:'35px'}} className="dashboard-1-percent-change">+11.07%<img src={arrowRise} style={{width:'11.667px',height:'11.667px'}}></img></div>
            </div>    
            <div id="removePadding" style={{width:'24.08px'}}></div>  
            <div id="removePadding"  className="patientDashboard" style={{width: '214.297px',height: '160.121px',flexShrink: 0,background:'#E9F4F8'}}>
            <div><span style={{position:'relative',top:'14px',left:'14px'}} className="dashboard-1-text">Current Patients</span></div>
            <div><span style={{position:'relative',top:'35.81px',left:'15.87px',fontSize:'24px'}} className="dashboard-1-count">750</span></div>
            <div style={{position:'relative',left:'15px',top:'35px'}} className="dashboard-1-percent-change">+11.07%<img src={arrowRise} style={{width:'11.667px',height:'11.667px'}}></img></div>
            </div>    
            <div id="removePadding" style={{width:'24.08px'}}></div>  
            <div id="removePadding"  className="patientDashboard" style={{width: '214.297px',height: '160.121px',flexShrink: 0,background:'#FCF0E3'}}>
            <div><span style={{position:'relative',top:'14px',left:'14px'}} className="dashboard-1-text">Today Admitted</span></div>
            <div><span style={{position:'relative',top:'35.81px',left:'15.87px',fontSize:'24px'}} className="dashboard-1-count">65</span></div>
            <div style={{position:'relative',left:'15px',top:'35px'}} className="dashboard-1-percent-change">+11.07%<img src={arrowRise} style={{width:'11.667px',height:'11.667px'}}></img></div>
            </div>    
            <div id="removePadding" style={{width:'24.08px'}}></div>  
            <div id="removePadding"  className="patientDashboard" style={{width: '214.297px',height: '160.121px',flexShrink: 0,background:'#F4F6FA'}}>
            <div><span style={{position:'relative',top:'14px',left:'14px'}} className="dashboard-1-text">Today Discharged</span></div>
            <div><span style={{position:'relative',top:'35.81px',left:'15.87px',fontSize:'24px'}} className="dashboard-1-count">72</span></div>
            <div style={{position:'relative',left:'15px',top:'35px'}} className="dashboard-1-percent-change">+11.07%<img src={arrowRise} style={{width:'11.667px',height:'11.667px'}}></img></div>
            </div>     
            <div id="removePadding" className="p-col-12 p-md-12"></div>  
            <div id="removePadding" style={{width:'24.08px'}}></div>          
            <div id="removePadding" className="p-col-12 p-md-12 dashboard-Title">         
              <span style={{position:'relative',left:'10px'}}  className="dashboard-Title-insideText">Bed Availability</span>
              <span className="patient-dashboard-deleteText">Delete</span><span className="patient-dashboard-count-deleteText">{selectedRow} Selected</span>
              <span style={{width:'1px',height:'20px', color:'#BBC5CE',position:'relative',left:'557px',top:'6px',borderLeftStyle:'groove'}}></span>
              <a style={{cursor:'pointer'}} onClick={(e)=>handleOrder(e)}><img src={switchVertical} style={{width:'24px',height:'24px',position:'relative',left:'570px',top:'4px'}}></img></a>
              <img src={filterList} style={{width:'24px',height:'24px',position:'relative',left:'588px',top:'3px'}}></img>
              <img src={addSymbol} style={{width:'24px',height:'24px',position:'relative',left:'604px',top:'3px'}}></img>
              <input type="text" className="dashboard-search-text" id="new" name="new" value={null} onChange={null} placeholder="Search" style={{paddingLeft:'36px',fontFamily: 'system-ui',position:'relative', width:'199px',left:'609px'}} />
              <img src={searchImage} style={{width:'20x',height:'20px',position:'relative',left:'415px',top:'5px',opacity:0.3}}></img>
            </div>    
            <div id="removePadding" className="p-col-12 p-md-12"></div>  
          {/*
            <div id="removePadding" style={{display:'flex',flexDirection:'row',marginLeft:'10px',width:'1158px',borderBottom:'2px solid #D9D9D9'}} className="p-col-12 p-md-12 Patient-datatable-name">
             <Checkbox style={{position:'relative',left:'0px'}} id="PatientData" value={setSelectAllCheckValues} onChange={handleInputChange}/>
              <div style={{position:'relative',left:'10px'}}>Patient Id</div>
              <div style={{position:'relative',left:'73px'}}>Patient Name</div>
              <div style={{position:'relative',left:'165px'}}>Admit Date</div>
              <div style={{position:'relative',left:'229px'}}>Email</div>
              <div style={{position:'relative',left:'376px'}}>Phone</div>
              <div style={{position:'relative',left:'504px'}}>Insurance</div>
              <div style={{position:'relative',left:'578px'}}>Status</div>            
              <div></div>
            </div> 
  */}
            <div id="removePadding" className="p-col-12 p-md-12">              
            <DataTable value={tableData} id="PatientData" dataKey="id" style={{border:'0px'}} expandedRows={expandedRows} onRowToggle={onRowToggleData} 
                    rowExpansionTemplate={rowExpansionTemplate}  sortMode="single" sortField="name" sortOrder={1} groupField="name"
                    selection={selectedValues} onSelectionChange={onSelectionPrimaryChangedData}>                                              
                <Column selectionMode="multiple"  expander={true} body={allowExpansion} style={{ width: '5rem',borderBottom:'1.5px solid #D9D9D9' }} />                               
                <Column  field="name" headerStyle={{display:'none'}} style={{lineHeight:'normal',fontSize:'14px',fontStyle:'normal',fontWeight:600,borderLeft:'0px',borderRight:'0px',width:'13%',borderBottom:'1.5px solid #D9D9D9',fontFamily:'Poppins',"color": "var(--default, #3F3F46)",paddingLeft:'5px',position:"relative",left:"-44px"}}/>
                  <Column  header="Patient ID" style={{fontSize:'14px',WebkitTextStroke:'thin',borderLeft:'0px',borderRight:'0px',width:'13%',borderBottom:'1.5px solid #D9D9D9',position:'relative',left:'-48px'}}/>
                  <Column header="Patient Name" style={{fontSize:'14px',WebkitTextStroke:'thin',borderLeft:'0px',borderRight:'0px',width:'15%',borderBottom:'1.5px solid #D9D9D9',position:'relative',left:'-73px'}}/>
                  <Column  header="Admit Date" style={{fontSize:'14px',WebkitTextStroke:'thin',borderLeft:'0px',borderRight:'0px',width:'10%',borderBottom:'1.5px solid #D9D9D9',position:'relative',left:'-57px'}}/>
                  <Column  header="Email" style={{fontSize:'14px',WebkitTextStroke:'thin',borderLeft:'0px',borderRight:'0px',width:'15%',borderBottom:'1.5px solid #D9D9D9',position:'relative',left:'-30px'}}/>
                  <Column  header="Phone" style={{fontSize:'14px',WebkitTextStroke:'thin',borderLeft:'0px',borderRight:'0px',width:'15%',borderBottom:'1.5px solid #D9D9D9',position:'relative',left:'-29px'}}/>
                  <Column  header="Insurance" style={{fontSize:'14px',WebkitTextStroke:'thin',borderLeft:'0px',borderRight:'0px',width:'13%',borderBottom:'1.5px solid #D9D9D9',position:'relative',left:'-30px'}}/>
                  <Column  header="Status" style={{fontSize:'14px',WebkitTextStroke:'thin',borderLeft:'0px',borderRight:'0px',width:'10%',borderBottom:'1.5px solid #D9D9D9',position:'relative',left:'-40px'}}/>
                  <Column header="" style={{borderLeft:'0px',borderRight:'0px',width:'2%',borderBottom:'1.5px solid #D9D9D9'}}/>
                </DataTable>                
                </div>    
    </div>

  );
};

const mapStateToProps = (state: any) => {
  const { deviceFormData, visaCareCaseData } = state;
  return {
    deviceFormData, visaCareCaseData
  };
};
export default connect(mapStateToProps)(PatientLoginDashboard);
