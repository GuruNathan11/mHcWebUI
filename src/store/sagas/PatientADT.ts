import { put, call } from "redux-saga/effects";
import {CREATE_PATIENT_ADMIT_COMPLETED,CREATE_PATIENT_ADMIT_FAILED,CREATE_TRANSFER_PATIENT_COMPLETED,CREATE_TRANSFER_PATIENT_FAILED,
    CREATE_DISCHARGE_PATIENT_COMPLETED,CREATE_DISCHARGE_PATIENT_FAILED, GET_PATIENT_ADMIT_COMPLETED,
    GET_PATIENT_ADMIT_FAILED,GET_TRANSFER_PATIENT_COMPLETED,GET_TRANSFER_PATIENT_FAILED,GET_DISCHARGE_PATIENT_COMPLETED,
    GET_DISCHARGE_PATIENT_FAILED  } from "../actions/PatientADT";
import {CreatePatientAdmitAPI,CreateDischargePatientAPI,createTransferPatientAPI,getTransferPatientAPI,getDischargePatientAPI,getAdmitPatientAPI} from "../../utils/api/PatientADTAPI"; 

export function* createPatientAdmit(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(CreatePatientAdmitAPI.createPatientAdmit, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: CREATE_PATIENT_ADMIT_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: CREATE_PATIENT_ADMIT_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* createDischargePatient(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(CreateDischargePatientAPI.createDischargePatient, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: CREATE_TRANSFER_PATIENT_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: CREATE_TRANSFER_PATIENT_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* createTransferPatient(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(createTransferPatientAPI.createTransferPatient, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: CREATE_DISCHARGE_PATIENT_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: CREATE_DISCHARGE_PATIENT_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* getTransferPatient (request:any) {
    try {
      
        const { data } = yield call(getTransferPatientAPI.getTransferPatient,request);
    
      yield put({
          type: GET_TRANSFER_PATIENT_COMPLETED,
          payload: data 
        });
    } catch (e) {
        yield put({ type: GET_TRANSFER_PATIENT_FAILED, payload: e.message });
    }
  }

export function* getDischargePatient(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(getDischargePatientAPI.getDischargePatient, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type:  GET_DISCHARGE_PATIENT_COMPLETED, 
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GET_DISCHARGE_PATIENT_FAILED, payload: e });  
    return  e; 
    
    }
}


export function* getAdmitPatient(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(getAdmitPatientAPI.getAdmitPatient, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type:  GET_PATIENT_ADMIT_COMPLETED, 
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GET_PATIENT_ADMIT_FAILED, payload: e });  
    return  e; 
    
    }
}

