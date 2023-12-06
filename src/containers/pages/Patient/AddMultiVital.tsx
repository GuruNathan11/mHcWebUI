import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Checkbox, DialogTitle } from "@mui/material";
import bottomImage from './../../../assets/images/mettler_images/bg.svg';
import SecondaryButton from "../../../components/SecondaryButton";
import PrimaryButton from "../../../components/PrimaryButton";
import PatentVitalsData from "./../../../assets/data/PatentVitalsData.json";
import { useState, useCallback, Dispatch, useEffect } from "react";
import { connect } from "react-redux";
import Dialog, { DialogProps } from '@mui/material/Dialog';
import {
    FormControl,
    InputLabel,
    MenuItem,
    FormHelperText,
    Select,
} from "@mui/material";
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { HttpLogin } from '../../../utils/Http';
import { createPatientVitals, updatePatientVitalsById } from '../../../store/actions/PatientVitals';
import moment from "moment";
import AvatarBigImage from './../../../assets/images/mettler_images/AvatarBigImage.png';
import bloodBag from './../../../assets/images/mettler_images/blood_bag.svg';
import bloodDrop from './../../../assets/images/mettler_images/blood_drop.svg';
import bloodDropNew from './../../../assets/images/mettler_images/blood_dropNew.svg';
import bloodDropNewOne from './../../../assets/images/mettler_images/blood_dropNewOne.svg';
import AvatarDoctorImage from './../../../assets/images/mettler_images/AvatarDoctor.png';
import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
} from '@mui/x-data-grid-generator';
import loaddingFile from '../../../../src/assets/images/tenor.gif';
interface IAddMultiVital { }
interface IAddMultiVital {
    StaticPage: any;
    dispatch: Dispatch<any>;
    createOrganizationData: any;
    updatePatientVitalsData: any;
    createPatientVitalsData: any;
    match: any;
    state: {
        nodes: [],
        checked: [],
        expanded: []
    }
}
const AddMultiVital: React.FC<IAddMultiVital> = ({
    dispatch, createOrganizationData, match, updatePatientVitalsData, createPatientVitalsData


}) => {

    const roles = ['Market', 'Finance', 'Development'];
    const randomRole = () => {
        return randomArrayItem(roles);
    };

    const initialRows: GridRowsProp = [
        {
            id: randomId(),
            name: "Temperature",
            value: "",
            Units: '',
            role: '',
            Unitsmesurement: 'F'
        },
        {
            id: randomId(),
            name: "Pulse Rate",
            value: "",
            Units: '',
            role: '',
            Unitsmesurement: 'BPM'
        },
        {
            id: randomId(),
            name: "Heart Rate",
            value: "",
            Units: '',
            role: '',
            Unitsmesurement: 'BPM'
        },
        {
            id: randomId(),
            name: "Respiration",
            value: "",
            Units: "",
            role: '',
            Unitsmesurement: 'BPM'
        },
        {
            id: randomId(),
            name: "Blood Pressure",
            systolicValue: "",
            diastolicValue: "",
            Units: '',
            role: '',
            Unitsmesurement: 'mmHg'
        },
        {
            id: randomId(),
            name: "Pain",
            value: "",
            Units: '',
            role: '',
            Unitsmesurement: 'dol'
        },
        {
            id: randomId(),
            name: "Pulse Oximetry",
            value: "",
            Units: '',
            role: '',
            Unitsmesurement: 'nm'
        },
        {
            id: randomId(),
            name: "Blood Oxygen",
            value: "",
            Units: '',
            role: '',
            Unitsmesurement: 'SpO2'
        },
        {
            id: randomId(),
            name: "Height",
            value: "",
            Units: '',
            role: '',
            Unitsmesurement: 'in'
        },
        {
            id: randomId(),
            name: "Weight",
            value: "",
            Units: '',
            role: '',
            Unitsmesurement: 'lb'
        },
        {
            id: randomId(),
            name: "Blood Glucose",
            value: "",
            Units: '',
            role: '',
            Unitsmesurement: 'mgdL'
        },
        {
            id: randomId(),
            name: "Circumference/Girth",
            value: "",
            Units: '',
            role: '',
            Unitsmesurement: 'in'
        },
    ];

    interface EditToolbarProps {
        setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
        setRowModesModel: (
            newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
        ) => void;
    }

    function EditToolbar(props: EditToolbarProps) {
        const { setRows, setRowModesModel } = props;

        const handleClick = () => {
            const id = randomId();
            setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
            }));
        };

        return (
            <GridToolbarContainer>
                <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                    Add record
                </Button>
            </GridToolbarContainer>
        );
    }

    let [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    let [inputFormData, setInputFormData] = useState(PatentVitalsData);
    const [dialogQualifier, setDialogQualifier] = useState(false);
    let [inputQualifier, setInputQualifier] = useState(null);
    let [encryptPatientId, setEncryptPatientId] = useState(null);
    let [decryptPatientId, setDecryptPatientId] = useState(null);
    let [encryptVisitId, setEncryptVisitId] = useState(null);
    let [decryptVisitId, setDecryptVisitId] = useState(null);
    let [getStaffDataItems, setGetStaffDataItems] = useState(new Array<any>());
    let [inputOrgData, setInputOrgData] = useState("");
    let [patientSSN, setPatientSSN] = useState(null);
    let [patientImage, setPatientImage] = useState("");
    let [patientGender, setPatientGender] = useState(null);
    let [patientDateOfBirth, setPatientDateOfBirth] = useState(null);
    let [inputPatientInfo, setInputPatientInfo] = useState(null);
    let [patientAge, setPatientAge] = useState(null);
    let [cuffSizeData, setCuffSizeData] = useState(null);
    let [positionData, setPositionData] = useState(null);
    let [locationData, setLocationData] = useState(null);
    let [methodData, setMethodData] = useState(null);
    let [qualityData, setQualityData] = useState(null);
    let [siteData, setSiteData] = useState(null);
    let [encryptId, setEncryptId] = useState(null);
    let [decryptId, setDecryptId] = useState(null);
    const [spinner, setSpinner] = useState(false);
    let [newEnteredDate, setNewEnteredDate] = useState(null);
    useEffect(() => {
        setSpinner(true);
        var encryptInitial = match.params.patientid;
        setEncryptPatientId(encryptInitial);
        var CryptoJS = require("crypto-js");
        let decodePatientid = decodeURIComponent(encryptInitial);
        let decodeFinalPatientid = CryptoJS.AES.decrypt(decodePatientid.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
        setDecryptPatientId(decodeFinalPatientid);
        //  console.log(JSON.stringify(decodeFinalPatientid));          
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
        orgData = orgData.loginInput.organization;
        HttpLogin.axios().get("api/org/getById/" + orgData)
            .then((res) => {
                if (res.data.message.code === "MHC - 0200") {
                    setInputOrgData(res.data.data.organizationdetails[0].name);
                } else {
                    setInputOrgData("");
                }
            })
        HttpLogin.axios().get("api/dropdowns/get-all")
            .then((response) => {
                let cuffsizeValue = response.data.data.filter(k => k.dropdown === "cuffsize").map((i) => { return i.list })
                setCuffSizeData(cuffsizeValue[0]);
                let positionValue = response.data.data.filter(k => k.dropdown === "patientPosition").map((i) => { return i.list })
                setPositionData(positionValue[0]);
                let locationValue = response.data.data.filter(k => k.dropdown === "location").map((i) => { return i.list })
                setLocationData(locationValue[0]);
                let methodValue = response.data.data.filter(k => k.dropdown === "method").map((i) => { return i.list })
                setMethodData(methodValue[0]);
                let qualityValue = response.data.data.filter(k => k.dropdown === "quality").map((i) => { return i.list })
                setQualityData(qualityValue[0]);
                let siteValue = response.data.data.filter(k => k.dropdown === "site").map((i) => { return i.list })
                setSiteData(siteValue[0]);
            })

        HttpLogin.axios().get("api/patient/getPatient/" + decodeFinalPatientid)
            .then((response) => {
                //  console.log(JSON.stringify(response.data.data))     

                if (response.data.message.code === "MHC - 0200") {
                    setInputPatientInfo(response.data.data.basicDetails[0].name[0].given + " " + response.data.data.basicDetails[0].name[0].family);
                    setPatientImage(response.data.data.basicDetails[0].profile !== "" ? response.data.data.basicDetails[0].profile : "");
                    setPatientDateOfBirth(moment(response.data.data.basicDetails[0].birthDate).format('MMM DD,YYYY'));
                    var genderChanges = response.data.data.basicDetails[0].gender === "M" ? "Male" : response.data.data.basicDetails[0].gender === "fm" ? "Female" : "Not Specify";
                    setPatientGender(genderChanges);
                    var ssnValue = response.data.data.basicDetails[0].ssn != undefined ? response.data.data.basicDetails[0].ssn.slice(6, 9) : ""
                    setPatientSSN(ssnValue);
                    var today = new Date();
                    var birthDate = new Date(moment(response.data.data.basicDetails[0].birthDate, "YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z"));
                    // create a date object directly from `dob1` argument
                    var age_now = today.getFullYear() - birthDate.getFullYear();
                    var m = today.getMonth() - birthDate.getMonth();
                    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                        age_now--;
                    }
                    setPatientAge(age_now);
                    setSpinner(false);
                } else {
                    alert(response.data.message.description);
                }
            })
        HttpLogin.axios().get('/api/vital/getLatestVital/' + decodeFinalPatientid)
            .then((res) => {
                console.log(JSON.stringify(res.data.data));
                let enteredNewDate = res.data.data.enteredDate = res.data.data.enteredDate !== null && res.data.data.enteredDate !== undefined && res.data.data.enteredDate !== "" ? new Date(moment(res.data.data.enteredDate, "YYYYMMDDHHmm").format("YYYY-MM-DDTHH:mm:ss.000Z")) : null
                setNewEnteredDate(enteredNewDate);
                rows[0].Unitsmesurement = res.data.data.bodyTemperature !== null && res.data.data.bodyTemperature !== "" ? res.data.data.bodyTemperature.unit : "";
                rows[1].Unitsmesurement = res.data.data.pulseRate !== null && res.data.data.pulseRate !== "" ? res.data.data.pulseRate.unit : "";
                rows[2].Unitsmesurement = res.data.data.heartRate !== null && res.data.data.heartRate !== "" ? res.data.data.heartRate.unit : "";
                rows[3].Unitsmesurement = res.data.data.respirationRate !== null && res.data.data.respirationRate !== "" ? res.data.data.respirationRate.unit : "";
                rows[4].Unitsmesurement = res.data.data.bloodPressure !== null && res.data.data.bloodPressure !== "" ? res.data.data.bloodPressure.unit : "";
                rows[5].Unitsmesurement = res.data.data.pain !== null && res.data.data.pain !== "" ? res.data.data.pain.unit : "";
                rows[6].Unitsmesurement = res.data.data.pulseOximetry !== null && res.data.data.pulseOximetry !== "" ? res.data.data.pulseOximetry.unit : "";
                rows[7].Unitsmesurement = res.data.data.bloodOxygen !== null && res.data.data.bloodOxygen !== "" ? res.data.data.bloodOxygen.unit : "";
                rows[8].Unitsmesurement = res.data.data.height !== null && res.data.data.height !== "" ? res.data.data.height.unit : "";
                rows[9].Unitsmesurement = res.data.data.weight !== null && res.data.data.weight !== "" ? res.data.data.weight.unit : "";
                rows[10].Unitsmesurement = res.data.data.bloodGlucoseLevel !== null && res.data.data.bloodGlucoseLevel !== "" ? res.data.data.bloodGlucoseLevel.unit : "";
                rows[11].Unitsmesurement = res.data.data.circumferenceOrGirth !== null && res.data.data.circumferenceOrGirth !== "" ? res.data.data.circumferenceOrGirth.unit : "";
                rows[0].value = res.data.data.bodyTemperature !== null && res.data.data.bodyTemperature !== "" ? res.data.data.bodyTemperature.value : "";
                rows[1].value = res.data.data.pulseRate !== null && res.data.data.pulseRate !== "" ? res.data.data.pulseRate.value : "";
                rows[2].value = res.data.data.heartRate !== null && res.data.data.heartRate !== "" ? res.data.data.heartRate.value : "";
                rows[3].value = res.data.data.respirationRate !== null && res.data.data.respirationRate !== "" ? res.data.data.respirationRate.value : "";
                rows[4].value = res.data.data.bloodPressure !== null && res.data.data.bloodPressure !== "" ? res.data.data.bloodPressure.value : "";
                rows[5].value = res.data.data.pain !== null && res.data.data.pain !== "" ? res.data.data.pain.value : "";
                rows[6].value = res.data.data.pulseOximetry !== null && res.data.data.pulseOximetry !== "" ? res.data.data.pulseOximetry.value : "";
                rows[7].value = res.data.data.bloodOxygen !== null && res.data.data.bloodOxygen !== "" ? res.data.data.bloodOxygen.value : "";
                rows[8].value = res.data.data.height !== null && res.data.data.height !== "" ? res.data.data.height.value : "";
                rows[9].value = res.data.data.weight !== null && res.data.data.weight !== "" ? res.data.data.weight.value : "";
                rows[10].value = res.data.data.bloodGlucoseLevel !== null && res.data.data.bloodGlucoseLevel !== "" ? res.data.data.bloodGlucoseLevel.value : "";
                rows[11].value = res.data.data.circumferenceOrGirth !== null && res.data.data.circumferenceOrGirth !== "" ? res.data.data.circumferenceOrGirth.value : "";
                rows[0].role = res.data.data.bodyTemperature.btQualifiers.location;
                rows[1].role = (res.data.data.pulseRate.prQualifiers.location !== "" ? res.data.data.pulseRate.prQualifiers.location + ", " : "") +
                    (res.data.data.pulseRate.prQualifiers.method !== "" ? res.data.data.pulseRate.prQualifiers.method + ", " : "") +
                    (res.data.data.pulseRate.prQualifiers.position !== "" ? res.data.data.pulseRate.prQualifiers.position + ", " : "") +
                    (res.data.data.pulseRate.prQualifiers.site !== "" ? res.data.data.pulseRate.prQualifiers.site + ", " : "");
                rows[2].role = res.data.data.heartRate.hrQualifiers.location;
                rows[3].role = (res.data.data.respirationRate.rrQualifiers.method !== "" ? res.data.data.respirationRate.rrQualifiers.method + ", " : "") + (res.data.data.respirationRate.rrQualifiers.position !== "" ? res.data.data.respirationRate.rrQualifiers.position + ", " : "")
                rows[4].role = (res.data.data.bloodPressure.bpQualifiers.cuffSize !== "" ? res.data.data.bloodPressure.bpQualifiers.cuffSize + ", " : "") + (res.data.data.bloodPressure.bpQualifiers.method !== "" ? res.data.data.bloodPressure.bpQualifiers.method + ", " : "") + (res.data.data.bloodPressure.bpQualifiers.position !== "" ? res.data.data.bloodPressure.bpQualifiers.position + ", " : "");
                rows[6].role = res.data.data.pulseOximetry !== null ? ((res.data.data.pulseOximetry.poQualifiers.flowRate !== "" ? res.data.data.pulseOximetry.poQualifiers.flowRate + ", " : "") +
                    (res.data.data.pulseOximetry.poQualifiers.method !== "" ? res.data.data.pulseOximetry.poQualifiers.method + ", " : "") +
                    (res.data.data.pulseOximetry.poQualifiers.o2concentration !== "" ? res.data.data.pulseOximetry.poQualifiers.o2concentration + ", " : "") +
                    (res.data.data.pulseOximetry.poQualifiers.supplimentalOxygen !== "" ? res.data.data.pulseOximetry.poQualifiers.supplimentalOxygen + ", " : "")) : "";
                rows[7].role = res.data.data.bloodOxygen.boQualifiers.method;
                rows[8].role = res.data.data.height.hqualifiers.quality;
                rows[9].role = (res.data.data.weight.wqualifiers.quality !== "" ? res.data.data.weight.wqualifiers.quality + ", " : "") + (res.data.data.weight.wqualifiers.method !== "" ? res.data.data.weight.wqualifiers.method + ", " : "")
                rows[10].role = (res.data.data.bloodGlucoseLevel.bgQualifiers.quality !== "" ? res.data.data.bloodGlucoseLevel.bgQualifiers.quality + ", " : "") + (res.data.data.bloodGlucoseLevel.bgQualifiers.location !== "" ? res.data.data.bloodGlucoseLevel.bgQualifiers.location + ", " : "") + (res.data.data.bloodGlucoseLevel.bgQualifiers.position !== "" ? res.data.data.bloodGlucoseLevel.bgQualifiers.position + ", " : "");
                rows[11].role = res.data.data.circumferenceOrGirth !== null ? (res.data.data.circumferenceOrGirth.cgQualifiers.site !== "" ? res.data.data.circumferenceOrGirth.cgQualifiers.site + ", " : "") + (res.data.data.circumferenceOrGirth.cgQualifiers.location !== "" ? res.data.data.circumferenceOrGirth.cgQualifiers.location + ", " : "") : "";
                setRows([...rows]);
                setInputFormData(res.data.data);
                setSpinner(false);
            })

    }, []);


    let newCuffSizeDropDown = cuffSizeData != null && cuffSizeData.length > 0 && cuffSizeData.map((item, i) => {
        return (
            <MenuItem key={i} value={item.value}>{item.value}</MenuItem>
        )
    })

    let newPositionDropDown = positionData != null && positionData.length > 0 && positionData.map((item, i) => {
        return (
            <MenuItem key={i} value={item.value}>{item.value}</MenuItem>
        )
    })
    let newLocationDropDown = locationData != null && locationData.length > 0 && locationData.map((item, i) => {
        return (
            <MenuItem key={i} value={item.value}>{item.value}</MenuItem>
        )
    })
    let newMethodDropDown = methodData != null && methodData.length > 0 && methodData.map((item, i) => {
        return (
            <MenuItem key={i} value={item.value}>{item.value}</MenuItem>
        )
    })
    let newQualityDropDown = qualityData != null && qualityData.length > 0 && qualityData.map((item, i) => {
        return (
            <MenuItem key={i} value={item.value}>{item.value}</MenuItem>
        )
    })
    let newSiteDropDown = siteData != null && siteData.length > 0 && siteData.map((item, i) => {
        return (
            <MenuItem key={i} value={item.value}>{item.value}</MenuItem>
        )
    })

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
        console.log(JSON.stringify(rows));
        let newClick = rows.filter((row) => row.id === id).map(k => { return k.name });

        setInputQualifier(newClick[0]);
        //  console.log(JSON.stringify(newClick));
        if (newClick[0] !== "Pain") {
            setDialogQualifier(true);
            handleReset();
        }
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        console.log(JSON.stringify(rows));
        let newClick = rows.filter((row) => row.id === id).map(k => { return k.name });
        //  console.log(JSON.stringify(newClick));
        setInputQualifier(newClick[0]);
        //setDialogQualifier(true);
        if (newClick[0] !== "Pain") {
            setDialogQualifier(true);
            handleReset();
        }
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Vital', width: 180, editable: true },

        {
            field: 'value',
            headerName: 'Value',
            type: 'text',
            width: 180,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'Units',
            headerName: 'Units',
            type: 'boolean',
            width: 80,
            editable: true,
        },
        {
            field: 'Unitsmesurement',
            headerName: '',
            type: 'text',
            width: 30,
            editable: true,
        },
        {
            field: 'role',
            headerName: 'Qualifiers',
            type: 'text',
            width: 260,
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    let newInput = {
        location: "",
        site: "",
        position: "",
        method: "",
        cuffSize: "",
        supplementalOxygen: "",
        quality: "",
        flowRate: "",
        o2Concentraion: ""
    }

    let [newInputData, setNewInputData] = useState(newInput);

    const handleInputChange = (event: any) => {
        if (event.target.name === "location") {
            newInputData.location = event.target.value;
        } else if (event.target.name === "site") {
            newInputData.site = event.target.value;
        } else if (event.target.name === "position") {
            newInputData.position = event.target.value;
        } else if (event.target.name === "method") {
            newInputData.method = event.target.value;
        } else if (event.target.name === "cuffSize") {
            newInputData.cuffSize = event.target.value;
        } else if (event.target.name === "supplementalOxygen") {
            newInputData.supplementalOxygen = event.target.value;
        } else if (event.target.name === "quality") {
            newInputData.quality = event.target.value;
        } else if (event.target.name === "flowRate") {
            newInputData.flowRate = event.target.value;
        } else if (event.target.name === "o2Concentraion") {
            newInputData.o2Concentraion = event.target.value;
        }
        setNewInputData({ ...newInputData });
    }

    const handleReset = () => {
        newInputData.location = "";
        newInputData.site = "";
        newInputData.position = "";
        newInputData.method = "";
        newInputData.cuffSize = "";
        newInputData.supplementalOxygen = "";
        newInputData.quality = "";
        newInputData.flowRate = "";
        newInputData.o2Concentraion = "";
    }

    const handleQualifiers = () => {
        setNewInputData({ ...newInputData });
        setRows([...rows]);
        console.log(JSON.stringify(rows));
        //inputFormData.enteredDate = inputFormData.enteredDate !== null && inputFormData.enteredDate !== undefined && inputFormData.enteredDate !== "" ? (moment(inputFormData.enteredDate, "YYYY-MM-DDTHH:mm:ss.000Z").format("YYYYMMDDHHmm")) : null;
        inputFormData.bodyTemperature.vitalMeasurementName = rows[0].name;
        inputFormData.pulseRate.vitalMeasurementName = rows[1].name;
        inputFormData.heartRate.vitalMeasurementName = rows[2].name;
        inputFormData.respirationRate.vitalMeasurementName = rows[3].name;
        inputFormData.bloodPressure.vitalMeasurementName = rows[4].name;
        inputFormData.pain.vitalMeasurementName = rows[5].name;
        inputFormData.pulseOximetry.vitalMeasurementName = rows[6].name;
        inputFormData.bloodOxygen.vitalMeasurementName = rows[7].name;
        inputFormData.height.vitalMeasurementName = rows[8].name;
        inputFormData.weight.vitalMeasurementName = rows[9].name;
        inputFormData.bloodGlucoseLevel.vitalMeasurementName = rows[10].name;
        inputFormData.circumferenceOrGirth.vitalMeasurementName = rows[11].name;
        inputFormData.bodyTemperature.unit = rows[0].Unitsmesurement;
        inputFormData.pulseRate.unit = rows[1].Unitsmesurement;
        inputFormData.heartRate.unit = rows[2].Unitsmesurement;
        inputFormData.respirationRate.unit = rows[3].Unitsmesurement;
        inputFormData.bloodPressure.unit = rows[4].Unitsmesurement;
        inputFormData.pain.unit = rows[5].Unitsmesurement;
        inputFormData.pulseOximetry.unit = rows[6].Unitsmesurement;
        inputFormData.bloodOxygen.unit = rows[7].Unitsmesurement;
        inputFormData.height.unit = rows[8].Unitsmesurement;
        inputFormData.weight.unit = rows[9].Unitsmesurement;
        inputFormData.bloodGlucoseLevel.unit = rows[10].Unitsmesurement;
        inputFormData.circumferenceOrGirth.unit = rows[11].Unitsmesurement;
        inputFormData.bodyTemperature.value = rows[0].value;
        inputFormData.pulseRate.value = rows[1].value;
        inputFormData.heartRate.value = rows[2].value;
        inputFormData.respirationRate.value = rows[3].value;
        inputFormData.bloodPressure.systolicValue = rows[4].systolicValue;
        inputFormData.bloodPressure.diastolicValue = rows[4].diastolicValue;
        inputFormData.pain.value = rows[5].value;
        inputFormData.pulseOximetry.value = rows[6].value;
        inputFormData.bloodOxygen.value = rows[7].value;
        inputFormData.height.value = rows[8].value;
        inputFormData.weight.value = rows[9].value;
        inputFormData.bloodGlucoseLevel.value = rows[10].value;
        inputFormData.circumferenceOrGirth.value = rows[11].value;
        if (inputQualifier === "Temperature") {
            inputFormData.bodyTemperature.btQualifiers.location = newInputData.location;
            rows[0].role = newInputData.location;
        } else if (inputQualifier === "Pulse Rate") {
            inputFormData.pulseRate.prQualifiers.location = newInputData.location;
            inputFormData.pulseRate.prQualifiers.method = newInputData.method;
            inputFormData.pulseRate.prQualifiers.position = newInputData.position;
            inputFormData.pulseRate.prQualifiers.site = newInputData.site;
            rows[1].role = (newInputData.location !== "" ? newInputData.location + ", " : "") + (newInputData.method !== "" ? newInputData.method + ", " : "") + (newInputData.position !== "" ? newInputData.position + ", " : "") + (newInputData.site !== "" ? newInputData.site + ", " : "");
        } else if (inputQualifier === "Heart Rate") {
            inputFormData.heartRate.hrQualifiers.location = newInputData.location;
            rows[2].role = newInputData.location;
        } else if (inputQualifier === "Respiration") {
            inputFormData.respirationRate.rrQualifiers.method = newInputData.method;
            inputFormData.respirationRate.rrQualifiers.position = newInputData.position;
            rows[3].role = (newInputData.method !== "" ? newInputData.method + ", " : "") + (newInputData.position !== "" ? newInputData.position + ", " : "")
        } else if (inputQualifier === "Blood Pressure") {
            inputFormData.bloodPressure.bpQualifiers.cuffSize = newInputData.cuffSize;
            inputFormData.bloodPressure.bpQualifiers.method = newInputData.method;
            inputFormData.bloodPressure.bpQualifiers.position = newInputData.position;
            rows[4].role = (newInputData.cuffSize !== "" ? newInputData.cuffSize + ", " : "") + (newInputData.method !== "" ? newInputData.method + ", " : "") + (newInputData.position !== "" ? newInputData.position + ", " : "");
        } else if (inputQualifier === "Pulse Oximetry") {
            inputFormData.pulseOximetry.poQualifiers.flowRate = newInputData.flowRate;
            inputFormData.pulseOximetry.poQualifiers.method = newInputData.method;
            inputFormData.pulseOximetry.poQualifiers.o2concentration = newInputData.o2Concentraion;
            inputFormData.pulseOximetry.poQualifiers.supplimentalOxygen = newInputData.supplementalOxygen;
            rows[6].role = (newInputData.flowRate !== "" ? newInputData.flowRate + ", " : "") + (newInputData.method !== "" ? newInputData.method + ", " : "") + (newInputData.o2Concentraion !== "" ? newInputData.o2Concentraion + ", " : "") + (newInputData.supplementalOxygen !== "" ? newInputData.supplementalOxygen + ", " : "");
        } else if (inputQualifier === "Blood Oxygen") {
            inputFormData.bloodOxygen.boQualifiers.method = newInputData.method;
            rows[7].role = newInputData.method;
        } else if (inputQualifier === "Height") {
            inputFormData.height.hqualifiers.quality = newInputData.quality;
            rows[8].role = newInputData.quality;
        } else if (inputQualifier === "Weight") {
            inputFormData.weight.wqualifiers.quality = newInputData.quality;
            inputFormData.weight.wqualifiers.method = newInputData.method;
            rows[9].role = (newInputData.quality !== "" ? newInputData.quality + ", " : "") + (newInputData.method !== "" ? newInputData.method + ", " : "");
        } else if (inputQualifier === "Blood Glucose") {
            inputFormData.bloodGlucoseLevel.bgQualifiers.quality = newInputData.quality;
            inputFormData.bloodGlucoseLevel.bgQualifiers.position = newInputData.position;
            inputFormData.bloodGlucoseLevel.bgQualifiers.location = newInputData.location;
            rows[10].role = (newInputData.quality !== "" ? newInputData.quality + ", " : "") + (newInputData.location !== "" ? newInputData.location + ", " : "") + (newInputData.position !== "" ? newInputData.position + ", " : "");
        } else if (inputQualifier === "Circumference/Girth") {
            inputFormData.circumferenceOrGirth.cgQualifiers.site = newInputData.site;
            inputFormData.circumferenceOrGirth.cgQualifiers.location = newInputData.location;
            rows[11].role = (newInputData.site !== "" ? newInputData.site + ", " : "") + (newInputData.location !== "" ? newInputData.location + ", " : "");
        }

    }
    const handleClickChange = () => {
        inputFormData.enteredDate = newEnteredDate;
        inputFormData.patientId = decryptPatientId;
        inputFormData.lastVisit = decryptVisitId;
        handleQualifiers();
        setSpinner(true);
        setDialogQualifier(false);
        if (inputFormData.id !== "") {
            dispatch(updatePatientVitalsById(inputFormData));
            setTimeout(() => {
                setDialogQualifier(false);
            }, 1000)
        } else {
            dispatch(createPatientVitals(inputFormData));
            setTimeout(() => {
                setDialogQualifier(false);
            }, 1000)
        }
    }
    const handleClose = () => {
        inputQualifier = null;
        setInputQualifier(null);
        setDialogQualifier(false);
    }

    const [isAddMultiVitalupdateLoaded, setAddMultiVitalupdateLoaded] = useState(false);

    if (!isAddMultiVitalupdateLoaded && !createPatientVitalsData.isLoading) {
        createPatientVitalsData.items.data.enteredDate = createPatientVitalsData.items.data.enteredDate !== null && createPatientVitalsData.items.data.enteredDate !== undefined && createPatientVitalsData.items.data.enteredDate !== "" ? new Date(moment(createPatientVitalsData.items.data.enteredDate, "YYYYMMDDHHmm").format("YYYY-MM-DDTHH:mm:ss.000Z")) : null;
        setInputFormData(createPatientVitalsData.items.data);
        if (createPatientVitalsData.items.message.code === "MHC - 0200") {
            alert(createPatientVitalsData.items.message.description);
            setTimeout(() => {
                window.location.href = "/MettlerVisitPatientdata/" + encryptPatientId + "/" + encryptVisitId;
                setSpinner(false);
            }, (1000));
            setAddMultiVitalupdateLoaded(true);
        } else {
            alert(createPatientVitalsData.items.message.description);
            setTimeout(() => {
                setAddMultiVitalupdateLoaded(false);
                setSpinner(false);
            }, (1000));
        }

    }
    if (!createPatientVitalsData && createPatientVitalsData.isFormSubmit) {

        setTimeout(() => {
            setAddMultiVitalupdateLoaded(false);
            setSpinner(false);
        }, (1000));
    }


    let [isUpdateAddMultiVitalLoaded, setUpdateAddMultiVitalLoaded] = useState(false);

    if (!isUpdateAddMultiVitalLoaded && !updatePatientVitalsData.isLoading) {
        updatePatientVitalsData.items.data.enteredDate = updatePatientVitalsData.items.data.enteredDate !== "Invalid date" && updatePatientVitalsData.items.data.enteredDate !== null && updatePatientVitalsData.items.data.enteredDate !== "" ? new Date(moment(updatePatientVitalsData.items.data.enteredDate, ("YYYYMMDDHHmm")).format("YYYY-MM-DDTHH:mm:ss.000Z")) : null;
        setInputFormData(updatePatientVitalsData.items.data);
        if (updatePatientVitalsData.items.message.code === "MHC - 0200") {
            alert(updatePatientVitalsData.items.message.description);

            console.log(JSON.stringify(updatePatientVitalsData.items));
            setTimeout(() => {
                window.location.href = "/MettlerVisitPatientdata/" + encryptPatientId + "/" + encryptVisitId;
                setSpinner(false);
            }, (1000));
            setUpdateAddMultiVitalLoaded(true);
        } else {

            alert(updatePatientVitalsData.items.message.description);
            setTimeout(() => {
                setUpdateAddMultiVitalLoaded(false);
                setSpinner(false);
            }, (1000));
        }

    }
    const handleBackclick = () => {
        window.location.href = "/MettlerVisitPatientdata/" + encryptPatientId + "/" + encryptVisitId;
    }
    return (
        <>
            {spinner &&
                (<div className='overlay-content'>
                    <div className='wrapper'>
                        <img alt="" src={loaddingFile} style={{ position: 'absolute', width: '100%', zIndex: 2, opacity: '0.5' }} />
                    </div>
                </div>
                )}
            <div className="bedexpand-more-24px-parent">
                <img
                    className="bedexpand-more-24px-icon"
                    alt=""
                    src="/expand-more-24px.svg"
                />
                <div className="beddetails" style={{ top: "89px", left: "-4px" }}> <i onClick={handleBackclick} style={{ position: "relative", top: "6px", left: "-7px", cursor: "pointer" }} className="large material-icons" >arrow_back</i>Add Allergy</div>
            </div>
            <div style={{ top: "6px", background: decryptPatientId != "" ? '#2D56AD' : "#FFF", height: decryptPatientId != "" ? '98px' : '0px', display: 'flex', width: 'calc(100% - 0px)', position: 'absolute', left: "0px" }} >
                <div id="mettlerEmptyPadding" className="p-col-12 p-md-1">

                    <div id="mettlerEmptyPadding" className="p-col-12 p-md-1">
                        <img style={{ width: '60px', height: '60px', position: 'relative', left: '21px', top: '23px', borderRadius: patientImage !== "" ? "30px" : "" }} src={patientImage !== "" ? patientImage : AvatarBigImage}></img>
                    </div>
                    <div id="mettlerEmptyPadding" style={{ display: 'flex', flexDirection: 'column' }} className="p-col-12 p-md-6">
                        <div style={{ display: 'flex', flexDirection: 'row', position: "absolute", top: "7px", left: "97px" }}>
                            <div style={{ position: 'relative', top: '19px', minWidth: 'max-content', fontSize: '18px' }} className="App-TopBar-PatientName">{inputPatientInfo}</div>
                            <div style={{ position: 'relative', top: '23px', left: '6px', minWidth: 'max-content', fontSize: '14px' }} className="App-TopBar-PatientAge">{patientAge}Years</div>

                            <div className="admit-patient-ss" style={{ width: '110px', height: '24px', background: '#5574B7', border: '1px solid #5574B7', position: 'relative', top: '19px', left: '23px' }}>
                                <div style={{ fontWeight: 400, fontSize: '12px', opacity: 0.6, color: '#FFF' }} className="admit-patient-profileName">SS#:</div>
                                <div style={{ fontWeight: 400, fontSize: '12px', color: '#FFF' }} className="admit-patient-profileName">SS-</div>
                            </div>
                            <div className="admit-patient-ss" style={{ width: '110px', height: '24px', position: 'relative', left: '40px', top: '19px', background: '#5574B7', border: '1px solid #5574B7' }}>
                                <div style={{ fontWeight: 400, fontSize: '12px', opacity: 0.6, color: '#FFF' }} className="admit-patient-profileName">MR:</div>
                                <div style={{ fontWeight: 400, fontSize: '12px', color: '#FFF' }} className="admit-patient-profileName">MR-345</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', position: "absolute", top: "20px", left: "86px" }}>
                            <div style={{ position: 'relative', top: '32px', display: 'flex' }} >
                                <img style={{ width: '26px', height: '26px', position: 'relative', top: '8px', left: '5px', fontSize: '10px' }} src={bloodBag}></img>
                                <span style={{ opacity: 0.6000000238418579, position: 'relative', left: '7px', top: '1px', fontSize: '10px' }} className="App-TopBar-BloodName">Blood</span>
                                <span style={{ position: 'relative', top: '14px', left: '-22px', fontSize: '12px' }} className="App-TopBar-PatientValue">A</span><span style={{ position: 'relative', top: '13px', left: '-22px', fontSize: '12px' }} className="App-TopBar-PatientValue">+</span>
                            </div>
                            <div style={{ position: 'relative', top: '30px', left: '', display: 'flex' }}>
                                <img style={{ width: '26px', height: '26px', position: 'relative', top: '10px', left: '5px', fontSize: '10px' }} src={bloodDrop}></img>
                                <span style={{ opacity: 0.6000000238418579, position: 'relative', left: '6px', top: '5px', fontSize: '10px' }} className="App-TopBar-BloodName">Height</span>
                                <span style={{ position: 'relative', top: '18px', left: '-25px', fontSize: '12px', width: '30px' }} className="App-TopBar-PatientValue">--</span>
                            </div>
                            <div style={{ position: 'relative', top: '30px', display: 'flex' }}>
                                <img style={{ width: '26px', height: '26px', position: 'relative', top: '10px', left: '5px' }} src={bloodDropNew}></img>
                                <span style={{ opacity: 0.6000000238418579, position: 'relative', left: '6px', top: '8px', fontSize: '10px' }} className="App-TopBar-BloodName">Weight</span>
                                <span style={{ position: 'relative', top: '23px', left: '-29px', fontSize: '12px' }} className="App-TopBar-PatientValue">45kg</span>
                            </div>
                            <div style={{ position: 'relative', top: '30px', display: 'flex' }} >
                                <img style={{ width: '26px', height: '26px', position: 'relative', top: '10px', left: '5px' }} src={bloodDropNewOne}></img>
                                <span style={{ opacity: 0.6000000238418579, position: 'relative', left: '7px', top: '9px', fontSize: '10px' }} className="App-TopBar-BloodName">DOB</span>
                                <span style={{ position: 'relative', top: '22px', left: '-13px', fontSize: '12px', width: '75px' }} className="App-TopBar-PatientValue">{patientDateOfBirth}</span>
                            </div>
                            <div style={{ position: 'relative', top: '30px', left: '10px', display: 'flex' }}>
                                <img style={{ width: '26px', height: '26px', position: 'relative', top: '10px', left: '5px' }} src={AvatarDoctorImage}></img>
                                <span style={{ fontSize: '16px', position: 'relative', top: '11px', left: '13px', width: '200px' }} className="App-TopBar-PatientValue">Dr. Linda Blair, OP</span>
                            </div>
                        </div>
                    </div>

                </div>
                <div id="mettlerEmptyPadding" className="p-col-12 p-md-5">  </div>
            </div>
            <Box
                sx={{
                    height: 500,
                    width: '100%',
                    '& .actions': {
                        color: 'text.secondary',
                    },
                    '& .textPrimary': {
                        color: 'text.primary',
                    },
                }}
            >

                <DataGrid
                    style={{ position: "absolute", left: "135px", top: "276px", width: "calc(100% - 200px)" }}
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    slots={{
                        toolbar: EditToolbar,
                    }}
                    slotProps={{
                        toolbar: { setRows, setRowModesModel },
                    }}
                />
            </Box>
            <div className="component-5011" style={{ top: "1076.75px" }}>
                <div className="cancel-group" style={{ position: "absolute", top: "9px", left: "801px" }}>
                    <SecondaryButton
                        label="Cancel"
                        secondaryButtonCursor="pointer"
                        onCancelContainerClick={null}
                    />
                    {/* <div className="previous1">
                            <img className="bg-icon3" alt="" src={bottomImage} />
                            <div className="label5">Previous</div>
                        </div> */}
                    <PrimaryButton

                        label="Add"
                        primaryButtonCursor="pointer"
                        onNextContainerClick={handleClickChange}
                    />
                </div>
            </div>
            <Dialog maxWidth={'md'} PaperProps={{ sx: { position: "absolute", height: "400px", left: "-180px", top: "314px", width: "325px" } }}
                style={{ left: '826px', top: "-150px", height: inputQualifier === "Temperature" || inputQualifier === "Heart Rate" || inputQualifier === "Blood Oxygen" || inputQualifier === "Height" ? "300px" : inputQualifier === "Respiration" || inputQualifier === "Weight" || inputQualifier === "Circumference/Girth" ? "340px" : inputQualifier === "Blood Pressure" || inputQualifier === "Blood Glucose" ? "400px" : '500px' }}
                open={dialogQualifier}
                onClose={handleClose}
            >
                <DialogTitle >{inputQualifier} Qualifiers</DialogTitle>
                {(inputQualifier === "Pulse Rate" || inputQualifier === "Circumference/Girth" || inputQualifier === "Blood Pressure" || inputQualifier === "Pulse Oximetry" || inputQualifier === "Height" || inputQualifier === "Weight") &&
                    <FormControl className="name-input13" variant="outlined" style={{ width: "286px", left: "19px", top: "-9px" }}>
                        <InputLabel color="primary" ><span >{inputQualifier === "Blood Pressure" ? "Cuff Size" : inputQualifier === "Pulse Oximetry" ? "Supplemental Oxygen" : inputQualifier === "Height" || inputQualifier === "Weight" ? "Quality" : "Site"}
                        </span></InputLabel>
                        {inputQualifier === "Blood Pressure" ? <Select color="primary" size="medium" label="Cuff Size" name="cuffSize" value={newInputData.cuffSize} onChange={handleInputChange}>
                            {newCuffSizeDropDown}
                        </Select> : inputQualifier === "Pulse Oximetry" ? <Select color="primary" size="medium" label="Supplemental Oxygen" name="supplementalOxygen" value={newInputData.supplementalOxygen} onChange={handleInputChange}>
                            <MenuItem value="Vital Unit1">Vital Unit1</MenuItem>
                            <MenuItem value="Vital Unit2">Vital Unit2</MenuItem>
                            <MenuItem value="Vital Unit3">Vital Unit3</MenuItem>
                        </Select> : inputQualifier === "Height" || inputQualifier === "Weight" ? <Select color="primary" size="medium" label="Quality" name="quality" value={newInputData.quality} onChange={handleInputChange}>
                            {newQualityDropDown}
                        </Select> :
                            <Select color="primary" size="medium" label="Site" name="site" value={newInputData.site} onChange={handleInputChange}>
                                {newSiteDropDown}
                            </Select>}
                        <FormHelperText />
                    </FormControl>
                }
                {(inputQualifier === "Pulse Rate" || inputQualifier === "Respiration" || inputQualifier === "Blood Glucose" || inputQualifier === "Blood Pressure" || inputQualifier === "Pulse Oximetry") &&
                    <FormControl className="name-input13" variant="outlined" style={{ width: "286px", left: "19px", top: inputQualifier === "Respiration" || inputQualifier === "Blood Glucose" ? "0px" : inputQualifier === "Blood Pressure" ? "-21px" : "-16px" }}>
                        <InputLabel color="primary" ><span >{inputQualifier === "Pulse Oximetry" ? "Flow Rate" : "Position"}
                        </span></InputLabel>
                        {inputQualifier === "Pulse Oximetry" ? <Select color="primary" size="medium" label="Flow Rate" name="flowRate" value={newInputData.flowRate} onChange={handleInputChange}>
                            <MenuItem value="Vital Unit1">Vital Unit1</MenuItem>
                            <MenuItem value="Vital Unit2">Vital Unit2</MenuItem>
                            <MenuItem value="Vital Unit3">Vital Unit3</MenuItem>
                        </Select> :
                            <Select color="primary" size="medium" label="Position" name="position" value={newInputData.position} onChange={handleInputChange}>
                                <MenuItem value="Vital Unit1">Vital Unit1</MenuItem>
                                <MenuItem value="Vital Unit2">Vital Unit2</MenuItem>
                                <MenuItem value="Vital Unit3">Vital Unit3</MenuItem>
                            </Select>}
                        <FormHelperText />
                    </FormControl>
                }
                {(inputQualifier === "Respiration" || inputQualifier === "Pulse Rate" || inputQualifier === "Blood Pressure" || inputQualifier === "Blood Glucose" || inputQualifier === "Blood Oxygen" || inputQualifier === "Weight" || inputQualifier === "Pulse Oximetry") &&
                    <FormControl className="name-input13" variant="outlined" style={{ width: "286px", left: "19px", top: inputQualifier === "Respiration" ? "-21px" : inputQualifier === "Blood Pressure" || inputQualifier === "Weight" ? "-34px" : inputQualifier === "Blood Oxygen" ? "0px" : inputQualifier === "Blood Glucose" ? "-16px" : "-24px" }}>
                        <InputLabel color="primary" ><span >Method
                        </span></InputLabel>
                        <Select color="primary" size="medium" label="Method" name="method" value={newInputData.method} onChange={handleInputChange}>
                            {newMethodDropDown}
                        </Select>
                        <FormHelperText />
                    </FormControl>
                }
                {(inputQualifier === "Temperature" || inputQualifier === "Pulse Rate" || inputQualifier === "Heart Rate" || inputQualifier === "Blood Glucose" || inputQualifier === "Circumference/Girth" || inputQualifier === "Pulse Oximetry") &&
                    <FormControl className="name-input13" variant="outlined" style={{ width: "286px", left: "19px", top: inputQualifier === "Temperature" || inputQualifier === "Heart Rate" ? "0px" : "-31px" }}>
                        <InputLabel color="primary" ><span >{inputQualifier === "Pulse Oximetry" ? "O2 Concentration" : "Location"}
                        </span></InputLabel>
                        {inputQualifier === "Pulse Oximetry" ? <Select color="primary" size="medium" label="O2 Concentration" name="o2Concentraion" value={newInputData.o2Concentraion} onChange={handleInputChange}>
                            <MenuItem value="Vital Unit1">Vital Unit1</MenuItem>
                            <MenuItem value="Vital Unit2">Vital Unit2</MenuItem>
                            <MenuItem value="Vital Unit3">Vital Unit3</MenuItem>
                        </Select> :
                            <Select color="primary" size="medium" label="Location" name="location" value={newInputData.location} onChange={handleInputChange}>
                                {newLocationDropDown}
                            </Select>}
                        <FormHelperText />
                    </FormControl>
                }
                <div style={{ position: "relative", top: "-17px", }}>
                    <button onClick={() => {
                        setTimeout(() => {
                            setDialogQualifier(false)
                            window.location.reload();
                        }, 1000)
                    }} style={{ position: "relative", top: "-12px", left: "116px", backgroundColor: "#C9D1E2", borderStyle: "unset", borderRadius: "4px" }}>Cancel</button>
                    <button onClick={handleClickChange} style={{ position: "relative", top: "-12px", left: "138px", width: "58px", backgroundColor: "#1F489F", borderStyle: "unset", borderRadius: "4px", color: "white" }}>Ok</button>
                </div>
            </Dialog>
        </>

    );
}
const mapStateToProps = (state: any) => {
    const { deviceFormData, createOrganizationData, updatePatientVitalsData, createPatientVitalsData } = state;
    return {
        deviceFormData, createOrganizationData, updatePatientVitalsData, createPatientVitalsData
    };
};
export default connect(mapStateToProps)(AddMultiVital);