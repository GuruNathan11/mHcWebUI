import React, { useEffect, useState, Dispatch } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { HttpLogin } from "../../../utils/Http";
import dotImage from './../../../assets/images/mettler_images/dots-vertical.svg';
import AvatarDoctorImage from './../../../assets/images/mettler_images/AvatarDoctor.png';
import AvatarBigImage from './../../../assets/images/mettler_images/AvatarBigImage.png';
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
interface IQ15ReportsViews { }
interface IQ15ReportsViews {
    StaticPage: any;
    getAllPatientData: any;
    dispatch: Dispatch<any>;
    getallptvisitData: any;
    match: any;
    state: {
        nodes: [],
        checked: [],
        expanded: []
    }
}





const Q15ReportsViews: React.FC<IQ15ReportsViews> = ({
    dispatch, getAllPatientData, getallptvisitData, match


}) => {
    let [getPatientDataItems, setGetPatientDataItems] = useState(new Array<any>());
    let [tableData, setTableData] = useState(new Array<any>());
    let [tableNewData, setTableNewData] = useState(new Array<any>());
    const [selectedValues, setSelectedValues] = useState([]);
    const [selectedRow, setSelectedRow] = useState(0);
    let [inputPatientInfo, setInputPatientInfo] = useState(null);
    let [patientAge, setPatientAge] = useState(null);
    let [patientDateOfBirth, setPatientDateOfBirth] = useState(null);
    let [patientGender, setPatientGender] = useState(null);
     let [patientSSN, setPatientSSN] = useState(null);
  let [patientImage, setPatientImage] = useState("");
    let [decryptPatientId, setDecryptPatientId] = useState("");

    useEffect(() => {
        var encryptInitial = match.params.id;
        var CryptoJS = require("crypto-js");
        let decodePatientid = decodeURIComponent(encryptInitial);
        let decodeFinalPatientid = CryptoJS.AES.decrypt(decodePatientid.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);

        setDecryptPatientId(decodeFinalPatientid);
        if (decodeFinalPatientid != "") {
            HttpLogin.axios().get("api/ptVisit/get/pid/" + decodeFinalPatientid)
                .then((resp) => {
                    console.log(JSON.stringify(resp.data));
                    if (resp.data.message.code === "MHC - 0200") {
                        setTableNewData(resp.data.data);


                        HttpLogin.axios().get("api/patient/getPatient/" + decodeFinalPatientid)
                            .then((res) => {
                                console.log(JSON.stringify(res.data));
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
                    } else {
                        alert(resp.data.message.description);
                    }
                })
        } else {
            HttpLogin.axios().get('api/ptVisit/get_all')
                .then((response) => {
                    if (response.data.message.code === "MHC - 0200") {
                        setTableNewData(response.data.data);
                    } else {
                        alert(response.data.message.description);
                    }
                })
        }

    }, []);



    const onSelectionChangedData = (rowData) => {
        const value = rowData.value;
        setSelectedValues(value);
        setSelectedRow(rowData.value.length);
    }
    const onRowSelectData = (event) => {
        var CryptoJS = require("crypto-js");
        var encryptPatientId = CryptoJS.AES.encrypt(event.data.patientid, 'secret key 123');
        var setEncryptPatientId = encodeURIComponent(encryptPatientId.toString());
        var encryptVisitId = CryptoJS.AES.encrypt(event.data.id, 'secret key 123');
        var setEncryptVisitId = encodeURIComponent(encryptVisitId.toString());
        console.log(JSON.stringify(event.data));
        window.location.href = "/MettlerVisitPatientdata/" + setEncryptPatientId + "/" + setEncryptVisitId;
    }

    const handleFixedChange = () => {

    }
    let [getValidCount, setVaildCount] = useState(1);
    const handleOrder = (event) => {
        setVaildCount(getValidCount + 1);
        if (getValidCount % 2 === 0) {
            // console.log(JSON.stringify(tableData.sort((a, b) => a.patientId > b.patientId ? 1:-1)));
        } else {
            //  console.log(JSON.stringify(tableData.sort((a, b) => a.patientId < b.patientId ? 1:-1)));
        }
    }

    const q15doteimg = (rowData) => {
        return <a style={{ cursor: 'pointer' }} >{rowData.id != "" ? <><img style={{ width: '20px', height: '20px', opacity: 0.8, position: "relative", left: "64px" }} src={dotImage}></img>
        </> : <span><img style={{ width: '20px', height: '20px', opacity: 0.8, position: "relative", left: "40px" }} src={dotImage}></img></span>}</a>;
    }

    const dataVisitStartDate = (rowData: any) => {
        return rowData.visit[0].visitStartDate != "string" ? <span> {moment(rowData.visit[0].visitStartDate, "YYYYMMDDHHmmss947").format('MMM DD,HH:mm A')}</span> : <span>{rowData.visit[0].visitStartDate}</span>
    }

    const dataAdmitDate = (rowData: any) => {
        return rowData.visit[0].admit[0].admitDate != "string" && rowData.visit[0].admit[0].admitDate != null ? <span> {moment(rowData.visit[0].admit[0].admitDate, "YYYYMMDDHHmmss947").format('MMM DD,HH:mm A')}</span> : <span>{rowData.visit[0].admit[0].admitDate}</span>
    }

    const dataDischDate = (rowData: any) => {
        return rowData.visit[0].admit[0].dischDate != "string" && rowData.visit[0].admit[0].dischDate != null ? <span> {moment(rowData.visit[0].admit[0].dischDate, "YYYYMMDDHHmmss947").format('MMM DD,HH:mm A')}</span> : <span>{rowData.visit[0].admit[0].dischDate}</span>
    }

    const dataResourceType = (rowData: any) => {
        return rowData.resource[0].resourceType != "" ? <span>{rowData.resource[0].resourceType}</span> : <span></span>
    }

    const dataAdmitPhys = (rowData: any) => {
        return rowData.visit[0].admit[0].admittech[0].admitPhys1Index != "" ? <span>{rowData.visit[0].admit[0].admittech[0].admitPhys1Index}</span> : <span></span>
    }

    const dataAdmitcode = (rowData: any) => {
        return rowData.code != "" ? <span>{rowData.code}</span> : <span></span>
    }


    const handleAddVisit = () => {
        var CryptoJS = require("crypto-js");
        var encryptPatientId = CryptoJS.AES.encrypt(decryptPatientId, 'secret key 123');
        var setEncryptPatientId = encodeURIComponent(encryptPatientId.toString());
        window.location.href = "/MettlerAdmitPatientupdated/" + setEncryptPatientId;
    }
    const captionStyle = {

    }

    return (
        <div style={{ backgroundColor: "#ffffff", border: "1px solid #E9E9E9", height: '1254px', width: 'calc(100% - 287px)', position: 'absolute', left: "141px", top: "54px" }} >
            <div style={{ top: "6px", background: "#FFF", height: '0px', display: 'flex', width: 'calc(100% - 0px)', position: 'absolute', left: "19px" }} >

                <div id="mettlerEmptyPadding" className="p-col-12 p-md-1">

                    <img style={{width:'60px',height:'60px',position:'relative',left:'21px',top:'23px',borderRadius:patientImage !== ""?"30px":""}} src={patientImage !== ""?patientImage:AvatarBigImage}></img>
                </div>
                <div id="mettlerEmptyPadding" style={{ display: 'flex', flexDirection: 'column' }} className="p-col-12 p-md-6">
                    <div style={{ display: 'flex', flexDirection: 'row', position: "absolute", top: "-4px", left: "87px" }}>
                        <div style={{ position: 'relative', top: '19px', minWidth: 'max-content', fontSize: '18px', color: "#000000" }} className="App-TopBar-PatientName">Koray Okumus</div>


                        <div style={{ width: '110px', height: '24px', position: 'relative', top: '22px', left: '23px', display: "flex", padding: "3px,14px", alignItems: "flexStart", gap: "4px" }}>
                            <div style={{ fontWeight: 400, fontSize: '12px', opacity: 0.6, color: '#000000' }} >DOB:</div>
                            <div style={{ fontWeight: 400, fontSize: '12px', color: '#000000', whiteSpace: "nowrap" }} >May 24, 1989{patientSSN}</div>
                        </div>
                        <div style={{ width: '110px', height: '24px', position: 'relative', left: '62px', top: '22px', display: "flex", padding: "3px,14px", alignItems: "flexStart", gap: "4px" }}>
                            <div style={{ fontWeight: 400, fontSize: '12px', opacity: 0.6, color: '#000000' }} className="admit-patient-profileName">Gender:</div>
                            <div style={{ fontWeight: 400, fontSize: '12px', color: '#000000' }} className="admit-patient-profileName">Male</div>
                        </div>
                    </div>

                </div>
                <div id="mettlerEmptyPadding" style={{ display: 'flex', flexDirection: 'column' }} className="p-col-12 p-md-6">
                    <div style={{ display: 'flex', flexDirection: 'row', position: "absolute", top: "44px", left: "62px" }}>
                        <div style={{ position: 'relative', top: '19px', minWidth: 'max-content', fontSize: '18px' }} className="App-TopBar-PatientName">{inputPatientInfo}</div>


                        <div className="admit-patient-ss" style={{ width: '105px', height: '24px', background: '#E2E7F4', border: '1px solid #E2E7F4', position: 'relative', top: '19px', left: '23px' }}>
                            <div style={{ fontWeight: 400, fontSize: '12px', opacity: 0.6, color: '#000000' }} className="admit-patient-profileName">SS#:</div>
                            <div style={{ fontWeight: 400, fontSize: '12px', color: '#000000' }} className="admit-patient-profileName">SS-{patientSSN}</div>
                        </div>
                        <div className="admit-patient-ss" style={{ width: '110px', height: '24px', position: 'relative', left: '40px', top: '19px', background: '#E2E7F4', border: '1px solid #E2E7F4' }}>
                            <div style={{ fontWeight: 400, fontSize: '12px', opacity: 0.6, color: '#000000' }} className="admit-patient-profileName">MR:</div>
                            <div style={{ fontWeight: 400, fontSize: '12px', color: '#000000' }} className="admit-patient-profileName">MR-345</div>
                        </div>
                    </div>

                </div>
                <div id="mettlerEmptyPadding" className="p-col-12 p-md-5">  </div>
               
                {/* ,position:"relative",left:"100px" */}
            </div>
            <div style={{ position: "absolute", left: "24px", top: "164px", width: "calc(100% - 51px)", height: "330px", border: "1px solid #C9C9C9", justifyContent: "space-between", display: "flex" }}>

                <div style={{ display: "flex", gap: "56px", width: "calc(100% - 441px)", height: "330px", justifyContent: "space-between" }}>
                    <div style={{ position: "relative", color: " #3F3F46", fontFamily: "Poppins", fontSize: "14px", fontStyle: "normal", fontWeight: 500, lineHeight: "normal", gap: "20px", display: "flex", flexDirection: "column", left: "17px", top: "-24px" }}>
                    <div style={{position: "relative", top: "-17px", whiteSpace: "nowrap", color: "#000000", fontFamily: "poppins", fontSize: "14px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>Location Code</div>

                        <div style={{ display: "flex", gap: "26px" }}>
                            <div>L1</div>
                            <div style={{ whiteSpace: "nowrap" }}>Bedroom</div>
                        </div>
                        <div style={{ display: "flex", gap: "26px" }}>
                            <div>L1</div>
                            <div style={{ whiteSpace: "nowrap" }}>Bedroom</div>
                        </div>
                        <div style={{ display: "flex", gap: "26px" }}>
                            <div>L1</div>
                            <div style={{ whiteSpace: "nowrap" }}>Bedroom</div>
                        </div>
                        <div style={{ display: "flex", gap: "26px" }}>
                            <div>L1</div>
                            <div style={{ whiteSpace: "nowrap" }}>Bedroom</div>
                        </div>
                        <div style={{ display: "flex", gap: "26px" }}>
                            <div>L1</div>
                            <div style={{ whiteSpace: "nowrap" }}>Bedroom</div>
                        </div>
                        <div style={{ display: "flex", gap: "26px" }}>
                            <div>L1</div>
                            <div style={{ whiteSpace: "nowrap" }}>Bedroom</div>
                        </div>
                        <div style={{ display: "flex", gap: "26px" }}>
                            <div>L1</div>
                            <div style={{ whiteSpace: "nowrap" }}>Bedroom</div>
                        </div>
                        <div style={{ display: "flex", gap: "26px" }}>
                            <div>L1</div>
                            <div style={{ whiteSpace: "nowrap" }}>Bedroom</div>
                        </div>
                    </div>
                    <div style={{
                        position: "relative", color: " #3F3F46", fontFamily: "Poppins", fontSize: "14px", fontStyle: "normal", fontWeight: 500, lineHeight: "normal", gap: "20px", display: "flex", flexDirection: "column", left: "17px", top: "17px",
                    }}>

                        <div style={{ display: "flex", gap: "26px" }}>
                            <div>L1</div>
                            <div style={{ whiteSpace: "nowrap" }}>Bedroom</div>
                        </div>
                        <div style={{ display: "flex", gap: "26px" }}>
                            <div>L1</div>
                            <div style={{ whiteSpace: "nowrap" }}>Bedroom</div>
                        </div>
                        <div style={{ display: "flex", gap: "26px" }}>
                            <div>L1</div>
                            <div style={{ whiteSpace: "nowrap" }}>Bedroom</div>
                        </div>
                        <div style={{ display: "flex", gap: "26px" }}>
                            <div>L1</div>
                            <div style={{ whiteSpace: "nowrap" }}>Bedroom</div>
                        </div>
                        <div style={{ display: "flex", gap: "26px" }}>
                            <div>L1</div>
                            <div style={{ whiteSpace: "nowrap" }}>Bedroom</div>
                        </div>
                        <div style={{ display: "flex", gap: "26px" }}>
                            <div>L1</div>
                            <div style={{ whiteSpace: "nowrap" }}>Bedroom</div>
                        </div>
                        <div style={{ display: "flex", gap: "26px" }}>
                            <div>L1</div>
                            <div style={{ whiteSpace: "nowrap" }}>Bedroom</div>
                        </div>
                        <div style={{ display: "flex", gap: "26px" }}>
                            <div>L1</div>
                            <div style={{ whiteSpace: "nowrap" }}>Bedroom</div>
                        </div>
                    </div>
                    <div style={{ backgroundColor: "#000000", border: "0.5px solid #E9E9E9", height: "328px", position: "relative", left: "43px" }}></div>
                    <div style={{
                        position: "relative", color: " #3F3F46", fontFamily: "Poppins", fontSize: "14px", fontStyle: "normal", fontWeight: 500, lineHeight: "normal", gap: "20px", display: "flex", flexDirection: "column", left: "17px", top: "-27px",
                    }}>
                        <div style={{ position: "relative", top: "-18px", whiteSpace: "nowrap", color: "#000000", fontFamily: "poppins", fontSize: "14px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>Precaution (circle)</div>

                        <div style={{ display: "flex", gap: "26px" }}>
                            <div>Suicide</div>
                            <div style={{ whiteSpace: "nowrap" }}>1.1 Observation</div>
                        </div>
                        <div style={{ display: "flex", gap: "26px" }}>
                            <div>Suicide</div>
                            <div style={{ whiteSpace: "nowrap" }}>1.1 Observation</div>
                        </div>
                        <div style={{ display: "flex", gap: "26px" }}>
                            <div>Suicide</div>
                            <div style={{ whiteSpace: "nowrap" }}>1.1 Observation</div>
                        </div>
                        <div style={{ display: "flex", gap: "26px" }}>
                            <div>Suicide</div>
                            <div style={{ whiteSpace: "nowrap" }}>1.1 Observation</div>
                        </div>
                        <div style={{ display: "flex", gap: "26px" }}>
                            <div>Suicide</div>
                            <div style={{ whiteSpace: "nowrap" }}>1.1 Observation</div>
                        </div>
                        <div style={{ display: "flex", gap: "26px" }}>
                            <div>Suicide</div>
                            <div style={{ whiteSpace: "nowrap" }}>1.1 Observation</div>
                        </div>
                        <div style={{ display: "flex", gap: "26px" }}>
                            <div>Suicide</div>
                            <div style={{ whiteSpace: "nowrap" }}>1.1 Observation</div>
                        </div>
                        <div style={{ display: "flex", gap: "26px" }}>
                            <div>Suicide</div>
                            <div style={{ whiteSpace: "nowrap" }}>1.1 Observation</div>
                        </div>
                    </div>
                    <div style={{ backgroundColor: "#000000", border: "0.5px solid #E9E9E9", height: "328px", position: "relative", left: "4px" }}></div>
                    <div style={{
                        position: "relative", color: " #3F3F46", fontFamily: "Poppins", fontSize: "14px", fontStyle: "normal", fontWeight: 500, lineHeight: "normal", gap: "20px", display: "flex", flexDirection: "column", left: "-28px", top: "-23px",
                    }}>
                        <div style={{ position: "relative", top: "-23px", whiteSpace: "nowrap", color: "#000000", fontFamily: "poppins", fontSize: "14px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>Restrictions(circle)</div>
                        <div>Phone</div>
                        <div>Visitor</div>

                    </div>

                </div>
    
                
            </div>

            <div style={{position:"absolute",left:"29px",top:"619px",color:"#000000",textAlign:"center",fontFamily:"poppins",fontSize:"14px",fontStyle:"normal",fontWeight:600,lineHeight:"normal"}}>Staff Initials every 15 minutes</div>
            <div style={{ height:"1px",boxSizing:"border-box",left:"27px",borderTop:"2px solid #dfe2e4 ",position:"absolute",width:"calc(100% - 53px)",top:"682px",right:"210px" }} />
            <div style={{ position: 'absolute', top: '684px', left: '24px', width: 'calc(100% - 51px)' }}>
                <DataTable style={{ border: '0px' }}

                    selectionMode="multiple"
                    rows={50} scrollable={true}
                    responsive={true} selection={selectedValues} onSelectionChange={onSelectionChangedData}
                    emptyMessage="No records found">

                    <Column field="id" header="S.No." headerStyle={{ width: '10%', textAlign: 'start', background: '#ffffff', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '20%', background: '#FFF' }} />
                    <Column field="" header="Location Code" headerStyle={{ whiteSpace:"nowrap",width: '18%', background: '#ffffff', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '23%', background: '#FFF' }} body={dataVisitStartDate} />
                    <Column field="" header="Intial" headerStyle={{ width: '8%', background: '#ffffff', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '15%', background: '#FFF' }} body={dataResourceType} />
                    <Column field="" header="S.No." headerStyle={{ width: '16%', background: '#ffffff', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '29%', background: '#FFF' }} body={dataAdmitDate} />
                    <Column field="" header="Location Code" headerStyle={{ width: '17%', whiteSpace: "nowrap", background: '#ffffff', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '27%', background: '#FFF' }} body={dataDischDate} />
                    <Column field="" header="Intial" headerStyle={{ width: '15%', background: '#ffffff', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '31%', background: '#FFF' }} body={dataAdmitPhys} />
                    <Column field="" header="S.No." headerStyle={{ width: '13%', background: '#ffffff', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '13%', background: '#FFF' }} body={dataAdmitcode} />
                    <Column field="" header="Location Code" headerStyle={{whiteSpace:"nowrap", width: '15%', background: '#ffffff', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '7%', background: '#FFF' }} body={q15doteimg} />
                    <Column field="" header="Intial" headerStyle={{ width: '15%', background: '#ffffff', color: '#9DA1C3', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }} style={{ borderLeft: '0px', borderRight: '0px', width: '7%', background: '#FFF' }} body={q15doteimg} />

                </DataTable>
            </div>
        </div>
    );


};
const mapStateToProps = (state: any) => {
    const { deviceFormData, getAllPatientData, getallptvisitData } = state;
    return {
        deviceFormData, getAllPatientData, getallptvisitData
    };
};
export default connect(mapStateToProps)(Q15ReportsViews)