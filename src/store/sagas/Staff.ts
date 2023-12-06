import { put, call } from "redux-saga/effects";
import { GETALL_STAFF_COMPLETED,GETALL_STAFF_FAILED,GETBYID_STAFF_COMPLETED,GETBYID_STAFF_FAILED, CREATE_STAFF_COMPLETED,CREATE_STAFF_FAILED,
INUPDATE_STAFF_COMPLETED,INUPDATE_STAFF_FAILED, OUTUPDATE_STAFF_COMPLETED,OUTUPDATE_STAFF_FAILED,UPDATE_STAFF_COMPLETED,UPDATE_STAFF_FAILED,
DELETE_STAFF_FAILED,DELETE_STAFF_COMPLETED} from "../actions/Staff";
import { StaffAPI,GetByIdStaffAPI,CreateStaffAPI,InUpdateStaffAPI,OutUpdateStaffAPI,UpdateStaffAPI,DeleteStaffAPI} from "../../utils/api/StaffAPI"; 


export function* getAllStaff(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(StaffAPI.getAllStaff, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETALL_STAFF_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GETALL_STAFF_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* getByIdStaff(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetByIdStaffAPI.getByIdStaff, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETBYID_STAFF_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GETBYID_STAFF_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* createStaff(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(CreateStaffAPI.createStaff, request.input);        
       //  console.log("Sagas Result Output = "+result);
        yield put({ 
            type: CREATE_STAFF_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: CREATE_STAFF_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* inUpdateStaff(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(InUpdateStaffAPI.inUpdateStaff, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: INUPDATE_STAFF_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: INUPDATE_STAFF_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* outUpdateStaff(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(OutUpdateStaffAPI.outUpdateStaff, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: OUTUPDATE_STAFF_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: OUTUPDATE_STAFF_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* UpdateStaff(request: any) {
      console.log("Request Input = "+JSON.stringify(request));
     
    try {  
         const result=yield call(UpdateStaffAPI.UpdateStaff, request.input);        
       
        yield put({ 
            type: UPDATE_STAFF_COMPLETED,     
            payload: result.data,
            input: request.input
        });
     
        console.log("Sagas Result Output = "+JSON.stringify(result));
    } catch (e) {  
          console.log(e);
        yield put({ type: UPDATE_STAFF_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* deleteStaff(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(DeleteStaffAPI.deleteStaff, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type:  DELETE_STAFF_COMPLETED, 
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: DELETE_STAFF_FAILED, payload: e });  
    return  e; 
    
    }
}