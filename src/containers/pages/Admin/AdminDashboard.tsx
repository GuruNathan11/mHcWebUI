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
import fileDocument from './../../../assets/images/mettler_images/file-document11.svg';
import dashboardPocket from './../../../assets/images/mettler_images/dashboardPocket.svg';
import newsPaperImage from './../../../assets/images/mettler_images/newspaper.svg';
import dockBottomImage from './../../../assets/images/mettler_images/dock-bottom.svg';
import briefCase from './../../../assets/images/mettler_images/briefcase.svg';
import SetiingsImage from './../../../assets/images/mettler_images/RiSettings4Line.svg';
import usersImage from './../../../assets/images/mettler_images/users.svg';
import chartBar from './../../../assets/images/mettler_images/chart-bar.svg';
import database from './../../../assets/images/mettler_images/database.svg';

interface IAdminDashboard {}
interface IAdminDashboard {
    StaticPage: any;

    state: {
      nodes: [],
      checked: [],
      expanded: []
    }
}
const  AdminDashboard: React.FC<IAdminDashboard> = ({
 

    
}) => {

  const [spinner, setSpinner] = useState(false); 
  const stafflink = (event: any) => {
    window.location.href = "/MettlerStaffInfoPage/"
  }
  const staffassimentlink = (event: any) => {
    window.location.href = "/MettlerStaffPatient/"
  }
  const q15saftychecklink = (event: any) => {
    window.location.href = "/MettlerSafetyCheck/"
  }
  return  (
    <div id="mettlerEmptyPadding"  > 
    <div id="mettlerEmptyPadding" style={{display:'flex',flexDirection:'row'}} className="p-col-12 p-md-12">
    <div style={{marginLeft:'95px',marginTop:'40px'}} className="Admin-home-page">
    <div style={{width:'40px',height:'40px',position:'relative',left:'21px',top:'24px'}} className="Admin-dashboard-1-IconBG">
        <img style={{width:'20px',height:'20px'}} src={fileDocument} />
        <div style={{minWidth:'max-content',position:'relative',left:'-71px',top:'42px'}} className="Admin-dashboard-Title1">Patient Management</div>
        <div style={{position:'absolute',left:'0px',width:'282px',top:'79px'}} className="Admin-dashboard-1-content">Digital tool designed to streamline and enhance the management of patient care in healthcare settings. </div>
        <div style={{minWidth:'max-content',position:'relative',left:'-285px',top:'145px'}} className="Admin-dashboard-1-viewAppcontent">View Application</div>
    </div>
    </div>
    <div style={{marginLeft:'31px',marginTop:'40px'}} className="Admin-home-page">
    <div style={{width:'40px',height:'40px',position:'relative',left:'21px',top:'24px',background:'#5BCBFA'}} className="Admin-dashboard-1-IconBG">
        <img style={{width:'20px',height:'20px'}} src={dashboardPocket} />
        <div style={{minWidth:'max-content',position:'relative',left:'-71px',top:'42px',cursor: 'pointer'}} onClick={stafflink} className="Admin-dashboard-Title1">Staff Details</div>
        <div style={{position:'absolute',left:'0px',width:'282px',top:'79px'}} className="Admin-dashboard-1-content">Digital tool designed to streamline and enhance the management of patient care in healthcare settings. </div>
        <div style={{minWidth:'max-content',position:'relative',left:'-209px',top:'145px'}} className="Admin-dashboard-1-viewAppcontent">View Application</div>
    </div>
    </div>
    <div style={{marginLeft:'31px',marginTop:'40px'}} className="Admin-home-page">
    <div style={{width:'40px',height:'40px',position:'relative',left:'21px',top:'24px',background:'#DD6B45'}} className="Admin-dashboard-1-IconBG">
        <img style={{width:'20px',height:'20px'}} src={newsPaperImage} />
        <div style={{minWidth:'max-content',position:'relative',left:'-71px',top:'42px',cursor: 'pointer'}}  onClick={q15saftychecklink }className="Admin-dashboard-Title1">Q-15 Minutes Safety checks Config</div>
        <div style={{position:'absolute',left:'0px',width:'282px',top:'79px'}} className="Admin-dashboard-1-content">Digital tool designed to streamline and enhance the management of patient care in healthcare settings. </div>
        <div style={{minWidth:'max-content',position:'relative',left:'-392px',top:'145px'}} className="Admin-dashboard-1-viewAppcontent">View Application</div>
    </div>
    </div>
    </div>    
    <div id="mettlerEmptyPadding" style={{display:'flex',flexDirection:'row'}} className="p-col-12 p-md-12">
    <div style={{marginLeft:'95px',marginTop:'40px'}} className="Admin-home-page">
    <div style={{width:'40px',height:'40px',position:'relative',left:'21px',top:'24px',background:'#60A3DE'}} className="Admin-dashboard-1-IconBG">
        <img style={{width:'20px',height:'20px'}} src={dockBottomImage} />
        <div style={{minWidth:'max-content',position:'relative',left:'-71px',top:'42px'}} className="Admin-dashboard-Title1">Content Management</div>
        <div style={{position:'absolute',left:'0px',width:'282px',top:'79px'}} className="Admin-dashboard-1-content">Digital tool designed to streamline and enhance the management of patient care in healthcare settings. </div>
        <div style={{minWidth:'max-content',position:'relative',left:'-291px',top:'145px'}} className="Admin-dashboard-1-viewAppcontent">View Application</div>
    </div>
    </div>
    <div style={{marginLeft:'31px',marginTop:'40px'}} className="Admin-home-page">
    <div style={{width:'40px',height:'40px',position:'relative',left:'21px',top:'24px',background:'#CB45AF'}} className="Admin-dashboard-1-IconBG">
        <img style={{width:'20px',height:'20px'}} src={briefCase} />
        <div style={{minWidth:'max-content',position:'relative',left:'-71px',top:'42px',cursor: 'pointer'}} onClick={staffassimentlink} className="Admin-dashboard-Title1">Assignments</div>
        <div style={{position:'absolute',left:'0px',width:'282px',top:'79px'}} className="Admin-dashboard-1-content">Digital tool designed to streamline and enhance the management of patient care in healthcare settings. </div>
        <div style={{minWidth:'max-content',position:'relative',left:'-218px',top:'145px'}} className="Admin-dashboard-1-viewAppcontent">View Application</div>
    </div>
    </div>
    <div style={{marginLeft:'31px',marginTop:'40px'}} className="Admin-home-page">
    <div style={{width:'40px',height:'40px',position:'relative',left:'21px',top:'24px',background:'#4B4FD4'}} className="Admin-dashboard-1-IconBG">
        <img style={{width:'20px',height:'20px'}} src={SetiingsImage} />
        <div style={{minWidth:'max-content',position:'relative',left:'-71px',top:'42px'}} className="Admin-dashboard-Title1">Administration Settings</div>
        <div style={{position:'absolute',left:'0px',width:'282px',top:'79px'}} className="Admin-dashboard-1-content">Digital tool designed to streamline and enhance the management of patient care in healthcare settings. </div>
        <div style={{minWidth:'max-content',position:'relative',left:'-303px',top:'145px'}} className="Admin-dashboard-1-viewAppcontent">View Application</div>
    </div>
    </div>
    </div>  
    <div id="mettlerEmptyPadding" style={{display:'flex',flexDirection:'row'}} className="p-col-12 p-md-12">
    <div style={{marginLeft:'95px',marginTop:'40px'}} className="Admin-home-page">
    <div style={{width:'40px',height:'40px',position:'relative',left:'21px',top:'24px',background:'#6EB389'}} className="Admin-dashboard-1-IconBG">
        <img style={{width:'20px',height:'20px'}} src={usersImage} />
        <div style={{minWidth:'max-content',position:'relative',left:'-71px',top:'42px'}} className="Admin-dashboard-Title1">Inventory Management</div>
        <div style={{position:'absolute',left:'0px',width:'282px',top:'79px'}} className="Admin-dashboard-1-content">Digital tool designed to streamline and enhance the management of patient care in healthcare settings. </div>
        <div style={{minWidth:'max-content',position:'relative',left:'-303px',top:'145px'}} className="Admin-dashboard-1-viewAppcontent">View Application</div>
    </div>
    </div>
    <div style={{marginLeft:'31px',marginTop:'40px'}} className="Admin-home-page">
    <div style={{width:'40px',height:'40px',position:'relative',left:'21px',top:'24px',background:'#60A3DE'}} className="Admin-dashboard-1-IconBG">
        <img style={{width:'20px',height:'20px'}} src={chartBar} />
        <div style={{minWidth:'max-content',position:'relative',left:'-71px',top:'42px'}} className="Admin-dashboard-Title1">Report/Dashboard</div>
        <div style={{position:'absolute',left:'0px',width:'282px',top:'79px'}} className="Admin-dashboard-1-content">Digital tool designed to streamline and enhance the management of patient care in healthcare settings. </div>
        <div style={{minWidth:'max-content',position:'relative',left:'-263px',top:'145px'}} className="Admin-dashboard-1-viewAppcontent">View Application</div>
    </div>
    </div>
    <div style={{marginLeft:'31px',marginTop:'40px'}} className="Admin-home-page">
    <div style={{width:'40px',height:'40px',position:'relative',left:'21px',top:'24px',background:'#50B2C4'}} className="Admin-dashboard-1-IconBG">
        <img style={{width:'20px',height:'20px'}} src={database} />
        <div style={{minWidth:'max-content',position:'relative',left:'-71px',top:'42px'}} className="Admin-dashboard-Title1">Master Data Configuration</div>
        <div style={{position:'absolute',left:'0px',width:'282px',top:'79px'}} className="Admin-dashboard-1-content">Digital tool designed to streamline and enhance the management of patient care in healthcare settings. </div>
        <div style={{minWidth:'max-content',position:'relative',left:'-327px',top:'145px'}} className="Admin-dashboard-1-viewAppcontent">View Application</div>
    </div>
    </div>
    </div> 
    <div id="mettlerEmptyPadding" style={{height:'25px'}} className="p-col-12 p-md-12"></div>
      </div>
    );
        
    
};
const mapStateToProps = (state: any) => {
    const { deviceFormData,I907FormData } = state;
    return {
        deviceFormData,I907FormData
    };
};
 export default connect(mapStateToProps)(AdminDashboard)