export const CREATE_BED_ASSIGNMENT_STARTED ="CREATE_BED_ASSIGNMENT_STARTED";
export const CREATE_BED_ASSIGNMENT_COMPLETED ="CREATE_BED_ASSIGNMENT_COMPLETED";
export const CREATE_BED_ASSIGNMENT_FAILED ="CREATE_BED_ASSIGNMENT_FAILED";

export const GETALL_BED_ASSIGNMENT_STARTED ="GETALL_BED_ASSIGNMENT_STARTED";
export const GETALL_BED_ASSIGNMENT_COMPLETED ="GETALL_BED_ASSIGNMENT_COMPLETED";
export const GETALL_BED_ASSIGNMENT_FAILED ="GETALL_BED_ASSIGNMENT_FAILED";

export const GET_BYORGID_BED_ASSIGNMENT_STARTED ="GET_BYORGID_BED_ASSIGNMENT_STARTED";
export const GET_BYORGID_BED_ASSIGNMENT_COMPLETED ="GET_BYORGID_BED_ASSIGNMENT_COMPLETED";
export const GET_BYORGID_BED_ASSIGNMENT_FAILED ="GET_BYORGID_BED_ASSIGNMENT_FAILED";

export interface ILogin {
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
  
  
  export const createBedAssignment = (loginInput: any) => {    
    return {
      type: CREATE_BED_ASSIGNMENT_STARTED,
      payload: "status",
      input: loginInput
    };
  };
  export const getAllBedAssignment = () => {    
    return {
      type: GETALL_BED_ASSIGNMENT_STARTED,
      payload: "status"
    };
  };
  export const getBedAssignmentByOrgId = (loginInput: any) => {    
    return {
      type: GET_BYORGID_BED_ASSIGNMENT_STARTED,
      payload: "status",
      input: loginInput
    };
  };
