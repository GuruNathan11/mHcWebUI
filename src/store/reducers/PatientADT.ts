import {
    CREATE_PATIENT_ADMIT_STARTED, CREATE_PATIENT_ADMIT_COMPLETED, CREATE_PATIENT_ADMIT_FAILED,
    CREATE_TRANSFER_PATIENT_STARTED, CREATE_TRANSFER_PATIENT_COMPLETED, CREATE_TRANSFER_PATIENT_FAILED,
    CREATE_DISCHARGE_PATIENT_STARTED, CREATE_DISCHARGE_PATIENT_COMPLETED, CREATE_DISCHARGE_PATIENT_FAILED,
    GET_PATIENT_ADMIT_STARTED, GET_PATIENT_ADMIT_COMPLETED, GET_PATIENT_ADMIT_FAILED,
    GET_TRANSFER_PATIENT_STARTED, GET_TRANSFER_PATIENT_COMPLETED, GET_TRANSFER_PATIENT_FAILED,
    GET_DISCHARGE_PATIENT_STARTED, GET_DISCHARGE_PATIENT_COMPLETED, GET_DISCHARGE_PATIENT_FAILED
} from '../actions/PatientADT';

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


export const createPatientAdmitData = (state = intialLoginData, action: any) => {
 
    switch (action.type) {
       
        case CREATE_PATIENT_ADMIT_STARTED:
           return {
                ...state,
                isLoading: true,    
                isFormSubmit:true,
                items:[],
                loginInput: action.input
                
            };

        case CREATE_PATIENT_ADMIT_COMPLETED:
              return {
                ...state,
                isLoading: false,
                isFormSubmit:true,
                status: action.status,
                items: action.payload
                };
            
        case CREATE_PATIENT_ADMIT_FAILED:
            return {
                ...state,
                isLoading: true,
            }; 
      
            default:
                return state;
        }
        
    };


export const createTransferPatientData = (state = intialLoginData, action: any) => {
 
        switch (action.type) {
           
            case CREATE_TRANSFER_PATIENT_STARTED:
               return {
                    ...state,
                    isLoading: true,    
                    isFormSubmit:true,
                    items:[],
                    loginInput: action.input
                    
                };
    
            case CREATE_TRANSFER_PATIENT_COMPLETED:
                  return {
                    ...state,
                    isLoading: false,
                    isFormSubmit:true,
                    status: action.status,
                    items: action.payload
                    };
                
            case CREATE_TRANSFER_PATIENT_FAILED:
                return {
                    ...state,
                    isLoading: true,
                }; 
          
                default:
                    return state;
            }
            
    };


export const createDischargePatientData = (state = intialLoginData, action: any) => {
 
            switch (action.type) {
               
                case CREATE_DISCHARGE_PATIENT_STARTED:
                   return {
                        ...state,
                        isLoading: true,    
                        isFormSubmit:true,
                        items:[],
                        loginInput: action.input
                        
                    };
        
                case CREATE_DISCHARGE_PATIENT_COMPLETED:
                      return {
                        ...state,
                        isLoading: false,
                        isFormSubmit:true,
                        status: action.status,
                        items: action.payload
                        };
                    
                case CREATE_DISCHARGE_PATIENT_FAILED:
                    return {
                        ...state,
                        isLoading: true,
                    }; 
              
                    default:
                        return state;
                }
                
            };


            export const getPatientAdmitData = (state = intialLoginData, action: any) => {
 
                switch (action.type) {
                   
                    case GET_PATIENT_ADMIT_STARTED:
                       return {
                            ...state,
                            isLoading: true,    
                            isFormSubmit:true,
                            items:[],
                            loginInput: action.input
                            
                        };
            
                    case GET_PATIENT_ADMIT_COMPLETED:
                          return {
                            ...state,
                            isLoading: false,
                            isFormSubmit:true,
                            status: action.status,
                            items: action.payload
                            };
                        
                    case GET_PATIENT_ADMIT_FAILED:
                        return {
                            ...state,
                            isLoading: true,
                        }; 
                  
                        default:
                            return state;
                    }
                    
                };
     
                

                export const getTransferPatientData = (state = intialLoginData, action: any) => {
 
                    switch (action.type) {
                       
                        case GET_TRANSFER_PATIENT_STARTED:
                           return {
                                ...state,
                                isLoading: true,    
                                isFormSubmit:true,
                                items:[],
                                loginInput: action.input
                                
                            };
                
                        case GET_TRANSFER_PATIENT_COMPLETED:
                              return {
                                ...state,
                                isLoading: false,
                                isFormSubmit:true,
                                status: action.status,
                                items: action.payload
                                };
                            
                        case GET_TRANSFER_PATIENT_FAILED:
                            return {
                                ...state,
                                isLoading: true,
                            }; 
                      
                            default:
                                return state;
                        }
                        
                    };
     
                    

                    export const getDischargePatientData = (state = intialLoginData, action: any) => {
 
                        switch (action.type) {
                           
                            case GET_DISCHARGE_PATIENT_STARTED:
                               return {
                                    ...state,
                                    isLoading: true,    
                                    isFormSubmit:true,
                                    items:[],
                                    loginInput: action.input
                                    
                                };
                    
                            case GET_DISCHARGE_PATIENT_COMPLETED:
                                  return {
                                    ...state,
                                    isLoading: false,
                                    isFormSubmit:true,
                                    status: action.status,
                                    items: action.payload
                                    };
                                
                            case GET_DISCHARGE_PATIENT_FAILED:
                                return {
                                    ...state,
                                    isLoading: true,
                                }; 
                          
                                default:
                                    return state;
                            }
                            
                        };
                     