import React, { useContext } from 'react'
import { FormContext } from '../../../../FormContext';
const Option = ({ fieldOptions,fieldSelect,fieldId,fieldSize,fieldLabel }) => {
    const { handleChange } = useContext(FormContext)
    if(fieldSize === "Small"){
        return (
            <>
            <div id="removePadding" className="p-col-12 p-md-3" style={{fontFamily:"Times New Roman",color: "#8494B7",fontSize:'15px',fontWeight:"lighter",textAlign:"justify"}}>{fieldLabel}</div>
            {fieldOptions.length>0 && fieldOptions.map((item,i)=>
                <>
                 <div id="removePadding" className="p-col-12 p-md-1">
                    <input type="radio" checked={item.optionValue} id={fieldSelect} style={{height:'21px',width:'24px'}}
                        onChange={(event) => handleChange(item.optionLabel, event,fieldId)}
                    />
                  
                    </div>            
                    <div id="removePadding" className="p-col-12 p-md-2" style={{fontFamily:"Times New Roman", color: "#8494B7",fontSize:'15px',fontWeight:400}}><span style={{marginLeft:'-27px'}}>{item.optionLabel}</span></div>                   
                    </>
                )}
                     </>
        )
    }
    else if(fieldSize === "Medium"){
        return (
            <>
            <div id="removePadding" className="p-col-12 p-md-6" style={{color: "#8494B7",fontFamily:"Times New Roman",fontSize:'15px',fontWeight:"lighter",textAlign:"justify",position:"relative",left:"79px",width:"calc(100% - 195px)"}}>{fieldLabel}</div>
            {fieldOptions.length>0 && fieldOptions.map((item,i)=>
                <>
                 <div id="removePadding" className="p-col-12 p-md-1">
                    <input type="radio" checked={item.optionValue} id={fieldSelect} style={{height:'21px',width:'24px'}}
                        onChange={(event) => handleChange(item.optionLabel, event,fieldId)}
                    />
                  
                    </div>            
                    <div id="removePadding" className="p-col-12 p-md-5" style={{fontFamily:"Times New Roman",fontSize:'15px', color: "#8494B7",fontWeight:400}}><span style={{marginLeft:'-27px'}}>{item.optionLabel}</span></div>                   
                    </>
                )}
                     </>
        )
        }else{
            return (
                <>
                <div id="removePadding" className="p-col-12 p-md-12" style={{position:"relative",left:"15px", color: "#8494B7",fontSize:"20px",fontFamily:"Times New Roman, Times, serif",color: "#8494B7"}}>{fieldLabel}</div>
                {fieldOptions.length>0 && fieldOptions.map((item,i)=>
                    <>
                     <div id="removePadding" className="p-col-12 p-md-1" style={{position:'relative',left:'15px'}}>
                        <input type="radio" checked={item.optionValue} id={fieldSelect} style={{height:'21px',width:'24px'}}
                            onChange={(event) => handleChange(item.optionLabel, event,fieldId)}
                        />
                      
                        </div>            
                        <div id="removePadding" className="p-col-12 p-md-11" style={{fontFamily:"Times New Roman", color: "#8494B7",fontSize:'15px',fontWeight:400}}><span style={{marginLeft:'-27px'}}>{item.optionLabel}</span></div>
                        </>
                    )}
                         </>
            )
        }

   
   
}

export default Option