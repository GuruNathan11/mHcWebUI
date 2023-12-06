import React,{ useState, useRef,useEffect }  from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Calendar } from "primereact/calendar";
import { ScrollPanel } from 'primereact/scrollpanel';
import {OverlayPanel} from 'primereact/overlaypanel';
import { stringify } from "querystring";
import { createBrowserHistory } from "history";
import IdleTimer from 'react-idle-timer';
import TimeoutModal from './TimeoutModal';
import { HttpLogin } from '../src/utils/Http';
import fileDocument from './assets/images/mettler_images/file-document.svg';
import * as Constants from "../src/containers/pages/Constants/ConstantValues";
import menuImage from './assets/images/mettler_images/menu.svg';
import mettlerImage from './assets/images/mettler_images/MettlerImage_Light.svg';
import notificationImage from './assets/images/mettler_images/NotificationImage_Light.svg';
import settingsImage from './assets/images/mettler_images/cogImage_Light.svg';
import Avatar from './assets/images/mettler_images/Avatar_Light.svg';
import ProfileImage from './assets/images/mettler_images/profile.svg';
import editProfileImage from './assets/images/mettler_images/editProfileImage.svg';
import changePasswordImage from './assets/images/mettler_images/Change_Password_Image.svg';
import logOutImage from './assets/images/mettler_images/LogoutImage.svg';
import closeImage from './assets/images/mettler_images/close.svg';
import downArrowImage from './assets/images/mettler_images/merge-horizontal_Light.svg';
import mailImage from './assets/images/mettler_images/mailImage_Light.svg';
import AlertTriangle from './assets/images/mettler_images/AlertTriangle.svg';
import bottomImage from './assets/images/mettler_images/bg.svg';
import greendotImage from './assets/images/mettler_images/Green_dot.svg';
import { Dialog, DialogContentText, FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import SecondaryButton from "./components/SecondaryButton";
import PrimaryButton from "./components/PrimaryButton";
import moment from "moment";



interface AppProps {
  onToggleMenu: React.MouseEventHandler;
  isLogged?: boolean;
}
 
interface AppState {
  items: Array<{}>;
  userName: string; 
  status: string;
  userfirstName: string;
  userSecondName: string;
  lastName: string;
  middleName: string;
  companyname: string;
  dateofbirth: any;
  role: string;
  userId: string ;
  isAdmin: boolean;
  isSixYearsStayDataDialog: boolean;
  openDialog:boolean;
  addOpenDialog:boolean;
  profileImage:any;
  alertMessage:any;
  showModal:boolean;
  profileOpenDialog:boolean;
  changeStatusDialog:boolean;
  endDate:any;
  isOnline:any;
}
const iPAddress = Constants.IpAddress;
const ddOptions = [
  { name: 'Profile', code: 'PR' },
  { name: 'Logout', code: 'LO' },
  
];
/*
const [selectedCountry, setSelectedCountry] = useState<any>(null);

const onCountryChange = (e: {value: any}) => {
  setSelectedCountry(e.value);
  alert(e.value);
}



const selectedCountryTemplate = (option: { name: string, code: string }, props: { placeholder: string }) => {
  if (option) {
      return (
          <div className="country-item country-item-value">
              <img alt={option.name} src="images/flag/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${option.code.toLowerCase()}`} />
              <div>{option.name}</div>
          </div>
      );
  }

  return (
      <span>
          {props.placeholder}
      </span>
  );
}

const countryOptionTemplate = (option: any) => {
  return (
      <div className="country-item">
          <img alt={option.name} src="images/flag/flag_placeholder.png"   className={`flag flag-${option.code.toLowerCase()}`} />
          <div>{option.name}</div>
      </div>
  );
}*/
export class AppTopbar extends React.Component<AppProps, AppState> {
 private menu!: Menu | null;
 private isSixYearsStayDataDialog = false;
 idleTimer:any;
 logoutTimer:any;
 history = createBrowserHistory();
 endDate=new Date();
  constructor(props: AppProps) {
    super(props);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleAddOpenDialog = this.handleAddOpenDialog.bind(this);
    this.handleAddCloseDialog = this.handleAddCloseDialog.bind(this);
    this.handleChangeStatusOpenDialog = this.handleChangeStatusOpenDialog.bind(this);
    this.handleChangeStatusCloseDialog = this.handleChangeStatusCloseDialog.bind(this);
    this.handleProfileOpenDialog = this.handleProfileOpenDialog.bind(this);
    this.handleProfileCloseDialog = this.handleProfileCloseDialog.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleInputUserChange = this.handleInputUserChange.bind(this);
    this.state = {
      isAdmin: false,
      isSixYearsStayDataDialog: false,
      openDialog:false,
      addOpenDialog:false,
      userName: "",
      status: "",
      userId: "",
      companyname: "",
      lastName: "",
      middleName: "",
      dateofbirth: "",
      userfirstName:"",
      userSecondName:"",
      role:"",
      profileImage:"",
      alertMessage:"",
      isOnline:true,
      showModal: false,
      endDate: new Date(),
      changeStatusDialog:false,
      profileOpenDialog:false,
      items: [
        {
          icon: "pi pi-fw pi-file",
          items: [
            {
              label1: "",
              icon: "pi pi-fw pi-plus",
              items: [
                {
                  label: "Bookmark",
                  icon: "pi pi-fw pi-bookmark"
                },
                {
                  label: "Video",
                  icon: "pi pi-fw pi-video"
                }
              ]
            },
            {
              label: "",
              icon: "pi pi-fw pi-plus",
              items: [
                {
                  label: "Bookmark",
                  icon: "pi pi-fw pi-bookmark"
                },
                {
                  label: "Video",
                  icon: "pi pi-fw pi-video"
                }
              ]
            },
            {
              label: "",
              icon: "pi pi-fw pi-plus",
              items: [
                {
                  label: "Bookmark",
                  icon: "pi pi-fw pi-bookmark"
                },
                {
                  label: "Video",
                  icon: "pi pi-fw pi-video"
                }
              ]
            },
            {
              label: "",
              icon: "pi pi-fw pi-plus",
              items: [
                {
                  label: "Bookmark",
                  icon: "pi pi-fw pi-bookmark"
                },
                {
                  label: "Video",
                  icon: "pi pi-fw pi-video"
                }
              ]
            }
          ]
        }
      ]
      
    };
  }

    
  componentWillMount() {
   
    var orgData = JSON.parse(window.localStorage.getItem("LOGINDATA")); 
    console.log(JSON.stringify(orgData)) ;
   if(orgData.items.data.userType[0] === "Patient"){
    
    this.setState({userName: orgData.items.data.userDetail.basicDetails[0].name[0].given+ " " + orgData.items.data.userDetail.basicDetails[0].name[0].family});
    var orgDateofBirth = orgData.items.data.userDetail.basicDetails[0].birthDate;
    var today = new Date();
    var birthDate = new Date(orgDateofBirth); 
     // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age_now--;
    }
    this.setState({dateofbirth: age_now});
   }else if(orgData.items.data.userType[0] === "Staff"){
    this.setState({userName: orgData.items.data.userDetail.name[0].given+ " " + orgData.items.data.userDetail.name[0].family});
    var orgDateofBirth = orgData.items.data.userDetail.dateofBirth;
    var today = new Date();
    var birthDate = new Date(moment(orgDateofBirth,"DDMMYYYY").format("YYYY-MM-DDTHH:mm:ss.000Z")); 
     // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age_now--;
    }
    this.setState({dateofbirth: age_now});
   }
   this.setState({isOnline:navigator.onLine});
    
  const onlineHandler =()=> {
    this.setState({isOnline:true});
  }

  const offlineHandler = ()=> {
    this.setState({isOnline:false});
  }
    	window.addEventListener("online", onlineHandler);
    	window.addEventListener("offline", offlineHandler);

	
    	return () => {
      		window.removeEventListener("online", onlineHandler);
      		window.removeEventListener("offline", offlineHandler);
    	};
  

   // console.log(age_now); 
    //return age_now != 0 && orgDateofBirth != null && orgDateofBirth != "string" ? <span>{age_now}</span>:<span>{rowData.basicDetails[0].birthDate}</span>
  }

  onIdle = () => {
    this.togglePopup();
    this.logoutTimer = setTimeout(() => {
      this.clickLogout();
    }, 1000 * 5 * 1); //
     // 5 seconds
  }

  togglePopup = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  }

  handleStayLoggedIn = () => {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
      this.logoutTimer = null;
    }
    this.idleTimer.reset();
    this.togglePopup();
  }

  handleLogout = () => {
    this.history.push('/Login');
  }
	 
  clickLogout() {

    var confirmvalue;
    confirmvalue = window.confirm("Are you sure want to Log out");
    if(confirmvalue){
      const loggedInString = localStorage.getItem("LOGINDATA");
      if (loggedInString) {
      const loggedInData = JSON.parse(loggedInString);
      const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer my-token',
            'My-Custom-Header': 'foobar'
        },
        body: JSON.stringify({ username: "MurV2023"  })
    };
  
    fetch(iPAddress+'/api/signout?jwtToken='+loggedInData.items.data.jwt.jwtToken, requestOptions)
        .then(response => response.json())
        .then(json =>{
        })
        .then(data => this.setState({ userId: loggedInData.loginhistory.userId }));
      }
      window.localStorage.setItem("AUTHDATA", "");
      window.localStorage.setItem("LOGINDATA", null);
      window.location.href = "/Login";
  // Call Backend method for logout userid 
    }else{
      window.location.reload();   
    }       
  }

  handleSubmit (){
    var orgData = JSON.parse(window.localStorage.getItem("LOGINDATA")); 
    orgData = orgData.loginInput.username;
    var CryptoJS = require("crypto-js");
    var encryptUserName = CryptoJS.AES.encrypt(orgData, 'secret key 123');
    var setEncryptUserName = encodeURIComponent(encryptUserName.toString()); 
   window.location.href = "/MettlerSetPassword/"+setEncryptUserName;
  }
  clickChange() {
   // alert(JSON.stringify(this.state.userId));
    window.location.href = "/staticui/setpassword";
    
  }

  notificationAlert(){
    alert("View Notification");
  }

  messageAlert(){
    alert("View Messages");
  }

  profileAlert(){    
    
  }

  scrollAlert(){
    alert("View Profile Detais");
  }
  showmenu() {
  
    this.isSixYearsStayDataDialog = true;
     
  }
  handleOpenDialog() {
    // this.setState({
    //   openDialog: true
    // });
  }  
  handleCloseDialog() {
    this.setState({
      openDialog: false
    });
  }
  handleAddOpenDialog() {
    this.setState({
      addOpenDialog: true,
    });
  }
  handleAddCloseDialog() {
    this.setState({   
      addOpenDialog:false
    });
    this.setState({   
      changeStatusDialog:false         
    });   
  }

  handleProfileCloseDialog(){
    this.setState({   
      profileOpenDialog:false
    });
  }
  handleProfileOpenDialog(){   
    this.setState({   
      profileOpenDialog:true         
    });
    this.setState({   
      openDialog:false      
    });
  }
  
  handleChangeStatusOpenDialog(){
    this.setState({   
      changeStatusDialog:true         
    });   
    this.setState({   
      openDialog:false         
    });  
  }

  handleChangeStatusCloseDialog(){
    this.setState({   
      changeStatusDialog:false         
    });    
  }

   handlePageChange = () => { 
    let accountUser = {
      userId: this.state.userId,
      first_Name: this.state.userName,
      last_Name: this.state.lastName,     
      status: "Active"
    };

    HttpLogin.axios().post('api/updatePersionProfileData',accountUser)
    .then((e) => { 
      this.setState({profileOpenDialog: false})
    })
  }
 
    handleInputUserChange  = (property) => {
      this.setState({userName:property.target.value});   
    };
  
    handleInputLastChange  = (property) => {
      this.setState({lastName:property.target.value});   
    };
 
  
  

  render() {
    const { isLogged } = this.props;
    const { showModal } = this.state;
    return (     
      <div style={{background:'#1F489F'}} className="layout-topbar clearfix">
       <div id="mettlerEmptyPadding" className="p-col-12 p-md-1">         
       <img style={{width:'20px',height:'20px',position:'relative',left:'76px',top:'19px'}} src={fileDocument}></img>
       </div>
       <div id="mettlerEmptyPadding" className="p-col-12 p-md-2">  
       <span className="mettlerTitleText">
        {window.location.pathname.includes("/MettlerStaffInfoPage") || window.location.pathname.includes("/MettlerAllStaffDetailsList")?"Staff Details"
        :window.location.pathname.includes("/MettlerOrganizationDetails")?"Organization"
        :window.location.pathname.includes("/MettlerPatientDetails") || window.location.pathname.includes("/MettlerPatientLoginDashboard") || window.location.pathname.includes("/MettlerPatientInfo")?"Patients"
        :window.location.pathname.includes("/MettlerCreatePatient")?"Create Patient"
        :window.location.pathname.includes("/MettlerStaffPatient")?"Patient Staff Assign"
        :window.location.pathname.includes("/MettlerAdmitPatient")?"Patient visit"
        :window.location.pathname.includes("/MettlerBedMasterConfiguration")?"Patient Bed Assign"
        :window.location.pathname.includes("/MettlerAdminDashboard")?"Configuration Settings"
        :window.location.pathname.includes("/MettlerDynamicBedAssign")?"Patient Bed Assign"
        :window.location.pathname.includes("/MettlerQ15Reports")?"Q15 Reports"
        :window.location.pathname.includes("/MettlerVisitPatientDetails")?"Patient visit(s)":"Patients"}</span>       
       </div>
       <div id="mettlerEmptyPadding" className="p-col-12 p-md-2"> </div>
       <div id="mettlerEmptyPadding"  className="p-col-12 p-md-3">  
       <img style={{width:'180px',height:'20.973px',position:'relative',marginTop:'18px'}} src={mettlerImage}></img>
       </div>
       <div id="mettlerEmptyPadding" className="p-col-12 p-md-2">  </div>
       <div id="mettlerEmptyPadding" style={{textAlign:'center',marginLeft:'-39px'}} className="p-col-12 p-md-2">  
       <a style={{cursor:'pointer'}} onClick={this.notificationAlert}><img style={{width:'17px',height:'20px',position:'relative',marginTop:'18px',left:'-19px'}} src={notificationImage}></img></a>
       <span style={{display:'inline-block',position:'relative',left:'-28px',top:'3px'}} className="notificationCount">2</span>
       <a style={{cursor:'pointer'}} onClick={this.messageAlert}><img style={{width:'24px',height:'24px',position:'relative',marginTop:'18px',left:'1px'}} src={mailImage}></img></a>
       <span style={{display:'inline-block',position:'relative',left:'-8px',top:'3px'}} className="notificationCount">2</span>
       <a style={{cursor:'pointer'}} ><img style={{width:'20px',height:'20px',position:'relative',marginTop:'18px',left:'11px'}} src={settingsImage}></img></a>
       <a style={{cursor:'pointer'}} onClick={this.handleProfileOpenDialog}><img style={{width:'32px',height:'32px',position:'relative',marginTop:'13px',borderRadius:'32px',left:'43px'}} src={Avatar}></img></a>
       <a style={{cursor:'pointer'}} onClick={this.handleOpenDialog}><img style={{width:'9px',height:'5.52px',position:'relative',marginTop:'16.5px',borderRadius:'32px',left:'48px'}} src={downArrowImage}></img></a>     
       </div>  
       {this.state.isOnline ? (
        		<img style={{width:'12px',height:'12px',position:'relative',top:'13px',borderRadius:'32px',left:'-10px'}} src={greendotImage}></img>
      		) : (
        		<span style={{position:'relative',left:'451px',fontSize:'12px',top:'-1px',backgroundColor:'red'}}>You are offline. Please check your internet connection.</span>
      		)}                
        <IdleTimer
 ref={ref => { this.idleTimer = ref }}
  element={document}
  stopOnIdle={true}
  onIdle={this.onIdle}
  timeout={1000 * 60 * 20} // 10 minites
 />
 
 <TimeoutModal
  showModal={showModal}
  togglePopup={this.togglePopup}
  handleStayLoggedIn={this.handleStayLoggedIn}
  clickLogout = {this.clickLogout}
 />
 <Dialog maxWidth={'md'} PaperProps={{sx: {overflow:'hidden',height:'150px',width:'150px',position:'absolute',top:'6px',right:'-2px'} }}  
        open={this.state.openDialog}
        onClose={this.handleCloseDialog}
      >
<DialogContentText >
  <div style={{display:'flex',flexDirection:'column',position:'relative',left:'18px',top:'18px'}}>
    <div style={{fontSize:'14px'}} className="AppTopBar-profileName">View</div>
    <div style={{position:'relative',top:'15px',fontSize:'14px'}} className="AppTopBar-profileName">Edit</div>
    <a style={{cursor:'pointer'}} onClick={this.handleChangeStatusOpenDialog}><div style={{position:'relative',top:'30px',fontSize:'14px'}} className="AppTopBar-profileName">Change Status</div></a>
    <div style={{position:'relative',top:'45px',fontSize:'14px'}} className="AppTopBar-profileName">Delete</div>
  </div>
                              
</DialogContentText></Dialog>
<Dialog maxWidth={'md'} PaperProps={{sx: {overflow:'hidden',height:'180px',width:'200px',position:'absolute',top:'6px',right:'-2px'} }}  
        open={this.state.profileOpenDialog}
        onClose={this.handleProfileCloseDialog}
      >
<DialogContentText >
  <div style={{display:'flex',flexDirection:'column'}}>
    <div style={{display:'flex',flexDirection:'row',width: "200px",height: '49px',flexShrink: '0',background:'#F2F4F8'}}>     
      <img style={{width:'32px',height:'32px',borderRadius:'32px',position:'relative',left:'13px',top:'8px'}} src={Avatar}></img>
      <div style={{position:'relative',left:'25px',top:'5px',width:'141px'}} className="AppTopBar-profileName">{this.state.userName}</div>      
      <div style={{position:'relative',left:'-115px',top:'25px',color:'#232434',fontWeight:300}} className="AppTopBar-profileName">{this.state.dateofbirth}</div>      
    </div>  
    <div style={{display:'flex',flexDirection:'row',position:'relative',left:'17px',top:'10px'}}>
    <img style={{width:'20px',height:'20px',borderRadius:'32px',opacity:'0.7'}} src={ProfileImage}></img>   
    <div style={{position:'relative',left:'19px',top:'1px'}} className="AppTopBar-subHeading-profile">My Profile</div>
    </div>  
    <div style={{display:'flex',flexDirection:'row',position:'relative',left:'17px',top:'20px'}}>
    <img style={{width:'20px',height:'20px',borderRadius:'32px',opacity:'0.7'}} src={editProfileImage}></img>   
    <div style={{position:'relative',left:'19px',top:'1px'}} className="AppTopBar-subHeading-profile">Edit Profile</div>
    </div>   
    <a style={{cursor:'pointer'}} onClick={this.handleSubmit}><div style={{display:'flex',flexDirection:'row',position:'relative',left:'17px',top:'30px'}}>
    <img style={{width:'20px',height:'20px',borderRadius:'32px',opacity:'0.7'}} src={changePasswordImage}></img>   
    <div style={{position:'relative',left:'19px',top:'1px'}} className="AppTopBar-subHeading-profile">Change Password</div>
    </div></a>
    <a style={{cursor:'pointer'}} onClick={this.clickLogout}><div style={{display:'flex',flexDirection:'row',position:'relative',left:'17px',top:'40px'}}>
    <img style={{width:'20px',height:'20px',borderRadius:'32px',opacity:'0.7'}} src={logOutImage}></img>   
    <div style={{position:'relative',left:'19px',top:'1px'}} className="AppTopBar-subHeading-profile">Log Out</div>
    </div></a>     
  </div>
                              
</DialogContentText></Dialog>
<Dialog maxWidth={'md'} PaperProps={{sx: {overflow:'hidden',height:'330px',width:'450px',position:'absolute',top:'6px'} }}  
        open={this.state.changeStatusDialog}
        onClose={this.handleChangeStatusCloseDialog}
      >
<DialogContentText >
  <>
  <div style={{display:'flex',position:'relative',left:'30px',top:'22px'}}>
    <div style={{display:'flex',flexDirection:'row'}}>
      <div className="AppTopBar-changeStatus">Change Status</div>
      <img style={{width:'24px',height:'24px',position:'relative',left:'212px',top:'1px'}} src={closeImage}></img>      
    </div>
    <img style={{width:'40px',height:'40px',position:'relative',top:'89px'}} src={AlertTriangle}></img>            
  </div>
  <div style={{position:'relative',left:'75px',top:'125px',fontSize:'14px'}} className="AppTopBar-profileName">
      Are you sure you want to change the Status?
      </div> 
      <div style={{position:'relative',left:'112px',top:'210px'}}>
      <div className="cancel-group">
        <SecondaryButton
          label="No"
          secondaryButtonCursor="pointer"
          onCancelContainerClick={this.handleChangeStatusCloseDialog}
        />
        <div className="previous1">
          <img className="bg-icon3" alt="" src={bottomImage} />
          <div className="label5">Previous</div>
        </div>
        <PrimaryButton
          label="Yes"
          primaryButtonCursor="pointer"
          onNextContainerClick={this.handleAddOpenDialog}
        />
      </div>
      </div>
      </>
</DialogContentText></Dialog>
<Dialog maxWidth={'md'} PaperProps={{sx: {overflow:'hidden',height:'330px',width:'450px',position:'absolute',top:'6px'} }}  
        open={this.state.addOpenDialog}
        onClose={this.handleAddCloseDialog}
      >
<DialogContentText >
  <>
  <div style={{display:'flex',position:'relative',left:'30px',top:'22px'}}>
    <div style={{display:'flex',flexDirection:'row'}}>
      <div className="AppTopBar-changeStatus">Change Status</div>
      <img style={{width:'24px',height:'24px',position:'relative',left:'212px',top:'1px'}} src={closeImage}></img>      
    </div>              
  </div>
  <div style={{position:'relative',top:'72px',left:'32px'}}>
    <FormControl className="secondary-name-input77" variant="outlined">
                                          <InputLabel style={{position:'absolute',top:'-9px'}} color="primary">Status</InputLabel>
                                          <Select color="primary" size="medium" label="Status" style={{width:'210px',height:'36px'}} value={this.state.status}
                                            onChange={(e) => {
                                              this.setState({   
                                                status:e.target.value         
                                              });                                              
                                            }}>
                                            <MenuItem value="1">Active</MenuItem>                                            
                                            <MenuItem value="0">InActive</MenuItem>                                            
                                          </Select>
                                          <FormHelperText />
                                        </FormControl>
                                        </div>    
  
      <div style={{position:'relative',left:'112px',top:'210px'}}>
      <div className="cancel-group">
        <SecondaryButton
          label="No"
          secondaryButtonCursor="pointer"
          onCancelContainerClick={this.handleAddCloseDialog}
        />
        <div className="previous1">
          <img className="bg-icon3" alt="" src={bottomImage} />
          <div className="label5">Previous</div>
        </div>
        <PrimaryButton
          label="Yes"
          primaryButtonCursor="pointer"
          onNextContainerClick={this.handleAddCloseDialog}
        />
      </div>
      </div>
      </>
</DialogContentText></Dialog>
    </div>
    );
  }
}