
import React, { useState, useCallback, Dispatch, useEffect } from "react";
import "./../Bed/BedMasterConfiguration.css";
import { connect } from "react-redux";
interface IForm { }
interface IForm {
    StaticPage: any;
    dispatch: Dispatch<any>;
    match: any;
    getAllergyByPatientInputIdData: any;
    createPatientAllergyData: any;
    updatePatientAllergyData: any;
    getAllStaffData: any;
    state: {
        nodes: [],
        checked: [],
        expanded: []
    }
}
const Form: React.FC<IForm> = ({
    dispatch, match, getAllergyByPatientInputIdData, getAllStaffData, createPatientAllergyData, updatePatientAllergyData


}) => {




    // useEffect(() => {

    // }, []);

    const [isVisible, setIsVisible] = useState(false);
    const toggleEvent = () => {
        setIsVisible(true);
        if (isVisible) {
            setIsVisible(false);
        }

    }
    const [activeTab, setActiveTab] = useState('tab1');
    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <>
            <div style={{ position: "absolute", top: '3px', backgroundColor: "#EAF2FA", height: "768px", left: "2px", width: "300px" }}>
                <div onClick={toggleEvent} style={{ cursor: "pointer", position: "absolute", top: "46px", backgroundColor: "#DFE8FF", width: "252px", height: "55px", left: "22px", borderRadius: "4px" }}>
                    <div onClick={() => handleTabChange('tab1')} className={activeTab === 'tab1' ? 'active' : ''} style={{ position: "absolute", top: "10px" }}><i style={{ position: "relative", top: "7px", transform: isVisible ? "rotate(90deg)" : "" }} className="large material-icons" >chevron_right</i>HEADER</div>
                </div>
            </div>
            {isVisible && (
                <div style={{ position: "absolute", top: "112px", left: "48px", display: "flex", flexDirection: "column", gap: "22px" }}>
                    <div onClick={() => handleTabChange('tab2')} className={activeTab === 'tab2' ? 'active' : ''} style={{ cursor: "pointer" }}>PURPOSE</div>
                    <div onClick={() => handleTabChange('tab3')} className={activeTab === 'tab3' ? 'active' : ''} style={{ cursor: "pointer" }}>SCOPE</div>
                    <div onClick={() => handleTabChange('tab4')} className={activeTab === 'tab4' ? 'active' : ''} style={{ cursor: "pointer" }}>POLICY</div>
                    <div onClick={() => handleTabChange('tab5')} className={activeTab === 'tab5' ? 'active' : ''} style={{ cursor: "pointer" }}>PROCEDURE</div>
                </div>
            )}

            {activeTab === 'tab1' && <div style={{ position: "absolute", left: "303px", top: "11px", height: "759px", backgroundColor: "white", width: "-webkit-fill-available" }}>
                <div style={{ display: "flex", width: "calc(100% - 270px)", justifyContent: "space-between", top: "20px", left: "133px", position: "absolute", border: "2px groove #cfcde5", height: "51px", lineHeight: 3.5 }}>
                    <div style={{ width: "133px", borderRightStyle: "groove" }}><span style={{ position: "relative", left: "5px" }}>Institution Name:</span></div>
                    <div style={{ position: "relative", left: "-46px", borderRightStyle: "groove", width: "292px" }}><span>behaviora Center of Michigan (BCOM)</span></div>
                    <div style={{ position: "relative", left: "-100px", borderRightStyle: "groove", width: "111px" }}><span>Policy Title:</span></div>
                    <div style={{ position: "relative", left: "-85px" }}><span style={{ position: "relative", left: "-5px" }}>Belongings Room Key</span></div>
                </div>
                <div style={{ display: "flex", width: "calc(100% - 270px)", justifyContent: "space-between", top: "69px", left: "133px", position: "absolute", border: "2px groove #cfcde5", height: "51px", lineHeight: 3.5 }}>
                    <div style={{ width: "133px", borderRightStyle: "groove" }}><span style={{ position: "relative", left: "5px" }}>Policy Number:</span></div>
                    <div style={{ position: "relative", left: "-60px", borderRightStyle: "groove", width: "292px" }}><span>EOC-1.18A</span></div>
                    <div style={{ position: "relative", left: "-127px", borderRightStyle: "groove", width: "111px" }}><span>Effective Date:</span></div>
                    <div style={{ position: "relative", left: "-125px" }}><span style={{ position: "relative", left: "-5px" }}>October 1 2005</span></div>
                </div>
                <div style={{ display: "flex", width: "calc(100% - 270px)", justifyContent: "space-between", top: "118px", left: "133px", position: "absolute", border: "2px groove #cfcde5", height: "51px", lineHeight: 3.5 }}>
                    <div style={{ width: "133px", borderRightStyle: "groove" }}><span style={{ position: "relative", left: "5px" }}>Department:</span></div>
                    <div style={{ position: "relative", left: "-12px", width: "768px" }}><span>Environment Of Care</span></div>
                </div>
            </div>}
            {activeTab === 'tab2' && <div style={{ position: "absolute", left: "303px", top: "11px", height: "759px", backgroundColor: "white", width: "-webkit-fill-available" }}>
                <div style={{ position: "absolute", top: "70px", left: "30px" }}>
                    <div>To ensure the security of the belongings </div>
                </div>
            </div>}
            {activeTab === 'tab3' && <div style={{ position: "absolute", left: "303px", top: "11px", height: "759px", backgroundColor: "white", width: "-webkit-fill-available" }}>
                <div style={{ position: "absolute", top: "70px", left: "30px" }}>
                    <div>This policy covers every employee who works for the Behavioral Center of Michigan </div>
                </div>
            </div>}
            {activeTab === 'tab4' && <div style={{ position: "absolute", left: "303px", top: "11px", height: "759px", backgroundColor: "white", width: "-webkit-fill-available" }}>
                <div style={{ position: "absolute", top: "70px", left: "30px" }}>
                    <div style={{ lineHeight: 2.5 }}>
                        Apatient belongings Key is placed behind nursing station. 1St and 3rd floor,s Key is<br />
                        place in Medication room, 2nd floor is placed in the charting room
                    </div>
                </div>
            </div>}
            {activeTab === 'tab5' && <div style={{ position: "absolute", left: "303px", top: "11px", height: "759px", backgroundColor: "white", width: "-webkit-fill-available" }}>
                <div style={{ position: "absolute", top: "70px", left: "30px" }}>
                    <div style={{ lineHeight: 2.5 }}>
                        A. The belongings room Key is to signed out every time that it is used ,time out and time<br />
                        in.Every shift charge nurse will make sure that the key is properly placed in the <br />designated area and will be signed off.
                    </div>
                    <div style={{ lineHeight: 2.5 }}>
                        B. MHT's must ask for the key from the charge nurse each time it is needed, and returned <br />to the charge nurse when finished when finished using it.
                    </div>
                    <div style={{ lineHeight: 2.5 }}>
                        C. Charge nurses are responsible if this Key is lost. And will result in disciplinary action
                    </div>
                </div>
            </div>}
        </>
    );

};
const mapStateToProps = (state: any) => {
    const { deviceFormData, getAllergyByPatientInputIdData, getAllStaffData, createPatientAllergyData, updatePatientAllergyData } = state;
    return {
        deviceFormData, getAllergyByPatientInputIdData, getAllStaffData, createPatientAllergyData, updatePatientAllergyData
    };
};

export default connect(mapStateToProps)(Form)




