import { put, call } from "redux-saga/effects";
import {CREATE_FORMS_COMPLETED, CREATE_FORMS_FAILED, GETALL_FORMS_COMPLETED, GETALL_FORMS_FAILED, GETBYNAME_FORMS_COMPLETED,
       GETBYNAME_FORMS_FAILED, GET_FIELDS_COMPLETED, GET_FIELDS_FAILED, CREATE_FIELDS_COMPLETED, CREATE_FIELDS_FAILED,
    UPDATE_FIELDS_COMPLETED, UPDATE_FIELDS_FAILED, GET_FIELD_FORM_COMPLETED, GET_FIELD_FORM_FAILED, CREATE_FIELD_FORM_COMPLETED, CREATE_FIELD_FORM_FAILED,
    DELETE_FIELDS_COMPLETED, DELETE_FIELDS_FAILED, DELETE_FIELD_FORM_COMPLETED, DELETE_FIELD_FORM_FAILED } from "../actions/TreatmentPlan";
import {createFormAPI,CreateFieldsAPI,GetAllFieldsAPI,GetAllFormsAPI,GetByNameFormsAPI, UpdateFieldsAPI, CreateFilledFormAPI, GetFilledFormAPI,DeleteSelectedFieldAPI,DeleteFilledFormsAPI} from "../../utils/api/TreatmentPlanAPI"; 

export function* createForms(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(createFormAPI.createForms, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: CREATE_FORMS_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: CREATE_FORMS_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* getAllForms(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetAllFormsAPI.getAllForms, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETALL_FORMS_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GETALL_FORMS_FAILED, payload: e });  
    return  e; 
    
    }
}


export function* getByNameForms(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetByNameFormsAPI.getByNameForms, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETBYNAME_FORMS_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GETBYNAME_FORMS_FAILED, payload: e });  
    return  e; 
    
    }
}

export function*getAllFields (request:any) {
    try {
      
        const { data } = yield call(GetAllFieldsAPI.getAllFields,request);
    
      yield put({
          type: GET_FIELDS_COMPLETED,
          payload: data 
        });
    } catch (e) {
        yield put({ type: GET_FIELDS_FAILED, payload: e.message });
    }
  }

export function* createFields(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(CreateFieldsAPI.createFields, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type:  CREATE_FIELDS_COMPLETED, 
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: CREATE_FIELDS_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* updateFields(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(UpdateFieldsAPI.UpdateFields, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type:  UPDATE_FIELDS_COMPLETED, 
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: UPDATE_FIELDS_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* createFilledForm(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(CreateFilledFormAPI.createFilledForm, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type:  CREATE_FIELD_FORM_COMPLETED, 
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: CREATE_FIELD_FORM_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* getByPatientIdFilledForm(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetFilledFormAPI.getByPatientIdFilledForm, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GET_FIELD_FORM_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GET_FIELD_FORM_FAILED, payload: e });  
    return  e; 
    
    }
}


export function* deleteSelectedFields(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(DeleteSelectedFieldAPI.deleteSelectedFields, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type:  DELETE_FIELDS_COMPLETED, 
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: DELETE_FIELDS_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* deleteFilledForm(request: any) {
     // console.log("Request Input = "+JSON.stringify(request));
 
    try {  
         const result=yield call(DeleteFilledFormsAPI.deleteFilledForm, request.input, request.inputParam);        
     //    console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type:  DELETE_FIELD_FORM_COMPLETED, 
            payload: result.data,
            input: request.input,
            inputParam: request.inputParam
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: DELETE_FIELD_FORM_FAILED, payload: e });  
    return  e; 
    
    }
}