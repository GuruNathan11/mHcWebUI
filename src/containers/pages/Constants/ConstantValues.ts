import { getCurrentUser } from "../../../store/selectors/Accounts";
export const IpAddress = "http://66.169.158.106:7000/"
export const USDATEFORMAT = "MM-dd-yyyy"
export const USCALDATEFORMAT = "mm/dd/yy"
export const SUPERADMINROLEID = 18616
export const EMPLOYERADMINROLEID = 3
export const EMPLOYEEROLEID = 5
export const LAWFIRMADMINROLEID = 8
export const ATTORNEYROLEID = 9 
export const ATTORNEYASSISTANTUSERROLEID = 13
export const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export const EMPLOYEEROLENAME = "EMPLOYEE"
export const employeeRoleName = "Employee"
export const employerAdminRoleName = "EmployerAdmin"
export const employerAssistantRoleName = "EmployerAssistant"
export const PROVIDERADMINROLENAME = "ProviderAdmin"
export const VISACAREADMINROLENAME = "VisaCareAdmin" 
export const ATTORNEYROLENAME = "Attorney"
export const ATTORNEYASSISTANTUSERROLENAME = "Attorney Assistant"
export const LAWFIRMADMIN = "LawFirmAdmin"
export const PROVIDERSUPPORTROLENAME = "ProviderSupport"
export const UICHECKROLENAME = "UICHECK"

export const curentUser = getCurrentUser();
export const specialCharactor = /[$!&=-]/;
export const numbersOnly = /^[0-9\b]+$/;
export const usPhoneNumberFormat = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
export const emailIdFormat = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/i;
export const PLANNAMEDYI = "DIY"
export const PLANNAMELEGAL = "LEGAL"
export const matchUPS1 = /\b(1Z ?[0-9A-Z]{3} ?[0-9A-Z]{3} ?[0-9A-Z]{2} ?[0-9A-Z]{4} ?[0-9A-Z]{3} ?[0-9A-Z]|[\dT]\d\d\d ?\d\d\d\d ?\d\d\d)\b/;
export const matchUPS2 = /^[kKJj]{1}[0-9]{10}$/;

export const matchUSPS0 = /(\b\d{30}\b)|(\b91\d+\b)|(\b\d{20}\b)/;
export const matchUSPS1 = /(\b\d{30}\b)|(\b91\d+\b)|(\b\d{20}\b)|(\b\d{26}\b)| ^E\D{1}\d{9}\D{2}$|^9\d{15,21}$| ^91[0-9]+$| ^[A-Za-z]{2}[0-9]+US$/i;
export const matchUSPS2 = /^E\D{1}\d{9}\D{2}$|^9\d{15,21}$/;
export const matchUSPS3 = /^91[0-9]+$/;
export const matchUSPS4 = /^[A-Za-z]{2}[0-9]+US$/;
export const matchUSPS5 = /(\b\d{30}\b)|(\b91\d+\b)|(\b\d{20}\b)|(\b\d{26}\b)| ^E\D{1}\d{9}\D{2}$|^9\d{15,21}$| ^91[0-9]+$| ^[A-Za-z]{2}[0-9]+US$/i;

export const matchFedex1 = /(\b96\d{20}\b)|(\b\d{15}\b)|(\b\d{12}\b)/;
export const matchFedex2 = /\b((98\d\d\d\d\d?\d\d\d\d|98\d\d) ?\d\d\d\d ?\d\d\d\d( ?\d\d\d)?)\b/;
export const matchFedex3 = /^[0-9]{15}$/;


export const caseNameJson = [
  { id: 22, casename: "H1B Petition", urlName: "visaCareH1BCaseDetails" },
  { id: 23, casename: "H4 Application", urlName: "visaCareH4CaseDetails" },
 // { id: 24, casename: "I140 Form", urlName: "visaCareI140CaseDetails" },
 // { id: 25, casename: "Labour Certification", urlName: "visaCareFLCCaseDetails" },
  { id: 26, casename: "EAD Application", urlName: "visaCareI765CaseDetails" }//,
 // { id: 27, casename: "TN Petition", urlName: "visaCareTNPetitionDetails" },
//  { id: 28, casename: "E3 Australian", urlName: "visaCareE3AustralianDetails" },
 // { id: 29, casename: "H1B1 Chile, Singapore", urlName: "visaCareH1B1CaseDetails" }



 
]
export const workFlowJson = [
  { id: 1, workFlowName: "Initiated" },
  { id: 2, workFlowName: "InProgress" },
  { id: 3, workFlowName: "LCA Certified" },
  { id: 4, workFlowName: "Submitted" },
  { id: 5, workFlowName: "COMPLETED" },
  { id: 6, workFlowName: "Completed" },
]
export const addressType = [
  { id: 1, addressType: "PAD", addressTypeName: "" },
  { id: 2, addressType: "BAD", addressTypeName: "" },
  { id: 3, addressType: "BFA", addressTypeName: "" },
  { id: 4, addressType: "EEA", addressTypeName: "" },
  { id: 5, addressType: "PPA", addressTypeName: "" },
  { id: 6, addressType: "H1B1A", addressTypeName: "" }
]

export const formatFirstName = (value: any) => {
  const arr = value.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

  }
  const firstName = arr.join(" ");
  return firstName;
}
 
export const formatSSNumber = (value: any) => {
  if (!value) return value;
  const ssNumber = value.replace(/[^\d]/g, "");
  const ssNumberLength = ssNumber.length;
  if (ssNumberLength < 4) return ssNumber;
 if (ssNumberLength < 6) {
     return `${ssNumber.slice(0, 3)}-${ssNumber.slice(3)}`;
   }
  return `${ssNumber.slice(0, 3)}-${ssNumber.slice(3, 5)}-${ssNumber.slice(5, 9)}`;
}

export const formatI94Number = (value: any) => {
  if (!value) return value;
 var newvalue= value.split(' ').join('');
  return newvalue.split('').join(' ');
}
export const formatPhoneNumber = (value: any) => {
  // if input value is falsy eg if the user deletes the input, then just return
  if (!value) return value;

  // clean the input for any non-digit values.
  const phoneNumber = value.replace(/[^\d]/g, "");

  // phoneNumberLength is used to know when to apply our formatting for the phone number
  const phoneNumberLength = phoneNumber.length;

  // we need to return the value with no formatting if its less then four digits
  // this is to avoid weird behavior that occurs if you  format the area code to early
  if (phoneNumberLength < 4) return phoneNumber;

  // if phoneNumberLength is greater than 4 and less the 7 we start to return
  // the formatted number
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }

  // finally, if the phoneNumberLength is greater then seven, we add the last
  // bit of formatting and return it.
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
}

export const numbersOnlyFormat = (value: any) => {
  // if input value is falsy eg if the user deletes the input, then just return
  if (!value) return value;

  // clean the input for any non-digit values.
  const phoneNumber = value.replace(/[^\d]/g, "");

  // phoneNumberLength is used to know when to apply our formatting for the phone number
  const phoneNumberLength = phoneNumber.length;

  // we need to return the value with no formatting if its less then four digits
  // this is to avoid weird behavior that occurs if you  format the area code to early
  if (phoneNumberLength < 4) return phoneNumber;

 
}
export const arrayOneToThirty = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 },
{ id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 },
{ id: 21 }, { id: 22 }, { id: 23 }, { id: 24 }, { id: 25 }, { id: 26 }, { id: 27 }, { id: 28 }, { id: 29 }, { id: 30 }
]
export const serviceCenter = [
  { name: "-Select-", address: "" },
  { name: "Vermont Service Center (Non Premium)", address: "USCIS Vermont Service Center Attn: I-129 H-1B, 38 River Road Essex Junction, VT 05452" },
  { name: "Vermont Service Center (Premium - CAP and Non CAP)", address: "USCIS Vermont Service Center Attn: I-129 H-1B,30 River Road Essex Junction, VT 05452-3808" },
  { name: "Vermont Service Center (MASTER CAP SUBJECT)", address: "USCIS Vermont Service Center Attn: I-129 H-1B Master’s Cap, 38 River Road Suite 1000 Essex Junction, VT 05452" },
  { name: "Vermont Service Center (REGULAR CAP SUBJECT)", address: "USCIS Vermont Service Center Attn: I-129 H-1B Regular Cap, 38 River Road Suite 1000Essex Junction, VT 05452" },
  { name: "Nebraska Service Center (Non Premium)", address: "USCIS Nebraska Service Center  850 S Street Lincoln, NE 68508" },
  { name: "Nebraska Service Center (Premium)", address: "USCIS Nebraska Service Center 850 S Street Lincoln, NE 68508" },
  { name: "Nebraska Service Center (CAP SUBJECT)", address: "USCIS Nebraska Service Center 850 ‘S’ Street Room 129CAP Lincoln, NE 6850" },
  { name: "Texas Service Center (Non Premium)", address: "USCIS Texas Service Center Attn: I-129 H1B 6046 N Belt Line Rd. Irving, Texas 75038-0001" },
  { name: "Texas Service Center (Premium)", address: "USCIS Texas Service Center Attn: I-129 H1B Premium Processing 6046 N Belt Line Rd. STE 907 Irving, TX 75038-0022" },
  { name: "Texas Service Center (CAP SUBJECT)", address: "USCIS TSC Attn: H-1B CAP Filings 6046 N Belt Line Rd. STE 107 Irving, TX 75038-0001" },
  { name: "Texas Service Center (PREMIUM CAP SUBJECT)", address: "USCIS TSC Attn: I-129 CAP Premium Processing 6046 N Belt Line Rd. STE 907 Irving, TX 75038-0022" },
  { name: "California Service Center (Non Premium)", address: "USCIS California Service Center Attn: I-129 H-1B Extensions 24000 Avila Road 2nd Floor, Room 2312 Laguna Niguel, CA 92677" },
  { name: "California Service Center (Premium)", address: "Premium Processing Service USCIS California Service Center Attn: I-129 H-1B Extensions 24000 Avila Road 2nd Floor, Room 2312 Laguna Niguel, CA 92677" },
  { name: "California Service Center (REGULAR-CAP SUBJECT)", address: "USCIS California Service Center Attn: I-129 H-1B Regular Cap 24000 Avila Road 1st Floor, Room 1600 Laguna Niguel, CA 92677" },
  { name: "California Service Center (MASTER-CAP SUBJECT)", address: "USCIS California Service CenterAttn: I-129 H-1B Master’s Cap 24000 Avila Road 1st Floor, Room 1600 Laguna Niguel, CA 92677" }
]



export const formatCardNumber = (value: any) => {
  // if input value is falsy eg if the user deletes the input, then just return
  if (!value) return value;

  // clean the input for any non-digit values.
  const phoneNumber = value.replace(/[^\d]/g, "");

  // phoneNumberLength is used to know when to apply our formatting for the phone number
  const phoneNumberLength = phoneNumber.length;

  // we need to return the value with no formatting if its less then four digits
  // this is to avoid weird behavior that occurs if you  format the area code to early
  if (phoneNumberLength < 5) return phoneNumber;

  // if phoneNumberLength is greater than 4 and less the 7 we start to return
  // the formatted number
  if (phoneNumberLength < 9) {
    return `${phoneNumber.slice(0, 4)} ${phoneNumber.slice(4)}`;
  }

  if (phoneNumberLength < 13) {
    return `${phoneNumber.slice(0, 4)} ${phoneNumber.slice(4, 8)} ${phoneNumber.slice(4)}`;
  }

  // finally, if the phoneNumberLength is greater then seven, we add the last
  // bit of formatting and return it.
  return `${phoneNumber.slice(0, 4)} ${phoneNumber.slice(4, 8)} ${phoneNumber.slice(8, 12)}  ${phoneNumber.slice(12, 16)}`;
}

export const formatExpireMonth = (value: any) => {
  // if input value is falsy eg if the user deletes the input, then just return
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, "");

  // phoneNumberLength is used to know when to apply our formatting for the phone number
  const phoneNumberLength = phoneNumber.length;

  // we need to return the value with no formatting if its less then four digits
  // this is to avoid weird behavior that occurs if you  format the area code to early
  if (phoneNumberLength < 3) return phoneNumber;

}
export const formatExpireYear = (value: any) => {
  // if input value is falsy eg if the user deletes the input, then just return
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, "");

  // phoneNumberLength is used to know when to apply our formatting for the phone number
  const phoneNumberLength = phoneNumber.length;

  // we need to return the value with no formatting if its less then four digits
  // this is to avoid weird behavior that occurs if you  format the area code to early
  if (phoneNumberLength < 3) return phoneNumber;

}
export const formatCVC = (value: any) => {
  // if input value is falsy eg if the user deletes the input, then just return
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, "");

  // phoneNumberLength is used to know when to apply our formatting for the phone number
  const phoneNumberLength = phoneNumber.length;

  // we need to return the value with no formatting if its less then four digits
  // this is to avoid weird behavior that occurs if you  format the area code to early
  if (phoneNumberLength < 4) return phoneNumber;

}
export const formatNumberOnly = (value: any) => {
  if (!value) return value;
  const pincode = value.replace(/[^\d]/g, ""); 
  return pincode;

}
