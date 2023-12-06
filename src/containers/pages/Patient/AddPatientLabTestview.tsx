
import { useState, Dispatch, useEffect } from "react";
import "./../Bed/BedMasterConfiguration.css";
import React from "react";
import { connect } from "react-redux";
import bottomImage from './../../../assets/images/mettler_images/bg.svg';
import SecondaryButton from "../../../components/SecondaryButton";
import PrimaryButton from "../../../components/PrimaryButton";
import "../../../components/BottomFooter.css";
import { HttpLogin } from "../../../utils/Http";
import { getLabOrderByPatientInputId } from "../../../store/actions/PatientLabOrder";
import moment from "moment";
import PatientLabOrderData from "./../../../assets/data/PatientLabOrderData.json";
import { getAllStaff } from "../../../store/actions/Staff";
interface IAddPatientLabTestview { }
interface IAddPatientLabTestview {
    StaticPage: any;
    dispatch: Dispatch<any>;
    match: any;
    getLabOrderByPatientInputIdData: any;
    getAllStaffData: any;
    errorMessage: any;
    state: {
        nodes: [],
        checked: [],
        expanded: []
    }
}
const AddPatientLabTestview: React.FC<IAddPatientLabTestview> = ({
    dispatch, getLabOrderByPatientInputIdData, getAllStaffData, match


}) => {



    let [inputFormData, setInputFormData] = useState(PatientLabOrderData);
    let [encryptPatientId, setEncryptPatientId] = useState(null);
    let [decryptPatientId, setDecryptPatientId] = useState(null);
    let [encryptVisitId, setEncryptVisitId] = useState(null);
    let [decryptVisitId, setDecryptVisitId] = useState(null);
    let [encryptId, setEncryptId] = useState(null);
    let [decryptId, setDecryptId] = useState(null);
    
    let [getStaffDataItems, setGetStaffDataItems] = useState(new Array<any>());
    let [inputOrgData, setInputOrgData] = useState("");
    let [inputLoginId, setInputLoginId] = useState("");
     let [patientSSN, setPatientSSN] = useState(null);
  let [patientImage, setPatientImage] = useState("");
    let [patientGender, setPatientGender] = useState(null);
    let [patientDateOfBirth, setPatientDateOfBirth] = useState(null);
    let [inputPatientInfo, setInputPatientInfo] = useState(null);
    let [patientAge, setPatientAge] = useState(null);
    useEffect(() => {
        var encryptInitial = match.params.patientid;
        setEncryptPatientId(encryptInitial);
        var CryptoJS = require("crypto-js");
        let decodePatientid = decodeURIComponent(encryptInitial);
        let decodeFinalPatientid = CryptoJS.AES.decrypt(decodePatientid.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
        setDecryptPatientId(decodeFinalPatientid);
        var encryptVisitInitial = match.params.visitId;
        setEncryptVisitId(encryptVisitInitial);
        let decodeVisitid = decodeURIComponent(encryptVisitInitial);
        let decodeFinalVisitid = CryptoJS.AES.decrypt(decodeVisitid.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
        setDecryptVisitId(decodeFinalVisitid);

        var encryptIdInitial = match.params.id;
        setEncryptId(encryptIdInitial);
        let decodeId = decodeURIComponent(encryptIdInitial);
        let decodeFinalId = CryptoJS.AES.decrypt(decodeId.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
        setDecryptId(decodeFinalId);
        //  console.log(JSON.stringify(decodeFinalId));

        var orgData = JSON.parse(window.localStorage.getItem("LOGINDATA"));
        setInputLoginId(orgData.loginInput.username);
        orgData = orgData.loginInput.organization;

        HttpLogin.axios().get("api/org/getById/" + orgData)
            .then((res) => {
                if (res.data.message.code === "MHC - 0200") {

                    setInputOrgData(res.data.data.organizationdetails[0].name);
                } else {
                    setInputOrgData("");
                }
            })
        //  console.log(JSON.stringify(decodeFinalId))     

        HttpLogin.axios().get("api/patient/getPatient/" + decodeFinalPatientid)
            .then((res) => {
                //  console.log(JSON.stringify(res.data.data))     
                setInputPatientInfo(res.data.data.basicDetails[0].name[0].given+" "+res.data.data.basicDetails[0].name[0].family);
                if (res.data.message.code === "MHC - 0200") {
                    setInputPatientInfo(res.data.data.basicDetails[0].name[0].given+" "+res.data.data.basicDetails[0].name[0].family);
          setPatientImage(res.data.data.basicDetails[0].profile !== ""? res.data.data.basicDetails[0].profile:"");
                    setPatientDateOfBirth(moment(res.data.data.basicDetails[0].birthDate).format('MMM DD,YYYY'));
                    var genderChanges = res.data.data.basicDetails[0].gender === "M" ? "Male" : res.data.data.basicDetails[0].gender === "fm" ? "Female" : "Not Specify";
                    setPatientGender(genderChanges);
                    var ssnValue = res.data.data.basicDetails[0].ssn != undefined ? res.data.data.basicDetails[0].ssn.slice(6, 9) : ""
                    setPatientSSN(ssnValue);
                    var today = new Date();
                    var birthDate = new Date(res.data.data.basicDetails[0].birthDate);
                    // create a date object directly from `dob1` argument
                    var age_now = today.getFullYear() - birthDate.getFullYear();
                    var m = today.getMonth() - birthDate.getMonth();
                    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                        age_now--;
                    }
                    setPatientAge(age_now);
                } else {
                    alert(res.data.message.description);
                }
            })
        if (decodeFinalId !== "") {
            dispatch(getLabOrderByPatientInputId(decodeFinalPatientid, decodeFinalId));
        }
        dispatch(getAllStaff());
    }, []);
    const [isPatientPageLoaded, setPatientPageLoaded] = useState(false);

    if (!isPatientPageLoaded && !getLabOrderByPatientInputIdData.isLoading) {
        //  console.log(JSON.stringify(getLabOrderByPatientInputIdData.items.data))      
        if (getLabOrderByPatientInputIdData.items.message.code === "MHC - 0200") {
            getLabOrderByPatientInputIdData.items.data.collectionDateTime = new Date(moment(getLabOrderByPatientInputIdData.items.data.collectionDateTime, "YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z"));
            setInputFormData(getLabOrderByPatientInputIdData.items.data);
        } else {
            setInputFormData({ ...PatientLabOrderData });
            alert(getLabOrderByPatientInputIdData.items.message.description);
        }
        setPatientPageLoaded(true);
    }
    if (!getLabOrderByPatientInputIdData && getLabOrderByPatientInputIdData.isFormSubmit) {

        setTimeout(() => {
            setPatientPageLoaded(false);

        }, (1000));
    }

    const [isPageLoaded, setPageLoaded] = useState(false);

    if (!isPageLoaded && !getAllStaffData.isLoading) {

        if (getAllStaffData.items.message.code === "MHC - 0200") {
            setGetStaffDataItems(getAllStaffData.items.data.filter(t => t.organization === inputOrgData));
        } else {
            setGetStaffDataItems([]);
            alert(getAllStaffData.items.message.description);
        }
        setPageLoaded(true)
    }
    if (!getAllStaffData && getAllStaffData.isFormSubmit) {

        setTimeout(() => {
            setPageLoaded(false);

        }, (1000));
    }

    return (
        <>
            <div className="bed-details" style={{ height: "1189px" }}>
                <div className="bed-details-child" />
                <div className="bed-details-child1" style={{ height: "1106px" }} />
                <div className="bedline-div" />
                <div style={{ position: "absolute", width: "calc(100% - 1px)", top: "16px", right: "925px", left: "34px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: "var(--gap-3xs)", fontSize: "var(--font-size-base)", color: "var(--color-black)" }}>
                    <img
                        className="bedexpand-more-24px-icon"
                        alt=""
                        src="/expand-more-24px.svg"
                    />
                    <div className="beddetails"> <i style={{ position: "relative", top: "21px", left: "-7px", color: "#133C93" }} className="large material-icons">arrow_back</i>11-deoxycortiysol</div>

                    <div style={{ color: "#9DA1C3", left: "21px", position: "relative", font: "poppins", fontWeight: "lighter", fontSize: "13px", lineHeight: "19.5px" }}>Routine</div>
                    <div>
                        <div style={{ display: "flex", position: "absolute", left: "831px", top: "20px", gap: "9px", backgroundColor: "#F8F9FB", height: "32px", width: "89.93px", borderRadius: "4px" }}>
                            <div><i style={{ position: "relative", top: "5px", left: "7px" }} className="large material-icons">print</i></div>
                            <div style={{ position: "absolute", top: "6px", left: "39px", fontSize: "14px" }}>Print</div>
                        </div>
                        <div style={{ display: "flex", gap: "9px", top: "20px", position: "absolute", left: "934px", width: "125px", height: "32px", backgroundColor: "#F8F9FB", borderRadius: "4px" }}>
                            <div>
                                <i style={{ position: "absolute", top: "5px", left: "5px" }} className="large material-icons">file_download</i>
                            </div>
                            <div style={{ position: "absolute", top: "6px", left: "39px", fontSize: "14px" }}>Download</div>
                        </div>
                    </div>


                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "156px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3", fontWeight: "lighter", fontSize: "14px" }}>Lab Test </div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.labTestName !== null && inputFormData.labTestName !== undefined ? inputFormData.labTestName : "--"}</div>
                    </div>
                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3", fontWeight: "lighter", fontSize: "14px" }}>Collection Type</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.collectionType !== null && inputFormData.collectionType !== undefined ? inputFormData.collectionType : "--"}</div>
                    </div>


                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "256px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Collection Date/Time</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.collectionDateTime !== null && inputFormData.collectionDateTime !== "" && inputFormData.collectionDateTime !== undefined ? moment(inputFormData.collectionDateTime, "YYYYMMDDhhmmss").format("MMM DD, YYYY") : null}</div>
                    </div>
                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Collection Sample</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.collectionSample !== null && inputFormData.collectionSample !== undefined ? inputFormData.collectionSample : "--"}</div>
                    </div>


                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "356px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Specimen</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.specimen !== null && inputFormData.specimen !== undefined ? inputFormData.specimen : "--"}</div>
                    </div>
                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Urgency</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.urgency !== null && inputFormData.urgency !== undefined ? inputFormData.urgency : "--"}</div>
                    </div>


                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "456px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>How Often</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.howoften !== null && inputFormData.howoften !== undefined ? inputFormData.howoften : "--"}</div>
                    </div>

                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>How Long</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.howlong !== null && inputFormData.howlong !== undefined ? inputFormData.howlong : "--"}</div>
                    </div>

                </div>


                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "556px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#000000", fontWeight: "bold", fontSize: "16px" }}>Comments [2] </div>
                        <div style={{ position: "absolute", top: "61px", color: "#000000", fontWeight: "bold", fontSize: "16px" }}>{selectedPatientName !== null && selectedPatientName !== undefined && selectedPatientName !== "" ? selectedPatientName : "--"}<span style={{ color: "#9DA1C3", position: "relative", left: "20px" }}>{inputFormData.enteredDate !== null && inputFormData.enteredDate !== "" && inputFormData.enteredDate !== undefined ? moment(inputFormData.enteredDate, "YYYYMMDDhhmmss").format("MMM DD, hh:mm A") : null}</span></div>
                        <div style={{ position: "absolute", top: "88px", color: "#3F3F46" }}>The objective of genuine health care reform must be premium</div>
                    </div>
                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "656px" }}>

                    <div className="name-input13">

                        <div style={{ position: "absolute", top: "61px", color: "#000000", fontWeight: "bold", fontSize: "16px" }}>{selectedPatientName !== null && selectedPatientName !== undefined && selectedPatientName !== "" ? selectedPatientName : "--"}<span style={{ color: "#9DA1C3", position: "relative", left: "20px" }}>{inputFormData.enteredDate !== null && inputFormData.enteredDate !== "" && inputFormData.enteredDate !== undefined ? moment(inputFormData.enteredDate, "YYYYMMDDhhmmss").format("MMM DD, hh:mm A") : null}</span></div>
                        <div style={{ position: "absolute", top: "88px", color: "#3F3F46" }}>The objective of genuine health care reform must be premium</div>
                    </div>
                </div>
               
            </div>
            <div className="component-5011">
                <div className="cancel-group">
                    <SecondaryButton
                        label="Cancel"
                        secondaryButtonCursor="pointer"
                        onCancelContainerClick={null}
                    />
                    <div className="previous1">
                        <img className="bg-icon3" alt="" src={bottomImage} />
                        <div className="label5">Previous</div>
                    </div>
                    <PrimaryButton

                        label="Ok"
                        primaryButtonCursor="pointer"

                    />
                </div>
            </div>
        </>
    );

};
const mapStateToProps = (state: any) => {
    const { deviceFormData, getLabOrderByPatientInputIdData, getAllStaffData } = state;
    return {
        deviceFormData, getLabOrderByPatientInputIdData, getAllStaffData
    };
};

export default connect(mapStateToProps)(AddPatientLabTestview)




