import { put, call } from "redux-saga/effects";
import {
    CREATE_ORDERPROCEDURE_PROBLEMS_COMPLETED,
    CREATE_ORDERPROCEDURE_PROBLEMS_FAILED,
    GETALL_ORDERPROCEDURE_PROBLEMS_COMPLETED,
    GETALL_ORDERPROCEDURE_PROBLEMS_FAILED,
    GETBYINPUT_ORDERPROCEDURE_PROBLEMS_COMPLETED,
    GETBYINPUT_ORDERPROCEDURE_PROBLEMS_FAILED,   
    UPDATE_ORDERPROCEDURE_PROBLEMS_COMPLETED,
    UPDATE_ORDERPROCEDURE_PROBLEMS_FAILED,
    DELETE_ORDERPROCEDURE_PROBLEMS_COMPLETED,
    DELETE_ORDERPROCEDURE_PROBLEMS_FAILED} from "../actions/OrderProcedureControl";
import {CreateOrderProcedureProblemAPI,GetAllOrderProcedureProblemsAPI,GetOrderProcedureByControlAPI,UpdateOrderProcedureProblemsAPI,DeleteOrderProcedureProblemsAPI} from "../../utils/api/OrderProcedureControlAPI"; 

export function* createOrderProcedureProblem(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(CreateOrderProcedureProblemAPI.createOrderProcedureProblem, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: CREATE_ORDERPROCEDURE_PROBLEMS_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: CREATE_ORDERPROCEDURE_PROBLEMS_FAILED, payload: e });  
    return  e; 
    
    }
}

export function* getAllOrderProcedureProblems(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetAllOrderProcedureProblemsAPI.getAllOrderProcedureProblems, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETALL_ORDERPROCEDURE_PROBLEMS_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GETALL_ORDERPROCEDURE_PROBLEMS_FAILED, payload: e });  
    return  e; 
    
    }
}


export function* getOrderProcedureByControlInput(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(GetOrderProcedureByControlAPI.getOrderProcedureByControlInput, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type: GETBYINPUT_ORDERPROCEDURE_PROBLEMS_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: GETBYINPUT_ORDERPROCEDURE_PROBLEMS_FAILED, payload: e });  
    return  e; 
    
    }
}


export function* updateOrderProcedureProblems(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(UpdateOrderProcedureProblemsAPI.updateOrderProcedureProblems, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type:  UPDATE_ORDERPROCEDURE_PROBLEMS_COMPLETED, 
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: UPDATE_ORDERPROCEDURE_PROBLEMS_FAILED, payload: e });  
    return  e; 
    
    }
}


export function* deleteOrderProcedureProblems(request: any) {
    //  console.log("Request Input = "+JSON.stringify(request.input));
 
    try {  
         const result=yield call(DeleteOrderProcedureProblemsAPI.deleteOrderProcedureProblems, request.input);        
       //  console.log("Sagas Result Output = "+result.data);
        yield put({ 
            type:  DELETE_ORDERPROCEDURE_PROBLEMS_COMPLETED, 
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        //  console.log(e);
        yield put({ type: DELETE_ORDERPROCEDURE_PROBLEMS_FAILED, payload: e });  
    return  e; 
    
    }
}

