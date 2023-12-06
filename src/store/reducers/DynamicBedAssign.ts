import {
    CREATE_PATIENT_BED_ASSIGNMENT_STARTED,
    CREATE_PATIENT_BED_ASSIGNMENT_COMPLETED,
    CREATE_PATIENT_BED_ASSIGNMENT_FAILED,
    GET_PATIENT_BED_ASSIGNMENT_STARTED,
    GET_PATIENT_BED_ASSIGNMENT_COMPLETED,
    GET_PATIENT_BED_ASSIGNMENT_FAILED,
    DELETE_PATIENT_BED_ASSIGNMENT_STARTED,
    DELETE_PATIENT_BED_ASSIGNMENT_COMPLETED,
    DELETE_PATIENT_BED_ASSIGNMENT_FAILED
} from '../actions/DynamicBedAssign';

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

export const createDynamicBedAssignData = (state = intialLoginData, action: any) => {
 
    switch (action.type) {
       
        case CREATE_PATIENT_BED_ASSIGNMENT_STARTED:
           return {
                ...state,
                isLoading: true,    
                isFormSubmit:true,
                items:[],
                loginInput: action.input
                
            };

        case CREATE_PATIENT_BED_ASSIGNMENT_COMPLETED:
              return {
                ...state,
                isLoading: false,
                isFormSubmit:true,
                status: action.status,
                items: action.payload
                };
            
        case CREATE_PATIENT_BED_ASSIGNMENT_FAILED:
            return {
                ...state,
                isLoading: true,
            }; 
      
            default:
                return state;
        }
        
    };

    export const getAllDynamicBedAssignData = (state = intialLoginData, action: any) => {
 
        switch (action.type) {
           
            case GET_PATIENT_BED_ASSIGNMENT_STARTED:
               return {
                    ...state,
                    isLoading: true,    
                    isFormSubmit:true,
                    items:[],
                    loginInput: action.input
                    
                };
    
            case GET_PATIENT_BED_ASSIGNMENT_COMPLETED:
                  return {
                    ...state,
                    isLoading: false,
                    isFormSubmit:true,
                    status: action.status,
                    items: action.payload
                    };
                
            case GET_PATIENT_BED_ASSIGNMENT_FAILED:
                return {
                    ...state,
                    isLoading: true,
                }; 
          
                default:
                    return state;
            }
            
        };


        export const deleteDynamicBedAssignData = (state = intialLoginData, action: any) => {
 
            switch (action.type) {
               
                case DELETE_PATIENT_BED_ASSIGNMENT_STARTED:
                   return {
                        ...state,
                        isLoading: true,    
                        isFormSubmit:true,
                        items:[],
                        loginInput: action.input
                        
                    };
        
                case DELETE_PATIENT_BED_ASSIGNMENT_COMPLETED:
                      return {
                        ...state,
                        isLoading: false,
                        isFormSubmit:true,
                        status: action.status,
                        items: action.payload
                        };
                    
                case DELETE_PATIENT_BED_ASSIGNMENT_FAILED:
                    return {
                        ...state,
                        isLoading: true,
                    }; 
              
                    default:
                        return state;
                }
                
            };