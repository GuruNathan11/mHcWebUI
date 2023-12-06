export const SAVE_LOGIN_STARTED = "SAVE_LOGIN_STARTED";
export const SAVE_LOGIN_COMPLETED = "SAVE_LOGIN_COMPLETED";
export const SAVE_LOGIN_FAILED = "SAVE_LOGIN_FAILED";
export const CHECK_SECURITY_STARTED = "CHECK_SECURITY_STARTED";
export const CHECK_SECURITY_COMPLETED = "CHECK_SECURITY_COMPLETED";
export const CHECK_SECURITY_FAILED = "CHECK_SECURITY_FAILED";
export const SAVE_FORGOTPASSWORD_STARTED = "SAVE_FORGOTPASSWORD_STARTED";
export const SAVE_FORGOTPASSWORD_COMPLETED = "SAVE_FORGOTPASSWORD_COMPLETED";
export const SAVE_FORGOTPASSWORD_FAILED = "SAVE_FORGOTPASSORD_FAILED";
export const SAVE_RESETPASSWORD_STARTED = "SAVE_RESETPASSWORD_STARTED";
export const SAVE_RESETPASSWORD_COMPLETED = "SAVE_RESETPASSWORD_COMPLETED";
export const SAVE_RESETPASSWORD_FAILED = "SAVE_RESETPASSWORD_FAILED";
export const VERIFY_LOGIN_STARTED = "VERIFY_LOGIN_STARTED";
export const VERIFY_LOGIN_COMPLETED = "VERIFY_LOGIN_COMPLETED";
export const VERIFY_LOGIN_FAILED = "VERIFY_LOGIN_FAILED";
export const VERIFY_OTP_STARTED ="VERIFY_OTP_STARTED";
export const VERIFY_OTP_COMPLETED ="VERIFY_OTP_COMPLETED";
export const VERIFY_OTP_FAILED ="VERIFY_OTP_FAILED";
export const SAVE_RESETSECRTKEY_STARTED ="SAVE_RESETSECRTKEY_STARTED";
export const SAVE_RESETSECRTKEY_COMPLETED ="SAVE_RESETSECRTKEY_COMPLETED";
export const SAVE_RESETSECRTKEY_FAILED ="SAVE_RESETSECRTKEY_FAILED";
export const SAVE_RECREATEPASSWORD_STARTED ="SAVE_RECREATEPASSWORD_STARTED";
export const SAVE_RECREATEPASSWORD_COMPLETED ="SAVE_RECREATEPASSWORD_COMPLETED";
export const SAVE_RECREATEPASSWORD_FAILED ="SAVE_RECREATEPASSWORD_FAILED";

export interface ILogin {
  status: {
    statusCode: number;
    statusDisplay: string;
    statusValue: boolean;
  };
  items: Array<any>;
  loginInput: {
    userId: string;
    username:string,
    password: string;
    organization:string;
    jwtToken: string;
    secretKey: string,
    email:string,
    otp:string,
    confirmNewPass: string,
    newPassword:string,
    securityQuestion: string;
    answer: string;
    roleFkId: {
      roleId: number;
      roleName: string;
      description: string;
      status: number;
      createdAt: Date;
      createdBy: string;
      updatedAt: Date;
      updatedBy: string;
    };
    status: number;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
  };
  loginID: number;
  isLoading: boolean;
  error: string;
}


export const saveLogin = (loginInput: any) => { 
  
  return {
    type: SAVE_LOGIN_STARTED,
    payload: "status",
    input: loginInput
  };
};
export const loginSecurity = (loginInput: any) => {
  // console.log("LoginInput" + loginInput);
  return {
    type: CHECK_SECURITY_STARTED,
    payload: "status",
    input: loginInput
  };
};
export const forgetPassword = (passwordInput: any) => {
 
    
  return {
      type: SAVE_FORGOTPASSWORD_STARTED,
      payload: 'status',
      input: passwordInput
  };
};

export const saveResetPassword = (loginInput: any) => {
 
  return {
    type: SAVE_RESETPASSWORD_STARTED,
    payload: "status",
    input: loginInput
  };
};
export const verifyLogin = (loginInput: any) => {
  return {
    type: VERIFY_LOGIN_STARTED,
    payload: "value",
    input: loginInput
  };
};
export const verifyOtp = (loginInput: any) => {
  return {
    type: VERIFY_OTP_STARTED,
    payload: "value",
    input: loginInput
  };
};
export const resetsecretkey = (loginInput: any) => {
  return {
    type:  SAVE_RESETSECRTKEY_STARTED,
   payload: "value",
    input: loginInput
  };
};

export const reCreatePassword = (loginInput: any) => {
  return {
    type:  SAVE_RECREATEPASSWORD_STARTED,
   payload: "status",
    input: loginInput
  };
};

