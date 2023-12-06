export const  CREATE_PATIENT_IMMUNIZATION_STARTED = "CREATE_PATIENT_IMMUNIZATION_STARTED";
export const CREATE_PATIENT_IMMUNIZATION_COMPLETED = "CREATE_PATIENT_IMMUNIZATION_COMPLETED";
export const CREATE_PATIENT_IMMUNIZATION_FAILED = "CREATE_PATIENT_IMMUNIZATION_FAILED";

export const  GETALL_PATIENT_IMMUNIZATION_STARTED = "GETALL_PATIENT_IMMUNIZATION_STARTED";
export const GETALL_PATIENT_IMMUNIZATION_COMPLETED = "GETALL_PATIENT_IMMUNIZATION_COMPLETED";
export const GETALL_PATIENT_IMMUNIZATION_FAILED = "GETALL_PATIENT_IMMUNIZATION_FAILED";

export const  GETBYINPUT_PATIENT_IMMUNIZATION_STARTED = "GETBYINPUT_PATIENT_IMMUNIZATION_STARTED";
export const GETBYINPUT_PATIENT_IMMUNIZATION_COMPLETED = "GETBYINPUT_PATIENT_IMMUNIZATION_COMPLETED";
export const GETBYINPUT_PATIENT_IMMUNIZATION_FAILED = "GETBYINPUT_PATIENT_IMMUNIZATION_FAILED";

export const  GET_PATIENTBYINPUTID_IMMUNIZATION_STARTED = "GET_PATIENTBYINPUTID_IMMUNIZATION_STARTED";
export const GET_PATIENTBYINPUTID_IMMUNIZATION_COMPLETED = "GET_PATIENTBYINPUTID_IMMUNIZATION_COMPLETED";
export const GET_PATIENTBYINPUTID_IMMUNIZATION_FAILED = "GET_PATIENTBYINPUTID_IMMUNIZATION_FAILED";

export const  UPDATE_PATIENT_IMMUNIZATION_STARTED = "UPDATE_PATIENT_IMMUNIZATION_STARTED";
export const UPDATE_PATIENT_IMMUNIZATION_COMPLETED = "UPDATE_PATIENT_IMMUNIZATION_COMPLETED";
export const UPDATE_PATIENT_IMMUNIZATION_FAILED = "UPDATE_PATIENT_IMMUNIZATION_FAILED";

export const  DELETE_PATIENT_IMMUNIZATION_STARTED = "DELETE_PATIENT_IMMUNIZATION_STARTED";
export const DELETE_PATIENT_IMMUNIZATION_COMPLETED = "DELETE_PATIENT_IMMUNIZATION_COMPLETED";
export const DELETE_PATIENT_IMMUNIZATION_FAILED = "DELETE_PATIENT_IMMUNIZATION_FAILED";

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

  export const createPatientImmunization = (loginInput: any) => { 
    
    return {
      type: CREATE_PATIENT_IMMUNIZATION_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const getAllPatientImmunization = () => { 
    return {
      type: GETALL_PATIENT_IMMUNIZATION_STARTED,
      payload: "status"
    };
  }; 

  export const getImmunizationByPatientInput = (loginInput) => { 
    
    return {
      type: GETBYINPUT_PATIENT_IMMUNIZATION_STARTED,
      payload: "Value",
      input: loginInput,
    };
  };
 
  export const getImmunizationByPatientInputId = (loginInput,paramValue) => {
 
    return {
        type: GET_PATIENTBYINPUTID_IMMUNIZATION_STARTED ,
        payload: 'Value' ,
        input:loginInput, 
        inputParam:paramValue
    };
};

  export const updatePatientImmunizationById = (loginInput: any) => { 
    
    return {
      type: UPDATE_PATIENT_IMMUNIZATION_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const deletePatientImmunizationById = (loginInput: any) => { 
    
    return {
      type: DELETE_PATIENT_IMMUNIZATION_STARTED,
      payload: "status",
      input: loginInput
    };
  };