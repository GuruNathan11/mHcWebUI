export const CREATE_Q15CONFIG_STARTED = "CREATE_Q15CONFIG_STARTED";
export const CREATE_Q15CONFIG_COMPLETED = "CREATE_Q15CONFIG_COMPLETED";
export const CREATE_Q15CONFIG_FAILED = "CREATE_Q15CONFIG_FAILED";
export const GET_Q15CONFIG_STARTED = "GET_Q15CONFIG_STARTED";
export const GET_Q15CONFIG_COMPLETED = "GET_Q15CONFIG_COMPLETED";
export const GET_Q15CONFIG_FAILED = "GET_Q15CONFIG_FAILED";
export const GETID_Q15CONFIG_STARTED = "GETID_Q15CONFIG_STARTED";
export const GETID_Q15CONFIG_COMPLETED = "GETID_Q15CONFIG_COMPLETED";
export const GETID_Q15CONFIG_FAILED = "GETID_Q15CONFIG_FAILED";
export const GETSLOT_Q15CONFIG_STARTED = "GETSLOT_Q15CONFIG_STARTED";
export const GETSLOT_Q15CONFIG_COMPLETED = "GETSLOT_Q15CONFIG_COMPLETED";
export const GETSLOT_Q15CONFIG_FAILED = "GETSLOT_Q15CONFIG_FAILED";
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


  export const createQ15CONFIG = (loginInput: any) => { 
    
    return {
      type: CREATE_Q15CONFIG_STARTED,
      payload: "status",
      input: loginInput
    };
  };
  export const getallQ15CONFIG = (loginInput: any) => { 
    
    return {
      type: GET_Q15CONFIG_STARTED,
      payload: "status",
      input: loginInput
    };
  }; 
   export const getidptstaffQ15CONFIG = (loginInput: any) => { 
    
    return {
      type: GETID_Q15CONFIG_STARTED,
      payload: "status",
      input: loginInput
    };
  };
  export const getslotptstaffQ15CONFIG = (loginInput: any) => { 
    
    return {
      type: GETSLOT_Q15CONFIG_STARTED,
      payload: "status",
      input: loginInput
    };
  };