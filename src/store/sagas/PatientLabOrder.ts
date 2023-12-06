import { put, call } from "redux-saga/effects";
import {CREATE_PATIENT_LABORDER_COMPLETED,CREATE_PATIENT_LABORDER_FAILED,GETALL_PATIENT_LABORDER_COMPLETED,GETALL_PATIENT_LABORDER_FAILED,
     GETBYINPUT_PATIENT_LABORDER_COMPLETED,GETBYINPUT_PATIENT_LABORDER_FAILED, UPDATE_PATIENT_LABORDER_COMPLETED,
    UPDATE_PATIENT_LABORDER_FAILED,DELETE_PATIENT_LABORDER_COMPLETED,DELETE_PATIENT_LABORDER_FAILED,GET_PATIENTBYINPUTID_LABORDER_COMPLETED,
    GET_PATIENTBYINPUTID_LABORDER_FAILED  } from "../actions/PatientLabOrder";
import {CreatePatientLabOrderAPI,GetAllPatientLabOrderAPI,GetLabOrderByPatientAPI,GetLabOrderByPatientInputAPI,UpdatePatientLabOrderAPI,DeletePatientLabOrderAPI} from "../../utils/api/PatientLabOrderAPI"; 

export function* createPatientLabOrder(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(CreatePatientLabOrderAPI.createPatientLabOrder, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: CREATE_PATIENT_LABORDER_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: CREATE_PATIENT_LABORDER_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* getAllPatientLabOrder(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetAllPatientLabOrderAPI.getAllPatientLabOrder, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETALL_PATIENT_LABORDER_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GETALL_PATIENT_LABORDER_FAILED, payload: e });  
    return  e; 
    
    }
}


export function* getLabOrderByPatientInput(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetLabOrderByPatientAPI.getLabOrderByPatientInput, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETBYINPUT_PATIENT_LABORDER_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GETBYINPUT_PATIENT_LABORDER_FAILED, payload: e });  
    return  e; 
    
    }
}

export function*getLabOrderByPatientInputId (request:any) {
    try {
      
        const result = yield call(GetLabOrderByPatientInputAPI.getLabOrderByPatientInputId,request.input);
    
      yield put({
          type: GET_PATIENTBYINPUTID_LABORDER_COMPLETED,
          payload: result.data,
          input: request.input
        });
    } catch (e) {
        yield put({ type: GET_PATIENTBYINPUTID_LABORDER_FAILED, payload: e.message });
    }
  }

export function* updatePatientLabOrder(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(UpdatePatientLabOrderAPI.updatePatientLabOrder, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type:  UPDATE_PATIENT_LABORDER_COMPLETED, 
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: UPDATE_PATIENT_LABORDER_FAILED, payload: e });  
    return  e; 
    
    }
}


export function* deletePatientLabOrder(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(DeletePatientLabOrderAPI.deletePatientLabOrder, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type:  DELETE_PATIENT_LABORDER_COMPLETED, 
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: DELETE_PATIENT_LABORDER_FAILED, payload: e });  
    return  e; 
    
    }
}

