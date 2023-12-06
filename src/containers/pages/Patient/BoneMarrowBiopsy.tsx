
import { useState, Dispatch, useEffect } from "react";
import "./../Bed/BedMasterConfiguration.css";
import React from "react";
import { connect } from "react-redux";
import bottomImage from './../../../assets/images/mettler_images/bg.svg';
import SecondaryButton from "../../../components/SecondaryButton";
import PrimaryButton from "../../../components/PrimaryButton";
import "../../../components/BottomFooter.css";
import { HttpLogin } from "../../../utils/Http";
import { getAllStaff } from "../../../store/actions/Staff";
import PatientOrderProcedureData from "./../../../assets/data/PatientOrderProcedureData.json";
import { getOrderProcedureByControlInput } from "../../../store/actions/OrderProcedureControl";
import moment from "moment";
interface IBoneMarrowBiopsy { }
interface IBoneMarrowBiopsy {
    StaticPage: any;
    dispatch: Dispatch<any>;
    getOrderProcedureByProblemsInputData: any;
    match: any;
    state: {
        nodes: [],
        checked: [],
        expanded: []
    }
}
const BoneMarrowBiopsy: React.FC<IBoneMarrowBiopsy> = ({
    dispatch, getOrderProcedureByProblemsInputData, match


}) => {


    let [inputFormData, setInputFormData] = useState(PatientOrderProcedureData);
    let [encryptPatientId, setEncryptPatientId] = useState(null);
    let [decryptPatientId, setDecryptPatientId] = useState(null);
    let [encryptVisitId, setEncryptVisitId] = useState(null);
    let [decryptVisitId, setDecryptVisitId] = useState(null);
    let [encryptId, setEncryptId] = useState(null);
    let [decryptId, setDecryptId] = useState(null);
    
    let [getStaffDataItems, setGetStaffDataItems] = useState(new Array<any>());
    let [inputOrgData, setInputOrgData] = useState("");
     let [patientSSN, setPatientSSN] = useState(null);
  let [patientImage, setPatientImage] = useState("");
    let [patientGender, setPatientGender] = useState(null);
    let [patientDateOfBirth, setPatientDateOfBirth] = useState(null);
    let [inputPatientInfo, setInputPatientInfo] = useState(null);
    let [patientAge, setPatientAge] = useState(null);
    let [AllergyData, setAllergyData] = useState(null);
    let [NatureOfReactionData, setNatureOfReactionData] = useState(null);
    let [SymptomsData, setSymptomsData] = useState(null);
    let [severitys, setseverity] = useState(null);
    let [inputOrgId, setInputOrgId] = useState("");
    let [loginEnteredBy, setLoginEnteredBy] = useState("");
    let [Urgency, setUrgency] = useState(null);

    useEffect(() => {
        var encryptInitial = match.params.patientid;
        setEncryptPatientId(encryptInitial);
        var CryptoJS = require("crypto-js");
        let decodePatientid = decodeURIComponent(encryptInitial);
        console.log(JSON.stringify(CryptoJS.AES.decrypt(decodePatientid.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8)));
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

        var orgData = JSON.parse(window.localStorage.getItem("LOGINDATA"));
        console.log(JSON.stringify(orgData));
        inputFormData.enteredBy = orgData.items.data.userDetail.name[0].given + " " + orgData.items.data.userDetail.name[0].family;
        setInputFormData({ ...inputFormData });
        setLoginEnteredBy(orgData.items.data.userDetail.name[0].given + " " + orgData.items.data.userDetail.name[0].family);
        orgData = orgData.loginInput.organization;
        HttpLogin.axios().get("api/org/getById/" + orgData)
            .then((res) => {
                if (res.data.message.code === "MHC - 0200") {

                    setInputOrgId(res.data.data.id);
                    setInputOrgData(res.data.data.organizationdetails[0].name);
                } else {
                    setInputOrgData("");
                }
            })

        HttpLogin.axios().get("api/patient/getPatient/" + decodeFinalPatientid)
            .then((res) => {
                setInputPatientInfo(res.data.data.basicDetails[0].name[0].given+" "+res.data.data.basicDetails[0].name[0].family);

                

            })
        if (decodeFinalId !== "") {
            dispatch(getOrderProcedureByControlInput(decodeFinalId));
        }
        dispatch(getAllStaff());

    }, []);
    const [isPageLoaded, setPageLoaded] = useState(false);

    if (!isPageLoaded && !getOrderProcedureByProblemsInputData.isLoading) {
        console.log(JSON.stringify(getOrderProcedureByProblemsInputData.items));
        if (getOrderProcedureByProblemsInputData.items !== undefined) {
            if (getOrderProcedureByProblemsInputData.items.message.code === "MHC - 0200") {
                getOrderProcedureByProblemsInputData.items.data.appropriateDate = new Date(moment(getOrderProcedureByProblemsInputData.items.data.appropriateDate, "YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z"));
                getOrderProcedureByProblemsInputData.items.data.enteredBy = loginEnteredBy;
                console.log(JSON.stringify(getOrderProcedureByProblemsInputData.items.data));
                setInputFormData(getOrderProcedureByProblemsInputData.items.data);
            } else {
                setInputFormData({ ...inputFormData });
                alert(getOrderProcedureByProblemsInputData.items.message.description);
            }
        } else {
            setInputFormData({ ...PatientOrderProcedureData })
        }

        setPageLoaded(true);
    }
    if (!getOrderProcedureByProblemsInputData && getOrderProcedureByProblemsInputData.isFormSubmit) {

        setTimeout(() => {
            setPageLoaded(false);

        }, (1000));
    }

    const handleBackclick = () => {
        window.location.href = "/MettlerVisitPatientdata/"+encryptPatientId+"/"+encryptVisitId;
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
                    <div className="beddetails"> <i onClick={handleBackclick} style={{ position: "relative", top: "21px", left: "-7px", color: "#133C93",cursor:"pointer" }} className="large material-icons">arrow_back</i>Bone Marrow Biopsy</div>

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
                        <div style={{ color: "#9DA1C3", fontWeight: "lighter", fontSize: "14px" }}>Procedure </div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.procedure !== null && inputFormData.procedure !== "" ? inputFormData.procedure : null}</div>
                    </div>
                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3", fontWeight: "lighter", fontSize: "14px" }}>Urgency</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.urgency !== null && inputFormData.urgency !== "" ? inputFormData.urgency : null}</div>
                    </div>


                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "256px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Attention</div>
                        <div style={{ color: "#3F3F46" }}>--</div>
                    </div>
                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Earliest appropriate date</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.appropriateDate !== null && inputFormData.appropriateDate !== "" && inputFormData.appropriateDate !== undefined ? moment(inputFormData.appropriateDate, "YYYYMMDDhhmmss").format("MMM DD, YYYY") : null}</div>
                    </div>


                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "356px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Patient will be seen as</div>
                        <div style={{ color: "#3F3F46" }}>Observed</div>
                    </div>
                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Place of Consultation</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.consultation !== null && inputFormData.consultation !== "" ? inputFormData.consultation : null}</div>
                    </div>


                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "456px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Provisional Diagnosis</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.provisionalDiagnosis !== null && inputFormData.provisionalDiagnosis !== "" ? inputFormData.provisionalDiagnosis : null}</div>
                    </div>



                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "556px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Ordered by</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.orderedBy !== null && inputFormData.orderedBy !== "" ? inputFormData.orderedBy : null}</div>
                    </div>
                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Entered by</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.enteredBy !== null && inputFormData.enteredBy !== "" ? inputFormData.enteredBy : null}</div>
                    </div>


                </div>

                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "656px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#000000", fontWeight: "bold", fontSize: "16px" }}>Comments [2] </div>
                        <div style={{ position: "absolute", top: "61px", color: "#000000", fontWeight: "bold", fontSize: "16px" }}>{inputPatientInfo !== null && inputPatientInfo !== undefined && inputPatientInfo !== "" ? inputPatientInfo : "--"}<span style={{ color: "#9DA1C3", position: "relative", left: "20px" }}>{inputFormData.appropriateDate !== null && inputFormData.appropriateDate !== "" && inputFormData.appropriateDate !== undefined ? moment(inputFormData.appropriateDate, "YYYYMMDDhhmmss").format("MMM-DD, YYYY") : null} at {inputFormData.appropriateDate !== null && inputFormData.appropriateDate !== "" && inputFormData.appropriateDate !== undefined ? moment(inputFormData.appropriateDate, "YYYYMMDDhhmmss").format("hh:mm") : null}</span></div>
                        <div style={{ position: "absolute", top: "88px", color: "#3F3F46" }}>{inputFormData.comments !== null && inputFormData.comments !== "" ? inputFormData.comments : null}</div>
                    </div>
                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "756px" }}>

                    <div className="name-input13">

                        <div style={{ position: "absolute", top: "61px", color: "#000000", fontWeight: "bold", fontSize: "16px" }}>{inputPatientInfo !== null && inputPatientInfo !== undefined && inputPatientInfo !== "" ? inputPatientInfo : "--"}<span style={{ color: "#9DA1C3", position: "relative", left: "20px" }}>{inputFormData.appropriateDate !== null && inputFormData.appropriateDate !== "" && inputFormData.appropriateDate !== undefined ? moment(inputFormData.appropriateDate, "YYYYMMDDhhmmss").format("MMM-DD, YYYY") : null} at {inputFormData.appropriateDate !== null && inputFormData.appropriateDate !== "" && inputFormData.appropriateDate !== undefined ? moment(inputFormData.appropriateDate, "YYYYMMDDhhmmss").format("hh:mm") : null}</span></div>
                        <div style={{ position: "absolute", top: "88px", color: "#3F3F46" }}>{inputFormData.comments !== null && inputFormData.comments !== "" ? inputFormData.comments : null}</div>
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

                            label="Save"
                            primaryButtonCursor="pointer"

                        />
                    </div>
                </div>


            </div>
        </>
    );


};
const mapStateToProps = (state: any) => {
    const { deviceFormData, getOrderProcedureByProblemsInputData } = state;
    return {
        deviceFormData, getOrderProcedureByProblemsInputData
    };
};

export default connect(mapStateToProps)(BoneMarrowBiopsy);




