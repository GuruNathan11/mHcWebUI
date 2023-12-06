import {
    CREATE_PATIENT_PROBLEMS_STARTED,
    CREATE_PATIENT_PROBLEMS_COMPLETED,
    CREATE_PATIENT_PROBLEMS_FAILED,
    GETALL_PATIENT_PROBLEMS_STARTED,
    GETALL_PATIENT_PROBLEMS_COMPLETED,
    GETALL_PATIENT_PROBLEMS_FAILED,
    GETBYINPUT_PATIENT_PROBLEMS_STARTED,
    GETBYINPUT_PATIENT_PROBLEMS_COMPLETED,
    GETBYINPUT_PATIENT_PROBLEMS_FAILED,
    GET_PATIENTBYINPUTID_PROBLEMS_STARTED,
    GET_PATIENTBYINPUTID_PROBLEMS_COMPLETED,
    GET_PATIENTBYINPUTID_PROBLEMS_FAILED,
    UPDATE_PATIENT_PROBLEMS_STARTED,
    UPDATE_PATIENT_PROBLEMS_COMPLETED,
    UPDATE_PATIENT_PROBLEMS_FAILED,
    DELETE_PATIENT_PROBLEMS_STARTED,
    DELETE_PATIENT_PROBLEMS_COMPLETED,
    DELETE_PATIENT_PROBLEMS_FAILED
} from '../actions/PatientProblem';

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

export const createPatientProblemsData = (state = intialLoginData, action: any) => {
 
    switch (action.type) {
       
        case CREATE_PATIENT_PROBLEMS_STARTED:
           return {
                ...state,
                isLoading: true,    
                isFormSubmit:true,
                items:[],
                loginInput: action.input
                
            };

        case CREATE_PATIENT_PROBLEMS_COMPLETED:
              return {
                ...state,
                isLoading: false,
                isFormSubmit:true,
                status: action.status,
                items: action.payload
                };
            
        case CREATE_PATIENT_PROBLEMS_FAILED:
            return {
                ...state,
                isLoading: true,
            }; 
      
            default:
                return state;
        }
        
    };

    export const getAllPatientProblemsData = (state = intialLoginData, action: any) => {
 
        switch (action.type) {
           
            case GETALL_PATIENT_PROBLEMS_STARTED:
               return {
                    ...state,
                    isLoading: true,    
                    isFormSubmit:true,
                    items:[],
                    loginInput: action.input
                    
                };
    
            case GETALL_PATIENT_PROBLEMS_COMPLETED:
                  return {
                    ...state,
                    isLoading: false,
                    isFormSubmit:true,
                    status: action.status,
                    items: action.payload
                    };
                
            case GETALL_PATIENT_PROBLEMS_FAILED:
                return {
                    ...state,
                    isLoading: true,
                }; 
          
                default:
                    return state;
            }
            
        };
     
            export const getProblemsByPatientInputData = (state = intialLoginData, action: any) => {
 
            switch (action.type) {
               
                case GETBYINPUT_PATIENT_PROBLEMS_STARTED:
                   return {
                        ...state,
                        isLoading: true,    
                        isFormSubmit:true,
                        items:[],
                        loginInput: action.input
                        
                    };
        
                case GETBYINPUT_PATIENT_PROBLEMS_COMPLETED:
                      return {
                        ...state,
                        isLoading: false,
                        isFormSubmit:true,
                        status: action.status,
                        items: action.payload
                        };
                    
                case GETBYINPUT_PATIENT_PROBLEMS_FAILED:
                    return {
                        ...state,
                        isLoading: true,
                    }; 
              
                    default:
                        return state;
                }
                
            };

            export const getProblemsByPatientInputIdData = (state = intialLoginData, action: any) => {
                switch (action.type) {
                case GET_PATIENTBYINPUTID_PROBLEMS_STARTED:  
                return {
                  ...state,
                  items:[],
                  isLoading: true,
                };
              case GET_PATIENTBYINPUTID_PROBLEMS_COMPLETED:
                return {
                  ...state,
                  isLoading: false,
                  status: action.status,
                  items: action.payload
                };
              case GET_PATIENTBYINPUTID_PROBLEMS_FAILED:
                return {
                  ...state,
                  isLoading: true,
                  status:"Fail"
                };
                default:
                  return state;
              }
              }     
                export const updatePatientProblemsData = (state = intialLoginData, action: any) => {
 
                    switch (action.type) {
                       
                        case UPDATE_PATIENT_PROBLEMS_STARTED:
                           return {
                                ...state,
                                isLoading: true,    
                                isFormSubmit:true,
                                items:[],
                                loginInput: action.input
                                
                            };
                
                        case UPDATE_PATIENT_PROBLEMS_COMPLETED:
                              return {
                                ...state,
                                isLoading: false,
                                isFormSubmit:true,
                                status: action.status,
                                items: action.payload
                                };
                            
                        case UPDATE_PATIENT_PROBLEMS_FAILED:
                            return {
                                ...state,
                                isLoading: true,
                            }; 
                      
                            default:
                                return state;
                        }
                        
                    };

                    export const deletePatientProblemsData = (state = intialLoginData, action: any) => {
 
                        switch (action.type) {
                           
                            case DELETE_PATIENT_PROBLEMS_STARTED:
                               return {
                                    ...state,
                                    isLoading: true,    
                                    isFormSubmit:true,
                                    items:[],
                                    loginInput: action.input
                                    
                                };
                    
                            case DELETE_PATIENT_PROBLEMS_COMPLETED:
                                  return {
                                    ...state,
                                    isLoading: false,
                                    isFormSubmit:true,
                                    status: action.status,
                                    items: action.payload
                                    };
                                
                            case DELETE_PATIENT_PROBLEMS_FAILED:
                                return {
                                    ...state,
                                    isLoading: true,
                                }; 
                          
                                default:
                                    return state;
                            }
                            
                        };                    