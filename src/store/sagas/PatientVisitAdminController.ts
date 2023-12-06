import { put, call } from "redux-saga/effects";
import {UPDATE_PTVISIT_COMPLETED,UPDATE_PTVISIT_FAILED,
        CREATE_PTVISIT_COMPLETED,CREATE_PTVISIT_FAILED,
        GETALL_PTVISIT_COMPLETED,GETALL_PTVISIT_FAILED,
        GETBYID_PTVISIT_COMPLETED,GETBYID_PTVISIT_FAILED,
        GETBYPID_PTVISIT_COMPLETED,GETBYPID_PTVISIT_FAILED,
        DELETE_PTVISIT_COMPLETED,DELETE_PTVISIT_FAILED,} from "../actions/PatientVisitAdminController";
import { UpdatePatientVisitAPI,CreatePatientVisitAPI,DeletePatientVisitAPI,GetPatientVisitByIdAPI,GetPatientVisitByPidAPI,GetallPatientVisitAPI } from "../../utils/api/PatientVisitAdminControllerAPI"; 


export function* updatePatientVisit(request: any) {
    // console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(UpdatePatientVisitAPI.updatePatientVisit, request.input);        
       // console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: UPDATE_PTVISIT_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        // console.log(e);
        yield put({ type: UPDATE_PTVISIT_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* createPatientVisit(request: any) {
    // console.log("Request Input = "+JSON.stringify(request.input));
 
    try { 
      
         const result=yield call(CreatePatientVisitAPI.createPatientVisit, request.input);        
      
        yield put({ 
            type: CREATE_PTVISIT_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        // console.log(e);
        yield put({ type: CREATE_PTVISIT_FAILED, payload: e });  
    return  e; 
    
    }
}
export function* getAllPatientVisit(request: any) {
    // console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetallPatientVisitAPI.getAllPatientVisit, request.input);        
       // console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETALL_PTVISIT_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        // console.log(e);
        yield put({ type: GETALL_PTVISIT_FAILED, payload: e });  
    return  e; 
    
    }
}
export function* getpatientvisitByPid(request: any) {
    // console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetPatientVisitByPidAPI.getidPatientVisitByPid, request.input);        
       // console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETBYPID_PTVISIT_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        // console.log(e);
        yield put({ type: GETBYPID_PTVISIT_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* getPatientVisitById(request: any) {
    // console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetPatientVisitByIdAPI.getPatientVisitById, request.input);        
       // console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETBYID_PTVISIT_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        // console.log(e);
        yield put({ type: GETBYID_PTVISIT_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* deletePatientVisitById(request: any) {
    // console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(DeletePatientVisitAPI.deletePatientVisit, request.input);        
       // console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: DELETE_PTVISIT_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        // console.log(e);
        yield put({ type: DELETE_PTVISIT_FAILED, payload: e });  
    return  e; 
    
    }
}