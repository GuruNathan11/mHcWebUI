import { put, call } from "redux-saga/effects";
import {CREATE_PATIENT_VITALS_COMPLETED,CREATE_PATIENT_VITALS_FAILED,GETALL_PATIENT_VITALS_COMPLETED,GETALL_PATIENT_VITALS_FAILED,
     GETBYINPUT_PATIENT_VITALS_COMPLETED,GETBYINPUT_PATIENT_VITALS_FAILED, UPDATE_PATIENT_VITALS_COMPLETED,
    UPDATE_PATIENT_VITALS_FAILED,DELETE_PATIENT_VITALS_COMPLETED,DELETE_PATIENT_VITALS_FAILED,
    GET_PATIENTBYINPUTID_VITALS_COMPLETED, GET_PATIENTBYINPUTID_VITALS_FAILED  } from "../actions/PatientVitals";
import { CreatePatientVitalsAPI,GetAllPatientVitalsAPI,GetVitalsByPatientAPI,GetVitalsByPatientInputAPI,UpdatePatientVitalsAPI,DeletePatientVitalsAPI } from "../../utils/api/PatientVitalsAPI";

export function* createPatientVitals(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(CreatePatientVitalsAPI.createPatientVitals, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: CREATE_PATIENT_VITALS_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: CREATE_PATIENT_VITALS_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* getAllPatientVitals(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetAllPatientVitalsAPI.getAllPatientVitals, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETALL_PATIENT_VITALS_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GETALL_PATIENT_VITALS_FAILED, payload: e });  
    return  e; 
    
    }
}


export function* getVitalsByPatientInput(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetVitalsByPatientAPI.getVitalsByPatientInput, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETBYINPUT_PATIENT_VITALS_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GETBYINPUT_PATIENT_VITALS_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* getVitalsByPatientInputId (request:any) {
    try {
      
        const { data } = yield call(GetVitalsByPatientInputAPI.getVitalsByPatientInputId,request);
    
      yield put({
          type: GET_PATIENTBYINPUTID_VITALS_COMPLETED,
          payload: data 
        });
    } catch (e) {
        yield put({ type: GET_PATIENTBYINPUTID_VITALS_FAILED, payload: e.message });
    }
  }


export function* updatePatientVitals(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(UpdatePatientVitalsAPI.updatePatientVitals, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type:  UPDATE_PATIENT_VITALS_COMPLETED, 
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: UPDATE_PATIENT_VITALS_FAILED, payload: e });  
    return  e; 
    
    }
}


export function* deletePatientVitals(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(DeletePatientVitalsAPI.deletePatientVitals, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type:  DELETE_PATIENT_VITALS_COMPLETED, 
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: DELETE_PATIENT_VITALS_FAILED, payload: e });  
    return  e; 
    
    }
}

