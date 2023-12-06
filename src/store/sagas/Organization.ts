import { put, call } from "redux-saga/effects";
import { GETALL_ORGANIZATION_COMPLETED,GETALL_ORGANIZATION_FAILED,UPDATE_ORGANIZATION_COMPLETED,UPDATE_ORGANIZATION_FAILED,CREATE_ORGANIZATION_COMPLETED,CREATE_ORGANIZATION_FAILED,GETBYID_ORGANIZATION_COMPLETED,GETBYID_ORGANIZATION_FAILED} from "../actions/Organization";
import { OrganizationAPI,UpdateOrganizationAPI,CreateOrganizationAPI,GetByIdOrganizationAPI } from "../../utils/api/OrganizationAPI"; 

export function* getAllOrganization(request: any) {
    //console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(OrganizationAPI.getAllOrganization, request.input);        
       //console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETALL_ORGANIZATION_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
       // console.log(e);
        yield put({ type: GETALL_ORGANIZATION_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* updateOrganization(request: any) {
   // console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(UpdateOrganizationAPI.updateOrganization, request.input);        
      // console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: UPDATE_ORGANIZATION_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
       // console.log(e);
        yield put({ type: UPDATE_ORGANIZATION_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* createOrganization(request: any) {
   // console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(CreateOrganizationAPI.createOrganization, request.input);        
    //   console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: CREATE_ORGANIZATION_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
    //    console.log(e);
        yield put({ type: CREATE_ORGANIZATION_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* getByIdOrganization(request: any) {
    //console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetByIdOrganizationAPI.getByIdOrganization, request.input);        
    //   console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETBYID_ORGANIZATION_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
    //    console.log(e);
        yield put({ type: GETBYID_ORGANIZATION_FAILED, payload: e });  
    return  e; 
    
    }
}
