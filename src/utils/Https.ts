import axios, { AxiosInstance } from "axios";
import * as Constants from "../../src/containers/pages/Constants/ConstantValues";
let API_URL = "";
const iPAddress = Constants.IpAddress;
if (process.env.REACT_APP_API_URL) {
  
  API_URL = process.env.REACT_APP_API_URL;
}


export class Https {
  public static axios(): AxiosInstance {
    return axios.create({
   
    baseURL: iPAddress+':8083'
    });
  }
}



export const apiURL = iPAddress+':8083/';
