import {
    CREATE_BED_ASSIGNMENT_STARTED,
    CREATE_BED_ASSIGNMENT_COMPLETED,
    CREATE_BED_ASSIGNMENT_FAILED,
    GETALL_BED_ASSIGNMENT_STARTED ,
    GETALL_BED_ASSIGNMENT_COMPLETED,
    GETALL_BED_ASSIGNMENT_FAILED,
    GET_BYORGID_BED_ASSIGNMENT_STARTED,
    GET_BYORGID_BED_ASSIGNMENT_COMPLETED,
    GET_BYORGID_BED_ASSIGNMENT_FAILED
} from '../actions/BedAssignment';   
    
    
    
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
    loggedStatus: false,
    error: ''
}



export const createBedAssignmentData = (state = intialLoginData, action: any) => {
    switch (action.type) {
       
        case CREATE_BED_ASSIGNMENT_STARTED:
           return {
                ...state,
                isLoading: true,    
                isFormSubmit:true,
                items:[],
                loginInput: action.input
                
            };

        case CREATE_BED_ASSIGNMENT_COMPLETED:
              return {
                ...state,
                isLoading: false,
                isFormSubmit:true,
                status: action.status,
                items: action.payload,
                loggedStatus: true
                };
            
        case CREATE_BED_ASSIGNMENT_FAILED:
            return {
                ...state,
                isLoading: true,
                loggedStatus: false
            }; 
      
            default:
                return state;
        }
        
    };

    export const getallBedAssignmentData = (state = intialLoginData, action: any) => {               
        switch (action.type) { 
            case GETALL_BED_ASSIGNMENT_STARTED:  
          return {
            ...state,
            isLoading: true,    
            isFormSubmit:true,
            items:[],
            loginInput: action.input
          };
        case GETALL_BED_ASSIGNMENT_COMPLETED:
          return {
            ...state,
            isLoading: false,
            isFormSubmit:true,
            status: action.status,
            items: action.payload
          };
        case GETALL_BED_ASSIGNMENT_FAILED:
          return {
            ...state,
            isLoading: true,
            loggedStatus: false
        }; 
          
                default:
                    return state;
            }
            
        };


        export const getBedAssignmentByOrgIdData = (state = intialLoginData, action: any) => {               
          switch (action.type) { 
              case GET_BYORGID_BED_ASSIGNMENT_STARTED:  
              return {
                ...state,
                isLoading: true,    
                isFormSubmit:true,
                items:[],
                loginInput: action.input
                
            };
          case GET_BYORGID_BED_ASSIGNMENT_COMPLETED:
            return {
              ...state,
              isLoading: false,
              isFormSubmit:true,
              status: action.status,
              items: action.payload,
              loggedStatus: true
              };
          case GET_BYORGID_BED_ASSIGNMENT_FAILED:
            return {
              ...state,
              isLoading: true,                  
            }; 
            
                  default:
                      return state;
              }
              
          };
  
      