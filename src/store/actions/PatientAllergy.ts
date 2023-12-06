export const  CREATE_PATIENT_ALLERGY_STARTED = "CREATE_PATIENT_ALLERGY_STARTED";
export const CREATE_PATIENT_ALLERGY_COMPLETED = "CREATE_PATIENT_ALLERGY_COMPLETED";
export const CREATE_PATIENT_ALLERGY_FAILED = "CREATE_PATIENT_ALLERGY_FAILED";

export const  GETALL_PATIENT_ALLERGY_STARTED = "GETALL_PATIENT_ALLERGY_STARTED";
export const GETALL_PATIENT_ALLERGY_COMPLETED = "GETALL_PATIENT_ALLERGY_COMPLETED";
export const GETALL_PATIENT_ALLERGY_FAILED = "GETALL_PATIENT_ALLERGY_FAILED";

export const  GETBYINPUT_PATIENT_ALLERGY_STARTED = "GETBYINPUT_PATIENT_ALLERGY_STARTED";
export const GETBYINPUT_PATIENT_ALLERGY_COMPLETED = "GETBYINPUT_PATIENT_ALLERGY_COMPLETED";
export const GETBYINPUT_PATIENT_ALLERGY_FAILED = "GETBYINPUT_PATIENT_ALLERGY_FAILED";

export const  GET_PATIENTBYINPUTID_ALLERGY_STARTED = "GET_PATIENTBYINPUTID_ALLERGY_STARTED";
export const GET_PATIENTBYINPUTID_ALLERGY_COMPLETED = "GET_PATIENTBYINPUTID_ALLERGY_COMPLETED";
export const GET_PATIENTBYINPUTID_ALLERGY_FAILED = "GET_PATIENTBYINPUTID_ALLERGY_FAILED";

export const  UPDATE_PATIENT_ALLERGY_STARTED = "UPDATE_PATIENT_ALLERGY_STARTED";
export const UPDATE_PATIENT_ALLERGY_COMPLETED = "UPDATE_PATIENT_ALLERGY_COMPLETED";
export const UPDATE_PATIENT_ALLERGY_FAILED = "UPDATE_PATIENT_ALLERGY_FAILED";

export const  DELETE_PATIENT_ALLERGY_STARTED = "DELETE_PATIENT_ALLERGY_STARTED";
export const DELETE_PATIENT_ALLERGY_COMPLETED = "DELETE_PATIENT_ALLERGY_COMPLETED";
export const DELETE_PATIENT_ALLERGY_FAILED = "DELETE_PATIENT_ALLERGY_FAILED";

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

  export const createPatientAllergy = (loginInput: any) => { 
    
    return {
      type: CREATE_PATIENT_ALLERGY_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const getAllPatientAllergy = () => { 
    return {
      type: GETALL_PATIENT_ALLERGY_STARTED,
      payload: "status"
    };
  }; 

  export const getAllergyByPatientInput = (loginInput) => { 
    
    return {
      type: GETBYINPUT_PATIENT_ALLERGY_STARTED,
      payload: "Value",
      input: loginInput,
    };
  };
 
  export const getAllergyByPatientInputId = (loginInput,paramValue) => {
 
    return {
        type: GET_PATIENTBYINPUTID_ALLERGY_STARTED ,
        payload: 'Value' ,
        input:loginInput, 
        inputParam:paramValue
    };
};

  export const updatePatientAllergyById = (loginInput: any) => { 
    
    return {
      type: UPDATE_PATIENT_ALLERGY_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const deletePatientAllergyById = (loginInput: any) => { 
    
    return {
      type: DELETE_PATIENT_ALLERGY_STARTED,
      payload: "status",
      input: loginInput
    };
  };