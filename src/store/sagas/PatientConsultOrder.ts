import { put, call } from "redux-saga/effects";
import {CREATE_PATIENT_CONSULT_COMPLETED,CREATE_PATIENT_CONSULT_FAILED,GETALL_PATIENT_CONSULT_COMPLETED,GETALL_PATIENT_CONSULT_FAILED,
     GETBYINPUT_PATIENT_CONSULT_COMPLETED,GETBYINPUT_PATIENT_CONSULT_FAILED, UPDATE_PATIENT_CONSULT_COMPLETED,
    UPDATE_PATIENT_CONSULT_FAILED,DELETE_PATIENT_CONSULT_COMPLETED,DELETE_PATIENT_CONSULT_FAILED } from "../actions/PatientConsultOrder";
import {CreatePatientConsultAPI,GetAllPatientConsultAPI,GetPatientConsultAPI,UpdatePatientConsultAPI,DeletePatientConsultAPI} from "../../utils/api/PatientConsultOrderAPI"; 

export function* createPatientConsult(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(CreatePatientConsultAPI.createPatientConsult, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: CREATE_PATIENT_CONSULT_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: CREATE_PATIENT_CONSULT_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* getAllPatientConsult(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetAllPatientConsultAPI.getAllPatientConsult, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETALL_PATIENT_CONSULT_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GETALL_PATIENT_CONSULT_FAILED, payload: e });  
    return  e; 
    
    }
}


export function* getPatientConsultInput(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetPatientConsultAPI.getPatientConsultInput, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETBYINPUT_PATIENT_CONSULT_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GETBYINPUT_PATIENT_CONSULT_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* updatePatientConsult(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(UpdatePatientConsultAPI.updatePatientConsult, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type:  UPDATE_PATIENT_CONSULT_COMPLETED, 
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: UPDATE_PATIENT_CONSULT_FAILED, payload: e });  
    return  e; 
    
    }
}


export function* deletePatientConsult(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(DeletePatientConsultAPI.deletePatientConsult, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type:  DELETE_PATIENT_CONSULT_COMPLETED, 
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: DELETE_PATIENT_CONSULT_FAILED, payload: e });  
    return  e; 
    
    }
}

