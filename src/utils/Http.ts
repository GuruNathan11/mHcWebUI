import axios, { AxiosInstance } from "axios";
import * as Constants from "../../src/containers/pages/Constants/ConstantValues";
let API_URL = "";
const iPAddress = Constants.IpAddress;
if (process.env.REACT_APP_API_URL) {
  
  API_URL = process.env.REACT_APP_API_URL;
}

 
export class HttpLogin {
  public static axios(): AxiosInstance {
    return axios.create({
    baseURL: iPAddress
    });
  }
}



export const apiURL = iPAddress+'/api2/api/';
export const caseURL = iPAddress+'/api3/';
export const caseInitiationURL = iPAddress+'/api4/';
export const caseUploadURL = iPAddress+'/api7/';
export const downloadURL = iPAddress+'/api2/visacare/';
export const formTypeURL = iPAddress+'/api8/';