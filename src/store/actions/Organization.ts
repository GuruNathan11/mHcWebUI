export const GETALL_ORGANIZATION_STARTED = "GETALL_ORGANIZATION_STARTED";
export const GETALL_ORGANIZATION_COMPLETED = "GETALL_ORGANIZATION_COMPLETED";
export const GETALL_ORGANIZATION_FAILED = "GETALL_ORGANIZATION_FAILED";

export const UPDATE_ORGANIZATION_STARTED = "UPDATE_ORGANIZATION_STARTED";
export const UPDATE_ORGANIZATION_COMPLETED = "UPDATE_ORGANIZATION_COMPLETED";
export const UPDATE_ORGANIZATION_FAILED = "UPDATE_ORGANIZATION_FAILED";

export const  CREATE_ORGANIZATION_STARTED = "CREATE_ORGANIZATION_STARTED";
export const CREATE_ORGANIZATION_COMPLETED = "CREATE_ORGANIZATION_COMPLETED";
export const CREATE_ORGANIZATION_FAILED = "CREATE_ORGANIZATION_FAILED";

export const  GETBYID_ORGANIZATION_STARTED = "GETBYID_ORGANIZATION_STARTED";
export const GETBYID_ORGANIZATION_COMPLETED = "GETBYID_ORGANIZATION_COMPLETED";
export const GETBYID_ORGANIZATION_FAILED = "GETBYID_ORGANIZATION_FAILED";

export interface IOrganization {
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

  export const getAllOrganization = () => { 
 
    return {
      type: GETALL_ORGANIZATION_STARTED,
      payload: "status" 
    };
  };

  export const updateOrganization = (loginInput: any) => { 
    
    return {
      type: UPDATE_ORGANIZATION_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const createOrganization = (loginInput: any) => { 
    
    return {
      type: CREATE_ORGANIZATION_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const getByIdOrganization = (loginInput: any) => { 
    
    return {
      type: GETBYID_ORGANIZATION_STARTED,
      payload: "status",
      input: loginInput
    };
  };