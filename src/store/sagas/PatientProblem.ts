import { put, call } from "redux-saga/effects";
import {CREATE_PATIENT_PROBLEMS_COMPLETED,CREATE_PATIENT_PROBLEMS_FAILED,GETALL_PATIENT_PROBLEMS_COMPLETED,GETALL_PATIENT_PROBLEMS_FAILED,
     GETBYINPUT_PATIENT_PROBLEMS_COMPLETED,GETBYINPUT_PATIENT_PROBLEMS_FAILED, UPDATE_PATIENT_PROBLEMS_COMPLETED,
    UPDATE_PATIENT_PROBLEMS_FAILED,DELETE_PATIENT_PROBLEMS_COMPLETED,DELETE_PATIENT_PROBLEMS_FAILED,
    GET_PATIENTBYINPUTID_PROBLEMS_COMPLETED, GET_PATIENTBYINPUTID_PROBLEMS_FAILED} from "../actions/PatientProblem";
import {CreatePatientProblemsAPI,GetAllPatientProblemsAPI,GetProblemsByPatientAPI,GetProblemsByPatientInputAPI,UpdatePatientProblemsAPI,DeletePatientProblemsAPI} from "../../utils/api/PatientProblemsAPI"; 

export function* createPatientProblems(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(CreatePatientProblemsAPI.createPatientProblems, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: CREATE_PATIENT_PROBLEMS_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: CREATE_PATIENT_PROBLEMS_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* getAllPatientProblems(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetAllPatientProblemsAPI.getAllPatientProblems, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETALL_PATIENT_PROBLEMS_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GETALL_PATIENT_PROBLEMS_FAILED, payload: e });  
    return  e; 
    
    }
}


export function* getProblemsByPatientInput(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetProblemsByPatientAPI.getProblemsByPatientInput, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETBYINPUT_PATIENT_PROBLEMS_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GETBYINPUT_PATIENT_PROBLEMS_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* getProblemsByPatientInputId (request:any) {
    try {
      
        const { data } = yield call(GetProblemsByPatientInputAPI.getProblemsByPatientInputId,request);
    
      yield put({
          type: GET_PATIENTBYINPUTID_PROBLEMS_COMPLETED,
          payload: data 
        });
    } catch (e) {
        yield put({ type: GET_PATIENTBYINPUTID_PROBLEMS_FAILED, payload: e.message });
    }
  }

export function* updatePatientProblems(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(UpdatePatientProblemsAPI.updatePatientProblems, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type:  UPDATE_PATIENT_PROBLEMS_COMPLETED, 
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: UPDATE_PATIENT_PROBLEMS_FAILED, payload: e });  
    return  e; 
    
    }
}


export function* deletePatientProblems(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(DeletePatientProblemsAPI.deletePatientProblems, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type:  DELETE_PATIENT_PROBLEMS_COMPLETED, 
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: DELETE_PATIENT_PROBLEMS_FAILED, payload: e });  
    return  e; 
    
    }
}

