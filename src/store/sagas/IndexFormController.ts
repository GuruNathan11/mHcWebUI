import { put, call } from "redux-saga/effects";
import { CREATE_INDEX_FORM_COMPLETED,
    CREATE_INDEX_FORM_FAILED,
    CREATE_BYFORMID_INDEX_FORM_COMPLETED,
    CREATE_BYFORMID_INDEX_FORM_FAILED,    
    CREATE_BYSUBID_FORM_COMPLETED,
    CREATE_BYSUBID_FORM_FAILED,    
    CREATE_BYCONTENTID_INDEX_FORM_COMPLETED,
    CREATE_BYCONTENTID_INDEX_FORM_FAILED,
    GETALL_INDEX_FORM_COMPLETED,
    GETALL_INDEX_FORM_FAILED,    
    GET_BYID_INDEX_FORM_COMPLETED,
    GET_BYID_INDEX_FORM_FAILED,    
    DELETE_INDEX_FORM_COMPLETED,
    DELETE_INDEX_FORM_FAILED,    
    UPDATE_INDEX_FORM_COMPLETED,
    UPDATE_INDEX_FORM_FAILED} from "../actions/IndexFormController";
import { CreateIndexFormAPI, GetAllIndexFormAPI, DeleteIndexFormAPI, GetByIdIndexFormAPI, UpdateIndexFormAPI, CreateContentIndexFormIdAPI, CreateIndexByFormIdAPI, CreateSubIndexFormIdAPI } from "../../utils/api/IndexFormControllerAPI"; 


export function* createIndexForm(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(CreateIndexFormAPI.createIndexForm, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: CREATE_INDEX_FORM_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: CREATE_INDEX_FORM_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* createIndexByFormId(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(CreateIndexByFormIdAPI.createIndexByFormId, request.input, request.inputValue);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: CREATE_BYFORMID_INDEX_FORM_COMPLETED,     
            payload: result.data,
            input: request.input,
            inputValue: request.inputValue
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: CREATE_BYFORMID_INDEX_FORM_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* createSubIndexFormId(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(CreateSubIndexFormIdAPI.createSubIndexFormId, request.input, request.inputValue, request.inputParams);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: CREATE_BYSUBID_FORM_COMPLETED,     
            payload: result.data,
            input: request.input,
            inputValue: request.inputValue,
            inputParams: request.inputParams
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: CREATE_BYSUBID_FORM_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* createContentIndexFormId(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(CreateContentIndexFormIdAPI.createContentIndexFormId, request.input, request.inputValue, request.inputParams, request.inputParams1);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: CREATE_BYCONTENTID_INDEX_FORM_COMPLETED,     
            payload: result.data,
            input: request.input,
            inputValue: request.inputValue,
            inputParams: request.inputParams,
            inputParams1: request.inputParams1
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: CREATE_BYCONTENTID_INDEX_FORM_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* getAllIndexForm(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetAllIndexFormAPI.getAllIndexForm, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETALL_INDEX_FORM_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GETALL_INDEX_FORM_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* getIndexFormById(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetByIdIndexFormAPI.getByIdIndexForm, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GET_BYID_INDEX_FORM_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GET_BYID_INDEX_FORM_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* deleteIndexForm(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(DeleteIndexFormAPI.deleteIndexForm, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: DELETE_INDEX_FORM_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: DELETE_INDEX_FORM_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* updateIndexForm(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(UpdateIndexFormAPI.updateIndexForm, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: UPDATE_INDEX_FORM_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: UPDATE_INDEX_FORM_FAILED, payload: e });  
    return  e; 
    
    }
}