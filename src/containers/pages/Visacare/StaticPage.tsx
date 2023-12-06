import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import resume from './../../../assets/data/newfile.pdf';

interface IStaticPage {}
interface IStaticPage {
    StaticPage: any;
    state: {
      nodes: [],
      checked: [],
      expanded: []
    }
}




 
const  StaticPage: React.FC<IStaticPage> = ({
 

    
}) => {

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  		
  	useEffect(() => {
    	function onlineHandler() {
      		setIsOnline(true);
    	}
	
    	function offlineHandler() {
      		setIsOnline(false);
    	}
	
    	window.addEventListener("online", onlineHandler);
    	window.addEventListener("offline", offlineHandler);

	
    	return () => {
      		window.removeEventListener("online", onlineHandler);
      		window.removeEventListener("offline", offlineHandler);
    	};
  	}, []);

	
  	return (
		<div className='main-container'>
		<Document file={resume} >
		  <Page pageNumber={1} />
		</Document>
	  </div>
  	);
        
    
};
const mapStateToProps = (state: any) => {
    const { deviceFormData,I907FormData } = state;
    return {
        deviceFormData,I907FormData
    };
};
export default connect(mapStateToProps)(StaticPage)