import { put, call } from "redux-saga/effects";
import { CREATE_PATIENT_BED_ASSIGNMENT_COMPLETED,
    CREATE_PATIENT_BED_ASSIGNMENT_FAILED,
    GET_PATIENT_BED_ASSIGNMENT_COMPLETED,
    GET_PATIENT_BED_ASSIGNMENT_FAILED,
    DELETE_PATIENT_BED_ASSIGNMENT_COMPLETED,
    DELETE_PATIENT_BED_ASSIGNMENT_FAILED} from "../actions/DynamicBedAssign";
import { CreateDynamicBedAssignAPI, GetAllDynamicBedAssignAPI, DeleteDynamicBedAssignAPI } from "../../utils/api/DynamicBedAssignAPI"; 


export function* createDynamicBedAssign(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(CreateDynamicBedAssignAPI.createDynamicBedAssign, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: CREATE_PATIENT_BED_ASSIGNMENT_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: CREATE_PATIENT_BED_ASSIGNMENT_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* getAllDynamicBedAssign(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetAllDynamicBedAssignAPI.getAllDynamicBedAssign, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GET_PATIENT_BED_ASSIGNMENT_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GET_PATIENT_BED_ASSIGNMENT_FAILED, payload: e });  
    return  e; 
    
    }
}


export function* deleteDynamicBedAssign(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(DeleteDynamicBedAssignAPI.deleteDynamicBedAssign, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: DELETE_PATIENT_BED_ASSIGNMENT_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: DELETE_PATIENT_BED_ASSIGNMENT_FAILED, payload: e });  
    return  e; 
    
    }
}