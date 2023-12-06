import { put, call } from "redux-saga/effects";
import {CREATE_PATIENTSTAFF_COMPLETED,CREATE_PATIENTSTAFF_FAILED,GET_PATIENTSTAFF_COMPLETED,GET_PATIENTSTAFF_FAILED,GETID_PATIENTSTAFF_COMPLETED,GETID_PATIENTSTAFF_FAILED} from "../actions/PatientStaffAssignController";
import {AssignptstaffAPI,GetptstaffAPI,GetidptstaffAPI} from "../../utils/api/PatientStaffAssignControllerAPI";
import {CREATE_STAFFPATIENT_COMPLETED, CREATE_STAFFPATIENT_FAILED} from "../actions/PatientStaffAssignController"; 
import {AssignstaffPatientAPI} from "../../utils/api/PatientStaffAssignControllerAPI"; 

export function* assignpatientstaff(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(AssignptstaffAPI.Assignptstaff, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: CREATE_PATIENTSTAFF_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: CREATE_PATIENTSTAFF_FAILED, payload: e });  
    return  e; 
    
    }
}
export function* getallpatientstaff(request: any) {
    //  console.log("Request Input = "+JSON.stringify);
 
    try {  
         const result=yield call(GetptstaffAPI.getptstaff, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GET_PATIENTSTAFF_COMPLETED,     
            payload: result.data,
            input: request.input 
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GET_PATIENTSTAFF_FAILED, payload: e });  
    return  e; 
    
    }
}
export function* getIDpatientstaff(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetidptstaffAPI.getidptstaff, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETID_PATIENTSTAFF_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GETID_PATIENTSTAFF_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* assignstaffpatient(request: any) {
    console.log("Request Input = "+JSON.stringify(request));

  try {  
       const result=yield call(AssignstaffPatientAPI.AssignstaffPatient, request.input);        
       console.log("Sagas Result Output = "+result.data);
      yield put({ 
          type: CREATE_STAFFPATIENT_COMPLETED,     
          payload: result.data,
          input: request.input
      });
  } catch (e) {
        console.log(e);
      yield put({ type: CREATE_STAFFPATIENT_FAILED, payload: e });  
  return  e; 
  
  }
}