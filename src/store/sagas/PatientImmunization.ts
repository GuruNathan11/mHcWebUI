import { put, call } from "redux-saga/effects";
import {CREATE_PATIENT_IMMUNIZATION_COMPLETED,CREATE_PATIENT_IMMUNIZATION_FAILED,GETALL_PATIENT_IMMUNIZATION_COMPLETED,GETALL_PATIENT_IMMUNIZATION_FAILED,
     GETBYINPUT_PATIENT_IMMUNIZATION_COMPLETED,GETBYINPUT_PATIENT_IMMUNIZATION_FAILED, UPDATE_PATIENT_IMMUNIZATION_COMPLETED,
    UPDATE_PATIENT_IMMUNIZATION_FAILED,DELETE_PATIENT_IMMUNIZATION_COMPLETED,DELETE_PATIENT_IMMUNIZATION_FAILED,GET_PATIENTBYINPUTID_IMMUNIZATION_COMPLETED,
    GET_PATIENTBYINPUTID_IMMUNIZATION_FAILED  } from "../actions/PatientImmunization";
import {CreatePatientImmunizationAPI,GetAllPatientImmunizationAPI,GetImmunizationByPatientAPI,GetImmunizationByPatientInputAPI,UpdatePatientImmunizationAPI,DeletePatientImmunizationAPI} from "../../utils/api/PatientImmunizationAPI"; 

export function* createPatientImmunization(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(CreatePatientImmunizationAPI.createPatientImmunization, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: CREATE_PATIENT_IMMUNIZATION_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: CREATE_PATIENT_IMMUNIZATION_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* getAllPatientImmunization(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetAllPatientImmunizationAPI.getAllPatientImmunization, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETALL_PATIENT_IMMUNIZATION_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GETALL_PATIENT_IMMUNIZATION_FAILED, payload: e });  
    return  e; 
    
    }
}


export function* getImmunizationByPatientInput(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetImmunizationByPatientAPI.getImmunizationByPatientInput, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETBYINPUT_PATIENT_IMMUNIZATION_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GETBYINPUT_PATIENT_IMMUNIZATION_FAILED, payload: e });  
    return  e; 
    
    }
}

export function*getImmunizationByPatientInputId (request:any) {
    try {
      
        const { data } = yield call(GetImmunizationByPatientInputAPI.getImmunizationByPatientInputId,request);
    
      yield put({
          type: GET_PATIENTBYINPUTID_IMMUNIZATION_COMPLETED,
          payload: data 
        });
    } catch (e) {
        yield put({ type: GET_PATIENTBYINPUTID_IMMUNIZATION_FAILED, payload: e.message });
    }
  }

export function* updatePatientImmunization(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(UpdatePatientImmunizationAPI.updatePatientImmunization, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type:  UPDATE_PATIENT_IMMUNIZATION_COMPLETED, 
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: UPDATE_PATIENT_IMMUNIZATION_FAILED, payload: e });  
    return  e; 
    
    }
}


export function* deletePatientImmunization(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(DeletePatientImmunizationAPI.deletePatientImmunization, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type:  DELETE_PATIENT_IMMUNIZATION_COMPLETED, 
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: DELETE_PATIENT_IMMUNIZATION_FAILED, payload: e });  
    return  e; 
    
    }
}

