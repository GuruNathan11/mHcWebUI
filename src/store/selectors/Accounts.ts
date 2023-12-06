export const getCurrentUser = () => {
  const loggedInString = localStorage.getItem('AUTHDATA');
  if (loggedInString) {
    const loggedInData = JSON.parse(loggedInString);
    return loggedInData;
  }
  else {
    return null;
  }
}

export const getUserQueryString = () => {
  var userData=getCurrentUser()  
  if (userData) {
    var query = "auid=" + userData.userDetail.id;    
    return query;
  }
  else {
    return "";
  }
}

export const getLoginLawfirm = () => {
  const loggedInLawFirm = localStorage.getItem('LOGINLAWFIRMDATA');
  if (loggedInLawFirm) {
    const loggedInLawFirmData = JSON.parse(loggedInLawFirm);
    return loggedInLawFirmData;
  }
  else {
    return null;
  }
}

