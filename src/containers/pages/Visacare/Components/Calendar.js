import React, { useContext, useState } from 'react'
import { FormContext } from '../../../../FormContext';
import './input.css';
const Calendar = ({ fieldId, fieldLabel, fieldPlaceholder, fieldValue, fieldSize }) => {
    const { handleChange } = useContext(FormContext)
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(true);
    }
    if (fieldSize === "Small") {
        return (
            <>
                {/* <div id="PaddingRemove" className="p-col-12 p-md-2" style={{ fontFamily: "Times New Roman", fontSize: '15px', fontWeight: 400 ,color: "#8494B7" ,top:"-25px",position:'relative',left:"67px",height:"27px"}}></div> */}
                <div id="PaddingRemove" className="p-col-12 p-md-4" style={{position:"relative",left:"1px",top:'2px',display:"flex",flexDirection:"column",width:"calc(100% - 791px)"}}><span  style={{position:"relative",left:"15px",fontSize:"20px",fontFamily:"Times New Roman, Times, serif",color: "#8494B7"}}>{fieldLabel}</span>
                    <input type="date" className='floating__input' style={{width: '71%', fontFamily: "Times New Roman", fontSize: '18px', fontWeight: "lighter", textAlign: "justify", height: '76%',position:"relative",left:"10px" }}
                        placeholder={fieldPlaceholder ? fieldPlaceholder : ''}
                        onClick={toggleVisibility}
                        value={fieldValue}
                        onChange={(event, i) => handleChange(fieldId, event, i)}
                    />
                    {/* {isVisible && (
                        <div style={{ backgroundColor: "#ffffff", position: "relative", top: "-75px", left: "14px", width: "fit-content" }}>DD/MM/YYYY</div>
                    )} */}
                     {/* <label for="input__username" className="floating__label" data-content={fieldPlaceholder}>
                        <span className="hidden--visually"></span></label> */}
                </div>

            </>
        )
    }  else if (fieldSize === "Medium") {
        return (
            <>
                {/* <div id="PaddingRemove" className="p-col-12 p-md-2" style={{ fontFamily: "Times New Roman", fontSize: '15px', fontWeight: 400 ,color: "#8494B7" ,top:"-25px",position:'relative',left:"67px",height:"27px"}}></div> */}
                <div id="dateMediumFormPadding" className="p-col-12 p-md-6" style={{position:"relative",left:"1px",top:'2px',width:"calc(100% - 603px)"}}><span  style={{position:"relative",left:"15px",fontSize:"20px",fontFamily:"Times New Roman, Times, serif",color: "#8494B7"}}>{fieldLabel}</span>
                    <input type="date" className='floating__input' style={{ width: '123%', fontFamily: "Times New Roman", fontSize: '18px', fontWeight: "lighter", textAlign: "justify", height: '76%',position:"relative",left:"10px" }}
                        placeholder={fieldPlaceholder ? fieldPlaceholder : ''}
                        onClick={toggleVisibility}
                        value={fieldValue}
                        onChange={(event, i) => handleChange(fieldId, event, i)}
                    />
                    {/* {isVisible && (
                        <div style={{ backgroundColor: "#ffffff", position: "relative", top: "-75px", left: "14px", width: "fit-content" }}>DD/MM/YYYY</div>
                    )} */}
                     {/* <label for="input__username" className="floating__label" data-content={fieldPlaceholder}>
                        <span className="hidden--visually"></span></label> */}
                </div>

            </>
        )
    }else {
        return (
            <>
                {/* <div id="PaddingRemove" className="p-col-12 p-md-6" style={{ fontFamily: "Times New Roman", fontSize: '15px', fontWeight: 700,top:"-25px",position:'relative',left:"67px",height:"27px" }}></div> */}
                <div id="PaddingRemove" className="p-col-12 p-md-12" style={{position:"relative",left:"-107px",top:'2px',display:"flex",flexDirection:"column"}}><span style={{position:"relative",left:"118px",fontSize:"20px",fontFamily:"Times New Roman, Times, serif",color: "#8494B7"}}>{fieldLabel}</span>
                    <input type="date" className='floating__input' style={{ width:'calc(100% - 106px)', fontFamily: "Times New Roman", fontSize: '20px', fontWeight: "lighter", textAlign: "justify", height: '76%',position:"relative",left:"119px" }}
                        placeholder={fieldPlaceholder ? fieldPlaceholder : ''}
                        onClick={toggleVisibility}
                        value={fieldValue}
                        onChange={event => handleChange(fieldId, event)}
                    />
                    {/* {isVisible && (
                        <div style={{ backgroundColor: "#ffffff", position: "relative", top: "-75px", left: "14px", width: "fit-content" }}>DD/MM/YYYY</div>
                    )} */}
                     {/* <label for="input__username" className="floating__label" data-content={fieldPlaceholder}>
                        <span className="hidden--visually"></span></label> */}
                </div>

            </>
        )
    }
}

export default Calendar