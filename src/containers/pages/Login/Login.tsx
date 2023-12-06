import React, { Dispatch, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from 'primereact/button';
import newImage from '../../../assets/images/mettler_images/mettlerTitle.png'
import MailImage from '../../../assets/images/mettler_images/mail.svg';
import passwordImage from '../../../assets/images/mettler_images/key.svg';
import eyeImage from '../../../assets/images/mettler_images/eye.svg';
import orgImage from '../../../assets/images/mettler_images/office-building.svg';
import { InputText  } from "primereact/inputtext";
import inputLoginData from '../../../assets/data/LoginData.json';
import { saveLogin } from "../../../store/actions/Login";
import { getAllOrganization } from "../../../store/actions/Organization";
import loaddingFile from '../../../../src/assets/images/tenor.gif';
interface ILogin {
  dispatch: Dispatch<any>;
  loginData: any; 
  allOrganizationData: any;
  encRyptPassword: any;
}
 const Login:  React.FC<ILogin>= ({ 
  dispatch, loginData,allOrganizationData,encRyptPassword
}) => {    
 
  const [user, setUser] = useState(inputLoginData);
  const [organizationData, setOrganizationData] =  useState<any | null>(null);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    setSpinner(true);
   dispatch(getAllOrganization());
     
}, []);
  const handleInputChange = (event: any) => {



    if (event.target.id === "username") { 
      user.username = event.target.value;
    } else if (event.target.id === "password") {
      user.password = event.target.value;
    } else if (event.target.id === "orgId") {
      user.organization = event.target.value;
    }
    
    setUser({ ...user });
  };
  const togglePassVisiblity = (event: any) => {
    setPasswordVisiblity(!passwordVisiblity)
     
      passwordVisiblity ? setPasswordInputType("password") : setPasswordInputType("text")
    
   }
  
  const handleSubmit = (event: any) => {
    var CryptoJS = require("crypto-js"); 
    var ForgetpasswordCryptoJS = CryptoJS.AES.encrypt("password" , 'secret key 123');
     var ForgetpasswordIdEnc = encodeURIComponent(ForgetpasswordCryptoJS.toString());   
   window.location.href = "/MettlerForgotPassword/"+ForgetpasswordIdEnc;
   };   
 

   const[passwordVisiblity, setPasswordVisiblity]=useState(false);
   const[passwordInputType, setPasswordInputType]=useState('password');
  
 
  
  var isShowError = false;
 // var isShowDialog =false;
  var isShowloading =false;
 
  const  handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      handleOnClick(event);
    }
  }
 
  const [isPageGetOrgLoaded, setPageGetOrgLoaded] = useState(false);
  //
  if (!isPageGetOrgLoaded && !allOrganizationData.isLoading  ){  
    console.log(JSON.stringify(allOrganizationData.items));  
    if(allOrganizationData.items.message.code === "MHC - 0200"){     
      setOrganizationData(allOrganizationData.items.data);      
     }else{
      alert(allOrganizationData.items.message.description);
      setOrganizationData(allOrganizationData.items);
     }                
setPageGetOrgLoaded(true);
setSpinner(false);
    }
  
  const [isPageLoaded, setPageLoaded] = useState(false);
   
  if (!isPageLoaded && !loginData.isLoading  ){
    if(loginData.items!==null && loginData.items!==""){
      var CryptoJS = require("crypto-js"); 
      var secretkeyCryptoJS = CryptoJS.AES.encrypt("2" , 'secret key 123');
       var secretkeyIdEnc = encodeURIComponent(secretkeyCryptoJS.toString()); 
      //  console.log(secretkeyIdEnc);
console.log("tsx loginData="+JSON.stringify(loginData));
 
if(loginData.items.message!==undefined && loginData.items.message.code==="MHC - 0002"){
 alert(loginData.items.message.description);
  window.location.href = "/MettlerPasscodePage/"+secretkeyIdEnc;
}else if(loginData.items.message!==undefined && loginData.items.message.code!=="MHC - 0200"){
  alert(loginData.items.message.description);
  loginData.items="";  
}else if(loginData.items.message!==undefined && loginData.items.message.code==="MHC - 0200"){
     
      isShowError = false;   
      window.localStorage.setItem("LOGINDATA", JSON.stringify(loginData));
      window.localStorage.setItem("CREATEQ15","No");
      window.location.href = "/MettlerPasscodePage/"+secretkeyIdEnc;
    } 
    }
} 
  if (!loginData && loginData.isFormSubmit) {
  
    setTimeout(() => {
      setPageLoaded(false);

    }, (1000));
  }

  
  function handleOnClick (event:any)  {
   
    if(user.username === null || user.username === ""){   
      alert("Please Enter Username");
      return false;
    }else if(user.password === null || user.password === ""){
      alert("Please Enter Password");
      return false;
    }else if(user.organization === null || user.organization === ""){
      alert("Please Select Organization");
      return false;
    }else{
      dispatch(saveLogin(user));
    }
  };
  let organzations = organizationData != null && organizationData.length > 0
  && organizationData.filter(k=>k.organizationdetails !== null).map((item, i) => {
     return (
      <option key={i} value={item.id}>{item.organizationdetails[0].name}</option>
    )
  }, this);


  return (
    <div className="p-grid login-section" style={{background:'#fff'}}> 
          {spinner &&
        (<div className='overlay-content'>
          <div className='wrapper'>
            <img src={loaddingFile} style={{ position: 'absolute', width: '100%', zIndex: 2, opacity: '0.5' }} />
          </div>
        </div>
        )} 
    <div className="p-col-12 p-md-7 loginImage" style={{backgroundColor:'#133C93',height:'100%'}}>
    <img className="mettlerTitleLogo" src={newImage} />
    <div className="welcomeToMettler">Welcome to <br />Mettler Health </div>    
    <div className="specialize">we specialize in developing cutting-edge<br /> software solutions for the healthcare industry.</div>
    <div className="emptyGroup"></div>
    </div>  
    <div id="removePadding" className="p-col-12 p-md-1"></div>
    <div id="removePadding" className="p-col-12 p-md-3 loginSecondPage">    
    <div className="loginText1">Hello!</div> 
    <div className="loginText2">Login to your account</div> 
    <div className="textLogin">      
    <img style={{position:'relative',left:'17px'}} src={MailImage}></img>
    <InputText autoFocus autoComplete="off" className="inputLogin" id="username" name="username" value={user.username} disabled={isShowloading} onChange={handleInputChange} style={{paddingLeft:'50px',fontFamily: 'system-ui'}} 
    placeholder="User Name"></InputText>      
    </div>
    <div className="passwordLogin">
    <img style={{position:'relative',left:'17px'}} src={passwordImage}></img>
    <input id="password" className="inputLogin" onKeyDown={handleKeyDown} style={{paddingLeft:'50px',fontFamily: 'system-ui',border:'1px solid #a6a6a6'}} name="Password" placeholder="Password" value={user.password} disabled={isShowloading} type={passwordInputType} required onChange={handleInputChange} />         
    <a id="togglePassword" style={{cursor:'pointer'}} onClick={togglePassVisiblity}><img style={{position:'relative',marginLeft:'-18px',left:'-8px',marginTop:'14px'}} typeof={passwordInputType} onClick={togglePassVisiblity} src={eyeImage}></img></a>
    </div>
    <div className="OrganizationLogin">
    <img style={{position:'relative',left:'17px'}} src={orgImage}></img>
    <select id="orgId" name="orgId" className="inputLogin" style={{paddingLeft:'50px',fontFamily: 'system-ui',border:'1px solid #a6a6a6',borderRadius:'3px'}} value={user.organization} placeholder="Select Organization"  onChange={handleInputChange}>
      <option value="">-Select-</option>
  {organzations}
      </select>      
     </div>
    {!isShowloading &&  
     <p className="loginError">
     {isShowError && <span style={{position:'relative',top:'12px'}}>Invalid UserId and Password</span>}
   </p>  
      }
    <div className="rememberLogin">
      
    <input type="checkbox" style={{ height: '18px', width: '18px',marginTop:'3px' }} onClick={ null }/><span style={{fontFamily:'Poppins',fontSize:'14px',color:'#172B4D',fontWeight:400,lineHeight:'normal',letterSpacing:'-0.027px',marginTop:'1px',marginLeft:'6px'}}>Remember Me</span>
      <span style={{marginLeft:'66px'}}></span><span style={{fontFamily:'Poppins',fontSize:'14px',color:'#1948A0',fontWeight:400,lineHeight:'normal',letterSpacing:'-0.027px',marginTop:'1px',marginLeft:'-10px'}}><a style={{cursor:'pointer'}} onClick={handleSubmit}>Forgot Password?</a></span>
    </div>
             
    <div className="buttonLogin">
      <Button style={{width:'320px',fontFamily:'Poppins',fontSize:'16px',backgroundColor:'#1F489F'}} onClick={handleOnClick} label="Login"></Button>
    </div> 
    </div>   
    <div id="newRemovePadding" className="p-col-12 p-md-1"></div>  
  </div>
  );
};
const mapStateToProps = (state: any) => {
  const { loginData,allOrganizationData } = state;
  return {
    loginData,allOrganizationData
  };
};

export default connect(mapStateToProps)(Login);