import {
    GETALL_ORGANIZATION_STARTED,
    GETALL_ORGANIZATION_COMPLETED,
    GETALL_ORGANIZATION_FAILED,
    UPDATE_ORGANIZATION_STARTED,
    UPDATE_ORGANIZATION_COMPLETED,
    UPDATE_ORGANIZATION_FAILED,
    CREATE_ORGANIZATION_STARTED,
    CREATE_ORGANIZATION_COMPLETED,
    CREATE_ORGANIZATION_FAILED,
    GETBYID_ORGANIZATION_STARTED,
    GETBYID_ORGANIZATION_COMPLETED,
    GETBYID_ORGANIZATION_FAILED
} from '../actions/Organization';
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
export const allOrganizationData = (state = intialLoginData, action: any) => {
 
    switch (action.type) {
       
        case GETALL_ORGANIZATION_STARTED:
           return {
                ...state,
                isLoading: true,    
                isFormSubmit:true,
                items:[],
                loginInput: action.input
                
            };

        case GETALL_ORGANIZATION_COMPLETED:
              return {
                ...state,
                isLoading: false,
                isFormSubmit:true,
                status: action.status,
                items: action.payload
                };
            
        case GETALL_ORGANIZATION_FAILED:
            return {
                ...state,
                isLoading: true,
            }; 
      
            default:
                return state;
        }
        
    };

    export const updateOrganizationData = (state = intialLoginData, action: any) => {
 
        switch (action.type) {
           
            case UPDATE_ORGANIZATION_STARTED:
               return {
                    ...state,
                    isLoading: true,    
                    isFormSubmit:false,
                    items:[],
                    loginInput: action.input
                    
                };
    
            case UPDATE_ORGANIZATION_COMPLETED:
                  return {
                    ...state,
                    isLoading: false,
                    isFormSubmit:true,
                    status: action.status,
                    items: action.payload
                    };
                
            case UPDATE_ORGANIZATION_FAILED:
                return {
                    ...state,
                    isLoading: true,
                }; 
          
                default:
                    return state;
            }
            
        };

        export const createOrganizationData = (state = intialLoginData, action: any) => {
 
            switch (action.type) {
               
                case CREATE_ORGANIZATION_STARTED:
                   return {
                        ...state,
                        isLoading: true,    
                        isFormSubmit:false,
                        items:[],
                        loginInput: action.input
                        
                    };
        
                case CREATE_ORGANIZATION_COMPLETED:
                      return {
                        ...state,
                        isLoading: false,
                        isFormSubmit:true,
                        status: action.status,
                        items: action.payload
                        };
                    
                case CREATE_ORGANIZATION_FAILED:
                    return {
                        ...state,
                        isLoading: true,
                    }; 
              
                    default:
                        return state;
                }
                
            };

            export const getByIdOrganizationData = (state = intialLoginData, action: any) => {
 
                switch (action.type) {
                   
                    case GETBYID_ORGANIZATION_STARTED:
                       return {
                            ...state,
                            isLoading: true,                     
                            items:[],
                            loginInput: action.input                            
                        };
            
                    case GETBYID_ORGANIZATION_COMPLETED:
                          return {
                            ...state,
                            isLoading: false,           
                            status: action.status,
                            items: action.payload
                            };
                        
                    case GETBYID_ORGANIZATION_FAILED:
                        return {
                            ...state,
                            isLoading: true,
                        }; 
                  
                        default:
                            return state;
                    }
                    
                };