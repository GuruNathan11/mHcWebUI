import {
    CREATE_ORDERPROCEDURE_PROBLEMS_STARTED,
    CREATE_ORDERPROCEDURE_PROBLEMS_COMPLETED,
    CREATE_ORDERPROCEDURE_PROBLEMS_FAILED,
    GETALL_ORDERPROCEDURE_PROBLEMS_STARTED,
    GETALL_ORDERPROCEDURE_PROBLEMS_COMPLETED,
    GETALL_ORDERPROCEDURE_PROBLEMS_FAILED,
    GETBYINPUT_ORDERPROCEDURE_PROBLEMS_STARTED,
    GETBYINPUT_ORDERPROCEDURE_PROBLEMS_COMPLETED,
    GETBYINPUT_ORDERPROCEDURE_PROBLEMS_FAILED,
    UPDATE_ORDERPROCEDURE_PROBLEMS_STARTED,
    UPDATE_ORDERPROCEDURE_PROBLEMS_COMPLETED,
    UPDATE_ORDERPROCEDURE_PROBLEMS_FAILED,
    DELETE_ORDERPROCEDURE_PROBLEMS_STARTED,
    DELETE_ORDERPROCEDURE_PROBLEMS_COMPLETED,
    DELETE_ORDERPROCEDURE_PROBLEMS_FAILED
} from '../actions/OrderProcedureControl';

const intialLoginData = {
    status: {
        statusCode: 300,
        statusDisplay: "",
        statusValue: true
    },
    items: [],
    loginInput: {       
        userId: "",
        password: "",
        username:"",
        jwtToken:"",
        secretKey:"",
        securityQuestion: "",
        email:"",
        otp:"",
        newPassword:"",  
        confirmNewPass: "",   
        answer: "",
        roleFkId:{roleId:0,roleName:"",description:"",status:0,createdAt:"",createdBy:"",updatedAt:"",updatedBy:""},
        status:0,
        createdAt:"",
        createdBy:"",
        updatedAt:"",
        updatedBy:""
    
    },
    isLoading: true,
    isFormSubmit: false,
    isLoggedIn: false,
    error: ''
}

export const createOrderProcedureProblemsData = (state = intialLoginData, action: any) => {
 
    switch (action.type) {
       
        case CREATE_ORDERPROCEDURE_PROBLEMS_STARTED:
           return {
                ...state,
                isLoading: true,    
                isFormSubmit:true,
                items:[],
                loginInput: action.input
                
            };

        case CREATE_ORDERPROCEDURE_PROBLEMS_COMPLETED:
              return {
                ...state,
                isLoading: false,
                isFormSubmit:true,
                status: action.status,
                items: action.payload
                };
            
        case CREATE_ORDERPROCEDURE_PROBLEMS_FAILED:
            return {
                ...state,
                isLoading: true,
            }; 
      
            default:
                return state;
        }
        
    };

    export const getAllOrderProcedureProblemsData = (state = intialLoginData, action: any) => {
 
        switch (action.type) {
           
            case GETALL_ORDERPROCEDURE_PROBLEMS_STARTED:
               return {
                    ...state,
                    isLoading: true,    
                    isFormSubmit:true,
                    items:[],
                    loginInput: action.input
                    
                };
    
            case GETALL_ORDERPROCEDURE_PROBLEMS_COMPLETED:
                  return {
                    ...state,
                    isLoading: false,
                    isFormSubmit:true,
                    status: action.status,
                    items: action.payload
                    };
                
            case GETALL_ORDERPROCEDURE_PROBLEMS_FAILED:
                return {
                    ...state,
                    isLoading: true,
                }; 
          
                default:
                    return state;
            }
            
        };
     
            export const getOrderProcedureByProblemsInputData = (state = intialLoginData, action: any) => {
 
            switch (action.type) {
               
                case GETBYINPUT_ORDERPROCEDURE_PROBLEMS_STARTED:
                   return {
                        ...state,
                        isLoading: true,    
                        isFormSubmit:true,
                        items:[],
                        loginInput: action.input
                        
                    };
        
                case GETBYINPUT_ORDERPROCEDURE_PROBLEMS_COMPLETED:
                      return {
                        ...state,
                        isLoading: false,
                        isFormSubmit:true,
                        status: action.status,
                        items: action.payload
                        };
                    
                case GETBYINPUT_ORDERPROCEDURE_PROBLEMS_FAILED:
                    return {
                        ...state,
                        isLoading: true,
                    }; 
              
                    default:
                        return state;
                }
                
            };

              
                export const updateOrderProcedureControlData = (state = intialLoginData, action: any) => {
 
                    switch (action.type) {
                       
                        case UPDATE_ORDERPROCEDURE_PROBLEMS_STARTED:
                           return {
                                ...state,
                                isLoading: true,    
                                isFormSubmit:true,
                                items:[],
                                loginInput: action.input
                                
                            };
                
                        case UPDATE_ORDERPROCEDURE_PROBLEMS_COMPLETED:
                              return {
                                ...state,
                                isLoading: false,
                                isFormSubmit:true,
                                status: action.status,
                                items: action.payload
                                };
                            
                        case UPDATE_ORDERPROCEDURE_PROBLEMS_FAILED:
                            return {
                                ...state,
                                isLoading: true,
                            }; 
                      
                            default:
                                return state;
                        }
                        
                    };

                    export const deleteOrderProcedureControlData = (state = intialLoginData, action: any) => {
 
                        switch (action.type) {
                           
                            case DELETE_ORDERPROCEDURE_PROBLEMS_STARTED:
                               return {
                                    ...state,
                                    isLoading: true,    
                                    isFormSubmit:true,
                                    items:[],
                                    loginInput: action.input
                                    
                                };
                    
                            case DELETE_ORDERPROCEDURE_PROBLEMS_COMPLETED:
                                  return {
                                    ...state,
                                    isLoading: false,
                                    isFormSubmit:true,
                                    status: action.status,
                                    items: action.payload
                                    };
                                
                            case DELETE_ORDERPROCEDURE_PROBLEMS_FAILED:
                                return {
                                    ...state,
                                    isLoading: true,
                                }; 
                          
                                default:
                                    return state;
                            }
                            
                        };                    