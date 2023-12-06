import { put, call } from "redux-saga/effects";
import {CREATE_PATIENT_COMPLETED,CREATE_PATIENT_FAILED,GETALL_PATIENT_COMPLETED,GETALL_PATIENT_FAILED,GETBYID_PATIENT_COMPLETED,
    GETBYID_PATIENT_FAILED, GETBYINPUT_PATIENT_COMPLETED,GETBYINPUT_PATIENT_FAILED, DISCHARGEBYID_PATIENT_COMPLETED,DISCHARGEBYID_PATIENT_FAILED, UPDATE_PATIENT_COMPLETED,
    UPDATE_PATIENT_FAILED,DELETE_PATIENT_COMPLETED,DELETE_PATIENT_FAILED  } from "../actions/Patient";
import {CreatePatientAPI,GetAllPatientAPI,GetByIdPatientAPI,GetByPatientAPI,DischargePatientByIdAPI,UpdatePatientAPI,DeletePatientAPI} from "../../utils/api/PatientAPI"; 

export function* createPatient(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(CreatePatientAPI.createPatient, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: CREATE_PATIENT_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: CREATE_PATIENT_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* getAllPatient(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetAllPatientAPI.getAllPatient, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETALL_PATIENT_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GETALL_PATIENT_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* getByIdPatient(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetByIdPatientAPI.getByIdPatient, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETBYID_PATIENT_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GETBYID_PATIENT_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* getPatientByInput(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetByPatientAPI.getPatientByInput, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETBYINPUT_PATIENT_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GETBYINPUT_PATIENT_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* dischargePatientById(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(DischargePatientByIdAPI.dischargePatientById, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: DISCHARGEBYID_PATIENT_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: DISCHARGEBYID_PATIENT_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* updatePatient(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(UpdatePatientAPI.updatePatient, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type:  UPDATE_PATIENT_COMPLETED, 
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: UPDATE_PATIENT_FAILED, payload: e });  
    return  e; 
    
    }
}


export function* deletePatient(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(DeletePatientAPI.deletePatient, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type:  DELETE_PATIENT_COMPLETED, 
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: DELETE_PATIENT_FAILED, payload: e });  
    return  e; 
    
    }
}

