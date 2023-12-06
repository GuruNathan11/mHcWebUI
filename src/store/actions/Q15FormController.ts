export const UPDATE_ACTIVITY_Q15FORM_STARTED = "UPDATE_ACTIVITY_Q15FORM_STARTED";
export const UPDATE_ACTIVITY_Q15FORM_COMPLETED = "UPDATE_ACTIVITY_Q15FORM_COMPLETED";
export const UPDATE_ACTIVITY_Q15FORM_FAILED = "UPDATE_ACTIVITY_Q15FORM_FAILED";
export const UPDATE_LOCATION_Q15FORM_STARTED = "UPDATE_LOCATION_Q15FORM_STARTED";
export const UPDATE_LOCATION_Q15FORM_COMPLETED = "UPDATE_LOCATION_Q15FORM_COMPLETED";
export const UPDATE_LOCATION_Q15FORM_FAILED = "UPDATE_Q15FORM_FAILED";
export const UPDATE_Q15FORM_STARTED = "UPDATE_Q15FORM_STARTED";
export const UPDATE_Q15FORM_COMPLETED = "UPDATE_Q15FORM_COMPLETED";
export const UPDATE_Q15FORM_FAILED = "UPDATE_Q15FORM_FAILED";
export const CREATE_ACTIVITY_Q15FORM_STARTED = "CREATE_ACTIVITY_Q15FORM_STARTED";
export const CREATE_ACTIVITY_Q15FORM_COMPLETED = "CREATE_ACTIVITY_Q15FORM_COMPLETED";
export const CREATE_ACTIVITY_Q15FORM_FAILED = "CREATE_ACTIVITY_Q15FORM_FAILED";
export const CREATE_LOCATION_Q15FORM_STARTED = "CREATE_LOCATION_Q15FORM_STARTED";
export const CREATE_LOCATION_Q15FORM_COMPLETED = "CREATE_LOCATION_Q15FORM_COMPLETED";
export const CREATE_LOCATION_Q15FORM_FAILED = "CREATE_Q15FORM_FAILED";
export const CREATE_Q15FORM_STARTED = "CREATE_Q15FORM_STARTED";
export const CREATE_Q15FORM_COMPLETED = "CREATE_Q15FORM_COMPLETED";
export const CREATE_Q15FORM_FAILED = "CREATE_Q15FORM_FAILED";
export const GET_Q15FORM_STARTED = "GET_Q15FORM_STARTED";
export const GET_Q15FORM_COMPLETED = "GET_Q15FORM_COMPLETED";
export const GET_Q15FORM_FAILED = "GET_Q15FORM_FAILED";












export interface IPatient {
    status: {
      statusCode: number;
      statusDisplay: string;
      statusValue: boolean; 
    };
    items: Array<any>;
    loginInput: {
      userId: string;
      username:string,
      password: string;
      organization:string;
      jwtToken: string;
      secretKey: string,
      email:string,
      otp:string,
      confirmNewPass: string,
      newPassword:string,
      patientid:string,
      securityQuestion: string;
      answer: string;
      roleFkId: {
        roleId: number;
        roleName: string;
        description: string;
        status: number;
        GETdAt: Date;
        createdBy: string;
        updatedAt: Date;
        updatedBy: string;
      };
      status: number;
      createdAt: Date;
      createdBy: string;
      updatedAt: Date;
      updatedBy: string;
    };
    loginID: number;
    isLoading: boolean;
    error: string;
  }


  export const UpdatelocationQ15FORM = (loginInput: any) => { 
    
    return {
      type: UPDATE_LOCATION_Q15FORM_STARTED,
      payload: "status",
      input: loginInput
    };
  };
  export const UpdateactivityQ15FORM = (loginInput: any) => { 
    
    return {
      type: UPDATE_ACTIVITY_Q15FORM_STARTED,
      payload: "status",
      input: loginInput
    };
  };
  export const UpdateQ15FORM = (loginInput: any) => { 
    
    return {
      type: UPDATE_Q15FORM_STARTED,
      payload: "status",
      input: loginInput
    };
  };

export const CreatelocationQ15FORM = (loginInput: any) => { 
  
  return {
    type: CREATE_LOCATION_Q15FORM_STARTED,
    payload: "status",
    input: loginInput
  };
};
export const CreateactivityQ15FORM = (loginInput: any) => { 
    
    return {
      type: CREATE_ACTIVITY_Q15FORM_STARTED,
      payload: "status",
      input: loginInput
    };
  };
  export const CreateQ15FORM = (loginInput: any) => { 
    
    return {
      type: CREATE_Q15FORM_STARTED,
      payload: "status",
      input: loginInput
    };
  };
  export const GetQ15FORM = (loginInput: any) => { 
    
    return {
      type: GET_Q15FORM_STARTED,
      payload: "status",
      input: loginInput
    };
  };