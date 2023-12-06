import { Checkbox } from "primereact/checkbox";
import React, { Dispatch, useState, useEffect } from "react";
import 'list-to-tree';
import 'array-to-tree';
import 'react-dropdown-tree-select/dist/styles.css'
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import eyeImage from '../../../assets/images/mettler_images/eye.svg';
import { connect } from "react-redux";
import arrowRight from './../../../assets/images/mettler_images/arrow-right.svg';
import mettlerImage from './../../../assets/images/mettler_images/mettlerImage.svg';
import isolationMode from './../../../assets/images/mettler_images/Isolation_Mode.svg';
import { Button } from "primereact/button";
import restPasswordData from '../../../assets/data/ResetPassword.json';
import NewPasswordData from '../../../assets/data/NewPasswordData.json';
import { saveResetPassword, reCreatePassword } from "../../../store/actions/Login";

interface ISetNewPassword {}
interface ISetNewPassword {
  dispatch: Dispatch<any>;
    StaticPage: any;
    match: any;
    resetPasswordData:any;
    encRyptsetpassword:any;
    encryptUserNameId: any;
    reCreatePasswordData:any;
    state: {
      nodes: [],
      checked: [],
      expanded: []
    }
}
const  SetNewPassword: React.FC<ISetNewPassword> = ({
  dispatch, 
  match,resetPasswordData,encRyptsetpassword, encryptUserNameId, reCreatePasswordData
    
}) => {
  const [encRyptmailId, setencRyptscretkey] = useState(encRyptsetpassword);
  const [spinner, setSpinner] = useState(false); 
  const [decryptMail,setDecryptMail] = useState(null);
  let [encryptUserName, setEncryptUserName] = useState(encryptUserNameId);
  let [decryptUserName, setDecryptUserName] = useState("");
  useEffect(() => { 
    var CryptoJS = require("crypto-js");
    if(match.params.userName !== ""){
      encryptUserNameId = match.params.userName;
      setEncryptUserName(encryptUserNameId); 
      let encRyptUserName = decodeURIComponent(encryptUserNameId);
      let encRyptsetUserName = CryptoJS.AES.decrypt(encRyptUserName.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
      setDecryptUserName(encRyptsetUserName); 
    }
    if(match.params.mail !== ""){
      encRyptsetpassword = match.params.mail;
      setencRyptscretkey(encRyptsetpassword); 
      let encRyptsetpasswordid = decodeURIComponent(encRyptsetpassword);
      let encRyptsetpasswordtkey = CryptoJS.AES.decrypt(encRyptsetpasswordid.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
     setDecryptMail(encRyptsetpasswordtkey); 
    }
 
 
//console.log(JSON.stringify(encRyptsetUserName));
  },[]);
  const backToLogin = ()=>{
    window.location.href = "/Login";
  }
 

  let [inputFormdata,setInputFormdata] = useState(restPasswordData);
  let [inputNewFormData, setInputNewFormData] = useState(NewPasswordData);

  const handleInputChange = (event:any)=>{
    
    inputFormdata.email=decryptMail;
    if(event.target.id === "password"){
      inputFormdata.newPassword = event.target.value;          
    }else if(event.target.id === "confirmPassword"){
      inputFormdata.confirmNewPass = event.target.value;          
    }
    setInputFormdata({...inputFormdata});
  }

  const handleNewInputChange = (event:any)=>{
    inputNewFormData.username = decryptUserName;
    if(event.target.id === "oldPassword"){
      inputNewFormData.oldPassword = event.target.value;          
    }

    setInputNewFormData({...inputNewFormData});
  }

  const handleChangePassword = (event:any)=>{
    setInputFormdata({...inputFormdata});
    inputNewFormData.newPassword = inputFormdata.newPassword;
    inputNewFormData.confirmNewPassword = inputFormdata.confirmNewPass;
    setInputNewFormData({...inputNewFormData});
    console.log(JSON.stringify(inputNewFormData));
    dispatch(reCreatePassword(inputNewFormData));
  }

  const [isPageLoaded, setPageLoaded] = useState(false);

 if (!isPageLoaded && !resetPasswordData.isLoading) {
    if (resetPasswordData.item !== null && resetPasswordData.items !== "") {
      // console.log("resetPasswordData.items = " + JSON.stringify(resetPasswordData.items));
      if(resetPasswordData.items.message.code!==undefined && resetPasswordData.items.message.code==="MHC - 0200"){
          window.location.href = "/Login";
      } else {
        alert(resetPasswordData.items.description);
        
      }
     
    }
  }

  const [isNewPageLoaded, setNewPageLoaded] = useState(false);

 if (!isNewPageLoaded && !reCreatePasswordData.isLoading) {
  
       console.log("resetPasswordData.items = " + JSON.stringify(reCreatePasswordData));
      if(reCreatePasswordData.items.message.code!==undefined !== undefined && reCreatePasswordData.items.message.code === "MHC - 0200"){
          window.location.href = "/Login";
      } else {
        alert(reCreatePasswordData.items.message.description);
        
      }
     
    
    setNewPageLoaded(true);
  }

  if (!reCreatePasswordData && reCreatePasswordData.isFormSubmit) {
  
    setTimeout(() => {
      setNewPageLoaded(false);

    }, (1000));
  }
  const[passwordVisiblity, setPasswordVisiblity]=useState(false);
  const[oldPasswordInputType, setOldPasswordInputType]=useState('password');
  const[passwordInputType, setPasswordInputType]=useState('password');
  const[confirmPasswordInputType, setconfirmPasswordInputType]=useState('password');
  const togglePassVisiblity = (event: any) => {
    setPasswordVisiblity(!passwordVisiblity)
     if(event === 1){
      passwordVisiblity ? setOldPasswordInputType("password") : setOldPasswordInputType("text")
     }else if(event === 2){
      passwordVisiblity ? setPasswordInputType("password") : setPasswordInputType("text")
     }else{
      passwordVisiblity ? setconfirmPasswordInputType("password") : setconfirmPasswordInputType("text")
     }
     
    
   }
   const  handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      otpKeyPassCodePage(event);
}
}
  if (!resetPasswordData && resetPasswordData.isFormSubmit) {
  
    setTimeout(() => {
      setPageLoaded(false);

    }, (1000));
  }
  const otpKeyPassCodePage = (event:any)=>{    
    inputFormdata.email=decryptMail;
    if(inputFormdata.newPassword === null || inputFormdata.newPassword === ""){   
      alert("Please Enter New Password");
      return false;
    }else if(inputFormdata.confirmNewPass === null || inputFormdata.confirmNewPass === ""){   
      alert("Please Enter Confirm Password");
      return false;
    }else if(inputFormdata.newPassword !== inputFormdata.confirmNewPass ){
      alert("Please Enter  New Password and   Confirm Password is Same");
      return false;
    }else{
      dispatch(saveResetPassword(inputFormdata));
    }
   
  }


  return  (
    <div className="p-grid forgot-section" style={{background:'#fff'}}>      
    <div className="p-col-12 p-md-3"></div>
    <div className="p-col-12 p-md-6">
    <div className="forgotAlign">
    <img src={mettlerImage} style={{width:'247px',height:'28.779px',flexShrink:0,marginTop:'45px'}} alt="MettlerHealth.png"></img>  
    <img src={isolationMode} style={{width:'120px',height:'130.909px',flexShrink:0,marginTop:'78px'}} alt="MettlerHealth.png"></img>  
    <div className="forgotPasswordPageText">Set New Password</div>
    <div className="additionalText">Your new password must be different to previously used passwords.</div>
    <div hidden={decryptUserName === ""} style={{marginTop:'19px'}}>
    <input  id="oldPassword" className="forgotInput" style={{paddingLeft:'17px',fontFamily: 'system-ui',opacity: 0.4000000059604645,color:'#123A94',border: '2px solid #DCDDE5',height:'45px'}} onKeyDown={handleKeyDown} value={inputNewFormData.oldPassword} placeholder="Old Password"type={oldPasswordInputType} autoFocus  onChange={handleNewInputChange}/>
    <a id="togglePassword" style={{cursor:'pointer'}} onClick={()=>togglePassVisiblity(1)}><img style={{position:'relative',marginLeft:'-16px',left:'-18px',marginTop:'-5px'}} typeof={oldPasswordInputType} onClick={togglePassVisiblity} src={eyeImage}></img></a>
    </div>
    <div style={{marginTop:'19px'}}>
    <input  id="password" className="forgotInput" style={{paddingLeft:'17px',fontFamily: 'system-ui',opacity: 0.4000000059604645,color:'#123A94',border: '2px solid #DCDDE5',height:'45px'}} onKeyDown={handleKeyDown} value={inputFormdata.newPassword} placeholder="Password"type={passwordInputType} autoFocus  onChange={handleInputChange}/>
    <a id="togglePassword" style={{cursor:'pointer'}} onClick={()=>togglePassVisiblity(2)}><img style={{position:'relative',marginLeft:'-16px',left:'-18px',marginTop:'-5px'}} typeof={passwordInputType} onClick={togglePassVisiblity} src={eyeImage}></img></a>
    </div>
    <div style={{marginTop:'19px'}}>
    <input id="confirmPassword" className="forgotInput" style={{paddingLeft:'17px',fontFamily: 'system-ui',opacity: 0.4000000059604645,color:'#123A94',border: '2px solid #DCDDE5',height:'45px'}} onKeyDown={handleKeyDown} value={inputFormdata.confirmNewPass} placeholder="Confirm Password" type={confirmPasswordInputType} onChange={handleInputChange}/>
    <a id="togglePassword" style={{cursor:'pointer'}} onClick={()=>togglePassVisiblity(3)}><img style={{position:'relative',marginLeft:'-16px',left:'-18px',marginTop:'-5px'}} typeof={confirmPasswordInputType} onClick={togglePassVisiblity} src={eyeImage}></img></a>

</div>
    <div style={{marginTop:'18px'}} className="resetPasswordOutline">
   <Button style={{position:'absolute',fontFamily:'Poppins',fontWeight:'bold',fontSize:'16px',height:'48px',backgroundColor:'#1F489F',border:'0px',color:"#fff",width:'300px'}}  onClick={decryptUserName !==""?handleChangePassword:otpKeyPassCodePage} label={decryptUserName !==""?"Change Password":"Reset Password"}></Button>
  <a style={{display:'flex',flexDirection:'row',marginTop:"58px",cursor:'pointer'}} onClick={backToLogin}><img src={arrowRight} style={{width:'18px',height:'18px',flexShrink:0,marginTop:'4px'}}></img><span style={{fontFamily: 'Poppins'}} className="backToLogin">Back to Login</span></a>
   </div>
    </div>
    </div>
    <div className="p-col-12 p-md-3"></div>
      </div>      
    );
        
    
};
const mapStateToProps = (state: any) => {
    const { resetPasswordData, reCreatePasswordData } = state;
    return {
      resetPasswordData, reCreatePasswordData
    };
};
export default connect(mapStateToProps)(SetNewPassword)