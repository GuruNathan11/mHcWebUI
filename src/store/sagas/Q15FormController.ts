import { put, call } from "redux-saga/effects";
import {UPDATE_LOCATION_Q15FORM_COMPLETED,UPDATE_LOCATION_Q15FORM_FAILED,UPDATE_ACTIVITY_Q15FORM_COMPLETED,UPDATE_ACTIVITY_Q15FORM_FAILED,
UPDATE_Q15FORM_COMPLETED,UPDATE_Q15FORM_FAILED,CREATE_ACTIVITY_Q15FORM_COMPLETED,CREATE_ACTIVITY_Q15FORM_FAILED,CREATE_LOCATION_Q15FORM_FAILED,CREATE_LOCATION_Q15FORM_COMPLETED,
CREATE_Q15FORM_COMPLETED,CREATE_Q15FORM_FAILED,GET_Q15FORM_COMPLETED,GET_Q15FORM_FAILED} from "../actions/Q15FormController";
import {UpdatelocationAPI,UpdateactivityAPI,Updateq15API,CreateLocationAPI,CreateactivityAPI,Createq15API ,Getidq15formAPI } from "../../utils/api/Q15FormControllerAPI"; 

export function* updatelocationq15form(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(UpdatelocationAPI.Updatelocation, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: UPDATE_LOCATION_Q15FORM_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: UPDATE_LOCATION_Q15FORM_FAILED, payload: e });  
    return  e; 
    
    }
}
export function* updateActivityq15form(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(UpdateactivityAPI.Updateactivity, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: UPDATE_ACTIVITY_Q15FORM_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: UPDATE_ACTIVITY_Q15FORM_FAILED, payload: e });  
    return  e; 
    
    }
}
export function* updateq15form(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(Updateq15API.Updateq15, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: UPDATE_Q15FORM_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: UPDATE_Q15FORM_FAILED, payload: e });  
    return  e; 
    
    }
}
export function* createlocationq15form(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(CreateLocationAPI.createloaction, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: CREATE_LOCATION_Q15FORM_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: CREATE_LOCATION_Q15FORM_FAILED, payload: e });  
    return  e; 
    
    }
}export function* createactivityq15form(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(CreateactivityAPI.createactivity, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: CREATE_ACTIVITY_Q15FORM_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: CREATE_ACTIVITY_Q15FORM_FAILED, payload: e });  
    return  e; 
    
    }
}export function* createq15form(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(Createq15API.createq15, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: CREATE_Q15FORM_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: CREATE_Q15FORM_FAILED, payload: e });  
    return  e; 
    
    }
}
export function* getq15form(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(Getidq15formAPI.getid, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GET_Q15FORM_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GET_Q15FORM_FAILED, payload: e });  
    return  e; 
    
    }
}

