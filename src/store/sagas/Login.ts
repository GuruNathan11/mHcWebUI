import { put, call } from "redux-saga/effects";

import { SAVE_LOGIN_COMPLETED,SAVE_LOGIN_FAILED,CHECK_SECURITY_COMPLETED,CHECK_SECURITY_FAILED,SAVE_FORGOTPASSWORD_COMPLETED,SAVE_FORGOTPASSWORD_FAILED,
    SAVE_RESETPASSWORD_COMPLETED,SAVE_RESETPASSWORD_FAILED,VERIFY_LOGIN_COMPLETED, VERIFY_LOGIN_FAILED,VERIFY_OTP_COMPLETED,VERIFY_OTP_FAILED,SAVE_RESETSECRTKEY_COMPLETED,SAVE_RESETSECRTKEY_FAILED,
    SAVE_RECREATEPASSWORD_COMPLETED,SAVE_RECREATEPASSWORD_FAILED
} from "../actions/Login";

import { LoginAPI } from "../../utils/api/LoginAPI"; 


export function* saveLogin(request: any) {
 
    try {  
         const result=yield call(LoginAPI.saveLogin, request.input);        
        yield put({ 
            type: SAVE_LOGIN_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        yield put({ type: SAVE_LOGIN_FAILED, payload: e });  
    return  e; 
    
    }
}
export function* loginSecurity(request: any) {
    try {  
         const result=yield call(LoginAPI.loginSecurity, request.input);        
        yield put({
            
            type: CHECK_SECURITY_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        yield put({ type: CHECK_SECURITY_FAILED, payload: e.message });
       
    
    }
}
export function* forgetPassword(request: any) {
    try {  
         const result=yield call(LoginAPI.forgetPassword, request.input);        
        yield put({
            
            type: SAVE_FORGOTPASSWORD_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        yield put({ type: SAVE_FORGOTPASSWORD_FAILED, payload: e.message });
       
    
    }
}
export function* saveResetPassword(request: any) {
    
    try {
         const result=yield call(LoginAPI.ResetPassword, request.input);        
        yield put({
            
            type: SAVE_RESETPASSWORD_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        yield put({ type: SAVE_RESETPASSWORD_FAILED, payload: e.message });
 
    }
}
export function* verifyLogin(request: any) {
     
    try {
         const result=yield call(LoginAPI.verifyLogin, request.input);
         yield put({
            
            type: VERIFY_LOGIN_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
       
        yield put({ type: VERIFY_LOGIN_FAILED, payload: e.message });
    }
}
export function* verifyOtp(request: any) {
     
    try {
         const result=yield call(LoginAPI.verifyotp, request.input);
         yield put({
            
            type: VERIFY_OTP_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
       
        yield put({ type: VERIFY_OTP_FAILED, payload: e.message });
    }
}
export function* resetSecretKey(request: any) {
     
    try {
        // console.log("Input Data = "+JSON.stringify(request.input));
         const result=yield call(LoginAPI.resetSecretKey, request.input);
        //  console.log("REsult"+JSON.stringify(result.data));
         yield put({
            
            type: SAVE_RESETSECRTKEY_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
       
        yield put({ type: SAVE_RESETSECRTKEY_FAILED, payload: e.message });
    }
}


export function* reCreatePassword(request: any) {
     
    try {
        //  console.log("Input Data = "+JSON.stringify(request.input));
         const result=yield call(LoginAPI.reCreatePassword, request.input);
          
         yield put({
            
            type: SAVE_RECREATEPASSWORD_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        // console.log("REsult"+JSON.stringify(e));
        yield put({ type: SAVE_RECREATEPASSWORD_FAILED, payload: e.message });
    }
}


