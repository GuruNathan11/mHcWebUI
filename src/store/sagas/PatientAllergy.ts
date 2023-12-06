import { put, call } from "redux-saga/effects";
import {CREATE_PATIENT_ALLERGY_COMPLETED,CREATE_PATIENT_ALLERGY_FAILED,GETALL_PATIENT_ALLERGY_COMPLETED,GETALL_PATIENT_ALLERGY_FAILED,
     GETBYINPUT_PATIENT_ALLERGY_COMPLETED,GETBYINPUT_PATIENT_ALLERGY_FAILED, UPDATE_PATIENT_ALLERGY_COMPLETED,
    UPDATE_PATIENT_ALLERGY_FAILED,DELETE_PATIENT_ALLERGY_COMPLETED,DELETE_PATIENT_ALLERGY_FAILED,GET_PATIENTBYINPUTID_ALLERGY_COMPLETED,
    GET_PATIENTBYINPUTID_ALLERGY_FAILED  } from "../actions/PatientAllergy";
import {CreatePatientAllergyAPI,GetAllPatientAllergyAPI,GetAllergyByPatientAPI,GetAllergyByPatientInputAPI,UpdatePatientAllergyAPI,DeletePatientAllergyAPI} from "../../utils/api/PatientAllergyAPI"; 

export function* createPatientAllergy(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(CreatePatientAllergyAPI.createPatientAllergy, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: CREATE_PATIENT_ALLERGY_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: CREATE_PATIENT_ALLERGY_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* getAllPatientAllergy(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetAllPatientAllergyAPI.getAllPatientAllergy, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETALL_PATIENT_ALLERGY_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GETALL_PATIENT_ALLERGY_FAILED, payload: e });  
    return  e; 
    
    }
}


export function* getAllergyByPatientInput(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetAllergyByPatientAPI.getAllergyByPatientInput, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETBYINPUT_PATIENT_ALLERGY_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GETBYINPUT_PATIENT_ALLERGY_FAILED, payload: e });  
    return  e; 
    
    }
}

export function*getAllergyByPatientInputId (request:any) {
    try {
      
        const { data } = yield call(GetAllergyByPatientInputAPI.getAllergyByPatientInputId,request);
    
      yield put({
          type: GET_PATIENTBYINPUTID_ALLERGY_COMPLETED,
          payload: data 
        });
    } catch (e) {
        yield put({ type: GET_PATIENTBYINPUTID_ALLERGY_FAILED, payload: e.message });
    }
  }

export function* updatePatientAllergy(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(UpdatePatientAllergyAPI.updatePatientAllergy, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type:  UPDATE_PATIENT_ALLERGY_COMPLETED, 
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: UPDATE_PATIENT_ALLERGY_FAILED, payload: e });  
    return  e; 
    
    }
}


export function* deletePatientAllergy(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(DeletePatientAllergyAPI.deletePatientAllergy, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type:  DELETE_PATIENT_ALLERGY_COMPLETED, 
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: DELETE_PATIENT_ALLERGY_FAILED, payload: e });  
    return  e; 
    
    }
}

