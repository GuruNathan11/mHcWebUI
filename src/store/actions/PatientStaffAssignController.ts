
export const CREATE_PATIENTSTAFF_STARTED = "CREATE_PATIENTSTAFF_STARTED";
export const CREATE_PATIENTSTAFF_COMPLETED = "CREATE_PATIENTSTAFF_COMPLETED";
export const CREATE_PATIENTSTAFF_FAILED = "CREATE_PATIENTSTAFF_FAILED";
export const GET_PATIENTSTAFF_STARTED = "GET_PATIENTSTAFF_STARTED";
export const GET_PATIENTSTAFF_COMPLETED = "GET_PATIENTSTAFF_COMPLETED";
export const GET_PATIENTSTAFF_FAILED = "GET_PATIENTSTAFF_FAILED";
export const GETID_PATIENTSTAFF_STARTED = "GETID_PATIENTSTAFF_STARTED";
export const GETID_PATIENTSTAFF_COMPLETED = "GETID_PATIENTSTAFF_COMPLETED";
export const GETID_PATIENTSTAFF_FAILED = "GETID_PATIENTSTAFF_FAILED";

export const CREATE_STAFFPATIENT_STARTED = "CREATE_STAFFPATIENT_STARTED";
export const CREATE_STAFFPATIENT_COMPLETED = "CREATE_PATIENTSTAFF_COMPLETED";
export const CREATE_STAFFPATIENT_FAILED = "CREATE_STAFFPATIENT_FAILED";

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


  export const assignpatientstaff = (loginInput: any) => { 
    
    return {
      type: CREATE_PATIENTSTAFF_STARTED,
      payload: "status",
      input: loginInput
    };
  };
  export const getallpatientstaff = () => { 
    
    return {
      type: GET_PATIENTSTAFF_STARTED,
      payload: "status"
    };
  };
  export const getIDpatientstaff = (loginInput: any) => { 
    
    return {
      type: GETID_PATIENTSTAFF_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const assignstaffPatient = (loginInput: any) => { 
    
    return {
      type: CREATE_STAFFPATIENT_STARTED,
      payload: "status",
      input: loginInput
    };
  };