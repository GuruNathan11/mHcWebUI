export const  CREATE_ORDERPROCEDURE_PROBLEMS_STARTED = "CREATE_ORDERPROCEDURE_PROBLEMS_STARTED";
export const CREATE_ORDERPROCEDURE_PROBLEMS_COMPLETED = "CREATE_ORDERPROCEDURE_PROBLEMS_COMPLETED";
export const CREATE_ORDERPROCEDURE_PROBLEMS_FAILED = "CREATE_ORDERPROCEDURE_PROBLEMS_FAILED";

export const  GETALL_ORDERPROCEDURE_PROBLEMS_STARTED = "GETALL_ORDERPROCEDURE_PROBLEMS_STARTED";
export const GETALL_ORDERPROCEDURE_PROBLEMS_COMPLETED = "GETALL_ORDERPROCEDURE_PROBLEMS_COMPLETED";
export const GETALL_ORDERPROCEDURE_PROBLEMS_FAILED = "GETALL_ORDERPROCEDURE_PROBLEMS_FAILED";

export const  GETBYINPUT_ORDERPROCEDURE_PROBLEMS_STARTED = "GETBYINPUT_ORDERPROCEDURE_PROBLEMS_STARTED";
export const GETBYINPUT_ORDERPROCEDURE_PROBLEMS_COMPLETED = "GETBYINPUT_ORDERPROCEDURE_PROBLEMS_COMPLETED";
export const GETBYINPUT_ORDERPROCEDURE_PROBLEMS_FAILED = "GETBYINPUT_ORDERPROCEDURE_PROBLEMS_FAILED";

export const  UPDATE_ORDERPROCEDURE_PROBLEMS_STARTED = "UPDATE_ORDERPROCEDURE_PROBLEMS_STARTED";
export const UPDATE_ORDERPROCEDURE_PROBLEMS_COMPLETED = "UPDATE_ORDERPROCEDURE_PROBLEMS_COMPLETED";
export const UPDATE_ORDERPROCEDURE_PROBLEMS_FAILED = "UPDATE_ORDERPROCEDURE_PROBLEMS_FAILED";

export const  DELETE_ORDERPROCEDURE_PROBLEMS_STARTED = "DELETE_ORDERPROCEDURE_PROBLEMS_STARTED";
export const DELETE_ORDERPROCEDURE_PROBLEMS_COMPLETED = "DELETE_ORDERPROCEDURE_PROBLEMS_COMPLETED";
export const DELETE_ORDERPROCEDURE_PROBLEMS_FAILED = "DELETE_ORDERPROCEDURE_PROBLEMS_FAILED";

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

  export const createOrderProcedureControl = (loginInput: any) => { 
    
    return {
      type: CREATE_ORDERPROCEDURE_PROBLEMS_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const getAllOrderProcedureControl = () => { 
    return {
      type: GETALL_ORDERPROCEDURE_PROBLEMS_STARTED,
      payload: "status"
    };
  }; 

  export const getOrderProcedureByControlInput = (loginInput: any) => { 
    
    return {
      type: GETBYINPUT_ORDERPROCEDURE_PROBLEMS_STARTED,
      payload: "status",
      input: loginInput
    };
  };
 
  export const updateOrderProcedureControlById = (loginInput: any) => { 
    
    return {
      type: UPDATE_ORDERPROCEDURE_PROBLEMS_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const deleteOrderProcedureControlById = (loginInput: any) => { 
    
    return {
      type: DELETE_ORDERPROCEDURE_PROBLEMS_STARTED,
      payload: "status",
      input: loginInput
    };
  };