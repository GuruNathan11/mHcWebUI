import React, { useContext, useState } from 'react'
import { FormContext } from '../../../../FormContext';
import './input.css';
// import { Select } from 'antd';

const Input = ({ fieldId, fieldLabel, fieldPlaceholder, fieldValue, fieldSize }) => {
    const { handleChange } = useContext(FormContext)
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(true);
    }
    if (fieldSize === "Small") {
        return (
            //<>
            //      <div id="removePadding" className="p-col-12 p-md-2" style={{fontFamily:"Times New Roman",fontSize:'20px',fontWeight:700}}><span>{fieldLabel}</span></div>
            //      <div id="removePadding" className="p-col-12 p-md-4">
            //     <input type="text" className='orgName' style={{width:'-webkit-fill-available',fontSize:'20px'}}
            //         placeholder={fieldPlaceholder ? fieldPlaceholder : ''}
            //         value={fieldValue}
            //         onChange={(event,i) => handleChange(fieldId, event,i)}
            //     />
            //       </div>
            // </>
            <>
                {/*<div id="PaddingRemove" className="p-col-12 p-md-1" style={{ fontFamily: "Times New Roman", fontSize: '15px', fontWeight: 400,color: "#8494B7" ,position:'relative',left:"72px",height:"27px" ,whiteSpace:"nowrap"}}><span>{fieldLabel}</span></div>*/}
                <div id="inputSmallFormPadding" className="p-col-12 p-md-4" style={{position:"relative",left:"12px",display:"flex",flexDirection:"column",top:"0px",width:"calc(100% - 760px)"}}><span style={{fontSize:"20px",fontFamily:"Times New Roman, Times, serif",color: "#8494B7"}}>{fieldLabel}</span>
                    <input value={fieldValue} type="text"
                        className="floating__input"
                        onChange={(event, i) => handleChange(fieldId, event, i)}
                        style={{ width: '110%', fontSize: '20px', height: isVisible ? "81%" : "" }}
                        placeholder={fieldPlaceholder ? fieldPlaceholder : ''} />
                    
                </div >
            </>

        )
    }
    else if (fieldSize === "Medium") {
        return (
            //<>
            //      <div id="removePadding" className="p-col-12 p-md-2" style={{fontFamily:"Times New Roman",fontSize:'20px',fontWeight:700}}><span>{fieldLabel}</span></div>
            //      <div id="removePadding" className="p-col-12 p-md-4">
            //     <input type="text" className='orgName' style={{width:'-webkit-fill-available',fontSize:'20px'}}
            //         placeholder={fieldPlaceholder ? fieldPlaceholder : ''}
            //         value={fieldValue}
            //         onChange={(event,i) => handleChange(fieldId, event,i)}
            //     />
            //       </div>
            // </>
            <>
                
                <div id="inputMediumFormPadding" className="p-col-12 p-md-6" style={{position:"relative",left:"2px",display:"flex",flexDirection:"column",top:"0px",width:"calc(100% - 603px)"}}><span style={{fontSize:"20px",fontFamily:"Times New Roman, Times, serif",color: "#8494B7",position:"relative",left:"10px"}}>{fieldLabel}</span>
                    <input value={fieldValue} type="text"
                        className="floating__input"
                        onChange={(event, i) => handleChange(fieldId, event, i)}
                        style={{ width: '123%', fontSize: '20px', height: isVisible ? "81%" : "",position:"relative",left:"10px" }}
                        placeholder={fieldPlaceholder ? fieldPlaceholder : ''} />
                    
                </div >
            </>

        )
    } else {
        return (
            // <>
            //      <div id="removePadding" className="p-col-12 p-md-6" style={{fontFamily:"Times New Roman",fontSize:'20px',fontWeight:700}}><span>{fieldLabel}</span></div>
            //      <div id="removePadding" className="p-col-12 p-md-6">
            //     <input type="text" className='orgName' style={{width:'-webkit-fill-available',fontSize:'20px'}}
            //         placeholder={fieldPlaceholder ? fieldPlaceholder : ''}
            //         value={fieldValue}
            //         onChange={event => handleChange(fieldId, event)}
            //     />
            //       </div>
            // </>
            <>
                
                <div id="PaddingRemove" className="p-col-12 p-md-12" style={{position:"relative",left:"2px",display:"flex",flexDirection:"column"}}><span style={{fontSize:"20px",fontFamily:"Times New Roman, Times, serif",color: "#8494B7",position:"relative",left:"10px"}}>{fieldLabel}</span>
                    <input value={fieldValue} type="text"
                        style={{ width: 'calc(100% - 137px)', fontSize: '20px', height: isVisible ? "81%" : "" ,position:"relative",left:"10px"}}
                        className="floating__input"
                        onChange={(event, i) => handleChange(fieldId, event, i)}
                        placeholder={fieldPlaceholder ? fieldPlaceholder : ''}
                    />
           
                </div>
            </>
        )
    }
}

export default Input;