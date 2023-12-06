import { put, call } from "redux-saga/effects";

import { 
    CREATE_BED_ASSIGNMENT_COMPLETED,
    CREATE_BED_ASSIGNMENT_FAILED,
    GETALL_BED_ASSIGNMENT_COMPLETED,
    GETALL_BED_ASSIGNMENT_FAILED,
    GET_BYORGID_BED_ASSIGNMENT_COMPLETED,
    GET_BYORGID_BED_ASSIGNMENT_FAILED
   
} from "../actions/BedAssignment";

import { createBedAssignmentAPI,getAllBedAssignmentAPI,getBedAssignmentByOrgIdAPI} from "../../utils/api/BedAssignmentAPI"; 


export function* createBedAssignment(request: any) {    
    try {  
         const result=yield call(createBedAssignmentAPI.createBedAssignment, request.input);        
        yield put({ 
            type: CREATE_BED_ASSIGNMENT_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        yield put({ type: CREATE_BED_ASSIGNMENT_FAILED, payload: e });  
    return  e; 
    
    }
}
export function* getAllBedAssignment(request: any) {
    try {  
         const result=yield call(getAllBedAssignmentAPI.getAllBedAssignment, request.input);        
        yield put({
            
            type: GETALL_BED_ASSIGNMENT_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        yield put({ type: GETALL_BED_ASSIGNMENT_FAILED, payload: e.message });
       
    
    }
}

export function* getBedAssignmentByOrgId(request: any) {
    try {  
         const result=yield call(getBedAssignmentByOrgIdAPI.getBedAssignmentByOrgId, request.input);        
        yield put({
            
            type: GET_BYORGID_BED_ASSIGNMENT_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        yield put({ type: GET_BYORGID_BED_ASSIGNMENT_FAILED, payload: e.message });
       
    
    }
}
