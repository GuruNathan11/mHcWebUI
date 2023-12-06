import React, { useContext } from 'react'
import { FormContext } from '../../../../FormContext';

const Select = ({ fieldId, fieldLabel, fieldPlaceholder, fieldValue, fieldOptions, fieldSize }) => {
    const { handleChange } = useContext(FormContext)
    if (fieldSize === "Small") {
        return (
            <>
                {/* <div id="removePadding" className="p-col-12 p-md-2" style={{ fontFamily: "Times New Roman", fontSize: '20px', fontWeight: 700,position:"relative",left:"77px",position:"relative",left:"76px",color:"rgb(132, 148, 183)" }}></div> */}
                <div id="selectSmallFormPadding" className="p-col-12 p-md-4 "><span style={{position:"relative",left:"9px",fontSize:"20px",fontFamily:"Times New Roman, Times, serif",color: "#8494B7"}}>{fieldLabel}</span>
                    <select className='floating__input' style={{ width: '110%', fontFamily: "Times New Roman", fontSize: '18px', fontWeight: "lighter", textAlign: "justify", height: '76%',position:"relative",left:"10px" }}
                     placeholder={fieldPlaceholder}  value={fieldValue} onChange={(event, i) => handleChange(fieldId, event, i)}
                    >
                        <option style={{ fontFamily: 'Times New Roman',fontSize:"20px" }} value="">Select</option>
                        {fieldOptions.length > 0 && fieldOptions.map((option, i) =>
                            <option value={option.optionLabel} key={i}>{option.optionLabel}</option>

                        )}
                    </select>
                </div>
            </>
        )

    } else if (fieldSize === "Medium") {
        return (
            <>
                
                <div id="selectMediumFormPadding" className="p-col-12 p-md-6" style={{position:"relative",left:"2px",display:"flex",flexDirection:"column",top:"0px",width:"calc(100% - 603px)"}}><span style={{fontSize:"20px",fontFamily:"Times New Roman, Times, serif",color: "#8494B7",position:"relative",left:"10px"}}>{fieldLabel}</span>
                    <select className='floating__input'   style={{ width: '123%', fontFamily:"Times New Roman, Times, serif", fontSize: '20px', height: "81%" ,position:"relative",left:"10px" }}
                      placeholder={fieldPlaceholder} value={fieldValue} onChange={(event, i) => handleChange(fieldId, event, i)}
                    >
                        <option style={{ fontFamily:"Times New Roman, Times, serif", fontSize: '20px'}} value="">Select</option>
                        {fieldOptions.length > 0 && fieldOptions.map((option, i) =>
                            <option style={{ fontFamily:"Times New Roman, Times, serif", fontSize: '20px'}} value={option.optionLabel} key={i}>{option.optionLabel}</option>

                        )}
                    </select>
                </div>
                
            </>
        )
    } else {
        return (
            <>
                
                <div id="removePadding" className="p-col-12 p-md-12" style={{position:"relative",left:"8px",display:"flex",flexDirection:"column"}}><span style={{fontSize:"20px",fontFamily:"Times New Roman, Times, serif",color: "#8494B7",position:"relative",left:"10px"}}>{fieldLabel}</span>
                    <select className='floating__input' style={{ width:'calc(100% - 149px)',  fontFamily:"Times New Roman, Times, serif", fontSize: '20px',  height: "81%" ,position:"relative",left:"10px"}}
                      placeholder={fieldPlaceholder} value={fieldValue} onChange={(event, i) => handleChange(fieldId, event, i)}
                    >
                        <option style={{ fontFamily:"Times New Roman, Times, serif", fontSize: '20px'}} value="">Select</option>
                        {fieldOptions.length > 0 && fieldOptions.map((option, i) =>
                            <option style={{ fontFamily:"Times New Roman, Times, serif", fontSize: '20px'}} value={option.optionLabel} key={i}>{option.optionLabel}</option>

                        )}
                    </select>
                </div>
            </>
        )
    }
}

export default Select