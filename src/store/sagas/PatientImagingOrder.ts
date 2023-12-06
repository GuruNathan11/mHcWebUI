import { put, call } from "redux-saga/effects";
import {CREATE_PATIENT_IMAGING_COMPLETED,CREATE_PATIENT_IMAGING_FAILED,GETALL_PATIENT_IMAGING_COMPLETED,GETALL_PATIENT_IMAGING_FAILED,
     GETBYINPUT_PATIENT_IMAGING_COMPLETED,GETBYINPUT_PATIENT_IMAGING_FAILED, UPDATE_PATIENT_IMAGING_COMPLETED,
    UPDATE_PATIENT_IMAGING_FAILED,DELETE_PATIENT_IMAGING_COMPLETED,DELETE_PATIENT_IMAGING_FAILED } from "../actions/PatientImagingOrder";
import {CreatePatientImagingAPI,GetAllPatientImagingAPI,GetPatientImagingAPI,UpdatePatientImagingAPI,DeletePatientImagingAPI} from "../../utils/api/PatientImagingOrderAPI"; 

export function* createPatientImaging(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(CreatePatientImagingAPI.createPatientImaging, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: CREATE_PATIENT_IMAGING_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: CREATE_PATIENT_IMAGING_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* getAllPatientImaging(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetAllPatientImagingAPI.getAllPatientImaging, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETALL_PATIENT_IMAGING_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GETALL_PATIENT_IMAGING_FAILED, payload: e });  
    return  e; 
    
    }
}


export function* getPatientImagingInput(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetPatientImagingAPI.getPatientImagingInput, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETBYINPUT_PATIENT_IMAGING_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GETBYINPUT_PATIENT_IMAGING_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* updatePatientImaging(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(UpdatePatientImagingAPI.updatePatientImaging, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type:  UPDATE_PATIENT_IMAGING_COMPLETED, 
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: UPDATE_PATIENT_IMAGING_FAILED, payload: e });  
    return  e; 
    
    }
}


export function* deletePatientImaging(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(DeletePatientImagingAPI.deletePatientImaging, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type:  DELETE_PATIENT_IMAGING_COMPLETED, 
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: DELETE_PATIENT_IMAGING_FAILED, payload: e });  
    return  e; 
    
    }
}

