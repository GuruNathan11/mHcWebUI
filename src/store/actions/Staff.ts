
export const  GETALL_STAFF_STARTED = "GETALL_STAFF_STARTED";
export const GETALL_STAFF_COMPLETED = "GETALL_STAFF_COMPLETED";
export const GETALL_STAFF_FAILED = "GETALL_STAFF_FAILED";

export const  GETBYID_STAFF_STARTED = "GETBYID_STAFF_STARTED";
export const GETBYID_STAFF_COMPLETED = "GETBYID_STAFF_COMPLETED";
export const GETBYID_STAFF_FAILED = "GETBYID_STAFF_FAILED";

export const  CREATE_STAFF_STARTED = "CREATE_STAFF_STARTED";
export const CREATE_STAFF_COMPLETED = "CREATE_STAFF_COMPLETED";
export const CREATE_STAFF_FAILED = "CREATE_STAFF_FAILED";

export const  INUPDATE_STAFF_STARTED = "INUPDATE_STAFF_STARTED";
export const INUPDATE_STAFF_COMPLETED = "INUPDATE_STAFF_COMPLETED";
export const INUPDATE_STAFF_FAILED = "INUPDATE_STAFF_FAILED";

export const OUTUPDATE_STAFF_STARTED = "OUTUPDATE_STAFF_STARTED";
export const OUTUPDATE_STAFF_COMPLETED = "OUTUPDATE_STAFF_COMPLETED";
export const OUTUPDATE_STAFF_FAILED = "OUTUPDATE_STAFF_FAILED";

export const UPDATE_STAFF_STARTED = "UPDATE_STAFF_STARTED";
export const UPDATE_STAFF_COMPLETED = "UPDATE_STAFF_COMPLETED";
export const UPDATE_STAFF_FAILED = "UPDATE_STAFF_FAILED";

export const  DELETE_STAFF_STARTED = "DELETE_STAFF_STARTED";
export const DELETE_STAFF_COMPLETED = "DELETE_STAFF_COMPLETED";
export const DELETE_STAFF_FAILED = "DELETE_STAFF_FAILED";

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
      securityQuestion: string;
      answer: string;
      roleFkId: {
        roleId: number;
        roleName: string;
        description: string;
        status: number;
        createdAt: Date;
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

  export const getAllStaff = () => { 
    
    return {
      type: GETALL_STAFF_STARTED,
      payload: "status"
    };
  };

  export const getByIdStaff = (loginInput: any) => { 
    
    return {
      type: GETBYID_STAFF_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  
  export const createStaff = (loginInput: any) => { 
    
    return {
      type: CREATE_STAFF_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const inUpdateStaff = (loginInput: any) => { 
    
    return {
      type: INUPDATE_STAFF_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const outUpdateStaff = (loginInput: any) => { 
    
    return {
      type: OUTUPDATE_STAFF_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  
  export const UpdateStaff = (loginInput: any) => { 
  
    return {
      type:UPDATE_STAFF_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const deleteStaffById = (loginInput: any) => { 
    
    return {
      type: DELETE_STAFF_STARTED,
      payload: "status",
      input: loginInput
    };
  };