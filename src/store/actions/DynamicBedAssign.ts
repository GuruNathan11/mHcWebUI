export const CREATE_PATIENT_BED_ASSIGNMENT_STARTED ="CREATE_PATIENT_BED_ASSIGNMENT_STARTED";
export const CREATE_PATIENT_BED_ASSIGNMENT_COMPLETED ="CREATE_PATIENT_BED_ASSIGNMENT_COMPLETED";
export const CREATE_PATIENT_BED_ASSIGNMENT_FAILED ="CREATE_PATIENT_BED_ASSIGNMENT_FAILED";

export const GET_PATIENT_BED_ASSIGNMENT_STARTED ="GET_PATIENT_BED_ASSIGNMENT_STARTED";
export const GET_PATIENT_BED_ASSIGNMENT_COMPLETED ="GET_PATIENT_BED_ASSIGNMENT_COMPLETED";
export const GET_PATIENT_BED_ASSIGNMENT_FAILED ="GET_PATIENT_BED_ASSIGNMENT_FAILED";

export const DELETE_PATIENT_BED_ASSIGNMENT_STARTED ="DELETE_PATIENT_BED_ASSIGNMENT_STARTED";
export const DELETE_PATIENT_BED_ASSIGNMENT_COMPLETED ="DELETE_PATIENT_BED_ASSIGNMENT_COMPLETED";
export const DELETE_PATIENT_BED_ASSIGNMENT_FAILED ="DELETE_PATIENT_BED_ASSIGNMENT_FAILED";


export interface IDynamicBedAssign {
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


  export const createNewBedAssign = (loginInput: any) => { 
    
    return {
      type: CREATE_PATIENT_BED_ASSIGNMENT_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const getNewBedAssign = () => { 
    return {
      type: GET_PATIENT_BED_ASSIGNMENT_STARTED,
      payload: "status"
    };
  };

  export const deleteBedAssign = (loginInput: any) => { 
    
    return {
      type: DELETE_PATIENT_BED_ASSIGNMENT_STARTED,
      payload: "status",
      input: loginInput
    };
  };