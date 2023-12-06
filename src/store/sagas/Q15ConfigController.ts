import { put, call } from "redux-saga/effects";
import {CREATE_Q15CONFIG_COMPLETED,CREATE_Q15CONFIG_FAILED,GETID_Q15CONFIG_COMPLETED,GETID_Q15CONFIG_FAILED,GET_Q15CONFIG_COMPLETED,GET_Q15CONFIG_FAILED,
GETSLOT_Q15CONFIG_COMPLETED,GETSLOT_Q15CONFIG_FAILED} from "../actions/Q15ConfigController";
import { CreateQ15CONFIGAPI,Getidq15configAPI,Getq15configAPI,GetSLOTq15configAPI } from "../../utils/api/Q15ConfigControllerAPI"; 


export function* createq15config(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(CreateQ15CONFIGAPI.createq15config, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: CREATE_Q15CONFIG_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: CREATE_Q15CONFIG_FAILED, payload: e });  
    return  e; 
    
    }
}
export function* GETq15config(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(Getq15configAPI.getq15config, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GET_Q15CONFIG_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GET_Q15CONFIG_FAILED, payload: e });  
    return  e; 
    
    }
}
export function* GETIDq15config(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(Getidq15configAPI.getidQ15confin, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETID_Q15CONFIG_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GETID_Q15CONFIG_FAILED, payload: e });  
    return  e; 
    
    }
}
export function* GETslotq15config(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetSLOTq15configAPI.getslotQ15confin, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETSLOT_Q15CONFIG_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GETSLOT_Q15CONFIG_FAILED, payload: e });  
    return  e; 
    
    }
}