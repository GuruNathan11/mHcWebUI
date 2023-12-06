

import React, { useState, useCallback, Dispatch, useEffect } from "react";
import {
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    FormHelperText,
    Select,
    Button,
    Icon,
    Container,
    Grid,
    Paper,
    colors,
} from "@mui/material";
import HIPAAComplianceContainer from "./../../../components/HIPAAComplianceContainer";
import "./PatientBedAssignment.css";

import { connect } from "react-redux";
import bottomImage from './../../../assets/images/mettler_images/bg.svg';
import newImage from './../../../assets/images/mettler_images/rectangle-5999.svg';
import BedMasterConfigurationData from "./../../../assets/data/BedMasterConfigurationData.json";
import { createOrganization, getByIdOrganization, updateOrganization } from "../../../store/actions/Organization";
import * as Constants from "./../Constants/ConstantValues";
import SecondaryButton from "../../../components/SecondaryButton";
import PrimaryButton from "../../../components/PrimaryButton";
import "../../../components/BottomFooter.css";
import { HttpLogin } from "../../../utils/Http";
import { CarouselControl } from "reactstrap";


interface IPatientBedAssignment { }
interface IPatientBedAssignment {
    StaticPage: any;
    dispatch: Dispatch<any>;
    createOrganizationData: any;
    errorMessage: any;
    state: {
        nodes: [],
        checked: [],
        expanded: []
    }
}
const PatientBedAssignment: React.FC<IPatientBedAssignment> = ({
    dispatch, createOrganizationData, errorMessage


}) => {
    const [containerColors, setContainerColors] = useState({});
    const handleContainerClick = (containerId) => {
        setContainerColors((prevColors) => {
            const newColors = { ...prevColors };
            if (newColors[containerId] === '#01CDFF') {
                delete newColors[containerId];
            } else {
                newColors[containerId] = '#01CDFF';
            }
            return newColors;
        });
    };



    return (
        <>
            <div className="bed-details" style={{ height: "1089px" }}>
                <div className="bed-details-child" />

                <div className="bedline-div" />
                <div className="bedexpand-more-24px-parent">
                    <img
                        className="bedexpand-more-24px-icon"
                        alt=""
                        src="/expand-more-24px.svg"
                    />
                    <div className="beddetails">Select Bed</div>
                    <div className="beddetailsAvaliables">
                        <div className="Available">
                            <Container className="bed" style={{ backgroundColor: "white", border: '1px solid #C4C5D3' }}>
                                <span style={{ borderRadius: "20px", backgroundColor: "white", border: "2px solid #C4C5D3", marginLeft: "-20px", marginTop: "2px", marginBottom: "2px" }}></span>
                            </Container>
                            <div className="bed">Available</div>
                        </div>
                        <div className="Selected">
                            <Container className="bed-1" style={{ backgroundColor: "#01CDFF" }}>
                                <span style={{ borderRadius: "20px", backgroundColor: "white", border: "2px solid white", marginLeft: "-20px", marginTop: "3px", marginBottom: "3px" }}></span>
                            </Container>
                            <div className="bed-1">Selected</div>
                        </div>
                        <div className="Unavaliable">
                            <Container className="bed-0" style={{ backgroundColor: "#FFFFFF", border: "1px solid #B4B5D1" }}>
                                <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", border: "2px solid #B4B5D1", marginLeft: "-20px", marginTop: "3px", marginBottom: "3px" }} ></span>
                            </Container>
                            <div className="bed-0">Unavaliable</div>
                        </div>
                        <div className="LadyPatient">
                            <Container className="bed-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #CDB3CD" }}>
                                <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", border: "2px solid #CDB3CD", marginLeft: "-20px", marginTop: "3px", marginBottom: "3px" }} ></span>
                            </Container>
                            <div className="bed-3">Lady Patient</div>
                        </div>
                        <div className="ForLadies">
                            <Container className="bed-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #CEA5CE" }}>
                                <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", border: "2px solid #CEA5CE", marginLeft: "-20px", marginTop: "3px", marginBottom: "3px" }}></span>
                            </Container>
                            <div className="bed-4">For Ladies</div>
                        </div>
                        <div className="ForLadies-1">
                            <Container className="bed-5" style={{ backgroundColor: "#FFFFFF", border: "1px solid #6293DB" }}>
                                <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", border: "2px solid #6293DB", marginLeft: "-20px", marginTop: "3px", marginBottom: "3px" }}></span>
                            </Container>
                            <div className="bed-5">For Ladies</div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="container-1">
                        <div className="generalpart-1">
                            <div className="general-1">
                                <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                    <Container
                                        onClick={() => handleContainerClick('401-01')}
                                        style={{ transform: "rotate(-90deg)", border: "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors['401-01'] || "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No401-01">401-01
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                    <span style={{ background: "#fff", position: "absolute", top: "16px", width: "2px", height: "85px", left: "58px", color: "#fff" }}><span>a</span></span>
                                </div>
                            </div>
                            <div className="general-10">
                                <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                    <Container
                                        onClick={() => handleContainerClick('401-02')}
                                        style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors['401-02'] || "#FFFFFF", marginLeft: "-12px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No401-02">401-02
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>

                            <div className="general-2">
                                <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                    <Container
                                        onClick={() => handleContainerClick('402-01')}
                                        style={{ transform: "rotate(-90deg)", border: "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors['402-01'] || "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No401-01">402-01
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                                <span style={{ background: "#fff", position: "absolute", top: "16px", width: "2px", height: "85px", left: "49px", color: "#fff" }}><span>a</span></span>

                            </div>
                            <div className="general-20">
                                <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                    <Container
                                        onClick={() => handleContainerClick('402-02')}
                                        style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors['402-02'] || "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No401-01">402-02
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>

                            </div>
                            <div className="general-3">
                                <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                    <Container
                                        onClick={() => handleContainerClick('403-01')}
                                        style={{ transform: "rotate(-90deg)", border: "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors['403-01'] || "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No401-01">403-01
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                                <span style={{ background: "#fff", position: "absolute", top: "16px", width: "2px", height: "85px", left: "49px", color: "#fff" }}><span>a</span></span>

                            </div>
                            <div className="general-30">
                                <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                    <Container
                                        onClick={() => handleContainerClick('403-02')}
                                        style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors['403-02'] || "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No401-01">403-02
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>

                            <div className="general-4">
                                <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                    <Container
                                        onClick={() => handleContainerClick('404-01')}
                                        style={{ transform: "rotate(-90deg)", border: "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors['404-01'] || "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No401-01">404-01
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                                <span style={{ background: "#fff", position: "absolute", top: "16px", width: "2px", height: "85px", left: "49px", color: "#fff" }}><span>a</span></span>

                            </div>
                            <div className="general-40">
                                <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                    <Container
                                        onClick={() => handleContainerClick('404-02')}
                                        style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors['404-02'] || "#FFFFFF", marginLeft: "-12px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No401-01">404-02
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                            </div>

                            <div className="general-5">
                                <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                    <Container
                                        onClick={() => handleContainerClick('405-01')}
                                        style={{ transform: "rotate(-90deg)", border: "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors['405-01'] || "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No401-01">405-01
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                                <span style={{ background: "#fff", position: "absolute", top: "16px", width: "2px", height: "85px", left: "49px", color: "#fff" }}><span>a</span></span>

                            </div>
                            <div className="general-50">
                                <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                    <Container
                                        onClick={() => handleContainerClick('405-02')}
                                        style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors['405-02'] || "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No401-01">405-02
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>

                            </div>
                            <div className="general-6" >
                                <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                    <Container
                                        onClick={() => handleContainerClick('406-01')}
                                        style={{ transform: "rotate(-90deg)", border: "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors['406-01'] || "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No401-01">406-01
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                                <span style={{ background: "#fff", position: "absolute", top: "16px", width: "2px", height: "85px", left: "49px", color: "#fff" }}><span>a</span></span>

                            </div>
                            <div className="general-60">
                                <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                    <Container
                                        onClick={() => handleContainerClick('406-02')}
                                        style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors['406-02'] || "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No401-01">406-02
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>

                            </div>
                            <div className="general-7" style={{ top: "908px" }}>
                                <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                    <Container
                                        onClick={() => handleContainerClick('407-01')}
                                        style={{ transform: "rotate(-90deg)", border: "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors['407-01'] || "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No401-01">407-01
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>
                                <span style={{ background: "#fff", position: "absolute", top: "16px", width: "2px", height: "85px", left: "49px", color: "#fff" }}><span>a</span></span>

                            </div>
                            <div className="general-70" style={{ top: "" }}>
                                <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                    <Container
                                        onClick={() => handleContainerClick('407-02')}
                                        style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors['407-02'] || "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                        <span>
                                            <div className="No401-01">407-02
                                                <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                </div>
                                            </div>
                                        </span></Container>
                                </div>

                            </div>
                        </div>
                        <div className="semiprivatecontainer">
                            <div className="semiPrivate">
                                <div className="semiPrivatecontaine0-1">
                                    <div className="semiPrivatebed-1">
                                        <Container
                                            onClick={() => handleContainerClick('101-01')}

                                            style={{ width: "110px", border: "1px solid #C4C5D3", borderRadius: "4px", marginTop: "18px", backgroundColor: containerColors['101-01'] || '#FFFFFF', marginLeft: "15px", marginRight: "15px", height: "35px" }}>
                                            <span>
                                                <div className="No101-01"
                                                >101-01
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-12px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                    <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", marginLeft: "14px", marginRight: "14px", marginTop: "3px", marginBottom: "0px", height: "5px" }}>
                                        <span></span></span>
                                </div>

                                <div className="semiPrivatecontaine0-10">
                                    <div className="semiPrivatebed-1">
                                        <Container
                                            onClick={() => handleContainerClick('101-02')}
                                            style={{ border: "1px solid #C4C5D3", borderRadius: "4px", marginTop: "22px", backgroundColor: containerColors['101-02'] || "#FFFFFF", marginLeft: "15px", marginRight: "15px", height: "35px" }}>
                                            <span>
                                                <div className="No101-02">101-02
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>
                                <div className="semiPrivatecontaine0-2">
                                    <div className="semiPrivatebed-2">
                                        <Container
                                            onClick={() => handleContainerClick('102-01')}
                                            style={{ border: "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "17px", backgroundColor: containerColors['102-01'] || "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-01">102-01
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                    <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", marginLeft: "14px", marginRight: "14px", marginTop: "24px", marginBottom: "0px", height: "5px" }}>
                                        <span></span></span>
                                </div>
                                <div className="semiPrivatecontaine0-20">

                                    <div className="semiPrivatebed-2">
                                        <Container
                                            onClick={() => handleContainerClick('102-02')}
                                            style={{ border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "21px", backgroundColor: containerColors['102-02'] || "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-02">102-02
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>
                                <div className="semiPrivatecontaine0-3">
                                    <div className="semiPrivatebed-3">
                                        <Container
                                            onClick={() => handleContainerClick('103-01')}
                                            style={{ border: "1px solid #CEA5CE", borderRadius: "4px", width: "90px", marginTop: "17px", backgroundColor: containerColors['103-01'] || "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-01">103-01
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                    <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", marginLeft: "14px", marginRight: "14px", marginTop: "24px", marginBottom: "0px", height: "5px" }}>
                                        <span></span></span>
                                </div>
                                <div className="semiPrivatecontaine0-30">
                                    <div className="semiPrivatebed-3">
                                        <Container
                                            onClick={() => handleContainerClick('103-02')}
                                            style={{ border: "1px solid #CDB3CD", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors['103-02'] || "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-02">103-02
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>
                                <div className="semiPrivatecontaine0-4">
                                    <div className="semiPrivatebed-4">
                                        <Container
                                            onClick={() => handleContainerClick('104-01')}
                                            style={{ border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "17px", backgroundColor: containerColors['104-01'] || "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-01">104-01
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                    <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", marginLeft: "14px", marginRight: "14px", marginTop: "24px", marginBottom: "0px", height: "5px" }}>
                                        <span></span></span>
                                </div>
                                <div className="semiPrivatecontaine0-40">
                                    <div className="semiPrivatebed-4">
                                        <Container
                                            onClick={() => handleContainerClick('104-02')}
                                            style={{ border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors['104-02'] || "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-02">104-02
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>
                                <div className="semiPrivatecontaine0-5">
                                    <div className="semiPrivatebed-5">
                                        <Container
                                            onClick={() => handleContainerClick('105-01')}
                                            style={{ border: "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "17px", backgroundColor: containerColors['105-01'] || "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-01">105-01
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                    <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", marginLeft: "14px", marginRight: "14px", marginTop: "24px", marginBottom: "0px", height: "5px" }}>
                                        <span></span></span>
                                </div>
                                <div className="semiPrivatecontaine0-50">
                                    <div className="semiPrivatebed-5">
                                        <Container
                                            onClick={() => handleContainerClick('105-02')}
                                            style={{ border: "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors['105-02'] || "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-02">105-02
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>
                                <div className="semiPrivatecontaine0-6">
                                    <div className="semiPrivatebed-6">
                                        <Container
                                            onClick={() => handleContainerClick('106-01')}
                                            style={{ border: "1px solid #CDB3CD", borderRadius: "4px", width: "90px", marginTop: "17px", backgroundColor: containerColors['106-01'] || "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-01">106-01
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                    <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", marginLeft: "14px", marginRight: "14px", marginTop: "24px", marginBottom: "0px", height: "5px" }}>
                                        <span></span></span>
                                </div>
                                <div className="semiPrivatecontaine0-60">
                                    <div className="semiPrivatebed-6">
                                        <Container
                                            onClick={() => handleContainerClick('106-02')}
                                            style={{ border: "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors['106-02'] || "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-02">106-02
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>
                                <div className="semiPrivatecontaine0-7">
                                    <div className="semiPrivatebed-7">
                                        <Container
                                            onClick={() => handleContainerClick('107-01')}
                                            style={{ border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "17px", backgroundColor: containerColors['107-01'] || "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-01">107-01
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>

                                            </span></Container>
                                    </div>
                                    <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", marginLeft: "14px", marginRight: "14px", marginTop: "24px", marginBottom: "0px", height: "5px" }}>
                                        <span></span></span>
                                </div>
                                <div className="semiPrivatecontaine0-70">
                                    <div className="semiPrivatebed-7">
                                        <Container
                                            onClick={() => handleContainerClick('107-02')}
                                            style={{ border: "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors['107-02'] || "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-02">107-02
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>

                                </div>
                                <div className="general">
                                    <div className="general-1">
                                        <div className="generalBed-3">
                                            <Container
                                                onClick={() => handleContainerClick('401-03')}
                                                style={{ transform: "rotate(-90deg)", border: "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors['401-03'] || "#FFFFFF", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                                <span> <div className="No401-03">401-03
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div></span></Container>
                                        </div>
                                        <span style={{ background: "#fff", position: "absolute", top: "16px", width: "2px", height: "85px", left: "49px", color: "#fff" }}><span>a</span></span>

                                    </div>
                                    <div className="general-10">
                                        <div className="generalBed-4">
                                            <Container
                                                onClick={() => handleContainerClick('401-04')}
                                                style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors['401-04'] || "#FFFFFF", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                                <span> <div className="No401-04">401-04
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div></span></Container>
                                        </div>
                                        <span style={{ background: "#fff", position: "absolute", top: "16px", width: "2px", height: "85px", left: "49px", color: "#fff" }}><span>a</span></span>

                                    </div>
                                    <div className="general-2">

                                        <div className="generalBed-3">
                                            <Container
                                                onClick={() => handleContainerClick('402-03')}
                                                style={{ transform: "rotate(-90deg)", border: "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors['402-03'] || "#FFFFFF", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No401-01">402-03
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                        <span style={{ background: "#fff", position: "absolute", top: "16px", width: "2px", height: "85px", left: "49px", color: "#fff" }}><span>a</span></span>

                                    </div>
                                    <div className="general-20">
                                        <div className="generalBed-4">
                                            <Container
                                                onClick={() => handleContainerClick('402-04')}
                                                style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors['402-04'] || "#FFFFFF", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No401-01">402-04
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                    </div>
                                    <div className="general-3">

                                        <div className="generalBed-3">
                                            <Container
                                                onClick={() => handleContainerClick('403-03')}
                                                style={{ transform: "rotate(-90deg)", border: "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors['403-03'] || "#FFFFFF", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No401-01">403-03
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                        <span style={{ background: "#fff", position: "absolute", top: "16px", width: "2px", height: "85px", left: "49px", color: "#fff" }}><span>a</span></span>

                                    </div>
                                    <div className="general-30">
                                        <div className="generalBed-4">
                                            <Container
                                                onClick={() => handleContainerClick('403-04')}
                                                style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors['403-04'] || "#FFFFFF", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No401-01">403-04
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                        <span style={{ background: "#fff", position: "absolute", top: "16px", width: "2px", height: "85px", left: "49px", color: "#fff" }}><span>a</span></span>

                                    </div>
                                    <div className="general-4">

                                        <div className="generalBed-3">
                                            <Container
                                                onClick={() => handleContainerClick('404-03')}
                                                style={{ transform: "rotate(-90deg)", border: "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors['404-03'] || "#FFFFFF", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No401-01">404-03
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                        <span style={{ background: "#fff", position: "absolute", top: "16px", width: "2px", height: "85px", left: "49px", color: "#fff" }}><span>a</span></span>

                                    </div>
                                    <div className="general-40">
                                        <div className="generalBed-4">
                                            <Container
                                                onClick={() => handleContainerClick('404-04')}
                                                style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors['404-04'] || "#FFFFFF", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No401-01">404-04
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                    </div>
                                    <div className="general-5">

                                        <div className="generalBed-3">
                                            <Container
                                                onClick={() => handleContainerClick('405-03')}
                                                style={{ transform: "rotate(-90deg)", border: "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors['405-03'] || "#FFFFFF", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No401-01">405-03
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                        <span style={{ background: "#fff", position: "absolute", top: "16px", width: "2px", height: "85px", left: "49px", color: "#fff" }}><span>a</span></span>

                                    </div>
                                    <div className="general-50">
                                        <div className="generalBed-4">
                                            <Container
                                                onClick={() => handleContainerClick('405-04')}
                                                style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors['405-04'] || "#FFFFFF", marginLeft: "-20px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No401-01">405-04
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                    </div>
                                    <div className="general-6" >
                                        <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                            <Container
                                                onClick={() => handleContainerClick('406-03')}
                                                style={{ transform: "rotate(-90deg)", border: "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors['406-03'] || "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No401-01">406-03
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                        <span style={{ background: "#fff", position: "absolute", top: "16px", width: "2px", height: "85px", left: "49px", color: "#fff" }}><span>a</span></span>

                                    </div>
                                    <div className="general-60">
                                        <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                            <Container
                                                onClick={() => handleContainerClick('406-04')}
                                                style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors['406-04'] || "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No401-01">406-04
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>

                                    </div>
                                    <div className="general-7" style={{ top: "908px" }}>
                                        <div className="generalBed-1" style={{ position: "relative", left: "-9px" }}>
                                            <Container
                                                onClick={() => handleContainerClick('407-03')}
                                                style={{ transform: "rotate(-90deg)", border: "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors['407-03'] || "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No401-01">407-03
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>
                                        <span style={{ background: "#fff", position: "absolute", top: "16px", width: "2px", height: "85px", left: "49px", color: "#fff" }}><span>a</span></span>

                                    </div>
                                    <div className="general-70" style={{ top: "" }}>
                                        <div className="generalBed-2" style={{ position: "relative", left: "-9px" }}>
                                            <Container
                                                onClick={() => handleContainerClick('407-04')}
                                                style={{ transform: "rotate(-90deg)", border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "40px", backgroundColor: containerColors['407-04'] || "#FFFFFF", marginLeft: "-11px", marginRight: "", height: "35px" }}>
                                                <span>
                                                    <div className="No401-01">407-04
                                                        <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                        </div>
                                                    </div>
                                                </span></Container>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="Pri">
                            <div className="semiPrivates" style={{ top: "702px" }}>
                                <div className="semiPrivatecontaine0-1">
                                    <div className="semiPrivatebed-1">
                                        <Container
                                            onClick={() => handleContainerClick('208 - 01')}

                                            style={{ width: "110px", border: "1px solid #C4C5D3", borderRadius: "4px", marginTop: "18px", backgroundColor: containerColors['208 - 01'] || '#FFFFFF', marginLeft: "15px", marginRight: "15px", height: "35px" }}>
                                            <span>
                                                <div className="No101-01"
                                                >208 - 01
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-12px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                    <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", marginLeft: "14px", marginRight: "14px", marginTop: "3px", marginBottom: "0px", height: "5px" }}>
                                        <span></span></span>
                                </div>
                                <div className="semiPrivatecontaine0-10">
                                    <div className="semiPrivatebed-1">
                                        <Container
                                            onClick={() => handleContainerClick('201 - 01')}
                                            style={{ border: "1px solid #C4C5D3", borderRadius: "4px", marginTop: "22px", backgroundColor: containerColors['201 - 01'] || "#FFFFFF", marginLeft: "15px", marginRight: "15px", height: "35px" }}>
                                            <span>
                                                <div className="No101-02">201 - 01
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>
                                <div className="semiPrivatecontaine0-2">
                                    <div className="semiPrivatebed-2">
                                        <Container
                                            onClick={() => handleContainerClick('209 - 01')}
                                            style={{ border: "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "17px", backgroundColor: containerColors['209 - 01'] || "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-01">209 - 01
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                    <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", marginLeft: "14px", marginRight: "14px", marginTop: "24px", marginBottom: "0px", height: "5px" }}>
                                        <span></span></span>
                                </div>
                                <div className="semiPrivatecontaine0-20">

                                    <div className="semiPrivatebed-2">
                                        <Container
                                            onClick={() => handleContainerClick('202 - 01')}
                                            style={{ border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "21px", backgroundColor: containerColors['202 - 01'] || "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-02">202 - 01
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>
                                <div className="semiPrivatecontaine0-3">
                                    <div className="semiPrivatebed-3">
                                        <Container
                                            onClick={() => handleContainerClick('210 - 01')}
                                            style={{ border: "1px solid #CEA5CE", borderRadius: "4px", width: "90px", marginTop: "17px", backgroundColor: containerColors['210 - 01'] || "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-01">210 - 01
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                    <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", marginLeft: "14px", marginRight: "14px", marginTop: "24px", marginBottom: "0px", height: "5px" }}>
                                        <span></span></span>
                                </div>
                                <div className="semiPrivatecontaine0-30">
                                    <div className="semiPrivatebed-3">
                                        <Container
                                            onClick={() => handleContainerClick('203 - 01')}
                                            style={{ border: "1px solid #CDB3CD", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors['203 - 01'] || "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-02">203 - 01
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>
                                <div className="semiPrivatecontaine0-4">
                                    <div className="semiPrivatebed-4">
                                        <Container
                                            onClick={() => handleContainerClick('211 - 01')}
                                            style={{ border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "17px", backgroundColor: containerColors['211 - 01'] || "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-01">211 - 01
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                    <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", marginLeft: "14px", marginRight: "14px", marginTop: "24px", marginBottom: "0px", height: "5px" }}>
                                        <span></span></span>
                                </div>
                                <div className="semiPrivatecontaine0-40">
                                    <div className="semiPrivatebed-4">
                                        <Container
                                            onClick={() => handleContainerClick('204 - 01')}
                                            style={{ border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors['204 - 01'] || "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-02">204 - 01
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>
                                <div className="semiPrivatecontaine0-5">
                                    <div className="semiPrivatebed-5">
                                        <Container
                                            onClick={() => handleContainerClick('212 - 01')}
                                            style={{ border: "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "17px", backgroundColor: containerColors['212 - 01'] || "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-01">212 - 01
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                    <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", marginLeft: "14px", marginRight: "14px", marginTop: "24px", marginBottom: "0px", height: "5px" }}>
                                        <span></span></span>
                                </div>
                                <div className="semiPrivatecontaine0-50">
                                    <div className="semiPrivatebed-5">
                                        <Container
                                            onClick={() => handleContainerClick('205 - 01')}
                                            style={{ border: "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors['205 - 01'] || "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-02">205 - 01
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>
                                <div className="semiPrivatecontaine0-6">
                                    <div className="semiPrivatebed-6">
                                        <Container
                                            onClick={() => handleContainerClick('213 - 01')}
                                            style={{ border: "1px solid #CDB3CD", borderRadius: "4px", width: "90px", marginTop: "17px", backgroundColor: containerColors['213 - 01'] || "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-01">213 - 01
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                    <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", marginLeft: "14px", marginRight: "14px", marginTop: "24px", marginBottom: "0px", height: "5px" }}>
                                        <span></span></span>
                                </div>
                                <div className="semiPrivatecontaine0-60">
                                    <div className="semiPrivatebed-6">
                                        <Container
                                            onClick={() => handleContainerClick('206 - 01')}
                                            style={{ border: "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors['206 - 01'] || "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-02">206 - 01
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>
                                </div>
                                <div className="semiPrivatecontaine0-7">
                                    <div className="semiPrivatebed-7">
                                        <Container
                                            onClick={() => handleContainerClick('214 - 01')}
                                            style={{ border: "1px solid #B4B5D1", borderRadius: "4px", width: "90px", marginTop: "17px", backgroundColor: containerColors['214 - 01'] || "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-01">214 - 01
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-13px" }}><span><span></span></span>
                                                    </div>
                                                </div>

                                            </span></Container>
                                    </div>
                                    <span style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", marginLeft: "14px", marginRight: "14px", marginTop: "24px", marginBottom: "0px", height: "5px" }}>
                                        <span></span></span>
                                </div>
                                <div className="semiPrivatecontaine0-70">
                                    <div className="semiPrivatebed-7">
                                        <Container
                                            onClick={() => handleContainerClick('207 - 01')}
                                            style={{ border: "1px solid #C4C5D3", borderRadius: "4px", width: "90px", marginTop: "18px", backgroundColor: containerColors['207 - 01'] || "#FFFFFF", marginLeft: "12px", marginRight: "", height: "35px" }}>
                                            <span>
                                                <div className="No101-02">207 - 01
                                                    <div style={{ borderRadius: "4px", marginLeft: "-28px", backgroundColor: "#FFFFFF", border: "1px solid #C4C5D3", width: "25px", height: "7px", transform: "rotate(-90deg)", marginTop: "-15px" }}><span><span></span></span>
                                                    </div>
                                                </div>
                                            </span></Container>
                                    </div>

                                </div>

                            </div>
                        </div>

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

                        label="continue"
                        primaryButtonCursor="pointer"

                    />
                </div>
            </div>


        </>
    );

};
const mapStateToProps = (state: any) => {
    const { deviceFormData, createOrganizationData } = state;
    return {
        deviceFormData, createOrganizationData
    };
};

export default connect(mapStateToProps)(PatientBedAssignment)




