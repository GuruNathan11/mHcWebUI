import { Checkbox } from "primereact/checkbox";
import React, { Dispatch, useState, useEffect } from "react";

import { connect } from "react-redux";
import SampleDataJSON from '../../../assets/data/SampleData.json'

import { FormContext } from '../../../FormContext';
import loaddingFile from '../../../../src/assets/images/tenor.gif';
import Element from "./Element";
import { Button } from 'primereact/button';

interface ICreteNewForm {}
interface ICreteNewForm {
    StaticPage: any;

    state: {
      nodes: [],
      checked: [],
      expanded: []
    }
}
const  CreteNewForm: React.FC<ICreteNewForm> = ({
 

    
}) => {

  const [spinner, setSpinner] = useState(false); 
  const [elements, setElements] = useState(null);
  useEffect(() => {
    setElements(SampleDataJSON[0])

  }, [])
 // console.log(JSON.stringify(elements))
  const { fields, page_label } = elements ?? {}
  const handleSubmit = (event) => {
    event.preventDefault();

   // console.log(elements)
  }
  const handleChange = (id, event) => {
    const newElements = { ...elements }
    newElements.fields.forEach(field => {
      const { fieldType, id } = field;
      if (id === id) {
        switch (fieldType) {
          case 'checkbox':
            field['fieldValue'] = event.target.checked;
            break;

          default:
            field['fieldValue'] = event.target.value;
            break;
        }


      }
      setElements(newElements)
    });
  //  console.log(elements)
  }
  
  return  (
    <div className="p-col-12" >
        {spinner &&
                (<div className='overlay-content'>
            <div className='wrapper'>
                <img src={loaddingFile} style={{position:'absolute',width:'100%',zIndex:2,opacity:'0.5'}}/>
            </div>
        </div>        
                            )} 
   <div className="p-col-12 p-md-12">
        <h2 className="dashboard-title"><b>{page_label}</b> </h2>
      </div>
      <div id="removePaddingTop" className="p-col-12">
      <FormContext.Provider value={{ handleChange }}>
        <div style={{ border: '0px' }} className="card card-w-title p-grid">
      
          {fields ? fields.map((field, i) => <Element key={i} field={field} />) : null}
          <div style={{display:'flex'}} className="p-col-12 p-md-12">
          <div className="p-col-12 p-md-4">     </div>
          <div style={{textAlign:'center'}} className="p-col-12 p-md-4"><Button label="Save" icon="pi pi-save" onClick={(e) => handleSubmit(e)} style={{ width: "fit-content" }} /></div>
          <div className="p-col-12 p-md-4">     </div>
          </div>
       
        </div>        
        </FormContext.Provider>
       
        </div>
      </div>
    );
        
    
};
const mapStateToProps = (state: any) => {
    const { deviceFormData,I907FormData } = state;
    return {
        deviceFormData,I907FormData
    };
};
export default connect(mapStateToProps)(CreteNewForm)